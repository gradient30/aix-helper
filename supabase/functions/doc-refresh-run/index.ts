import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

import { buildDocRefreshRunArtifacts } from "../../../src/features/docs-refresh/run-artifacts.ts";
import { buildDocRefreshSourcePlan } from "../../../src/features/docs-refresh/source-plan.ts";
import { summarizeDocRefreshRun } from "../../../src/features/docs-refresh/run-summary.ts";
import { decryptDocRefreshSecret } from "../_shared/doc-refresh-crypto.ts";

type SourceMode = "official_fetch" | "firecrawl_manual";
type Scope = "cli" | "skills" | "setup" | "help";

type DocRefreshRunRequest = {
  sourceMode: SourceMode;
  scope: Scope;
  pageRoute?: string;
  vendorIds?: string[];
};

type DocRefreshSettingsRow = {
  firecrawl_key_ciphertext: string | null;
};

type SourceJob = {
  vendorId: string;
  pageRoute: string;
  sourceUrl: string;
};

type SuccessfulSnapshot = SourceJob & {
  rawMarkdown: string;
  contentHash: string;
};

const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const JSON_HEADERS = { "Content-Type": "application/json" };
const REQUEST_TIMEOUT_MS = 30_000;
const OFFICIAL_FETCH_PROXY = "https://r.jina.ai/http://";

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin =
    ALLOWED_ORIGINS.length === 0
      ? origin || "*"
      : ALLOWED_ORIGINS.includes(origin)
        ? origin
        : "null";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(req: Request, status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...getCorsHeaders(req), ...JSON_HEADERS },
  });
}

function normalizeRequest(body: unknown): DocRefreshRunRequest | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;

  const sourceMode = record.sourceMode;
  const scope = record.scope;
  if (
    (sourceMode !== "official_fetch" && sourceMode !== "firecrawl_manual") ||
    (scope !== "cli" && scope !== "skills" && scope !== "setup" && scope !== "help")
  ) {
    return null;
  }

  return {
    sourceMode,
    scope,
    pageRoute: typeof record.pageRoute === "string" ? record.pageRoute : undefined,
    vendorIds: Array.isArray(record.vendorIds)
      ? record.vendorIds.filter((value): value is string => typeof value === "string")
      : [],
  };
}

function defaultPageRouteForScope(scope: Scope): string {
  switch (scope) {
    case "cli":
      return "/cli-guide";
    case "skills":
      return "/skills-guide";
    case "setup":
      return "/setup-guide";
    case "help":
      return "/providers";
  }
}

function toSnapshotVendorId(job: { vendorId: string | null; pageRoute: string | null }): string {
  if (job.vendorId) return job.vendorId;
  if (!job.pageRoute) return "help";
  return `page:${job.pageRoute.replace(/^\/+/, "")}`;
}

function buildSourceJobs(input: DocRefreshRunRequest): SourceJob[] {
  const pageRoute = input.pageRoute || defaultPageRouteForScope(input.scope);

  return buildDocRefreshSourcePlan({
    scope: input.scope,
    pageRoute,
    vendorIds: input.vendorIds || [],
  }).flatMap((entry) =>
    entry.sourceUrls.map((sourceUrl) => ({
      vendorId: toSnapshotVendorId({ vendorId: entry.vendorId, pageRoute: entry.pageRoute }),
      pageRoute: entry.pageRoute || pageRoute,
      sourceUrl,
    }))
  );
}

async function hashContent(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchOfficialMarkdown(sourceUrl: string): Promise<string> {
  const proxyUrl = `${OFFICIAL_FETCH_PROXY}${sourceUrl.replace(/^https?:\/\//, "")}`;
  const proxiedResponse = await fetchWithTimeout(proxyUrl, {
    headers: { "User-Agent": "aix-helper-doc-refresh/1.0" },
  });
  const proxiedText = await proxiedResponse.text();
  if (proxiedResponse.ok && proxiedText.trim()) {
    return proxiedText;
  }

  const directResponse = await fetchWithTimeout(sourceUrl, {
    headers: { "User-Agent": "aix-helper-doc-refresh/1.0" },
  });
  if (!directResponse.ok) {
    throw new Error(`Official fetch failed with HTTP ${directResponse.status}`);
  }
  return await directResponse.text();
}

async function fetchFirecrawlMarkdown(sourceUrl: string, firecrawlKey: string): Promise<string> {
  const response = await fetchWithTimeout("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      ...JSON_HEADERS,
    },
    body: JSON.stringify({
      url: sourceUrl,
      formats: ["markdown"],
      onlyMainContent: true,
      timeout: REQUEST_TIMEOUT_MS,
    }),
  });

  const data = await response.json().catch(() => null) as
    | { success?: boolean; data?: { markdown?: string }; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(data?.error || `Firecrawl scrape failed with HTTP ${response.status}`);
  }

  const markdown = data?.data?.markdown;
  if (!markdown?.trim()) {
    throw new Error("Firecrawl scrape returned empty markdown");
  }

  return markdown;
}

async function loadFirecrawlKey(supabase: ReturnType<typeof createClient>, userId: string): Promise<string> {
  const { data, error } = await supabase
    .from("doc_refresh_user_settings")
    .select("firecrawl_key_ciphertext")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const settings = data as DocRefreshSettingsRow | null;
  if (!settings?.firecrawl_key_ciphertext) {
    throw new Error("Firecrawl Key 未配置");
  }

  return decryptDocRefreshSecret(settings.firecrawl_key_ciphertext);
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, 405, { success: false, message: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return jsonResponse(req, 401, { success: false, message: "未授权" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(req, 500, { success: false, message: "服务配置错误：缺少 Supabase 环境变量" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return jsonResponse(req, 401, { success: false, message: "认证失败" });
    }

    const requestBody = normalizeRequest(await req.json().catch(() => null));
    if (!requestBody) {
      return jsonResponse(req, 400, { success: false, message: "无效的刷新请求" });
    }

    const sourceJobs = buildSourceJobs(requestBody);
    if (sourceJobs.length === 0) {
      return jsonResponse(req, 400, { success: false, message: "未解析到可抓取的文档源" });
    }

    const pageRoute = requestBody.pageRoute || defaultPageRouteForScope(requestBody.scope);
    const firecrawlKey = requestBody.sourceMode === "firecrawl_manual"
      ? await loadFirecrawlKey(supabase, user.id)
      : null;

    const { data: runRow, error: runInsertError } = await supabase
      .from("doc_refresh_runs")
      .insert({
        user_id: user.id,
        source_mode: requestBody.sourceMode,
        scope: requestBody.scope,
        page_route: pageRoute,
        vendor_ids: requestBody.vendorIds || [],
        status: "running",
        summary_counts: {
          totalSources: sourceJobs.length,
          successfulSnapshots: 0,
          failedSources: 0,
        },
      })
      .select("id")
      .single();

    if (runInsertError || !runRow?.id) {
      return jsonResponse(req, 500, { success: false, message: runInsertError?.message || "创建刷新任务失败" });
    }

    const runId = runRow.id as string;

    const failures: Array<{ sourceUrl: string; message: string }> = [];
    const successfulSnapshots: SuccessfulSnapshot[] = [];

    for (const job of sourceJobs) {
      try {
        const rawMarkdown = requestBody.sourceMode === "firecrawl_manual"
          ? await fetchFirecrawlMarkdown(job.sourceUrl, firecrawlKey!)
          : await fetchOfficialMarkdown(job.sourceUrl);

        const contentHash = await hashContent(rawMarkdown);
        successfulSnapshots.push({
          ...job,
          rawMarkdown,
          contentHash,
        });
      } catch (error) {
        failures.push({
          sourceUrl: job.sourceUrl,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    if (successfulSnapshots.length > 0) {
      const artifacts = buildDocRefreshRunArtifacts({
        runId,
        userId: user.id,
        scope: requestBody.scope,
        pageRoute,
        sourceMode: requestBody.sourceMode,
        snapshots: successfulSnapshots.map((snapshot) => ({
          vendorId: snapshot.vendorId,
          pageRoute: snapshot.pageRoute,
          sourceUrl: snapshot.sourceUrl,
          rawMarkdown: snapshot.rawMarkdown,
        })),
      });

      const snapshotRows = artifacts.snapshotRows.map((snapshot, index) => ({
        user_id: user.id,
        run_id: runId,
        scope: requestBody.scope,
        vendor_id: snapshot.vendorId,
        source_url: snapshot.sourceUrl,
        raw_markdown: snapshot.rawMarkdown,
        normalized_payload: snapshot.normalizedPayload,
        content_hash: successfulSnapshots[index].contentHash,
      }));

      const { error: snapshotInsertError } = await supabase
        .from("doc_refresh_snapshots")
        .insert(snapshotRows);

      if (snapshotInsertError) {
        throw new Error(snapshotInsertError.message);
      }

      if (artifacts.diffRows.length > 0) {
        const { error: diffInsertError } = await supabase
          .from("doc_refresh_diff_items")
          .insert(artifacts.diffRows);

        if (diffInsertError) {
          throw new Error(diffInsertError.message);
        }
      }
    }

    const runSummary = summarizeDocRefreshRun({
      totalSources: sourceJobs.length,
      successfulSnapshots: successfulSnapshots.length,
      failedSources: failures.length,
    });

    if (requestBody.sourceMode === "firecrawl_manual" && successfulSnapshots.length > 0) {
      const { error: settingsUpdateError } = await supabase
        .from("doc_refresh_user_settings")
        .update({
          firecrawl_last_verified_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (settingsUpdateError) {
        console.warn("Failed to update Firecrawl verification timestamp:", settingsUpdateError.message);
      }
    }

    const failureMessage = failures.length > 0
      ? failures.map((failure) => `${failure.sourceUrl}: ${failure.message}`).join("\n")
      : null;

    const { error: updateError } = await supabase
      .from("doc_refresh_runs")
      .update({
        status: runSummary.status,
        finished_at: new Date().toISOString(),
        summary_counts: runSummary.summaryCounts,
        error_message: failureMessage,
      })
      .eq("id", runId)
      .eq("user_id", user.id);

    if (updateError) {
      return jsonResponse(req, 500, { success: false, message: updateError.message });
    }

    return jsonResponse(req, 200, {
      success: runSummary.success,
      runId,
      status: runSummary.status,
      summaryCounts: runSummary.summaryCounts,
      pageRoute,
      failures,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse(req, 500, { success: false, message });
  }
});
