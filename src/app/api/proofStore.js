// Proof-of-Resolution storage: before/after evidence, resident attestations,
// reviewer decisions and recurrence-link decisions, kept in the local demo store.

import { verifyResolution, updateIssue } from './supabaseClient';
import { getAllIssues } from './memoryStore';
import { evaluateProof, findPreviousRepair, locateAttestation, checkAttestation } from '../engine/proof';

const STORAGE_KEY = 'g2k_proofs_v1';
const EVENT = 'civic-proofs-updated';

// Mandi clean-up: two neighbours confirmed and the reporter's own vote doesn't count, so one more
// independent attestation reaches quorum. Hauz Khas footpath: quorum reached, waiting for review.
const SEED = {
  'G2K-2026-0518': {
    attestations: [
      { userId: 'cit-311', name: 'Meena Kapoor', verdict: 'fixed', lat: 28.6082, lng: 77.2196, at: '2026-10-22T19:10:00+05:30' },
      { userId: 'cit-412', name: 'Imran Qureshi', verdict: 'fixed', lat: 28.6077, lng: 77.2203, at: '2026-10-22T20:02:00+05:30' },
      { userId: 'cit-518', name: 'Sunita Mehra', verdict: 'fixed', lat: 28.608, lng: 77.22, at: '2026-10-22T20:30:00+05:30' },
    ],
    review: { status: 'pending' },
  },
  'G2K-2026-0422': {
    attestations: [
      { userId: 'cit-201', name: 'Kabir Malhotra', verdict: 'fixed', lat: 28.5496, lng: 77.2003, at: '2026-10-22T09:00:00+05:30' },
      { userId: 'cit-202', name: 'Ritu Bansal', verdict: 'fixed', lat: 28.5491, lng: 77.1998, at: '2026-10-22T09:40:00+05:30' },
      { userId: 'cit-203', name: 'Arjun Pillai', verdict: 'fixed', lat: 28.5493, lng: 77.2006, at: '2026-10-22T10:05:00+05:30' },
      { userId: 'con-77', name: 'South Delhi Paving crew', role: 'contractor', verdict: 'fixed', lat: 28.5494, lng: 77.2001, at: '2026-10-22T10:30:00+05:30' },
    ],
    review: { status: 'pending' },
  },
};

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read proofs', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  return structuredClone(SEED);
}

function writeAll(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export const PROOF_EVENT = EVENT;

export function getProof(issueId) {
  return readAll()[issueId] || { attestations: [], review: { status: 'pending' } };
}

export function getProofStatus(issue) {
  const proof = getProof(issue.id);
  const located = { ...proof, attestations: proof.attestations.map((a) => locateAttestation(issue, a)) };
  return evaluateProof(issue, located);
}

/** Record a resident's on-site verdict. Returns the eligibility check so the UI can explain it. */
export function addAttestation(issue, { user, verdict, lat, lng, note = '' }) {
  const all = readAll();
  const proof = all[issue.id] || { attestations: [], review: { status: 'pending' } };
  const attestation = {
    userId: user.id,
    name: user.name,
    role: user.role === 'official' ? 'official' : 'citizen',
    verdict,
    lat,
    lng,
    note,
    at: new Date().toISOString(),
  };
  const located = locateAttestation(issue, attestation);
  const check = checkAttestation(issue, located, proof.attestations.map((a) => locateAttestation(issue, a)));
  if (check.reason === 'Already attested') return check;
  proof.attestations.push(attestation);
  all[issue.id] = proof;
  writeAll(all);
  return check;
}

/** A reviewer approves or rejects a resolution that reached quorum (or was disputed). */
export async function reviewProof(issue, { approved, reviewer, note = '' }) {
  const all = readAll();
  const proof = all[issue.id] || { attestations: [] };
  proof.review = { status: approved ? 'approved' : 'rejected', reviewer, note, at: new Date().toISOString() };
  all[issue.id] = proof;
  writeAll(all);
  await verifyResolution(
    issue.id,
    approved,
    5,
    note || (approved ? `Resolution approved by ${reviewer} after resident quorum.` : 'Reviewer rejected the resolution evidence.'),
  );
}

/** Reset a ticket's protocol when it is reopened. */
export function clearProof(issueId) {
  const all = readAll();
  delete all[issueId];
  writeAll(all);
}

/** Previous repair this defect may be a recurrence of, plus any stored human decision about the link. */
export async function getRecurrenceLink(issue) {
  if (issue.archived) return null;
  const link = findPreviousRepair(issue, await getAllIssues());
  if (!link) return null;
  const decision = issue.recurrenceDecision || (link.mode === 'auto' ? 'auto' : 'pending');
  return { ...link, decision };
}

/** A reviewer confirms or dismisses a "needs review" recurrence link. */
export function decideRecurrenceLink(issue, previousIssueId, confirmed) {
  return updateIssue(issue.id, {
    recurrenceOf: confirmed ? previousIssueId : null,
    recurrenceDecision: confirmed ? 'confirmed' : 'dismissed',
  });
}

/** Called right after a report is filed: link it to an earlier repair when the match is close. */
export async function autoLinkRecurrence(issue) {
  const link = await getRecurrenceLink(issue);
  if (link?.mode === 'auto') {
    updateIssue(issue.id, { recurrenceOf: link.previousIssue.id, recurrenceDecision: 'auto' });
  }
  return link;
}
