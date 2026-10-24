// G2K Workspaces storage (local demo store).

import { CivicAPI } from './supabaseClient';
import { clearProof } from './proofStore';

const STORAGE_KEY = 'g2k_workspaces_v1';
export const WORKSPACE_EVENT = 'civic-workspaces-updated';

const SEED = [
  {
    id: 'ws-kbgc',
    name: 'Karol Bagh Girls College: Estates Office',
    type: 'college',
    lat: 28.6401,
    lng: 77.19,
    radiusM: 350,
    description: 'Campus and the public approach roads students use every day.',
    staff: [
      { id: 'st-1', name: 'Prakash Rao', role: 'Estates manager' },
      { id: 'st-2', name: 'Sunil Kumar', role: 'Electrician' },
      { id: 'st-3', name: 'Meera Joshi', role: 'Civil supervisor' },
      { id: 'st-4', name: 'Harpreet Kaur', role: 'Security lead' },
    ],
    assignments: {
      'G2K-2026-0702': { staffId: 'st-2', status: 'in_progress', at: '2026-10-22T10:00:00+05:30', note: 'Coordinating with DISCOM; temporary floodlights on the back gate tonight.' },
      'G2K-2026-0709': { staffId: 'st-3', status: 'assigned', at: '2026-10-22T11:30:00+05:30', note: '' },
    },
  },
  {
    id: 'ws-rwa-pb',
    name: "Pocket B Residents' Welfare Association",
    type: 'rwa',
    lat: 28.632,
    lng: 77.202,
    radiusM: 300,
    description: 'Lanes 1 to 5, Pocket B, Rohini Sector 15.',
    staff: [
      { id: 'st-11', name: 'Vikram Seth', role: 'RWA secretary' },
      { id: 'st-12', name: 'Neha Gupta', role: 'Volunteer coordinator' },
    ],
    assignments: {
      'G2K-2026-0661': { staffId: 'st-12', status: 'assigned', at: '2026-10-22T18:00:00+05:30', note: 'Arrange desilting with the sanitation contractor.' },
    },
  },
  {
    id: 'ws-saahas',
    name: 'Saahas Waste Collective: Lajpat Nagar',
    type: 'ngo',
    lat: 28.608,
    lng: 77.22,
    radiusM: 500,
    description: 'Market waste segregation partner of the zone.',
    staff: [{ id: 'st-21', name: 'Ritika Sen', role: 'Field lead' }],
    assignments: {},
  },
];

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read workspaces', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  return structuredClone(SEED);
}

function writeAll(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(WORKSPACE_EVENT));
}

function update(id, change) {
  const all = readAll();
  const idx = all.findIndex((w) => w.id === id);
  if (idx === -1) return null;
  all[idx] = change(structuredClone(all[idx]));
  writeAll(all);
  return all[idx];
}

export function getWorkspaces() {
  return readAll();
}

export function getWorkspace(id) {
  return readAll().find((w) => w.id === id) || null;
}

export function createWorkspace({ name, type, lat, lng, radiusM = 400, description = '' }) {
  const ws = { id: `ws-${Date.now()}`, name, type, lat, lng, radiusM, description, staff: [], assignments: {} };
  writeAll([...readAll(), ws]);
  return ws;
}

export function addStaff(id, { name, role }) {
  return update(id, (w) => {
    w.staff.push({ id: `st-${Date.now()}`, name, role });
    return w;
  });
}

export function assignIssue(id, issueId, staffId) {
  return update(id, (w) => {
    if (!staffId) delete w.assignments[issueId];
    else w.assignments[issueId] = { staffId, status: 'assigned', at: new Date().toISOString(), note: '' };
    return w;
  });
}

export function setAssignmentStatus(id, issueId, status, note) {
  return update(id, (w) => {
    const a = w.assignments[issueId];
    if (a) {
      a.status = status;
      if (note !== undefined) a.note = note;
    }
    return w;
  });
}

/**
 * The workspace fixed it itself: record the evidence on the public ticket. The ticket then
 * goes through the normal Proof-of-Resolution round (resident quorum + review).
 */
export async function resolveWithEvidence(id, issue, { staff, afterUrl, note }) {
  setAssignmentStatus(id, issue.id, 'done', note);
  clearProof(issue.id);
  await CivicAPI.resolveIssueWithProof(issue.id, {
    resolvedPhotoUrl: afterUrl,
    resolutionProof: note,
    officerName: `${staff.name} (${getWorkspace(id).name})`,
  });
}
