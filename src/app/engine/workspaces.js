// G2K Workspaces: an operational view for institutions that can fix things themselves
// (colleges, residents' associations, campuses, NGOs, eventually municipalities).

import { distanceMeters } from './geo';
import { findPreviousRepair } from './proof';
import { reportedAt, resolvedAt, DAY_MS, HOUR_MS } from './time';

export const WORKSPACE_TYPES = {
  college: { label: 'College / campus', icon: '🎓' },
  rwa: { label: "Residents' association", icon: '🏘️' },
  ngo: { label: 'NGO', icon: '🤝' },
  municipality: { label: 'Municipal office', icon: '🏛️' },
};

const OPEN = ['submitted', 'triaged', 'in_progress'];
const isFixed = (i) => i.status === 'resolved' || i.status === 'verified';

/** Issues inside a workspace's service area. */
export function workspaceIssues(workspace, issues) {
  return issues.filter((i) => distanceMeters(workspace.lat, workspace.lng, i.lat, i.lng) <= workspace.radiusM);
}

/** Start of the ISO week (Monday) for a date, as a Date at local midnight. */
function weekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

/** KPIs and chart series for a workspace. */
export function workspaceAnalytics(workspace, issues, now = new Date(), weeks = 8) {
  const own = workspaceIssues(workspace, issues);
  const open = own.filter((i) => OPEN.includes(i.status));
  const fixed = own.filter(isFixed);
  const repairHours = fixed
    .map((i) => (resolvedAt(i, now) - reportedAt(i, now)) / HOUR_MS)
    .filter((h) => Number.isFinite(h) && h >= 0);

  const firstWeek = weekStart(new Date(now.getTime() - (weeks - 1) * 7 * DAY_MS));
  const weekly = Array.from({ length: weeks }, (_, n) => {
    const start = new Date(firstWeek.getTime() + n * 7 * DAY_MS);
    return { start, week: start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), opened: 0, resolved: 0 };
  });
  const bucket = (date) => weekly.find((w, n) => date >= w.start && (n === weeks - 1 || date < weekly[n + 1].start));
  for (const i of own) {
    const r = reportedAt(i, now);
    if (r >= firstWeek) bucket(r) && (bucket(r).opened += 1);
    const f = isFixed(i) ? resolvedAt(i, now) : null;
    if (f && f >= firstWeek) bucket(f) && (bucket(f).resolved += 1);
  }

  const byCategory = Object.entries(
    own.reduce((acc, i) => ({ ...acc, [i.category]: (acc[i.category] || 0) + 1 }), {}),
  )
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const recurring = own.filter((i) => findPreviousRepair(i, issues, now)).length;

  return {
    total: own.length,
    open: open.length,
    fixed: fixed.length,
    verified: own.filter((i) => i.status === 'verified').length,
    breached: open.filter((i) => i.isBreached).length,
    mttrHours: repairHours.length ? repairHours.reduce((s, h) => s + h, 0) / repairHours.length : null,
    recurrenceRate: own.length ? recurring / own.length : 0,
    weekly: weekly.map(({ week, opened, resolved }) => ({ week, opened, resolved })),
    byCategory,
  };
}

/** Open and completed assignments per staff member. */
export function staffLoad(workspace) {
  const assignments = Object.values(workspace.assignments || {});
  return workspace.staff.map((member) => {
    const mine = assignments.filter((a) => a.staffId === member.id);
    return { ...member, open: mine.filter((a) => a.status !== 'done').length, done: mine.filter((a) => a.status === 'done').length };
  });
}
