import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESPONSE_SNAPSHOT_LIMIT = 20 * 1024;
const REQUEST_TIMEOUT_MS = 30000;

const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

type JsonObject = Record<string, unknown>;

type ProviderConfig = {
  id: string;
  user_id: string;
  base_url: string;
  api_key: string;
  auth_mode: string;
  auth_header_name: string | null;
  enabled: boolean;
  defaults: unknown;
};

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

function jsonResponse(req: Request, status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
  });
}

function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function applyDefaults(defaults: unknown, payload: unknown): JsonObject {
  const base = isPlainObject(defaults) ? defaults : {};
  const override = isPlainObject(payload) ? payload : {};
  const merged: JsonObject = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = applyDefaults(merged[key], value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

function buildRequestUrl(baseUrl: string, pathOrUrl: string): string {
  const raw = (pathOrUrl || "").trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = raw.startsWith("/") ? raw.slice(1) : raw;
  return new URL(normalizedPath || "", normalizedBase).toString();
}

function toStringMap(raw: unknown): Record<string, string> {
  if (!isPlainObject(raw)) return {};
  const output: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") output[key] = value;
  }
  return output;
}

function toSnapshot(value: unknown): string {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  if (!text) return "";
  if (text.length <= RESPONSE_SNAPSHOT_LIMIT) return text;
  return text.slice(0, RESPONSE_SNAPSHOT_LIMIT);
}

function maskString(value: string): string {
  if (/^bearer\s+/i.test(value)) {
    return "Bearer ***";
  }
  if (value.length <= 6) return "***";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

function normalizeApiKey(value: string): string {
  let normalized = value.trim();
  normalized = normalized.replace(/^['"]+|['"]+$/g, "");
  normalized = normalized.replace(/^bearer\s+/i, "");
  return normalized.trim();
}

function maskSensitive(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => maskSensitive(item));
  if (!isPlainObject(value)) return value;

  const sensitive = /(authorization|api[-_]?key|token|secret|password|credential|session)/i;
  const next: JsonObject = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string" && sensitive.test(key)) {
      next[key] = maskString(entry);
      continue;
    }
    if (typeof entry === "string" && /^bearer\s+/i.test(entry)) {
      next[key] = "Bearer ***";
      continue;
    }
    next[key] = maskSensitive(entry);
  }
  return next;
}

function parseTextResponse(responseText: string): unknown {
  if (!responseText.trim()) return {};
  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
}

function normalizeResult(raw: unknown): JsonObject {
  if (!isPlainObject(raw)) {
    return { text: typeof raw === "string" ? raw : JSON.stringify(raw) };
  }

  const openAi = raw.choices;
  if (Array.isArray(openAi) && openAi.length > 0 && isPlainObject(openAi[0])) {
    const message = openAi[0].message;
    if (isPlainObject(message) && typeof message.content === "string") {
      return {
        text: message.content,
        model: typeof raw.model === "string" ? raw.model : null,
        finish_reason: openAi[0].finish_reason ?? null,
      };
    }
  }

  const anthropicContent = raw.content;
  if (Array.isArray(anthropicContent)) {
    const textBlocks = anthropicContent
      .filter((item) => isPlainObject(item) && typeof item.text === "string")
      .map((item) => String((item as JsonObject).text));
    if (textBlocks.length > 0) {
      return {
        text: textBlocks.join("\n"),
        model: typeof raw.model === "string" ? raw.model : null,
      };
    }
  }

  const candidates = raw.candidates;
  if (Array.isArray(candidates) && candidates.length > 0) {
    return { text: JSON.stringify(candidates) };
  }

  return { text: JSON.stringify(raw) };
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Upstream request timeout")), timeoutMs);
    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse(req, 401, { error: "Unauthorized" });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return jsonResponse(req, 401, { error: "Unauthorized" });
    }
    const userId = claimsData.claims.sub;

    const body = await req.json();
    const providerId = typeof body?.provider_id === "string" ? body.provider_id : "";
    const mode = body?.mode === "custom" ? "custom" : "chat";
    const saveHistory = body?.save_history !== false;
    const payload = isPlainObject(body?.payload) ? body.payload : {};

    if (!providerId) {
      return jsonResponse(req, 400, { error: "provider_id is required" });
    }

    const { data: provider, error: providerError } = await supabase
      .from("api_call_providers")
      .select("id,user_id,base_url,api_key,auth_mode,auth_header_name,enabled,defaults")
      .eq("id", providerId)
      .single();

    if (providerError || !provider) {
      return jsonResponse(req, 404, { error: "Provider not found" });
    }

    const providerConfig = provider as ProviderConfig;
    if (providerConfig.user_id !== userId) {
      return jsonResponse(req, 403, { error: "Forbidden provider access" });
    }

    if (!providerConfig.enabled) {
      return jsonResponse(req, 400, { error: "Provider is disabled" });
    }

    const providerApiKey = normalizeApiKey(providerConfig.api_key || "");
    if (!providerApiKey) {
      return jsonResponse(req, 400, { error: "Provider api_key is empty or invalid" });
    }

    const defaultsObject = isPlainObject(providerConfig.defaults) ? providerConfig.defaults : {};
    const payloadObject = isPlainObject(payload) ? payload : {};

    let requestHeaders: Record<string, string> = {};
    let requestMethod = "POST";
    let requestUrl = "";
    let requestBody: unknown;
    let selectedModel: string | null = null;

    if (mode === "chat") {
      // Chat mode should forward the user payload as-is to avoid accidental provider incompatibilities.
      const defaultHeaders = toStringMap(defaultsObject.headers);
      const payloadHeaders = toStringMap(payloadObject.headers);
      requestHeaders = { ...defaultHeaders, ...payloadHeaders };
      requestMethod = "POST";

      const pathFromPayload = typeof payloadObject.path === "string" ? payloadObject.path : "";
      const pathFromDefaults = typeof defaultsObject.path === "string" ? defaultsObject.path : "";
      requestUrl = buildRequestUrl(providerConfig.base_url, pathFromPayload || pathFromDefaults || "/v1/chat/completions");

      const { headers, method, path, ...chatPayload } = payloadObject;
      requestBody = chatPayload;
      selectedModel = typeof chatPayload.model === "string" ? chatPayload.model : null;
    } else {
      const mergedPayload = applyDefaults(defaultsObject, payloadObject);
      requestHeaders = toStringMap(mergedPayload.headers);
      requestMethod = String(mergedPayload.method || "POST").toUpperCase();
      requestUrl = buildRequestUrl(providerConfig.base_url, String(mergedPayload.path || "/"));
      requestBody = mergedPayload.body;
      if (isPlainObject(requestBody) && typeof requestBody.model === "string") {
        selectedModel = requestBody.model;
      }
    }

    switch (providerConfig.auth_mode) {
      case "x-api-key":
        requestHeaders["x-api-key"] = providerApiKey;
        break;
      case "query-key": {
        const queryKeyName = providerConfig.auth_header_name?.trim() || "api_key";
        const url = new URL(requestUrl);
        url.searchParams.set(queryKeyName, providerApiKey);
        requestUrl = url.toString();
        break;
      }
      case "custom-header": {
        const headerName = providerConfig.auth_header_name?.trim() || "X-API-Key";
        requestHeaders[headerName] = providerApiKey;
        break;
      }
      case "bearer":
      default:
        requestHeaders.Authorization = `Bearer ${providerApiKey}`;
        break;
    }

    if (
      requestBody !== undefined &&
      requestBody !== null &&
      !requestHeaders["Content-Type"] &&
      !requestHeaders["content-type"]
    ) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const started = Date.now();
    const upstreamResponse = await withTimeout(
      fetch(requestUrl, {
        method: requestMethod,
        headers: requestHeaders,
        body:
          requestMethod === "GET" || requestMethod === "HEAD"
            ? undefined
            : requestBody === undefined || requestBody === null
              ? undefined
              : typeof requestBody === "string"
                ? requestBody
                : JSON.stringify(requestBody),
      }),
      REQUEST_TIMEOUT_MS,
    );
    const latencyMs = Date.now() - started;

    const responseText = await upstreamResponse.text();
    const parsedResponse = parseTextResponse(responseText);
    const normalized = normalizeResult(parsedResponse);
    const success = upstreamResponse.ok;
    const errorMessage = success
      ? null
      : typeof parsedResponse === "string"
        ? parsedResponse
        : toSnapshot(parsedResponse);

    if (saveHistory) {
      const requestSnapshot = maskSensitive({
        mode,
        method: requestMethod,
        url: requestUrl,
        headers: requestHeaders,
        payload: requestBody,
      });
      const { error: historyError } = await supabase.from("api_call_history").insert({
        user_id: userId,
        provider_id: providerId,
        request_mode: mode,
        selected_model: selectedModel,
        request_snapshot: requestSnapshot,
        response_status: upstreamResponse.status,
        latency_ms: latencyMs,
        success,
        response_snapshot: toSnapshot(parsedResponse),
        error_message: errorMessage,
      });

      if (historyError) {
        console.error("api_call_history insert failed:", historyError.message);
      }
    }

    return jsonResponse(req, success ? 200 : upstreamResponse.status, {
      success,
      status: upstreamResponse.status,
      latency_ms: latencyMs,
      normalized,
      raw: toSnapshot(parsedResponse),
      error_message: errorMessage,
    });
  } catch (error) {
    console.error("invoke-model-api error:", error);
    return jsonResponse(req, 500, {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
