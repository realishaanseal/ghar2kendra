import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { QueryClientProvider, require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { __exportAll } from "./server-C7mdzh8H.mjs";
// node_modules/.nitro/vite/services/ssr/assets/router-CHM-HVHO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CZYi44el.css";
var AppShell = (0, import_react.lazy)(() => import("./AppShell-VuC9Rp71.mjs"));
function NotFoundComponent() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		router.navigate({
			to: "/",
			replace: true
		});
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Ghar2Kendra — Citizen to Governance Portal" },
			{
				name: "description",
				content: "Report civic issues and track them from home to the government office."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png",
				sizes: "64x64"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var noopSubscribe = () => () => {};
function ClientShell({ children }) {
	if (!(0, import_react.useSyncExternalStore)(noopSubscribe, () => true, () => false)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-background" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-background" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children })
	});
}
var Page$12 = lazyRouteComponent(() => Promise.all([import("./HomePage-D5ElAD0j.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$12 = () => import("./routes-BwmRKzjk.mjs");
var Route$17 = createFileRoute("/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ghar2Kendra — Citizen to Governance Portal" },
		{
			name: "description",
			content: "Report civic issues in your ward and track them from your home to the government office."
		},
		{
			property: "og:title",
			content: "Ghar2Kendra — Citizen to Governance Portal"
		},
		{
			property: "og:description",
			content: "Report civic issues in your ward and track them from your home to the government office."
		}
	] }),
	loader: () => Page$12.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var Page$11 = lazyRouteComponent(() => Promise.all([import("./AdminDashboard-X7CpjUeN.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$11 = () => import("./admin-DLl_mNfB.mjs");
var Route$16 = createFileRoute("/admin")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Officials Dashboard — Ghar2Kendra" },
		{
			name: "description",
			content: "Triage, assign and resolve civic grievances in your jurisdiction."
		},
		{
			property: "og:title",
			content: "Officials Dashboard — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Triage, assign and resolve civic grievances in your jurisdiction."
		}
	] }),
	loader: () => Page$11.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var Page$10 = lazyRouteComponent(() => Promise.all([import("./InsightsPage-C569YLIZ.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$10 = () => import("./insights-QChXledp.mjs");
var Route$15 = createFileRoute("/insights")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Civic Intelligence — Ghar2Kendra" },
		{
			name: "description",
			content: "Infrastructure patterns detected across separate civic complaints, with the evidence behind each."
		},
		{
			property: "og:title",
			content: "Civic Intelligence — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Infrastructure patterns detected across separate civic complaints, with the evidence behind each."
		}
	] }),
	loader: () => Page$10.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var Page$9 = lazyRouteComponent(() => Promise.all([import("./LoginPage-CpERujd9.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$9 = () => import("./login-zTnWksXC.mjs");
var Route$14 = createFileRoute("/login")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Sign in — Ghar2Kendra" },
		{
			name: "description",
			content: "Sign in as a citizen or an official to Ghar2Kendra."
		},
		{
			property: "og:title",
			content: "Sign in — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Sign in as a citizen or an official to Ghar2Kendra."
		}
	] }),
	loader: () => Page$9.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Page$8 = lazyRouteComponent(() => Promise.all([import("./RadarPage-CizSpgIV.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$8 = () => import("./radar-C3aDg_LR.mjs");
var Route$13 = createFileRoute("/radar")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Neighborhood Radar — Ghar2Kendra" },
		{
			name: "description",
			content: "Follow your road, college, market or commute and see only the civic issues that matter there."
		},
		{
			property: "og:title",
			content: "Neighborhood Radar — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Follow your road, college, market or commute and see only the civic issues that matter there."
		}
	] }),
	loader: () => Page$8.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var Page$7 = lazyRouteComponent(() => Promise.all([import("./ReportPage-CUu-5bhK.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$7 = () => import("./report-BCI8XjhH.mjs");
var Route$12 = createFileRoute("/report")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Report an Issue — Ghar2Kendra" },
		{
			name: "description",
			content: "Snap a photo, pin the location and file a civic grievance with your local body."
		},
		{
			property: "og:title",
			content: "Report an Issue — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Snap a photo, pin the location and file a civic grievance with your local body."
		}
	] }),
	loader: () => Page$7.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
var MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
var isGeminiConfigured = () => Boolean(process.env["GEMINI_API_KEY"]);
/** Ask Gemini for JSON, trying each model in turn. Returns null when AI is unavailable. */
async function generateJson(parts) {
	const apiKey = process.env["GEMINI_API_KEY"];
	if (!apiKey) return null;
	for (const model of MODELS) try {
		const response = await fetch(`${API_BASE}/${model}:generateContent`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-goog-api-key": apiKey
			},
			body: JSON.stringify({
				contents: [{
					role: "user",
					parts
				}],
				generationConfig: { responseMimeType: "application/json" }
			}),
			signal: AbortSignal.timeout(25e3)
		});
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const text = (await response.json()).candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("");
		if (text) return JSON.parse(text);
	} catch (err) {
		console.warn(`Gemini model ${model} unavailable: ${err.message}`);
	}
	return null;
}
var json = (data, status = 200) => Response.json(data, { status });
async function readJsonBody(request) {
	try {
		return await request.json();
	} catch {
		return null;
	}
}
var PROMPT = `
You are an expert AI municipal inspector for the Indian civic governance platform Ghar2Kendra (घर से केंद्र तक).
Analyze this photo carefully.
Return valid JSON with these exact fields:
category: one of ["waste", "roads", "water", "electricity", "safety", "other"]
  - If garbage dump, unsegregated trash, plastic waste, or overflowing bin: "waste"
  - If pothole, broken asphalt, damaged footpath, or road crater: "roads"
  - If pipeline burst, open drain, sewer overflow, or waterlogging: "water"
  - If hanging loose wires, open transformer, or dark streetlights: "electricity"
  - If open manhole, fallen tree, structural collapse risk: "safety"
urgency: one of ["critical", "high", "medium", "low"]
  - Live electric wires or deep crater on busy road: "critical"
  - Overflowing garbage blocking sidewalk or contaminated water burst: "high"
  - Moderate pothole or uncollected dustbin: "medium"
  - Minor cosmetic defect or minor curb scratch: "low"
title: a concise 5 to 9 word issue title describing the exact defect in English
details: a 2 to 3 sentence technical description of what is visible, the extent of the defect, and the risk to pedestrians or public health
confidence: a number between 0 and 1
`;
var FALLBACK = {
	category: "roads",
	urgency: "high",
	title: "Severe road surface damage and asphalt crater",
	details: "Visible asphalt depression and loose aggregate gravel creating an immediate hazard for passing vehicles.",
	confidence: .6,
	fallback: true
};
var Route$11 = createFileRoute("/api/analyze-image")({ server: { handlers: { POST: async ({ request }) => {
	const image = (await request.formData().catch(() => null))?.get("image");
	if (!image || typeof image === "string") return json({ error: "Choose an image to upload." }, 400);
	if (image.size > 4194304) return json({ error: "Image is too large. Please upload a photo under 4 MB." }, 413);
	const data = Buffer.from(await image.arrayBuffer()).toString("base64");
	return json(await generateJson([{ inlineData: {
		mimeType: image.type || "image/jpeg",
		data
	} }, { text: PROMPT }]) ?? FALLBACK);
} } } });
/** Only public HTTPS hostnames; never localhost, internal names or IP literals. */
function isSafeImageUrl(value) {
	if (typeof value !== "string") return false;
	try {
		const url = new URL(value);
		const host = url.hostname;
		if (url.protocol !== "https:") return false;
		if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
		if (/^[\d.]+$/.test(host) || host.includes(":")) return false;
		return true;
	} catch {
		return false;
	}
}
async function fetchImageInline(url) {
	const response = await fetch(url, { signal: AbortSignal.timeout(8e3) });
	if (!response.ok) throw new Error(`Image fetch responded with ${response.status}`);
	const mimeType = response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
	if (!mimeType.startsWith("image/")) throw new Error("URL is not an image");
	const buffer = Buffer.from(await response.arrayBuffer());
	if (buffer.length > 8388608) throw new Error("Image too large");
	return { inlineData: {
		mimeType,
		data: buffer.toString("base64")
	} };
}
var Route$10 = createFileRoute("/api/compare-proof")({ server: { handlers: { POST: async ({ request }) => {
	const body = await readJsonBody(request);
	if (!body || !isSafeImageUrl(body.beforeUrl) || !isSafeImageUrl(body.afterUrl)) return json({ error: "Provide public https beforeUrl and afterUrl." }, 400);
	const category = typeof body.category === "string" ? body.category : "civic";
	try {
		const [before, after] = await Promise.all([fetchImageInline(body.beforeUrl), fetchImageInline(body.afterUrl)]);
		const verdict = await generateJson([
			before,
			after,
			{ text: `You assist a human reviewer checking a municipal ${category} repair in India.
The first image is the reported defect, the second is the contractor's "after" photo.
You cannot prove anything; only point out what a reviewer should double-check.
Return JSON with exactly these fields:
sameLocationLikely: boolean (do landmarks, kerbs, walls or road markings match?)
defectResolvedLikely: boolean (is the reported defect no longer visible?)
summary: one or two plain sentences for the reviewer
flags: array of short strings naming concerns (e.g. "different kerb pattern", "stock photo look", "defect partly visible"), empty if none` }
		]);
		if (!verdict) return json({ error: "AI comparison unavailable." }, 503);
		return json({
			sameLocationLikely: Boolean(verdict.sameLocationLikely),
			defectResolvedLikely: Boolean(verdict.defectResolvedLikely),
			summary: String(verdict.summary ?? ""),
			flags: Array.isArray(verdict.flags) ? verdict.flags.map(String).slice(0, 6) : []
		});
	} catch (error) {
		console.error("Proof comparison error:", error.message);
		return json({ error: "Could not compare the photos." }, 502);
	}
} } } });
var Route$9 = createFileRoute("/api/explain-pattern")({ server: { handlers: { POST: async ({ request }) => {
	const body = await readJsonBody(request);
	if (!body || typeof body.title !== "string" || !Array.isArray(body.issues) || body.issues.length === 0) return json({ error: "Provide a pattern title and its evidence issues." }, 400);
	const evidence = body.issues.slice(0, 12).map((i, n) => `${n + 1}. [${i.category}] ${i.title} | ${i.address} | ${i.status} | reported ${i.reported}`).join("\n");
	const answer = await generateJson([{ text: `You help Indian municipal engineers read civic grievance data.
A rule engine flagged this pattern: "${body.title}".
Its working hypothesis: ${String(body.hypothesis ?? "")}
Evidence tickets:
${evidence}

Return JSON with exactly these fields:
explanation: 2 to 3 plain sentences on why these tickets may share a cause, citing ticket numbers
checks: array of 2 to 4 concrete on-site checks an engineer should do to confirm or rule it out
caveats: one sentence on what could make this a coincidence` }]);
	if (!answer) return json({ error: "AI explanation unavailable." }, 503);
	return json({
		explanation: String(answer.explanation ?? ""),
		checks: Array.isArray(answer.checks) ? answer.checks.map(String).slice(0, 4) : [],
		caveats: String(answer.caveats ?? "")
	});
} } } });
var Route$8 = createFileRoute("/api/health")({ server: { handlers: { GET: () => json({
	ok: true,
	ai: isGeminiConfigured(),
	timestamp: (/* @__PURE__ */ new Date()).toISOString()
}) } } });
function parseCoordinates(lat, lon) {
	const latitude = Number(lat);
	const longitude = Number(lon);
	return lat !== null && lon !== null && Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 ? {
		latitude,
		longitude
	} : null;
}
async function reverseGeocode(latitude, longitude) {
	const url = new URL("https://nominatim.openstreetmap.org/reverse");
	url.searchParams.set("lat", String(latitude));
	url.searchParams.set("lon", String(longitude));
	url.searchParams.set("format", "jsonv2");
	const response = await fetch(url, {
		headers: { "User-Agent": "Ghar2Kendra/0.5 (civic grievance platform)" },
		signal: AbortSignal.timeout(8e3)
	});
	if (!response.ok) throw new Error(`Geocoder responded with ${response.status}`);
	return {
		address: (await response.json()).display_name ?? null,
		latitude,
		longitude,
		attribution: "© OpenStreetMap contributors"
	};
}
var Route$7 = createFileRoute("/api/reverse-geocode")({ server: { handlers: { GET: async ({ request }) => {
	const params = new URL(request.url).searchParams;
	const coords = parseCoordinates(params.get("lat"), params.get("lon"));
	if (!coords) return json({ error: "Provide valid lat and lon values." }, 400);
	try {
		return json(await reverseGeocode(coords.latitude, coords.longitude));
	} catch (error) {
		console.error("Geocoding error:", error);
		return json({ error: "The location could not be looked up." }, 502);
	}
} } } });
var Page$6 = lazyRouteComponent(() => Promise.all([import("./MemoryIndexPage-CTFd5OAF.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$6 = () => import("./memory.index-D1lco3TW.mjs");
var Route$6 = createFileRoute("/memory/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Civic Memory — Ghar2Kendra" },
		{
			name: "description",
			content: "The full repair history of every road, drain and transformer in your ward."
		},
		{
			property: "og:title",
			content: "Civic Memory — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "The full repair history of every road, drain and transformer in your ward."
		}
	] }),
	loader: () => Page$6.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var Page$5 = lazyRouteComponent(() => Promise.all([import("./AssetMemoryPage-Dhriy7Ye.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$5 = () => import("./memory._assetId-Cev51Jfr.mjs");
var Route$5 = createFileRoute("/memory/$assetId")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Asset History — Ghar2Kendra" },
		{
			name: "description",
			content: "Reports, repairs, verifications and recurrence for one piece of public infrastructure."
		},
		{
			property: "og:title",
			content: "Asset History — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Reports, repairs, verifications and recurrence for one piece of public infrastructure."
		}
	] }),
	loader: () => Page$5.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var Page$4 = lazyRouteComponent(() => Promise.all([import("./MissionsPage-BdUPOQlo.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$4 = () => import("./missions.index-CfxEmRaS.mjs");
var Route$4 = createFileRoute("/missions/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Civic Missions — Ghar2Kendra" },
		{
			name: "description",
			content: "Turn many reports of one problem into one coordinated, public project."
		},
		{
			property: "og:title",
			content: "Civic Missions — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Turn many reports of one problem into one coordinated, public project."
		}
	] }),
	loader: () => Page$4.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var Page$3 = lazyRouteComponent(() => Promise.all([import("./MissionDetailPage-gU_4tbuU.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$3 = () => import("./missions._id-PxLTYbmP.mjs");
var Route$3 = createFileRoute("/missions/$id")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Mission — Ghar2Kendra" },
		{
			name: "description",
			content: "Evidence, authorities, coordinator, reminders and public progress for a civic mission."
		},
		{
			property: "og:title",
			content: "Mission — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Evidence, authorities, coordinator, reminders and public progress for a civic mission."
		}
	] }),
	loader: () => Page$3.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var Page$2 = lazyRouteComponent(() => Promise.all([import("./TicketDetail-06Oytl3e.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$2 = () => import("./ticket._id-CFZuyLko.mjs");
var Route$2 = createFileRoute("/ticket/$id")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ticket — Ghar2Kendra" },
		{
			name: "description",
			content: "Track the status and timeline of a civic grievance."
		},
		{
			property: "og:title",
			content: "Ticket — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Track the status and timeline of a civic grievance."
		}
	] }),
	loader: () => Page$2.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Page$1 = lazyRouteComponent(() => Promise.all([import("./WorkspacesPage-cloY6OsN.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter$1 = () => import("./workspaces.index-DRj4uEvj.mjs");
var Route$1 = createFileRoute("/workspaces/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "G2K Workspaces — Ghar2Kendra" },
		{
			name: "description",
			content: "Operations workspaces for colleges, residents' associations, NGOs and municipal offices."
		},
		{
			property: "og:title",
			content: "G2K Workspaces — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Operations workspaces for colleges, residents' associations, NGOs and municipal offices."
		}
	] }),
	loader: () => Page$1.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Page = lazyRouteComponent(() => Promise.all([import("./WorkspaceDetailPage-DTF3Yqnz.mjs"), import("./withTheme-BdzoGuhK.mjs")]).then(([p, t]) => ({ default: t.withTheme(p.default) })));
var $$splitComponentImporter = () => import("./workspaces._id-Drp8a_gM.mjs");
var Route = createFileRoute("/workspaces/$id")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Workspace — Ghar2Kendra" },
		{
			name: "description",
			content: "Issue assignment, staff, maintenance history and analytics for an organisation."
		},
		{
			property: "og:title",
			content: "Workspace — Ghar2Kendra"
		},
		{
			property: "og:description",
			content: "Issue assignment, staff, maintenance history and analytics for an organisation."
		}
	] }),
	loader: () => Page.preload?.(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AdminRoute = Route$16.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$18
});
var InsightsRoute = Route$15.update({
	id: "/insights",
	path: "/insights",
	getParentRoute: () => Route$18
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$18
});
var RadarRoute = Route$13.update({
	id: "/radar",
	path: "/radar",
	getParentRoute: () => Route$18
});
var ReportRoute = Route$12.update({
	id: "/report",
	path: "/report",
	getParentRoute: () => Route$18
});
var ApiAnalyzeImageRoute = Route$11.update({
	id: "/api/analyze-image",
	path: "/api/analyze-image",
	getParentRoute: () => Route$18
});
var ApiCompareProofRoute = Route$10.update({
	id: "/api/compare-proof",
	path: "/api/compare-proof",
	getParentRoute: () => Route$18
});
var ApiExplainPatternRoute = Route$9.update({
	id: "/api/explain-pattern",
	path: "/api/explain-pattern",
	getParentRoute: () => Route$18
});
var ApiHealthRoute = Route$8.update({
	id: "/api/health",
	path: "/api/health",
	getParentRoute: () => Route$18
});
var ApiReverseGeocodeRoute = Route$7.update({
	id: "/api/reverse-geocode",
	path: "/api/reverse-geocode",
	getParentRoute: () => Route$18
});
var MemoryIndexRoute = Route$6.update({
	id: "/memory/",
	path: "/memory/",
	getParentRoute: () => Route$18
});
var MemoryAssetIdRoute = Route$5.update({
	id: "/memory/$assetId",
	path: "/memory/$assetId",
	getParentRoute: () => Route$18
});
var MissionsIndexRoute = Route$4.update({
	id: "/missions/",
	path: "/missions/",
	getParentRoute: () => Route$18
});
var MissionsIdRoute = Route$3.update({
	id: "/missions/$id",
	path: "/missions/$id",
	getParentRoute: () => Route$18
});
var TicketIdRoute = Route$2.update({
	id: "/ticket/$id",
	path: "/ticket/$id",
	getParentRoute: () => Route$18
});
var WorkspacesIndexRoute = Route$1.update({
	id: "/workspaces/",
	path: "/workspaces/",
	getParentRoute: () => Route$18
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	InsightsRoute,
	LoginRoute,
	RadarRoute,
	ReportRoute,
	ApiAnalyzeImageRoute,
	ApiCompareProofRoute,
	ApiExplainPatternRoute,
	ApiHealthRoute,
	ApiReverseGeocodeRoute,
	MemoryAssetIdRoute,
	MissionsIdRoute,
	TicketIdRoute,
	WorkspacesIdRoute: Route.update({
		id: "/workspaces/$id",
		path: "/workspaces/$id",
		getParentRoute: () => Route$18
	}),
	MemoryIndexRoute,
	MissionsIndexRoute,
	WorkspacesIndexRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
export { Page, Page$1, Page$10, Page$11, Page$12, Page$2, Page$3, Page$4, Page$5, Page$6, Page$7, Page$8, Page$9, router_exports };
