import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";
import {
  buildProviderHeaders,
  resolveProviderProbePlan,
  withGeminiApiKey,
} from "./provider-probe.ts";

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
  };
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, message: "未授权" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ success: false, message: "服务配置错误：缺少 Supabase 环境变量" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ success: false, message: "认证失败" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { type } = body; // "provider" or "mcp_server"

    if (type === "provider") {
      const result = await testProvider(body);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "mcp_server") {
      const result = await testMcpServer(body);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "未知测试类型" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const e = err instanceof Error ? err : new Error(String(err));
    return new Response(
      JSON.stringify({ success: false, message: e.message || "服务器错误" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function testProvider(body: {
  provider_type: string;
  base_url: string;
  api_key: string;
  app_type: string;
}): Promise<{ success: boolean; message: string; latency_ms?: number }> {
  const { api_key } = body;
  const start = Date.now();

  const plan = resolveProviderProbePlan(body);
  if (!plan) {
    return {
      success: false,
      message: "未配置 Base URL，无法测试连接",
      latency_ms: Date.now() - start,
    };
  }
  let lastStatus = 0;
  let lastError = "";

  for (const rawUrl of plan.candidateUrls) {
    try {
      const url = withGeminiApiKey(rawUrl, plan.authMode, api_key);
      const headers = buildProviderHeaders(plan.authMode, api_key);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      const resp = await fetch(url, {
        method: "GET",
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      await resp.text();
      const latency = Date.now() - start;
      lastStatus = resp.status;

      if (resp.status >= 200 && resp.status < 300) {
        return { success: true, message: `连接成功 (${url})`, latency_ms: latency };
      }
      if (resp.status === 401 || resp.status === 403) {
        return {
          success: false,
          message: `服务可达，但认证失败 (HTTP ${resp.status})，请检查 API Key`,
          latency_ms: latency,
        };
      }
      if (resp.status === 404) {
        // Try next candidate endpoint.
        lastError = `服务可达，但探测路径不存在 (HTTP 404): ${url}`;
        continue;
      }
      return {
        success: false,
        message: `服务返回异常状态 (HTTP ${resp.status})`,
        latency_ms: latency,
      };
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error(String(err));
      if (e.name === "AbortError") {
        lastError = "连接超时 (10s)";
      } else {
        lastError = `连接失败: ${e.message}`;
      }
      // Continue probing next candidate.
    }
  }

  return {
    success: false,
    message:
      lastError ||
      `无法连接到 ${plan.effectiveBaseUrl}${lastStatus ? ` (HTTP ${lastStatus})` : ""}，请检查地址是否正确`,
    latency_ms: Date.now() - start,
  };
}

async function testMcpServer(body: {
  transport_type: string;
  command?: string;
  url?: string;
  args?: string[];
}): Promise<{ success: boolean; message: string; latency_ms?: number }> {
  const { transport_type, url } = body;
  const start = Date.now();

  if (transport_type === "stdio") {
    // stdio type runs locally, we can only validate config completeness
    if (!body.command) {
      return { success: false, message: "未配置 Command" };
    }
    return {
      success: true,
      message: `配置有效 (stdio: ${body.command} ${(body.args || []).join(" ")})。Stdio 类型需在本地验证运行`,
      latency_ms: 0,
    };
  }

  // For HTTP/SSE, test the URL
  if (!url) {
    return { success: false, message: "未配置 URL" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const resp = await fetch(url, {
      method: transport_type === "sse" ? "GET" : "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...(transport_type !== "sse" ? { body: JSON.stringify({ jsonrpc: "2.0", method: "initialize", id: 1, params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "cc-switch-test", version: "1.0" } } }) } : {}),
    });
    clearTimeout(timeout);
    const latency = Date.now() - start;
    await resp.text();

    if (resp.status >= 200 && resp.status < 300) {
      return { success: true, message: `MCP 服务连接成功`, latency_ms: latency };
    }
    if (resp.status === 401 || resp.status === 403) {
      return { success: false, message: `认证失败 (${resp.status})`, latency_ms: latency };
    }
    return { success: true, message: `服务可达 (HTTP ${resp.status})`, latency_ms: latency };
  } catch (err: unknown) {
    const e = err instanceof Error ? err : new Error(String(err));
    const latency = Date.now() - start;
    if (e.name === "AbortError") {
      return { success: false, message: "连接超时 (10s)", latency_ms: latency };
    }
    return { success: false, message: `连接失败: ${e.message}`, latency_ms: latency };
  }
}
