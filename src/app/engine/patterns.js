// Civic Intelligence Graph: combine issue histories, locations, categories, recurrence and
// verification data to spot infrastructure patterns. Instead of treating waterlogging and a
// blocked drain on the same street as unrelated tickets, recommend investigating one cause.
// Rule-based and explainable on purpose: every pattern lists the tickets behind it.

import { distanceMeters, centroid } from './geo';
import { reportedAt, daysBetween } from './time';
import { buildMemoryIndex } from './memory';

export const LOOKBACK_DAYS = 180;

const text = (i) => `${i.title} ${i.description || ''}`.toLowerCase();
const is = {
  waterlogging: (i) => i.category === 'water' && /waterlog|flood|backflow|backing up|sewage|stand(s|ing) water|knee-deep/.test(text(i)),
  drainBlock: (i) => (i.category === 'waste' || i.category === 'water') && /drain|silt|choked|blocked|desilt/.test(text(i)),
  pothole: (i) => i.category === 'roads' && /pothole|crater|asphalt|carriageway|sinking/.test(text(i)),
  waterLeak: (i) => i.category === 'water',
  darkLight: (i) => i.category === 'electricity' && /light|lamp|dark/.test(text(i)),
  nightHazard: (i) => i.category === 'safety' || (i.tags || []).includes('accessibility') || /manhole|footpath|slab/.test(text(i)),
};

/**
 * Co-location rules. Each needs at least one issue matching every `needs` predicate
 * within `radiusM` of each other, and `minIssues` in total.
 */
export const RULES = [
  {
    kind: 'drainage_failure',
    label: 'Common cause',
    radiusM: 250,
    minIssues: 3,
    needs: [is.waterlogging, is.drainBlock],
    member: (i) => is.waterlogging(i) || is.drainBlock(i) || i.category === 'water',
    title: (place) => `Waterlogging and blocked drains on ${place} share one cause`,
    hypothesis: 'Separate waterlogging, sewage backflow and choked-drain reports on the same stretch point to one blocked or undersized storm drain, not unrelated incidents.',
    recommendation: 'Inspect the drain line as one job: desilt end-to-end, check gradient and the outfall, and stop treating each spot with a pump.',
  },
  {
    kind: 'subsurface_damage',
    label: 'Root cause',
    radiusM: 150,
    minIssues: 2,
    needs: [is.pothole, is.waterLeak],
    member: (i) => is.pothole(i) || is.waterLeak(i),
    title: (place) => `Water is undermining the road at ${place}`,
    hypothesis: 'Potholes keep reopening next to a water leak or drainage problem. Water under the surface washes out patches.',
    recommendation: 'Fix the water source first, then resurface. Until then, patching only buys weeks.',
  },
  {
    kind: 'dark_spot',
    label: 'Compounding risk',
    radiusM: 200,
    minIssues: 2,
    needs: [is.darkLight, is.nightHazard],
    member: (i) => is.darkLight(i) || is.nightHazard(i),
    title: (place) => `Dark spot at ${place}`,
    hypothesis: 'Broken lighting turns nearby physical defects (open manholes, broken slabs) into serious night-time hazards.',
    recommendation: 'Restore lighting first as the fastest risk reduction, then fix the physical defects; consider a night safety audit.',
  },
];

function placeOf(issues) {
  const counts = {};
  for (const i of issues) {
    const parts = (i.address || '').split(',').map((p) => p.trim());
    const street = parts.find((p) => /lane|road|marg|street|gate|pocket/i.test(p)) || parts[0];
    if (street) counts[street] = (counts[street] || 0) + 1;
  }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const locality = issues[0]?.address?.split(',').at(-1)?.trim();
  return top ? (locality && locality !== top[0] ? `${top[0]}, ${locality}` : top[0]) : 'this stretch';
}

/** Signal strength from evidence volume, independent reporters, open issues and recurrence. */
export function signalStrength(evidence, { recurring = false } = {}) {
  const reporters = new Set(evidence.map((i) => i.reportedBy).filter(Boolean)).size;
  const open = evidence.filter((i) => !['resolved', 'verified'].includes(i.status)).length;
  let score = 0.3 + 0.08 * Math.min(evidence.length, 6);
  if (reporters >= 3) score += 0.1;
  if (open >= 2) score += 0.05;
  if (recurring) score += 0.1;
  return Math.min(0.95, Math.round(score * 100) / 100);
}

/** Run every co-location rule over recent issues. */
export function detectCoLocationPatterns(issues, now = new Date()) {
  const recent = issues.filter((i) => i.status !== 'rejected' && daysBetween(reportedAt(i, now), now) <= LOOKBACK_DAYS);
  const patterns = [];
  for (const rule of RULES) {
    const used = new Set();
    for (const seed of recent.filter(rule.needs[0])) {
      if (used.has(seed.id)) continue;
      const nearby = recent.filter((i) => rule.member(i) && distanceMeters(seed.lat, seed.lng, i.lat, i.lng) <= rule.radiusM);
      if (nearby.length < rule.minIssues) continue;
      if (!rule.needs.every((need) => nearby.some(need))) continue;
      nearby.forEach((i) => used.add(i.id));
      const place = placeOf(nearby);
      const centre = centroid(nearby);
      patterns.push({
        id: `${rule.kind}:${nearby.map((i) => i.id).sort().join(',')}`,
        kind: rule.kind,
        label: rule.label,
        title: rule.title(place),
        place,
        hypothesis: rule.hypothesis,
        recommendation: rule.recommendation,
        evidenceIssueIds: nearby.map((i) => i.id),
        openIssueIds: nearby.filter((i) => !['resolved', 'verified'].includes(i.status) && !i.archived).map((i) => i.id),
        independentReporters: new Set(nearby.map((i) => i.reportedBy).filter(Boolean)).size,
        confidence: signalStrength(nearby),
        lat: centre.lat,
        lng: centre.lng,
        ward: seed.ward,
      });
    }
  }
  return patterns;
}

/** Assets whose repairs keep failing, from the Civic Memory index. */
export function detectRepeatFailures(assets, issues, now = new Date()) {
  return buildMemoryIndex(assets, issues, now)
    .filter((m) => m.stats.recurrences >= 2)
    .map((m) => ({
      id: `repeat_failure:${m.asset.id}`,
      kind: 'repeat_failure',
      label: 'Repairs not lasting',
      title: `Repairs on ${m.asset.name} keep failing`,
      place: m.asset.name,
      hypothesis: `${m.stats.recurrences} defects came back after repair, on average ~${Math.round(m.stats.meanRepairLifeDays)} days later. The repair method, not the reporting, is the problem.`,
      recommendation: 'Change the repair specification (or the collection frequency) and verify the next fix with residents before paying the contractor.',
      evidenceIssueIds: m.issues.map((i) => i.id),
      openIssueIds: m.issues.filter((i) => !['resolved', 'verified'].includes(i.status) && !i.archived).map((i) => i.id),
      independentReporters: new Set(m.issues.map((i) => i.reportedBy).filter(Boolean)).size,
      confidence: signalStrength(m.issues, { recurring: true }),
      lat: m.asset.lat,
      lng: m.asset.lng,
      ward: m.asset.ward,
      assetId: m.asset.id,
    }));
}

/**
 * All patterns, strongest first. When an asset's repeat failures are mostly the same tickets
 * as a co-location pattern, they are one story: fold the recurrence into that pattern.
 */
export function detectPatterns(assets, issues, now = new Date()) {
  const coLocated = detectCoLocationPatterns(issues, now);
  const repeats = [];
  for (const repeat of detectRepeatFailures(assets, issues, now)) {
    const overlap = coLocated.find((p) => {
      const shared = repeat.evidenceIssueIds.filter((id) => p.evidenceIssueIds.includes(id)).length;
      return shared / repeat.evidenceIssueIds.length >= 0.5;
    });
    if (!overlap) {
      repeats.push(repeat);
      continue;
    }
    const evidence = [...new Set([...overlap.evidenceIssueIds, ...repeat.evidenceIssueIds])].map((id) => issues.find((i) => i.id === id));
    overlap.evidenceIssueIds = evidence.map((i) => i.id);
    overlap.openIssueIds = [...new Set([...overlap.openIssueIds, ...repeat.openIssueIds])];
    overlap.hypothesis += ` Past repairs here have not lasted: ${repeat.hypothesis.split('.')[0].toLowerCase()}.`;
    overlap.assetId = repeat.assetId;
    overlap.confidence = signalStrength(evidence, { recurring: true });
  }
  return [...coLocated, ...repeats].sort((a, b) => b.confidence - a.confidence);
}

/**
 * Small node-link graph for one pattern: the pattern in the middle, its evidence tickets
 * around it, and edges between tickets that sit within 120 m of each other.
 */
export function patternGraph(pattern, issues, { width = 400, height = 320 } = {}) {
  const evidence = pattern.evidenceIssueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 48;
  const nodes = [
    { id: pattern.id, type: 'pattern', label: pattern.label, x: cx, y: cy },
    ...evidence.map((issue, n) => {
      const angle = (2 * Math.PI * n) / evidence.length - Math.PI / 2;
      return { id: issue.id, type: 'issue', label: issue.id.slice(-4), issue, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }),
  ];
  const edges = evidence.map((issue) => ({ from: pattern.id, to: issue.id, kind: 'evidence' }));
  for (let a = 0; a < evidence.length; a++) {
    for (let b = a + 1; b < evidence.length; b++) {
      const d = distanceMeters(evidence[a].lat, evidence[a].lng, evidence[b].lat, evidence[b].lng);
      if (d <= 120) edges.push({ from: evidence[a].id, to: evidence[b].id, kind: 'near', label: evidence.length <= 4 ? `${Math.round(d)} m` : null });
    }
  }
  return { nodes, edges, width, height };
}
