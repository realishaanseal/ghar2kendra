import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { AuthProvider, useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useLocation$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { CITIES } from "./mockIssues-Cf5PfDAM.mjs";
import { ArrowLeft, ArrowRight, Award, Briefcase, ChevronDown, CirclePlus, Flag, LayoutList, LogIn, LogOut, MapPin, Moon, Network, Radar, RotateCcwClock, Sparkles, Sun, X } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion, useReducedMotion } from "../_libs/framer-motion+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/AppShell-VuC9Rp71.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DONE_KEY = "g2k_guide_done";
var START_GUIDE_EVENT = "g2k:start-guide";
var PAD = 6;
var GAP = 14;
var STEPS = [
	{
		target: null,
		title: "Welcome to Ghar2Kendra",
		body: "Report civic problems, follow them until they're fixed, and confirm the repair yourself. Here's a quick look at the controls."
	},
	{
		target: "report",
		title: "File a grievance",
		body: "Snap a photo of a pothole, a dead streetlight or an overflowing drain. Gemini Vision fills in the category, urgency and title for you."
	},
	{
		target: "feed",
		title: "Live Feed",
		body: "Every complaint in your city, the department responsible and its repair deadline. Filter by category or switch to the map."
	},
	{
		target: "memory",
		title: "Civic Memory",
		body: "Every road, drain and streetlight keeps its history: past repairs, defects that came back, and a reliability score."
	},
	{
		target: "insights",
		title: "Insights",
		body: "Finds separate complaints that share one cause, like waterlogging and a choked drain on the same lane."
	},
	{
		target: "missions",
		title: "Missions",
		body: "Team up with neighbours around one cause: shared evidence, a petition drafted from the facts, and follow-up reminders."
	},
	{
		target: "radar",
		title: "My Radar",
		body: "Follow your home, college or route to work, and see only the hazards and repairs that affect you."
	},
	{
		target: "workspaces",
		title: "Workspaces",
		body: "For colleges, residents' associations and NGOs that fix things directly: a work queue, staff assignment and analytics."
	},
	{
		target: "theme",
		title: "Light or dark",
		body: "Switch the look whenever you like."
	},
	{
		target: "account",
		title: "Your account",
		body: "Switch between the citizen and official views here, and open this guide again any time."
	}
];
var findTarget = (name) => document.querySelector(`[data-tour="${name}"]`);
function cardPosition(rect, width) {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	if (!rect) return {
		top: Math.max(16, vh / 2 - 130),
		left: (vw - width) / 2
	};
	const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, 12), vw - width - 12);
	const below = rect.top + rect.height + PAD + GAP;
	return {
		top: below + 240 > vh ? Math.max(12, rect.top - PAD - GAP - 240) : below,
		left
	};
}
function GuideTour({ isDarkMode, ready }) {
	const [active, setActive] = (0, import_react.useState)(false);
	const [steps, setSteps] = (0, import_react.useState)(STEPS);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [rect, setRect] = (0, import_react.useState)(null);
	const primaryRef = (0, import_react.useRef)(null);
	const start = (0, import_react.useCallback)(() => {
		setSteps(STEPS.filter((s) => !s.target || findTarget(s.target)));
		setIndex(0);
		setRect(null);
		setActive(true);
	}, []);
	const finish = (0, import_react.useCallback)(() => {
		setActive(false);
		try {
			localStorage.setItem(DONE_KEY, "1");
		} catch {}
	}, []);
	const next = (0, import_react.useCallback)(() => {
		if (index >= steps.length - 1) finish();
		else setIndex(index + 1);
	}, [
		index,
		steps.length,
		finish
	]);
	const back = (0, import_react.useCallback)(() => setIndex((i) => Math.max(0, i - 1)), []);
	(0, import_react.useEffect)(() => {
		if (!ready) return void 0;
		let done = true;
		try {
			done = localStorage.getItem(DONE_KEY) === "1";
		} catch {}
		if (done) return void 0;
		const timer = setTimeout(start, 350);
		return () => clearTimeout(timer);
	}, [ready, start]);
	(0, import_react.useEffect)(() => {
		window.addEventListener(START_GUIDE_EVENT, start);
		return () => window.removeEventListener(START_GUIDE_EVENT, start);
	}, [start]);
	const step = active ? steps[index] : null;
	(0, import_react.useLayoutEffect)(() => {
		const el = step?.target ? findTarget(step.target) : null;
		if (!el) return void 0;
		el.scrollIntoView({
			block: "nearest",
			inline: "center",
			behavior: "smooth"
		});
		const measure = () => {
			const r = el.getBoundingClientRect();
			setRect({
				top: r.top,
				left: r.left,
				width: r.width,
				height: r.height
			});
		};
		measure();
		const settle = setTimeout(measure, 400);
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, true);
		return () => {
			clearTimeout(settle);
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure, true);
		};
	}, [step]);
	(0, import_react.useEffect)(() => {
		if (!active) return void 0;
		primaryRef.current?.focus({ preventScroll: true });
		const onKey = (e) => {
			if (e.key === "Escape") finish();
			else if (e.key === "ArrowRight") next();
			else if (e.key === "ArrowLeft") back();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		active,
		index,
		next,
		back,
		finish
	]);
	const spotlight = step?.target ? rect : null;
	const width = typeof window === "undefined" ? 340 : Math.min(360, window.innerWidth - 24);
	const pos = active ? cardPosition(spotlight, width) : {
		top: 0,
		left: 0
	};
	const isWelcome = index === 0 && !step?.target;
	const isLast = index === steps.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active && step && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[90]",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .25 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				"aria-hidden": "true"
			}),
			spotlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": "true",
				className: "fixed rounded-xl ring-2 ring-amber-400 pointer-events-none",
				style: { boxShadow: "0 0 0 9999px rgba(12, 10, 8, 0.72)" },
				initial: false,
				animate: {
					top: spotlight.top - PAD,
					left: spotlight.left - PAD,
					width: spotlight.width + 12,
					height: spotlight.height + 12
				},
				transition: {
					type: "spring",
					stiffness: 260,
					damping: 30
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "fixed inset-0 bg-[rgba(12,10,8,0.72)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "g2k-guide-title",
				"aria-describedby": "g2k-guide-body",
				className: `fixed rounded-2xl border p-5 shadow-2xl ${isDarkMode ? "bg-ink-raised border-slate-700 text-white" : "bg-white border-amber-200 text-slate-900"}`,
				style: {
					top: pos.top,
					left: pos.left,
					width
				},
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .3,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400",
							children: isWelcome ? "Quick guide" : `${index} of ${steps.length - 1}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: finish,
							"aria-label": "Close the guide",
							className: `-mr-1.5 p-1.5 rounded-lg transition ${isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "g2k-guide-title",
						className: "mt-2 text-lg font-black tracking-tight",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "g2k-guide-body",
						className: `mt-1.5 text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`,
						children: step.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between gap-3",
						children: [isWelcome ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: finish,
							className: `text-xs font-bold px-1 py-2 transition ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`,
							children: "Skip for now"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							"aria-hidden": "true",
							children: steps.slice(1).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 rounded-full transition-all duration-300 ${i + 1 === index ? "w-4 bg-amber-500" : `w-1.5 ${isDarkMode ? "bg-slate-700" : "bg-slate-300"}`}` }, s.target))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: back,
								"aria-label": "Previous",
								className: `p-2 rounded-xl border transition ${isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-100"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								ref: primaryRef,
								type: "button",
								onClick: next,
								className: "flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md shadow-orange-500/25 active:scale-95",
								children: [isWelcome ? "Show me around" : isLast ? "Got it" : "Next", !isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
							})]
						})]
					})
				]
			}, index)
		]
	}, "guide") });
}
function shortName(name) {
	if (!name) return "User";
	const [first, second] = name.split(" ");
	return first.endsWith(".") && second ? `${first} ${second}` : first;
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full shadow-[0_0_12px_rgba(245,158,11,0.5)] z-50 relative" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `sticky top-0 z-50 transition-colors duration-300 border-b shadow-lg backdrop-blur-2xl ${isDarkMode ? "bg-ink/95 border-slate-800 text-white" : "bg-white/95 border-amber-200/70 text-slate-900"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-3 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between h-16 gap-2 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3 sm:gap-4 shrink-0",
						children: isOfficial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/admin",
							className: "flex items-center gap-2.5 sm:gap-3 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 sm:h-10 px-1.5 sm:px-2 rounded-lg bg-white flex items-center shadow-lg shadow-black/20 group-hover:scale-105 transition duration-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/brand/g2k-logo.webp",
									alt: "Ghar2Kendra",
									width: "720",
									height: "325",
									className: "h-6 sm:h-7 w-auto"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/",
							className: "flex items-center gap-2 sm:gap-3 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 sm:h-10 px-1.5 sm:px-2 rounded-lg bg-white flex items-center shadow-lg shadow-black/20 group-hover:scale-105 transition duration-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/brand/g2k-logo.webp",
									alt: "Ghar2Kendra",
									width: "720",
									height: "325",
									className: "h-6 sm:h-7 w-auto"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								})]
							})]
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
								"data-tour": "theme",
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
								"data-tour": "report",
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
									"data-tour": "account",
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
												children: shortName(currentUser?.name)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-semibold text-amber-500 flex items-center gap-1",
												children: isCitizen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3 h-3 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [currentUser?.karma || 150, " Pts"] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate max-w-[120px]",
													title: currentUser?.designation,
													children: currentUser?.designation?.split(" (")[0] || "Officer"
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
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														setShowProfileMenu(false);
														window.dispatchEvent(new Event("g2k:start-guide"));
													},
													className: `w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show the guide again" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
													to: "/login",
													onClick: () => setShowProfileMenu(false),
													className: `w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-3.5 h-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Switch Role / Account" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: handleLogout,
													className: "w-full py-2 px-3 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
												})
											]
										})
									]
								}) })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/login",
								"data-tour": "account",
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
		tour: "feed",
		to: "/",
		label: "Live Feed",
		icon: LayoutList,
		match: (p) => p === "/"
	},
	{
		tour: "memory",
		to: "/memory",
		label: "Civic Memory",
		icon: RotateCcwClock,
		match: (p) => p.startsWith("/memory")
	},
	{
		tour: "insights",
		to: "/insights",
		label: "Insights",
		icon: Network,
		match: (p) => p.startsWith("/insights")
	},
	{
		tour: "missions",
		to: "/missions",
		label: "Missions",
		icon: Flag,
		match: (p) => p.startsWith("/missions")
	},
	{
		tour: "radar",
		to: "/radar",
		label: "My Radar",
		icon: Radar,
		match: (p) => p.startsWith("/radar")
	},
	{
		tour: "workspaces",
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
			children: SECTIONS.map(({ tour, to, label, icon: Icon, match }) => {
				const active = match(pathname);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to,
					"data-tour": tour,
					className: `flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs font-bold border-b-2 transition ${active ? "border-amber-500 text-amber-600 dark:text-amber-400" : `border-transparent ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5" }), label]
				}, to);
			})
		})
	});
}
var SEEN_KEY = "g2k_intro_seen";
function shouldShowIntro() {
	try {
		return !sessionStorage.getItem(SEEN_KEY);
	} catch {
		return false;
	}
}
function IntroSplash({ onDone }) {
	const reduceMotion = useReducedMotion();
	const [show, setShow] = (0, import_react.useState)(shouldShowIntro);
	const shownOnMount = (0, import_react.useRef)(show);
	(0, import_react.useEffect)(() => {
		if (!shownOnMount.current) {
			onDone?.();
			return;
		}
		try {
			sessionStorage.setItem(SEEN_KEY, "1");
		} catch {}
		const skip = () => setShow(false);
		const timer = setTimeout(skip, reduceMotion ? 700 : 2400);
		window.addEventListener("keydown", skip);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("keydown", skip);
		};
	}, [onDone, reduceMotion]);
	const ease = [
		.22,
		1,
		.36,
		1
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		onExitComplete: onDone,
		children: show && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			onClick: () => setShow(false),
			className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-white cursor-pointer select-none px-6",
			initial: { opacity: 1 },
			exit: {
				opacity: 0,
				transition: {
					duration: .5,
					ease
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Ghar2Kendra is loading"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "relative",
					initial: reduceMotion ? false : {
						scale: .55,
						opacity: 0,
						rotate: -10
					},
					animate: {
						scale: 1,
						opacity: 1,
						rotate: 0
					},
					transition: {
						type: "spring",
						stiffness: 210,
						damping: 17,
						delay: .1
					},
					"aria-hidden": "true",
					children: [!reduceMotion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "absolute inset-0 rounded-3xl bg-white",
						initial: {
							scale: 1,
							opacity: .35
						},
						animate: {
							scale: 1.6,
							opacity: 0
						},
						transition: {
							duration: 1.3,
							delay: .5,
							ease: "easeOut"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative rounded-3xl bg-white px-6 py-4 sm:px-8 sm:py-5 shadow-2xl shadow-black/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/g2k-logo.webp",
							alt: "",
							width: "720",
							height: "325",
							className: "h-16 sm:h-20 w-auto"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "mt-7 font-black text-3xl sm:text-5xl tracking-tight",
					initial: reduceMotion ? false : {
						opacity: 0,
						y: 14
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .55,
						ease
					},
					children: ["Ghar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-amber-400",
						children: "2Kendra"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
					className: "mt-3 text-sm sm:text-base text-slate-400 text-center",
					initial: reduceMotion ? false : {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .8,
						ease
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-slate-200",
						children: "घर से केंद्र तक"
					}), " · From your doorstep to the people who fix it"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "mt-9 h-[3px] w-40 sm:w-56 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] origin-left shadow-[0_0_12px_rgba(245,158,11,0.5)]",
					initial: reduceMotion ? false : { scaleX: 0 },
					animate: { scaleX: 1 },
					transition: {
						duration: 1.2,
						delay: .95,
						ease: [
							.65,
							0,
							.35,
							1
						]
					},
					"aria-hidden": "true"
				})
			]
		}, "intro")
	});
}
var ThemeContext = import_react.createContext(true);
function AppShell({ children }) {
	const [themeMode, setThemeMode] = (0, import_react.useState)(() => {
		return localStorage.getItem("civic_theme_mode") || "dark";
	});
	const isDarkMode = themeMode === "dark";
	const [introDone, setIntroDone] = (0, import_react.useState)(false);
	const handleIntroDone = (0, import_react.useCallback)(() => setIntroDone(true), []);
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroSplash, { onDone: handleIntroDone }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideTour, {
					isDarkMode,
					ready: introDone
				})
			]
		})
	}) });
}
export { ThemeContext, AppShell as default };
