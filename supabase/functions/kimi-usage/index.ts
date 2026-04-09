import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

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
      "authorization, x-client-info, apikey, content-type, cache-control",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: Record<string, unknown> = {};
    if (req.method === "POST") {
      body = await req.json().catch(() => ({}));
    }

    const authHeader = req.headers.get("authorization") || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "").trim()
      : "";
    const tokenFromBody = typeof body.access_token === "string"
      ? body.access_token.trim()
      : "";
    const token = tokenFromHeader || tokenFromBody;

    if (!token) {
      return new Response(JSON.stringify({ error: "未授权" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: "服务配置错误" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "认证失败" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const apiKeyFromQuery = url.searchParams.get("apiKey")?.trim() || "";
    const apiKeyFromBody = typeof body.apiKey === "string"
      ? body.apiKey.trim()
      : "";
    const apiKey = apiKeyFromBody || apiKeyFromQuery;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "缺少 API Key 参数" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const kimiResp = await fetch("https://api.kimi.com/coding/v1/usages", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Cache-Control": "no-cache",
      },
    });

    const kimiData = await kimiResp.json();

    if (!kimiResp.ok) {
      return new Response(JSON.stringify(kimiData), {
        status: kimiResp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(kimiData), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: unknown) {
    const e = err instanceof Error ? err : new Error(String(err));
    return new Response(
      JSON.stringify({ error: e.message || "服务器错误" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
