import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useParams$1 } from "./router-compat-BtzFIg6e.mjs";
import { formatDate } from "./time-CSlph-K_.mjs";
import { ASSET_KINDS, getAssetMemory } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowLeft, BuildingComplex, CalendarClock, Info, MapPin, RefreshCw } from "../_libs/lucide-react.mjs";
import { GradeChip, MemoryTimeline, ReliabilityRing, StatTile } from "./MemoryParts-Bj60hMcH.mjs";
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from "../_libs/react-leaflet.mjs";
// node_modules/.nitro/vite/services/ssr/assets/AssetMemoryPage-Dhriy7Ye.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_COLOR = {
	submitted: "#C2463A",
	triaged: "#D9982E",
	in_progress: "#D9982E",
	resolved: "#4A7BA6",
	verified: "#3C8F78",
	rejected: "#888888"
};
function AssetMemoryPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const { assetId } = useParams$1();
	const [memory, setMemory] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		const load = () => getAssetMemory(assetId).then(setMemory);
		load();
		window.addEventListener("civic-issues-updated", load);
		return () => window.removeEventListener("civic-issues-updated", load);
	}, [assetId]);
	if (memory === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${s.page} flex items-center justify-center`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-8 h-8 animate-spin text-amber-500" })
	});
	if (memory === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${s.page} flex flex-col items-center justify-center gap-3`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: s.muted,
			children: [
				"No asset with id ",
				assetId,
				"."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
			to: "/memory",
			className: s.ghostButton,
			children: "Back to Civic Memory"
		})]
	});
	const { asset, stats, reliability, outlook, events, issues } = memory;
	const kind = ASSET_KINDS[asset.kind];
	const round = (x) => x == null ? "—" : Math.round(x);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/memory",
					className: `inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 text-amber-500" }), " All assets"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `${s.card} p-6 flex flex-col sm:flex-row gap-5 sm:items-center`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReliabilityRing, {
						reliability,
						size: 96
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: s.chipNeutral,
										children: [
											kind?.icon,
											" ",
											kind?.label
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: s.chipNeutral,
										children: asset.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeChip, { grade: reliability.grade })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: `text-2xl sm:text-3xl font-black mt-2 ${s.heading}`,
								children: asset.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1 ${s.muted}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }),
										" ",
										asset.ward
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-3.5 h-3.5" }),
										" ",
										asset.custodian
									]
								})]
							}),
							reliability.reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: `text-[11px] mt-3 space-y-0.5 ${s.text}`,
								children: reliability.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", r] }, r))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							s,
							label: "Reports",
							value: stats.reports
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							s,
							label: "Repairs",
							value: stats.repairs,
							hint: `${stats.verifiedRepairs} verified`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							s,
							label: "Recurrences",
							value: stats.recurrences
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							s,
							label: "Repair life",
							value: `${round(stats.meanRepairLifeDays)}d`,
							hint: "avg. before defect returns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							s,
							label: "Last verified",
							value: stats.lastVerifiedAt ? formatDate(stats.lastVerifiedAt) : "Never"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: `${s.card} p-6 lg:col-span-2`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: `font-extrabold text-sm mb-5 ${s.heading}`,
							children: "Asset history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryTimeline, {
							events,
							s
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `${s.card} overflow-hidden`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-56 relative z-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
										center: [asset.lat, asset.lng],
										zoom: 16,
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
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
												center: [asset.lat, asset.lng],
												radius: asset.radiusM,
												pathOptions: {
													color: "#D9982E",
													weight: 1,
													fillOpacity: .08
												}
											}),
											issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMarker, {
												center: [issue.lat, issue.lng],
												radius: 7,
												pathOptions: {
													color: STATUS_COLOR[issue.status] || "#888",
													fillOpacity: .85
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [
													issue.id,
													": ",
													issue.title
												] })
											}, issue.id))
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${s.card} p-5`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: `font-extrabold text-sm flex items-center gap-2 ${s.heading}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "w-4 h-4 text-amber-500" }), " Outlook"]
									}),
									outlook ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-xs mt-2 ${s.text}`,
										children: [
											"If the repair method doesn't change, the next failure is likely around",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: outlook.overdue ? "text-rose-500" : "text-amber-500",
												children: formatDate(outlook.expectedFailureAt)
											}),
											outlook.overdue ? " (already overdue)" : "",
											". Based on: ",
											outlook.basis,
											"."
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs mt-2 ${s.muted}`,
										children: stats.openCount > 0 ? "An issue is still open here. The outlook appears once it is repaired." : "Not enough repeat failures yet to estimate anything. That is good news."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-[10px] mt-3 flex gap-1 ${s.muted}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3 h-3 shrink-0 mt-0.5" }), " A statistical average of past repairs, not a guarantee."]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${s.card} p-5`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-extrabold text-sm mb-3 ${s.heading}`,
									children: "Tickets on this asset"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
										to: `/ticket/${issue.id}`,
										className: `${s.inset} p-2.5 flex items-center gap-2 hover:border-amber-500/50 transition`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-2 h-2 rounded-full shrink-0",
												style: { background: STATUS_COLOR[issue.status] || "#888" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-[11px] font-semibold truncate flex-1 ${s.text}`,
												children: issue.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-slate-400",
												children: issue.status.replace("_", " ")
											})
										]
									}) }, issue.id))
								})]
							})
						]
					})]
				})
			]
		})
	});
}
export { AssetMemoryPage as default };
