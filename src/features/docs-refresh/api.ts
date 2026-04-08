import { supabase } from "@/integrations/supabase/client";
import { buildDocRefreshDiffItemView, buildDocRefreshRunView } from "./selectors";
import type {
  DocRefreshDiffItemView,
  DocRefreshReviewAction,
  DocRefreshRunView,
  DocRefreshScope,
  DocRefreshSourceMode,
} from "./types";

export type FirecrawlSettings = {
  firecrawlConfigured: boolean;
  firecrawlKeyMask: string | null;
  firecrawlLastVerifiedAt: string | null;
};

export type TriggerDocRefreshInput = {
  scope: DocRefreshScope;
  pageRoute: string;
  vendorIds?: string[];
  sourceMode: DocRefreshSourceMode;
};

export type TriggerDocRefreshResult = {
  success: boolean;
  runId: string;
  status: "success" | "partial_success" | "failed";
  summaryCounts: {
    totalSources: number;
    successfulSnapshots: number;
    failedSources: number;
  };
  pageRoute: string;
  failures: Array<{ sourceUrl: string; message: string }>;
};

export type ApplyDocRefreshDecisionInput = {
  item: DocRefreshDiffItemView;
  action: DocRefreshReviewAction;
};

type DocRefreshSettingsRequest =
  | { action: "get" | "clear" }
  | { action: "save"; firecrawlKey: string };

const EMPTY_SETTINGS: FirecrawlSettings = {
  firecrawlConfigured: false,
  firecrawlKeyMask: null,
  firecrawlLastVerifiedAt: null,
};

async function invokeDocRefreshSettings(body: DocRefreshSettingsRequest): Promise<FirecrawlSettings> {
  const { data, error } = await supabase.functions.invoke("doc-refresh-settings", { body });
  if (error) throw error;
  return (data as FirecrawlSettings | null | undefined) ?? EMPTY_SETTINGS;
}

async function invokeDocRefreshRun(body: TriggerDocRefreshInput): Promise<TriggerDocRefreshResult> {
  const { data, error } = await supabase.functions.invoke("doc-refresh-run", { body });
  if (error) throw error;
  return data as TriggerDocRefreshResult;
}

export function fetchDocRefreshSettings(): Promise<FirecrawlSettings> {
  return invokeDocRefreshSettings({ action: "get" });
}

export function saveDocRefreshSettings(firecrawlKey: string): Promise<FirecrawlSettings> {
  return invokeDocRefreshSettings({ action: "save", firecrawlKey });
}

export function clearDocRefreshSettings(): Promise<FirecrawlSettings> {
  return invokeDocRefreshSettings({ action: "clear" });
}

export function triggerDocRefresh(input: TriggerDocRefreshInput): Promise<TriggerDocRefreshResult> {
  return invokeDocRefreshRun(input);
}

function toEntityKey(payload: Record<string, unknown> | null, fallback: string): string {
  const entityKey = payload?.entityKey;
  return typeof entityKey === "string" && entityKey ? entityKey : fallback;
}

async function getCurrentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw error ?? new Error("未获取到当前用户");
  }
  return user.id;
}

function buildOverrideRows(input: ApplyDocRefreshDecisionInput & { userId: string }) {
  const candidateEntityKey = toEntityKey(input.item.candidatePayload, input.item.entityKey);
  const baselineEntityKey = toEntityKey(input.item.baselinePayload, input.item.entityKey);

  if (input.action === "replace_all") {
    return [
      {
        scope: input.item.scope,
        vendor_id: input.item.vendorId,
        entity_key: candidateEntityKey,
        override_type: "upsert",
        payload: {
          ...(input.item.candidatePayload ?? {}),
          entityKey: candidateEntityKey,
        },
        source_run_id: input.item.runId,
        applied_by: input.userId,
      },
    ];
  }

  if (input.action === "replace_similar") {
    const rows = [
      {
        scope: input.item.scope,
        vendor_id: input.item.vendorId,
        entity_key: baselineEntityKey,
        override_type: "delete",
        payload: {},
        source_run_id: input.item.runId,
        applied_by: input.userId,
      },
      {
        scope: input.item.scope,
        vendor_id: input.item.vendorId,
        entity_key: candidateEntityKey,
        override_type: "upsert",
        payload: {
          ...(input.item.candidatePayload ?? {}),
          entityKey: candidateEntityKey,
        },
        source_run_id: input.item.runId,
        applied_by: input.userId,
      },
    ];

    return baselineEntityKey === candidateEntityKey ? rows.slice(1) : rows;
  }

  if (input.action === "delete_old") {
    return [
      {
        scope: input.item.scope,
        vendor_id: input.item.vendorId,
        entity_key: baselineEntityKey,
        override_type: "delete",
        payload: {},
        source_run_id: input.item.runId,
        applied_by: input.userId,
      },
    ];
  }

  return [];
}

export async function fetchLatestDocRefreshRun(
  scope: DocRefreshScope,
  pageRoute: string,
): Promise<DocRefreshRunView> {
  const { data: latestRun, error: latestRunError } = await supabase
    .from("doc_refresh_runs")
    .select("*")
    .eq("scope", scope)
    .eq("page_route", pageRoute)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestRunError) throw latestRunError;
  if (!latestRun) {
    return buildDocRefreshRunView({
      scope,
      pageRoute,
      run: null,
      diffItems: [],
    });
  }

  const { data: diffItems, error: diffItemsError } = await supabase
    .from("doc_refresh_diff_items")
    .select("review_status")
    .eq("run_id", latestRun.id);

  if (diffItemsError) throw diffItemsError;

  return buildDocRefreshRunView({
    scope,
    pageRoute,
    run: latestRun,
    diffItems: diffItems ?? [],
  });
}

export async function fetchDocRefreshDiffItems(runId: string): Promise<DocRefreshDiffItemView[]> {
  const { data, error } = await supabase
    .from("doc_refresh_diff_items")
    .select("*")
    .eq("run_id", runId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => buildDocRefreshDiffItemView(row));
}

export async function applyDocRefreshDecision(input: ApplyDocRefreshDecisionInput): Promise<void> {
  const userId = await getCurrentUserId();
  const overrideRows = buildOverrideRows({ ...input, userId });

  if (overrideRows.length > 0) {
    const { error: overrideError } = await supabase
      .from("doc_catalog_overrides")
      .upsert(overrideRows, { onConflict: "scope,vendor_id,entity_key" });

    if (overrideError) throw overrideError;
  }

  const { error } = await supabase
    .from("doc_refresh_diff_items")
    .update({
      review_action: input.action,
      review_status: "applied",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", input.item.id);

  if (error) throw error;
}

export async function dismissDocRefreshDecision(itemId: string): Promise<void> {
  const { error } = await supabase
    .from("doc_refresh_diff_items")
    .update({
      review_action: "skip",
      review_status: "dismissed",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", itemId);

  if (error) throw error;
}
