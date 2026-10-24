import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { centroid, daysBetween, distanceMeters, reportedAt } from "./time-CSlph-K_.mjs";
import { categoryFamily } from "./proof-ooQUoaE1.mjs";
import { ASSETS, buildMemoryIndex, getAllIssues } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { Flag, Info, Lightbulb, Network, Sparkles, Users, Wrench } from "../_libs/lucide-react.mjs";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "../_libs/react-leaflet.mjs";
import { createMission, getMissions } from "./missionStore-Blm7tUWo.mjs";
import { explainPattern } from "./aiAdvisory-DMRQjien.mjs";
// node_modules/.nitro/vite/services/ssr/assets/InsightsPage-C569YLIZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var text = (i) => `${i.title} ${i.description || ""}`.toLowerCase();
var is = {
	waterlogging: (i) => i.category === "water" && /waterlog|flood|backflow|backing up|sewage|stand(s|ing) water|knee-deep/.test(text(i)),
	drainBlock: (i) => (i.category === "waste" || i.category === "water") && /drain|silt|choked|blocked|desilt/.test(text(i)),
	pothole: (i) => i.category === "roads" && /pothole|crater|asphalt|carriageway|sinking/.test(text(i)),
	waterLeak: (i) => i.category === "water",
	darkLight: (i) => i.category === "electricity" && /light|lamp|dark/.test(text(i)),
	nightHazard: (i) => i.category === "safety" || (i.tags || []).includes("accessibility") || /manhole|footpath|slab/.test(text(i))
};
/**
* Co-location rules. Each needs at least one issue matching every `needs` predicate
* within `radiusM` of each other, and `minIssues` in total.
*/
var RULES = [
	{
		kind: "drainage_failure",
		label: "Common cause",
		radiusM: 250,
		minIssues: 3,
		needs: [is.waterlogging, is.drainBlock],
		member: (i) => is.waterlogging(i) || is.drainBlock(i) || i.category === "water",
		title: (place) => `Waterlogging and blocked drains on ${place} share one cause`,
		hypothesis: "Separate waterlogging, sewage backflow and choked-drain reports on the same stretch point to one blocked or undersized storm drain, not unrelated incidents.",
		recommendation: "Inspect the drain line as one job: desilt end-to-end, check gradient and the outfall, and stop treating each spot with a pump."
	},
	{
		kind: "subsurface_damage",
		label: "Root cause",
		radiusM: 150,
		minIssues: 2,
		needs: [is.pothole, is.waterLeak],
		member: (i) => is.pothole(i) || is.waterLeak(i),
		title: (place) => `Water is undermining the road at ${place}`,
		hypothesis: "Potholes keep reopening next to a water leak or drainage problem. Water under the surface washes out patches.",
		recommendation: "Fix the water source first, then resurface. Until then, patching only buys weeks."
	},
	{
		kind: "dark_spot",
		label: "Compounding risk",
		radiusM: 200,
		minIssues: 2,
		needs: [is.darkLight, is.nightHazard],
		member: (i) => is.darkLight(i) || is.nightHazard(i),
		title: (place) => `Dark spot at ${place}`,
		hypothesis: "Broken lighting turns nearby physical defects (open manholes, broken slabs) into serious night-time hazards.",
		recommendation: "Restore lighting first as the fastest risk reduction, then fix the physical defects; consider a night safety audit."
	}
];
function placeOf(issues) {
	const counts = {};
	for (const i of issues) {
		const parts = (i.address || "").split(",").map((p) => p.trim());
		const street = parts.find((p) => /lane|road|marg|street|gate|pocket/i.test(p)) || parts[0];
		if (street) counts[street] = (counts[street] || 0) + 1;
	}
	const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
	const locality = issues[0]?.address?.split(",").at(-1)?.trim();
	return top ? locality && locality !== top[0] ? `${top[0]}, ${locality}` : top[0] : "this stretch";
}
/** Signal strength from evidence volume, independent reporters, open issues and recurrence. */
function signalStrength(evidence, { recurring = false } = {}) {
	const reporters = new Set(evidence.map((i) => i.reportedBy).filter(Boolean)).size;
	const open = evidence.filter((i) => !["resolved", "verified"].includes(i.status)).length;
	let score = .3 + .08 * Math.min(evidence.length, 6);
	if (reporters >= 3) score += .1;
	if (open >= 2) score += .05;
	if (recurring) score += .1;
	return Math.min(.95, Math.round(score * 100) / 100);
}
/** Run every co-location rule over recent issues. */
function detectCoLocationPatterns(issues, now = /* @__PURE__ */ new Date()) {
	const recent = issues.filter((i) => i.status !== "rejected" && daysBetween(reportedAt(i, now), now) <= 180);
	const patterns = [];
	for (const rule of RULES) {
		const used = /* @__PURE__ */ new Set();
		for (const seed of recent.filter(rule.needs[0])) {
			if (used.has(seed.id)) continue;
			const nearby = recent.filter((i) => rule.member(i) && distanceMeters(seed.lat, seed.lng, i.lat, i.lng) <= rule.radiusM);
			if (nearby.length < rule.minIssues) continue;
			if (!rule.needs.every((need) => nearby.some(need))) continue;
			nearby.forEach((i) => used.add(i.id));
			const place = placeOf(nearby);
			const centre = centroid(nearby);
			patterns.push({
				id: `${rule.kind}:${nearby.map((i) => i.id).sort().join(",")}`,
				kind: rule.kind,
				label: rule.label,
				title: rule.title(place),
				place,
				hypothesis: rule.hypothesis,
				recommendation: rule.recommendation,
				evidenceIssueIds: nearby.map((i) => i.id),
				openIssueIds: nearby.filter((i) => !["resolved", "verified"].includes(i.status) && !i.archived).map((i) => i.id),
				independentReporters: new Set(nearby.map((i) => i.reportedBy).filter(Boolean)).size,
				confidence: signalStrength(nearby),
				lat: centre.lat,
				lng: centre.lng,
				ward: seed.ward
			});
		}
	}
	return patterns;
}
/** Assets whose repairs keep failing, from the Civic Memory index. */
function detectRepeatFailures(assets, issues, now = /* @__PURE__ */ new Date()) {
	return buildMemoryIndex(assets, issues, now).filter((m) => m.stats.recurrences >= 2).map((m) => ({
		id: `repeat_failure:${m.asset.id}`,
		kind: "repeat_failure",
		label: "Repairs not lasting",
		title: `Repairs on ${m.asset.name} keep failing`,
		place: m.asset.name,
		hypothesis: `${m.stats.recurrences} defects came back after repair, on average ~${Math.round(m.stats.meanRepairLifeDays)} days later. The repair method, not the reporting, is the problem.`,
		recommendation: "Change the repair specification (or the collection frequency) and verify the next fix with residents before paying the contractor.",
		evidenceIssueIds: m.issues.map((i) => i.id),
		openIssueIds: m.issues.filter((i) => !["resolved", "verified"].includes(i.status) && !i.archived).map((i) => i.id),
		independentReporters: new Set(m.issues.map((i) => i.reportedBy).filter(Boolean)).size,
		confidence: signalStrength(m.issues, { recurring: true }),
		lat: m.asset.lat,
		lng: m.asset.lng,
		ward: m.asset.ward,
		assetId: m.asset.id
	}));
}
/**
* All patterns, strongest first. When an asset's repeat failures are mostly the same tickets
* as a co-location pattern, they are one story: fold the recurrence into that pattern.
*/
function detectPatterns(assets, issues, now = /* @__PURE__ */ new Date()) {
	const coLocated = detectCoLocationPatterns(issues, now);
	const repeats = [];
	for (const repeat of detectRepeatFailures(assets, issues, now)) {
		const overlap = coLocated.find((p) => {
			return repeat.evidenceIssueIds.filter((id) => p.evidenceIssueIds.includes(id)).length / repeat.evidenceIssueIds.length >= .5;
		});
		if (!overlap) {
			repeats.push(repeat);
			continue;
		}
		const evidence = [.../* @__PURE__ */ new Set([...overlap.evidenceIssueIds, ...repeat.evidenceIssueIds])].map((id) => issues.find((i) => i.id === id));
		overlap.evidenceIssueIds = evidence.map((i) => i.id);
		overlap.openIssueIds = [.../* @__PURE__ */ new Set([...overlap.openIssueIds, ...repeat.openIssueIds])];
		overlap.hypothesis += ` Past repairs here have not lasted: ${repeat.hypothesis.split(".")[0].toLowerCase()}.`;
		overlap.assetId = repeat.assetId;
		overlap.confidence = signalStrength(evidence, { recurring: true });
	}
	return [...coLocated, ...repeats].sort((a, b) => b.confidence - a.confidence);
}
/**
* Small node-link graph for one pattern: the pattern in the middle, its evidence tickets
* around it, and edges between tickets that sit within 120 m of each other.
*/
function patternGraph(pattern, issues, { width = 400, height = 320 } = {}) {
	const evidence = pattern.evidenceIssueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean);
	const cx = width / 2;
	const cy = height / 2;
	const r = Math.min(width, height) / 2 - 48;
	const nodes = [{
		id: pattern.id,
		type: "pattern",
		label: pattern.label,
		x: cx,
		y: cy
	}, ...evidence.map((issue, n) => {
		const angle = 2 * Math.PI * n / evidence.length - Math.PI / 2;
		return {
			id: issue.id,
			type: "issue",
			label: issue.id.slice(-4),
			issue,
			x: cx + r * Math.cos(angle),
			y: cy + r * Math.sin(angle)
		};
	})];
	const edges = evidence.map((issue) => ({
		from: pattern.id,
		to: issue.id,
		kind: "evidence"
	}));
	for (let a = 0; a < evidence.length; a++) for (let b = a + 1; b < evidence.length; b++) {
		const d = distanceMeters(evidence[a].lat, evidence[a].lng, evidence[b].lat, evidence[b].lng);
		if (d <= 120) edges.push({
			from: evidence[a].id,
			to: evidence[b].id,
			kind: "near",
			label: evidence.length <= 4 ? `${Math.round(d)} m` : null
		});
	}
	return {
		nodes,
		edges,
		width,
		height
	};
}
var KIND_COLOR = {
	drainage_failure: "#4A7BA6",
	subsurface_damage: "#C2463A",
	dark_spot: "#D9982E",
	repeat_failure: "#8A6A9E"
};
var CATEGORY_COLOR = {
	water: "#4A7BA6",
	waste: "#3C8F78",
	roads: "#D9982E",
	safety: "#C2463A",
	electricity: "#E0B13C"
};
function EvidenceGraph({ pattern, issues, isDarkMode, onOpen }) {
	const graph = patternGraph(pattern, issues);
	const pos = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
	const ink = isDarkMode ? "#e8e2d6" : "#2a2620";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${graph.width} ${graph.height}`,
		className: "w-full h-auto",
		role: "img",
		"aria-label": `Evidence graph for ${pattern.title}`,
		children: [graph.edges.map((e, i) => {
			const a = pos[e.from];
			const b = pos[e.to];
			const near = e.kind === "near";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: a.x,
				y1: a.y,
				x2: b.x,
				y2: b.y,
				stroke: near ? "#D9982E" : ink,
				strokeOpacity: near ? .7 : .18,
				strokeWidth: near ? 1.5 : 1,
				strokeDasharray: near ? "4 3" : void 0
			}), near && e.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: (a.x + b.x) / 2,
				y: (a.y + b.y) / 2 - 3,
				fontSize: "9",
				textAnchor: "middle",
				fill: "#D9982E",
				children: e.label
			})] }, i);
		}), graph.nodes.map((n) => n.type === "pattern" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: n.x,
			cy: n.y,
			r: "42",
			fill: KIND_COLOR[pattern.kind],
			fillOpacity: "0.9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: n.x,
			y: n.y + 3,
			fontSize: "10",
			fontWeight: "700",
			textAnchor: "middle",
			fill: "#fff",
			children: n.label
		})] }, n.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "cursor-pointer",
			onClick: () => onOpen(n.id),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: n.x,
					cy: n.y,
					r: "22",
					fill: CATEGORY_COLOR[n.issue.category] || "#888",
					fillOpacity: n.issue.archived ? .35 : .9,
					stroke: ink,
					strokeOpacity: "0.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: n.x,
					y: n.y + 4,
					fontSize: "11",
					fontWeight: "700",
					textAnchor: "middle",
					fill: "#fff",
					children: n.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					x: n.x,
					y: n.y + 36,
					fontSize: "10",
					textAnchor: "middle",
					fill: ink,
					fillOpacity: "0.75",
					children: [n.issue.category, n.issue.archived ? " · past" : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${n.issue.id}: ${n.issue.title} (${n.issue.status})` })
			]
		}, n.id))]
	});
}
function InsightsPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const navigate = useNavigate$1();
	const { currentUser, isLoggedIn } = useAuth();
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [explanation, setExplanation] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const load = async () => setIssues(await getAllIssues());
		load();
		window.addEventListener("civic-issues-updated", load);
		return () => window.removeEventListener("civic-issues-updated", load);
	}, []);
	const patterns = (0, import_react.useMemo)(() => detectPatterns(ASSETS, issues), [issues]);
	const selected = patterns.find((p) => p.id === selectedId) || patterns[0];
	const evidence = selected ? selected.evidenceIssueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean) : [];
	const missions = getMissions();
	const existingMission = selected && missions.find((m) => selected.openIssueIds.some((id) => m.issueIds.includes(id)));
	const explain = async () => {
		setExplanation({
			...explanation,
			[selected.id]: { loading: true }
		});
		const result = await explainPattern(selected, evidence);
		setExplanation((prev) => ({
			...prev,
			[selected.id]: result
		}));
	};
	const startMission = () => {
		if (!isLoggedIn) return navigate("/login");
		const open = evidence.filter((i) => selected.openIssueIds.includes(i.id));
		const mission = createMission({
			title: selected.title,
			family: categoryFamily(open[0]?.category),
			issueIds: selected.openIssueIds,
			lat: selected.lat,
			lng: selected.lng,
			ward: selected.ward,
			authorities: [...new Set(open.map((i) => i.department).filter(Boolean))],
			spreadM: Math.round(Math.max(...open.map((i) => distanceMeters(selected.lat, selected.lng, i.lat, i.lng))))
		}, currentUser);
		navigate(`/missions/${mission.id}`);
	};
	const ai = selected && explanation[selected.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "w-4 h-4" }), " Civic Intelligence Graph"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: `text-3xl sm:text-4xl font-black mt-2 ${s.heading}`,
					children: "Separate complaints, one cause."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-sm mt-2 max-w-3xl ${s.muted}`,
					children: "G2K combines issue histories, locations, recurrence and verification data to spot infrastructure patterns. Every pattern is rule-based and lists the tickets behind it, so an engineer can check it."
				})
			] }), patterns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm ${s.muted}`,
				children: "No patterns detected yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "space-y-3",
					children: patterns.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedId(p.id),
						className: `${s.card} p-4 w-full text-left transition ${selected?.id === p.id ? "!border-amber-500" : "hover:border-amber-500/50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-wider",
									style: { color: KIND_COLOR[p.kind] },
									children: p.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-mono font-bold text-amber-500",
									children: [Math.round(p.confidence * 100), "% signal"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-sm font-black mt-1 leading-snug ${s.heading}`,
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `text-[11px] mt-1 ${s.muted}`,
								children: [
									p.evidenceIssueIds.length,
									" tickets · ",
									p.independentReporters,
									" independent reporter",
									p.independentReporters === 1 ? "" : "s",
									" · ",
									p.openIssueIds.length,
									" open"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 rounded-full bg-slate-500/20 mt-2 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-amber-500",
									style: { width: `${p.confidence * 100}%` }
								})
							})
						]
					}, p.id))
				}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-6`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-wider",
									style: { color: KIND_COLOR[selected.kind] },
									children: selected.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: `text-xl sm:text-2xl font-black mt-1 ${s.heading}`,
									children: selected.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `${s.inset} p-4`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `text-[11px] font-black flex items-center gap-1.5 ${s.heading}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-4 h-4 text-amber-500" }), " Hypothesis"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-xs mt-1.5 ${s.text}`,
											children: selected.hypothesis
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `${s.inset} p-4`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `text-[11px] font-black flex items-center gap-1.5 ${s.heading}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "w-4 h-4 text-amber-500" }), " Recommended action"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-xs mt-1.5 ${s.text}`,
											children: selected.recommendation
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2 mt-4",
									children: [
										existingMission ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
											to: `/missions/${existingMission.id}`,
											className: s.ghostButton,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "w-4 h-4 text-amber-500" }),
												" Already a mission: ",
												existingMission.title
											]
										}) : selected.openIssueIds.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: startMission,
											className: s.primaryButton,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }),
												" Create mission from ",
												selected.openIssueIds.length,
												" open tickets"
											]
										}) : null,
										!ai && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: explain,
											className: s.ghostButton,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500" }), " Explain with Gemini"]
										}),
										selected.assetId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											to: `/memory/${selected.assetId}`,
											className: s.ghostButton,
											children: "Asset history"
										})
									]
								}),
								ai?.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-xs mt-3 ${s.muted}`,
									children: "Thinking…"
								}),
								ai && !ai.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${s.inset} p-4 mt-4 text-xs space-y-2`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `font-black flex items-center gap-1.5 ${s.heading}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500" }),
												" ",
												ai.available ? "Gemini explanation (advisory)" : "Explanation (AI offline, rule text)"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: s.text,
											children: ai.explanation
										}),
										ai.checks?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: `list-disc pl-5 ${s.text}`,
											children: ai.checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
										}),
										ai.caveats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: s.muted,
											children: ai.caveats
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: `${s.card} p-4`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: `font-extrabold text-sm mb-2 ${s.heading}`,
										children: "Evidence graph"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceGraph, {
										pattern: selected,
										issues,
										isDarkMode,
										onOpen: (id) => navigate(`/ticket/${id}`)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-[10px] mt-2 ${s.muted}`,
										children: "Dashed lines join tickets within 120 m. Faded nodes are past, closed tickets."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: `${s.card} overflow-hidden`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full min-h-72 relative z-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
										center: [selected.lat, selected.lng],
										zoom: 16,
										scrollWheelZoom: false,
										style: {
											height: "100%",
											width: "100%",
											minHeight: 288
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
											attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
											url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										}), evidence.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMarker, {
											center: [i.lat, i.lng],
											radius: 8,
											pathOptions: {
												color: CATEGORY_COLOR[i.category] || "#888",
												fillOpacity: i.archived ? .3 : .85
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [
												i.id,
												": ",
												i.title
											] })
										}, i.id))]
									}, selected.id)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-5`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-extrabold text-sm mb-3 ${s.heading}`,
									children: "Tickets behind this pattern"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-2",
									children: evidence.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
										to: `/ticket/${i.id}`,
										className: `${s.inset} p-2.5 flex items-center gap-2 text-[11px] hover:border-amber-500/50`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-2 h-2 rounded-full shrink-0",
												style: { background: CATEGORY_COLOR[i.category] || "#888" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex-1 truncate font-semibold ${s.text}`,
												children: i.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-slate-400",
												children: i.archived ? "past" : i.status.replace("_", " ")
											})
										]
									}) }, i.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-[10px] mt-3 flex gap-1 ${s.muted}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3 h-3 shrink-0 mt-0.5" }), " Signal strength reflects how much independent evidence there is, not certainty. An engineer confirms the cause on site."]
								})
							]
						})
					]
				})]
			})]
		})
	});
}
export { InsightsPage as default };
