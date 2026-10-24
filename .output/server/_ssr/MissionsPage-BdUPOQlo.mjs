import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { getFeed } from "./supabaseClient-qunC9q8v.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowRight, BuildingComplex, Flag, MapPin, Sparkles, Users } from "../_libs/lucide-react.mjs";
import { MISSION_EVENT, MISSION_STAGES, createMission, getMissionSuggestions, getMissions, missionProgress } from "./missionStore-Blm7tUWo.mjs";
// node_modules/.nitro/vite/services/ssr/assets/MissionsPage-BdUPOQlo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MissionsPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const { currentUser, isLoggedIn } = useAuth();
	const navigate = useNavigate$1();
	const [missions, setMissions] = (0, import_react.useState)([]);
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [issues, setIssues] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			setMissions(getMissions());
			setIssues(await getFeed());
			setSuggestions(await getMissionSuggestions());
		};
		load();
		window.addEventListener(MISSION_EVENT, load);
		window.addEventListener("civic-issues-updated", load);
		return () => {
			window.removeEventListener(MISSION_EVENT, load);
			window.removeEventListener("civic-issues-updated", load);
		};
	}, []);
	const start = (suggestion) => {
		if (!isLoggedIn) return navigate("/login");
		const mission = createMission(suggestion, currentUser);
		navigate(`/missions/${mission.id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "w-4 h-4" }), " Civic Missions"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: `text-3xl sm:text-4xl font-black mt-2 ${s.heading}`,
						children: "Many reports, one coordinated fix."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm mt-2 max-w-2xl ${s.muted}`,
						children: "When many residents report the same underlying problem, G2K groups the evidence into a mission with a coordinator, the responsible authorities, follow-up reminders and a public timeline. No government integration needed."
					})
				] }),
				suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: `text-sm font-black flex items-center gap-2 mb-3 ${s.heading}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500" }), " Suggested from clustered reports"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: suggestions.map((sug) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${s.card} p-5 border-dashed`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-black ${s.heading}`,
								children: sug.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `text-xs mt-1 ${s.muted}`,
								children: [
									sug.issueIds.length,
									" open reports within ",
									sug.spreadM,
									" m · ",
									sug.ward
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 mt-3",
								children: sug.issueIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									to: `/ticket/${id}`,
									className: s.chipNeutral,
									children: id
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `text-[11px] mt-3 flex items-center gap-1 ${s.text}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-3.5 h-3.5 text-amber-500" }),
									" ",
									sug.authorities.join(" · ")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-amber-500 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
										" ",
										sug.residents,
										" residents affected"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => start(sug),
									className: s.primaryButton,
									children: ["Start mission ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
								})]
							})
						]
					}, sug.key))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: `text-sm font-black mb-3 ${s.heading}`,
					children: "Active missions"
				}), missions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs ${s.muted}`,
					children: "No missions yet. Start one from a suggestion above."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: missions.map((mission) => {
						const p = missionProgress(mission, issues);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/missions/${mission.id}`,
							className: `${s.card} p-5 block hover:border-amber-500/60 transition`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: s.chipNeutral,
											children: mission.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: s.chip,
											children: MISSION_STAGES[p.stageIndex].label
										}),
										p.overdue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-black text-rose-500",
											children: [p.overdue.length, " follow-up overdue"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-black mt-2 ${s.heading}`,
									children: mission.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-[11px] mt-1 flex items-center gap-1 ${s.muted}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
										" ",
										mission.ward,
										" · coordinated by ",
										mission.coordinator.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] font-bold mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: s.text,
											children: [
												p.fixed,
												"/",
												p.total,
												" linked issues fixed"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-amber-500",
											children: [
												mission.members.length,
												" member",
												mission.members.length === 1 ? "" : "s"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-slate-500/20 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-emerald-500",
											style: { width: `${p.percent}%` }
										})
									})]
								})
							]
						}, mission.id);
					})
				})] })
			]
		})
	});
}
export { MissionsPage as default };
