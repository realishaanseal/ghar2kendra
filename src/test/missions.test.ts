import { describe, expect, it } from "vitest";

import { MOCK_ISSUES } from "@/app/data/mockIssues";
import {
  draftSubmission,
  missionProgress,
  residentsAffected,
  suggestMissions,
} from "@/app/engine/missions";

const NOW = new Date("2026-10-23T12:00:00+05:30");

describe("suggestMissions", () => {
  it("groups the Lane 3 drainage reports into one suggested mission", () => {
    const first = suggestMissions(MOCK_ISSUES)[0]!;
    expect(first.family).toBe("drainage");
    expect(first.issueIds.sort()).toEqual(
      ["G2K-2026-0641", "G2K-2026-0655", "G2K-2026-0661", "G2K-2026-0668"].sort(),
    );
    expect(first.authorities).toContain("Delhi Jal Board (Water & Sewerage)");
    expect(first.residents).toBe(
      residentsAffected(MOCK_ISSUES.filter((i) => first.issueIds.includes(i.id))),
    );
  });

  it("skips issues already in a mission and small clusters", () => {
    const taken = [{ issueIds: ["G2K-2026-0641", "G2K-2026-0655"] }];
    expect(suggestMissions(MOCK_ISSUES, taken)).toHaveLength(0);
  });

  it("never clusters resolved issues", () => {
    const resolvedOnly = MOCK_ISSUES.map((i) => ({ ...i, status: "resolved" }));
    expect(suggestMissions(resolvedOnly)).toHaveLength(0);
  });
});

describe("missionProgress and petition", () => {
  const mission = {
    id: "MSN-T",
    title: "Fix the drainage: Lane 3",
    ward: "Ward 22 (Rohini North)",
    status: "submitted",
    issueIds: ["G2K-2026-0655", "G2K-2026-0518"],
    coordinator: { name: "Neha Gupta" },
    authorities: [{ name: "Delhi Jal Board" }],
    reminders: [
      { id: "a", dueAt: "2026-10-20T10:00:00+05:30", label: "late", done: false },
      { id: "b", dueAt: "2026-10-30T10:00:00+05:30", label: "soon", done: false },
    ],
  };

  it("tracks fixes, stage and overdue reminders", () => {
    const p = missionProgress(mission, MOCK_ISSUES, NOW);
    expect(p.total).toBe(2);
    expect(p.fixed).toBe(1);
    expect(p.percent).toBe(50);
    expect(p.stageIndex).toBe(1);
    expect(p.overdue.map((r: { id: string }) => r.id)).toEqual(["a"]);
    expect(p.nextReminder?.id).toBe("a");
  });

  it("drafts a petition that cites every linked ticket", () => {
    const text = draftSubmission(mission, MOCK_ISSUES, NOW);
    expect(text).toContain("To: Delhi Jal Board");
    expect(text).toContain("G2K-2026-0655");
    expect(text).toContain("G2K-2026-0518");
    expect(text).toContain("Mission coordinator: Neha Gupta");
  });
});
