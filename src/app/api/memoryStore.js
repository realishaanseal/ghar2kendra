// Civic Memory data access: joins the live issue feed with archived history
// and hands both to the pure memory engine.

import { getFeed } from './supabaseClient';
import { ASSETS, ARCHIVED_ISSUES } from '../data/civicAssets';
import { buildAssetMemory, buildMemoryIndex, matchAsset } from '../engine/memory';

export function getAssets() {
  return ASSETS;
}

/** Live issues plus archived history, without duplicates. */
export async function getAllIssues() {
  const live = await getFeed();
  const liveIds = new Set(live.map((i) => i.id));
  return [...live, ...ARCHIVED_ISSUES.filter((i) => !liveIds.has(i.id))];
}

export async function getMemoryIndex() {
  return buildMemoryIndex(ASSETS, await getAllIssues());
}

export async function getAssetMemory(assetId) {
  const asset = ASSETS.find((a) => a.id === assetId);
  if (!asset) return null;
  return buildAssetMemory(asset, await getAllIssues(), ASSETS);
}

/** Memory of the asset an issue sits on, or null if it isn't on a registered asset. */
export async function getMemoryForIssue(issue) {
  const match = matchAsset(issue, ASSETS);
  if (!match) return null;
  return buildAssetMemory(match.asset, await getAllIssues(), ASSETS);
}

/** An archived grievance shaped like a live ticket, so the ticket page can show it. */
export function getArchivedTicket(id) {
  const issue = ARCHIVED_ISSUES.find((i) => i.id === id);
  if (!issue) return null;
  const asset = ASSETS.find((a) => a.id === issue.assetId);
  const fmt = (iso) => (iso ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : null);
  const timeline = [
    { step: 'Grievance Logged', date: fmt(issue.reportedAt), note: issue.address, officer: 'Citizen App' },
    issue.resolvedAt && {
      step: 'Marked Resolved with Proof',
      date: fmt(issue.resolvedAt),
      note: issue.repairMethod || 'Repair completed.',
      officer: issue.contractor || 'Ward Officer',
    },
    issue.verifiedAt && {
      step: 'Citizen Ground Reality Confirmed',
      date: fmt(issue.verifiedAt),
      note: 'Residents confirmed the fix on the ground.',
      officer: 'Citizen Verifiers',
    },
  ].filter(Boolean);
  return {
    description: `Archived grievance on ${asset?.name || 'a registered asset'}.`,
    department: asset?.custodian || 'Municipal Engineering',
    assignedOfficer: 'Archived record',
    reportedBy: 'Resident',
    commentsCount: 0,
    slaRemainingHours: 0,
    createdAt: fmt(issue.reportedAt),
    timelineStep: issue.status === 'verified' ? 4 : 3,
    ...issue,
    timeline,
  };
}
