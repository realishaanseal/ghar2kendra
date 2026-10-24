import { getFeed } from "./supabaseClient-qunC9q8v.mjs";
import { centroid, distanceMeters, formatDate, parseWhen } from "./time-CSlph-K_.mjs";
import { categoryFamily } from "./proof-ooQUoaE1.mjs";
// node_modules/.nitro/vite/services/ssr/assets/missionStore-Blm7tUWo.js
var OPEN = [
	"submitted",
	"triaged",
	"in_progress"
];
var MISSION_STAGES = [
	{
		id: "forming",
		label: "Forming",
		hint: "Gathering evidence and members"
	},
	{
		id: "submitted",
		label: "Submitted",
		hint: "Petition sent to the authorities"
	},
	{
		id: "acknowledged",
		label: "Acknowledged",
		hint: "Authority replied or inspected"
	},
	{
		id: "work_started",
		label: "Work started",
		hint: "Crews on site"
	},
	{
		id: "resolved",
		label: "Resolved",
		hint: "Outcome verified by residents"
	}
];
var FAMILY_TITLES = {
	drainage: "Fix the drainage",
	surface: "Make the road and footpath safe",
	power: "Restore the lights and power"
};
/** People affected: each report plus everyone who backed it. */
var residentsAffected = (issues) => issues.reduce((sum, i) => sum + 1 + (i.upvotes || 0), 0);
/** "Lane 3, Pocket B, Rohini Sector 15" → "Lane 3, Rohini Sector 15". */
function placeName(address = "") {
	const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
	const street = parts.find((p) => /lane|road|marg|street|pocket|sector|gate/i.test(p)) || parts[0] || "your area";
	const locality = parts.at(-1);
	return locality && locality !== street ? `${street}, ${locality}` : street;
}
/**
* Greedy spatial clustering of open issues of the same family. A cluster becomes a
* suggested mission when it has at least MIN_REPORTS reports and isn't already in a mission.
*/
function suggestMissions(issues, existingMissions = [], { radiusM = 300, minReports = 3 } = {}) {
	const taken = new Set(existingMissions.flatMap((m) => m.issueIds));
	const pool = issues.filter((i) => OPEN.includes(i.status) && !taken.has(i.id)).sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
	const used = /* @__PURE__ */ new Set();
	const suggestions = [];
	for (const seed of pool) {
		if (used.has(seed.id)) continue;
		const family = categoryFamily(seed.category);
		const members = pool.filter((i) => !used.has(i.id) && categoryFamily(i.category) === family && distanceMeters(seed.lat, seed.lng, i.lat, i.lng) <= radiusM);
		if (members.length < minReports) continue;
		members.forEach((i) => used.add(i.id));
		const centre = centroid(members);
		suggestions.push({
			key: `${family}-${members.map((m) => m.id).sort().join("-")}`,
			family,
			title: `${FAMILY_TITLES[family] || "Fix it together"}: ${placeName(seed.address)}`,
			issueIds: members.map((m) => m.id),
			lat: centre.lat,
			lng: centre.lng,
			ward: seed.ward,
			residents: residentsAffected(members),
			authorities: [...new Set(members.map((m) => m.department).filter(Boolean))],
			spreadM: Math.round(Math.max(...members.map((m) => distanceMeters(centre.lat, centre.lng, m.lat, m.lng))))
		});
	}
	return suggestions.sort((a, b) => b.residents - a.residents);
}
/** Progress of a mission from its linked tickets, stage and reminders. */
function missionProgress(mission, issues, now = /* @__PURE__ */ new Date()) {
	const linked = mission.issueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean);
	const fixed = linked.filter((i) => i.status === "resolved" || i.status === "verified").length;
	const verified = linked.filter((i) => i.status === "verified").length;
	const stageIndex = MISSION_STAGES.findIndex((s) => s.id === mission.status);
	const pending = (mission.reminders || []).filter((r) => !r.done).sort((a, b) => parseWhen(a.dueAt, now) - parseWhen(b.dueAt, now));
	const overdue = pending.filter((r) => parseWhen(r.dueAt, now) < now);
	return {
		linked,
		fixed,
		verified,
		total: linked.length,
		percent: linked.length ? Math.round(fixed / linked.length * 100) : 0,
		stageIndex: Math.max(0, stageIndex),
		nextReminder: pending[0] || null,
		overdue,
		residents: residentsAffected(linked)
	};
}
/** A ready-to-send petition built only from the mission's evidence. */
function draftSubmission(mission, issues, now = /* @__PURE__ */ new Date()) {
	const { linked, residents } = missionProgress(mission, issues, now);
	const evidence = linked.map((i, n) => `${n + 1}. ${i.id}: ${i.title} (${i.address}; reported ${i.createdAt || formatDate(parseWhen(i.reportedAt, now))}; ${i.upvotes || 0} residents backing)`).join("\n");
	return `To: ${(mission.authorities || []).map((a) => a.name || a).join("; ")}
Subject: ${mission.title} (${linked.length} linked grievances, ${residents} residents affected)

Respected Sir/Madam,

We, residents of ${mission.ward}, request a single coordinated inspection of the problem below.
${linked.length} separate grievances have been filed on Ghar2Kendra about what appears to be one underlying cause:

${evidence}

${mission.summary || ""}

We request:
1. A joint site inspection by the departments named above within 7 days.
2. A written plan with a timeline for a lasting repair, not only a temporary fix.
3. Notice before work starts, so residents can verify the outcome on Ghar2Kendra.

Mission coordinator: ${mission.coordinator?.name || "To be assigned"}
Public mission page: ${typeof window !== "undefined" ? window.location.origin : ""}/missions/${mission.id}
Date: ${formatDate(now)}
`;
}
var STORAGE_KEY = "g2k_missions_v1";
var MISSION_EVENT = "civic-missions-updated";
var SEED = [{
	id: "MSN-2026-014",
	title: "Make Karol Bagh College Road safe after dark",
	summary: "An open manhole, six dead streetlights and broken footpath slabs on the same 200 m stretch students use every evening. Together they make the road unsafe after 7 PM.",
	family: "surface",
	ward: "Ward 3 (Karol Bagh)",
	issueIds: [
		"G2K-2026-0499",
		"G2K-2026-0702",
		"G2K-2026-0709"
	],
	lat: 28.6401,
	lng: 77.19,
	coordinator: {
		id: "cit-077",
		name: "Ananya Iyer",
		role: "Student union, Karol Bagh Girls College"
	},
	authorities: [
		{
			name: "Drainage & Sewerage Division",
			contact: "ee-drainage-w3@mcd.gov.in"
		},
		{
			name: "DISCOM / Street Lighting",
			contact: "streetlight-helpdesk@discom.in"
		},
		{
			name: "Public Works Dept (Roads)",
			contact: "pwd-roads-w3@mcd.gov.in"
		}
	],
	status: "submitted",
	members: [
		"cit-077",
		"cit-081",
		"cit-090",
		"cit-102",
		"cit-118"
	],
	createdAt: "2026-10-19T18:00:00+05:30",
	milestones: [
		{
			at: "2026-10-19T18:00:00+05:30",
			label: "Mission created from 3 reports",
			by: "Ananya Iyer"
		},
		{
			at: "2026-10-20T10:30:00+05:30",
			label: "Night photos added by 4 residents",
			by: "Residents"
		},
		{
			at: "2026-10-21T12:00:00+05:30",
			label: "Joint petition submitted to 3 departments",
			by: "Ananya Iyer"
		}
	],
	reminders: [{
		id: "r1",
		dueAt: "2026-10-24T10:00:00+05:30",
		label: "Follow up with DISCOM if no inspection date",
		done: false
	}, {
		id: "r2",
		dueAt: "2026-10-28T10:00:00+05:30",
		label: "Escalate to Executive Engineer if manhole still open",
		done: false
	}],
	contributions: [
		{
			type: "photo",
			by: "Rohan Das",
			at: "2026-10-20T20:10:00+05:30",
			note: "Night photo: stretch near bus stop is pitch dark"
		},
		{
			type: "submission",
			by: "Ananya Iyer",
			at: "2026-10-21T11:40:00+05:30",
			note: "Drafted joint petition from G2K evidence"
		},
		{
			type: "volunteer",
			by: "Karan Mehta",
			at: "2026-10-21T19:00:00+05:30",
			note: "Will escort the walking group until lights are fixed (with college security)"
		}
	]
}];
function readAll() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
	} catch (err) {
		console.warn("Failed to read missions", err);
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
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function getMissions() {
	return readAll();
}
function getMission(id) {
	return readAll().find((m) => m.id === id) || null;
}
async function getMissionSuggestions() {
	return suggestMissions(await getFeed(), readAll());
}
/** Turn a suggested cluster into a mission coordinated by `user`. */
function createMission(suggestion, user) {
	const missions = readAll();
	const mission = {
		id: `MSN-2026-${String(100 + missions.length).padStart(3, "0")}`,
		title: suggestion.title,
		summary: `${suggestion.issueIds.length} reports within ${suggestion.spreadM} m of each other look like one problem. Residents are coordinating a single, lasting fix.`,
		family: suggestion.family,
		ward: suggestion.ward,
		issueIds: suggestion.issueIds,
		lat: suggestion.lat,
		lng: suggestion.lng,
		coordinator: {
			id: user.id,
			name: user.name,
			role: "Resident coordinator"
		},
		authorities: suggestion.authorities.map((name) => ({
			name,
			contact: ""
		})),
		status: "forming",
		members: [user.id],
		createdAt: now(),
		milestones: [{
			at: now(),
			label: `Mission created from ${suggestion.issueIds.length} reports`,
			by: user.name
		}],
		reminders: [],
		contributions: []
	};
	writeAll([mission, ...missions]);
	return mission;
}
function joinMission(id, user) {
	return update(id, (m) => {
		if (!m.members.includes(user.id)) {
			m.members.push(user.id);
			m.milestones.push({
				at: now(),
				label: `${user.name} joined`,
				by: user.name
			});
		}
		return m;
	});
}
function addContribution(id, user, { type, note, url = "" }) {
	return update(id, (m) => {
		m.contributions.unshift({
			type,
			by: user.name,
			at: now(),
			note,
			url
		});
		if (!m.members.includes(user.id)) m.members.push(user.id);
		return m;
	});
}
function addReminder(id, { dueAt, label }) {
	return update(id, (m) => {
		m.reminders.push({
			id: `r${Date.now()}`,
			dueAt,
			label,
			done: false
		});
		return m;
	});
}
function completeReminder(id, reminderId) {
	return update(id, (m) => {
		const r = m.reminders.find((x) => x.id === reminderId);
		if (r) r.done = true;
		return m;
	});
}
function advanceMission(id, status, user, note) {
	return update(id, (m) => {
		m.status = status;
		m.milestones.push({
			at: now(),
			label: note,
			by: user.name
		});
		return m;
	});
}
export { MISSION_EVENT, MISSION_STAGES, addContribution, addReminder, advanceMission, completeReminder, createMission, draftSubmission, getMission, getMissionSuggestions, getMissions, joinMission, missionProgress };
