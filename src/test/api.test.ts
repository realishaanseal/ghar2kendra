// @vitest-environment node
import { describe, expect, it } from "vitest";

import { parseCoordinates } from "@/server/geocode";
import { Route as AnalyzeRoute } from "@/routes/api/analyze-image";
import { Route as GeocodeRoute } from "@/routes/api/reverse-geocode";
import { Route as HealthRoute } from "@/routes/api/health";

type Handler = (ctx: { request: Request }) => Promise<Response> | Response;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (route: any, method: string): Handler => route.options.server.handlers[method];

// The analyze route must fall back cleanly without a key, so make sure none leaks in from the shell.
delete process.env["GEMINI_API_KEY"];

describe("parseCoordinates", () => {
  it("accepts valid coordinates and rejects everything else", () => {
    expect(parseCoordinates("28.61", "77.2")).toEqual({ latitude: 28.61, longitude: 77.2 });
    expect(parseCoordinates("91", "77")).toBeNull();
    expect(parseCoordinates("abc", "77")).toBeNull();
    expect(parseCoordinates(null, "77")).toBeNull();
  });
});

describe("/api routes", () => {
  it("reports health", async () => {
    const res = await handler(HealthRoute, "GET")({ request: new Request("http://x/api/health") });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true });
  });

  it("rejects bad coordinates", async () => {
    const res = await handler(
      GeocodeRoute,
      "GET",
    )({
      request: new Request("http://x/api/reverse-geocode?lat=999&lon=1"),
    });
    expect(res.status).toBe(400);
  });

  it("asks for an image when none is uploaded", async () => {
    const res = await handler(
      AnalyzeRoute,
      "POST",
    )({
      request: new Request("http://x/api/analyze-image", { method: "POST", body: new FormData() }),
    });
    expect(res.status).toBe(400);
  });

  it("falls back to a safe triage when Gemini is not configured", async () => {
    const form = new FormData();
    form.append(
      "image",
      new Blob([new Uint8Array([255, 216, 255])], { type: "image/jpeg" }),
      "x.jpg",
    );
    const res = await handler(
      AnalyzeRoute,
      "POST",
    )({
      request: new Request("http://x/api/analyze-image", { method: "POST", body: form }),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ category: "roads", fallback: true });
  });
});
