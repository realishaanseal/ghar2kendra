// Civic Missions: turn many reports of one problem into one coordinated project with
// evidence, responsible authorities, a coordinator, reminders and a public timeline.
// No government integration needed: residents organise around G2K's evidence.

import { distanceMeters, centroid } from './geo';
import { categoryFamily } from './proof';
import { parseWhen, formatDate } from './time';

export const CLUSTER_RADIUS_M = 300;
export const MIN_REPORTS = 3;

const OPEN = ['submitted', 'triaged', 'in_progress'];

export const MISSION_STAGES = [
  { id: 'forming', label: 'Forming', hint: 'Gathering evidence and members' },
  { id: 'submitted', label: 'Submitted', hint: 'Petition sent to the authorities' },
  { id: 'acknowledged', label: 'Acknowledged', hint: 'Authority replied or inspected' },
  { id: 'work_started', label: 'Work started', hint: 'Crews on site' },
  { id: 'resolved', label: 'Resolved', hint: 'Outcome verified by residents' },
];

const FAMILY_TITLES = {
  drainage: 'Fix the drainage',
  surface: 'Make the road and footpath safe',
  power: 'Restore the lights and power',
};

/** People affected: each report plus everyone who backed it. */
export const residentsAffected = (issues) => issues.reduce((sum, i) => sum + 1 + (i.upvotes || 0), 0);

/** "Lane 3, Pocket B, Rohini Sector 15" → "Lane 3, Rohini Sector 15". */
function placeName(address = '') {
  const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  const street = parts.find((p) => /lane|road|marg|street|pocket|sector|gate/i.test(p)) || parts[0] || 'your area';
  const locality = parts.at(-1);
  return locality && locality !== street ? `${street}, ${locality}` : street;
}

/**
 * Greedy spatial clustering of open issues of the same family. A cluster becomes a
 * suggested mission when it has at least MIN_REPORTS reports and isn't already in a mission.
 */
export function suggestMissions(issues, existingMissions = [], { radiusM = CLUSTER_RADIUS_M, minReports = MIN_REPORTS } = {}) {
  const taken = new Set(existingMissions.flatMap((m) => m.issueIds));
  const pool = issues
    .filter((i) => OPEN.includes(i.status) && !taken.has(i.id))
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  const used = new Set();
  const suggestions = [];

  for (const seed of pool) {
    if (used.has(seed.id)) continue;
    const family = categoryFamily(seed.category);
    const members = pool.filter(
      (i) => !used.has(i.id) && categoryFamily(i.category) === family && distanceMeters(seed.lat, seed.lng, i.lat, i.lng) <= radiusM,
    );
    if (members.length < minReports) continue;
    members.forEach((i) => used.add(i.id));
    const centre = centroid(members);
    suggestions.push({
      key: `${family}-${members.map((m) => m.id).sort().join('-')}`,
      family,
      title: `${FAMILY_TITLES[family] || 'Fix it together'}: ${placeName(seed.address)}`,
      issueIds: members.map((m) => m.id),
      lat: centre.lat,
      lng: centre.lng,
      ward: seed.ward,
      residents: residentsAffected(members),
      authorities: [...new Set(members.map((m) => m.department).filter(Boolean))],
      spreadM: Math.round(Math.max(...members.map((m) => distanceMeters(centre.lat, centre.lng, m.lat, m.lng)))),
    });
  }
  return suggestions.sort((a, b) => b.residents - a.residents);
}

/** Progress of a mission from its linked tickets, stage and reminders. */
export function missionProgress(mission, issues, now = new Date()) {
  const linked = mission.issueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean);
  const fixed = linked.filter((i) => i.status === 'resolved' || i.status === 'verified').length;
  const verified = linked.filter((i) => i.status === 'verified').length;
  const stageIndex = MISSION_STAGES.findIndex((s) => s.id === mission.status);
  const pending = (mission.reminders || []).filter((r) => !r.done).sort((a, b) => parseWhen(a.dueAt, now) - parseWhen(b.dueAt, now));
  const overdue = pending.filter((r) => parseWhen(r.dueAt, now) < now);
  return {
    linked,
    fixed,
    verified,
    total: linked.length,
    percent: linked.length ? Math.round((fixed / linked.length) * 100) : 0,
    stageIndex: Math.max(0, stageIndex),
    nextReminder: pending[0] || null,
    overdue,
    residents: residentsAffected(linked),
  };
}

/** A ready-to-send petition built only from the mission's evidence. */
export function draftSubmission(mission, issues, now = new Date()) {
  const { linked, residents } = missionProgress(mission, issues, now);
  const evidence = linked
    .map((i, n) => `${n + 1}. ${i.id}: ${i.title} (${i.address}; reported ${i.createdAt || formatDate(parseWhen(i.reportedAt, now))}; ${i.upvotes || 0} residents backing)`)
    .join('\n');
  const to = (mission.authorities || []).map((a) => a.name || a).join('; ');
  return `To: ${to}
Subject: ${mission.title} (${linked.length} linked grievances, ${residents} residents affected)

Respected Sir/Madam,

We, residents of ${mission.ward}, request a single coordinated inspection of the problem below.
${linked.length} separate grievances have been filed on Ghar2Kendra about what appears to be one underlying cause:

${evidence}

${mission.summary || ''}

We request:
1. A joint site inspection by the departments named above within 7 days.
2. A written plan with a timeline for a lasting repair, not only a temporary fix.
3. Notice before work starts, so residents can verify the outcome on Ghar2Kendra.

Mission coordinator: ${mission.coordinator?.name || 'To be assigned'}
Public mission page: ${typeof window !== 'undefined' ? window.location.origin : ''}/missions/${mission.id}
Date: ${formatDate(now)}
`;
}
