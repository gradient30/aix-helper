import type { Json, Tables } from "@/integrations/supabase/types";

export type Provider = Tables<"providers">;
export type McpServer = Tables<"mcp_servers">;
export type Prompt = Tables<"prompts">;
export type Skill = Tables<"skills">;
export type SkillsRepo = Tables<"skills_repos">;

export type AppType = "claude" | "codex" | "gemini" | "opencode";

export type DeepLinkProviderPayload = Pick<
  Provider,
  "name" | "provider_type" | "base_url" | "app_type"
>;

type JsonRecord = Record<string, Json | undefined>;

export type StdioMcpConfig = {
  command: string;
  args: string[];
  env?: Record<string, string>;
};

export type RemoteMcpConfig = {
  type: "http" | "sse";
  url: string;
};

export type McpServerConfig = StdioMcpConfig | RemoteMcpConfig;

export type McpServersObject = Record<string, McpServerConfig>;

export type ClaudeSettings = {
  $schema: string;
  env?: Record<string, string>;
  model?: string;
  permissions: {
    allow: string[];
    deny: string[];
  };
  mcpServers?: McpServersObject;
};

export type ExportStats = {
  enabledMcps: McpServer[];
  installedSkills: Skill[];
  enabledProviders: Provider[];
};

function isJsonRecord(value: Json | null): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function escapeTomlString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatTomlKey(key: string): string {
  return /^[A-Za-z0-9_-]+$/.test(key) ? key : `"${escapeTomlString(key)}"`;
}

function getModelFromConfig(config: Json | null): string | undefined {
  if (!isJsonRecord(config)) return undefined;
  const model = config.model;
  return typeof model === "string" && model.trim() ? model : undefined;
}

export function toStringArray(value: Json | null): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function toStringRecord(value: Json | null): Record<string, string> {
  if (!isJsonRecord(value)) return {};

  const pairs = Object.entries(value).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  return Object.fromEntries(pairs) as Record<string, string>;
}

export function buildMcpServersObject(mcps: McpServer[]): McpServersObject {
  const result: McpServersObject = {};

  mcps.forEach((server) => {
    const name = server.name.trim();
    if (!name) return;

    if (server.transport_type === "stdio") {
      if (!server.command?.trim()) return;
      const entry: StdioMcpConfig = {
        command: server.command,
        args: toStringArray(server.args),
      };
      const env = toStringRecord(server.env);
      if (Object.keys(env).length > 0) {
        entry.env = env;
      }
      result[name] = entry;
      return;
    }

    if (
      (server.transport_type === "http" || server.transport_type === "sse") &&
      server.url?.trim()
    ) {
      result[name] = {
        type: server.transport_type,
        url: server.url,
      };
    }
  });

  return result;
}

export function buildClaudeSettingsJson(
  mcps: McpServer[],
  providers: Provider[],
): ClaudeSettings {
  const settings: ClaudeSettings = {
    $schema: "https://json.schemastore.org/claude-code-settings.json",
    permissions: { allow: ["*"], deny: [] },
  };

  const customProvider = providers.find(
    (provider) => provider.provider_type !== "official" && provider.enabled,
  );

  if (customProvider) {
    const env: Record<string, string> = {};
    if (customProvider.api_key) env.ANTHROPIC_AUTH_TOKEN = customProvider.api_key;
    if (customProvider.base_url) env.ANTHROPIC_BASE_URL = customProvider.base_url;

    const modelId = getModelFromConfig(customProvider.model_config);
    if (modelId) {
      env.ANTHROPIC_MODEL = modelId;
      env.ANTHROPIC_DEFAULT_SONNET_MODEL = modelId;
      env.ANTHROPIC_DEFAULT_HAIKU_MODEL = modelId;
      env.ANTHROPIC_DEFAULT_OPUS_MODEL = modelId;
      settings.model = modelId;
    }

    if (Object.keys(env).length > 0) {
      settings.env = env;
    }
  }

  const mcpServers = buildMcpServersObject(mcps);
  if (Object.keys(mcpServers).length > 0) {
    settings.mcpServers = mcpServers;
  }

  return settings;
}

export function generateCodexConfigToml(
  providers: Provider[],
  mcps: McpServer[],
): string {
  const lines: string[] = [
    "# CC Switch - Codex CLI 配置",
    "# 放置路径: ~/.codex/config.toml",
    "",
  ];

  const customProvider = providers.find(
    (provider) => provider.provider_type !== "official" && provider.enabled,
  );
  const modelId = customProvider ? getModelFromConfig(customProvider.model_config) : undefined;

  lines.push(`model = "${escapeTomlString(modelId || "o4-mini")}"`);
  if (customProvider?.api_key) {
    lines.push(`api_key = "${escapeTomlString(customProvider.api_key)}"`);
  }
  if (customProvider?.base_url) {
    lines.push(`provider_base_url = "${escapeTomlString(customProvider.base_url)}"`);
  }

  mcps.forEach((server) => {
    if (!server.name.trim()) return;

    lines.push("");
    const key = server.name.replace(/[^a-zA-Z0-9_-]/g, "_");
    lines.push(`[mcp_servers.${key}]`);

    if (server.transport_type === "stdio") {
      if (!server.command?.trim()) return;

      lines.push('type = "stdio"');
      lines.push(`command = "${escapeTomlString(server.command)}"`);

      const args = toStringArray(server.args)
        .map((arg) => `"${escapeTomlString(arg)}"`)
        .join(", ");
      lines.push(`args = [${args}]`);

      const env = toStringRecord(server.env);
      Object.entries(env).forEach(([envKey, envValue]) => {
        lines.push(
          `env.${formatTomlKey(envKey)} = "${escapeTomlString(envValue)}"`,
        );
      });
      return;
    }

    if (
      (server.transport_type === "http" || server.transport_type === "sse") &&
      server.url?.trim()
    ) {
      lines.push(`url = "${escapeTomlString(server.url)}"`);
    }
  });

  return `${lines.join("\n")}\n`;
}

export function getAppStats(
  appType: AppType,
  mcpServers: McpServer[],
  skills: Skill[],
  providers: Provider[],
): ExportStats {
  const enabledMcps = mcpServers.filter((server) => {
    if (!server.enabled) return false;
    return toStringArray(server.app_bindings).includes(appType);
  });

  const installedSkills = skills.filter((skill) => skill.installed);
  const enabledProviders = providers.filter(
    (provider) => provider.enabled && provider.app_type === appType,
  );

  return { enabledMcps, installedSkills, enabledProviders };
}

export function buildSkillMd(skill: Pick<Skill, "name" | "description">): string {
  const description = skill.description || "";
  return `---
name: ${skill.name}
description: ${description}
version: "1.0"
tags: []
---

# ${skill.name}

${description}
`;
}

export function stripDbFields<
  T extends Record<string, unknown>,
  K extends keyof T,
>(row: T, keys: readonly K[]): Omit<T, K> {
  const mutable = { ...row };
  keys.forEach((key) => {
    delete mutable[key];
  });
  return mutable as Omit<T, K>;
}

export function sanitizeProviderForBackup(
  provider: Provider,
  includeSecrets: boolean,
): Omit<Provider, "id" | "user_id" | "created_at" | "updated_at"> {
  const cleaned = stripDbFields(provider, [
    "id",
    "user_id",
    "created_at",
    "updated_at",
  ] as const);
  return includeSecrets ? cleaned : { ...cleaned, api_key: null };
}

export function sanitizeMcpForBackup(
  server: McpServer,
  includeSecrets: boolean,
): Omit<McpServer, "id" | "user_id" | "created_at" | "updated_at"> {
  const cleaned = stripDbFields(server, [
    "id",
    "user_id",
    "created_at",
    "updated_at",
  ] as const);
  return includeSecrets ? cleaned : { ...cleaned, env: {} };
}

export function buildDeepLinkPayload(
  providers: Provider[],
): DeepLinkProviderPayload[] {
  return providers
    .filter((provider) => provider.enabled)
    .map((provider) => ({
      name: provider.name,
      provider_type: provider.provider_type,
      base_url: provider.base_url,
      app_type: provider.app_type,
    }));
}

export function encodeDeepLinkPayload(
  payload: DeepLinkProviderPayload[],
): string {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}
