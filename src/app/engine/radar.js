// Neighborhood Impact Radar: follow the places you care about (your road, college,
// market, the route to work) and see only what matters there, ranked by relevance.

import { distanceMeters, distanceToSegmentMeters } from './geo';
import { findPreviousRepair } from './proof';
import { reportedAt, verifiedAt, daysBetween } from './time';

export const PLACE_KINDS = {
  home: { label: 'Home', icon: '🏠' },
  college: { label: 'College / school', icon: '🎓' },
  market: { label: 'Market', icon: '🛒' },
  work: { label: 'Work', icon: '💼' },
  other: { label: 'Place', icon: '📍' },
};

const SEVERITY_WEIGHT = { critical: 40, high: 28, medium: 16, low: 8 };
const OPEN = ['submitted', 'triaged', 'in_progress'];
export const GOOD_NEWS_DAYS = 7;
export const ROUTE_CORRIDOR_M = 80;

const isAccessibility = (issue) =>
  (issue.tags || []).includes('accessibility') || /footpath|sidewalk|wheelchair|ramp/i.test(`${issue.title} ${issue.description || ''}`);

/** Score one issue for one followed place. Returns null when it isn't relevant there. */
export function scoreForPlace(issue, place, allIssues, now = new Date()) {
  const distanceM = distanceMeters(place.lat, place.lng, issue.lat, issue.lng);
  if (distanceM > place.radiusM) return null;
  if (place.interests?.length && !place.interests.includes(issue.category)) return null;

  const reasons = [];
  let score = 0;
  let kind = 'hazard';
  const verified = verifiedAt(issue, now);

  if (issue.status === 'verified' && verified && daysBetween(verified, now) <= GOOD_NEWS_DAYS) {
    kind = 'verified_repair';
    score += 25;
    reasons.push('Repair verified by residents this week');
  } else if (OPEN.includes(issue.status)) {
    score += SEVERITY_WEIGHT[issue.severity] || 10;
    reasons.push(`${issue.severity} severity`);
    if (isAccessibility(issue)) {
      score += 20;
      reasons.push('Blocks accessible movement');
    }
    if (issue.recurrenceOf || findPreviousRepair(issue, allIssues, now)) {
      score += 15;
      kind = 'recurring';
      reasons.push('Came back after an earlier repair');
    }
    if (daysBetween(reportedAt(issue, now), now) <= 2) {
      score += 10;
      reasons.push('Reported in the last 48 h');
    }
    if (issue.isBreached) {
      score += 8;
      reasons.push('Past its repair deadline');
    }
  } else {
    return null;
  }

  score += Math.round(15 * (1 - distanceM / place.radiusM));
  return { issue, place, distanceM, score, kind, reasons };
}

/** Relevance-ranked feed across all followed places; each issue appears once, under its best place. */
export function buildRadarFeed(places, issues, now = new Date()) {
  const best = new Map();
  for (const place of places) {
    for (const issue of issues) {
      if (issue.archived) continue;
      const item = scoreForPlace(issue, place, issues, now);
      if (item && (!best.has(issue.id) || best.get(issue.id).score < item.score)) best.set(issue.id, item);
    }
  }
  return [...best.values()].sort((a, b) => b.score - a.score);
}

/** Open hazards near a position, for "alert me when I'm close" checks. */
export function proximityAlerts(position, issues, radiusM = 250) {
  return issues
    .filter((i) => OPEN.includes(i.status) && (i.severity === 'critical' || i.severity === 'high'))
    .map((issue) => ({ issue, distanceM: distanceMeters(position.lat, position.lng, issue.lat, issue.lng) }))
    .filter((a) => a.distanceM <= radiusM)
    .sort((a, b) => a.distanceM - b.distanceM);
}

/**
 * Known open hazards within a corridor around the straight line between two places.
 * This is a corridor check, not turn-by-turn routing: real hazard-aware routing needs a
 * routing engine (OSRM / GraphHopper) and enough verified reports to be dependable.
 */
export function routeHazards(from, to, issues, corridorM = ROUTE_CORRIDOR_M) {
  const hazards = issues
    .filter((i) => OPEN.includes(i.status))
    .map((issue) => ({ issue, offsetM: distanceToSegmentMeters(issue, from, to), alongM: distanceMeters(from.lat, from.lng, issue.lat, issue.lng) }))
    .filter((h) => h.offsetM <= corridorM)
    .sort((a, b) => a.alongM - b.alongM);
  const critical = hazards.filter((h) => h.issue.severity === 'critical').length;
  return {
    hazards,
    lengthM: distanceMeters(from.lat, from.lng, to.lat, to.lng),
    verdict: critical ? 'avoid' : hazards.length ? 'caution' : 'clear',
  };
}
