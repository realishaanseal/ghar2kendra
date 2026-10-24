import { describe, expect, it } from "vitest";

import { ASSETS, ARCHIVED_ISSUES } from "@/app/data/civicAssets";
import { MOCK_ISSUES } from "@/app/data/mockIssues";
import {
  detectCoLocationPatterns,
  detectPatterns,
  detectRepeatFailures,
  patternGraph,
  signalStrength,
} from "@/app/engine/patterns";

const NOW = new Date("2026-10-23T12:00:00+05:30");
const ALL = [...MOCK_ISSUES, ...ARCHIVED_ISSUES];

describe("co-location patterns", () => {
  const patterns = detectCoLocationPatterns(ALL, NOW);

  it("links waterlogging and blocked drains on Lane 3 to one drainage cause", () => {
    const drainage = patterns.find((p) => p.kind === "drainage_failure");
    expect(drainage).toBeDefined();
    expect(drainage!.evidenceIssueIds).toEqual(
      expect.arrayContaining(["G2K-2026-0655", "G2K-2026-0661", "G2K-2026-0668"]),
    );
    expect(drainage!.title).toMatch(/Lane 3/);
    expect(drainage!.independentReporters).toBeGreaterThanOrEqual(3);
  });

  it("flags the dark spot on the college road", () => {
    const dark = patterns.find((p) => p.kind === "dark_spot");
    expect(dark?.evidenceIssueIds).toEqual(
      expect.arrayContaining(["G2K-2026-0702", "G2K-2026-0499"]),
    );
  });

  it("does not invent patterns from isolated issues", () => {
    const lonely = [MOCK_ISSUES.find((i) => i.id === "G2K-2026-0655")!];
    expect(detectCoLocationPatterns(lonely, NOW)).toHaveLength(0);
  });
});

describe("repeat failures and ranking", () => {
  it("finds assets whose repairs keep failing", () => {
    const ids = detectRepeatFailures(ASSETS, ALL, NOW).map((p: { assetId: string }) => p.assetId);
    expect(ids).toEqual(expect.arrayContaining(["AST-ORR-142", "AST-LJP-MANDI"]));
  });

  it("folds Lane 3's repeat failures into the drainage pattern instead of duplicating it", () => {
    const all = detectPatterns(ASSETS, ALL, NOW);
    expect(all.some((p) => p.kind === "repeat_failure" && p.assetId === "AST-RHN-L3")).toBe(false);
    const drainage = all.find((p) => p.kind === "drainage_failure")!;
    expect(drainage.assetId).toBe("AST-RHN-L3");
    expect(drainage.hypothesis).toMatch(/not lasted/);
    expect(all[0].kind).toBe("drainage_failure");
  });

  it("sorts by signal strength and keeps it below certainty", () => {
    const all = detectPatterns(ASSETS, ALL, NOW);
    const conf = all.map((p) => p.confidence);
    expect([...conf].sort((a, b) => b - a)).toEqual(conf);
    expect(Math.max(...conf)).toBeLessThanOrEqual(0.95);
    expect(signalStrength([])).toBeGreaterThan(0);
  });
});

describe("patternGraph", () => {
  it("places evidence around the pattern and joins nearby tickets", () => {
    const pattern = detectCoLocationPatterns(ALL, NOW)[0]!;
    const graph = patternGraph(pattern, ALL);
    expect(graph.nodes).toHaveLength(pattern.evidenceIssueIds.length + 1);
    expect(graph.edges.some((e: { kind: string }) => e.kind === "near")).toBe(true);
  });
});
