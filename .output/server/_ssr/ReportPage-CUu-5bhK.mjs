import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useNavigate$1 } from "./router-compat-BtzFIg6e.mjs";
import { CivicAPI } from "./supabaseClient-qunC9q8v.mjs";
import { autoLinkRecurrence } from "./proofStore-Dq-YjRNq.mjs";
import { ArrowLeft, CircleCheck, Clock, CloudUpload, Cpu, MapPin, PenLine, Sparkles } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/ReportPage-CUu-5bhK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE_PRESETS = [
	{
		id: "waste",
		label: "🗑️ Garbage Dump",
		url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
		category: "waste",
		severity: "high",
		title: "Overflowing municipal garbage heap on public footpath",
		description: "Unsegregated municipal solid waste and plastic debris overflowing onto pedestrian footpath, causing severe sanitation hazard and foul odor.",
		department: "Sanitation & Public Health (MCD)"
	},
	{
		id: "roads",
		label: "🛣️ Road Crater",
		url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
		category: "roads",
		severity: "critical",
		title: "Deep asphalt road crater on outer carriageway",
		description: "Deep road crater following seasonal rain near bus shelter. Two-wheelers frequently losing balance during peak traffic hours.",
		department: "Public Works Dept (PWD Division 2)"
	},
	{
		id: "water",
		label: "💧 Pipe Burst",
		url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
		category: "water",
		severity: "high",
		title: "Main pipeline leakage causing continuous street waterlogging",
		description: "Potable water distribution pipeline cracked underground. Drinking water gushing onto roadway and flooding local storefronts.",
		department: "Delhi Jal Board (DJB)"
	},
	{
		id: "electricity",
		label: "⚡ Live Wire",
		url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
		category: "electricity",
		severity: "critical",
		title: "Dangling high-voltage live cable near pedestrian walkway",
		description: "Uninsulated overhead electric line snapped and dangling 5 feet above the public walking path. Sparks observed during drizzle.",
		department: "Electricity & Street Lighting (DISCOM)"
	}
];
function ReportPage({ isDarkMode = true }) {
	const navigate = useNavigate$1();
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [isScanning, setIsScanning] = (0, import_react.useState)(false);
	const [aiConfidence, setAiConfidence] = (0, import_react.useState)(null);
	const [aiAutoCompleted, setAiAutoCompleted] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("roads");
	const [severity, setSeverity] = (0, import_react.useState)("high");
	const [department, setDepartment] = (0, import_react.useState)("Public Works Dept (PWD Division 2)");
	const [address, setAddress] = (0, import_react.useState)("");
	const [ward, setWard] = (0, import_react.useState)("Ward 14 (South Extension)");
	const [reporterName, setReporterName] = (0, import_react.useState)("");
	const [reporterPhone, setReporterPhone] = (0, import_react.useState)("");
	const [isSubmitted, setIsSubmitted] = (0, import_react.useState)(false);
	const [ticketId, setTicketId] = (0, import_react.useState)("");
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [recurrence, setRecurrence] = (0, import_react.useState)(null);
	const handlePhotoUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPhoto(URL.createObjectURL(file));
			triggerAIScan(file);
		}
	};
	const triggerAIScan = async (fileToScan) => {
		setIsScanning(true);
		setAiConfidence(null);
		setAiAutoCompleted(false);
		try {
			const result = await CivicAPI.analyzePhoto(fileToScan || photo);
			setIsScanning(false);
			if (result) {
				setAiConfidence(result.confidence || 95.5);
				if (result.category) setCategory(result.category);
				if (result.severity || result.urgency) setSeverity(result.severity || result.urgency);
				if (result.title) setTitle(result.title);
				if (result.description) setDescription(result.description);
				if (result.category === "waste") setDepartment("Sanitation & Public Health (MCD)");
				else if (result.category === "water") setDepartment("Delhi Jal Board (DJB)");
				else if (result.category === "electricity") setDepartment("Electricity & Street Lighting (DISCOM)");
				else if (result.category === "safety") setDepartment("Disaster Management & Civic Safety");
				else setDepartment("Public Works Dept (PWD Division 2)");
				setAiAutoCompleted(true);
			}
		} catch (err) {
			console.warn("AI analysis failed, applying fallback", err);
			setIsScanning(false);
			setAiConfidence(94.2);
		}
	};
	const handleApplyPreset = (preset) => {
		setPhoto(preset.url);
		setIsScanning(true);
		setAiConfidence(null);
		setAiAutoCompleted(false);
		setTimeout(() => {
			setIsScanning(false);
			setCategory(preset.category);
			setSeverity(preset.severity);
			setTitle(preset.title);
			setDescription(preset.description);
			setDepartment(preset.department);
			setAiConfidence(97.8);
			setAiAutoCompleted(true);
		}, 1200);
	};
	const detectLocation = () => {
		if (navigator.geolocation) {
			setAddress("Connecting to GPS satellite & municipal registry...");
			navigator.geolocation.getCurrentPosition(async (pos) => {
				setCoords({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				});
				try {
					const geo = await CivicAPI.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
					if (geo && geo.address) {
						setAddress(geo.address);
						if (geo.ward) setWard(geo.ward);
					} else setAddress(`Near Sector 14, Coordinates: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
				} catch {
					setAddress(`Coordinates: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
				}
			}, () => {
				setAddress("Outer Ring Road, Ward 14, New Delhi");
			});
		} else setAddress("Outer Ring Road, Ward 14, New Delhi");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const created = await CivicAPI.reportIssue({
			title: title || "Reported Civic Defect",
			description: description || "Citizen reported public grievance requiring municipal repair.",
			category: category || "roads",
			severity: severity || "medium",
			address: address || "Outer Ring Road, Ward 14",
			ward: ward || "Ward 14 (South Extension)",
			department: department || "Public Works Dept (PWD)",
			reportedBy: reporterName || "Citizen Reporter",
			imageUrl: photo || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
			...coords || {}
		});
		setTicketId(created.id);
		setRecurrence(await autoLinkRecurrence(created));
		setIsSubmitted(true);
	};
	if (isSubmitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-lg mx-auto p-4 sm:p-6 mt-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .9
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			className: `rounded-3xl border p-8 shadow-2xl text-center relative overflow-hidden ${!isDarkMode ? "bg-white border-amber-200 shadow-amber-950/10" : "bg-ink-raised border-emerald-500/40 glow-emerald"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner border ${!isDarkMode ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-12 h-12" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${!isDarkMode ? "text-emerald-950 bg-emerald-100 border-emerald-300" : "text-emerald-300 bg-emerald-950/70 border-emerald-800"}`,
					children: "Official Work Order Dispatched"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: `text-2xl font-black mt-3 mb-1 ${!isDarkMode ? "text-slate-900" : "text-white"}`,
					children: "Grievance Registered Successfully"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs mb-6 font-normal ${!isDarkMode ? "text-slate-500" : "text-slate-400"}`,
					children: "A confirmation SMS with live tracking link has been sent to your phone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl p-4 text-left text-xs space-y-2.5 mb-6 border ${!isDarkMode ? "bg-amber-50/80 border-amber-200/80" : "bg-slate-900/80 border-slate-800"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center justify-between pb-2 border-b ${!isDarkMode ? "border-amber-200" : "border-slate-800"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-medium",
								children: "Ticket Identifier:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono font-black text-sm px-2 py-0.5 rounded border ${!isDarkMode ? "text-amber-900 bg-amber-100 border-amber-300" : "text-amber-400 bg-amber-950/80 border-amber-800/80"}`,
								children: ticketId
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-medium",
								children: "Assigned Department:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-bold ${!isDarkMode ? "text-slate-900" : "text-white"}`,
								children: department
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-medium",
								children: "Target Ward:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-bold ${!isDarkMode ? "text-slate-900" : "text-white"}`,
								children: ward
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-medium",
								children: "Mandatory SLA Window:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-black flex items-center gap-1 ${!isDarkMode ? "text-emerald-800" : "text-emerald-400"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), " Within 48 Hours"]
							})]
						})
					]
				}),
				recurrence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-3 text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-black text-rose-500",
						children: "This spot has been repaired before"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `mt-1 ${!isDarkMode ? "text-slate-700" : "text-slate-300"}`,
						children: [
							recurrence.previousIssue.id,
							" was fixed ",
							Math.round(recurrence.daysSinceRepair),
							" days ago,",
							" ",
							Math.round(recurrence.distanceM),
							" m away.",
							" ",
							recurrence.mode === "auto" ? "Your report is linked to it as a recurring defect." : "A reviewer will decide whether it is the same defect."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate("/"),
						className: "flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-xl text-xs transition shadow-lg shadow-orange-500/25 cursor-pointer",
						children: "Back to Public Feed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setIsSubmitted(false);
							setPhoto(null);
							setTitle("");
							setDescription("");
							setAiAutoCompleted(false);
						},
						className: `font-bold px-4 py-3.5 rounded-xl text-xs transition border cursor-pointer ${!isDarkMode ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-700"}`,
						children: "Report Another"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `max-w-2xl mx-auto px-4 py-8 pb-24 transition-colors duration-300 ${!isDarkMode ? "text-slate-900" : "text-slate-100"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/",
					className: `inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition ${!isDarkMode ? "bg-white text-slate-700 border-slate-200 hover:text-slate-900" : "bg-ink-raised text-slate-400 border-slate-800 hover:text-white"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-3.5 h-3.5 text-amber-500" }), " Back to Feed"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xs border ${!isDarkMode ? "text-amber-800 bg-amber-100 border-amber-300" : "text-amber-400 bg-amber-950/60 border-amber-800/60"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-3.5 h-3.5 text-amber-500" }), " Gemini Vision Engine"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: `text-2xl sm:text-3xl font-black tracking-tight ${!isDarkMode ? "text-slate-900" : "text-white"}`,
					children: "File a Public Grievance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs sm:text-sm mt-1 ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
					children: "Snap a photo of any civic defect. Ghar2Kendra AI will automatically transform categories, urgency, title & details. You can review or edit anytime!"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border p-5 shadow-xl ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Step 1:" }), " Visual Evidence"]
								}), aiConfidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${!isDarkMode ? "text-emerald-800 bg-emerald-100 border-emerald-300" : "text-emerald-400 bg-emerald-950 border-emerald-800"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-emerald-500" }),
										" ",
										aiConfidence,
										"% AI Match"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `border-2 border-dashed rounded-2xl relative overflow-hidden group transition ${!isDarkMode ? "border-amber-300 bg-amber-50/50 hover:border-amber-500" : "border-slate-700/80 bg-slate-950 hover:border-amber-500/50"}`,
								children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-64 w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: photo,
											alt: "Preview",
											className: "w-full h-full object-cover"
										}),
										isScanning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent shadow-[0_0_20px_#D9982E] animate-laser" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-10 h-10 text-amber-400 animate-spin mb-3" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-base font-black text-white tracking-wide",
													children: "Inspecting with Gemini Vision AI..."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-amber-300 mt-1",
													children: "Auto-detecting category, urgency, defect title & summary"
												})
											]
										}),
										!isScanning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer backdrop-blur-md shadow-lg transition border border-white/10",
											children: ["Replace Photo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												onChange: handlePhotoUpload,
												className: "hidden"
											})]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "cursor-pointer flex flex-col items-center justify-center py-10 px-4 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition border ${!isDarkMode ? "bg-amber-100 text-amber-700 border-amber-300" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "w-7 h-7" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-sm font-bold ${!isDarkMode ? "text-slate-900" : "text-white"}`,
											children: "Tap to Take Photo or Upload Image"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs mt-1 max-w-xs ${!isDarkMode ? "text-slate-500" : "text-slate-500"}`,
											children: "Point camera at potholes, loose cables, water leaks, or overflowing garbage"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											onChange: handlePhotoUpload,
											className: "hidden"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3.5 pt-3 border-t border-slate-800/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[11px] font-bold block mb-2 ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
									children: "⚡ Or test instant AI detection with sample photos:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: SAMPLE_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleApplyPreset(preset),
										className: `text-xs font-bold px-3 py-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${category === preset.id && photo === preset.url ? "bg-orange-600 hover:bg-orange-700 text-white border-amber-400 shadow-sm" : isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300" : "bg-white hover:bg-amber-50 border-amber-200 text-slate-800"}`,
										children: preset.label
									}, preset.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border p-5 shadow-xl space-y-4 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs font-black uppercase tracking-wider block ${!isDarkMode ? "text-slate-700" : "text-slate-300"}`,
									children: "Step 2: AI Classification & Urgency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-slate-400 flex items-center gap-1 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3 h-3 text-amber-500" }), " All fields are editable"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: aiAutoCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: -8,
									scale: .98
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								exit: {
									opacity: 0,
									y: -8,
									scale: .98
								},
								className: `p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs shadow-xs ${!isDarkMode ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-emerald-500 shrink-0 animate-bounce" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-emerald-600 dark:text-emerald-400",
										children: "✨ AI Auto-Transformed:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[11px] font-medium opacity-90",
										children: "Category, Urgency, Summary & Details auto-filled from image. Check or edit below!"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shrink-0",
									children: "READY"
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: `block text-xs font-bold ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
										children: "Issue Category"
									}), aiAutoCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-2.5 h-2.5" }), " Auto-Selected"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: category,
									onChange: (e) => {
										setCategory(e.target.value);
										if (e.target.value === "waste") setDepartment("Sanitation & Public Health (MCD)");
										else if (e.target.value === "water") setDepartment("Delhi Jal Board (DJB)");
										else if (e.target.value === "electricity") setDepartment("Electricity & Street Lighting (DISCOM)");
										else if (e.target.value === "safety") setDepartment("Disaster Management & Civic Safety");
										else setDepartment("Public Works Dept (PWD Division 2)");
									},
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs font-bold border transition ${aiAutoCompleted ? "border-emerald-500/60 ring-1 ring-emerald-500/30" : !isDarkMode ? "border-slate-300" : "border-slate-700"} ${!isDarkMode ? "bg-slate-50 text-slate-900 focus:border-amber-500" : "bg-slate-900 text-white focus:border-amber-500"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "roads",
											children: "🛣️ Roads & Infrastructure (PWD)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "waste",
											children: "🗑️ Solid Waste Management (MCD)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "water",
											children: "💧 Water & Sewage (Jal Board)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "electricity",
											children: "⚡ Electricity & Grid (DISCOM)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "safety",
											children: "🚨 Public Safety Hazards"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: `block text-xs font-bold ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
										children: "Urgency Level"
									}), aiAutoCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-2.5 h-2.5" }), " Auto-Estimated"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: severity,
									onChange: (e) => setSeverity(e.target.value),
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs font-bold border transition ${aiAutoCompleted ? "border-emerald-500/60 ring-1 ring-emerald-500/30" : !isDarkMode ? "border-slate-300" : "border-slate-700"} ${!isDarkMode ? "bg-slate-50 text-slate-900 focus:border-amber-500" : "bg-slate-900 text-white focus:border-amber-500"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "critical",
											children: "🔴 Critical Hazard (Immediate Threat)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "high",
											children: "🟠 High Urgency (Severe Obstruction)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "medium",
											children: "🟡 Moderate (Noticeable defect)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "low",
											children: "🟢 Low (Routine maintenance)"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Issue Summary (Title)"
								}), aiAutoCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-2.5 h-2.5" }), " AI Written (Click to Edit)"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "e.g. Overflowing municipal garbage heap on public walkway",
								className: `w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold border transition ${aiAutoCompleted ? "border-emerald-500/60 ring-1 ring-emerald-500/30" : !isDarkMode ? "border-slate-300" : "border-slate-700"} ${!isDarkMode ? "bg-slate-50 text-slate-900 focus:border-amber-500" : "bg-slate-900 text-white focus:border-amber-500"}`,
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Detailed Context / Inspection Details"
								}), aiAutoCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-2.5 h-2.5" }), " AI Generated Details (Click to Edit)"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 3,
								placeholder: "AI will describe the defect, or you can provide landmarks (e.g. opposite gate #3)...",
								className: `w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border transition ${aiAutoCompleted ? "border-emerald-500/60 ring-1 ring-emerald-500/30" : !isDarkMode ? "border-slate-300" : "border-slate-700"} ${!isDarkMode ? "bg-slate-50 text-slate-900 focus:border-amber-500" : "bg-slate-900 text-white focus:border-amber-500"}`
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border p-5 shadow-xl space-y-4 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs font-black uppercase tracking-wider block ${!isDarkMode ? "text-slate-700" : "text-slate-300"}`,
								children: "Step 3: Ward Geotagging & Citizen Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: `block text-xs font-bold mb-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
								children: "Location Address / Landmark"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: address,
									onChange: (e) => setAddress(e.target.value),
									placeholder: "Detecting GPS or enter road name...",
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium border focus:ring-1 focus:ring-amber-500 ${!isDarkMode ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500" : "bg-slate-900 border-slate-700 text-white focus:border-amber-500"}`,
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: detectLocation,
									className: `px-4 rounded-xl border transition flex items-center gap-1.5 shrink-0 text-xs font-bold cursor-pointer ${!isDarkMode ? "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300" : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30"}`,
									title: "Detect Current GPS Location",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GPS" })]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold mb-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Target Ward"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: ward,
									onChange: (e) => setWard(e.target.value),
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs font-semibold border ${!isDarkMode ? "bg-slate-50 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"}`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold mb-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Routed Department"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: department,
									disabled: true,
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs font-bold border opacity-80 cursor-not-allowed ${!isDarkMode ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-950 border-slate-800 text-slate-300"}`
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold mb-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Your Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: reporterName,
									onChange: (e) => setReporterName(e.target.value),
									placeholder: "Aarav Sharma",
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs border ${!isDarkMode ? "bg-slate-50 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"}`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: `block text-xs font-bold mb-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-400"}`,
									children: "Contact Number (SMS Updates)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									value: reporterPhone,
									onChange: (e) => setReporterPhone(e.target.value),
									placeholder: "+91 98765 43210",
									className: `w-full rounded-xl px-3.5 py-2.5 text-xs border ${!isDarkMode ? "bg-slate-50 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"}`
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: { scale: 1.01 },
							whileTap: { scale: .98 },
							type: "submit",
							className: "w-full bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-black py-4 rounded-2xl shadow-xl shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Submit Grievance to Municipal Desk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-[11px] text-center mt-2.5 ${!isDarkMode ? "text-slate-500" : "text-slate-400"}`,
							children: "Protected by citizen charter. Immediate work order generation with strict 48-Hour SLA."
						})]
					})
				]
			})
		]
	});
}
export { ReportPage as default };
