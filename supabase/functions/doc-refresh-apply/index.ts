import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

type ReviewAction = "replace_all" | "replace_similar" | "delete_old";

type ApplyDecisionRequest = {
  itemId: string;
  action: ReviewAction;
};

type DiffItemRow = {
  id: string;
  run_id: string;
  scope: string;
  vendor_id: string;
  entity_key: string;
  baseline_payload: unknown;
  candidate_payload: unknown;
  review_action: string;
  review_status: string;
};

const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const JSON_HEADERS = { "Content-Type": "application/json" };

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

function normalizeRequest(body: unknown): ApplyDecisionRequest | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const itemId = typeof record.itemId === "string" ? record.itemId.trim() : "";
  const action = record.action;

  if (!itemId) return null;
  if (action !== "replace_all" && action !== "replace_similar" && action !== "delete_old") {
    return null;
  }

  return { itemId, action };
}

function toPayloadRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function toEntityKey(payload: Record<string, unknown> | null, fallback: string): string {
  const entityKey = payload?.entityKey;
  return typeof entityKey === "string" && entityKey ? entityKey : fallback;
}

function buildOverrideRows(item: DiffItemRow, action: ReviewAction, userId: string) {
  const candidatePayload = toPayloadRecord(item.candidate_payload);
  const baselinePayload = toPayloadRecord(item.baseline_payload);
  const candidateEntityKey = toEntityKey(candidatePayload, item.entity_key);
  const baselineEntityKey = toEntityKey(baselinePayload, item.entity_key);

  if (action === "replace_all") {
    return [
      {
        scope: item.scope,
        vendor_id: item.vendor_id,
        entity_key: candidateEntityKey,
        override_type: "upsert",
        payload: {
          ...(candidatePayload ?? {}),
          entityKey: candidateEntityKey,
        },
        source_run_id: item.run_id,
        applied_by: userId,
      },
    ];
  }

  if (action === "replace_similar") {
    const rows = [
      {
        scope: item.scope,
        vendor_id: item.vendor_id,
        entity_key: baselineEntityKey,
        override_type: "delete",
        payload: {},
        source_run_id: item.run_id,
        applied_by: userId,
      },
      {
        scope: item.scope,
        vendor_id: item.vendor_id,
        entity_key: candidateEntityKey,
        override_type: "upsert",
        payload: {
          ...(candidatePayload ?? {}),
          entityKey: candidateEntityKey,
        },
        source_run_id: item.run_id,
        applied_by: userId,
      },
    ];

    return baselineEntityKey === candidateEntityKey ? rows.slice(1) : rows;
  }

  return [
    {
      scope: item.scope,
      vendor_id: item.vendor_id,
      entity_key: baselineEntityKey,
      override_type: "delete",
      payload: {},
      source_run_id: item.run_id,
      applied_by: userId,
    },
  ];
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
    const body = await req.json().catch(() => null);
    const authHeader = req.headers.get("authorization") || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "").trim()
      : "";
    const tokenFromBody = typeof body?.access_token === "string"
      ? body.access_token.trim()
      : "";
    const token = tokenFromHeader || tokenFromBody;

    if (!token) {
      return jsonResponse(req, 401, { success: false, message: "未授权" });
    }

    const requestBody = normalizeRequest(body);
    if (!requestBody) {
      return jsonResponse(req, 400, { success: false, message: "无效的差异应用请求" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return jsonResponse(req, 500, { success: false, message: "服务配置错误：缺少 Supabase 环境变量" });
    }

    const authedClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    const { data: { user }, error: authError } = await authedClient.auth.getUser();
    if (authError || !user) {
      return jsonResponse(req, 401, { success: false, message: "认证失败" });
    }

    const { data: diffItem, error: diffError } = await authedClient
      .from("doc_refresh_diff_items")
      .select("id, run_id, scope, vendor_id, entity_key, baseline_payload, candidate_payload, review_action, review_status")
      .eq("id", requestBody.itemId)
      .maybeSingle();

    if (diffError) {
      return jsonResponse(req, 500, { success: false, message: diffError.message });
    }

    if (!diffItem) {
      return jsonResponse(req, 404, { success: false, message: "差异项不存在或无访问权限" });
    }

    const item = diffItem as DiffItemRow;
    if (item.review_status === "applied" && item.review_action === requestBody.action) {
      return jsonResponse(req, 200, { success: true, alreadyApplied: true });
    }

    if (item.review_status !== "pending") {
      return jsonResponse(req, 409, { success: false, message: "该差异项已处理，请刷新后再试" });
    }

    const overrideRows = buildOverrideRows(item, requestBody.action, user.id);
    if (overrideRows.length > 0) {
      const { error: overrideError } = await serviceClient
        .from("doc_catalog_overrides")
        .upsert(overrideRows, { onConflict: "scope,vendor_id,entity_key" });

      if (overrideError) {
        return jsonResponse(req, 500, { success: false, message: overrideError.message });
      }
    }

    const { error: updateError } = await serviceClient
      .from("doc_refresh_diff_items")
      .update({
        review_action: requestBody.action,
        review_status: "applied",
        resolved_at: new Date().toISOString(),
      })
      .eq("id", item.id)
      .eq("user_id", user.id);

    if (updateError) {
      return jsonResponse(req, 500, { success: false, message: updateError.message });
    }

    return jsonResponse(req, 200, { success: true });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return jsonResponse(req, 500, { success: false, message: error.message || "服务器错误" });
  }
});
