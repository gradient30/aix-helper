export type DocRefreshRunStatus = "success" | "partial_success" | "failed";

export type DocRefreshRunSummaryInput = {
  totalSources: number;
  successfulSnapshots: number;
  failedSources: number;
};

export function summarizeDocRefreshRun(input: DocRefreshRunSummaryInput): {
  success: boolean;
  status: DocRefreshRunStatus;
  summaryCounts: DocRefreshRunSummaryInput;
} {
  if (input.successfulSnapshots === 0) {
    return {
      success: false,
      status: "failed",
      summaryCounts: input,
    };
  }

  if (input.failedSources > 0) {
    return {
      success: true,
      status: "partial_success",
      summaryCounts: input,
    };
  }

  return {
    success: true,
    status: "success",
    summaryCounts: input,
  };
}
