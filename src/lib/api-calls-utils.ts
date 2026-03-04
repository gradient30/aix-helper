import type { Json } from "@/integrations/supabase/types";

export const DEFAULT_RESPONSE_SNAPSHOT_LIMIT = 20 * 1024;

export type SnippetParseResult = {
  method: string;
  url: string;
  headers: Record<string, string>;
  payload: Record<string, unknown>;
};

type PlainObject = Record<string, unknown>;

const SENSITIVE_KEY_PATTERN = /(authorization|api[-_]?key|token|secret|password|session|private|credential)/i;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function maskSensitiveString(value: string): string {
  if (!value.trim()) return value;
  if (/^bearer\s+/i.test(value)) {
    return value.replace(/^bearer\s+.+$/i, "Bearer ***");
  }
  if (value.length <= 6) return "***";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

function sanitizeJsonLikeString(raw: string): string {
  return raw
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bNone\b/g, "null")
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, "$1");
}

function extractBalancedBlock(source: string, startIndex: number, openChar: string, closeChar: string): string {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;
  let begin = -1;

  for (let i = startIndex; i < source.length; i += 1) {
    const char = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }

    if (inSingle || inDouble) continue;

    if (char === openChar) {
      if (depth === 0) begin = i;
      depth += 1;
    } else if (char === closeChar) {
      depth -= 1;
      if (depth === 0 && begin >= 0) {
        return source.slice(begin, i + 1);
      }
      if (depth < 0) break;
    }
  }

  return "";
}

function extractAssignmentBlock(snippet: string, variableName: string): string {
  const re = new RegExp(`\\b${variableName}\\s*=`, "i");
  const match = re.exec(snippet);
  if (!match) return "";

  const eqIndex = match.index + match[0].length;
  const rest = snippet.slice(eqIndex);
  const braceOffset = rest.search(/[{[]/);
  if (braceOffset < 0) return "";

  const startIndex = eqIndex + braceOffset;
  const opener = snippet[startIndex];
  const closer = opener === "{" ? "}" : "]";
  return extractBalancedBlock(snippet, startIndex, opener, closer);
}

function parseJsonObject(raw: string, fallbackLabel: string): Record<string, unknown> {
  if (!raw.trim()) return {};
  const sanitized = sanitizeJsonLikeString(raw);
  try {
    const parsed = JSON.parse(sanitized);
    return isPlainObject(parsed) ? parsed : {};
  } catch (error) {
    throw new Error(`${fallbackLabel} parse failed: ${(error as Error).message}`);
  }
}

function parseJsonValue(raw: string, fallbackLabel: string): unknown {
  const sanitized = sanitizeJsonLikeString(raw);
  try {
    return JSON.parse(sanitized);
  } catch (error) {
    throw new Error(`${fallbackLabel} parse failed: ${(error as Error).message}`);
  }
}

function splitShellTokens(input: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }

    if (!inSingle && !inDouble && /\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (current) tokens.push(current);
  return tokens;
}

export function parsePythonRequestsSnippet(snippet: string): SnippetParseResult {
  const normalized = snippet.replace(/\r\n/g, "\n");
  const urlMatch = normalized.match(/\burl\s*=\s*["']([^"']+)["']/i);
  const url = urlMatch?.[1]?.trim() ?? "";
  if (!url) {
    throw new Error("Python snippet missing url assignment");
  }

  const methodMatch = normalized.match(/requests\.(get|post|put|patch|delete)\s*\(/i);
  const method = (methodMatch?.[1] || "post").toUpperCase();

  const headersBlock = extractAssignmentBlock(normalized, "headers");
  const payloadBlock = extractAssignmentBlock(normalized, "data");
  const headers = parseJsonObject(headersBlock, "headers") as Record<string, string>;
  const payload = parseJsonObject(payloadBlock, "data");

  return { method, url, headers, payload };
}

export function parseCurlSnippet(snippet: string): SnippetParseResult {
  const normalized = snippet.replace(/\\\r?\n/g, " ").trim();
  if (!normalized.startsWith("curl")) {
    throw new Error("Snippet is not a curl command");
  }

  const tokens = splitShellTokens(normalized);
  const headers: Record<string, string> = {};
  let method = "GET";
  let bodyRaw = "";
  let url = "";

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];

    if ((token === "-X" || token === "--request") && tokens[i + 1]) {
      method = tokens[i + 1].toUpperCase();
      i += 1;
      continue;
    }

    if ((token === "-H" || token === "--header") && tokens[i + 1]) {
      const header = tokens[i + 1];
      const splitAt = header.indexOf(":");
      if (splitAt > 0) {
        const key = header.slice(0, splitAt).trim();
        const value = header.slice(splitAt + 1).trim();
        headers[key] = value;
      }
      i += 1;
      continue;
    }

    if (
      (token === "-d" || token === "--data" || token === "--data-raw" || token === "--data-binary") &&
      tokens[i + 1]
    ) {
      bodyRaw = tokens[i + 1];
      if (method === "GET") method = "POST";
      i += 1;
      continue;
    }

    if (/^https?:\/\//i.test(token)) {
      url = token;
    }
  }

  if (!url) {
    throw new Error("curl snippet missing request URL");
  }

  const payload = bodyRaw ? (parseJsonValue(bodyRaw, "body") as Record<string, unknown>) : {};
  return { method, url, headers, payload };
}

export function maskSensitiveObject<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => maskSensitiveObject(item)) as T;
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const next: PlainObject = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string" && SENSITIVE_KEY_PATTERN.test(key)) {
      next[key] = maskSensitiveString(entry);
      continue;
    }

    if (typeof entry === "string" && /^bearer\s+/i.test(entry)) {
      next[key] = maskSensitiveString(entry);
      continue;
    }

    next[key] = maskSensitiveObject(entry);
  }
  return next as T;
}

export function toResponseSnapshot(value: unknown, limit = DEFAULT_RESPONSE_SNAPSHOT_LIMIT): string {
  const text =
    typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.slice(0, Math.max(0, limit));
}

export function applyDefaults(
  defaults: Record<string, unknown> | null | undefined,
  payload: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  const base = defaults && isPlainObject(defaults) ? defaults : {};
  const override = payload && isPlainObject(payload) ? payload : {};
  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const baseValue = merged[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      merged[key] = applyDefaults(baseValue, value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

export function toJson(value: unknown): Json {
  return (maskSensitiveObject(value) ?? null) as Json;
}

export function normalizeApiKey(value: string): string {
  let normalized = value.trim();
  normalized = normalized.replace(/^['"]+|['"]+$/g, "");
  normalized = normalized.replace(/^bearer\s+/i, "");
  return normalized.trim();
}

type ResolveConversationScopeArgs = {
  selectedVendorId: string;
  selectedProviderId: string;
  selectedProviderObjectId: string;
  hasProviderCandidates: boolean;
  lastScope: string;
};

export function resolveConversationScope({
  selectedVendorId,
  selectedProviderId,
  selectedProviderObjectId,
  hasProviderCandidates,
  lastScope,
}: ResolveConversationScopeArgs): string {
  if (!hasProviderCandidates) {
    return `${selectedVendorId}:new`;
  }

  const providerIdFromState = selectedProviderObjectId.trim() || selectedProviderId.trim();
  if (providerIdFromState) {
    return `${selectedVendorId}:${providerIdFromState}`;
  }

  const [lastVendor = "", lastProvider = ""] = lastScope.split(":", 2);
  if (lastVendor === selectedVendorId && lastProvider && lastProvider !== "new") {
    return `${selectedVendorId}:${lastProvider}`;
  }

  return `${selectedVendorId}:new`;
}
