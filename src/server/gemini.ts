// Gemini access for the /api routes, over the public REST API (no SDK needed).
// Server-only: the key is read from process.env and never reaches the browser.

const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

export type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };

type GenerateResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

export const isGeminiConfigured = () => Boolean(process.env["GEMINI_API_KEY"]);

/** Ask Gemini for JSON, trying each model in turn. Returns null when AI is unavailable. */
export async function generateJson<T>(parts: GeminiPart[]): Promise<T | null> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) return null;
  for (const model of MODELS) {
    try {
      const response = await fetch(`${API_BASE}/${model}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: { responseMimeType: "application/json" },
        }),
        signal: AbortSignal.timeout(25_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as GenerateResponse;
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("");
      if (text) return JSON.parse(text) as T;
    } catch (err) {
      console.warn(`Gemini model ${model} unavailable: ${(err as Error).message}`);
    }
  }
  return null;
}
