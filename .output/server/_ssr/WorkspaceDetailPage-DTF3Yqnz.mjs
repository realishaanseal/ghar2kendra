import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useParams$1 } from "./router-compat-BtzFIg6e.mjs";
import { distanceMeters } from "./time-CSlph-K_.mjs";
import { ASSETS, buildAssetMemory, getAllIssues, summarizeMemory } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowLeft, ChartColumn, ClipboardList, ExternalLink, RotateCcwClock, Upload, UserPlus, Users } from "../_libs/lucide-react.mjs";
import { ReliabilityRing } from "./MemoryParts-Bj60hMcH.mjs";
import { WORKSPACE_EVENT, WORKSPACE_TYPES, addStaff, assignIssue, getWorkspace, resolveWithEvidence, setAssignmentStatus, staffLoad, workspaceAnalytics, workspaceIssues } from "./workspaces-i-3a9bRZ.mjs";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/WorkspaceDetailPage-DTF3Yqnz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "queue",
		label: "Queue",
		icon: ClipboardList
	},
	{
		id: "staff",
		label: "Staff",
		icon: Users
	},
	{
		id: "history",
		label: "Maintenance history",
		icon: RotateCcwClock
	},
	{
		id: "analytics",
		label: "Analytics",
		icon: ChartColumn
	}
];
var OPEN = [
	"submitted",
	"triaged",
	"in_progress"
];
var SAMPLE_AFTER = "https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80";
function WorkspaceDetailPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const { id } = useParams$1();
	const [ws, setWs] = (0, import_react.useState)(() => getWorkspace(id));
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [tab, setTab] = (0, import_react.useState)("queue");
	const [staffForm, setStaffForm] = (0, import_react.useState)({
		name: "",
		role: ""
	});
	const [resolving, setResolving] = (0, import_react.useState)(null);
	const [evidence, setEvidence] = (0, import_react.useState)({
		afterUrl: SAMPLE_AFTER,
		note: ""
	});
	(0, import_react.useEffect)(() => {
		const load = async () => {
			setWs(getWorkspace(id));
			setIssues(await getAllIssues());
		};
		load();
		window.addEventListener(WORKSPACE_EVENT, load);
		window.addEventListener("civic-issues-updated", load);
		return () => {
			window.removeEventListener(WORKSPACE_EVENT, load);
			window.removeEventListener("civic-issues-updated", load);
		};
	}, [id]);
	const analytics = (0, import_react.useMemo)(() => ws ? workspaceAnalytics(ws, issues) : null, [ws, issues]);
	if (!ws) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${s.page} flex flex-col items-center justify-center gap-3`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: s.muted,
			children: "Workspace not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
			to: "/workspaces",
			className: s.ghostButton,
			children: "All workspaces"
		})]
	});
	const queue = workspaceIssues(ws, issues).filter((i) => !i.archived).sort((a, b) => Number(OPEN.includes(b.status)) - Number(OPEN.includes(a.status)));
	const load = staffLoad(ws);
	const assets = ASSETS.filter((a) => distanceMeters(ws.lat, ws.lng, a.lat, a.lng) <= ws.radiusM + a.radiusM);
	const type = WORKSPACE_TYPES[ws.type];
	const axis = isDarkMode ? "#8a8378" : "#6b645a";
	const submitEvidence = async (e) => {
		e.preventDefault();
		const a = ws.assignments[resolving.id];
		const staff = ws.staff.find((m) => m.id === a?.staffId) || { name: "Workspace staff" };
		await resolveWithEvidence(ws.id, resolving, {
			staff,
			afterUrl: evidence.afterUrl,
			note: evidence.note || "Fixed by workspace staff."
		});
		setResolving(null);
		setEvidence({
			afterUrl: SAMPLE_AFTER,
			note: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/workspaces",
					className: `inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 text-amber-500" }), " All workspaces"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `${s.card} p-6`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: s.chipNeutral,
							children: [
								type?.icon,
								" ",
								type?.label
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: `text-2xl sm:text-3xl font-black mt-2 ${s.heading}`,
							children: ws.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-sm mt-1 ${s.muted}`,
							children: [
								ws.description,
								" · service radius ",
								ws.radiusM,
								" m"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5",
							children: [
								["Open", analytics.open],
								["Fixed", analytics.fixed],
								["Verified", analytics.verified],
								["Avg. time to fix", analytics.mttrHours == null ? "—" : `${Math.round(analytics.mttrHours)} h`],
								["Recurrence", `${Math.round(analytics.recurrenceRate * 100)}%`]
							].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${s.inset} p-3`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-[10px] uppercase font-bold tracking-wider ${s.muted}`,
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-lg font-black font-mono ${s.heading}`,
									children: value
								})]
							}, label))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-2 overflow-x-auto no-scrollbar",
					children: TABS.map(({ id: t, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(t),
						className: tab === t ? s.primaryButton : s.ghostButton,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }),
							" ",
							label
						]
					}, t))
				}),
				tab === "queue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `${s.card} p-5 overflow-x-auto`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-xs min-w-[720px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `text-left text-[10px] uppercase tracking-wider ${s.muted}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Issue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Assigned to"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Work status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "pb-3" })
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: queue.map((issue) => {
								const a = ws.assignments[issue.id];
								const open = OPEN.includes(issue.status);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: `border-t ${s.divider}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 pr-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
												to: `/ticket/${issue.id}`,
												className: `font-bold hover:text-amber-500 ${s.heading}`,
												children: issue.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `text-[10px] font-mono ${s.muted}`,
												children: [
													issue.id,
													" · ",
													issue.severity
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: `py-3 pr-3 font-mono ${open ? "text-amber-500" : "text-emerald-500"}`,
											children: issue.status.replace("_", " ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: `${s.input} !py-1.5`,
												value: a?.staffId || "",
												disabled: !open,
												onChange: (e) => assignIssue(ws.id, issue.id, e.target.value),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Unassigned"
												}), ws.staff.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: m.id,
													children: [
														m.name,
														" (",
														m.role,
														")"
													]
												}, m.id))]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 pr-3",
											children: a ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: `${s.input} !py-1.5`,
												value: a.status,
												disabled: a.status === "done",
												onChange: (e) => setAssignmentStatus(ws.id, issue.id, e.target.value),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "assigned",
														children: "Assigned"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "in_progress",
														children: "In progress"
													}),
													a.status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "done",
														children: "Done"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: s.muted,
												children: "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-right",
											children: open && a && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setResolving(issue),
												className: `${s.ghostButton} !px-3 !py-1.5`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-3.5 h-3.5" }), " Resolve with evidence"]
											})
										})
									]
								}, issue.id);
							}) })]
						}),
						queue.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs ${s.muted}`,
							children: "No public issues in this service area."
						}),
						resolving && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitEvidence,
							className: `${s.inset} p-4 mt-4 space-y-2`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-xs font-black ${s.heading}`,
									children: ["Resolution evidence for ", resolving.id]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: s.input,
									value: evidence.afterUrl,
									onChange: (e) => setEvidence({
										...evidence,
										afterUrl: e.target.value
									}),
									placeholder: "After-photo link"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: s.input,
									rows: 2,
									value: evidence.note,
									onChange: (e) => setEvidence({
										...evidence,
										note: e.target.value
									}),
									placeholder: "What was done, by whom"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[10px] ${s.muted}`,
									children: "The public ticket then needs resident attestations and a review before it counts as verified."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: s.primaryButton,
										children: "Submit evidence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setResolving(null),
										className: s.ghostButton,
										children: "Cancel"
									})]
								})
							]
						})
					]
				}),
				tab === "staff" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 space-y-3",
						children: [load.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${s.card} p-4 flex items-center gap-4`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center",
									children: m.name[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `font-bold text-sm ${s.heading}`,
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-[11px] ${s.muted}`,
										children: m.role
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-black text-amber-500",
										children: [m.open, " open"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: s.muted,
										children: [m.done, " done"]
									})]
								})
							]
						}, m.id)), load.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs ${s.muted}`,
							children: "No staff yet."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: `${s.card} p-5 space-y-2 h-fit`,
						onSubmit: (e) => {
							e.preventDefault();
							if (!staffForm.name.trim() || !staffForm.role.trim()) return;
							addStaff(ws.id, {
								name: staffForm.name.trim(),
								role: staffForm.role.trim()
							});
							setStaffForm({
								name: "",
								role: ""
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: `font-extrabold text-sm flex items-center gap-2 ${s.heading}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4 text-amber-500" }), " Add staff"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: s.input,
								placeholder: "Name",
								value: staffForm.name,
								onChange: (e) => setStaffForm({
									...staffForm,
									name: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: s.input,
								placeholder: "Responsibility, e.g. Plumber",
								value: staffForm.role,
								onChange: (e) => setStaffForm({
									...staffForm,
									role: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: `${s.primaryButton} w-full`,
								children: "Add"
							})
						]
					})]
				}),
				tab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [assets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs ${s.muted}`,
						children: "No registered assets in this service area yet."
					}), assets.map((asset) => {
						const memory = buildAssetMemory(asset, issues, ASSETS);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/memory/${asset.id}`,
							className: `${s.card} p-5 flex gap-4 items-center hover:border-amber-500/60 transition`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReliabilityRing, {
									reliability: memory.reliability,
									size: 60
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-black text-sm ${s.heading}`,
											children: asset.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[11px] mt-1 ${s.muted}`,
											children: summarizeMemory(memory)
										}),
										memory.reliability.reasons[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[11px] mt-0.5 ${s.text}`,
											children: memory.reliability.reasons[0]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4 text-slate-400" })
							]
						}, asset.id);
					})]
				}),
				tab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${s.card} p-5 lg:col-span-2`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: `font-extrabold text-sm mb-4 ${s.heading}`,
							children: "Opened vs fixed, last 8 weeks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: analytics.weekly,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: axis,
											strokeOpacity: .2,
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "week",
											tick: {
												fill: axis,
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											allowDecimals: false,
											tick: {
												fill: axis,
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "opened",
											name: "Opened",
											fill: "#C2463A",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "resolved",
											name: "Fixed",
											fill: "#3C8F78",
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${s.card} p-5`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-extrabold text-sm mb-4 ${s.heading}`,
								children: "By category (all time)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: analytics.byCategory.map(({ category, count }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-bold mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `capitalize ${s.text}`,
											children: category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-amber-500",
											children: count
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-slate-500/20 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-amber-500",
											style: { width: `${count / analytics.total * 100}%` }
										})
									})]
								}, category))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `text-[11px] mt-4 ${s.muted}`,
								children: [
									analytics.breached,
									" open issue",
									analytics.breached === 1 ? "" : "s",
									" past the repair deadline."
								]
							})
						]
					})]
				})
			]
		})
	});
}
export { WorkspaceDetailPage as default };
