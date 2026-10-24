import { describe, expect, it } from "vitest";

import { ARCHIVED_ISSUES } from "@/app/data/civicAssets";
import { MOCK_ISSUES } from "@/app/data/mockIssues";
import { staffLoad, workspaceAnalytics, workspaceIssues } from "@/app/engine/workspaces";

const NOW = new Date("2026-10-23T12:00:00+05:30");
const ALL = [...MOCK_ISSUES, ...ARCHIVED_ISSUES];
const college = {
  id: "ws",
  name: "College",
  type: "college",
  lat: 28.6401,
  lng: 77.19,
  radiusM: 350,
  staff: [
    { id: "a", name: "Sunil", role: "Electrician" },
    { id: "b", name: "Meera", role: "Civil" },
  ],
  assignments: {
    "G2K-2026-0702": { staffId: "a", status: "in_progress" },
    "G2K-2026-0709": { staffId: "b", status: "assigned" },
    "G2K-2026-0289": { staffId: "b", status: "done" },
  },
};

describe("workspaces", () => {
  it("scopes issues to the service area", () => {
    const ids = workspaceIssues(college, ALL).map((i: { id: string }) => i.id);
    expect(ids).toEqual(
      expect.arrayContaining(["G2K-2026-0499", "G2K-2026-0702", "G2K-2026-0709", "G2K-2026-0289"]),
    );
    expect(ids).not.toContain("G2K-2026-0814");
  });

  it("computes KPIs and an 8-week series", () => {
    const a = workspaceAnalytics(college, ALL, NOW);
    expect(a.open).toBe(3);
    expect(a.fixed).toBe(1);
    expect(a.mttrHours).toBeCloseTo(15, 0);
    expect(a.weekly).toHaveLength(8);
    expect(a.weekly.reduce((sum, w) => sum + w.opened, 0)).toBe(3);
    expect(a.recurrenceRate).toBeGreaterThan(0);
  });

  it("counts open and finished work per staff member", () => {
    const load = staffLoad(college);
    expect(load.find((m: { id: string }) => m.id === "a")).toMatchObject({ open: 1, done: 0 });
    expect(load.find((m: { id: string }) => m.id === "b")).toMatchObject({ open: 1, done: 1 });
  });
});
