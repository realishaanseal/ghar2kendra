// Civic Missions storage (local demo store, same event pattern as the issue store).

import { getFeed } from './supabaseClient';
import { suggestMissions } from '../engine/missions';

const STORAGE_KEY = 'g2k_missions_v1';
export const MISSION_EVENT = 'civic-missions-updated';

const SEED = [
  {
    id: 'MSN-2026-014',
    title: 'Make Karol Bagh College Road safe after dark',
    summary:
      'An open manhole, six dead streetlights and broken footpath slabs on the same 200 m stretch students use every evening. Together they make the road unsafe after 7 PM.',
    family: 'surface',
    ward: 'Ward 3 (Karol Bagh)',
    issueIds: ['G2K-2026-0499', 'G2K-2026-0702', 'G2K-2026-0709'],
    lat: 28.6401,
    lng: 77.19,
    coordinator: { id: 'cit-077', name: 'Ananya Iyer', role: 'Student union, Karol Bagh Girls College' },
    authorities: [
      { name: 'Drainage & Sewerage Division', contact: 'ee-drainage-w3@mcd.gov.in' },
      { name: 'DISCOM / Street Lighting', contact: 'streetlight-helpdesk@discom.in' },
      { name: 'Public Works Dept (Roads)', contact: 'pwd-roads-w3@mcd.gov.in' },
    ],
    status: 'submitted',
    members: ['cit-077', 'cit-081', 'cit-090', 'cit-102', 'cit-118'],
    createdAt: '2026-10-19T18:00:00+05:30',
    milestones: [
      { at: '2026-10-19T18:00:00+05:30', label: 'Mission created from 3 reports', by: 'Ananya Iyer' },
      { at: '2026-10-20T10:30:00+05:30', label: 'Night photos added by 4 residents', by: 'Residents' },
      { at: '2026-10-21T12:00:00+05:30', label: 'Joint petition submitted to 3 departments', by: 'Ananya Iyer' },
    ],
    reminders: [
      { id: 'r1', dueAt: '2026-10-24T10:00:00+05:30', label: 'Follow up with DISCOM if no inspection date', done: false },
      { id: 'r2', dueAt: '2026-10-28T10:00:00+05:30', label: 'Escalate to Executive Engineer if manhole still open', done: false },
    ],
    contributions: [
      { type: 'photo', by: 'Rohan Das', at: '2026-10-20T20:10:00+05:30', note: 'Night photo: stretch near bus stop is pitch dark' },
      { type: 'submission', by: 'Ananya Iyer', at: '2026-10-21T11:40:00+05:30', note: 'Drafted joint petition from G2K evidence' },
      { type: 'volunteer', by: 'Karan Mehta', at: '2026-10-21T19:00:00+05:30', note: 'Will escort the walking group until lights are fixed (with college security)' },
    ],
  },
];

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read missions', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  return structuredClone(SEED);
}

function writeAll(missions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  window.dispatchEvent(new CustomEvent(MISSION_EVENT));
}

function update(id, change) {
  const missions = readAll();
  const idx = missions.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  missions[idx] = change(structuredClone(missions[idx]));
  writeAll(missions);
  return missions[idx];
}

const now = () => new Date().toISOString();

export function getMissions() {
  return readAll();
}

export function getMission(id) {
  return readAll().find((m) => m.id === id) || null;
}

export async function getMissionSuggestions() {
  return suggestMissions(await getFeed(), readAll());
}

/** Turn a suggested cluster into a mission coordinated by `user`. */
export function createMission(suggestion, user) {
  const missions = readAll();
  const mission = {
    id: `MSN-2026-${String(100 + missions.length).padStart(3, '0')}`,
    title: suggestion.title,
    summary: `${suggestion.issueIds.length} reports within ${suggestion.spreadM} m of each other look like one problem. Residents are coordinating a single, lasting fix.`,
    family: suggestion.family,
    ward: suggestion.ward,
    issueIds: suggestion.issueIds,
    lat: suggestion.lat,
    lng: suggestion.lng,
    coordinator: { id: user.id, name: user.name, role: 'Resident coordinator' },
    authorities: suggestion.authorities.map((name) => ({ name, contact: '' })),
    status: 'forming',
    members: [user.id],
    createdAt: now(),
    milestones: [{ at: now(), label: `Mission created from ${suggestion.issueIds.length} reports`, by: user.name }],
    reminders: [],
    contributions: [],
  };
  writeAll([mission, ...missions]);
  return mission;
}

export function joinMission(id, user) {
  return update(id, (m) => {
    if (!m.members.includes(user.id)) {
      m.members.push(user.id);
      m.milestones.push({ at: now(), label: `${user.name} joined`, by: user.name });
    }
    return m;
  });
}

export function addContribution(id, user, { type, note, url = '' }) {
  return update(id, (m) => {
    m.contributions.unshift({ type, by: user.name, at: now(), note, url });
    if (!m.members.includes(user.id)) m.members.push(user.id);
    return m;
  });
}

export function addReminder(id, { dueAt, label }) {
  return update(id, (m) => {
    m.reminders.push({ id: `r${Date.now()}`, dueAt, label, done: false });
    return m;
  });
}

export function completeReminder(id, reminderId) {
  return update(id, (m) => {
    const r = m.reminders.find((x) => x.id === reminderId);
    if (r) r.done = true;
    return m;
  });
}

export function advanceMission(id, status, user, note) {
  return update(id, (m) => {
    m.status = status;
    m.milestones.push({ at: now(), label: note, by: user.name });
    return m;
  });
}
