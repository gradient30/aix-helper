import { describe, expect, it } from "vitest";

import {
  DEFAULT_LIVE_STAR_ORDER_CONFIG,
  evaluateLiveStarOrder,
  type LiveStarEntry,
} from "../../scripts/lib/live-star-order";

function entry(name: string, stars: number): LiveStarEntry {
  return { full_name: name, stars };
}

describe("live-star-order evaluator", () => {
  it("passes when stars are non-increasing", () => {
    const result = evaluateLiveStarOrder([
      entry("a/repo1", 1000),
      entry("a/repo2", 980),
      entry("a/repo3", 970),
    ]);

    expect(result.should_fail).toBe(false);
    expect(result.minor_inversions).toHaveLength(0);
    expect(result.severe_inversions).toHaveLength(0);
  });

  it("classifies delta equal to tolerance as minor inversion", () => {
    const tolerance = DEFAULT_LIVE_STAR_ORDER_CONFIG.absolute_tolerance;
    const result = evaluateLiveStarOrder([
      entry("a/repo1", 1000),
      entry("a/repo2", 1000 + tolerance),
    ]);

    expect(result.should_fail).toBe(false);
    expect(result.minor_inversions).toHaveLength(1);
    expect(result.minor_inversions[0].delta).toBe(tolerance);
    expect(result.severe_inversions).toHaveLength(0);
  });

  it("fails when inversion delta exceeds tolerance", () => {
    const tolerance = DEFAULT_LIVE_STAR_ORDER_CONFIG.absolute_tolerance;
    const result = evaluateLiveStarOrder([
      entry("a/repo1", 1000),
      entry("a/repo2", 1000 + tolerance + 1),
    ]);

    expect(result.should_fail).toBe(true);
    expect(result.minor_inversions).toHaveLength(0);
    expect(result.severe_inversions).toHaveLength(1);
  });

  it("fails when minor inversion pairs exceed max threshold", () => {
    const tolerance = DEFAULT_LIVE_STAR_ORDER_CONFIG.absolute_tolerance;
    const result = evaluateLiveStarOrder([
      entry("a/repo1", 1000),
      entry("a/repo2", 1000 + tolerance),
      entry("a/repo3", 1000 + tolerance - 10),
      entry("a/repo4", 1000 + 2 * tolerance - 10),
      entry("a/repo5", 1000 + 2 * tolerance - 20),
      entry("a/repo6", 1000 + 3 * tolerance - 20),
      entry("a/repo7", 1000 + 3 * tolerance - 30),
      entry("a/repo8", 1000 + 4 * tolerance - 30),
    ]);

    expect(result.minor_inversions.length).toBeGreaterThan(DEFAULT_LIVE_STAR_ORDER_CONFIG.max_minor_pairs);
    expect(result.severe_inversions).toHaveLength(0);
    expect(result.should_fail).toBe(true);
  });

  it("uses relative tolerance for high-star repositories", () => {
    const result = evaluateLiveStarOrder([
      entry("a/repo1", 10000),
      entry("a/repo2", 10250),
    ]);

    expect(result.should_fail).toBe(false);
    expect(result.minor_inversions).toHaveLength(1);
    expect(result.minor_inversions[0].tolerance).toBe(307);
  });
});
