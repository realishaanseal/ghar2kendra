import "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./router-compat-BtzFIg6e.mjs";
import { formatDate } from "./time-CSlph-K_.mjs";
import { GRADE_STYLES } from "./surface-asNnoH_8.mjs";
import { CircleCheck, FileText, Hammer, Repeat, TriangleAlert } from "../_libs/lucide-react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/** Circular 0–100 reliability gauge. */
function ReliabilityRing({ reliability, size = 72 }) {
	const style = GRADE_STYLES[reliability.grade];
	const r = (size - 10) / 2;
	const circumference = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative shrink-0",
		style: {
			width: size,
			height: size
		},
		title: `Reliability ${reliability.score}/100`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				strokeWidth: "7",
				className: "stroke-slate-500/20",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				strokeWidth: "7",
				fill: "none",
				strokeLinecap: "round",
				className: style.ring,
				strokeDasharray: circumference,
				strokeDashoffset: circumference * (1 - reliability.score / 100)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-black font-mono ${size > 64 ? "text-lg" : "text-sm"} ${style.text}`,
				children: reliability.score
			}), size > 64 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] uppercase tracking-wider font-bold text-slate-400",
				children: style.label
			})]
		})]
	});
}
function GradeChip({ grade }) {
	const style = GRADE_STYLES[grade];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.chip}`,
		children: style.label
	});
}
var EVENT_STYLES = {
	report: {
		icon: FileText,
		dot: "bg-amber-500",
		label: "Reported"
	},
	recurrence: {
		icon: Repeat,
		dot: "bg-rose-500",
		label: "Recurred"
	},
	repair: {
		icon: Hammer,
		dot: "bg-teal-500",
		label: "Repaired"
	},
	verification: {
		icon: CircleCheck,
		dot: "bg-emerald-500",
		label: "Verified"
	},
	dispute: {
		icon: TriangleAlert,
		dot: "bg-rose-500",
		label: "Disputed"
	}
};
/** Vertical event history for an asset. */
function MemoryTimeline({ events, s, limit }) {
	const shown = limit ? events.slice(0, limit) : events;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: `relative pl-6 space-y-5 border-l-2 ml-2 ${s.divider}`,
		children: shown.map((event, idx) => {
			const style = EVENT_STYLES[event.type] || EVENT_STYLES.report;
			const Icon = style.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full ring-4 ring-black/5 ${style.dot}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5 text-slate-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs font-black ${s.heading}`,
								children: style.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-slate-400",
								children: formatDate(event.at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: `/ticket/${event.issueId}`,
								className: s.chipNeutral,
								children: event.issueId
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs mt-1 font-semibold ${s.text}`,
						children: event.title
					}),
					event.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-[11px] mt-0.5 ${s.muted}`,
						children: event.note
					})
				]
			}, `${event.issueId}-${event.type}-${idx}`);
		})
	});
}
function StatTile({ label, value, hint, s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${s.inset} p-3`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `text-[10px] uppercase tracking-wider font-bold ${s.muted}`,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `text-xl font-black font-mono mt-0.5 ${s.heading}`,
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `text-[10px] mt-0.5 ${s.muted}`,
				children: hint
			})
		]
	});
}
export { GradeChip, MemoryTimeline, ReliabilityRing, StatTile };
