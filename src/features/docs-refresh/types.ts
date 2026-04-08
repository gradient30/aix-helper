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

export type DocRefreshOverride<TPayload = unknown> = {
  entityKey: string;
  overrideType: DocRefreshOverrideType;
  payload: TPayload;
};
