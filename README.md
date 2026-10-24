# Ghar2Kendra (घर से केंद्र तक)

Civic grievance platform that connects citizens, from their doorstep (*ghar*), to the municipal corporations and gram panchayats (*kendra*) responsible for fixing things. It also remembers what happened: every repair, every recurrence, and whether residents agree the fix is real.

**v0.5.0**: one full-stack TanStack Start app (React pages + `/api` server routes), built for Vercel.

## What it does

**Core loop**
- **AI photo reporting** (`/report`): Gemini Vision classifies the defect, estimates urgency and drafts the title. Photos are compressed in the browser before upload. GPS is reverse-geocoded through OpenStreetMap Nominatim.
- **Live feed and map** (`/`): ward-level grievance feed with category filters and a Leaflet map.
- **Officials' command dashboard** (`/admin`): triage, contractor dispatch, a fast-forward SLA clock for demos, and resolution with after-photo evidence.
- **Ticket page** (`/ticket/:id`): before/after evidence, audit trail and community discussion.

**Civic modules**

| Module | Route | What it adds |
| --- | --- | --- |
| Civic Memory Engine | `/memory`, `/memory/:assetId` | Issues attach to physical assets (a road stretch, a drain, a transformer). Each asset keeps reports, repairs, verifications, recurrence count, average repair life and a 0–100 reliability score. |
| Proof-of-Resolution | ticket page + admin "Proof Review" | A fix is verified only when 3 independent residents within 250 m attest **and** a reviewer approves. The reporter, contractors and officials can't vote. A defect that reappears is linked to its previous repair: automatically within 60 m, by a reviewer up to 150 m. Gemini compares before/after photos as an advisory only. |
| Civic Intelligence Graph | `/insights` | Explainable rules find patterns across separate tickets: waterlogging + blocked drains (one drainage cause), dark spots (dead lights + physical hazards), water undermining roads, and assets whose repairs keep failing. Every pattern lists its evidence tickets; Gemini can explain it and suggest on-site checks. |
| Civic Missions | `/missions`, `/missions/:id` | Clusters of same-cause reports become a mission with evidence, responsible authorities, a coordinator, follow-up reminders, a public timeline and a petition drafted from the evidence. |
| Neighborhood Impact Radar | `/radar` | Follow your road, college, market or route. You get a relevance-ranked feed (accessibility obstructions, recurring defects, hazards, newly verified repairs), proximity alerts and a hazard check on a straight-line route corridor. |
| G2K Workspaces | `/workspaces`, `/workspaces/:id` | Operations view for colleges, residents' associations, NGOs and municipal offices: geofenced queue, staff assignment, resolution with evidence (which then goes through Proof-of-Resolution), maintenance history and analytics. |

## Project layout

```
src/app/engine/     Pure domain logic (memory, proof, missions, radar, workspaces, patterns), unit-tested
src/app/api/        Client data access: Supabase RPC when configured, local demo store otherwise
src/app/pages/      Pages; src/routes/*.tsx wires them to TanStack file routes
src/routes/api/     Server API routes (run as a Vercel Function in production)
src/server/         Server-only helpers: Gemini REST client, geocoding, image fetching
src/test/           Vitest suites
docs/               Deployment guide and demo script
```

## Getting started

Requires Node.js 22.13+ (Vercel builds on Node 22).

```bash
cp .env.example .env   # optional: add GEMINI_API_KEY (AI features fall back without it)
npm install
npm run dev            # http://localhost:8080 (pages and /api together)
npm test
npm run lint
npm run typecheck
npm run build          # writes .vercel/output (Vercel Build Output API)
```

The app ships with seeded demo data stored in the browser, so every flow works without Supabase. **Admin → Reset demo data** restores the seed for every module.

## API routes

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/analyze-image` | multipart `image` (≤ 4 MB) → `{category, urgency, title, details, confidence}` |
| GET | `/api/reverse-geocode?lat=&lon=` | address via Nominatim |
| POST | `/api/compare-proof` | `{beforeUrl, afterUrl, category}` → advisory `{sameLocationLikely, defectResolvedLikely, summary, flags}` |
| POST | `/api/explain-pattern` | `{title, hypothesis, issues[]}` → `{explanation, checks, caveats}` |
| GET | `/api/health` | liveness, and whether AI is configured |

## Honest limits

- **Memory:** history tracking is reliable. The "outlook" is the average life of past repairs, not a prediction.
- **Proof:** photos and GPS can be faked. That's why closure needs independent attestations plus a human reviewer, and the AI comparison is advisory.
- **Radar:** the route check uses a straight-line corridor. Real hazard-aware routing needs a routing engine (OSRM / GraphHopper) and enough verified data.
- **Workspaces:** the software is the easy part. The hard part is getting organisations to commit staff, so start with one pilot.
- **Demo data** lives in each browser's localStorage until Supabase is connected, so two visitors don't see each other's changes.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) to put v0.5 on Vercel and [`docs/DEMO.md`](docs/DEMO.md) for a 5-minute walkthrough.
