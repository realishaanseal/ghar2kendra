import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1 } from "./router-compat-BtzFIg6e.mjs";
import { CivicAPI, getClockOffsetHours } from "./supabaseClient-qunC9q8v.mjs";
import { STAGE_COPY } from "./proof-ooQUoaE1.mjs";
import { PROOF_EVENT, clearProof, getProofStatus, reviewProof } from "./proofStore-Dq-YjRNq.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowUpRight, Award, BuildingComplex, Check, CircleCheck, Clock, CloudUpload, ExternalLink, FileCheckCorner, Flame, Gavel, HardHat, RefreshCw, Search, Send, Trees, TriangleAlert, Users, X } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/AdminDashboard-X7CpjUeN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Officials' queue of resolutions that reached resident quorum (or were disputed). */
function ProofReviewQueue({ issues, isDarkMode }) {
	const s = surface(isDarkMode);
	const { currentUser } = useAuth();
	const [, setTick] = (0, import_react.useState)(0);
	const [notes, setNotes] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const refresh = () => setTick((t) => t + 1);
		window.addEventListener(PROOF_EVENT, refresh);
		return () => window.removeEventListener(PROOF_EVENT, refresh);
	}, []);
	const pending = issues.filter((i) => i.status === "resolved").map((issue) => ({
		issue,
		status: getProofStatus(issue)
	})).filter(({ status }) => status.canReview);
	const collecting = issues.filter((i) => i.status === "resolved" && getProofStatus(i).stage === "collecting").length;
	const decide = (issue, approved) => reviewProof(issue, {
		approved,
		reviewer: currentUser?.name || "Ward Reviewer",
		note: notes[issue.id] || ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `${s.card} p-6 mb-8`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: `font-black text-base flex items-center gap-2 ${s.heading}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "w-5 h-5 text-amber-500" }),
					" Proof Review",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: s.chip,
						children: [pending.length, " waiting"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `text-[11px] ${s.muted}`,
				children: [
					collecting,
					" more resolution",
					collecting === 1 ? "" : "s",
					" still collecting resident attestations"
				]
			})]
		}), pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: `text-xs mt-4 ${s.muted}`,
			children: [
				"Nothing to review. Resolutions appear here once ",
				3,
				" independent residents attest, or when residents dispute a fix."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: pending.map(({ issue, status }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: `${s.inset} p-4 flex flex-col md:flex-row gap-4`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: issue.imageUrl,
							alt: "Before",
							className: "w-20 h-16 object-cover rounded-lg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: issue.resolvedPhotoUrl,
							alt: "After",
							className: "w-20 h-16 object-cover rounded-lg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: s.chipNeutral,
									children: issue.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-black uppercase ${status.stage === "disputed" ? "text-rose-500" : "text-teal-400"}`,
									children: STAGE_COPY[status.stage].label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-xs font-bold mt-1 truncate ${s.heading}`,
								children: issue.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `text-[11px] mt-1 ${s.muted}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3 h-3 inline mr-1" }),
									status.confirmations,
									" confirm · ",
									status.disputes,
									" dispute ·",
									" ",
									status.attestations.filter((a) => !a.eligible).length,
									" not counted"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${s.input} mt-2`,
								placeholder: "Review note (optional)",
								value: notes[issue.id] || "",
								onChange: (e) => setNotes({
									...notes,
									[issue.id]: e.target.value
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex md:flex-col gap-2 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => decide(issue, true),
								className: "inline-flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-3 py-2 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), " Approve"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => decide(issue, false),
								className: `${s.ghostButton} !px-3 !py-2 text-rose-500`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" }), " Reject & reopen"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: `/ticket/${issue.id}`,
								className: `${s.ghostButton} !px-3 !py-2`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" }), " Open"]
							})
						]
					})
				]
			}, issue.id))
		})]
	});
}
var PRESET_FIX_PHOTOS = [
	{
		label: "🛣️ Fresh Bitumen Asphalt Patch",
		url: "https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80",
		description: "Fresh hot-mix asphalt laid, compacted with 10-ton road roller, smooth surface restored."
	},
	{
		label: "⚡ Secured Transformer & Cabling",
		url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=80",
		description: "High-voltage cable insulated, re-routed into tamper-proof junction box, danger warning posted."
	},
	{
		label: "💧 Repaired Pipeline & Clean Roadway",
		url: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80",
		description: "300mm ductile iron pipe sleeve clamped, pressure leak tested, carriageway cleared."
	},
	{
		label: "🗑️ Cleared & Sanitized Waste Bin",
		url: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80",
		description: "Compactor truck cleared 4.5 MT waste, chlorinated disinfectant sprayed, fresh bin installed."
	}
];
var MUNICIPALITIES_PRESETS = [
	{
		id: "mcd",
		name: "Municipal Corporation of Delhi (MCD South Zone)",
		state: "Delhi (NCT)",
		division: "South Zone"
	},
	{
		id: "bmc",
		name: "Brihanmumbai Municipal Corporation (BMC)",
		state: "Maharashtra",
		division: "Ward K-West"
	},
	{
		id: "bbmp",
		name: "Bruhat Bengaluru Mahanagara Palike (BBMP)",
		state: "Karnataka",
		division: "East Zone"
	},
	{
		id: "ghmc",
		name: "Greater Hyderabad Municipal Corporation (GHMC)",
		state: "Telangana",
		division: "Central Zone"
	},
	{
		id: "kmc",
		name: "Kolkata Municipal Corporation (KMC)",
		state: "West Bengal",
		division: "Borough 7"
	},
	{
		id: "pmc",
		name: "Pune Municipal Corporation (PMC)",
		state: "Maharashtra",
		division: "Kothrud Division"
	}
];
var PANCHAYATS_PRESETS = [
	{
		id: "ramnagar",
		name: "Ramnagar Gram Panchayat",
		block: "Varanasi Rural Block",
		district: "Varanasi",
		state: "Uttar Pradesh"
	},
	{
		id: "shivaji",
		name: "Shivaji Nagar Gram Panchayat",
		block: "Haveli Block",
		district: "Pune",
		state: "Maharashtra"
	},
	{
		id: "devanahalli",
		name: "Devanahalli Rural Gram Panchayat",
		block: "Devanahalli",
		district: "Bengaluru Rural",
		state: "Karnataka"
	},
	{
		id: "sonarpur",
		name: "Sonarpur Gram Panchayat",
		block: "Rajpur Sonarpur",
		district: "South 24 Parganas",
		state: "West Bengal"
	},
	{
		id: "mansarovar",
		name: "Gandhinagar Gram Panchayat",
		block: "Mansarovar Rural",
		district: "Jaipur",
		state: "Rajasthan"
	}
];
var CONTRACTORS_URBAN = [
	{
		name: "Apex Infra Roadworks Pvt Ltd",
		dept: "Public Works Dept (PWD)"
	},
	{
		name: "Emergency High-Tension Grid Squad",
		dept: "DISCOM / Power Grid"
	},
	{
		name: "Delhi Jal Board Rapid Response Cell",
		dept: "Delhi Jal Board"
	},
	{
		name: "EcoClean Municipal Waste Concessionaire",
		dept: "Municipal Solid Waste"
	},
	{
		name: "South Delhi Infrastructure & Paving",
		dept: "Public Works Dept (PWD)"
	}
];
var CONTRACTORS_RURAL = [
	{
		name: "PMGSY Rural Road Contracting Unit 3",
		dept: "PMGSY Rural Roads"
	},
	{
		name: "Jal Jeevan Mission Village Water Cell",
		dept: "Har Ghar Jal Water Supply"
	},
	{
		name: "Gram Panchayat Swachhata Shramik Dal",
		dept: "Gram Swachhata & Sanitation"
	},
	{
		name: "State Rural Solar Lighting Agency",
		dept: "Rural Electrification & Solar"
	},
	{
		name: "Zilla Parishad Construction Wing",
		dept: "Panchayat Infrastructure"
	}
];
var OFFICIALS_URBAN = [
	"Er. Rajesh Varma (JE - PWD Div 2)",
	"Er. K. Natarajan (Grid Superintendent)",
	"Er. Manish Duggal (Jal Board Sub-Div)",
	"Chief Sanitary Inspector S. Chawla",
	"Er. R. K. Singhal (Drainage Division)"
];
var OFFICIALS_RURAL = [
	"Smt. Gayatri Devi (Gram Panchayat Pradhan / Sarpanch)",
	"Shri Rameshwar Yadav (Panchayat Sachiv / Secretary)",
	"Er. Dilip Kumar (Assistant Engineer - PMGSY Rural Roads)",
	"Smt. Anita Patel (Jal Sahiyya - Drinking Water Cell)",
	"Shri Virendra Singh (Block Development Officer - BDO)"
];
function AdminDashboard({ isDarkMode }) {
	const { currentUser } = useAuth();
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [clockOffset, setClockOffset] = (0, import_react.useState)(0);
	const [jurisdictionTier, setJurisdictionTier] = (0, import_react.useState)(() => {
		return currentUser?.jurisdictionType || "municipality";
	});
	const [activeMunicipality, setActiveMunicipality] = (0, import_react.useState)(currentUser?.jurisdictionName || MUNICIPALITIES_PRESETS[0].name);
	const [activePanchayat, setActivePanchayat] = (0, import_react.useState)(PANCHAYATS_PRESETS[0]);
	const activeContractors = jurisdictionTier === "panchayat" ? CONTRACTORS_RURAL : CONTRACTORS_URBAN;
	const activeOfficials = jurisdictionTier === "panchayat" ? OFFICIALS_RURAL : OFFICIALS_URBAN;
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [departmentFilter, setDepartmentFilter] = (0, import_react.useState)("all");
	const [severityFilter, setSeverityFilter] = (0, import_react.useState)("all");
	const [dispatchModalIssue, setDispatchModalIssue] = (0, import_react.useState)(null);
	const [resolveModalIssue, setResolveModalIssue] = (0, import_react.useState)(null);
	const [selectedContractor, setSelectedContractor] = (0, import_react.useState)(activeContractors[0].name);
	const [selectedOfficer, setSelectedOfficer] = (0, import_react.useState)(activeOfficials[0]);
	const [dispatchSlaHours, setDispatchSlaHours] = (0, import_react.useState)(24);
	const [dispatchNotes, setDispatchNotes] = (0, import_react.useState)("");
	const [resolvePhotoUrl, setResolvePhotoUrl] = (0, import_react.useState)(PRESET_FIX_PHOTOS[0].url);
	const [resolveProofNotes, setResolveProofNotes] = (0, import_react.useState)(PRESET_FIX_PHOTOS[0].description);
	const [contractorInvoice, setContractorInvoice] = (0, import_react.useState)(`WO-2026-${Math.floor(1e3 + Math.random() * 9e3)}`);
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const showToast = (msg) => {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 4e3);
	};
	const loadIssues = async () => {
		try {
			setIsLoading(true);
			const data = await CivicAPI.getIssues();
			setIssues(data);
			setClockOffset(getClockOffsetHours());
		} catch (err) {
			console.error("Error fetching admin issues", err);
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
	(0, import_react.useEffect)(() => {
		setSelectedContractor(activeContractors[0].name);
		setSelectedOfficer(activeOfficials[0]);
	}, [jurisdictionTier]);
	const handleAdvanceClock = (hours) => {
		const newOffset = CivicAPI.simulateAdvanceClock(hours);
		setClockOffset(newOffset);
		loadIssues();
		showToast(`⏱️ Advanced simulation clock by +${hours} hours! SLA timers recalculated.`);
	};
	const handleResetClock = () => {
		CivicAPI.resetClock();
		setClockOffset(0);
		loadIssues();
		showToast("🔄 Simulation clock reset to Real-Time.");
	};
	const handleResetAllData = () => {
		if (window.confirm("Reset all issues and work orders back to default seed data?")) {
			CivicAPI.resetToDefault();
			loadIssues();
			showToast("✨ Reset to default municipal seed dataset!");
		}
	};
	const handleConfirmDispatch = async (e) => {
		e.preventDefault();
		if (!dispatchModalIssue) return;
		await CivicAPI.assignWorkOrder(dispatchModalIssue.id, {
			contractor: selectedContractor,
			assignedOfficer: selectedOfficer,
			slaHours: Number(dispatchSlaHours),
			workOrderNote: dispatchNotes || `Dispatched to ${selectedContractor} for urgent corrective action.`
		});
		showToast(`🛠️ Work Order dispatched to ${selectedContractor} for ${dispatchModalIssue.id}!`);
		setDispatchModalIssue(null);
		setDispatchNotes("");
		loadIssues();
	};
	const handleConfirmResolution = async (e) => {
		e.preventDefault();
		if (!resolveModalIssue) return;
		clearProof(resolveModalIssue.id);
		await CivicAPI.resolveIssueWithProof(resolveModalIssue.id, {
			resolvedPhotoUrl: resolvePhotoUrl,
			resolutionProof: resolveProofNotes,
			contractorInvoice,
			officerName: selectedOfficer || resolveModalIssue.assignedOfficer || "Ward Supervisor"
		});
		showToast(`✅ ${resolveModalIssue.id} marked as RESOLVED! Awaiting resident attestations and review.`);
		setResolveModalIssue(null);
		loadIssues();
	};
	const filteredIssues = issues.filter((issue) => {
		if (statusFilter !== "all") {
			if (statusFilter === "submitted" && issue.status !== "submitted") return false;
			if (statusFilter === "in_progress" && issue.status !== "in_progress") return false;
			if (statusFilter === "resolved" && issue.status !== "resolved" && issue.status !== "verified") return false;
		}
		if (departmentFilter !== "all") {
			if (departmentFilter === "roads" && issue.category !== "roads") return false;
			if (departmentFilter === "electricity" && issue.category !== "electricity") return false;
			if (departmentFilter === "water" && issue.category !== "water") return false;
			if (departmentFilter === "waste" && issue.category !== "waste") return false;
			if (departmentFilter === "safety" && issue.category !== "safety") return false;
		}
		if (severityFilter !== "all" && issue.severity !== severityFilter) return false;
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			const matchId = issue.id?.toLowerCase().includes(q);
			const matchTitle = issue.title?.toLowerCase().includes(q);
			const matchAddress = issue.address?.toLowerCase().includes(q);
			const matchDept = issue.department?.toLowerCase().includes(q);
			if (!matchId && !matchTitle && !matchAddress && !matchDept) return false;
		}
		return true;
	});
	const totalCount = issues.length;
	const inProgressCount = issues.filter((i) => i.status === "in_progress").length;
	const resolvedCount = issues.filter((i) => i.status === "resolved" || i.status === "verified").length;
	const breachedCount = issues.filter((i) => i.isBreached && i.status !== "resolved" && i.status !== "verified").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto space-y-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: -20,
							scale: .95
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							y: -20,
							scale: .95
						},
						className: "fixed top-20 right-6 z-50 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/40 text-sm font-bold backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-emerald-200 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `p-4 sm:p-5 rounded-3xl border shadow-lg transition-all duration-300 ${isDarkMode ? "bg-slate-900/90 border-slate-800" : "bg-white border-amber-200/90 shadow-amber-950/5"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[11px] font-black uppercase tracking-wider mr-1 hidden sm:inline ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
									children: "Governance Tier:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-1 rounded-2xl border flex items-center shadow-inner ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-amber-50/70 border-amber-200/80"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setJurisdictionTier("municipality"),
										className: `px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${jurisdictionTier === "municipality" ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/25" : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Urban Municipality (Nagar Nigam)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setJurisdictionTier("panchayat"),
										className: `px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${jurisdictionTier === "panchayat" ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-600/25" : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trees, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rural Gram Panchayat (Gram Sabha)" })]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-400",
										children: "Active Body:"
									}),
									jurisdictionTier === "municipality" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: activeMunicipality,
										onChange: (e) => setActiveMunicipality(e.target.value),
										className: `px-3 py-1.5 rounded-xl text-xs font-bold border outline-hidden transition ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-amber-50 border-amber-200 text-amber-950"}`,
										children: MUNICIPALITIES_PRESETS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: m.name,
											children: m.name
										}, m.id))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: activePanchayat.name,
										onChange: (e) => {
											const found = PANCHAYATS_PRESETS.find((p) => p.name === e.target.value);
											if (found) setActivePanchayat(found);
										},
										className: `px-3 py-1.5 rounded-xl text-xs font-bold border outline-hidden transition ${isDarkMode ? "bg-slate-800 border-slate-700 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-950"}`,
										children: PANCHAYATS_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: p.name,
											children: [
												p.name,
												" (",
												p.district,
												", ",
												p.state,
												")"
											]
										}, p.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${jurisdictionTier === "panchayat" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-amber-500/10 text-amber-500 border-amber-500/30"}`,
										children: jurisdictionTier === "panchayat" ? "VILLAGE CADRE" : "URBAN CADRE"
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-xl ${isDarkMode ? "bg-gradient-to-br from-ink-raised via-ink to-ink-raised border-slate-800" : "bg-gradient-to-br from-white/50 to-orange-50/40 border-amber-200/80 shadow-orange-500/5"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-10 bg-[radial-gradient(#D9982E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${jurisdictionTier === "panchayat" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative flex h-2 w-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
											}), jurisdictionTier === "panchayat" ? "GRAM PANCHAYAT SEVA KENDRA" : "OFFICIAL MUNICIPAL PORTAL"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`,
											children: jurisdictionTier === "panchayat" ? `📍 ${activePanchayat.name} • ${activePanchayat.block}, ${activePanchayat.district}` : `📍 ${activeMunicipality}`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: jurisdictionTier === "panchayat" ? "Panchayat Jan Suvidha & Infrastructure Command" : "Municipal Grievance Command Center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl sm:text-2xl",
											children: jurisdictionTier === "panchayat" ? "🌾" : "🏛️"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs sm:text-sm mt-1 max-w-2xl ${isDarkMode ? "text-slate-300" : "text-slate-600"}`,
										children: jurisdictionTier === "panchayat" ? "Triaging rural civic defects under Jal Jeevan Mission, PMGSY Village Roads, Swachh Bharat Gramin, and Gram Panchayat maintenance funds." : "Triaging high-priority civic hazards, dispatching contractor work orders, and validating completion proof under Delhi & Smart Cities Citizen Charter (48-Hour SLA)."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-4 rounded-2xl border flex flex-col gap-2.5 backdrop-blur-md shrink-0 ${isDarkMode ? "bg-slate-900/90 border-amber-500/30 shadow-lg shadow-amber-500/5" : "bg-white/90 border-amber-300 shadow-md"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-amber-500 animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-black uppercase tracking-wider text-amber-500",
													children: "Judge / Demo Clock Simulator"
												})]
											}), clockOffset > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30 animate-pulse",
												children: [
													"+",
													clockOffset,
													"h Advanced"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-[11px] leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
											children: "Fast-forward clock to simulate SLA countdowns, breaches, and auto-escalations:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleAdvanceClock(12),
													className: `px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${isDarkMode ? "bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border-amber-500/30" : "bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300"}`,
													title: "Simulate 12 Hours Passage",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+12h" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleAdvanceClock(24),
													className: `px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${isDarkMode ? "bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border-orange-500/30" : "bg-orange-100 hover:bg-orange-200 text-orange-950 border-orange-300"}`,
													title: "Simulate 24 Hours Passage",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5 text-orange-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+24h" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleAdvanceClock(48),
													className: `px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${isDarkMode ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border-rose-500/30" : "bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300"}`,
													title: "Simulate 48 Hours Passage (Trigger SLA Breach)",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3.5 h-3.5 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+48h (Breach)" })]
												}),
												clockOffset > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: handleResetClock,
													className: `px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"}`,
													title: "Reset to Real-Time",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset" })]
												})
											]
										})
									]
								})]
							}),
							breachedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `mt-4 p-3 rounded-2xl border text-xs font-black flex items-center justify-between gap-3 animate-pulse ${isDarkMode ? "bg-rose-500/15 border-rose-500/40 text-rose-300" : "bg-rose-100 border-rose-400 text-rose-950"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 text-rose-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CRITICAL SLA BREACH:" }),
										" ",
										breachedCount,
										" ticket(s) have exceeded the mandatory 48-hour redressal deadline! Penalties applied and auto-escalated to Chief Municipal Commissioner."
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setStatusFilter("in_progress");
										setSeverityFilter("critical");
									},
									className: "underline whitespace-nowrap hover:opacity-80",
									children: "Inspect Breached Tickets →"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-5 rounded-2xl border transition-all duration-200 ${isDarkMode ? "bg-ink border-slate-800" : "bg-white border-amber-200/70 shadow-sm"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-slate-500 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: jurisdictionTier === "panchayat" ? "VILLAGE TICKETS" : "TOTAL LOGGED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "p-2 rounded-xl bg-amber-500/10 text-amber-500",
											children: "📋"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-black",
										children: totalCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold text-emerald-500 mt-1 flex items-center gap-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "● 100% Geotagged & AI Classified" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-5 rounded-2xl border transition-all duration-200 ${isDarkMode ? "bg-ink border-slate-800" : "bg-white border-amber-200/70 shadow-sm"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-slate-500 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CREWS DISPATCHED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "p-2 rounded-xl bg-orange-500/10 text-orange-500",
											children: "🛠️"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-black text-orange-500",
										children: inProgressCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-[11px] font-semibold mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
										children: jurisdictionTier === "panchayat" ? "PMGSY & Water Shramiks on site" : "Road & Pipeline Crews on site"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-5 rounded-2xl border transition-all duration-200 ${isDarkMode ? "bg-ink border-slate-800" : "bg-white border-amber-200/70 shadow-sm"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-slate-500 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SLA BREACHED / AT RISK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "p-2 rounded-xl bg-rose-500/10 text-rose-500",
											children: "⚠️"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-3xl font-black ${breachedCount > 0 ? "text-rose-500 animate-pulse" : "text-slate-400"}`,
										children: breachedCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold text-rose-500 mt-1",
										children: breachedCount > 0 ? "Urgent escalation needed" : "0 Breaches in current cycle"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-5 rounded-2xl border transition-all duration-200 ${isDarkMode ? "bg-ink border-slate-800" : "bg-white border-amber-200/70 shadow-sm"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-slate-500 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RESOLVED & VERIFIED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "p-2 rounded-xl bg-emerald-500/10 text-emerald-500",
											children: "✨"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-black text-emerald-500",
										children: resolvedCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "96.2% Citizen Approval" })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofReviewQueue, {
						issues,
						isDarkMode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${isDarkMode ? "bg-ink border-slate-800" : "bg-white border-amber-200/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDarkMode ? "border-slate-800/80 bg-slate-900/40" : "border-amber-100 bg-amber-50/30"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-lg font-black tracking-tight flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: jurisdictionTier === "panchayat" ? "Gram Panchayat Grievance Queue" : "Ward Triage & Dispatch Queue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-xs font-bold px-2 py-0.5 rounded-full ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-amber-100 text-amber-900"}`,
											children: [filteredIssues.length, " Tickets"]
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleResetAllData,
										className: `text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-400" : "border-slate-200 hover:bg-slate-100 text-slate-600"}`,
										title: "Restore default mock issues",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Seed Data" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-4 border-b grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${isDarkMode ? "border-slate-800 bg-slate-900/20" : "border-amber-100 bg-white"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Search ticket, ward, keyword...",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											className: `w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 focus:border-amber-500 text-white placeholder-slate-500" : "bg-white border-slate-200 focus:border-amber-500 text-slate-900 placeholder-slate-400"}`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: statusFilter,
										onChange: (e) => setStatusFilter(e.target.value),
										className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "All Statuses (Pending, Dispatched, Resolved)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "submitted",
												children: "New Logged (Needs Work Order)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "in_progress",
												children: "Dispatched (Under Repair)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "resolved",
												children: "Resolved & Ground Verified"
											})
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: departmentFilter,
										onChange: (e) => setDepartmentFilter(e.target.value),
										className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "All Sectors / Departments"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "roads",
												children: "Roads (PWD / PMGSY)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "electricity",
												children: "Electricity (Power & Solar Grid)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "water",
												children: "Water (Jal Board / Har Ghar Jal)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "waste",
												children: "Solid Waste & Sanitation"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "safety",
												children: "Public Safety Hazards"
											})
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: severityFilter,
										onChange: (e) => setSeverityFilter(e.target.value),
										className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "All Priority Levels"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "critical",
												children: "🚨 Critical Severity Only"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "high",
												children: "High Severity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "medium",
												children: "Medium Severity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "low",
												children: "Low Severity"
											})
										]
									}) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: `text-[11px] uppercase tracking-wider font-black border-b ${isDarkMode ? "bg-slate-900/60 border-slate-800 text-slate-400" : "bg-amber-50/60 border-amber-200/50 text-slate-500"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Ticket & Visual"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Issue Description & Locality"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Severity & Sector"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "SLA Countdown"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Work Crew Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4 text-right",
												children: "Administrative Actions"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-slate-800/40 text-xs",
										children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: "6",
											className: "py-12 text-center text-slate-500",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-5 h-5 animate-spin text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading live municipal / panchayat queue..." })]
											})
										}) }) : filteredIssues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: "6",
											className: "py-12 text-center text-slate-500",
											children: "No tickets match the selected filters. Try broadening your criteria."
										}) }) : filteredIssues.map((issue) => {
											const isBreached = issue.isBreached && issue.status !== "resolved" && issue.status !== "verified";
											const isResolved = issue.status === "resolved" || issue.status === "verified";
											const isSubmitted = issue.status === "submitted";
											const isInProgress = issue.status === "in_progress";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: `transition hover:bg-amber-500/5 ${isBreached ? "bg-rose-500/5" : isDarkMode ? "hover:bg-slate-800/40" : "hover:bg-amber-50/50"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-4 align-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-start gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "relative group w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 shadow-xs",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: issue.imageUrl,
																	alt: "Civic Defect",
																	className: "w-full h-full object-cover group-hover:scale-110 transition duration-300"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[10px]",
																	children: "Zoom"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "font-mono font-black text-amber-500 flex items-center gap-1",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: issue.id })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `text-[10px] block mt-0.5 font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
																	children: issue.createdAt
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `text-[10px] inline-block mt-1 font-bold px-1.5 py-0.5 rounded ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"}`,
																	children: issue.category
																})
															] })]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "py-4 px-4 align-top max-w-xs",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-bold line-clamp-2 leading-snug",
																children: issue.title
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: `text-[11px] mt-1 line-clamp-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
																children: ["📍 ", issue.address]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: `text-[10px] font-bold mt-0.5 ${isDarkMode ? "text-amber-400" : "text-amber-900"}`,
																children: issue.ward
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-4 align-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5",
															children: [issue.severity === "critical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" }), "CRITICAL"]
															}) : issue.severity === "high" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "inline-flex text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500 border border-orange-500/30",
																children: "HIGH"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "inline-flex text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/30",
																children: issue.severity
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: `text-[10px] font-semibold leading-tight line-clamp-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`,
																children: issue.department
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-4 align-top",
														children: isResolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SLA MET (Closed)" })]
														}) : isBreached ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/40 animate-pulse",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"BREACHED (",
																	issue.slaRemainingHours,
																	"h)"
																] })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block text-[10px] text-rose-400 font-bold",
																children: "Level 2 Escalated"
															})]
														}) : issue.slaRemainingHours <= 12 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "space-y-1",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [issue.slaRemainingHours, "h Left (At Risk)"] })]
															})
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [issue.slaRemainingHours, "h Left"] })]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-4 align-top",
														children: isResolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-[11px] font-bold text-emerald-500 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Work Verified" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: `text-[10px] truncate max-w-[160px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
															children: issue.contractor
														})] }) : isInProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[11px] font-bold text-orange-500 flex items-center gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crew on Site" })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: `text-[10px] font-semibold truncate max-w-[160px] ${isDarkMode ? "text-slate-300" : "text-slate-700"}`,
																children: issue.contractor
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: `text-[9px] truncate max-w-[160px] ${isDarkMode ? "text-slate-500" : "text-slate-500"}`,
																children: issue.assignedOfficer
															})
														] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20",
															children: "Pending Allocation"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-4 align-top text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-end gap-2 flex-wrap",
															children: [
																isSubmitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => {
																		setDispatchModalIssue(issue);
																		setSelectedContractor(activeContractors[0].name);
																		setSelectedOfficer(activeOfficials[0]);
																	},
																	className: "px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md shadow-orange-500/20 flex items-center gap-1 transition active:scale-95",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Assign Crew" })]
																}),
																isInProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => {
																		setResolveModalIssue(issue);
																		if (issue.category === "roads") {
																			setResolvePhotoUrl(PRESET_FIX_PHOTOS[0].url);
																			setResolveProofNotes(PRESET_FIX_PHOTOS[0].description);
																		} else if (issue.category === "electricity") {
																			setResolvePhotoUrl(PRESET_FIX_PHOTOS[1].url);
																			setResolveProofNotes(PRESET_FIX_PHOTOS[1].description);
																		} else if (issue.category === "water") {
																			setResolvePhotoUrl(PRESET_FIX_PHOTOS[2].url);
																			setResolveProofNotes(PRESET_FIX_PHOTOS[2].description);
																		} else {
																			setResolvePhotoUrl(PRESET_FIX_PHOTOS[3].url);
																			setResolveProofNotes(PRESET_FIX_PHOTOS[3].description);
																		}
																	},
																	className: "px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1 transition active:scale-95",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Fix Photo" })]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
																	to: `/ticket/${issue.id}`,
																	className: `p-1.5 rounded-xl border transition ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
																	title: "Inspect Public Citizen Ground Reality Page",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4" })
																})
															]
														})
													})
												]
											}, issue.id);
										})
									})]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: dispatchModalIssue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					className: `w-full max-w-lg rounded-3xl border shadow-2xl p-6 overflow-hidden ${isDarkMode ? "bg-ink-raised border-slate-700 text-white" : "bg-white border-amber-200 text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-4 border-b border-slate-700/50 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black",
								children: jurisdictionTier === "panchayat" ? "Issue Gram Panchayat Work Order" : "Issue Municipal Work Order"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-500 font-mono font-bold",
								children: dispatchModalIssue.id
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDispatchModalIssue(null),
							className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleConfirmDispatch,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "Issue Overview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-3 rounded-xl border text-xs ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: dispatchModalIssue.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-slate-400 mt-1",
									children: ["📍 ", dispatchModalIssue.address]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: jurisdictionTier === "panchayat" ? "Empanelled Panchayat Contractor / Shramik Cell" : "Empanelled Municipal Contractor / Repair Unit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: selectedContractor,
								onChange: (e) => setSelectedContractor(e.target.value),
								className: `w-full px-3 py-2.5 rounded-xl text-xs font-semibold border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`,
								children: activeContractors.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c.name,
									children: [
										c.name,
										" — (",
										c.dept,
										")"
									]
								}, i))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: jurisdictionTier === "panchayat" ? "Supervising Gram Pradhan / Panchayat Secretary" : "Assigned Junior Engineer / Nodal Officer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: selectedOfficer,
								onChange: (e) => setSelectedOfficer(e.target.value),
								className: `w-full px-3 py-2.5 rounded-xl text-xs font-semibold border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`,
								children: activeOfficials.map((eng, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: eng,
									children: eng
								}, i))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "SLA Resolution Target Deadline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [
									12,
									24,
									48,
									72
								].map((hrs) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDispatchSlaHours(hrs),
									className: `py-2 rounded-xl text-xs font-black border transition ${dispatchSlaHours === hrs ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-orange-500/30" : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700"}`,
									children: [hrs, " Hours"]
								}, hrs))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "Field Instructions / Work Dispatch Directive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								value: dispatchNotes,
								onChange: (e) => setDispatchNotes(e.target.value),
								placeholder: "e.g. Deploy cold-mix asphalt truck or repair village handpump sleeve, cordon off hazard.",
								className: `w-full p-2.5 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200"}`
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDispatchModalIssue(null),
									className: "px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-400",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-orange-500/25 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issue Dispatch Order" })]
								})]
							})
						]
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: resolveModalIssue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					className: `w-full max-w-xl rounded-3xl border shadow-2xl p-6 overflow-hidden ${isDarkMode ? "bg-ink-raised border-slate-700 text-white" : "bg-white border-amber-200 text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-4 border-b border-slate-700/50 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black",
								children: "Upload Contractor Fix Evidence"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-emerald-400 font-mono font-bold",
								children: resolveModalIssue.id
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setResolveModalIssue(null),
							className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleConfirmResolution,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-rose-400 block mb-1",
									children: "Reported Defect (Before)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-28 rounded-xl overflow-hidden border border-rose-500/30 relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: resolveModalIssue.imageUrl,
										alt: "Before defect",
										className: "w-full h-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded",
										children: "Defect Evidence"
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-emerald-400 block mb-1",
									children: "Contractor Fix (After Preview)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-28 rounded-xl overflow-hidden border border-emerald-500/30 relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: resolvePhotoUrl,
										alt: "After fix",
										className: "w-full h-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded",
										children: "Repaired State"
									})]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "Select Official Photographic Proof"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: PRESET_FIX_PHOTOS.map((preset, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setResolvePhotoUrl(preset.url);
										setResolveProofNotes(preset.description);
									},
									className: `p-2 rounded-xl text-left border text-xs font-bold transition flex items-center gap-1.5 ${resolvePhotoUrl === preset.url ? "bg-emerald-500/15 border-emerald-500 text-emerald-400" : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-700"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: preset.label
									})
								}, idx))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "Contractor Fix Image URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "url",
								required: true,
								value: resolvePhotoUrl,
								onChange: (e) => setResolvePhotoUrl(e.target.value),
								className: `w-full px-3 py-2 rounded-xl text-xs border outline-hidden font-mono ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold block mb-1",
								children: "Inspection & Quality Certification Note"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								required: true,
								value: resolveProofNotes,
								onChange: (e) => setResolveProofNotes(e.target.value),
								className: `w-full p-2.5 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-1",
									children: "Contractor Work Order Ref"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: contractorInvoice,
									onChange: (e) => setContractorInvoice(e.target.value),
									className: `w-full px-3 py-2 rounded-xl text-xs border font-mono ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-1",
									children: "Inspecting Authority"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: selectedOfficer || resolveModalIssue.assignedOfficer || "Ward Supervisor",
									className: `w-full px-3 py-2 rounded-xl text-xs border opacity-70 ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"}`
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setResolveModalIssue(null),
									className: "px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-400",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-emerald-500/25 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm Resolution & Close SLA" })]
								})]
							})
						]
					})]
				})
			}) })
		]
	});
}
export { AdminDashboard as default };
