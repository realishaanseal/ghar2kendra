// node_modules/.nitro/vite/services/ssr/assets/aiAdvisory-DMRQjien.js
async function postJson(path, body) {
	const res = await fetch(path, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`${path} responded ${res.status}`);
	return res.json();
}
/** Ask Gemini whether the after-photo plausibly shows the same spot with the defect fixed. */
async function compareProofPhotos(beforeUrl, afterUrl, category) {
	try {
		return {
			available: true,
			...await postJson("/api/compare-proof", {
				beforeUrl,
				afterUrl,
				category
			})
		};
	} catch (err) {
		console.warn("compare-proof unavailable, using fallback", err);
		return {
			available: false,
			summary: "The AI service is offline, so the photos were not compared. Rely on resident attestations and the reviewer.",
			flags: afterUrl ? [] : ["No after-photo uploaded"]
		};
	}
}
/** Plain-language explanation of a detected pattern, with on-site checks. Falls back to the rule's own text. */
async function explainPattern(pattern, issues) {
	try {
		return {
			available: true,
			...await postJson("/api/explain-pattern", {
				title: pattern.title,
				hypothesis: pattern.hypothesis,
				issues: issues.map((i) => ({
					title: i.title,
					category: i.category,
					address: i.address,
					status: i.status,
					reported: i.reportedAt || i.createdAt
				}))
			})
		};
	} catch (err) {
		console.warn("explain-pattern unavailable, using rule text", err);
		return {
			available: false,
			explanation: pattern.hypothesis,
			checks: [pattern.recommendation],
			caveats: "Generated from the rule definition because the AI service is offline."
		};
	}
}
export { compareProofPhotos, explainPattern };
