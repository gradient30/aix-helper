import type {
  AppType,
  ProviderEndpointCatalog,
  ProviderPresetTemplate,
  PresetVerificationResult,
  VerificationSource,
} from "./types";

const VERIFIED_AT = "2026-02-23";

function verification(
  verification_source: VerificationSource,
  source_url: string,
  verification_reason: string,
  resolved_version = "2026-02-23",
): PresetVerificationResult {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status: "pass",
    verification_reason,
    source_url,
    resolved_version,
    verification_source,
  };
}

export const APP_TYPES = ["claude", "codex", "gemini", "opencode"] as const;

export const OFFICIAL_PROVIDER_ENDPOINTS: Record<AppType, ProviderEndpointCatalog> = {
  claude: {
    app_type: "claude",
    base_url: "https://api.anthropic.com",
    models_path: "/v1/models",
    auth_mode: "anthropic",
    docs_url: "https://docs.anthropic.com/en/api/messages",
    verification: verification(
      "runtime_probe",
      "https://api.anthropic.com/v1/models",
      "官方端点可达，未授权返回 401。",
      "http_401",
    ),
  },
  codex: {
    app_type: "codex",
    base_url: "https://api.openai.com/v1",
    models_path: "/models",
    auth_mode: "bearer",
    docs_url: "https://platform.openai.com/docs/api-reference/introduction",
    verification: verification(
      "runtime_probe",
      "https://api.openai.com/v1/models",
      "官方端点可达，未授权返回 401。",
      "http_401",
    ),
  },
  gemini: {
    app_type: "gemini",
    base_url: "https://generativelanguage.googleapis.com",
    models_path: "/v1beta/models",
    auth_mode: "gemini_query",
    docs_url: "https://ai.google.dev/gemini-api/docs",
    verification: verification(
      "runtime_probe",
      "https://generativelanguage.googleapis.com/v1beta/models",
      "官方端点可达，未授权返回 403。",
      "http_403",
    ),
  },
  opencode: {
    app_type: "opencode",
    base_url: "https://api.openai.com/v1",
    models_path: "/models",
    auth_mode: "bearer",
    docs_url: "https://platform.openai.com/docs/api-reference/introduction",
    verification: verification(
      "runtime_probe",
      "https://api.openai.com/v1/models",
      "官方端点可达，未授权返回 401。",
      "http_401",
    ),
  },
};

export const PACKYCODE_BASE_URL = "https://api.packycode.com";

export const PROVIDER_PRESETS: ProviderPresetTemplate[] = [
  {
    id: "official",
    name: "Official Login",
    provider_type: "official",
    base_url: "",
    app_type: "claude",
    requires_api_key: true,
    verification: verification(
      "official_doc",
      "https://docs.anthropic.com/en/api/messages",
      "官方 Provider 模板，按 app_type 自动填充官方 base URL。",
      "catalog:v1",
    ),
  },
  {
    id: "packycode",
    name: "PackyCode",
    provider_type: "packycode",
    base_url: PACKYCODE_BASE_URL,
    app_type: "claude",
    requires_api_key: true,
    verification: verification(
      "runtime_probe",
      "https://api.packycode.com/v1/models",
      "服务端点可达并可返回 200。",
      "http_200",
    ),
  },
  {
    id: "custom",
    name: "Custom",
    provider_type: "custom",
    base_url: "",
    app_type: "claude",
    requires_api_key: false,
    verification: verification(
      "official_doc",
      "https://platform.openai.com/docs/api-reference/introduction",
      "自定义模板需用户自行提供并验证 base URL。",
      "catalog:v1",
    ),
  },
];

export function getAutoBaseUrl(providerType: string, appType: string): string {
  if (providerType === "official") {
    return OFFICIAL_PROVIDER_ENDPOINTS[appType as AppType]?.base_url || "";
  }
  if (providerType === "packycode") return PACKYCODE_BASE_URL;
  return "";
}

export function getProviderDocsUrl(appType: string): string {
  return OFFICIAL_PROVIDER_ENDPOINTS[appType as AppType]?.docs_url || "";
}

