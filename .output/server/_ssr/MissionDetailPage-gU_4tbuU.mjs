import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useParams$1 } from "./router-compat-BtzFIg6e.mjs";
import { getFeed } from "./supabaseClient-qunC9q8v.mjs";
import { formatDate, parseWhen, timeAgo } from "./time-CSlph-K_.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowLeft, Bell, BuildingComplex, Camera, Check, Clock, Copy, FileText, Flag, HandHeart, ShieldCheck, Users } from "../_libs/lucide-react.mjs";
import { MISSION_EVENT, MISSION_STAGES, addContribution, addReminder, advanceMission, completeReminder, draftSubmission, getMission, joinMission, missionProgress } from "./missionStore-Blm7tUWo.mjs";
// node_modules/.nitro/vite/services/ssr/assets/MissionDetailPage-gU_4tbuU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTRIBUTION_ICONS = {
	photo: Camera,
	submission: FileText,
	verification: ShieldCheck,
	volunteer: HandHeart
};
var CONTRIBUTION_LABELS = {
	photo: "Added evidence",
	submission: "Prepared submission",
	verification: "Verified outcome",
	volunteer: "Volunteered"
};
function MissionDetailPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const { id } = useParams$1();
	const { currentUser, isLoggedIn } = useAuth();
	const [mission, setMission] = (0, import_react.useState)(() => getMission(id));
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [tab, setTab] = (0, import_react.useState)("photo");
	const [note, setNote] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [reminder, setReminder] = (0, import_react.useState)({
		dueAt: "",
		label: ""
	});
	(0, import_react.useEffect)(() => {
		const load = async () => {
			setMission(getMission(id));
			setIssues(await getFeed());
		};
		load();
		window.addEventListener(MISSION_EVENT, load);
		window.addEventListener("civic-issues-updated", load);
		return () => {
			window.removeEventListener(MISSION_EVENT, load);
			window.removeEventListener("civic-issues-updated", load);
		};
	}, [id]);
	if (!mission) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${s.page} flex flex-col items-center justify-center gap-3`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: s.muted,
			children: [
				"Mission ",
				id,
				" not found."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
			to: "/missions",
			className: s.ghostButton,
			children: "All missions"
		})]
	});
	const p = missionProgress(mission, issues);
	const isMember = isLoggedIn && mission.members.includes(currentUser.id);
	const isCoordinator = isLoggedIn && mission.coordinator.id === currentUser.id;
	const now = /* @__PURE__ */ new Date();
	const timeline = [...mission.milestones.map((m) => ({
		...m,
		kind: "milestone"
	})), ...mission.contributions.map((c) => ({
		at: c.at,
		label: `${CONTRIBUTION_LABELS[c.type]}: ${c.note}`,
		by: c.by,
		kind: c.type,
		url: c.url
	}))].sort((a, b) => parseWhen(b.at, now) - parseWhen(a.at, now));
	const contribute = (type) => {
		if (!note.trim() && type !== "submission") return;
		addContribution(mission.id, currentUser, {
			type,
			note: note.trim() || "Drafted the joint petition",
			url
		});
		setNote("");
		setUrl("");
	};
	const verifiable = p.linked.filter((i) => i.status === "resolved");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/missions",
					className: `inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 text-amber-500" }), " All missions"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `${s.card} p-6`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-[260px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "w-4 h-4" }),
												" ",
												mission.id
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: `text-2xl sm:text-3xl font-black mt-2 ${s.heading}`,
											children: mission.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm mt-2 ${s.text}`,
											children: mission.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `text-xs mt-3 ${s.muted}`,
											children: [
												"Coordinator ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: s.heading,
													children: mission.coordinator.name
												}),
												mission.coordinator.role ? ` (${mission.coordinator.role})` : "",
												" · ",
												mission.members.length,
												" member",
												mission.members.length === 1 ? "" : "s",
												" · ",
												p.residents,
												" residents affected"
											]
										})
									]
								}),
								isLoggedIn && !isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => joinMission(mission.id, currentUser),
									className: s.primaryButton,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }), " Join mission"]
								}),
								isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: s.chip,
									children: "You're a member"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "grid grid-cols-5 gap-2 mt-6",
							children: MISSION_STAGES.map((stage, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								title: stage.hint,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full ${idx <= p.stageIndex ? "bg-amber-500" : "bg-slate-500/25"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-[10px] mt-1.5 font-bold ${idx <= p.stageIndex ? "text-amber-500" : s.muted}`,
									children: stage.label
								})]
							}, stage.id))
						}),
						isCoordinator && p.stageIndex < MISSION_STAGES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								const next = MISSION_STAGES[p.stageIndex + 1];
								advanceMission(mission.id, next.id, currentUser, `Moved to "${next.label}"`);
							},
							className: `${s.ghostButton} mt-4`,
							children: [
								"Mark as \"",
								MISSION_STAGES[p.stageIndex + 1].label,
								"\""
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-6`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: `font-extrabold text-sm ${s.heading}`,
									children: [
										"Evidence (",
										p.total,
										" linked grievances)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-emerald-500",
									children: [
										p.fixed,
										"/",
										p.total,
										" fixed · ",
										p.verified,
										" verified"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-3",
								children: p.linked.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: `/ticket/${issue.id}`,
									className: `${s.inset} p-3 flex gap-3 items-center hover:border-amber-500/50 transition`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: issue.imageUrl,
											alt: "",
											className: "w-16 h-12 rounded-lg object-cover shrink-0 bg-slate-800"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-xs font-bold truncate ${s.heading}`,
												children: issue.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: `text-[11px] truncate ${s.muted}`,
												children: [
													issue.id,
													" · ",
													issue.address
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-mono font-bold shrink-0 ${issue.status === "verified" ? "text-emerald-500" : issue.status === "resolved" ? "text-teal-400" : "text-amber-500"}`,
											children: issue.status.replace("_", " ")
										})
									]
								}) }, issue.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `${s.card} p-6`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: `font-extrabold text-sm mb-5 ${s.heading}`,
								children: "Public progress timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: `relative pl-6 space-y-4 border-l-2 ml-2 ${s.divider}`,
								children: timeline.map((t, i) => {
									const Icon = CONTRIBUTION_ICONS[t.kind] || Flag;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `text-xs font-bold flex items-center gap-1.5 ${s.heading}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5 text-amber-500" }),
													" ",
													t.label
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `text-[10px] font-mono mt-0.5 ${s.muted}`,
												children: [
													t.by,
													" · ",
													timeAgo(parseWhen(t.at, now), now)
												]
											}),
											t.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: t.url,
												target: "_blank",
												rel: "noreferrer",
												className: "text-[11px] text-amber-500 underline",
												children: "View attachment"
											})
										]
									}, i);
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: `${s.card} p-5`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: `font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-4 h-4 text-amber-500" }), " Responsible authorities"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: mission.authorities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `${s.inset} p-2.5 text-[11px]`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-bold ${s.heading}`,
											children: a.name
										}), a.contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-mono ${s.muted}`,
											children: a.contact
										})]
									}, a.name))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: `${s.card} p-5`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: `font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4 text-amber-500" }), " Follow-up reminders"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-2",
										children: [mission.reminders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: `text-[11px] ${s.muted}`,
											children: "No reminders yet."
										}), mission.reminders.map((r) => {
											const due = parseWhen(r.dueAt, now);
											const overdue = !r.done && due < now;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: `${s.inset} p-2.5 flex items-start gap-2 text-[11px] ${r.done ? "opacity-50" : ""}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: `w-3.5 h-3.5 mt-0.5 shrink-0 ${overdue ? "text-rose-500" : "text-amber-500"}` }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: `font-bold ${r.done ? "line-through" : ""} ${s.heading}`,
															children: r.label
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: overdue ? "text-rose-500 font-bold" : s.muted,
															children: [overdue ? "Overdue · " : "", formatDate(due)]
														})]
													}),
													!r.done && isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => completeReminder(mission.id, r.id),
														title: "Mark done",
														className: "text-emerald-500",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" })
													})
												]
											}, r.id);
										})]
									}),
									isMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "mt-3 space-y-2",
										onSubmit: (e) => {
											e.preventDefault();
											if (!reminder.dueAt || !reminder.label.trim()) return;
											addReminder(mission.id, {
												dueAt: new Date(reminder.dueAt).toISOString(),
												label: reminder.label.trim()
											});
											setReminder({
												dueAt: "",
												label: ""
											});
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: s.input,
											placeholder: "e.g. Call the JE if no reply",
											value: reminder.label,
											onChange: (e) => setReminder({
												...reminder,
												label: e.target.value
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												className: s.input,
												value: reminder.dueAt,
												onChange: (e) => setReminder({
													...reminder,
													dueAt: e.target.value
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: s.primaryButton,
												type: "submit",
												children: "Add"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: `${s.card} p-5`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-extrabold text-sm mb-3 ${s.heading}`,
									children: "Contribute"
								}), !isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									to: "/login",
									className: s.primaryButton,
									children: "Sign in to contribute"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-4 gap-1 mb-3",
										children: [
											"photo",
											"submission",
											"verification",
											"volunteer"
										].map((t) => {
											const Icon = CONTRIBUTION_ICONS[t];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setTab(t),
												className: `flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-bold border transition ${tab === t ? "bg-orange-600 text-white border-orange-600" : `${s.inset} ${s.text}`}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }),
													" ",
													t === "submission" ? "Petition" : t[0].toUpperCase() + t.slice(1)
												]
											}, t);
										})
									}),
									tab === "photo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: s.input,
												placeholder: "Photo link (optional)",
												value: url,
												onChange: (e) => setUrl(e.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												className: s.input,
												rows: 2,
												placeholder: "What does it show? Where and when?",
												value: note,
												onChange: (e) => setNote(e.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => contribute("photo"),
												className: `${s.primaryButton} w-full`,
												children: "Add evidence"
											})
										]
									}),
									tab === "submission" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setDraft(draftSubmission(mission, issues)),
											className: `${s.ghostButton} w-full`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4" }), " Draft petition from evidence"]
										}), draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											className: `${s.input} font-mono text-[10px]`,
											rows: 12,
											value: draft,
											onChange: (e) => setDraft(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													navigator.clipboard?.writeText(draft);
													setCopied(true);
													setTimeout(() => setCopied(false), 1500);
												},
												className: `${s.ghostButton} flex-1`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }),
													" ",
													copied ? "Copied" : "Copy"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => contribute("submission"),
												className: `${s.primaryButton} flex-1`,
												children: "Log it"
											})]
										})] })]
									}),
									tab === "verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2 text-[11px]",
										children: verifiable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: s.muted,
											children: "No linked issue is waiting for verification yet. When a repair is claimed, it appears here."
										}) : verifiable.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
											to: `/ticket/${i.id}`,
											className: `${s.inset} p-2.5 block font-bold ${s.heading}`,
											children: [
												"Verify ",
												i.id,
												" on site →"
											]
										}, i.id))
									}),
									tab === "volunteer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												className: s.input,
												rows: 2,
												placeholder: "How can you help? e.g. join the inspection walk",
												value: note,
												onChange: (e) => setNote(e.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-[10px] ${s.muted}`,
												children: "Only authorised, safe community work coordinated with the responsible department. Never open drains, wiring or manholes yourself."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => contribute("volunteer"),
												className: `${s.primaryButton} w-full`,
												children: "Sign up"
											})
										]
									})
								] })]
							})
						]
					})]
				})
			]
		})
	});
}
export { MissionDetailPage as default };
