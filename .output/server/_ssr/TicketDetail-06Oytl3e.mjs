import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { useAuth } from "./AuthContext-B2m8Co6B.mjs";
import { Link$1, useNavigate$1, useParams$1 } from "./router-compat-BtzFIg6e.mjs";
import { MOCK_ISSUES } from "./mockIssues-Cf5PfDAM.mjs";
import { CivicAPI } from "./supabaseClient-qunC9q8v.mjs";
import { timeAgo } from "./time-CSlph-K_.mjs";
import { STAGE_COPY } from "./proof-ooQUoaE1.mjs";
import { getArchivedTicket, getMemoryForIssue, summarizeMemory } from "./memoryStore-B4afoKcQ.mjs";
import { PROOF_EVENT, addAttestation, decideRecurrenceLink, getProofStatus, getRecurrenceLink } from "./proofStore-Dq-YjRNq.mjs";
import { surface } from "./surface-asNnoH_8.mjs";
import { ArrowLeft, ArrowRight, Award, Bell, BuildingComplex, Check, CircleCheck, Clock, Flag, Gavel, HardHat, Info, LocateFixed, MapPin, MessageSquare, Repeat, RotateCcwClock, Send, Share2, ShieldCheck, Sparkles, ThumbsUp, Users, X } from "../_libs/lucide-react.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion+[...].mjs";
import { MemoryTimeline, ReliabilityRing } from "./MemoryParts-Bj60hMcH.mjs";
import { getMissions } from "./missionStore-Blm7tUWo.mjs";
import { compareProofPhotos } from "./aiAdvisory-DMRQjien.mjs";
import { confetti_module_default } from "../_libs/canvas-confetti.mjs";
// node_modules/.nitro/vite/services/ssr/assets/TicketDetail-06Oytl3e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Compact Civic Memory panel for a ticket: what else happened at this spot. */
function LocationMemoryCard({ issue, isDarkMode }) {
	const s = surface(isDarkMode);
	const [memory, setMemory] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getMemoryForIssue(issue).then((m) => !cancelled && setMemory(m));
		return () => {
			cancelled = true;
		};
	}, [issue]);
	if (!memory) return null;
	const others = memory.events.filter((e) => e.issueId !== issue.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${s.card} p-5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: `font-extrabold text-sm flex items-center gap-2 ${s.heading}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcwClock, { className: "w-4 h-4 text-amber-500" }), " Location memory"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReliabilityRing, {
					reliability: memory.reliability,
					size: 52
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs font-black leading-snug ${s.heading}`,
						children: memory.asset.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-[11px] mt-0.5 ${s.muted}`,
						children: summarizeMemory(memory)
					})]
				})]
			}),
			others.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryTimeline, {
					events: others,
					s,
					limit: 3
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-[11px] mt-3 ${s.muted}`,
				children: "First recorded issue at this asset."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				to: `/memory/${memory.asset.id}`,
				className: `${s.ghostButton} w-full mt-4`,
				children: ["Full asset history ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
			})
		]
	});
}
var TONE = {
	amber: "bg-amber-500/15 text-amber-500 border-amber-500/30",
	teal: "bg-teal-500/15 text-teal-400 border-teal-500/30",
	rose: "bg-rose-500/15 text-rose-500 border-rose-500/30",
	emerald: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
};
function currentPosition() {
	return new Promise((resolve) => {
		if (!navigator.geolocation) return resolve(null);
		navigator.geolocation.getCurrentPosition((pos) => resolve({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}), () => resolve(null), { timeout: 6e3 });
	});
}
/**
* Proof-of-Resolution for a resolved ticket: evidence, independent resident attestations
* with a quorum, and the human review gate. Replaces the one-click "confirm fix".
*/
function ProofOfResolutionPanel({ issue, isDarkMode, onAttested }) {
	const s = surface(isDarkMode);
	const { currentUser, isCitizen } = useAuth();
	const [status, setStatus] = (0, import_react.useState)(() => getProofStatus(issue));
	const [message, setMessage] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [advisory, setAdvisory] = (0, import_react.useState)(null);
	const [demoLocation, setDemoLocation] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const refresh = () => setStatus(getProofStatus(issue));
		refresh();
		window.addEventListener(PROOF_EVENT, refresh);
		return () => window.removeEventListener(PROOF_EVENT, refresh);
	}, [issue]);
	const mine = status.attestations.find((a) => a.userId === currentUser?.id);
	const stage = STAGE_COPY[status.stage];
	const open = status.stage === "collecting" || status.stage === "awaiting_review" || status.stage === "disputed";
	const attest = async (verdict) => {
		setBusy(true);
		let where = demoLocation ? null : await currentPosition();
		let demo = false;
		if (!where) {
			where = {
				lat: issue.lat + 25e-5,
				lng: issue.lng + 2e-4
			};
			demo = true;
		}
		const check = addAttestation(issue, {
			user: currentUser,
			verdict,
			...where
		});
		setBusy(false);
		setMessage({
			ok: check.eligible,
			text: check.eligible ? `Recorded${demo ? " using a demo location" : ""}. ${check.reason}.` : `Recorded, but it doesn't count towards the quorum: ${check.reason}.`
		});
		if (check.eligible && verdict === "fixed") onAttested?.();
	};
	const runAdvisory = async () => {
		setAdvisory({ loading: true });
		setAdvisory(await compareProofPhotos(issue.imageUrl, issue.resolvedPhotoUrl, issue.category));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		layout: true,
		className: `${s.card} p-6`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: `font-black text-base flex items-center gap-2 ${s.heading}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-amber-500" }), " Proof of Resolution"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${TONE[stage.tone]}`,
					children: stage.label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: `text-xs mt-2 ${s.muted}`,
				children: [
					"A repair closes only when ",
					3,
					" independent residents within ",
					250,
					" m confirm it and a reviewer signs off. The reporter, the contractor and officials can't vote."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-[11px] font-bold mb-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: s.text,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5 inline mr-1 text-amber-500" }), "Resident confirmations"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-amber-500",
						children: [
							status.confirmations,
							"/",
							3,
							status.disputes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-rose-500",
								children: [
									" · ",
									status.disputes,
									" dispute",
									status.disputes > 1 ? "s" : ""
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 flex-1 rounded-full ${i < status.confirmations ? "bg-emerald-500" : "bg-slate-500/25"}` }, i))
				})]
			}),
			status.attestations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: status.attestations.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `${s.inset} px-3 py-2 flex items-center gap-3 text-[11px]`,
					children: [
						a.verdict === "fixed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-emerald-500 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4 text-rose-500 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-bold ${s.heading}`,
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: s.muted,
								children: [
									" · ",
									a.distanceM != null ? `${Math.round(a.distanceM)} m away` : "no location",
									" · ",
									timeAgo(new Date(a.at))
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-bold shrink-0 ${a.eligible ? "text-emerald-500" : "text-slate-400 line-through decoration-1"}`,
							title: a.reason,
							children: a.eligible ? "Counts" : a.reason
						})
					]
				}, `${a.userId}-${i}`))
			}),
			open && isCitizen && !mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						onClick: () => attest("fixed"),
						className: "inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "w-4 h-4" }), " I'm here, it's fixed"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						onClick: () => attest("not_fixed"),
						className: `${s.ghostButton} text-rose-500`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" }), " Still broken"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: `w-full flex items-center gap-2 text-[11px] mt-1 ${s.muted}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: demoLocation,
							onChange: (e) => setDemoLocation(e.target.checked),
							className: "accent-amber-500"
						}), "Demo mode: place me at the site instead of using my real GPS"]
					})
				]
			}),
			mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: `text-[11px] mt-4 font-semibold ${s.text}`,
				children: [
					"You attested \"",
					mine.verdict === "fixed" ? "fixed" : "still broken",
					"\". ",
					mine.eligible ? "Your vote counts." : `Not counted: ${mine.reason}.`
				]
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-[11px] mt-2 font-bold ${message.ok ? "text-emerald-500" : "text-amber-500"}`,
				children: message.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${s.inset} mt-5 p-3 text-[11px] flex gap-2`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "w-4 h-4 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: s.text,
					children: [
						status.review.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Approved by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: status.review.reviewer }),
							". ",
							status.review.note
						] }),
						status.review.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Rejected by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: status.review.reviewer }),
							". Work reopened. ",
							status.review.note
						] }),
						status.review.status === "pending" && (status.canReview ? "Waiting for a ward reviewer. It appears in the officials' Proof Review queue." : `Review opens after ${status.needed} more independent confirmation${status.needed === 1 ? "" : "s"}.`)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					!advisory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: runAdvisory,
						className: `${s.ghostButton} w-full`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500" }), " Ask Gemini to compare before/after (advisory)"]
					}),
					advisory?.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-[11px] ${s.muted}`,
						children: "Comparing photos…"
					}),
					advisory && !advisory.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${s.inset} p-3 text-[11px] space-y-1`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `font-bold flex items-center gap-1.5 ${s.heading}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }),
									" AI advisory ",
									advisory.available ? "" : "(offline fallback)"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: s.text,
								children: advisory.summary
							}),
							advisory.flags?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "text-amber-500 font-semibold",
								children: advisory.flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["⚑ ", f] }, f))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `text-[10px] mt-2 flex gap-1 ${s.muted}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3 h-3 shrink-0 mt-0.5" }), " Photos and GPS alone can't prove authenticity. They are evidence, not proof."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: `text-[10px] mt-3 flex items-center gap-1 ${s.muted}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
					" Ticket location ",
					issue.lat.toFixed(4),
					", ",
					issue.lng.toFixed(4)
				]
			})
		]
	});
}
/** "This defect came back": links a ticket to the earlier repair at the same spot. */
function RecurrenceBanner({ issue, isDarkMode }) {
	const { isOfficial } = useAuth();
	const [link, setLink] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getRecurrenceLink(issue).then((l) => !cancelled && setLink(l));
		return () => {
			cancelled = true;
		};
	}, [issue]);
	if (!link || link.decision === "dismissed") return null;
	const prev = link.previousIssue;
	const pending = link.decision === "pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border p-4 flex gap-3 items-start ${isDarkMode ? "bg-rose-950/30 border-rose-500/40 text-slate-200" : "bg-rose-50 border-rose-300 text-slate-800"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "w-5 h-5 text-rose-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-black text-rose-500",
					children: pending ? "Possible recurrence: needs review" : "Recurring defect, linked to the previous repair"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1",
					children: [
						"Repaired ",
						Math.round(link.daysSinceRepair),
						" days before this report, ",
						Math.round(link.distanceM),
						" m away:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/ticket/${prev.id}`,
							className: "font-bold underline decoration-dotted",
							children: [
								prev.id,
								": ",
								prev.title
							]
						}),
						prev.contractor ? ` (by ${prev.contractor})` : "",
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 opacity-70",
					children: pending ? `Between 60 and 150 m apart, so a reviewer decides whether it's the same defect.` : link.decision === "auto" ? "Linked automatically: same defect type within 60 m." : "Link confirmed by a reviewer."
				}),
				pending && isOfficial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => decideRecurrenceLink(issue, prev.id, true),
						className: "inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-black px-3 py-1.5 rounded-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), " Same defect"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => decideRecurrenceLink(issue, prev.id, false),
						className: "inline-flex items-center gap-1 border border-rose-500/40 font-bold px-3 py-1.5 rounded-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" }), " Unrelated"]
					})]
				})
			]
		})]
	});
}
/** Shows the mission a ticket belongs to, if any. */
function MissionLinkCard({ issue, isDarkMode }) {
	const s = surface(isDarkMode);
	const mission = getMissions().find((m) => m.issueIds.includes(issue.id));
	if (!mission) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		to: `/missions/${mission.id}`,
		className: `${s.card} p-4 flex items-center gap-3 hover:border-amber-500/60 transition`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "w-5 h-5 text-amber-500 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-[10px] uppercase tracking-wider font-bold ${s.muted}`,
						children: "Part of civic mission"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs font-black truncate ${s.heading}`,
						children: mission.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `text-[11px] ${s.muted}`,
						children: [
							mission.members.length,
							" members · ",
							mission.issueIds.length,
							" linked reports"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-slate-400" })
		]
	});
}
function TicketDetail({ isDarkMode = true }) {
	const { id } = useParams$1();
	useNavigate$1();
	const initialIssue = MOCK_ISSUES.find((item) => item.id === id) || getArchivedTicket(id) || MOCK_ISSUES[0];
	const [issue, setIssue] = (0, import_react.useState)(initialIssue);
	(0, import_react.useEffect)(() => {
		CivicAPI.getIssueById(id).then((live) => {
			const found = live || getArchivedTicket(id);
			if (found) {
				setIssue(found);
				setUpvotes(found.upvotes || 0);
			}
		});
		const handleUpdate = () => {
			CivicAPI.getIssueById(id).then((found) => {
				if (found) setIssue(found);
			});
		};
		window.addEventListener("civic-issues-updated", handleUpdate);
		return () => window.removeEventListener("civic-issues-updated", handleUpdate);
	}, [id]);
	const isResolved = (issue.status === "resolved" || issue.status === "verified") && Boolean(issue.resolvedPhotoUrl);
	const [showKarmaModal, setShowKarmaModal] = (0, import_react.useState)(false);
	const [upvotes, setUpvotes] = (0, import_react.useState)(issue.upvotes);
	const [hasUpvoted, setHasUpvoted] = (0, import_react.useState)(false);
	const [reminded, setReminded] = (0, import_react.useState)(false);
	const [commentText, setCommentText] = (0, import_react.useState)("");
	const [comments, setComments] = (0, import_react.useState)([{
		id: 1,
		author: "Sunil Mehta (Resident)",
		text: "Water was rising up to the steps of the grocery shop. Good to see immediate response.",
		time: "1 hour ago"
	}, {
		id: 2,
		author: "Ward 14 Inspector",
		text: "Inspected with ground contractor. Work order is prioritized under emergency road fund.",
		time: "35 mins ago",
		isOfficial: true
	}]);
	const handleUpvote = () => {
		if (!hasUpvoted) {
			setUpvotes((prev) => prev + 1);
			setHasUpvoted(true);
		} else {
			setUpvotes((prev) => prev - 1);
			setHasUpvoted(false);
		}
	};
	const handleConfirmFix = () => {
		setShowKarmaModal(true);
		confetti_module_default({
			particleCount: 120,
			spread: 80,
			origin: { y: .6 },
			colors: [
				"#D9982E",
				"#3C8F78",
				"#4A7BA6",
				"#C2463A",
				"#8A6A9E"
			]
		});
	};
	const handleAddComment = (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		const newComment = {
			id: Date.now(),
			author: "You (Citizen)",
			text: commentText,
			time: "Just now"
		};
		setComments([...comments, newComment]);
		setCommentText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen pb-24 transition-colors duration-300 ${isDarkMode ? "bg-ink text-slate-100" : "bg-paper text-slate-900"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `py-3.5 px-4 sm:px-6 shadow-sm border-b transition-colors ${!isDarkMode ? "bg-white border-amber-200/80 shadow-amber-950/5" : "bg-ink border-slate-800"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: "/",
						className: `inline-flex items-center gap-2 text-xs font-bold transition ${!isDarkMode ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 text-amber-500" }), " Back to Live Feed"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs font-mono font-bold px-3 py-1 rounded-xl border ${!isDarkMode ? "bg-amber-50 text-amber-900 border-amber-200" : "bg-slate-900 text-amber-400 border-amber-500/30"}`,
							children: issue.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs font-bold px-3 py-1 rounded-xl border ${isResolved ? !isDarkMode ? "text-emerald-800 bg-emerald-50 border-emerald-300" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : !isDarkMode ? "text-amber-800 bg-amber-50 border-amber-300" : "text-amber-400 bg-amber-500/10 border-amber-500/30"}`,
							children: isResolved ? "Resolved & Pending Citizen Signoff" : "Active Work Order in Progress"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto px-4 sm:px-6 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 space-y-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { duration: .4 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border ${!isDarkMode ? "bg-rose-600 text-white border-rose-600 shadow-rose-600/20" : "bg-rose-500/20 text-rose-300 border-rose-500/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${!isDarkMode ? "bg-white" : "bg-rose-400"} animate-pulse` }),
													issue.severity.toUpperCase(),
													" PRIORITY"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400",
												children: "•"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-bold px-3 py-1 rounded-full border ${!isDarkMode ? "text-amber-950 bg-amber-100 border-amber-300" : "text-amber-400 bg-amber-500/10 border-amber-500/30"}`,
												children: issue.ward
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-xs font-medium ${!isDarkMode ? "text-slate-500" : "text-slate-400"}`,
												children: ["Logged ", issue.createdAt]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: `text-2xl sm:text-4xl font-black leading-tight ${!isDarkMode ? "text-slate-900" : "text-white"}`,
										children: issue.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-xs sm:text-sm mt-2 flex items-center gap-1.5 font-medium ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-rose-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: issue.address })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecurrenceBanner, {
								issue,
								isDarkMode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between flex-wrap gap-2 px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${!isDarkMode ? "text-slate-700" : "text-slate-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }), isResolved ? "Visual Verification (Before vs After)" : "Ground Defect Inspection"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-mono px-2 py-0.5 rounded border ${!isDarkMode ? "text-amber-800 bg-amber-100 border-amber-300" : "text-amber-400 bg-amber-950/60 border-amber-800/60"}`,
										children: "GPS Authenticated"
									})]
								}), isResolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											scale: .98
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										className: `relative rounded-3xl border overflow-hidden shadow-xl group hover:border-rose-500/50 transition duration-300 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: issue.imageUrl,
													alt: "Initial Defect",
													className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-3 left-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse" }), "1. Original Defect (Before)"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-3 left-3 right-3 text-xs text-white",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-slate-300 font-mono block",
															children: "REPORTED BY"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-bold text-slate-100",
															children: [
																issue.reportedBy,
																" • ",
																issue.createdAt
															]
														})]
													})
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											scale: .98
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										className: `relative rounded-3xl border overflow-hidden shadow-xl group hover:border-emerald-500/50 transition duration-300 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: issue.resolvedPhotoUrl,
													alt: "Contractor Fix",
													className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-3 left-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), "2. Ground Fix Execution (After)"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-3 left-3 right-3 text-xs text-white",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-emerald-300 font-mono block",
															children: "EXECUTION CONTRACTOR"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-slate-100",
															children: issue.contractor || "Municipal Term Maintenance Crew"
														})]
													})
												})
											]
										})
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `relative rounded-3xl border overflow-hidden shadow-xl ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised border-slate-800"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: issue.imageUrl,
													alt: "Reported Defect Evidence",
													className: "w-full h-full object-cover"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-4 left-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-black uppercase tracking-wider bg-rose-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-white animate-pulse" }), "Reported Defect Evidence"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "absolute bottom-4 left-4 right-4 text-xs text-white flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-slate-300 font-mono block",
															children: "REPORTED BY CITIZEN"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-bold text-slate-100",
															children: [
																issue.reportedBy,
																" (",
																issue.createdAt,
																")"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-amber-500 text-slate-950 font-black px-3 py-2 rounded-xl backdrop-blur-md text-xs flex items-center gap-1.5 shadow-md",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-slate-950" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [issue.slaRemainingHours, "h SLA Deadline Active"] })]
													})]
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `rounded-3xl border p-6 shadow-xl relative overflow-hidden ${!isDarkMode ? "bg-white/90 border-amber-300 shadow-amber-950/5" : "bg-ink-raised border-amber-500/30"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-lg",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "w-6 h-6 animate-bounce" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full border ${!isDarkMode ? "bg-amber-100 text-amber-950 border-amber-300" : "bg-amber-500/20 text-amber-300 border-amber-400/40"}`,
															children: "Repairs Underway"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `text-xs font-medium ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
															children: "Post-Fix Photo Not Available Yet"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: `text-base font-extrabold ${!isDarkMode ? "text-slate-900" : "text-white"}`,
														children: "Contractor Execution in Progress"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: `text-xs mt-1.5 leading-relaxed font-normal ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
														children: [
															"The municipal department has assigned ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: !isDarkMode ? "text-slate-900" : "text-slate-200",
																children: issue.contractor
															}),
															" under the supervision of ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: !isDarkMode ? "text-slate-900" : "text-slate-200",
																children: issue.assignedOfficer
															}),
															". The official \"After-Fix\" photograph and citizen confirmation prompt will unlock here immediately once the crew uploads verified completion proof."
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: `mt-4 pt-3 border-t flex items-center justify-between flex-wrap gap-2 text-xs ${!isDarkMode ? "border-amber-100" : "border-slate-800"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: !isDarkMode ? "text-slate-700" : "text-slate-400",
															children: ["Current Stage: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
																className: !isDarkMode ? "text-amber-900 font-black" : "text-amber-400 font-extrabold",
																children: [
																	"Step ",
																	issue.timelineStep,
																	" of 4 (Work Order Active)"
																]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: () => {
																setReminded(true);
																setTimeout(() => setReminded(false), 3e3);
															},
															className: `flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl transition border shadow-xs ${!isDarkMode ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600 shadow-amber-600/20" : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reminded ? "Nodal Officer Pinged!" : "Nudge Ward Nodal Officer" })]
														})]
													})
												]
											})]
										})
									})]
								})]
							}),
							isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofOfResolutionPanel, {
								issue,
								isDarkMode,
								onAttested: handleConfirmFix
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border p-6 shadow-xl ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised/90 border-slate-800"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: `font-extrabold text-sm mb-4 flex items-center gap-2 ${!isDarkMode ? "text-slate-900" : "text-white"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Community Discussion & Ground Notes (",
											comments.length,
											")"
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 mb-6",
										children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-4 rounded-2xl border text-xs ${!isDarkMode ? "bg-slate-50 border-slate-200/80" : "bg-slate-900/70 border-slate-800"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `font-bold flex items-center gap-2 ${!isDarkMode ? "text-slate-800" : "text-slate-200"}`,
													children: [comment.author, comment.isOfficial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[10px] px-2 py-0.5 rounded font-black border ${!isDarkMode ? "bg-amber-600 text-white border-amber-700 shadow-xs" : "bg-amber-500/20 text-amber-300 border-amber-500/40"}`,
														children: "Ward Official"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-400 font-medium",
													children: comment.time
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: !isDarkMode ? "text-slate-600" : "text-slate-400",
												children: comment.text
											})]
										}, comment.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleAddComment,
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: commentText,
											onChange: (e) => setCommentText(e.target.value),
											placeholder: "Provide ground landmark or update...",
											className: `flex-1 rounded-xl px-4 py-3 text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${!isDarkMode ? "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500" : "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500"}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 shadow-md shadow-orange-600/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send" })]
										})]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationMemoryCard, {
								issue,
								isDarkMode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionLinkCard, {
								issue,
								isDarkMode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border p-5 shadow-xl space-y-3 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised/90 border-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileTap: { scale: .94 },
									onClick: handleUpvote,
									className: `w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs transition border shadow-md ${hasUpvoted ? "bg-orange-600 hover:bg-orange-700 border-amber-500 text-white shadow-orange-500/30" : !isDarkMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600 hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: `w-4 h-4 ${hasUpvoted ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"I Face This Ground Issue (",
										upvotes,
										")"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										navigator.clipboard?.writeText(window.location.href);
										alert("Ticket link copied to clipboard!");
									},
									className: `w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs border transition ${!isDarkMode ? "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share Grievance Dossier" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border p-6 shadow-xl ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised/90 border-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: `font-extrabold text-sm mb-5 flex items-center gap-2 ${!isDarkMode ? "text-slate-900" : "text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Redressal Audit Trail" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `relative pl-6 space-y-6 border-l-2 ml-2 ${!isDarkMode ? "border-amber-200" : "border-slate-800"}`,
									children: issue.timeline?.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20 shadow-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `text-xs font-black ${!isDarkMode ? "text-slate-800" : "text-white"}`,
												children: step.step
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-slate-400 font-mono mt-0.5",
												children: step.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-xs mt-1 ${!isDarkMode ? "text-slate-600" : "text-slate-400"}`,
												children: step.note
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-[10px] font-bold px-2 py-0.5 rounded-md mt-1.5 inline-block border ${!isDarkMode ? "text-amber-950 bg-amber-100 border-amber-300" : "text-amber-300 bg-amber-950/60 border-amber-800/60"}`,
												children: ["Signed: ", step.officer]
											})
										] })]
									}, idx))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border p-6 shadow-xl space-y-4 ${!isDarkMode ? "bg-white border-amber-200/90 shadow-amber-950/5" : "bg-ink-raised/90 border-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: `font-extrabold text-sm flex items-center gap-2 ${!isDarkMode ? "text-slate-900" : "text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Responsible Authority" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-medium block text-[11px]",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-bold text-xs sm:text-sm ${!isDarkMode ? "text-slate-900" : "text-white"}`,
											children: issue.department
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-medium block text-[11px]",
											children: "Assigned Engineer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-bold ${!isDarkMode ? "text-slate-800" : "text-slate-200"}`,
											children: issue.assignedOfficer || "Junior Engineer (Civil)"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-medium block text-[11px]",
											children: "Executing Contractor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-bold ${!isDarkMode ? "text-slate-800" : "text-slate-200"}`,
											children: issue.contractor || "Ward Term Maintenance Contractor"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `pt-2 border-t ${!isDarkMode ? "border-amber-100" : "border-slate-800"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 font-medium block text-[11px]",
												children: "Ward Helpline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-mono font-bold ${!isDarkMode ? "text-amber-700" : "text-amber-400"}`,
												children: "011-2338-9411"
											})]
										})
									]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showKarmaModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .8,
						y: 20
					},
					animate: {
						scale: 1,
						y: 0
					},
					exit: {
						scale: .8,
						y: 20
					},
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 350
					},
					className: `rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative border ${!isDarkMode ? "bg-white border-amber-200 shadow-amber-950/20" : "bg-ink-raised border-emerald-500/40 glow-emerald"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 animate-bounce",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-10 h-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${!isDarkMode ? "text-amber-800 bg-amber-100 border-amber-300" : "text-amber-300 bg-amber-500/20 border-amber-500/30"}`,
							children: "Citizen Karma Unlocked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: `text-2xl font-black mt-3 mb-1 ${!isDarkMode ? "text-slate-900" : "text-white"}`,
							children: "+50 Civic Karma"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-xs mb-6 leading-relaxed font-normal ${!isDarkMode ? "text-slate-600" : "text-slate-300"}`,
							children: [
								"You verified the ground repair. You are now promoted to ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-amber-600",
									children: "Ward Guardian (Tier 1)"
								}),
								" on the city leaderboard!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowKarmaModal(false),
							className: "w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-xl text-xs transition shadow-lg shadow-orange-600/30",
							children: "Continue Exploring Feed"
						})
					]
				})
			}) })
		]
	});
}
export { TicketDetail as default };
