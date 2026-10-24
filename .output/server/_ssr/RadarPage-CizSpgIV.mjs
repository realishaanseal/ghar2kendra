import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./router-compat-BtzFIg6e.mjs";
import { daysBetween, distanceMeters, distanceToSegmentMeters, reportedAt, verifiedAt } from "./time-CSlph-K_.mjs";
import { findPreviousRepair } from "./proof-ooQUoaE1.mjs";
import { getAllIssues } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { Accessibility, BellRing, CircleCheck, Info, LocateFixed, Plus, Radar, Repeat, Route, Trash, TriangleAlert } from "../_libs/lucide-react.mjs";
import { Circle, CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMapEvents } from "../_libs/react-leaflet.mjs";
// node_modules/.nitro/vite/services/ssr/assets/RadarPage-CizSpgIV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "g2k_radar_places_v1";
var RADAR_EVENT = "civic-radar-updated";
var SEED = [
	{
		id: "pl-home",
		label: "Home: South Extension",
		kind: "home",
		lat: 28.6145,
		lng: 77.2095,
		radiusM: 600,
		interests: []
	},
	{
		id: "pl-college",
		label: "Karol Bagh Girls College",
		kind: "college",
		lat: 28.6401,
		lng: 77.19,
		radiusM: 400,
		interests: []
	},
	{
		id: "pl-market",
		label: "Lajpat Nagar market",
		kind: "market",
		lat: 28.608,
		lng: 77.22,
		radiusM: 400,
		interests: []
	}
];
function read() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
	} catch (err) {
		console.warn("Failed to read followed places", err);
	}
	return structuredClone(SEED);
}
function write(places) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
	window.dispatchEvent(new CustomEvent(RADAR_EVENT));
}
function getFollowedPlaces() {
	return read();
}
function followPlace({ label, kind = "other", lat, lng, radiusM = 400, interests = [] }) {
	const place = {
		id: `pl-${Date.now()}`,
		label,
		kind,
		lat,
		lng,
		radiusM,
		interests
	};
	write([...read(), place]);
	return place;
}
function unfollowPlace(id) {
	write(read().filter((p) => p.id !== id));
}
function updatePlace(id, patch) {
	write(read().map((p) => p.id === id ? {
		...p,
		...patch
	} : p));
}
var PLACE_KINDS = {
	home: {
		label: "Home",
		icon: "🏠"
	},
	college: {
		label: "College / school",
		icon: "🎓"
	},
	market: {
		label: "Market",
		icon: "🛒"
	},
	work: {
		label: "Work",
		icon: "💼"
	},
	other: {
		label: "Place",
		icon: "📍"
	}
};
var SEVERITY_WEIGHT = {
	critical: 40,
	high: 28,
	medium: 16,
	low: 8
};
var OPEN = [
	"submitted",
	"triaged",
	"in_progress"
];
var isAccessibility = (issue) => (issue.tags || []).includes("accessibility") || /footpath|sidewalk|wheelchair|ramp/i.test(`${issue.title} ${issue.description || ""}`);
/** Score one issue for one followed place. Returns null when it isn't relevant there. */
function scoreForPlace(issue, place, allIssues, now = /* @__PURE__ */ new Date()) {
	const distanceM = distanceMeters(place.lat, place.lng, issue.lat, issue.lng);
	if (distanceM > place.radiusM) return null;
	if (place.interests?.length && !place.interests.includes(issue.category)) return null;
	const reasons = [];
	let score = 0;
	let kind = "hazard";
	const verified = verifiedAt(issue, now);
	if (issue.status === "verified" && verified && daysBetween(verified, now) <= 7) {
		kind = "verified_repair";
		score += 25;
		reasons.push("Repair verified by residents this week");
	} else if (OPEN.includes(issue.status)) {
		score += SEVERITY_WEIGHT[issue.severity] || 10;
		reasons.push(`${issue.severity} severity`);
		if (isAccessibility(issue)) {
			score += 20;
			reasons.push("Blocks accessible movement");
		}
		if (issue.recurrenceOf || findPreviousRepair(issue, allIssues, now)) {
			score += 15;
			kind = "recurring";
			reasons.push("Came back after an earlier repair");
		}
		if (daysBetween(reportedAt(issue, now), now) <= 2) {
			score += 10;
			reasons.push("Reported in the last 48 h");
		}
		if (issue.isBreached) {
			score += 8;
			reasons.push("Past its repair deadline");
		}
	} else return null;
	score += Math.round(15 * (1 - distanceM / place.radiusM));
	return {
		issue,
		place,
		distanceM,
		score,
		kind,
		reasons
	};
}
/** Relevance-ranked feed across all followed places; each issue appears once, under its best place. */
function buildRadarFeed(places, issues, now = /* @__PURE__ */ new Date()) {
	const best = /* @__PURE__ */ new Map();
	for (const place of places) for (const issue of issues) {
		if (issue.archived) continue;
		const item = scoreForPlace(issue, place, issues, now);
		if (item && (!best.has(issue.id) || best.get(issue.id).score < item.score)) best.set(issue.id, item);
	}
	return [...best.values()].sort((a, b) => b.score - a.score);
}
/** Open hazards near a position, for "alert me when I'm close" checks. */
function proximityAlerts(position, issues, radiusM = 250) {
	return issues.filter((i) => OPEN.includes(i.status) && (i.severity === "critical" || i.severity === "high")).map((issue) => ({
		issue,
		distanceM: distanceMeters(position.lat, position.lng, issue.lat, issue.lng)
	})).filter((a) => a.distanceM <= radiusM).sort((a, b) => a.distanceM - b.distanceM);
}
/**
* Known open hazards within a corridor around the straight line between two places.
* This is a corridor check, not turn-by-turn routing: real hazard-aware routing needs a
* routing engine (OSRM / GraphHopper) and enough verified reports to be dependable.
*/
function routeHazards(from, to, issues, corridorM = 80) {
	const hazards = issues.filter((i) => OPEN.includes(i.status)).map((issue) => ({
		issue,
		offsetM: distanceToSegmentMeters(issue, from, to),
		alongM: distanceMeters(from.lat, from.lng, issue.lat, issue.lng)
	})).filter((h) => h.offsetM <= corridorM).sort((a, b) => a.alongM - b.alongM);
	const critical = hazards.filter((h) => h.issue.severity === "critical").length;
	return {
		hazards,
		lengthM: distanceMeters(from.lat, from.lng, to.lat, to.lng),
		verdict: critical ? "avoid" : hazards.length ? "caution" : "clear"
	};
}
var KIND_BADGE = {
	hazard: {
		label: "Hazard",
		icon: TriangleAlert,
		cls: "bg-rose-500/15 text-rose-500 border-rose-500/30"
	},
	recurring: {
		label: "Recurring",
		icon: Repeat,
		cls: "bg-amber-500/15 text-amber-500 border-amber-500/30"
	},
	verified_repair: {
		label: "Verified repair",
		icon: CircleCheck,
		cls: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
	}
};
var MARKER_COLOR = {
	hazard: "#C2463A",
	recurring: "#D9982E",
	verified_repair: "#3C8F78"
};
function PinDropper({ onDrop }) {
	useMapEvents({ click: (e) => onDrop({
		lat: e.latlng.lat,
		lng: e.latlng.lng
	}) });
	return null;
}
function RadarPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const [places, setPlaces] = (0, import_react.useState)(getFollowedPlaces);
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)({
		label: "",
		kind: "home",
		lat: null,
		lng: null,
		radiusM: 400
	});
	const [route, setRoute] = (0, import_react.useState)({
		from: "pl-home",
		to: "pl-college"
	});
	const [alerts, setAlerts] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			setPlaces(getFollowedPlaces());
			setIssues(await getAllIssues());
		};
		load();
		window.addEventListener(RADAR_EVENT, load);
		window.addEventListener("civic-issues-updated", load);
		return () => {
			window.removeEventListener(RADAR_EVENT, load);
			window.removeEventListener("civic-issues-updated", load);
		};
	}, []);
	const feed = (0, import_react.useMemo)(() => buildRadarFeed(places, issues), [places, issues]);
	const fromPlace = places.find((p) => p.id === route.from);
	const toPlace = places.find((p) => p.id === route.to);
	const routeCheck = fromPlace && toPlace && fromPlace.id !== toPlace.id ? routeHazards(fromPlace, toPlace, issues) : null;
	const addPlace = (e) => {
		e.preventDefault();
		if (!draft.label.trim() || draft.lat == null) return;
		followPlace({
			...draft,
			label: draft.label.trim()
		});
		setDraft({
			label: "",
			kind: "home",
			lat: null,
			lng: null,
			radiusM: 400
		});
	};
	const checkNearMe = () => {
		const run = (pos, demo) => setAlerts({
			demo,
			items: proximityAlerts(pos, issues)
		});
		const fallback = () => run(places[0] || {
			lat: 28.6139,
			lng: 77.209
		}, true);
		if (!navigator.geolocation) return fallback();
		navigator.geolocation.getCurrentPosition((p) => run({
			lat: p.coords.latitude,
			lng: p.coords.longitude
		}, false), fallback, { timeout: 5e3 });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "w-4 h-4" }), " Neighborhood Impact Radar"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: `text-3xl sm:text-4xl font-black mt-2 ${s.heading}`,
					children: "Only what matters where you are."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-sm mt-2 max-w-2xl ${s.muted}`,
					children: "Follow your road, college, market or route to work. Instead of every report in the city, you see ranked developments: accessibility obstructions, recurring problems, hazards, and newly verified repairs."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-5`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: `font-extrabold text-sm mb-3 ${s.heading}`,
									children: "Places you follow"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `${s.inset} p-3 flex items-center gap-2 text-xs`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg",
												children: PLACE_KINDS[p.kind]?.icon
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `font-bold truncate ${s.heading}`,
													children: p.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													value: p.radiusM,
													onChange: (e) => updatePlace(p.id, { radiusM: Number(e.target.value) }),
													className: `text-[11px] bg-transparent ${s.muted} focus:outline-none`,
													children: [
														200,
														400,
														600,
														1e3
													].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
														value: r,
														children: [
															"within ",
															r,
															" m"
														]
													}, r))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => unfollowPlace(p.id),
												title: "Unfollow",
												className: "text-slate-400 hover:text-rose-500",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "w-4 h-4" })
											})
										]
									}, p.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: addPlace,
									className: `mt-4 pt-4 border-t space-y-2 ${s.divider}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[11px] font-bold ${s.text}`,
											children: "Follow a new place"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: s.input,
											placeholder: "Name, e.g. Route to office",
											value: draft.label,
											onChange: (e) => setDraft({
												...draft,
												label: e.target.value
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: s.input,
											value: draft.kind,
											onChange: (e) => setDraft({
												...draft,
												kind: e.target.value
											}),
											children: Object.entries(PLACE_KINDS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: k,
												children: [
													v.icon,
													" ",
													v.label
												]
											}, k))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[11px] ${draft.lat == null ? "text-amber-500" : s.muted}`,
											children: draft.lat == null ? "Click the map to drop a pin." : `Pin at ${draft.lat.toFixed(4)}, ${draft.lng.toFixed(4)}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: !draft.label.trim() || draft.lat == null,
											className: `${s.primaryButton} w-full`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Follow"]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-5`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: `font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "w-4 h-4 text-amber-500" }), " Hazards on my route"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: ["from", "to"].map((end) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: s.input,
										value: route[end],
										onChange: (e) => setRoute({
											...route,
											[end]: e.target.value
										}),
										children: places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: p.id,
											children: [
												end === "from" ? "From" : "To",
												": ",
												p.label
											]
										}, p.id))
									}, end))
								}),
								routeCheck && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-xs space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `font-black ${routeCheck.verdict === "avoid" ? "text-rose-500" : routeCheck.verdict === "caution" ? "text-amber-500" : "text-emerald-500"}`,
											children: [routeCheck.verdict === "avoid" ? "Critical hazard on this route" : routeCheck.verdict === "caution" ? `${routeCheck.hazards.length} known hazard(s) on this route` : "No known open hazards", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `font-normal ${s.muted}`,
												children: [
													" · ",
													(routeCheck.lengthM / 1e3).toFixed(1),
													" km straight-line"
												]
											})]
										}),
										routeCheck.hazards.map(({ issue, alongM }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
											to: `/ticket/${issue.id}`,
											className: `${s.inset} p-2 block`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-bold ${s.heading}`,
												children: issue.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `block text-[10px] ${s.muted}`,
												children: [
													(alongM / 1e3).toFixed(1),
													" km from start · ",
													issue.severity
												]
											})]
										}, issue.id)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `text-[10px] flex gap-1 ${s.muted}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3 h-3 shrink-0 mt-0.5" }),
												" Checks a ",
												80,
												" m corridor around the straight line. Turn-by-turn hazard-aware routing comes later."
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-5`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: checkNearMe,
								className: `${s.ghostButton} w-full`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "w-4 h-4 text-amber-500" }), " Check alerts near me"]
							}), alerts && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xs space-y-2",
								children: [alerts.demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-[10px] ${s.muted}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "w-3 h-3 inline" }), " No GPS, so this uses your first followed place."]
								}), alerts.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-emerald-500 font-bold",
									children: "No serious hazards within 250 m."
								}) : alerts.items.map(({ issue, distanceM }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: `/ticket/${issue.id}`,
									className: "block rounded-xl border border-rose-500/40 bg-rose-500/10 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-rose-500",
										children: [Math.round(distanceM), " m: "]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: s.heading,
										children: issue.title
									})]
								}, issue.id))]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${s.card} overflow-hidden`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-80 relative z-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
								center: [28.625, 77.205],
								zoom: 13,
								scrollWheelZoom: false,
								style: {
									height: "100%",
									width: "100%"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
										attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
										url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinDropper, { onDrop: (pos) => setDraft((d) => ({
										...d,
										...pos
									})) }),
									places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
										center: [p.lat, p.lng],
										radius: p.radiusM,
										pathOptions: {
											color: "#D9982E",
											weight: 1,
											fillOpacity: .06
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { children: p.label })
									}, p.id)),
									draft.lat != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMarker, {
										center: [draft.lat, draft.lng],
										radius: 8,
										pathOptions: {
											color: "#D9982E",
											fillOpacity: 1
										}
									}),
									routeCheck && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Polyline, {
										positions: [[fromPlace.lat, fromPlace.lng], [toPlace.lat, toPlace.lng]],
										pathOptions: {
											color: "#4A7BA6",
											dashArray: "6 6"
										}
									}),
									feed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMarker, {
										center: [item.issue.lat, item.issue.lng],
										radius: 7,
										pathOptions: {
											color: MARKER_COLOR[item.kind],
											fillOpacity: .9
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { children: item.issue.title })
									}, item.issue.id))
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: `font-extrabold text-sm mb-3 ${s.heading}`,
						children: [
							"Your radar (",
							feed.length,
							")"
						]
					}), feed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs ${s.muted}`,
						children: "Nothing relevant around the places you follow. Try a bigger radius."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: feed.map((item) => {
							const badge = KIND_BADGE[item.kind];
							const Icon = badge.icon;
							const accessible = item.reasons.includes("Blocks accessible movement");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: `/ticket/${item.issue.id}`,
								className: `${s.card} p-4 flex gap-4 items-start hover:border-amber-500/60 transition`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-1 shrink-0 w-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-black text-lg text-amber-500",
										children: item.score
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[9px] uppercase font-bold ${s.muted}`,
										children: "relevance"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-[10px] font-black uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.cls}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3 h-3" }),
													" ",
													badge.label
												]
											}), accessible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-black uppercase px-2 py-0.5 rounded-full border bg-teal-500/15 text-teal-400 border-teal-500/30 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accessibility, { className: "w-3 h-3" }), " Accessibility"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm font-bold mt-1.5 ${s.heading}`,
											children: item.issue.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `text-[11px] mt-0.5 ${s.muted}`,
											children: [
												PLACE_KINDS[item.place.kind]?.icon,
												" ",
												Math.round(item.distanceM),
												" m from ",
												item.place.label,
												" · ",
												item.reasons.join(" · ")
											]
										})
									]
								})]
							}) }, item.issue.id);
						})
					})] })]
				})]
			})]
		})
	});
}
export { RadarPage as default };
