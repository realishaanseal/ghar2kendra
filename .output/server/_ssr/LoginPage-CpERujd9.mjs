import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { ArrowRight, BuildingComplex, CircleAlert, CircleCheck, Landmark, Lock, Phone, RotateCcw, Sparkles, Trees, User, Users, X } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/LoginPage-CpERujd9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INDIAN_STATES = [
	"Delhi (NCT)",
	"Uttar Pradesh",
	"Maharashtra",
	"Karnataka",
	"Tamil Nadu",
	"West Bengal",
	"Gujarat",
	"Rajasthan",
	"Bihar",
	"Madhya Pradesh",
	"Telangana"
];
var PRESET_MUNICIPALITIES = [
	"Municipal Corporation of Delhi (MCD South Zone)",
	"Brihanmumbai Municipal Corporation (BMC Ward K-West)",
	"Bruhat Bengaluru Mahanagara Palike (BBMP East)",
	"Greater Hyderabad Municipal Corporation (GHMC)",
	"Kolkata Municipal Corporation (KMC Borough 7)",
	"Pune Municipal Corporation (PMC Kothrud)"
];
var PRESET_PANCHAYATS = [
	{
		name: "Ramnagar Gram Panchayat",
		block: "Varanasi Rural Block",
		district: "Varanasi",
		state: "Uttar Pradesh"
	},
	{
		name: "Shivaji Nagar Gram Panchayat",
		block: "Haveli Block",
		district: "Pune",
		state: "Maharashtra"
	},
	{
		name: "Devanahalli Rural Gram Panchayat",
		block: "Devanahalli",
		district: "Bengaluru Rural",
		state: "Karnataka"
	},
	{
		name: "Sonarpur Gram Panchayat",
		block: "Rajpur Sonarpur",
		district: "South 24 Parganas",
		state: "West Bengal"
	},
	{
		name: "Gandhinagar Gram Panchayat",
		block: "Mansarovar",
		district: "Jaipur",
		state: "Rajasthan"
	}
];
var DEPARTMENTS_URBAN = [
	"Public Works Dept (PWD - Roads & Pavements)",
	"DISCOM / Electricity & Streetlight Grid",
	"Water Supply & Sewerage Board",
	"Municipal Solid Waste & Sanitation",
	"Traffic Engineering & Public Safety Cell"
];
var DEPARTMENTS_RURAL = [
	"Panchayati Raj & Village Infrastructure",
	"PMGSY (Pradhan Mantri Gram Sadak Yojana - Rural Roads)",
	"Har Ghar Jal (Jal Jeevan Mission Rural Water Supply)",
	"Gram Swachhata & Solid/Liquid Waste Management",
	"Rural Electrification & Solar Grid Maintenance"
];
function LoginPage({ isDarkMode }) {
	const navigate = useNavigate$1();
	const { login, loginAsDemo } = useAuth();
	const [role, setRole] = (0, import_react.useState)("citizen");
	const [authMode, setAuthMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [identifier, setIdentifier] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [jurisdictionTier, setJurisdictionTier] = (0, import_react.useState)("municipality");
	const [selectedState, setSelectedState] = (0, import_react.useState)(INDIAN_STATES[0]);
	const [selectedMunicipality, setSelectedMunicipality] = (0, import_react.useState)(PRESET_MUNICIPALITIES[0]);
	const [selectedPanchayat, setSelectedPanchayat] = (0, import_react.useState)(PRESET_PANCHAYATS[0].name);
	const [panchayatBlock, setPanchayatBlock] = (0, import_react.useState)(PRESET_PANCHAYATS[0].block);
	const [officialDepartment, setOfficialDepartment] = (0, import_react.useState)(DEPARTMENTS_URBAN[0]);
	const [designation, setDesignation] = (0, import_react.useState)("Junior Engineer (Civil)");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("OFF-2026-4412");
	const [showForgotModal, setShowForgotModal] = (0, import_react.useState)(false);
	const [forgotInput, setForgotInput] = (0, import_react.useState)("");
	const [forgotSuccess, setForgotSuccess] = (0, import_react.useState)(false);
	const [statusMessage, setStatusMessage] = (0, import_react.useState)(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (role === "citizen") {
			const citizenUser = {
				id: `cit-${Math.floor(100 + Math.random() * 900)}`,
				name: name.trim() || "Aarav Sharma",
				role: "citizen",
				phone: identifier.includes("@") ? "+91 98765 43210" : identifier || "+91 98765 43210",
				email: identifier.includes("@") ? identifier : "citizen@ghar2kendra.gov.in",
				karma: 150,
				ward: "Ward 14 (South Extension)",
				avatar: "👨‍💼"
			};
			login(citizenUser);
			navigate("/");
		} else {
			const officialUser = {
				id: employeeId || `off-${Math.floor(100 + Math.random() * 900)}`,
				name: name.trim() || (jurisdictionTier === "municipality" ? "Er. Rajesh Varma" : "Smt. Gayatri Devi"),
				role: "official",
				designation: designation || (jurisdictionTier === "municipality" ? "Junior Engineer (Civil)" : "Gram Panchayat Pradhan (Sarpanch)"),
				jurisdictionType: jurisdictionTier,
				jurisdictionName: jurisdictionTier === "municipality" ? selectedMunicipality : `${selectedPanchayat} (${panchayatBlock})`,
				department: officialDepartment,
				officerId: employeeId || (jurisdictionTier === "municipality" ? "MCD-ENG-4921" : "GP-VAR-019"),
				phone: identifier.includes("@") ? "+91 98111 22334" : identifier || "+91 98111 22334",
				email: identifier.includes("@") ? identifier : "officer@gov.in",
				avatar: jurisdictionTier === "municipality" ? "🏛️" : "🌾"
			};
			login(officialUser);
			navigate("/admin");
		}
	};
	const handleQuickDemo = (profileKey, destination) => {
		loginAsDemo(profileKey);
		navigate(destination);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-[calc(100vh-67px)] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative flex items-center justify-center overflow-hidden ${isDarkMode ? "bg-ink text-slate-100" : "bg-paper text-slate-900"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: {
					scale: [
						1,
						1.25,
						1
					],
					opacity: [
						.12,
						.22,
						.12
					],
					x: [
						0,
						25,
						0
					],
					y: [
						0,
						-20,
						0
					]
				},
				transition: {
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute top-10 -left-20 w-[480px] h-[480px] bg-orange-600 hover:bg-orange-700 rounded-full blur-[160px] opacity-50 pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: {
					scale: [
						1,
						1.2,
						1
					],
					opacity: [
						.1,
						.18,
						.1
					],
					x: [
						0,
						-30,
						0
					],
					y: [
						0,
						25,
						0
					]
				},
				transition: {
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1
				},
				className: "absolute bottom-10 -right-20 w-[450px] h-[450px] bg-gradient-to-bl from-rose-600 to-emerald-500 rounded-full blur-[160px] opacity-50 pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-2xl relative z-10 space-y-5 mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: -10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black shadow-sm border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "🇮🇳"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GHAR2KENDRA • NATIONAL GRIEVANCE & LOCAL BODIES GATEWAY" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl sm:text-4xl font-black tracking-tight",
								children: [
									"Ghar",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-600 dark:text-amber-400",
										children: "2Kendra"
									}),
									" Access Portal"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-xs sm:text-sm max-w-lg mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`,
								children: "घर से केंद्र तक • Unified single sign-on for Citizens, Municipal Corporations, and Rural Gram Panchayats."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .1 },
						className: `p-3.5 sm:p-4 rounded-3xl border shadow-lg backdrop-blur-md ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/90 border-amber-200/90 shadow-amber-950/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 mb-2 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-black flex items-center gap-1.5 text-amber-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500 animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evaluator / Judge 1-Click Fast Pass:" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
								children: "Instant Bypass & Direct Route"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: { y: -2 },
									whileTap: { scale: .98 },
									type: "button",
									onClick: () => handleQuickDemo("citizen", "/"),
									className: `p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${isDarkMode ? "bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-amber-500/50" : "bg-amber-50/70 hover:bg-amber-100/70 border-amber-200/80 hover:border-amber-400"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center text-lg shadow-sm",
										children: "👨‍💼"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black block text-xs truncate",
											children: "Login as Citizen"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-amber-600 dark:text-amber-400 font-bold block truncate",
											children: "Aarav S. (150 Pts) → /"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: { y: -2 },
									whileTap: { scale: .98 },
									type: "button",
									onClick: () => handleQuickDemo("municipalOfficial", "/admin"),
									className: `p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${isDarkMode ? "bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-rose-500/50" : "bg-orange-50/70 hover:bg-orange-100/70 border-orange-200/80 hover:border-orange-400"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center text-lg shadow-sm",
										children: "🏛️"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black block text-xs truncate",
											children: "Login as Municipal JE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-orange-600 dark:text-orange-400 font-bold block truncate",
											children: "Er. Rajesh (MCD) → /admin"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: { y: -2 },
									whileTap: { scale: .98 },
									type: "button",
									onClick: () => handleQuickDemo("panchayatOfficial", "/admin"),
									className: `p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${isDarkMode ? "bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500/50" : "bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200/80 hover:border-emerald-400"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center text-lg shadow-sm",
										children: "🌾"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black block text-xs truncate",
											children: "Login as Gram Pradhan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block truncate",
											children: "Gayatri Devi → /admin"
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-xl mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layout: true,
							className: `rounded-3xl border shadow-2xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 ${isDarkMode ? "bg-ink/95 border-slate-800" : "bg-white/95 border-amber-200/90 shadow-orange-500/5"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[11px] font-black uppercase tracking-wider text-slate-400",
											children: "Step 1: Choose Authority Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-bold ${isDarkMode ? "text-amber-400" : "text-amber-700"}`,
											children: "Directs to dedicated workspace"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `grid grid-cols-2 p-1.5 rounded-2xl border relative ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-amber-50/80 border-amber-200/80"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setRole("citizen"),
												className: `relative z-10 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${role === "citizen" ? "text-white" : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Citizen / Resident" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setRole("official"),
												className: `relative z-10 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${role === "official" ? "text-white" : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Municipal / Panchayat" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												layoutId: "activeRoleSlider",
												className: `absolute inset-y-1.5 rounded-xl -z-0 ${role === "citizen" ? "left-1.5 right-[50%] bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-500/30" : "left-[50%] right-1.5 bg-orange-600 hover:bg-orange-700 shadow-md shadow-rose-500/30"}`,
												transition: {
													type: "spring",
													stiffness: 500,
													damping: 35
												}
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between pb-3 mb-4 border-b border-slate-700/40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-1 rounded-2xl border flex items-center relative ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAuthMode("login"),
												className: `relative z-10 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${authMode === "login" ? "text-white" : isDarkMode ? "text-slate-400" : "text-slate-600"}`,
												children: "Login"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAuthMode("signup"),
												className: `relative z-10 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${authMode === "signup" ? "text-white" : isDarkMode ? "text-slate-400" : "text-slate-600"}`,
												children: "Sign Up"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												layoutId: "authModeSlider",
												className: `absolute inset-y-1 rounded-xl -z-0 bg-orange-600 hover:bg-orange-700 shadow-sm ${authMode === "login" ? "left-1 right-[50%]" : "left-[50%] right-1"}`,
												transition: {
													type: "spring",
													stiffness: 500,
													damping: 35
												}
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: statusMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: -8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -8
									},
									className: `p-3 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2.5 border ${statusMessage.type === "error" ? "bg-rose-500/15 border-rose-500/30 text-rose-500" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-500"}`,
									children: [statusMessage.type === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statusMessage.text })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSubmit,
									className: "space-y-4",
									children: [
										authMode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											exit: {
												opacity: 0,
												height: 0
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold block mb-1",
												children: "Full Legal Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													placeholder: role === "citizen" ? "e.g. Aarav Sharma" : "e.g. Er. Rajesh Varma",
													value: name,
													onChange: (e) => setName(e.target.value),
													className: `w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 focus:border-amber-500 text-white" : "bg-white border-slate-200 focus:border-amber-500 text-slate-900"}`
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-bold block mb-1",
											children: role === "citizen" ? "Mobile Number or Email Address" : "Official Government Email or Registered Mobile"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												placeholder: role === "citizen" ? "+91 98765 43210 or citizen@gmail.com" : "officer@mcd.gov.in / +91 98111...",
												value: identifier,
												onChange: (e) => setIdentifier(e.target.value),
												className: `w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition ${isDarkMode ? "bg-slate-900 border-slate-800 focus:border-amber-500 text-white" : "bg-white border-slate-200 focus:border-amber-500 text-slate-900"}`
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: role === "official" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												scale: .98,
												height: 0
											},
											animate: {
												opacity: 1,
												scale: 1,
												height: "auto"
											},
											exit: {
												opacity: 0,
												scale: .98,
												height: 0
											},
											className: `p-4 rounded-2xl border space-y-3.5 ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-amber-50/50 border-amber-200/80"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jurisdictional Tier:" })]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => {
															setJurisdictionTier("municipality");
															setOfficialDepartment(DEPARTMENTS_URBAN[0]);
															setDesignation("Junior Engineer (Civil)");
														},
														className: `py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${jurisdictionTier === "municipality" ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-700"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Urban Municipality" })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => {
															setJurisdictionTier("panchayat");
															setOfficialDepartment(DEPARTMENTS_RURAL[0]);
															setDesignation("Gram Panchayat Pradhan (Sarpanch)");
														},
														className: `py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${jurisdictionTier === "panchayat" ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20" : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-700"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trees, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rural Gram Panchayat" })]
													})]
												}),
												jurisdictionTier === "municipality" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] font-bold block mb-1",
													children: "Municipal Corporation / Council"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													value: selectedMunicipality,
													onChange: (e) => setSelectedMunicipality(e.target.value),
													className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
													children: PRESET_MUNICIPALITIES.map((mun) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: mun,
														children: mun
													}, mun))
												})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[11px] font-bold block mb-1",
														children: "Gram Panchayat Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
														value: selectedPanchayat,
														onChange: (e) => {
															const found = PRESET_PANCHAYATS.find((p) => p.name === e.target.value);
															setSelectedPanchayat(e.target.value);
															if (found) setPanchayatBlock(found.block);
														},
														className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
														children: PRESET_PANCHAYATS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: p.name,
															children: p.name
														}, p.name))
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[11px] font-bold block mb-1",
														children: "Block / District"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: panchayatBlock,
														onChange: (e) => setPanchayatBlock(e.target.value),
														className: `w-full px-3 py-2 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[11px] font-bold block mb-1",
													children: "Nodal Department"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													value: officialDepartment,
													onChange: (e) => setOfficialDepartment(e.target.value),
													className: `w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
													children: (jurisdictionTier === "municipality" ? DEPARTMENTS_URBAN : DEPARTMENTS_RURAL).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: d,
														children: d
													}, d))
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[11px] font-bold block mb-1",
														children: "Official Designation"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: designation,
														onChange: (e) => setDesignation(e.target.value),
														className: `w-full px-3 py-2 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[11px] font-bold block mb-1",
														children: "Officer Badge ID"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: employeeId,
														onChange: (e) => setEmployeeId(e.target.value),
														className: `w-full px-3 py-2 rounded-xl text-xs border outline-hidden font-mono ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`
													})] })]
												})
											]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold",
													children: "Account Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowForgotModal(true),
													className: "text-xs text-amber-500 hover:underline font-bold cursor-pointer",
													children: "Forgot Password?"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													placeholder: "Enter your password",
													value: password,
													onChange: (e) => setPassword(e.target.value),
													className: `w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-800 focus:border-amber-500 text-white" : "bg-white border-slate-200 focus:border-amber-500 text-slate-900"}`
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
											whileHover: { scale: 1.01 },
											whileTap: { scale: .98 },
											type: "submit",
											className: "w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer mt-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: authMode === "login" ? role === "citizen" ? "Login to Citizen Portal" : "Login to Ward / Panchayat Command" : role === "citizen" ? "Sign Up as Citizen" : "Sign Up as Official Member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 pt-4 border-t border-slate-800/40 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
										children: "🔒 256-bit SSL encrypted • Authorized by National Informatics Centre (NIC)"
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showForgotModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: `w-full max-w-md rounded-3xl border shadow-2xl p-6 ${isDarkMode ? "bg-ink-raised border-slate-700 text-white" : "bg-white border-amber-200 text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-slate-700/40 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-black",
								children: "Reset Account Password"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowForgotModal(false),
							className: "p-1 hover:bg-slate-800 rounded-lg text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), forgotSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-6 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-12 h-12 text-emerald-500 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base font-extrabold",
								children: "Recovery Instructions Dispatched"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400",
								children: [
									"We have dispatched an encrypted recovery code to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: forgotInput || "your registered contact" }),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShowForgotModal(false);
									setForgotSuccess(false);
								},
								className: "mt-3 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20",
								children: "Back to Login"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400",
								children: "Enter your registered mobile number or official email address to receive an instant OTP reset token."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "+91 98765 43210 or name@mcd.gov.in",
								value: forgotInput,
								onChange: (e) => setForgotInput(e.target.value),
								className: `w-full px-3 py-2.5 rounded-xl text-xs border outline-hidden ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowForgotModal(false),
									className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-white",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (forgotInput.trim()) setForgotSuccess(true);
									},
									className: "px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20 cursor-pointer",
									children: "Send Reset Token"
								})]
							})
						]
					})]
				})
			}) })
		]
	});
}
export { LoginPage as default };
