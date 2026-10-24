import { createFileRoute } from "@tanstack/react-router";

import { generateJson } from "@/server/gemini";
import { json, MAX_UPLOAD_BYTES } from "@/server/http";

const PROMPT = `
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

// Used when Gemini is not configured or busy, so the report flow never dead-ends.
const FALLBACK = {
  category: "roads",
  urgency: "high",
  title: "Severe road surface damage and asphalt crater",
  details:
    "Visible asphalt depression and loose aggregate gravel creating an immediate hazard for passing vehicles.",
  confidence: 0.6,
  fallback: true,
};

export const Route = createFileRoute("/api/analyze-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const form = await request.formData().catch(() => null);
        const image = form?.get("image");
        if (!image || typeof image === "string") {
          return json({ error: "Choose an image to upload." }, 400);
        }
        if (image.size > MAX_UPLOAD_BYTES) {
          return json({ error: "Image is too large. Please upload a photo under 4 MB." }, 413);
        }
        const data = Buffer.from(await image.arrayBuffer()).toString("base64");
        const analysis = await generateJson<Record<string, unknown>>([
          { inlineData: { mimeType: image.type || "image/jpeg", data } },
          { text: PROMPT },
        ]);
        return json(analysis ?? FALLBACK);
      },
    },
  },
});
