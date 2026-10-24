import { createFileRoute } from "@tanstack/react-router";

import { generateJson } from "@/server/gemini";
import { json, readJsonBody } from "@/server/http";
import { fetchImageInline, isSafeImageUrl } from "@/server/images";

type Body = { beforeUrl?: unknown; afterUrl?: unknown; category?: unknown };
type Verdict = {
  sameLocationLikely?: unknown;
  defectResolvedLikely?: unknown;
  summary?: unknown;
  flags?: unknown;
};

// Proof-of-Resolution: does the after-photo plausibly show the same spot, fixed?
// Advisory only: it flags things for the human reviewer and never closes a ticket.
export const Route = createFileRoute("/api/compare-proof")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await readJsonBody<Body>(request);
        if (!body || !isSafeImageUrl(body.beforeUrl) || !isSafeImageUrl(body.afterUrl)) {
          return json({ error: "Provide public https beforeUrl and afterUrl." }, 400);
        }
        const category = typeof body.category === "string" ? body.category : "civic";
        try {
          const [before, after] = await Promise.all([
            fetchImageInline(body.beforeUrl),
            fetchImageInline(body.afterUrl),
          ]);
          const verdict = await generateJson<Verdict>([
            before,
            after,
            {
              text: `You assist a human reviewer checking a municipal ${category} repair in India.
The first image is the reported defect, the second is the contractor's "after" photo.
You cannot prove anything; only point out what a reviewer should double-check.
Return JSON with exactly these fields:
sameLocationLikely: boolean (do landmarks, kerbs, walls or road markings match?)
defectResolvedLikely: boolean (is the reported defect no longer visible?)
summary: one or two plain sentences for the reviewer
flags: array of short strings naming concerns (e.g. "different kerb pattern", "stock photo look", "defect partly visible"), empty if none`,
            },
          ]);
          if (!verdict) return json({ error: "AI comparison unavailable." }, 503);
          return json({
            sameLocationLikely: Boolean(verdict.sameLocationLikely),
            defectResolvedLikely: Boolean(verdict.defectResolvedLikely),
            summary: String(verdict.summary ?? ""),
            flags: Array.isArray(verdict.flags) ? verdict.flags.map(String).slice(0, 6) : [],
          });
        } catch (error) {
          console.error("Proof comparison error:", (error as Error).message);
          return json({ error: "Could not compare the photos." }, 502);
        }
      },
    },
  },
});
