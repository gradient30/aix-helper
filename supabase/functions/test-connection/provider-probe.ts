export type ProviderAuthMode = "anthropic" | "bearer" | "gemini_query";

export type ProviderProbeInput = {
  provider_type: string;
  base_url?: string | null;
  api_key?: string | null;
  app_type?: string | null;
};

export type ProviderProbePlan = {
  appType: string;
  effectiveBaseUrl: string;
  authMode: ProviderAuthMode;
  candidateUrls: string[];
};

export const OFFICIAL_PROVIDER_BASE_URLS: Record<string, string> = {
  claude: "https://api.anthropic.com",
  codex: "https://api.openai.com/v1",
  gemini: "https://generativelanguage.googleapis.com",
  opencode: "https://api.openai.com/v1",
};

export function resolveProviderProbePlan(input: ProviderProbeInput): ProviderProbePlan | null {
  const appType =
    typeof input.app_type === "string" && input.app_type.trim()
      ? input.app_type.trim()
      : "claude";
  const baseUrl =
    typeof input.base_url === "string" && input.base_url.trim()
      ? input.base_url.trim()
      : input.provider_type === "official"
        ? OFFICIAL_PROVIDER_BASE_URLS[appType] || ""
        : "";

  if (!baseUrl) return null;

  const authMode: ProviderAuthMode =
    appType === "gemini"
      ? "gemini_query"
      : appType === "claude"
        ? "anthropic"
        : "bearer";

  return {
    appType,
    effectiveBaseUrl: baseUrl.replace(/\/$/, ""),
    authMode,
    candidateUrls: buildProviderCandidateUrls(baseUrl, authMode),
  };
}

export function buildProviderCandidateUrls(
  baseUrl: string,
  authMode: ProviderAuthMode,
): string[] {
  const base = baseUrl.replace(/\/$/, "");
  const candidates = new Set<string>();

  if (authMode === "gemini_query") {
    candidates.add(`${base}/v1beta/models`);
  } else if (base.endsWith("/v1")) {
    candidates.add(`${base}/models`);
  } else {
    candidates.add(`${base}/v1/models`);
    candidates.add(`${base}/models`);
  }
  candidates.add(base);

  return Array.from(candidates);
}

export function buildProviderHeaders(
  authMode: ProviderAuthMode,
  apiKey?: string | null,
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authMode === "anthropic") {
    headers["anthropic-version"] = "2023-06-01";
    if (apiKey) headers["x-api-key"] = apiKey;
    return headers;
  }

  if (authMode === "bearer" && apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}

export function withGeminiApiKey(
  rawUrl: string,
  authMode: ProviderAuthMode,
  apiKey?: string | null,
): string {
  if (authMode !== "gemini_query" || !apiKey) return rawUrl;
  return `${rawUrl}${rawUrl.includes("?") ? "&" : "?"}key=${encodeURIComponent(apiKey)}`;
}
