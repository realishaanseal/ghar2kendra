import { CivicAPI } from "./supabaseClient-qunC9q8v.mjs";
import { DAY_MS, HOUR_MS, distanceMeters, reportedAt, resolvedAt } from "./time-CSlph-K_.mjs";
import { findPreviousRepair } from "./proof-ooQUoaE1.mjs";
import { clearProof } from "./proofStore-Dq-YjRNq.mjs";
// node_modules/.nitro/vite/services/ssr/assets/workspaces-i-3a9bRZ.js
var STORAGE_KEY = "g2k_workspaces_v1";
var WORKSPACE_EVENT = "civic-workspaces-updated";
var SEED = [
	{
		id: "ws-kbgc",
		name: "Karol Bagh Girls College: Estates Office",
		type: "college",
		lat: 28.6401,
		lng: 77.19,
		radiusM: 350,
		description: "Campus and the public approach roads students use every day.",
		staff: [
			{
				id: "st-1",
				name: "Prakash Rao",
				role: "Estates manager"
			},
			{
				id: "st-2",
				name: "Sunil Kumar",
				role: "Electrician"
			},
			{
				id: "st-3",
				name: "Meera Joshi",
				role: "Civil supervisor"
			},
			{
				id: "st-4",
				name: "Harpreet Kaur",
				role: "Security lead"
			}
		],
		assignments: {
			"G2K-2026-0702": {
				staffId: "st-2",
				status: "in_progress",
				at: "2026-10-22T10:00:00+05:30",
				note: "Coordinating with DISCOM; temporary floodlights on the back gate tonight."
			},
			"G2K-2026-0709": {
				staffId: "st-3",
				status: "assigned",
				at: "2026-10-22T11:30:00+05:30",
				note: ""
			}
		}
	},
	{
		id: "ws-rwa-pb",
		name: "Pocket B Residents' Welfare Association",
		type: "rwa",
		lat: 28.632,
		lng: 77.202,
		radiusM: 300,
		description: "Lanes 1 to 5, Pocket B, Rohini Sector 15.",
		staff: [{
			id: "st-11",
			name: "Vikram Seth",
			role: "RWA secretary"
		}, {
			id: "st-12",
			name: "Neha Gupta",
			role: "Volunteer coordinator"
		}],
		assignments: { "G2K-2026-0661": {
			staffId: "st-12",
			status: "assigned",
			at: "2026-10-22T18:00:00+05:30",
			note: "Arrange desilting with the sanitation contractor."
		} }
	},
	{
		id: "ws-saahas",
		name: "Saahas Waste Collective: Lajpat Nagar",
		type: "ngo",
		lat: 28.608,
		lng: 77.22,
		radiusM: 500,
		description: "Market waste segregation partner of the zone.",
		staff: [{
			id: "st-21",
			name: "Ritika Sen",
			role: "Field lead"
		}],
		assignments: {}
	}
];
function readAll() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
	} catch (err) {
		console.warn("Failed to read workspaces", err);
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
function getWorkspaces() {
	return readAll();
}
function getWorkspace(id) {
	return readAll().find((w) => w.id === id) || null;
}
function createWorkspace({ name, type, lat, lng, radiusM = 400, description = "" }) {
	const ws = {
		id: `ws-${Date.now()}`,
		name,
		type,
		lat,
		lng,
		radiusM,
		description,
		staff: [],
		assignments: {}
	};
	writeAll([...readAll(), ws]);
	return ws;
}
function addStaff(id, { name, role }) {
	return update(id, (w) => {
		w.staff.push({
			id: `st-${Date.now()}`,
			name,
			role
		});
		return w;
	});
}
function assignIssue(id, issueId, staffId) {
	return update(id, (w) => {
		if (!staffId) delete w.assignments[issueId];
		else w.assignments[issueId] = {
			staffId,
			status: "assigned",
			at: (/* @__PURE__ */ new Date()).toISOString(),
			note: ""
		};
		return w;
	});
}
function setAssignmentStatus(id, issueId, status, note) {
	return update(id, (w) => {
		const a = w.assignments[issueId];
		if (a) {
			a.status = status;
			if (note !== void 0) a.note = note;
		}
		return w;
	});
}
/**
* The workspace fixed it itself: record the evidence on the public ticket. The ticket then
* goes through the normal Proof-of-Resolution round (resident quorum + review).
*/
async function resolveWithEvidence(id, issue, { staff, afterUrl, note }) {
	setAssignmentStatus(id, issue.id, "done", note);
	clearProof(issue.id);
	await CivicAPI.resolveIssueWithProof(issue.id, {
		resolvedPhotoUrl: afterUrl,
		resolutionProof: note,
		officerName: `${staff.name} (${getWorkspace(id).name})`
	});
}
var WORKSPACE_TYPES = {
	college: {
		label: "College / campus",
		icon: "🎓"
	},
	rwa: {
		label: "Residents' association",
		icon: "🏘️"
	},
	ngo: {
		label: "NGO",
		icon: "🤝"
	},
	municipality: {
		label: "Municipal office",
		icon: "🏛️"
	}
};
var OPEN = [
	"submitted",
	"triaged",
	"in_progress"
];
var isFixed = (i) => i.status === "resolved" || i.status === "verified";
/** Issues inside a workspace's service area. */
function workspaceIssues(workspace, issues) {
	return issues.filter((i) => distanceMeters(workspace.lat, workspace.lng, i.lat, i.lng) <= workspace.radiusM);
}
/** Start of the ISO week (Monday) for a date, as a Date at local midnight. */
function weekStart(date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() - (d.getDay() + 6) % 7);
	return d;
}
/** KPIs and chart series for a workspace. */
function workspaceAnalytics(workspace, issues, now = /* @__PURE__ */ new Date(), weeks = 8) {
	const own = workspaceIssues(workspace, issues);
	const open = own.filter((i) => OPEN.includes(i.status));
	const fixed = own.filter(isFixed);
	const repairHours = fixed.map((i) => (resolvedAt(i, now) - reportedAt(i, now)) / HOUR_MS).filter((h) => Number.isFinite(h) && h >= 0);
	const firstWeek = weekStart(/* @__PURE__ */ new Date(now.getTime() - (weeks - 1) * 7 * DAY_MS));
	const weekly = Array.from({ length: weeks }, (_, n) => {
		const start = new Date(firstWeek.getTime() + n * 7 * DAY_MS);
		return {
			start,
			week: start.toLocaleDateString("en-IN", {
				day: "numeric",
				month: "short"
			}),
			opened: 0,
			resolved: 0
		};
	});
	const bucket = (date) => weekly.find((w, n) => date >= w.start && (n === weeks - 1 || date < weekly[n + 1].start));
	for (const i of own) {
		const r = reportedAt(i, now);
		if (r >= firstWeek) bucket(r) && (bucket(r).opened += 1);
		const f = isFixed(i) ? resolvedAt(i, now) : null;
		if (f && f >= firstWeek) bucket(f) && (bucket(f).resolved += 1);
	}
	const byCategory = Object.entries(own.reduce((acc, i) => ({
		...acc,
		[i.category]: (acc[i.category] || 0) + 1
	}), {})).map(([category, count]) => ({
		category,
		count
	})).sort((a, b) => b.count - a.count);
	const recurring = own.filter((i) => findPreviousRepair(i, issues, now)).length;
	return {
		total: own.length,
		open: open.length,
		fixed: fixed.length,
		verified: own.filter((i) => i.status === "verified").length,
		breached: open.filter((i) => i.isBreached).length,
		mttrHours: repairHours.length ? repairHours.reduce((s, h) => s + h, 0) / repairHours.length : null,
		recurrenceRate: own.length ? recurring / own.length : 0,
		weekly: weekly.map(({ week, opened, resolved }) => ({
			week,
			opened,
			resolved
		})),
		byCategory
	};
}
/** Open and completed assignments per staff member. */
function staffLoad(workspace) {
	const assignments = Object.values(workspace.assignments || {});
	return workspace.staff.map((member) => {
		const mine = assignments.filter((a) => a.staffId === member.id);
		return {
			...member,
			open: mine.filter((a) => a.status !== "done").length,
			done: mine.filter((a) => a.status === "done").length
		};
	});
}
export { WORKSPACE_EVENT, WORKSPACE_TYPES, addStaff, assignIssue, createWorkspace, getWorkspace, getWorkspaces, resolveWithEvidence, setAssignmentStatus, staffLoad, workspaceAnalytics, workspaceIssues };
