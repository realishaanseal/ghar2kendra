import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./router-compat-BtzFIg6e.mjs";
import { CATEGORIES } from "./mockIssues-Cf5PfDAM.mjs";
import { CivicAPI } from "./supabaseClient-qunC9q8v.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { Activity, ArrowRight, ArrowUpDown, Briefcase, BuildingComplex, CircleAlert, CircleCheck, Clock, Flag, List, Map, MapPin, Network, Radar, RefreshCw, RotateCcwClock, Search, Share2, ShieldCheck, ThumbsUp, Zap } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
import { require_leaflet_src } from "../_libs/leaflet.mjs";
import { MapContainer, Marker, Popup, TileLayer } from "../_libs/react-leaflet.mjs";
// node_modules/.nitro/vite/services/ssr/assets/HomePage-D5ElAD0j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
var STATS = [
	{
		label: "Total Logged",
		value: "1,420",
		note: "↑ 12% vs last month",
		icon: Activity,
		tone: "text-amber-600 dark:text-amber-400"
	},
	{
		label: "Under Repair",
		value: "84",
		note: "Active crews",
		icon: Clock,
		tone: "text-orange-600 dark:text-orange-400",
		valueTone: "text-orange-600 dark:text-orange-400"
	},
	{
		label: "Avg Fix Time",
		value: "36.4 hrs",
		note: "-8 hrs faster",
		icon: Zap,
		tone: "text-teal-600 dark:text-teal-400"
	},
	{
		label: "Citizen Verified",
		value: "94.2%",
		note: "Zero ghost fixes",
		icon: CircleCheck,
		tone: "text-emerald-600 dark:text-emerald-400",
		valueTone: "text-emerald-600 dark:text-emerald-400"
	}
];
function HeroSection({ searchQuery, setSearchQuery, isDarkMode = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `relative overflow-hidden border-b hairline ${isDarkMode ? "bg-ink text-slate-100" : "bg-paper text-slate-950"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 paper-grain pointer-events-none",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: -6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .4 },
					className: "flex items-center gap-3 mb-8 sm:mb-10 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex h-2 w-2 relative shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-amber-500" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow text-amber-700 dark:text-amber-400 shrink-0",
							children: "Live Dispatch Radar:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `truncate text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
							children: "Ward 14 PWD rapid-repair squad en route to MG Road crater"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-12 gap-8 lg:gap-12 items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .05
							},
							className: "font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl sm:leading-[0.98]",
							children: [
								"Transforming Complaints into",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic sm:italic text-orange-600 dark:text-amber-400 font-medium",
									children: "Public Action in Real-Time"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							duration: .5,
							delay: .15
						},
						className: `lg:col-span-4 text-[15px] leading-relaxed lg:pb-2 lg:border-l lg:pl-6 hairline ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
						children: [
							"Snap a photo of any road damage, blackout, or sewer hazard. Our",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-950"}`,
								children: "Gemini Vision AI"
							}),
							" ",
							"classifies the defect, estimates severity, and delivers verified work orders directly to municipal crews."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .4,
						delay: .2
					},
					className: "mt-10 sm:mt-12 max-w-2xl relative group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-amber-600 transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Search by Ward (e.g. Ward 14), Colony, or Ticket ID...",
						className: `w-full rounded-lg pl-11 pr-4 py-3.5 text-[15px] outline-none transition-all border ${isDarkMode ? "bg-ink-raised border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15" : "bg-paper-raised border-slate-300 text-slate-950 placeholder-slate-500 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20"}`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.dl, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						duration: .5,
						delay: .3
					},
					className: "mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 border-t hairline",
					children: STATS.map(({ label, value, note, icon: Icon, tone, valueTone }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `py-5 pr-4 ${i % 2 === 1 ? "pl-4 border-l hairline" : ""} ${i >= 2 ? "border-t md:border-t-0 hairline" : ""} ${i === 2 ? "md:pl-4 md:border-l" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
								className: "flex items-center gap-2 eyebrow text-slate-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-3.5 h-3.5 ${tone}` }), label]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: `mt-2 font-display text-3xl sm:text-4xl ${valueTone || (isDarkMode ? "text-slate-50" : "text-slate-950")}`,
								children: value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: `mt-1 text-xs ${valueTone ? isDarkMode ? "text-slate-400" : "text-slate-500" : tone}`,
								children: note
							})
						]
					}, label))
				})
			]
		})]
	});
}
function CategoryPills({ selectedCategory, onSelectCategory, isLight = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2.5 overflow-x-auto no-scrollbar py-1",
		children: CATEGORIES.map((cat) => {
			const isSelected = selectedCategory === cat.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onSelectCategory(cat.id),
				className: `relative whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 border shrink-0 overflow-hidden ${isSelected ? "text-white border-amber-500 bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/25" : isLight ? "bg-white text-slate-800 border-amber-200/90 hover:border-amber-400 hover:text-slate-950 shadow-xs" : "bg-ink-raised text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"}`,
				children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: "activePillIndicator",
					className: "absolute inset-0 bg-orange-600 hover:bg-orange-700 rounded-2xl z-0",
					transition: {
						type: "spring",
						stiffness: 450,
						damping: 32
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative z-10 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: cat.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: isSelected ? "text-white font-black" : isLight ? "text-slate-800 font-bold" : "text-slate-200 font-bold",
							children: cat.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[10px] px-2 py-0.5 rounded-full font-black transition-colors ${isSelected ? "bg-black/30 text-white" : isLight ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-slate-800 text-slate-300"}`,
							children: cat.count
						})
					]
				})]
			}, cat.id);
		})
	});
}
var SEVERITY_CONFIG = {
	critical: {
		label: "Critical Hazard",
		badge: "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-black",
		dot: "bg-white"
	},
	high: {
		label: "High Urgency",
		badge: "bg-amber-600 text-white shadow-md shadow-amber-600/30 font-black",
		dot: "bg-white"
	},
	medium: {
		label: "Moderate",
		badge: "bg-orange-600 text-white shadow-md shadow-orange-600/30 font-black",
		dot: "bg-white"
	},
	low: {
		label: "Low",
		badge: "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black",
		dot: "bg-white"
	}
};
var STAGES = [
	{
		id: 1,
		label: "Logged"
	},
	{
		id: 2,
		label: "Triaged"
	},
	{
		id: 3,
		label: "Crew Dispatched"
	},
	{
		id: 4,
		label: "Verified"
	}
];
function IssueCard({ issue, isLight = false }) {
	const [upvotes, setUpvotes] = (0, import_react.useState)(issue.upvotes);
	const [hasUpvoted, setHasUpvoted] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleUpvote = (e) => {
		e.stopPropagation();
		if (!hasUpvoted) {
			setUpvotes((prev) => prev + 1);
			setHasUpvoted(true);
			CivicAPI.upvoteIssue(issue.id);
		} else {
			setUpvotes((prev) => prev - 1);
			setHasUpvoted(false);
		}
	};
	const handleShare = (e) => {
		e.stopPropagation();
		navigator.clipboard?.writeText(window.location.origin + `/ticket/${issue.id}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const severity = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.medium;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		whileHover: { y: -6 },
		transition: { duration: .3 },
		className: `rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group border ${isLight ? "bg-white border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:border-amber-400" : "bg-ink-raised/90 border-slate-800/90 shadow-xl hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:border-amber-500/40"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
			to: `/ticket/${issue.id}`,
			className: "block relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: issue.imageUrl,
					alt: issue.title,
					className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out",
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 left-3 flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-md ${severity.badge}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${severity.dot} animate-pulse` }), severity.label]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 right-3 text-[11px] font-mono font-bold bg-black/70 text-amber-300 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/20",
					children: issue.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-3.5 h-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate max-w-[190px] text-[11px] font-medium",
							children: issue.department
						})]
					}), issue.status === "resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3 h-3 text-white" }), " Resolved"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-slate-950" }),
							" ",
							issue.slaRemainingHours,
							"h SLA"
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `mb-4 p-2.5 rounded-2xl border flex items-center justify-between ${isLight ? "bg-slate-50 border-slate-200/90" : "bg-slate-900/90 border-slate-800"}`,
					children: STAGES.map((s, index) => {
						const isPastOrCurrent = issue.timelineStep >= s.id;
						const isCurrent = issue.timelineStep === s.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all ${isCurrent ? "bg-orange-600 hover:bg-orange-700 text-white ring-4 ring-orange-500/20 shadow-md" : isPastOrCurrent ? "bg-emerald-500 text-white" : isLight ? "bg-slate-200 text-slate-400" : "bg-slate-800 text-slate-500"}`,
								children: isPastOrCurrent && issue.timelineStep > s.id ? "✓" : s.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[9px] font-bold mt-1 tracking-tight truncate max-w-[62px] text-center ${isCurrent ? "text-amber-600 font-extrabold" : isPastOrCurrent ? isLight ? "text-slate-700" : "text-slate-300" : "text-slate-400"}`,
								children: s.label
							})]
						}), index < STAGES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-[2px] mx-1 rounded-full transition-colors ${issue.timelineStep > s.id ? "bg-emerald-500" : isLight ? "bg-slate-200" : "bg-slate-800"}` })] }, s.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					to: `/ticket/${issue.id}`,
					className: "block group-hover:text-amber-600 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: `font-extrabold text-base leading-snug mb-2 line-clamp-2 ${isLight ? "text-slate-900" : "text-white"}`,
						children: issue.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs line-clamp-2 mb-4 leading-relaxed font-normal ${isLight ? "text-slate-600" : "text-slate-400"}`,
					children: issue.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `space-y-1.5 text-xs border-t pt-3 ${isLight ? "border-slate-100 text-slate-500" : "border-slate-800/80 text-slate-400"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `flex items-center gap-1.5 font-medium truncate ${isLight ? "text-slate-800" : "text-slate-300"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-rose-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: issue.address
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center justify-between text-[11px] ${isLight ? "text-slate-400" : "text-slate-500"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["By: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: isLight ? "text-slate-700" : "text-slate-400",
							children: issue.reportedBy
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: issue.createdAt })]
					})]
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `px-5 py-3.5 border-t flex items-center justify-between ${isLight ? "bg-slate-50/90 border-slate-100" : "bg-slate-900/60 border-slate-800/80"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				whileTap: { scale: .88 },
				onClick: handleUpvote,
				className: `flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${hasUpvoted ? "bg-orange-600 hover:bg-orange-700 border-amber-500 text-white shadow-md shadow-orange-500/25" : isLight ? "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70" : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: `w-3.5 h-3.5 ${hasUpvoted ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"I Face This (",
					upvotes,
					")"
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: `/ticket/${issue.id}`,
					className: `flex items-center gap-1 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-xs border ${isLight ? "text-amber-950 bg-amber-100 hover:bg-amber-200 border-amber-300" : "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleShare,
					className: `flex items-center gap-1 text-xs font-medium p-2 rounded-xl border transition ${isLight ? "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100" : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"}`,
					title: "Share Ticket",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5 text-slate-400" }), copied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-emerald-600 font-bold",
						children: "Copied!"
					})]
				})]
			})]
		})]
	});
}
var createEmojiIcon = (emoji) => {
	return import_leaflet_src.default.divIcon({
		className: "custom-leaflet-pin",
		html: `<div style="
      background: white;
      border: 2px solid #1565C0;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
    ">${emoji}</div>`,
		iconSize: [34, 34],
		iconAnchor: [17, 17],
		popupAnchor: [0, -18]
	});
};
var CATEGORY_ICONS = {
	roads: "🛣️",
	electricity: "⚡",
	water: "💧",
	waste: "🗑️",
	safety: "🚨"
};
function CityMap({ issues }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
			center: [28.625, 77.21],
			zoom: 13,
			scrollWheelZoom: false,
			style: {
				width: "100%",
				height: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
				url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			}), issues.map((issue) => {
				const emoji = CATEGORY_ICONS[issue.category] || "📍";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
					position: [issue.lat, issue.lng],
					icon: createEmojiIcon(emoji),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-1 max-w-[200px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: issue.imageUrl,
								alt: issue.title,
								className: "w-full h-24 object-cover rounded-md mb-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded",
								children: issue.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-xs text-gray-900 mt-1 line-clamp-2",
								children: issue.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-gray-500 mt-0.5",
								children: issue.address
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-semibold text-gray-700 mt-1",
								children: [
									"👍 ",
									issue.upvotes,
									" upvotes"
								]
							})
						]
					}) })
				}, issue.id);
			})]
		})
	});
}
var MODULES = [
	{
		to: "/memory",
		icon: RotateCcwClock,
		title: "Civic Memory",
		text: "Every road and drain keeps its repair history."
	},
	{
		to: "/insights",
		icon: Network,
		title: "Insights",
		text: "Separate complaints, one underlying cause."
	},
	{
		to: "/missions",
		icon: Flag,
		title: "Missions",
		text: "Many reports, one coordinated fix."
	},
	{
		to: "/radar",
		icon: Radar,
		title: "My Radar",
		text: "Only what matters around your places."
	},
	{
		to: "/workspaces",
		icon: Briefcase,
		title: "Workspaces",
		text: "For colleges, RWAs and NGOs that fix things."
	},
	{
		to: "/ticket/G2K-2026-0518",
		icon: ShieldCheck,
		title: "Proof of Resolution",
		text: "Fixes close only on resident quorum + review."
	}
];
/** Entry points to the civic modules, shown above the live feed. */
function ModuleStrip({ isDarkMode }) {
	const s = surface(isDarkMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8",
		children: MODULES.map(({ to, icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
			to,
			className: `${s.card} !rounded-2xl !shadow-md p-3.5 hover:border-amber-500/60 transition group`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-5 h-5 text-amber-500 group-hover:scale-110 transition" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `text-xs font-black mt-2 ${s.heading}`,
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `text-[11px] mt-0.5 leading-snug ${s.muted}`,
					children: text
				})
			]
		}, to))
	});
}
function HomePage({ isDarkMode = true }) {
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [viewMode, setViewMode] = (0, import_react.useState)("feed");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("upvotes");
	const loadIssues = async () => {
		try {
			const data = await CivicAPI.getIssues();
			setIssues(data);
		} catch (err) {
			console.error("Failed to load issues", err);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadIssues();
		const handleUpdate = () => loadIssues();
		const handleClock = () => loadIssues();
		window.addEventListener("civic-issues-updated", handleUpdate);
		window.addEventListener("civic-clock-advanced", handleClock);
		return () => {
			window.removeEventListener("civic-issues-updated", handleUpdate);
			window.removeEventListener("civic-clock-advanced", handleClock);
		};
	}, []);
	const filteredIssues = issues.filter((issue) => {
		const matchesCategory = selectedCategory === "all" || issue.category === selectedCategory;
		const matchesSearch = issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) || issue.address?.toLowerCase().includes(searchQuery.toLowerCase()) || issue.ward?.toLowerCase().includes(searchQuery.toLowerCase()) || issue.id?.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	}).sort((a, b) => {
		if (sortBy === "upvotes") return (b.upvotes || 0) - (a.upvotes || 0);
		if (sortBy === "severity") {
			const rank = {
				critical: 3,
				high: 2,
				medium: 1,
				low: 0
			};
			return (rank[b.severity] || 0) - (rank[a.severity] || 0);
		}
		return 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen pb-24 transition-colors duration-300 ${isDarkMode ? "bg-ink text-slate-100" : "bg-paper text-slate-900"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {
				searchQuery,
				setSearchQuery,
				isDarkMode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleStrip, { isDarkMode }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
							selectedCategory,
							onSelectCategory: setSelectedCategory,
							isLight: !isDarkMode
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 self-end md:self-auto shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${!isDarkMode ? "bg-white text-slate-800 border border-amber-200/90 shadow-md shadow-amber-950/5" : "bg-ink-raised text-slate-300 border border-slate-800 shadow-lg"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "w-3.5 h-3.5 text-slate-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400 font-medium",
										children: "Sort:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										className: `bg-transparent font-black focus:outline-none cursor-pointer ${!isDarkMode ? "text-amber-700" : "text-amber-400"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "upvotes",
												className: !isDarkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white",
												children: "🔥 Most Upvoted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "severity",
												className: !isDarkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white",
												children: "🚨 High Severity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "recent",
												className: !isDarkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white",
												children: "🕒 Most Recent"
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center p-1 rounded-2xl shadow-md ${!isDarkMode ? "bg-white/80 border border-amber-200" : "bg-ink-raised border border-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setViewMode("feed"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${viewMode === "feed" ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/30" : !isDarkMode ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Feed" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setViewMode("map"),
									className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${viewMode === "map" ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/30" : !isDarkMode ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Map" })]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Public Grievances:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-sm font-black px-2 py-0.5 rounded-md ${!isDarkMode ? "text-amber-800 bg-amber-100 border border-amber-300" : "text-amber-400 bg-amber-950/60 border border-amber-800/60"}`,
								children: filteredIssues.length
							})]
						}), searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchQuery(""),
							className: "text-xs text-amber-600 font-bold hover:underline",
							children: "Clear search filter"
						})]
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-20 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-slate-500",
							children: "Connecting to Municipal Grid..."
						})]
					}) : filteredIssues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl p-12 text-center border max-w-md mx-auto my-8 shadow-xl ${!isDarkMode ? "bg-white border-amber-200 shadow-amber-900/5" : "bg-ink-raised/80 border-slate-800 shadow-2xl"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `text-lg font-bold ${!isDarkMode ? "text-slate-900" : "text-white"}`,
								children: "No grievances found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-xs mt-1 mb-5 ${!isDarkMode ? "text-slate-500" : "text-slate-400"}`,
								children: "Try searching a different ward or reset your category filters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSelectedCategory("all");
									setSearchQuery("");
								},
								className: "bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition",
								children: "Reset All Filters"
							})
						]
					}) : viewMode === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-3xl overflow-hidden border shadow-2xl ${!isDarkMode ? "border-amber-200" : "border-slate-800"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMap, { issues: filteredIssues })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layout: true,
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: filteredIssues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueCard, {
							issue,
							isLight: !isDarkMode
						}, issue.id)) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: `mt-24 border-t py-12 px-4 text-center text-xs transition-colors duration-300 ${!isDarkMode ? "bg-paper-sunk border-amber-200 text-slate-600" : "bg-ink border-slate-800 text-slate-400"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center justify-center gap-2 font-extrabold text-sm ${!isDarkMode ? "text-slate-900" : "text-white"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏛️ Ghar2Kendra Governance Grid (घर से केंद्र तक)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-600 font-semibold",
									children: "Smart Cities Mission Initiative"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `max-w-xl mx-auto leading-relaxed ${!isDarkMode ? "text-slate-600" : "text-slate-500"}`,
							children: "A real-time public grievance, IoT surveillance, and Gemini multimodal AI redressal network operating across Municipal Corporations, DISCOM, and PWD."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-6 pt-2 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hover:text-amber-600 transition cursor-pointer",
									children: "Swachh Bharat Urban"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hover:text-amber-600 transition cursor-pointer",
									children: "Digital India AI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hover:text-amber-600 transition cursor-pointer",
									children: "National Data Portal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hover:text-amber-600 transition cursor-pointer",
									children: "CPGRAMS"
								})
							]
						})
					]
				})
			})
		]
	});
}
export { HomePage as default };
