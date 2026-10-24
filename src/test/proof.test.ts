import { describe, expect, it } from "vitest";

import { ARCHIVED_ISSUES } from "@/app/data/civicAssets";
import { MOCK_ISSUES } from "@/app/data/mockIssues";
import {
  QUORUM,
  checkAttestation,
  evaluateProof,
  findPreviousRepair,
  locateAttestation,
} from "@/app/engine/proof";

const NOW = new Date("2026-10-23T12:00:00+05:30");
const ALL = [...MOCK_ISSUES, ...ARCHIVED_ISSUES];
const resolved = {
  id: "T-1",
  status: "resolved",
  reportedBy: "Sunita Mehra",
  lat: 28.608,
  lng: 77.22,
  imageUrl: "before.jpg",
  resolvedPhotoUrl: "after.jpg",
};
const near = (userId: string, verdict = "fixed", extra = {}) =>
  locateAttestation(resolved, {
    userId,
    name: userId,
    verdict,
    lat: 28.6082,
    lng: 77.2198,
    ...extra,
  });

describe("checkAttestation", () => {
  it("accepts an independent resident on site", () => {
    expect(checkAttestation(resolved, near("a")).eligible).toBe(true);
  });

  it("rejects the reporter, contractors, far-away users and repeat votes", () => {
    expect(checkAttestation(resolved, near("x", "fixed", { name: "Sunita Mehra" })).eligible).toBe(
      false,
    );
    expect(checkAttestation(resolved, near("c", "fixed", { role: "contractor" })).eligible).toBe(
      false,
    );
    expect(
      checkAttestation(resolved, near("f", "fixed", { lat: 28.62, lng: 77.22 })).reason,
    ).toMatch(/Too far/);
    expect(checkAttestation(resolved, near("a"), [near("a")]).reason).toBe("Already attested");
    expect(
      checkAttestation(resolved, { userId: "n", verdict: "fixed", distanceM: null }).eligible,
    ).toBe(false);
  });
});

describe("evaluateProof", () => {
  it("needs evidence before anything else", () => {
    expect(evaluateProof({ ...resolved, resolvedPhotoUrl: null }, {}).stage).toBe(
      "awaiting_evidence",
    );
  });

  it("collects until quorum, then waits for a human reviewer", () => {
    const two = { attestations: [near("a"), near("b")] };
    expect(evaluateProof(resolved, two).stage).toBe("collecting");
    expect(evaluateProof(resolved, two).needed).toBe(QUORUM - 2);

    const three = { attestations: [near("a"), near("b"), near("c")] };
    const status = evaluateProof(resolved, three);
    expect(status.stage).toBe("awaiting_review");
    expect(status.canReview).toBe(true);
  });

  it("does not count ineligible votes towards quorum", () => {
    const proof = {
      attestations: [near("a"), near("b"), near("r", "fixed", { name: "Sunita Mehra" })],
    };
    expect(evaluateProof(resolved, proof).stage).toBe("collecting");
  });

  it("escalates when residents dispute the fix", () => {
    const proof = { attestations: [near("a", "not_fixed"), near("b", "not_fixed")] };
    expect(evaluateProof(resolved, proof).stage).toBe("disputed");
  });

  it("only verifies after review approval", () => {
    const proof = {
      attestations: [near("a"), near("b"), near("c")],
      review: { status: "approved" },
    };
    expect(evaluateProof(resolved, proof).stage).toBe("verified");
    expect(evaluateProof(resolved, { ...proof, review: { status: "rejected" } }).stage).toBe(
      "rejected",
    );
  });
});

describe("findPreviousRepair", () => {
  it("auto-links the reopened Outer Ring Road crater to its last repair", () => {
    const crater = MOCK_ISSUES.find((i) => i.id === "G2K-2026-0814")!;
    const link = findPreviousRepair(crater, ALL, NOW);
    expect(link?.previousIssue.id).toBe("G2K-2026-0311");
    expect(link?.mode).toBe("auto");
  });

  it("asks for review between 60 and 150 m", () => {
    const crater = { ...MOCK_ISSUES.find((i) => i.id === "G2K-2026-0814")!, lat: 28.6147 };
    expect(findPreviousRepair(crater, ALL, NOW)?.mode).toBe("review");
  });

  it("ignores repairs of a different kind", () => {
    const sparks = MOCK_ISSUES.find((i) => i.id === "G2K-2026-0792")!;
    expect(findPreviousRepair(sparks, ALL, NOW)).toBeNull();
  });
});
