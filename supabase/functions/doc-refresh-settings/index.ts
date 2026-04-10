import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";
import { decryptDocRefreshSecret, encryptDocRefreshSecret } from "../_shared/doc-refresh-crypto.ts";

type DocRefreshSettingsRow = {
  firecrawl_key_ciphertext: string | null;
  firecrawl_key_mask: string | null;
  firecrawl_last_verified_at: string | null;
};

const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

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
    headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
  });
}

function maskFirecrawlKey(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 6) return "***";
  return `${trimmed.slice(0, 5)}***${trimmed.slice(-2)}`;
}

function normalizeFirecrawlKey(value: string): string {
  return value.trim().replace(/^['"]+|['"]+$/g, "");
}

function toSettingsResponse(row: DocRefreshSettingsRow | null): {
  firecrawlConfigured: boolean;
  firecrawlKeyMask: string | null;
  firecrawlLastVerifiedAt: string | null;
} {
  return {
    firecrawlConfigured: Boolean(row?.firecrawl_key_ciphertext),
    firecrawlKeyMask: row?.firecrawl_key_mask ?? null,
    firecrawlLastVerifiedAt: row?.firecrawl_last_verified_at ?? null,
  };
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

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(req, 500, { success: false, message: "服务配置错误：缺少 Supabase 环境变量" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return jsonResponse(req, 401, { success: false, message: "认证失败" });
    }

    const action = typeof body?.action === "string" ? body.action : "";

    if (action === "get") {
      const { data, error } = await supabase
        .from("doc_refresh_user_settings")
        .select("firecrawl_key_ciphertext, firecrawl_key_mask, firecrawl_last_verified_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        return jsonResponse(req, 500, { success: false, message: error.message });
      }

      return jsonResponse(req, 200, toSettingsResponse(data as DocRefreshSettingsRow | null));
    }

    if (action === "save") {
      const rawKey = typeof body?.firecrawlKey === "string" ? body.firecrawlKey : "";
      const firecrawlKey = normalizeFirecrawlKey(rawKey);
      if (!firecrawlKey) {
        return jsonResponse(req, 400, { success: false, message: "Firecrawl Key 不能为空" });
      }

      const encryptedKey = await encryptDocRefreshSecret(firecrawlKey);
      const decryptedKey = await decryptDocRefreshSecret(encryptedKey);
      if (decryptedKey !== firecrawlKey) {
        return jsonResponse(req, 500, { success: false, message: "Firecrawl Key 加密校验失败" });
      }

      const { data, error } = await supabase
        .from("doc_refresh_user_settings")
        .upsert({
          user_id: user.id,
          firecrawl_key_ciphertext: encryptedKey,
          firecrawl_key_mask: maskFirecrawlKey(firecrawlKey),
        }, { onConflict: "user_id" })
        .select("firecrawl_key_ciphertext, firecrawl_key_mask, firecrawl_last_verified_at")
        .single();

      if (error) {
        return jsonResponse(req, 500, { success: false, message: error.message });
      }

      return jsonResponse(req, 200, toSettingsResponse(data as DocRefreshSettingsRow));
    }

    if (action === "clear") {
      const { error } = await supabase
        .from("doc_refresh_user_settings")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        return jsonResponse(req, 500, { success: false, message: error.message });
      }

      return jsonResponse(req, 200, {
        firecrawlConfigured: false,
        firecrawlKeyMask: null,
        firecrawlLastVerifiedAt: null,
      });
    }

    return jsonResponse(req, 400, { success: false, message: "未知操作" });
  } catch (err: unknown) {
    const e = err instanceof Error ? err : new Error(String(err));
    return jsonResponse(req, 500, { success: false, message: e.message || "服务器错误" });
  }
});
