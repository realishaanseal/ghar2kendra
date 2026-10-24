# Deploying v0.5 to Vercel

The whole app (pages and `/api` routes) is one TanStack Start project. `npm run build` is pinned to Nitro's `vercel` preset (see `vite.config.ts`) and writes `.vercel/output` in Vercel's Build Output API format: static assets plus one Node.js 22 function that serves server rendering and every `/api/*` route. You don't need a separate backend, CORS setup or rewrites.

## One-time setup

1. **Import the repo:** Vercel dashboard → *Add New… → Project* → pick this GitHub repo.
   - Root directory: the repo root (leave as is).
   - Framework preset: auto-detected (TanStack Start). If it shows *Other*, that's fine: the build writes `.vercel/output`, which Vercel uses directly.
   - Build command: `npm run build`. Install command: `npm install`. Leave the output directory empty.
2. **Environment variables** (*Project Settings → Environment Variables*, for Production and Preview):

   | Name | Required | Notes |
   | --- | --- | --- |
   | `GEMINI_API_KEY` | recommended | Server-only. Without it, AI triage and advisory features fall back to safe defaults. |
   | `VITE_SUPABASE_URL` | optional | Build-time. Without it the app uses its seeded local demo store. |
   | `VITE_SUPABASE_ANON_KEY` | optional | Build-time, public anon key only. |

   `VITE_*` values are baked in at build time, so redeploy after changing them.
3. **Deploy.** Every push to `main` deploys to production, and every PR gets a preview URL.

## Release v0.5

```bash
git checkout main && git pull
npm install && npm test && npm run build
git tag -a v0.5.0 -m "Ghar2Kendra v0.5.0"
git push origin v0.5.0
```

## Smoke test after deploy

```bash
curl https://YOUR-APP.vercel.app/api/health   # {"ok":true,"ai":true,...}
```

Then open `/admin`, click **Reset demo data**, and follow `docs/DEMO.md`.

## Plain Node.js hosts (SDSLabs portal, VPS, etc.)

The same app also builds as a standalone Node.js server, for hosts that run one long-lived process instead of Vercel Functions:

```bash
npm install
npm run build:node   # writes .output/ (Nitro node-server preset)
npm start            # node .output/server/index.mjs
```

- **Stack:** Node.js 22.13+ (Vite 8 needs a recent Node to build; the built server is self-contained and needs no `node_modules`).
- **Port:** the server listens on `PORT` (default 3000) and `HOST` (default all interfaces). Set `PORT` to whatever the host expects.
- **Environment:** same variables as above. `GEMINI_API_KEY` is read at runtime; `VITE_*` values must be set before `npm run build:node`.
- One process serves the pages, static assets and every `/api/*` route, so it counts as a single web app.

## Limits to know

- **Upload size:** Vercel Functions accept request bodies up to 4.5 MB. The browser downsizes photos to 1600 px JPEG before upload, and the API rejects anything over 4 MB.
- **Function duration:** Gemini calls usually take a few seconds, well within the default limit. If you see timeouts, raise the function duration in *Project Settings → Functions*.
- **Nominatim:** fine for demos. For real traffic, use a commercial geocoder or self-host Nominatim (their usage policy limits request rates).
- **Local preview of the production build:** use the Vercel CLI (`vercel build && vercel dev` or `vercel deploy --prebuilt`). `npm run dev` is the normal local workflow.
