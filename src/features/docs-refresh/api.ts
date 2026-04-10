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

export type DocCatalogOverrideView = {
  scope: DocRefreshScope;
  vendorId: string;
  entityKey: string;
  overrideType: "upsert" | "delete";
  payload: Record<string, unknown> | null;
  updatedAt: string | null;
};

type DocRefreshSettingsRequest =
  | { action: "get" | "clear" }
  | { action: "save"; firecrawlKey: string };

type ApplyDocRefreshDecisionRequest = {
  itemId: string;
  action: Exclude<DocRefreshReviewAction, "skip">;
};

type DocRefreshFunctionRequest =
  | DocRefreshSettingsRequest
  | TriggerDocRefreshInput
  | ApplyDocRefreshDecisionRequest;

type DocRefreshFunctionName = "doc-refresh-settings" | "doc-refresh-run" | "doc-refresh-apply";

const EMPTY_SETTINGS: FirecrawlSettings = {
  firecrawlConfigured: false,
  firecrawlKeyMask: null,
  firecrawlLastVerifiedAt: null,
};

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").trim().replace(/\/+$/, "");
const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "").trim();

function readFunctionErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const source = payload as Record<string, unknown>;
  const candidates: unknown[] = [
    source.message,
    source.error,
    source.error_message,
    source.reason,
    typeof source.error === "object" && source.error !== null
      ? (source.error as Record<string, unknown>).message
      : undefined,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return "";
}

async function getAccessTokenOrThrow(): Promise<string> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    throw sessionError;
  }

  if (sessionData.session?.access_token) {
    return sessionData.session.access_token;
  }

  const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
  if (refreshedError || !refreshedData.session?.access_token) {
    await supabase.auth.signOut();
    throw new Error("登录状态已失效，请重新登录后再试");
  }

  return refreshedData.session.access_token;
}

async function requestDocRefreshFunction<TResponse>(
  fnName: DocRefreshFunctionName,
  body: DocRefreshFunctionRequest,
): Promise<TResponse> {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase 未配置，请在环境变量中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_PUBLISHABLE_KEY");
  }

  const invoke = async (accessToken: string) => {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        access_token: accessToken,
      }),
    });

    const payload = await response.json().catch(() => null);
    return { response, payload };
  };

  let accessToken = await getAccessTokenOrThrow();
  let { response, payload } = await invoke(accessToken);

  if (response.status === 401) {
    const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
    if (refreshedError || !refreshedData.session?.access_token) {
      await supabase.auth.signOut();
      throw new Error("登录状态已失效，请重新登录后再试");
    }

    accessToken = refreshedData.session.access_token;
    const retryResult = await invoke(accessToken);
    response = retryResult.response;
    payload = retryResult.payload;

    if (response.status === 401) {
      await supabase.auth.signOut();
      throw new Error("登录状态已失效，请重新登录后再试");
    }
  }

  if (!response.ok) {
    const message = readFunctionErrorMessage(payload);
    if (/invalid jwt|unauthorized|认证失败|未授权/i.test(message)) {
      await supabase.auth.signOut();
      throw new Error("登录状态已失效，请重新登录后再试");
    }
    throw new Error(message || `HTTP ${response.status}`);
  }

  return ((payload as TResponse | null | undefined) ?? null) as TResponse;
}

async function invokeDocRefreshSettings(body: DocRefreshSettingsRequest): Promise<FirecrawlSettings> {
  const data = await requestDocRefreshFunction<FirecrawlSettings>("doc-refresh-settings", body);
  return data ?? EMPTY_SETTINGS;
}

async function invokeDocRefreshRun(body: TriggerDocRefreshInput): Promise<TriggerDocRefreshResult> {
  return requestDocRefreshFunction<TriggerDocRefreshResult>("doc-refresh-run", body);
}

async function invokeDocRefreshApply(body: ApplyDocRefreshDecisionRequest): Promise<void> {
  await requestDocRefreshFunction<{ success: boolean }>("doc-refresh-apply", body);
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

export async function fetchDocCatalogOverrides(scope: DocRefreshScope): Promise<DocCatalogOverrideView[]> {
  const { data, error } = await supabase
    .from("doc_catalog_overrides")
    .select("scope, vendor_id, entity_key, override_type, payload, updated_at")
    .eq("scope", scope)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    scope: row.scope as DocRefreshScope,
    vendorId: row.vendor_id,
    entityKey: row.entity_key,
    overrideType: row.override_type as "upsert" | "delete",
    payload: row.payload && typeof row.payload === "object" && !Array.isArray(row.payload)
      ? row.payload as Record<string, unknown>
      : null,
    updatedAt: row.updated_at,
  }));
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
  if (input.action === "skip") {
    throw new Error("skip 不是可应用的差异动作");
  }

  await invokeDocRefreshApply({
    itemId: input.item.id,
    action: input.action,
  });
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
