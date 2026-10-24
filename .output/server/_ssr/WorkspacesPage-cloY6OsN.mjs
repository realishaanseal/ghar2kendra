import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { ASSETS, getAllIssues } from "./memoryStore-B4afoKcQ.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowRight, Briefcase, Plus, Users } from "../_libs/lucide-react.mjs";
import { WORKSPACE_EVENT, WORKSPACE_TYPES, createWorkspace, getWorkspaces, workspaceAnalytics } from "./workspaces-i-3a9bRZ.mjs";
// node_modules/.nitro/vite/services/ssr/assets/WorkspacesPage-cloY6OsN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkspacesPage({ isDarkMode = true }) {
	const s = surface(isDarkMode);
	const navigate = useNavigate$1();
	const [workspaces, setWorkspaces] = (0, import_react.useState)(getWorkspaces);
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		type: "college",
		assetId: ASSETS[0].id,
		radiusM: 400
	});
	(0, import_react.useEffect)(() => {
		const load = async () => {
			setWorkspaces(getWorkspaces());
			setIssues(await getAllIssues());
		};
		load();
		window.addEventListener(WORKSPACE_EVENT, load);
		return () => window.removeEventListener(WORKSPACE_EVENT, load);
	}, []);
	const create = (e) => {
		e.preventDefault();
		if (!form.name.trim()) return;
		const anchor = ASSETS.find((a) => a.id === form.assetId);
		const ws = createWorkspace({
			name: form.name.trim(),
			type: form.type,
			lat: anchor.lat,
			lng: anchor.lng,
			radiusM: Number(form.radiusM),
			description: `Around ${anchor.name}`
		});
		navigate(`/workspaces/${ws.id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: s.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-4 h-4" }), " G2K Workspaces"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: `text-3xl sm:text-4xl font-black mt-2 ${s.heading}`,
					children: "For the people who can fix it directly."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-sm mt-2 max-w-2xl ${s.muted}`,
					children: "Colleges, residents' associations, campuses and NGOs get their own operations view: issue assignment, staff responsibilities, maintenance history, resolution evidence and analytics. Adoption without waiting for a government contract."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 content-start",
					children: workspaces.map((ws) => {
						const a = workspaceAnalytics(ws, issues);
						const type = WORKSPACE_TYPES[ws.type];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/workspaces/${ws.id}`,
							className: `${s.card} p-5 block hover:border-amber-500/60 transition group`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: s.chipNeutral,
										children: [
											type?.icon,
											" ",
											type?.label
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-slate-400 group-hover:text-amber-500" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: `font-black mt-3 leading-snug ${s.heading}`,
									children: ws.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[11px] mt-1 ${s.muted}`,
									children: ws.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2 mt-4 text-center",
									children: [
										[
											"Open",
											a.open,
											"text-rose-500"
										],
										[
											"Fixed",
											a.fixed,
											"text-emerald-500"
										],
										[
											"Staff",
											ws.staff.length,
											"text-amber-500"
										]
									].map(([label, value, cls]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `${s.inset} py-2`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-mono font-black ${cls}`,
											children: value
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[10px] ${s.muted}`,
											children: label
										})]
									}, label))
								})
							]
						}, ws.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: create,
					className: `${s.card} p-5 space-y-3 h-fit`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: `font-extrabold text-sm flex items-center gap-2 ${s.heading}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 text-amber-500" }), " Create a workspace"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: s.input,
							placeholder: "Organisation name",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: s.input,
							value: form.type,
							onChange: (e) => setForm({
								...form,
								type: e.target.value
							}),
							children: Object.entries(WORKSPACE_TYPES).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: k,
								children: [
									v.icon,
									" ",
									v.label
								]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `block text-[11px] font-bold ${s.text}`,
							children: ["Service area centred on", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: `${s.input} mt-1`,
								value: form.assetId,
								onChange: (e) => setForm({
									...form,
									assetId: e.target.value
								}),
								children: ASSETS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: a.id,
									children: a.name
								}, a.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `block text-[11px] font-bold ${s.text}`,
							children: ["Radius", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: `${s.input} mt-1`,
								value: form.radiusM,
								onChange: (e) => setForm({
									...form,
									radiusM: e.target.value
								}),
								children: [
									200,
									400,
									800,
									1500
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: r,
									children: [r, " m"]
								}, r))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: `${s.primaryButton} w-full`,
							disabled: !form.name.trim(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }), " Create workspace"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-[10px] ${s.muted}`,
							children: "The software is the easy part. The real work is getting an organisation to commit staff, so start with one pilot."
						})
					]
				})]
			})]
		})
	});
}
export { WorkspacesPage as default };
