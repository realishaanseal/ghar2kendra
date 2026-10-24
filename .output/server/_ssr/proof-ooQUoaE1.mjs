import { daysBetween, distanceMeters, reportedAt, resolvedAt } from "./time-CSlph-K_.mjs";
// node_modules/.nitro/vite/services/ssr/assets/proof-ooQUoaE1.js
var FAMILIES = {
	roads: "surface",
	safety: "surface",
	water: "drainage",
	waste: "drainage",
	electricity: "power"
};
var categoryFamily = (category) => FAMILIES[category] || category;
/**
* Can this attestation count towards the quorum? Independence rules:
* not the original reporter, not the contractor or assigned officer, on site, one vote per person.
*/
function checkAttestation(issue, attestation, existing = []) {
	if (existing.some((a) => a.userId === attestation.userId)) return {
		eligible: false,
		reason: "Already attested"
	};
	if (attestation.name && attestation.name === issue.reportedBy) return {
		eligible: false,
		reason: "Original reporter cannot verify their own ticket"
	};
	if (attestation.role === "contractor" || attestation.role === "official") return {
		eligible: false,
		reason: "Contractors and officials cannot attest their own work"
	};
	if (attestation.distanceM == null) return {
		eligible: false,
		reason: "No location shared"
	};
	if (attestation.distanceM > 250) return {
		eligible: false,
		reason: `Too far away (${Math.round(attestation.distanceM)} m > 250 m)`
	};
	return {
		eligible: true,
		reason: "Independent, on site"
	};
}
/** Attach a distance to an attestation made at (lat, lng). */
function locateAttestation(issue, attestation) {
	if (attestation.lat == null || attestation.lng == null) return {
		...attestation,
		distanceM: null
	};
	return {
		...attestation,
		distanceM: distanceMeters(issue.lat, issue.lng, attestation.lat, attestation.lng)
	};
}
/**
* Where a resolution stands in the protocol.
* Stages: awaiting_evidence → collecting → awaiting_review → verified, with disputed / rejected exits.
*/
function evaluateProof(issue, proof = {}) {
	const attestations = proof.attestations || [];
	const checked = attestations.map((a, i) => ({
		...a,
		...checkAttestation(issue, a, attestations.slice(0, i))
	}));
	const counted = checked.filter((a) => a.eligible);
	const confirmations = counted.filter((a) => a.verdict === "fixed").length;
	const disputes = counted.filter((a) => a.verdict === "not_fixed").length;
	const hasEvidence = Boolean(issue.imageUrl && (proof.afterUrl || issue.resolvedPhotoUrl));
	const review = proof.review || { status: "pending" };
	let stage;
	if (issue.status === "verified" || review.status === "approved") stage = "verified";
	else if (review.status === "rejected") stage = "rejected";
	else if (!hasEvidence) stage = "awaiting_evidence";
	else if (disputes >= 2) stage = "disputed";
	else if (confirmations >= 3) stage = "awaiting_review";
	else stage = "collecting";
	return {
		stage,
		confirmations,
		disputes,
		needed: Math.max(0, 3 - confirmations),
		attestations: checked,
		hasEvidence,
		review,
		canReview: stage === "awaiting_review" || stage === "disputed"
	};
}
var STAGE_COPY = {
	awaiting_evidence: {
		label: "Awaiting after-photo",
		tone: "amber"
	},
	collecting: {
		label: "Collecting resident attestations",
		tone: "amber"
	},
	awaiting_review: {
		label: "Quorum reached, awaiting human review",
		tone: "teal"
	},
	disputed: {
		label: "Disputed by residents, needs review",
		tone: "rose"
	},
	verified: {
		label: "Verified resolution",
		tone: "emerald"
	},
	rejected: {
		label: "Resolution rejected, work reopened",
		tone: "rose"
	}
};
/**
* Has this defect been repaired here before? Looks for the most recent repair of the
* same category within REVIEW_LINK_M and RELINK_WINDOW_DAYS before the new report.
* (Exact category, not family: a broken footpath is not a recurrence of a manhole repair.)
*/
function findPreviousRepair(issue, issues, now = /* @__PURE__ */ new Date()) {
	const reported = reportedAt(issue, now);
	let best = null;
	for (const other of issues) {
		if (other.id === issue.id) continue;
		if (other.status !== "resolved" && other.status !== "verified") continue;
		if (other.category !== issue.category) continue;
		const repaired = resolvedAt(other, now);
		if (!repaired || repaired >= reported) continue;
		const days = daysBetween(repaired, reported);
		if (days > 180) continue;
		const distanceM = distanceMeters(issue.lat, issue.lng, other.lat, other.lng);
		if (distanceM > 150) continue;
		if (!best || repaired > best.repaired) best = {
			issue: other,
			repaired,
			distanceM,
			daysSinceRepair: days
		};
	}
	if (!best) return null;
	return {
		previousIssue: best.issue,
		distanceM: best.distanceM,
		daysSinceRepair: best.daysSinceRepair,
		mode: best.distanceM <= 60 ? "auto" : "review"
	};
}
export { STAGE_COPY, categoryFamily, checkAttestation, evaluateProof, findPreviousRepair, locateAttestation };
