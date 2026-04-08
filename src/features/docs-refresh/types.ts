export type DocRefreshDiffKind = "added" | "modified" | "stale" | "similar";

export type DocRefreshOverrideType = "upsert" | "delete";

export type DocRefreshBaseEntity = {
  entityKey: string;
  vendorId: string;
  category: string;
  title?: string;
  command?: string;
  description?: string;
  code?: string;
  content?: string;
  body?: string;
  [key: string]: unknown;
};

export type DocRefreshDiffPair<T extends DocRefreshBaseEntity> = {
  baseline: T;
  candidate: T;
  similarityScore?: number;
};

export type DocRefreshSummary = Record<DocRefreshDiffKind, number>;

export type DocRefreshDiffResult<T extends DocRefreshBaseEntity> = {
  summary: DocRefreshSummary;
  added: T[];
  modified: DocRefreshDiffPair<T>[];
  stale: T[];
  similar: DocRefreshDiffPair<T>[];
};

export type DocRefreshUpsertOverride<TPayload extends { entityKey: string } = { entityKey: string }> = {
  entityKey: string;
  overrideType: "upsert";
  payload: TPayload;
};

export type DocRefreshDeleteOverride = {
  entityKey: string;
  overrideType: "delete";
  payload?: never;
};

export type DocRefreshOverride<TPayload extends { entityKey: string } = { entityKey: string }> =
  | DocRefreshUpsertOverride<TPayload>
  | DocRefreshDeleteOverride;

export type DocRefreshScope = "cli" | "skills" | "setup" | "help";

export type DocRefreshSourceMode = "official_fetch" | "firecrawl_manual";

export type DocRefreshRunStatus = "idle" | "running" | "success" | "partial_success" | "failed";

export type DocRefreshReviewAction = "replace_all" | "replace_similar" | "delete_old" | "skip";

export type DocRefreshReviewStatus = "pending" | "applied" | "dismissed";

export type DocRefreshDiffPayload = Record<string, unknown> | null;

export type DocRefreshDiffItemView = {
  id: string;
  runId: string;
  scope: DocRefreshScope;
  vendorId: string;
  entityKey: string;
  diffKind: DocRefreshDiffKind;
  reviewAction: DocRefreshReviewAction;
  reviewStatus: DocRefreshReviewStatus;
  similarityScore: number | null;
  baselinePayload: DocRefreshDiffPayload;
  candidatePayload: DocRefreshDiffPayload;
  similarCandidates: Record<string, unknown>[];
  createdAt: string;
  updatedAt: string;
};

export type DocRefreshDiffFilter = "all" | DocRefreshDiffKind | "pending" | "reviewed";

export type DocRefreshRunView = {
  runId: string | null;
  scope: DocRefreshScope;
  pageRoute: string;
  sourceMode: DocRefreshSourceMode | null;
  status: DocRefreshRunStatus;
  startedAt: string | null;
  finishedAt: string | null;
  errorMessage: string | null;
  summary: {
    totalSources: number;
    successfulSnapshots: number;
    failedSources: number;
    pending: number;
    applied: number;
    dismissed: number;
  };
};
