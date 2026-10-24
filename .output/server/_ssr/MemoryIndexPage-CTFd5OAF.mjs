import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./router-compat-BtzFIg6e.mjs";
import { timeAgo } from "./time-CSlph-K_.mjs";
import { ASSET_KINDS, getMemoryIndex, summarizeMemory } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowRight, MapPin, RefreshCw, RotateCcwClock } from "../_libs/lucide-react.mjs";
import { GradeChip, ReliabilityRing } from "./MemoryParts-Bj60hMcH.mjs";
// node_modules/.nitro/vite/services/ssr/assets/MemoryIndexPage-CTFd5OAF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MemoryIndexPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const [memories, setMemories] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const load = () => getMemoryIndex().then(setMemories);
		load();
		window.addEventListener("civic-issues-updated", load);
		return () => window.removeEventListener("civic-issues-updated", load);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcwClock, { className: "w-4 h-4" }), " Civic Memory Engine"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: `text-3xl sm:text-4xl font-black mt-2 ${s.heading}`,
						children: "Every location remembers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm mt-2 max-w-2xl ${s.muted}`,
						children: "A closed ticket isn't the end of the story. Each road stretch, drain and transformer keeps its full history: reports, repairs, resident verifications, and how fast defects come back. Least reliable assets first."
					})
				]
			}), !memories ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-8 h-8 animate-spin text-amber-500 mx-auto" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-5",
				children: memories.map((memory) => {
					const kind = ASSET_KINDS[memory.asset.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: `/memory/${memory.asset.id}`,
						className: `${s.card} p-5 flex gap-4 items-start hover:border-amber-500/60 transition group`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReliabilityRing, { reliability: memory.reliability }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: s.chipNeutral,
											children: [
												kind?.icon,
												" ",
												kind?.label
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeChip, { grade: memory.reliability.grade })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: `font-black text-sm sm:text-base mt-2 leading-snug ${s.heading}`,
										children: memory.asset.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-[11px] mt-1 flex items-center gap-1 ${s.muted}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
											" ",
											memory.asset.ward
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs mt-2 font-semibold ${s.text}`,
										children: summarizeMemory(memory)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `text-[11px] mt-1 ${s.muted}`,
										children: [
											"Last report ",
											timeAgo(memory.stats.lastReportedAt),
											memory.stats.openCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-rose-500 font-bold",
												children: [
													" · ",
													memory.stats.openCount,
													" open"
												]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-slate-400 group-hover:text-amber-500 transition shrink-0 mt-1" })
						]
					}, memory.asset.id);
				})
			})]
		})
	});
}
export { MemoryIndexPage as default };
