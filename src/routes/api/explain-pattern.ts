import { createFileRoute } from "@tanstack/react-router";

import { generateJson } from "@/server/gemini";
import { json, readJsonBody } from "@/server/http";

type EvidenceIssue = {
  title?: string;
  category?: string;
  address?: string;
  status?: string;
  reported?: string;
};
type Body = { title?: unknown; hypothesis?: unknown; issues?: unknown };
type Answer = { explanation?: unknown; checks?: unknown; caveats?: unknown };

// Civic Intelligence Graph: explain a detected pattern in plain language for officials.
export const Route = createFileRoute("/api/explain-pattern")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await readJsonBody<Body>(request);
        if (
          !body ||
          typeof body.title !== "string" ||
          !Array.isArray(body.issues) ||
          body.issues.length === 0
        ) {
          return json({ error: "Provide a pattern title and its evidence issues." }, 400);
        }
        const evidence = (body.issues as EvidenceIssue[])
          .slice(0, 12)
          .map(
            (i, n) =>
              `${n + 1}. [${i.category}] ${i.title} | ${i.address} | ${i.status} | reported ${i.reported}`,
          )
          .join("\n");
        const answer = await generateJson<Answer>([
          {
            text: `You help Indian municipal engineers read civic grievance data.
A rule engine flagged this pattern: "${body.title}".
Its working hypothesis: ${String(body.hypothesis ?? "")}
Evidence tickets:
${evidence}

Return JSON with exactly these fields:
explanation: 2 to 3 plain sentences on why these tickets may share a cause, citing ticket numbers
checks: array of 2 to 4 concrete on-site checks an engineer should do to confirm or rule it out
caveats: one sentence on what could make this a coincidence`,
          },
        ]);
        if (!answer) return json({ error: "AI explanation unavailable." }, 503);
        return json({
          explanation: String(answer.explanation ?? ""),
          checks: Array.isArray(answer.checks) ? answer.checks.map(String).slice(0, 4) : [],
          caveats: String(answer.caveats ?? ""),
        });
      },
    },
  },
});
