const RESPONSE_SNAPSHOT_LIMIT = 20 * 1024;
const REQUEST_TIMEOUT_MS = 30000;

const SUPABASE_URL = (Deno.env.get("SUPABASE_URL") || "").trim().replace(/\/+$/, "");
const SUPABASE_ANON_KEY = (Deno.env.get("SUPABASE_ANON_KEY") || "").trim();

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

function supabaseAuthHeaders(token: string, extraHeaders?: Record<string, string>): Record<string, string> {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
    ...(extraHeaders || {}),
  };
}

async function fetchSupabaseUser(token: string): Promise<{ id: string } | null> {
  const response = await withTimeout(
    fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: "GET",
      headers: supabaseAuthHeaders(token),
    }),
    REQUEST_TIMEOUT_MS,
  );

  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  if (!data || typeof data !== "object" || typeof (data as Record<string, unknown>).id !== "string") {
    return null;
  }
  return { id: (data as Record<string, string>).id };
}

async function fetchProvider(providerId: string, token: string): Promise<ProviderConfig | null> {
  const query = new URLSearchParams({
    id: `eq.${providerId}`,
    select: "id,user_id,base_url,api_key,auth_mode,auth_header_name,enabled,defaults",
  }).toString();

  const response = await withTimeout(
    fetch(`${SUPABASE_URL}/rest/v1/api_call_providers?${query}`, {
      method: "GET",
      headers: supabaseAuthHeaders(token),
    }),
    REQUEST_TIMEOUT_MS,
  );

  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  if (!Array.isArray(data) || data.length === 0 || !isPlainObject(data[0])) {
    return null;
  }
  return data[0] as ProviderConfig;
}

async function insertHistory(token: string, record: JsonObject): Promise<void> {
  const response = await withTimeout(
    fetch(`${SUPABASE_URL}/rest/v1/api_call_history`, {
      method: "POST",
      headers: supabaseAuthHeaders(token, {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(record),
    }),
    REQUEST_TIMEOUT_MS,
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("api_call_history insert failed:", text);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: getCorsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, 405, { error: "Method not allowed" });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return jsonResponse(req, 500, { error: "Supabase environment is not configured" });
  }

  try {
    const requestBody = await req.json();
    const authHeader = req.headers.get("Authorization") || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "").trim()
      : "";
    const tokenFromBody = typeof requestBody?.access_token === "string"
      ? requestBody.access_token.trim()
      : "";
    const token = tokenFromHeader || tokenFromBody;

    if (!token) {
      return jsonResponse(req, 401, { error: "Unauthorized" });
    }

    const user = await fetchSupabaseUser(token);
    if (!user?.id) {
      return jsonResponse(req, 401, { error: "Unauthorized" });
    }
    const userId = user.id;

    const providerId = typeof requestBody?.provider_id === "string" ? requestBody.provider_id : "";
    const mode = requestBody?.mode === "custom" ? "custom" : "chat";
    const saveHistory = requestBody?.save_history !== false;
    const payload = isPlainObject(requestBody?.payload) ? requestBody.payload : {};

    if (!providerId) {
      return jsonResponse(req, 400, { error: "provider_id is required" });
    }

    const providerConfig = await fetchProvider(providerId, token);
    if (!providerConfig) {
      return jsonResponse(req, 404, { error: "Provider not found" });
    }

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
    let requestBodyPayload: unknown;
    let selectedModel: string | null = null;

    if (mode === "chat") {
      const defaultHeaders = toStringMap(defaultsObject.headers);
      const payloadHeaders = toStringMap(payloadObject.headers);
      requestHeaders = { ...defaultHeaders, ...payloadHeaders };
      requestMethod = "POST";

      const pathFromPayload = typeof payloadObject.path === "string" ? payloadObject.path : "";
      const pathFromDefaults = typeof defaultsObject.path === "string" ? defaultsObject.path : "";
      requestUrl = buildRequestUrl(providerConfig.base_url, pathFromPayload || pathFromDefaults || "/v1/chat/completions");

      const { headers, method, path, ...chatPayload } = payloadObject;
      requestBodyPayload = chatPayload;
      selectedModel = typeof chatPayload.model === "string" ? chatPayload.model : null;
    } else {
      const mergedPayload = applyDefaults(defaultsObject, payloadObject);
      requestHeaders = toStringMap(mergedPayload.headers);
      requestMethod = String(mergedPayload.method || "POST").toUpperCase();
      requestUrl = buildRequestUrl(providerConfig.base_url, String(mergedPayload.path || "/"));
      requestBodyPayload = mergedPayload.body;
      if (isPlainObject(requestBodyPayload) && typeof requestBodyPayload.model === "string") {
        selectedModel = requestBodyPayload.model;
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
      requestBodyPayload !== undefined &&
      requestBodyPayload !== null &&
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
            : requestBodyPayload === undefined || requestBodyPayload === null
              ? undefined
              : typeof requestBodyPayload === "string"
                ? requestBodyPayload
                : JSON.stringify(requestBodyPayload),
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
        payload: requestBodyPayload,
      });
      await insertHistory(token, {
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

