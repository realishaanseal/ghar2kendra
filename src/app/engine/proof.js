// Proof-of-Resolution Protocol.
// A repair is a verifiable event, not a status flip. Closing a ticket needs:
//   1. before-and-after evidence,
//   2. a quorum of independent residents who were physically near the spot,
//   3. a human reviewer's sign-off.
// Photos and GPS can be faked, so no single piece of evidence is trusted on its own.

import { distanceMeters } from './geo';
import { reportedAt, resolvedAt, daysBetween } from './time';

export const QUORUM = 3;
export const ATTEST_RADIUS_M = 250;
export const DISPUTE_THRESHOLD = 2;
// A new defect this close to a past repair is linked automatically; up to REVIEW_LINK_M a human decides.
export const AUTO_LINK_M = 60;
export const REVIEW_LINK_M = 150;
export const RELINK_WINDOW_DAYS = 180;

const FAMILIES = {
  roads: 'surface',
  safety: 'surface',
  water: 'drainage',
  waste: 'drainage',
  electricity: 'power',
};
export const categoryFamily = (category) => FAMILIES[category] || category;

/**
 * Can this attestation count towards the quorum? Independence rules:
 * not the original reporter, not the contractor or assigned officer, on site, one vote per person.
 */
export function checkAttestation(issue, attestation, existing = []) {
  if (existing.some((a) => a.userId === attestation.userId)) {
    return { eligible: false, reason: 'Already attested' };
  }
  if (attestation.name && attestation.name === issue.reportedBy) {
    return { eligible: false, reason: 'Original reporter cannot verify their own ticket' };
  }
  if (attestation.role === 'contractor' || attestation.role === 'official') {
    return { eligible: false, reason: 'Contractors and officials cannot attest their own work' };
  }
  if (attestation.distanceM == null) {
    return { eligible: false, reason: 'No location shared' };
  }
  if (attestation.distanceM > ATTEST_RADIUS_M) {
    return { eligible: false, reason: `Too far away (${Math.round(attestation.distanceM)} m > ${ATTEST_RADIUS_M} m)` };
  }
  return { eligible: true, reason: 'Independent, on site' };
}

/** Attach a distance to an attestation made at (lat, lng). */
export function locateAttestation(issue, attestation) {
  if (attestation.lat == null || attestation.lng == null) return { ...attestation, distanceM: null };
  return { ...attestation, distanceM: distanceMeters(issue.lat, issue.lng, attestation.lat, attestation.lng) };
}

/**
 * Where a resolution stands in the protocol.
 * Stages: awaiting_evidence → collecting → awaiting_review → verified, with disputed / rejected exits.
 */
export function evaluateProof(issue, proof = {}) {
  const attestations = proof.attestations || [];
  const checked = attestations.map((a, i) => ({ ...a, ...checkAttestation(issue, a, attestations.slice(0, i)) }));
  const counted = checked.filter((a) => a.eligible);
  const confirmations = counted.filter((a) => a.verdict === 'fixed').length;
  const disputes = counted.filter((a) => a.verdict === 'not_fixed').length;
  const hasEvidence = Boolean(issue.imageUrl && (proof.afterUrl || issue.resolvedPhotoUrl));
  const review = proof.review || { status: 'pending' };

  let stage;
  if (issue.status === 'verified' || review.status === 'approved') stage = 'verified';
  else if (review.status === 'rejected') stage = 'rejected';
  else if (!hasEvidence) stage = 'awaiting_evidence';
  else if (disputes >= DISPUTE_THRESHOLD) stage = 'disputed';
  else if (confirmations >= QUORUM) stage = 'awaiting_review';
  else stage = 'collecting';

  return {
    stage,
    confirmations,
    disputes,
    needed: Math.max(0, QUORUM - confirmations),
    attestations: checked,
    hasEvidence,
    review,
    canReview: stage === 'awaiting_review' || stage === 'disputed',
  };
}

export const STAGE_COPY = {
  awaiting_evidence: { label: 'Awaiting after-photo', tone: 'amber' },
  collecting: { label: 'Collecting resident attestations', tone: 'amber' },
  awaiting_review: { label: 'Quorum reached, awaiting human review', tone: 'teal' },
  disputed: { label: 'Disputed by residents, needs review', tone: 'rose' },
  verified: { label: 'Verified resolution', tone: 'emerald' },
  rejected: { label: 'Resolution rejected, work reopened', tone: 'rose' },
};

/**
 * Has this defect been repaired here before? Looks for the most recent repair of the
 * same category within REVIEW_LINK_M and RELINK_WINDOW_DAYS before the new report.
 * (Exact category, not family: a broken footpath is not a recurrence of a manhole repair.)
 */
export function findPreviousRepair(issue, issues, now = new Date()) {
  const reported = reportedAt(issue, now);
  let best = null;
  for (const other of issues) {
    if (other.id === issue.id) continue;
    if (other.status !== 'resolved' && other.status !== 'verified') continue;
    if (other.category !== issue.category) continue;
    const repaired = resolvedAt(other, now);
    if (!repaired || repaired >= reported) continue;
    const days = daysBetween(repaired, reported);
    if (days > RELINK_WINDOW_DAYS) continue;
    const distanceM = distanceMeters(issue.lat, issue.lng, other.lat, other.lng);
    if (distanceM > REVIEW_LINK_M) continue;
    if (!best || repaired > best.repaired) best = { issue: other, repaired, distanceM, daysSinceRepair: days };
  }
  if (!best) return null;
  return {
    previousIssue: best.issue,
    distanceM: best.distanceM,
    daysSinceRepair: best.daysSinceRepair,
    mode: best.distanceM <= AUTO_LINK_M ? 'auto' : 'review',
  };
}
