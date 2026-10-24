// Issues in the demo store carry either ISO timestamps (reportedAt/resolvedAt/verifiedAt)
// or human strings from the seed data ("2 hours ago", "Yesterday, 05:30 PM").
// These helpers turn both into Date objects so the engines can reason about time.

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

const UNIT_MS = {
  min: 60 * 1000,
  mins: 60 * 1000,
  minute: 60 * 1000,
  minutes: 60 * 1000,
  hour: HOUR_MS,
  hours: HOUR_MS,
  day: DAY_MS,
  days: DAY_MS,
  week: 7 * DAY_MS,
  weeks: 7 * DAY_MS,
};

/** Parse an ISO string or a relative phrase. Returns a Date or null. */
export function parseWhen(value, now = new Date()) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const iso = Date.parse(value);
  if (!Number.isNaN(iso) && /\d{4}-\d{2}-\d{2}/.test(value)) return new Date(iso);

  const text = String(value).toLowerCase();
  if (text.includes('just now')) return new Date(now);
  const rel = text.match(/(\d+)\s*(mins?|minutes?|hours?|days?|weeks?)\s+ago/);
  if (rel) return new Date(now.getTime() - Number(rel[1]) * UNIT_MS[rel[2]]);
  if (text.startsWith('yesterday')) return new Date(now.getTime() - DAY_MS);
  if (text.startsWith('today')) return new Date(now);
  return null;
}

/** When an issue was reported. */
export function reportedAt(issue, now = new Date()) {
  return parseWhen(issue.reportedAt, now) || parseWhen(issue.createdAt, now) || new Date(now);
}

/** When an issue was resolved, if it was. */
export function resolvedAt(issue, now = new Date()) {
  if (issue.resolvedAt) return parseWhen(issue.resolvedAt, now);
  if (issue.status !== 'resolved' && issue.status !== 'verified') return null;
  const step = [...(issue.timeline || [])].reverse().find((t) => /resolved|completed|sealed/i.test(t.step));
  return parseWhen(step?.date, now) || reportedAt(issue, now);
}

/** When residents verified the fix, if they did. */
export function verifiedAt(issue, now = new Date()) {
  if (issue.verifiedAt) return parseWhen(issue.verifiedAt, now);
  return issue.status === 'verified' ? resolvedAt(issue, now) : null;
}

export function daysBetween(a, b) {
  return Math.abs(b.getTime() - a.getTime()) / DAY_MS;
}

export function formatDate(date) {
  if (!date) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(date, now = new Date()) {
  if (!date) return '—';
  const diff = now.getTime() - date.getTime();
  if (diff < HOUR_MS) return `${Math.max(1, Math.round(diff / 60000))} min ago`;
  if (diff < DAY_MS) return `${Math.round(diff / HOUR_MS)} h ago`;
  const days = Math.round(diff / DAY_MS);
  if (days < 45) return `${days} d ago`;
  return formatDate(date);
}

export { DAY_MS, HOUR_MS };
