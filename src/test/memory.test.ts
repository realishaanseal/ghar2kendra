import { describe, expect, it } from "vitest";

import { ASSETS, ARCHIVED_ISSUES } from "@/app/data/civicAssets";
import { MOCK_ISSUES } from "@/app/data/mockIssues";
import {
  buildAssetMemory,
  buildMemoryIndex,
  matchAsset,
  scoreReliability,
} from "@/app/engine/memory";
import { parseWhen } from "@/app/engine/time";

const NOW = new Date("2026-10-23T12:00:00+05:30");
const ALL = [...MOCK_ISSUES, ...ARCHIVED_ISSUES];
const asset = (id: string) => ASSETS.find((a) => a.id === id)!;

describe("time parsing", () => {
  it("understands ISO and relative phrases", () => {
    expect(parseWhen("2026-05-11T08:20:00+05:30", NOW)?.toISOString()).toBe(
      "2026-05-11T02:50:00.000Z",
    );
    expect(NOW.getTime() - parseWhen("2 hours ago", NOW)!.getTime()).toBe(2 * 3600 * 1000);
    expect(NOW.getTime() - parseWhen("Yesterday, 05:30 PM", NOW)!.getTime()).toBe(24 * 3600 * 1000);
    expect(parseWhen("Just now", NOW)?.getTime()).toBe(NOW.getTime());
    expect(parseWhen(undefined, NOW)).toBeNull();
  });
});

describe("matchAsset", () => {
  it("attaches a live pothole to the Outer Ring Road stretch", () => {
    const pothole = MOCK_ISSUES.find((i) => i.id === "G2K-2026-0814")!;
    expect(matchAsset(pothole, ASSETS)?.asset.id).toBe("AST-ORR-142");
  });

  it("ignores assets whose category does not fit", () => {
    const issue = { id: "x", category: "electricity", lat: 28.6139, lng: 77.209 };
    expect(matchAsset(issue, ASSETS)).toBeNull();
  });

  it("ignores issues outside the asset radius", () => {
    const issue = { id: "x", category: "roads", lat: 28.7, lng: 77.3 };
    expect(matchAsset(issue, ASSETS)).toBeNull();
  });
});

describe("buildAssetMemory", () => {
  it("shows three reports, two repairs and the recurrence on Outer Ring Road", () => {
    const memory = buildAssetMemory(asset("AST-ORR-142"), ALL, ASSETS, NOW);
    expect(memory.stats.reports).toBe(3);
    expect(memory.stats.repairs).toBe(2);
    expect(memory.stats.verifiedRepairs).toBe(1);
    expect(memory.stats.recurrences).toBe(2);
    expect(memory.stats.openCount).toBe(1);
    expect(memory.events[0]?.type).toBe("recurrence");
    expect(memory.reliability.grade).toBe("failing");
    expect(memory.outlook).toBeNull(); // still open
  });

  it("estimates the next overflow at the mandi bin from past repair lifetimes", () => {
    const memory = buildAssetMemory(asset("AST-LJP-MANDI"), ALL, ASSETS, NOW);
    expect(memory.stats.recurrences).toBe(2);
    expect(memory.outlook).not.toBeNull();
    expect(memory.outlook!.expectedFailureAt.getTime()).toBeGreaterThan(
      NOW.getTime() - 2 * 24 * 3600 * 1000,
    );
  });

  it("treats a lone repaired footpath as stable", () => {
    const memory = buildAssetMemory(asset("AST-HKV-G2"), ALL, ASSETS, NOW);
    expect(memory.stats.reports).toBe(1);
    expect(memory.reliability.grade).toBe("stable");
  });
});

describe("index and scoring", () => {
  it("orders assets worst first", () => {
    const index = buildMemoryIndex(ASSETS, ALL, NOW);
    const scores = index.map((m: { reliability: { score: number } }) => m.reliability.score);
    expect([...scores].sort((a, b) => a - b)).toEqual(scores);
  });

  it("clamps the score to 0–100", () => {
    const bad = scoreReliability({ recurrences: 9, repairs: 9, verifiedRepairs: 0 } as never, []);
    expect(bad.score).toBe(0);
    expect(bad.grade).toBe("failing");
  });
});
