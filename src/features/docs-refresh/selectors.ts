import type { Database, Json } from "@/integrations/supabase/types";

import type {
  DocRefreshDiffItemView,
  DocRefreshReviewAction,
  DocRefreshReviewStatus,
  DocRefreshRunView,
  DocRefreshScope,
  DocRefreshSourceMode,
} from "./types";

type DocRefreshRunRow = Database["public"]["Tables"]["doc_refresh_runs"]["Row"];
type DocRefreshDiffStatusRow = Pick<Database["public"]["Tables"]["doc_refresh_diff_items"]["Row"], "review_status">;
type DocRefreshDiffItemRow = Database["public"]["Tables"]["doc_refresh_diff_items"]["Row"];

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asRecord(value: Json): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function asNullableRecord(value: Json): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function asRecordArray(value: Json): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object" && !Array.isArray(entry));
}

function countReviewStatuses(rows: DocRefreshDiffStatusRow[]) {
  return rows.reduce(
    (summary, row) => {
      const status = row.review_status as DocRefreshReviewStatus;
      if (status === "pending") summary.pending += 1;
      if (status === "applied") summary.applied += 1;
      if (status === "dismissed") summary.dismissed += 1;
      return summary;
    },
    {
      pending: 0,
      applied: 0,
      dismissed: 0,
    },
  );
}

export function createEmptyDocRefreshRunView(scope: DocRefreshScope, pageRoute: string): DocRefreshRunView {
  return {
    runId: null,
    scope,
    pageRoute,
    sourceMode: null,
    status: "idle",
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    summary: {
      totalSources: 0,
      successfulSnapshots: 0,
      failedSources: 0,
      pending: 0,
      applied: 0,
      dismissed: 0,
    },
  };
}

export function buildDocRefreshRunView(args: {
  scope: DocRefreshScope;
  pageRoute: string;
  run: DocRefreshRunRow | null;
  diffItems: DocRefreshDiffStatusRow[];
}): DocRefreshRunView {
  if (!args.run) {
    return createEmptyDocRefreshRunView(args.scope, args.pageRoute);
  }

  const summaryCounts = asRecord(args.run.summary_counts);
  const reviewSummary = countReviewStatuses(args.diffItems);

  return {
    runId: args.run.id,
    scope: args.scope,
    pageRoute: args.pageRoute,
    sourceMode: args.run.source_mode as DocRefreshSourceMode,
    status: args.run.status as DocRefreshRunView["status"],
    startedAt: args.run.started_at,
    finishedAt: args.run.finished_at,
    errorMessage: args.run.error_message,
    summary: {
      totalSources: asNumber(summaryCounts.totalSources),
      successfulSnapshots: asNumber(summaryCounts.successfulSnapshots),
      failedSources: asNumber(summaryCounts.failedSources),
      pending: reviewSummary.pending,
      applied: reviewSummary.applied,
      dismissed: reviewSummary.dismissed,
    },
  };
}

export function buildDocRefreshDiffItemView(row: DocRefreshDiffItemRow): DocRefreshDiffItemView {
  return {
    id: row.id,
    runId: row.run_id,
    scope: row.scope as DocRefreshScope,
    vendorId: row.vendor_id,
    entityKey: row.entity_key,
    diffKind: row.diff_kind as DocRefreshDiffItemView["diffKind"],
    reviewAction: row.review_action as DocRefreshReviewAction,
    reviewStatus: row.review_status as DocRefreshReviewStatus,
    similarityScore: row.similarity_score,
    baselinePayload: asNullableRecord(row.baseline_payload),
    candidatePayload: asNullableRecord(row.candidate_payload),
    similarCandidates: asRecordArray(row.similar_candidates),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
