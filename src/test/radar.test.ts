import { describe, expect, it } from "vitest";

import { ARCHIVED_ISSUES } from "@/app/data/civicAssets";
import { MOCK_ISSUES } from "@/app/data/mockIssues";
import { distanceToSegmentMeters } from "@/app/engine/geo";
import { buildRadarFeed, proximityAlerts, routeHazards, scoreForPlace } from "@/app/engine/radar";

const NOW = new Date("2026-10-23T12:00:00+05:30");
const ALL = [...MOCK_ISSUES, ...ARCHIVED_ISSUES];
const college = {
  id: "c",
  label: "College",
  kind: "college",
  lat: 28.6401,
  lng: 77.19,
  radiusM: 400,
  interests: [],
};
const home = { id: "h", label: "Home", kind: "home", lat: 28.6145, lng: 77.2095, radiusM: 600 };

describe("radar feed", () => {
  it("only shows issues around followed places, ranked by relevance", () => {
    const feed = buildRadarFeed([college], ALL, NOW);
    const ids = feed.map((f) => f.issue.id);
    expect(ids).toEqual(
      expect.arrayContaining(["G2K-2026-0499", "G2K-2026-0702", "G2K-2026-0709"]),
    );
    expect(ids).not.toContain("G2K-2026-0814");
    const scores = feed.map((f) => f.score);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });

  it("boosts accessibility obstructions and recurring defects", () => {
    const slab = scoreForPlace(
      MOCK_ISSUES.find((i) => i.id === "G2K-2026-0709")!,
      college,
      ALL,
      NOW,
    );
    expect(slab?.reasons).toContain("Blocks accessible movement");
    const manhole = scoreForPlace(
      MOCK_ISSUES.find((i) => i.id === "G2K-2026-0499")!,
      college,
      ALL,
      NOW,
    );
    expect(manhole?.kind).toBe("recurring");
  });

  it("surfaces a newly verified repair as good news", () => {
    const fixed = {
      ...MOCK_ISSUES[3]!,
      status: "verified",
      verifiedAt: "2026-10-22T10:00:00+05:30",
    };
    const market = { ...college, lat: fixed.lat, lng: fixed.lng };
    expect(scoreForPlace(fixed, market, ALL, NOW)?.kind).toBe("verified_repair");
  });

  it("respects category interests", () => {
    const onlyPower = { ...college, interests: ["electricity"] };
    const ids = buildRadarFeed([onlyPower], ALL, NOW).map((f) => f.issue.id);
    expect(ids).toEqual(["G2K-2026-0702"]);
  });
});

describe("route and proximity checks", () => {
  it("measures distance to a segment", () => {
    const a = { lat: 28.6, lng: 77.2 };
    const b = { lat: 28.61, lng: 77.2 };
    expect(distanceToSegmentMeters({ lat: 28.605, lng: 77.2 }, a, b)).toBeLessThan(1);
    expect(distanceToSegmentMeters({ lat: 28.605, lng: 77.201 }, a, b)).toBeGreaterThan(90);
  });

  it("flags critical hazards between home and college", () => {
    const check = routeHazards(home, college, MOCK_ISSUES);
    expect(check.verdict).toBe("avoid");
    expect(check.hazards[0].alongM).toBeLessThanOrEqual(check.hazards.at(-1)!.alongM);
  });

  it("alerts on serious open hazards nearby", () => {
    const alerts = proximityAlerts({ lat: 28.6139, lng: 77.209 }, MOCK_ISSUES);
    expect(alerts[0].issue.id).toBe("G2K-2026-0814");
  });
});
