// Civic Memory Engine.
// Instead of forgetting an issue once it is closed, every grievance is attached to a
// physical asset (a road stretch, a drain, a transformer). The asset keeps the full
// history: reports, repairs, verifications, and how quickly defects come back.

import { distanceMeters } from './geo';
import { reportedAt, resolvedAt, verifiedAt, daysBetween, DAY_MS } from './time';

// A report counts as a recurrence when it lands on an asset this long after its last repair.
export const RECURRENCE_WINDOW_DAYS = 180;

const OPEN_STATUSES = ['submitted', 'triaged', 'in_progress'];
const isRepaired = (issue) => issue.status === 'resolved' || issue.status === 'verified';
const isOpen = (issue) => OPEN_STATUSES.includes(issue.status);

/**
 * Find the asset an issue belongs to: an explicit assetId wins, otherwise the nearest
 * asset whose categories include the issue's category and whose radius covers it.
 */
export function matchAsset(issue, assets) {
  if (issue.assetId) {
    const asset = assets.find((a) => a.id === issue.assetId);
    if (asset) return { asset, distanceM: distanceMeters(issue.lat, issue.lng, asset.lat, asset.lng) };
  }
  let best = null;
  for (const asset of assets) {
    if (!asset.categories.includes(issue.category)) continue;
    const distanceM = distanceMeters(issue.lat, issue.lng, asset.lat, asset.lng);
    if (distanceM > asset.radiusM) continue;
    if (!best || distanceM < best.distanceM) best = { asset, distanceM };
  }
  return best;
}

export function issuesForAsset(asset, issues, assets) {
  return issues.filter((issue) => matchAsset(issue, assets)?.asset.id === asset.id);
}

/**
 * Build the memory of one asset from every issue (live and archived).
 * `assets` is the full registry so that matching stays consistent with matchAsset.
 */
export function buildAssetMemory(asset, issues, assets = [asset], now = new Date()) {
  const own = issuesForAsset(asset, issues, assets)
    .map((issue) => ({
      issue,
      reported: reportedAt(issue, now),
      resolved: resolvedAt(issue, now),
      verified: verifiedAt(issue, now),
    }))
    .sort((a, b) => a.reported - b.reported);

  const events = [];
  const recurrenceGaps = [];
  const repairLives = [];
  let lastRepair = null;
  let recurrences = 0;

  for (const entry of own) {
    const { issue, reported, resolved, verified } = entry;
    const recurrenceOf =
      issue.recurrenceOf ||
      (lastRepair && daysBetween(lastRepair.resolved, reported) <= RECURRENCE_WINDOW_DAYS ? lastRepair.issue.id : null);

    if (recurrenceOf && lastRepair) {
      recurrences += 1;
      repairLives.push(daysBetween(lastRepair.resolved, reported));
      events.push({
        type: 'recurrence',
        at: reported,
        issueId: issue.id,
        title: issue.title,
        note: `Defect returned ${Math.round(daysBetween(lastRepair.resolved, reported))} days after repair of ${recurrenceOf}.`,
        linkedIssueId: recurrenceOf,
      });
    } else {
      events.push({ type: 'report', at: reported, issueId: issue.id, title: issue.title, note: issue.address });
    }

    if (resolved && isRepaired(issue)) {
      events.push({
        type: 'repair',
        at: resolved,
        issueId: issue.id,
        title: issue.repairMethod || 'Repair completed',
        note: issue.contractor || issue.resolutionProof || '',
      });
      lastRepair = entry;
    }
    if (verified) {
      events.push({
        type: 'verification',
        at: verified,
        issueId: issue.id,
        title: 'Residents verified the fix',
        note: issue.verificationNote || 'Confirmed on the ground by residents.',
      });
    }
  }

  for (let i = 1; i < own.length; i++) {
    recurrenceGaps.push(daysBetween(own[i - 1].reported, own[i].reported));
  }

  const repairs = own.filter((e) => e.resolved && isRepaired(e.issue));
  const verifiedRepairs = repairs.filter((e) => e.verified);
  const open = own.filter((e) => isOpen(e.issue));
  const mean = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null);

  const stats = {
    reports: own.length,
    repairs: repairs.length,
    verifiedRepairs: verifiedRepairs.length,
    recurrences,
    openCount: open.length,
    meanDaysBetweenFailures: mean(recurrenceGaps),
    meanRepairLifeDays: mean(repairLives),
    lastReportedAt: own.at(-1)?.reported ?? null,
    lastVerifiedAt: verifiedRepairs.at(-1)?.verified ?? null,
  };

  return {
    asset,
    issues: own.map((e) => e.issue),
    events: events.sort((a, b) => b.at - a.at),
    stats,
    reliability: scoreReliability(stats, open.map((e) => e.issue)),
    outlook: estimateOutlook(stats, repairs.at(-1)?.resolved ?? null, open.length > 0, now),
  };
}

/** 0–100 reliability score with human-readable reasons. */
export function scoreReliability(stats, openIssues = []) {
  const reasons = [];
  let score = 100;
  const unverified = stats.repairs - stats.verifiedRepairs;
  const openCritical = openIssues.filter((i) => i.severity === 'critical').length;

  if (stats.recurrences) {
    score -= 20 * stats.recurrences;
    reasons.push(`${stats.recurrences} defect${stats.recurrences > 1 ? 's' : ''} came back after repair`);
  }
  if (unverified > 0) {
    score -= 8 * unverified;
    reasons.push(`${unverified} repair${unverified > 1 ? 's' : ''} never verified by residents`);
  }
  if (openCritical) {
    score -= 10 * openCritical;
    reasons.push(`${openCritical} critical issue${openCritical > 1 ? 's' : ''} open`);
  }
  const otherOpen = openIssues.length - openCritical;
  if (otherOpen > 0) {
    score -= 5 * otherOpen;
    reasons.push(`${otherOpen} other issue${otherOpen > 1 ? 's' : ''} open`);
  }
  if (stats.verifiedRepairs) {
    score += 4 * stats.verifiedRepairs;
    reasons.push(`${stats.verifiedRepairs} repair${stats.verifiedRepairs > 1 ? 's' : ''} verified on the ground`);
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const grade = score >= 75 ? 'stable' : score >= 50 ? 'watch' : 'failing';
  return { score, grade, reasons };
}

/**
 * Statistical outlook, not a prediction: with at least two observed repair lifetimes,
 * estimate when the next failure is likely if nothing about the repair method changes.
 */
export function estimateOutlook(stats, lastRepairAt, hasOpenIssue, now = new Date()) {
  if (hasOpenIssue || !lastRepairAt || stats.recurrences < 2 || !stats.meanRepairLifeDays) return null;
  const expected = new Date(lastRepairAt.getTime() + stats.meanRepairLifeDays * DAY_MS);
  return {
    expectedFailureAt: expected,
    overdue: expected < now,
    basis: `${stats.recurrences} past repairs lasted ~${Math.round(stats.meanRepairLifeDays)} days on average`,
  };
}

/** Memories for every asset, worst first. */
export function buildMemoryIndex(assets, issues, now = new Date()) {
  return assets
    .map((asset) => buildAssetMemory(asset, issues, assets, now))
    .sort((a, b) => a.reliability.score - b.reliability.score);
}

/** One-line summary, e.g. "3 reports · 2 repairs · returns every ~50 days". */
export function summarizeMemory(memory) {
  const { stats } = memory;
  const parts = [`${stats.reports} report${stats.reports === 1 ? '' : 's'}`, `${stats.repairs} repair${stats.repairs === 1 ? '' : 's'}`];
  if (stats.recurrences && stats.meanRepairLifeDays) parts.push(`repairs last ~${Math.round(stats.meanRepairLifeDays)} days`);
  return parts.join(' · ');
}
