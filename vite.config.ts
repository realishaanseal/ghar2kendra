import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

// Server-only secrets (no VITE_ prefix) are read by the /api routes through process.env.
// On Vercel they come from Project Settings → Environment Variables; for `npm run dev`
// we load them from a local .env file.
const localEnv = loadEnv("development", process.cwd(), "");
for (const key of ["GEMINI_API_KEY"]) {
  if (!process.env[key] && localEnv[key]) process.env[key] = localEnv[key];
}

export default defineConfig(({ command }) => ({
  server: { port: 8080 },
  // "@/…" imports point at src/ (mirrors the paths entry in tsconfig.json).
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  plugins: [
    tailwindcss(),
    // src/server.ts wraps TanStack Start's server entry with an SSR error page.
    tanstackStart({ server: { entry: "server" } }),
    // Default deploy target: Vercel. The build writes .vercel/output (Build Output API): static
    // assets plus one function that serves SSR and the /api routes. `npm run build:node` sets
    // NITRO_PRESET=node-server instead, for hosts that run a plain Node.js process.
    nitro({
      // Vercel output for builds unless NITRO_PRESET says otherwise; plain local server for `npm run dev`.
      ...(command === "build" ? { preset: process.env["NITRO_PRESET"] || "vercel" } : {}),
      // Bundle every dependency into the function: self-contained, nothing to trace at deploy time.
      noExternals: true,
      rolldownConfig: {
        onLog(level, log, handler) {
          // React Query's "use client" markers only matter to RSC bundlers, and the group-name
          // hint refers to Nitro's internal chunking config; neither is actionable here.
          if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
          if (log.code === "MISSING_CODE_SPLITTING_GROUP_DEBUG_NAME") return;
          handler(level, log);
        },
      },
    }),
    viteReact(),
  ],
}));
