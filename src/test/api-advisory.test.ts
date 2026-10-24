// @vitest-environment node
import { describe, expect, it } from "vitest";

import { isSafeImageUrl } from "@/server/images";
import { Route as CompareRoute } from "@/routes/api/compare-proof";

type Handler = (ctx: { request: Request }) => Promise<Response> | Response;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (route: any, method: string): Handler => route.options.server.handlers[method];
const post = (body: unknown) =>
  new Request("http://x/api", { method: "POST", body: JSON.stringify(body) });

describe("isSafeImageUrl", () => {
  it("only allows public https hostnames", () => {
    expect(isSafeImageUrl("https://images.unsplash.com/photo.jpg")).toBe(true);
    expect(isSafeImageUrl("http://images.unsplash.com/photo.jpg")).toBe(false);
    expect(isSafeImageUrl("https://localhost/x.jpg")).toBe(false);
    expect(isSafeImageUrl("https://169.254.169.254/latest")).toBe(false);
    expect(isSafeImageUrl("https://[::1]/x.jpg")).toBe(false);
    expect(isSafeImageUrl("https://db.internal/x.jpg")).toBe(false);
    expect(isSafeImageUrl(42)).toBe(false);
  });
});

describe("/api/compare-proof", () => {
  it("rejects unsafe or missing URLs before fetching anything", async () => {
    const compare = handler(CompareRoute, "POST");
    expect((await compare({ request: post({ beforeUrl: "http://127.0.0.1/a" }) })).status).toBe(
      400,
    );
    expect((await compare({ request: post("not json") })).status).toBe(400);
  });
});
