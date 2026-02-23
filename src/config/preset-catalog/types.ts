export type AppType = "claude" | "codex" | "gemini" | "opencode";

export type PresetVerificationStatus = "pass" | "warn" | "fail";

export type VerificationSource =
  | "official_doc"
  | "official_repo"
  | "registry"
  | "runtime_probe";

export type McpInstallMethod = "npx" | "uvx" | "docker" | "remote";

export type PresetVerificationResult = {
  last_verified_at: string;
  verification_status: PresetVerificationStatus;
  verification_reason: string;
  source_url: string;
  resolved_version: string;
  verification_source: VerificationSource;
};

export type ProviderPresetTemplate = {
  id: "official" | "packycode" | "custom";
  name: string;
  provider_type: string;
  base_url: string;
  app_type: AppType;
  requires_api_key: boolean;
  verification: PresetVerificationResult;
};

export type ProviderEndpointCatalog = {
  app_type: AppType;
  base_url: string;
  models_path: string;
  auth_mode: "anthropic" | "bearer" | "gemini_query";
  docs_url: string;
  verification: PresetVerificationResult;
};

export type McpPresetTemplate = {
  name: string;
  transport_type: "stdio" | "http" | "sse";
  command: string;
  args: string[];
  desc: string;
  install_method: McpInstallMethod;
  source_url: string;
  reference_tier: "production" | "reference";
  verification: PresetVerificationResult;
};

export type McpPresetGroup = {
  label: string;
  items: McpPresetTemplate[];
};

export type SkillsRepoKind = "skill_bundle" | "reference_repo";

export type SkillsRepoPreset = {
  owner: string;
  repo: string;
  branch?: string;
  desc: string;
  repo_kind: SkillsRepoKind;
  source_url: string;
  verification: PresetVerificationResult;
};
