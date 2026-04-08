import { describe, expect, it } from "vitest";

import { summarizeDocRefreshRun } from "@/features/docs-refresh/run-summary";

describe("doc refresh run summary", () => {
  it("marks the run as success when all sources succeed", () => {
    expect(
      summarizeDocRefreshRun({
        totalSources: 3,
        successfulSnapshots: 3,
        failedSources: 0,
      }),
    ).toEqual({
      success: true,
      status: "success",
      summaryCounts: {
        totalSources: 3,
        successfulSnapshots: 3,
        failedSources: 0,
      },
    });
  });

  it("marks the run as partial_success when some sources fail", () => {
    expect(
      summarizeDocRefreshRun({
        totalSources: 4,
        successfulSnapshots: 2,
        failedSources: 2,
      }),
    ).toEqual({
      success: true,
      status: "partial_success",
      summaryCounts: {
        totalSources: 4,
        successfulSnapshots: 2,
        failedSources: 2,
      },
    });
  });

  it("marks the run as failed when no source succeeds", () => {
    expect(
      summarizeDocRefreshRun({
        totalSources: 2,
        successfulSnapshots: 0,
        failedSources: 2,
      }),
    ).toEqual({
      success: false,
      status: "failed",
      summaryCounts: {
        totalSources: 2,
        successfulSnapshots: 0,
        failedSources: 2,
      },
    });
  });
});
