import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { AuthProvider, useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useLocation$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { CITIES } from "./mockIssues-Cf5PfDAM.mjs";
import { Award, Briefcase, ChevronDown, CirclePlus, Flag, LayoutList, LogIn, LogOut, MapPin, Moon, Network, Radar, RotateCcwClock, Sun } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/AppShell-PPCiN6If.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Navbar({ isDarkMode, onToggleTheme }) {
	const { currentUser, isLoggedIn, isCitizen, isOfficial, logout } = useAuth();
	const navigate = useNavigate$1();
	useLocation$1();
	const [selectedCity, setSelectedCity] = (0, import_react.useState)(CITIES[0]);
	const [showCityDropdown, setShowCityDropdown] = (0, import_react.useState)(false);
	const [showProfileMenu, setShowProfileMenu] = (0, import_react.useState)(false);
	const handleLogout = () => {
		logout();
		setShowProfileMenu(false);
		navigate("/login");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[3px] bg-gradient-to-r from-amber-500 via-white to-emerald-500 w-full shadow-[0_0_12px_rgba(245,158,11,0.5)] z-50 relative" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `sticky top-0 z-50 transition-colors duration-300 border-b shadow-lg backdrop-blur-2xl ${isDarkMode ? "bg-ink/95 border-slate-800 text-white" : "bg-white/95 border-amber-200/70 text-slate-900"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-3 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between h-16 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3 sm:gap-4 shrink-0",
						children: isOfficial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/admin",
							className: "flex items-center gap-2.5 sm:gap-3 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-600 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-rose-500/30 group-hover:scale-105 transition duration-300",
								children: "🏛️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 sm:gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-black text-[15px] sm:text-lg tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`,
									children: ["Ghar2Kendra ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-600 dark:text-amber-400",
										children: "Command"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full border tracking-wider bg-rose-500/15 text-rose-500 border-rose-500/30",
									children: "OFFICIAL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `hidden sm:block text-[10px] font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
								children: "Panchayati Raj & Municipal Administration Kendra"
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/",
							className: "flex items-center gap-2 sm:gap-3 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-600 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition duration-300",
								children: "🏛️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 sm:gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-black text-[15px] sm:text-lg tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`,
									children: ["Ghar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-600 dark:text-amber-400",
										children: "2Kendra"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `hidden sm:inline text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full border tracking-wider ${isDarkMode ? "bg-amber-500/10 text-amber-300 border-amber-500/30" : "bg-amber-100 text-amber-900 border-amber-300"}`,
									children: "INDIA"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `hidden sm:block text-[10px] font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`,
								children: "घर से केंद्र तक • Citizen Grievance & Public Works Network"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex items-center gap-2",
						children: isOfficial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs shadow-xs ${isDarkMode ? "bg-slate-900/90 border-slate-800 text-slate-200" : "bg-amber-50 border-amber-200 text-slate-800"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2 w-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-extrabold flex items-center gap-1 text-[11px]",
									children: currentUser?.jurisdictionType === "panchayat" ? "🌾 Gram Panchayat:" : "🏛️ Municipality:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-amber-600 dark:text-amber-400 truncate max-w-[240px]",
									children: currentUser?.jurisdictionName || "MCD South Zone"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs shadow-xs ${isDarkMode ? "bg-slate-900/90 border-slate-800 text-slate-300" : "bg-amber-50 border-amber-200 text-slate-700"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-[11px]",
								children: "250 Smart City Wards Online"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-3 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileTap: { scale: .92 },
								onClick: onToggleTheme,
								className: `flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-bold transition shadow-xs cursor-pointer ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-400" : "bg-white hover:bg-amber-50 border-amber-200 text-amber-900 shadow-sm"}`,
								title: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`,
								children: isDarkMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4 text-amber-400 animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden lg:inline text-white",
									children: "Light Mode"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4 text-slate-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden lg:inline text-slate-800",
									children: "Dark Mode"
								})] })
							}),
							isCitizen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowCityDropdown(!showCityDropdown),
									className: `flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-2 rounded-xl transition border shadow-xs ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-amber-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: selectedCity.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3 h-3 text-slate-400" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showCityDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										scale: .95
									},
									animate: {
										opacity: 1,
										y: 0,
										scale: 1
									},
									exit: {
										opacity: 0,
										y: 8,
										scale: .95
									},
									transition: { duration: .15 },
									className: `absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl p-1.5 z-50 overflow-hidden border ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-[10px] uppercase font-extrabold px-3 py-1.5 border-b tracking-wider ${isDarkMode ? "text-slate-400 border-slate-800" : "text-slate-500 border-slate-100"}`,
										children: "Select Corporation"
									}), CITIES.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setSelectedCity(city);
											setShowCityDropdown(false);
										},
										className: `w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${selectedCity.id === city.id ? "bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md" : isDarkMode ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-700 hover:bg-slate-100"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: city.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] opacity-70 font-mono",
											children: [city.wards.split(" ")[0], "W"]
										})]
									}, city.id))]
								}) })]
							}),
							isCitizen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/report",
								className: "flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-lg shadow-orange-500/25 active:scale-95 duration-200 shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "w-4 h-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "File Grievance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sm:hidden",
										children: "Report"
									})
								]
							}),
							isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowProfileMenu(!showProfileMenu),
									className: `flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border transition shadow-xs cursor-pointer ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white" : "bg-white hover:bg-amber-50 border-amber-200 text-slate-900"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-7 h-7 rounded-xl bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-sm shadow-sm text-white shrink-0",
											children: currentUser?.avatar || (isCitizen ? "👨‍💼" : "🏛️")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden sm:block text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-black truncate max-w-[110px] leading-tight",
												children: currentUser?.name?.split(" ")[0] || "User"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-semibold text-amber-500 flex items-center gap-1",
												children: isCitizen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3 h-3 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [currentUser?.karma || 150, " Pts"] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate max-w-[95px]",
													children: currentUser?.designation?.split(" ")[0] || "Officer"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3.5 h-3.5 text-slate-400 hidden sm:block" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showProfileMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										scale: .95
									},
									animate: {
										opacity: 1,
										y: 0,
										scale: 1
									},
									exit: {
										opacity: 0,
										y: 8,
										scale: .95
									},
									transition: { duration: .15 },
									className: `absolute right-0 mt-2 w-64 rounded-3xl shadow-2xl p-4 z-50 border ${isDarkMode ? "bg-ink-raised border-slate-800 text-white" : "bg-white border-amber-200 text-slate-900 shadow-amber-950/10"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pb-3 border-b border-slate-700/40 mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-xl text-white shadow-md",
													children: currentUser?.avatar || "👤"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-black text-xs sm:text-sm truncate",
															children: currentUser?.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-slate-400 truncate",
															children: currentUser?.email || currentUser?.phone
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 border ${isOfficial ? "bg-rose-500/15 text-rose-500 border-rose-500/30" : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"}`,
															children: isOfficial ? `${currentUser?.jurisdictionType?.toUpperCase()} OFFICER` : "CITIZEN VERIFIER"
														})
													]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `p-2.5 rounded-xl text-[11px] mb-3 space-y-1.5 border ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"}`,
											children: isCitizen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium",
													children: "Karma Points:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-black text-amber-500",
													children: ["⭐ ", currentUser?.karma || 150]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium",
													children: "Resident Ward:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold truncate max-w-[130px]",
													children: currentUser?.ward || "Ward 14"
												})]
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium",
													children: "Designation:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-amber-500 truncate max-w-[130px]",
													children: currentUser?.designation
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium",
													children: "Badge ID:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold text-[10px]",
													children: currentUser?.officerId
												})]
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
												to: "/login",
												onClick: () => setShowProfileMenu(false),
												className: `w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-3.5 h-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Switch Role / Account" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleLogout,
												className: "w-full py-2 px-3 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
											})]
										})
									]
								}) })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/login",
								className: "flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition shadow-md shadow-orange-500/20 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Login" })]
							})
						]
					})
				]
			})
		})
	})] });
}
var SECTIONS = [
	{
		to: "/",
		label: "Live Feed",
		icon: LayoutList,
		match: (p) => p === "/"
	},
	{
		to: "/memory",
		label: "Civic Memory",
		icon: RotateCcwClock,
		match: (p) => p.startsWith("/memory")
	},
	{
		to: "/insights",
		label: "Insights",
		icon: Network,
		match: (p) => p.startsWith("/insights")
	},
	{
		to: "/missions",
		label: "Missions",
		icon: Flag,
		match: (p) => p.startsWith("/missions")
	},
	{
		to: "/radar",
		label: "My Radar",
		icon: Radar,
		match: (p) => p.startsWith("/radar")
	},
	{
		to: "/workspaces",
		label: "Workspaces",
		icon: Briefcase,
		match: (p) => p.startsWith("/workspaces")
	}
];
function SectionNav({ isDarkMode }) {
	const { pathname } = useLocation$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Civic modules",
		className: `border-b transition-colors ${isDarkMode ? "bg-ink/90 border-slate-800" : "bg-paper-raised/90 border-amber-200/70"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-3 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar",
			children: SECTIONS.map(({ to, label, icon: Icon, match }) => {
				const active = match(pathname);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to,
					className: `flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs font-bold border-b-2 transition ${active ? "border-amber-500 text-amber-600 dark:text-amber-400" : `border-transparent ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5" }), label]
				}, to);
			})
		})
	});
}
var ThemeContext = import_react.createContext(true);
function AppShell({ children }) {
	const [themeMode, setThemeMode] = (0, import_react.useState)(() => {
		return localStorage.getItem("civic_theme_mode") || "dark";
	});
	const isDarkMode = themeMode === "dark";
	(0, import_react.useEffect)(() => {
		localStorage.setItem("civic_theme_mode", themeMode);
		document.documentElement.classList.toggle("dark", isDarkMode);
		document.body.classList.toggle("dark", isDarkMode);
	}, [themeMode, isDarkMode]);
	const toggleTheme = () => {
		setThemeMode((prev) => prev === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: isDarkMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen font-sans flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
					isDarkMode,
					onToggleTheme: toggleTheme
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionNav, { isDarkMode }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children
				})
			]
		})
	}) });
}
export { ThemeContext, AppShell as default };
