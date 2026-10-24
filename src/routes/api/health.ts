import { createFileRoute } from "@tanstack/react-router";

import { isGeminiConfigured } from "@/server/gemini";
import { json } from "@/server/http";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: () => json({ ok: true, ai: isGeminiConfigured(), timestamp: new Date().toISOString() }),
    },
  },
});
