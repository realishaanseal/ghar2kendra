import { getFeed } from "./supabaseClient-qunC9q8v.mjs";
import { DAY_MS, daysBetween, distanceMeters, reportedAt, resolvedAt, verifiedAt } from "./time-CSlph-K_.mjs";
// node_modules/.nitro/vite/services/ssr/assets/memoryStore-B4afoKcQ.js
var ASSET_KINDS = {
	road_stretch: {
		label: "Road stretch",
		icon: "🛣️"
	},
	drainage: {
		label: "Drain & water main",
		icon: "🌊"
	},
	transformer: {
		label: "Transformer / feeder",
		icon: "⚡"
	},
	waste_point: {
		label: "Waste collection point",
		icon: "🗑️"
	},
	footpath: {
		label: "Footpath",
		icon: "🚶"
	},
	manhole: {
		label: "Storm manhole",
		icon: "🕳️"
	},
	streetlights: {
		label: "Streetlight row",
		icon: "💡"
	}
};
var ASSETS = [
	{
		id: "AST-ORR-142",
		name: "Outer Ring Road — Metro Pillars 140–145",
		kind: "road_stretch",
		categories: ["roads", "safety"],
		lat: 28.6139,
		lng: 77.209,
		radiusM: 180,
		ward: "Ward 14 (South Extension)",
		custodian: "Public Works Dept (PWD Division 2)"
	},
	{
		id: "AST-RHN-L3",
		name: "Rohini Sec 15, Lane 3 — storm drain & water main",
		kind: "drainage",
		categories: ["water", "waste"],
		lat: 28.632,
		lng: 77.202,
		radiusM: 220,
		ward: "Ward 22 (Rohini North)",
		custodian: "Delhi Jal Board (Water & Sewerage)"
	},
	{
		id: "AST-IND-T17",
		name: "Indiranagar 4th Cross — transformer T-17",
		kind: "transformer",
		categories: ["electricity"],
		lat: 28.625,
		lng: 77.215,
		radiusM: 120,
		ward: "Ward 8 (Indiranagar)",
		custodian: "DISCOM / Power Grid Emergency Unit"
	},
	{
		id: "AST-LJP-MANDI",
		name: "Lajpat Nagar Sabzi Mandi — community bin",
		kind: "waste_point",
		categories: ["waste"],
		lat: 28.608,
		lng: 77.22,
		radiusM: 120,
		ward: "Ward 6 (Lajpat Nagar)",
		custodian: "Municipal Solid Waste Management"
	},
	{
		id: "AST-HKV-G2",
		name: "Hauz Khas Village Gate 2 — footpath",
		kind: "footpath",
		categories: ["roads", "safety"],
		lat: 28.5494,
		lng: 77.2001,
		radiusM: 120,
		ward: "Ward 18 (Hauz Khas)",
		custodian: "Public Works Dept (Roads)"
	},
	{
		id: "AST-KB-MH4",
		name: "Karol Bagh College Road — storm manhole MH-4",
		kind: "manhole",
		categories: ["safety", "water"],
		lat: 28.64,
		lng: 77.19,
		radiusM: 120,
		ward: "Ward 3 (Karol Bagh)",
		custodian: "Drainage & Sewerage Division"
	}
];
var IMG = {
	pothole: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
	asphalt: "https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80",
	flood: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80",
	clean: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80",
	garbage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
	wire: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
	manhole: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80"
};
var ARCHIVED_ISSUES = [
	{
		id: "G2K-2026-0207",
		reportedBy: "Aditya Khanna",
		assetId: "AST-ORR-142",
		title: "Pothole cluster near Metro Pillar 141",
		category: "roads",
		severity: "high",
		status: "verified",
		lat: 28.6141,
		lng: 77.2087,
		address: "Metro Pillar 141, Outer Ring Road",
		ward: "Ward 14 (South Extension)",
		reportedAt: "2026-05-11T08:20:00+05:30",
		resolvedAt: "2026-05-14T17:00:00+05:30",
		verifiedAt: "2026-05-16T10:15:00+05:30",
		repairMethod: "Cold-mix patch",
		contractor: "Apex Infra Roadworks Pvt Ltd",
		imageUrl: IMG.pothole,
		resolvedPhotoUrl: IMG.asphalt,
		upvotes: 41,
		archived: true
	},
	{
		id: "G2K-2026-0311",
		reportedBy: "Pooja Arora",
		assetId: "AST-ORR-142",
		title: "Patch washed out after first monsoon rain, crater reopened",
		category: "roads",
		severity: "high",
		status: "resolved",
		lat: 28.6138,
		lng: 77.2092,
		address: "Bus shelter, Outer Ring Road",
		ward: "Ward 14 (South Extension)",
		reportedAt: "2026-07-02T07:45:00+05:30",
		resolvedAt: "2026-07-06T18:30:00+05:30",
		verifiedAt: null,
		repairMethod: "Cold-mix patch",
		contractor: "Apex Infra Roadworks Pvt Ltd",
		imageUrl: IMG.pothole,
		resolvedPhotoUrl: IMG.asphalt,
		upvotes: 58,
		archived: true
	},
	{
		id: "G2K-2026-0322",
		reportedBy: "Vikram Seth",
		assetId: "AST-RHN-L3",
		title: "Knee-deep waterlogging at Lane 3 junction after rain",
		category: "water",
		severity: "high",
		status: "verified",
		lat: 28.6324,
		lng: 77.2016,
		address: "Lane 3 junction, Pocket B, Rohini Sec 15",
		ward: "Ward 22 (Rohini North)",
		reportedAt: "2026-07-21T19:10:00+05:30",
		resolvedAt: "2026-07-25T12:00:00+05:30",
		verifiedAt: "2026-07-26T09:00:00+05:30",
		repairMethod: "Pumped out, drain mouth cleared",
		contractor: "Jal Board Emergency Pipeline Cell",
		imageUrl: IMG.flood,
		resolvedPhotoUrl: IMG.clean,
		upvotes: 37,
		archived: true
	},
	{
		id: "G2K-2026-0356",
		reportedBy: "Neha Gupta",
		assetId: "AST-RHN-L3",
		title: "Roadside drain choked with silt and plastic",
		category: "waste",
		severity: "medium",
		status: "resolved",
		lat: 28.6317,
		lng: 77.2024,
		address: "Lane 3, Pocket B, Rohini Sec 15",
		ward: "Ward 22 (Rohini North)",
		reportedAt: "2026-08-14T08:30:00+05:30",
		resolvedAt: "2026-08-16T16:00:00+05:30",
		verifiedAt: null,
		repairMethod: "Manual desilting",
		contractor: "EcoClean Municipal Concessionaire",
		imageUrl: IMG.garbage,
		resolvedPhotoUrl: IMG.clean,
		upvotes: 22,
		archived: true
	},
	{
		id: "G2K-2026-0118",
		reportedBy: "Priya Narang",
		assetId: "AST-IND-T17",
		title: "Transformer T-17 sparking during rain",
		category: "electricity",
		severity: "critical",
		status: "verified",
		lat: 28.6252,
		lng: 77.2148,
		address: "Opposite Community Park, 4th Cross, Indiranagar",
		ward: "Ward 8 (Indiranagar)",
		reportedAt: "2026-04-03T21:05:00+05:30",
		resolvedAt: "2026-04-04T02:30:00+05:30",
		verifiedAt: "2026-04-05T09:40:00+05:30",
		repairMethod: "Bushing replaced, door locked",
		contractor: "Emergency Grid Squad",
		imageUrl: IMG.wire,
		resolvedPhotoUrl: null,
		upvotes: 64,
		archived: true
	},
	{
		id: "G2K-2026-0341",
		reportedBy: "Mohit Bhatia",
		assetId: "AST-LJP-MANDI",
		title: "Mandi bin overflowing onto footpath",
		category: "waste",
		severity: "medium",
		status: "verified",
		lat: 28.6081,
		lng: 77.2198,
		address: "Main Sabzi Mandi Gate, Lajpat Nagar",
		ward: "Ward 6 (Lajpat Nagar)",
		reportedAt: "2026-08-02T07:00:00+05:30",
		resolvedAt: "2026-08-02T15:00:00+05:30",
		verifiedAt: "2026-08-03T08:00:00+05:30",
		repairMethod: "Compactor pickup",
		contractor: "EcoClean Municipal Concessionaire",
		imageUrl: IMG.garbage,
		resolvedPhotoUrl: IMG.clean,
		upvotes: 19,
		archived: true
	},
	{
		id: "G2K-2026-0402",
		reportedBy: "Imran Qureshi",
		assetId: "AST-LJP-MANDI",
		title: "Bin overflowing again, cattle scattering waste",
		category: "waste",
		severity: "medium",
		status: "verified",
		lat: 28.6079,
		lng: 77.2201,
		address: "Main Sabzi Mandi Gate, Lajpat Nagar",
		ward: "Ward 6 (Lajpat Nagar)",
		reportedAt: "2026-09-10T07:30:00+05:30",
		resolvedAt: "2026-09-10T18:00:00+05:30",
		verifiedAt: "2026-09-11T09:00:00+05:30",
		repairMethod: "Compactor pickup",
		contractor: "EcoClean Municipal Concessionaire",
		imageUrl: IMG.garbage,
		resolvedPhotoUrl: IMG.clean,
		upvotes: 26,
		archived: true
	},
	{
		id: "G2K-2026-0289",
		reportedBy: "Ananya Iyer",
		assetId: "AST-KB-MH4",
		title: "Manhole MH-4 cover missing on college road",
		category: "safety",
		severity: "critical",
		status: "verified",
		lat: 28.6401,
		lng: 77.1902,
		address: "Back Gate, Karol Bagh Girls College Road",
		ward: "Ward 3 (Karol Bagh)",
		reportedAt: "2026-06-20T20:00:00+05:30",
		resolvedAt: "2026-06-21T11:00:00+05:30",
		verifiedAt: "2026-06-22T08:30:00+05:30",
		repairMethod: "Temporary steel plate",
		contractor: "PWD Stormwater Maintenance",
		imageUrl: IMG.manhole,
		resolvedPhotoUrl: null,
		upvotes: 33,
		archived: true
	}
];
var OPEN_STATUSES = [
	"submitted",
	"triaged",
	"in_progress"
];
var isRepaired = (issue) => issue.status === "resolved" || issue.status === "verified";
var isOpen = (issue) => OPEN_STATUSES.includes(issue.status);
/**
* Find the asset an issue belongs to: an explicit assetId wins, otherwise the nearest
* asset whose categories include the issue's category and whose radius covers it.
*/
function matchAsset(issue, assets) {
	if (issue.assetId) {
		const asset = assets.find((a) => a.id === issue.assetId);
		if (asset) return {
			asset,
			distanceM: distanceMeters(issue.lat, issue.lng, asset.lat, asset.lng)
		};
	}
	let best = null;
	for (const asset of assets) {
		if (!asset.categories.includes(issue.category)) continue;
		const distanceM = distanceMeters(issue.lat, issue.lng, asset.lat, asset.lng);
		if (distanceM > asset.radiusM) continue;
		if (!best || distanceM < best.distanceM) best = {
			asset,
			distanceM
		};
	}
	return best;
}
function issuesForAsset(asset, issues, assets) {
	return issues.filter((issue) => matchAsset(issue, assets)?.asset.id === asset.id);
}
/**
* Build the memory of one asset from every issue (live and archived).
* `assets` is the full registry so that matching stays consistent with matchAsset.
*/
function buildAssetMemory(asset, issues, assets = [asset], now = /* @__PURE__ */ new Date()) {
	const own = issuesForAsset(asset, issues, assets).map((issue) => ({
		issue,
		reported: reportedAt(issue, now),
		resolved: resolvedAt(issue, now),
		verified: verifiedAt(issue, now)
	})).sort((a, b) => a.reported - b.reported);
	const events = [];
	const recurrenceGaps = [];
	const repairLives = [];
	let lastRepair = null;
	let recurrences = 0;
	let failureCountedSinceRepair = false;
	for (const entry of own) {
		const { issue, reported, resolved, verified } = entry;
		const recurrenceOf = issue.recurrenceOf || (lastRepair && daysBetween(lastRepair.resolved, reported) <= 180 ? lastRepair.issue.id : null);
		if (recurrenceOf && lastRepair && !failureCountedSinceRepair) {
			failureCountedSinceRepair = true;
			recurrences += 1;
			repairLives.push(daysBetween(lastRepair.resolved, reported));
			events.push({
				type: "recurrence",
				at: reported,
				issueId: issue.id,
				title: issue.title,
				note: `Defect returned ${Math.round(daysBetween(lastRepair.resolved, reported))} days after repair of ${recurrenceOf}.`,
				linkedIssueId: recurrenceOf
			});
		} else events.push({
			type: "report",
			at: reported,
			issueId: issue.id,
			title: issue.title,
			note: issue.address
		});
		if (resolved && isRepaired(issue)) {
			events.push({
				type: "repair",
				at: resolved,
				issueId: issue.id,
				title: issue.repairMethod || "Repair completed",
				note: issue.contractor || issue.resolutionProof || ""
			});
			lastRepair = entry;
			failureCountedSinceRepair = false;
		}
		if (verified) events.push({
			type: "verification",
			at: verified,
			issueId: issue.id,
			title: "Residents verified the fix",
			note: issue.verificationNote || "Confirmed on the ground by residents."
		});
	}
	for (let i = 1; i < own.length; i++) recurrenceGaps.push(daysBetween(own[i - 1].reported, own[i].reported));
	const repairs = own.filter((e) => e.resolved && isRepaired(e.issue));
	const verifiedRepairs = repairs.filter((e) => e.verified);
	const open = own.filter((e) => isOpen(e.issue));
	const mean = (xs) => xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null;
	const stats = {
		reports: own.length,
		repairs: repairs.length,
		verifiedRepairs: verifiedRepairs.length,
		recurrences,
		openCount: open.length,
		meanDaysBetweenFailures: mean(recurrenceGaps),
		meanRepairLifeDays: mean(repairLives),
		lastReportedAt: own.at(-1)?.reported ?? null,
		lastVerifiedAt: verifiedRepairs.at(-1)?.verified ?? null
	};
	return {
		asset,
		issues: own.map((e) => e.issue),
		events: events.sort((a, b) => b.at - a.at),
		stats,
		reliability: scoreReliability(stats, open.map((e) => e.issue)),
		outlook: estimateOutlook(stats, repairs.at(-1)?.resolved ?? null, open.length > 0, now)
	};
}
/** 0–100 reliability score with human-readable reasons. */
function scoreReliability(stats, openIssues = []) {
	const reasons = [];
	let score = 100;
	const unverified = stats.repairs - stats.verifiedRepairs;
	const openCritical = openIssues.filter((i) => i.severity === "critical").length;
	if (stats.recurrences) {
		score -= 20 * stats.recurrences;
		reasons.push(`${stats.recurrences} defect${stats.recurrences > 1 ? "s" : ""} came back after repair`);
	}
	if (unverified > 0) {
		score -= 8 * unverified;
		reasons.push(`${unverified} repair${unverified > 1 ? "s" : ""} never verified by residents`);
	}
	if (openCritical) {
		score -= 10 * openCritical;
		reasons.push(`${openCritical} critical issue${openCritical > 1 ? "s" : ""} open`);
	}
	const otherOpen = openIssues.length - openCritical;
	if (otherOpen > 0) {
		score -= 5 * otherOpen;
		reasons.push(`${otherOpen} other issue${otherOpen > 1 ? "s" : ""} open`);
	}
	if (stats.verifiedRepairs) {
		score += 4 * stats.verifiedRepairs;
		reasons.push(`${stats.verifiedRepairs} repair${stats.verifiedRepairs > 1 ? "s" : ""} verified on the ground`);
	}
	score = Math.max(0, Math.min(100, Math.round(score)));
	return {
		score,
		grade: score >= 75 ? "stable" : score >= 50 ? "watch" : "failing",
		reasons
	};
}
/**
* Statistical outlook, not a prediction: with at least two observed repair lifetimes,
* estimate when the next failure is likely if nothing about the repair method changes.
*/
function estimateOutlook(stats, lastRepairAt, hasOpenIssue, now = /* @__PURE__ */ new Date()) {
	if (hasOpenIssue || !lastRepairAt || stats.recurrences < 2 || !stats.meanRepairLifeDays) return null;
	const expected = new Date(lastRepairAt.getTime() + stats.meanRepairLifeDays * DAY_MS);
	return {
		expectedFailureAt: expected,
		overdue: expected < now,
		basis: `${stats.recurrences} past repairs lasted ~${Math.round(stats.meanRepairLifeDays)} days on average`
	};
}
/** Memories for every asset, worst first. */
function buildMemoryIndex(assets, issues, now = /* @__PURE__ */ new Date()) {
	return assets.map((asset) => buildAssetMemory(asset, issues, assets, now)).sort((a, b) => a.reliability.score - b.reliability.score);
}
/** One-line summary, e.g. "3 reports · 2 repairs · returns every ~50 days". */
function summarizeMemory(memory) {
	const { stats } = memory;
	const parts = [`${stats.reports} report${stats.reports === 1 ? "" : "s"}`, `${stats.repairs} repair${stats.repairs === 1 ? "" : "s"}`];
	if (stats.recurrences && stats.meanRepairLifeDays) parts.push(`repairs last ~${Math.round(stats.meanRepairLifeDays)} days`);
	return parts.join(" · ");
}
/** Live issues plus archived history, without duplicates. */
async function getAllIssues() {
	const live = await getFeed();
	const liveIds = new Set(live.map((i) => i.id));
	return [...live, ...ARCHIVED_ISSUES.filter((i) => !liveIds.has(i.id))];
}
async function getMemoryIndex() {
	return buildMemoryIndex(ASSETS, await getAllIssues());
}
async function getAssetMemory(assetId) {
	const asset = ASSETS.find((a) => a.id === assetId);
	if (!asset) return null;
	return buildAssetMemory(asset, await getAllIssues(), ASSETS);
}
/** Memory of the asset an issue sits on, or null if it isn't on a registered asset. */
async function getMemoryForIssue(issue) {
	const match = matchAsset(issue, ASSETS);
	if (!match) return null;
	return buildAssetMemory(match.asset, await getAllIssues(), ASSETS);
}
/** An archived grievance shaped like a live ticket, so the ticket page can show it. */
function getArchivedTicket(id) {
	const issue = ARCHIVED_ISSUES.find((i) => i.id === id);
	if (!issue) return null;
	const asset = ASSETS.find((a) => a.id === issue.assetId);
	const fmt = (iso) => iso ? new Date(iso).toLocaleString("en-IN", {
		dateStyle: "medium",
		timeStyle: "short"
	}) : null;
	const timeline = [
		{
			step: "Grievance Logged",
			date: fmt(issue.reportedAt),
			note: issue.address,
			officer: "Citizen App"
		},
		issue.resolvedAt && {
			step: "Marked Resolved with Proof",
			date: fmt(issue.resolvedAt),
			note: issue.repairMethod || "Repair completed.",
			officer: issue.contractor || "Ward Officer"
		},
		issue.verifiedAt && {
			step: "Citizen Ground Reality Confirmed",
			date: fmt(issue.verifiedAt),
			note: "Residents confirmed the fix on the ground.",
			officer: "Citizen Verifiers"
		}
	].filter(Boolean);
	return {
		description: `Archived grievance on ${asset?.name || "a registered asset"}.`,
		department: asset?.custodian || "Municipal Engineering",
		assignedOfficer: "Archived record",
		reportedBy: "Resident",
		commentsCount: 0,
		slaRemainingHours: 0,
		createdAt: fmt(issue.reportedAt),
		timelineStep: issue.status === "verified" ? 4 : 3,
		...issue,
		timeline
	};
}
export { ASSETS, ASSET_KINDS, buildAssetMemory, buildMemoryIndex, getAllIssues, getArchivedTicket, getAssetMemory, getMemoryForIssue, getMemoryIndex, summarizeMemory };
