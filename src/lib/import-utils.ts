import type { Json, TablesInsert } from "@/integrations/supabase/types";

export type ProviderImportItem = Omit<TablesInsert<"providers">, "user_id">;
export type McpImportItem = Omit<TablesInsert<"mcp_servers">, "user_id">;
export type PromptImportItem = Omit<TablesInsert<"prompts">, "user_id">;

export type ImportModule = "providers" | "mcp_servers" | "prompts";

export type ParsedImportData =
  | { module: "providers"; items: ProviderImportItem[] }
  | { module: "mcp_servers"; items: McpImportItem[] }
  | { module: "prompts"; items: PromptImportItem[] };

export type DeepLinkProviderItem = Pick<
  ProviderImportItem,
  "name" | "provider_type" | "base_url" | "app_type"
>;

type PlainObject = Record<string, unknown>;

const MAX_IMPORT_ITEMS = 1000;
const MAX_DEEPLINK_ITEMS = 200;
const MAX_DEEPLINK_LENGTH = 32_000;
const MAX_NAME_LENGTH = 100;
const MAX_TEXT_LENGTH = 50_000;
const MAX_URL_LENGTH = 500;
const ALLOWED_APP_TYPES = new Set(["claude", "codex", "gemini", "opencode"]);
const ALLOWED_TRANSPORT_TYPES = new Set(["stdio", "http", "sse"]);

function isPlainObject(value: unknown): value is PlainObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isJsonValue(value: unknown): value is Json {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isJsonValue);
  }
  if (isPlainObject(value)) {
    return Object.values(value).every(isJsonValue);
  }
  return false;
}

function toNullableString(value: unknown): string | null | undefined {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return null;
  return undefined;
}

function toBoolean(value: unknown, defaultValue: boolean): boolean {
  return typeof value === "boolean" ? value : defaultValue;
}

function toNumber(value: unknown, defaultValue: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : defaultValue;
}

function toJson(value: unknown, defaultValue: Json): Json {
  return isJsonValue(value) ? value : defaultValue;
}

function parseProviderItem(raw: unknown): ProviderImportItem | null {
  if (!isPlainObject(raw) || typeof raw.name !== "string" || !raw.name.trim()) {
    return null;
  }

  const name = raw.name.trim().slice(0, MAX_NAME_LENGTH);
  const appType =
    typeof raw.app_type === "string" && ALLOWED_APP_TYPES.has(raw.app_type)
      ? raw.app_type
      : "claude";
  const providerType =
    typeof raw.provider_type === "string" && raw.provider_type.trim()
      ? raw.provider_type.slice(0, 50)
      : "custom";
  const baseUrl = toNullableString(raw.base_url);
  const apiKey = toNullableString(raw.api_key);

  return {
    name,
    provider_type: providerType,
    app_type: appType,
    api_key: typeof apiKey === "string" ? apiKey.slice(0, MAX_TEXT_LENGTH) : apiKey,
    base_url: typeof baseUrl === "string" ? baseUrl.slice(0, MAX_URL_LENGTH) : baseUrl,
    enabled: toBoolean(raw.enabled, true),
    sort_order: toNumber(raw.sort_order, 0),
    endpoints: toJson(raw.endpoints, []),
    model_config: toJson(raw.model_config, {}),
  };
}

function parseMcpItem(raw: unknown): McpImportItem | null {
  if (!isPlainObject(raw) || typeof raw.name !== "string" || !raw.name.trim()) {
    return null;
  }

  const name = raw.name.trim().slice(0, MAX_NAME_LENGTH);
  const transportType =
    typeof raw.transport_type === "string" &&
    ALLOWED_TRANSPORT_TYPES.has(raw.transport_type)
      ? raw.transport_type
      : "stdio";
  const command = toNullableString(raw.command);
  const url = toNullableString(raw.url);

  return {
    name,
    transport_type: transportType,
    command: typeof command === "string" ? command.slice(0, MAX_URL_LENGTH) : command,
    url: typeof url === "string" ? url.slice(0, MAX_URL_LENGTH) : url,
    enabled: toBoolean(raw.enabled, true),
    args: toJson(raw.args, []),
    env: toJson(raw.env, {}),
    app_bindings: toJson(raw.app_bindings, ["claude"]),
  };
}

function parsePromptItem(raw: unknown): PromptImportItem | null {
  if (!isPlainObject(raw) || typeof raw.name !== "string" || !raw.name.trim()) {
    return null;
  }

  const targetFile =
    typeof raw.target_file === "string" && raw.target_file.trim()
      ? raw.target_file.slice(0, 100)
      : "CLAUDE.md";

  return {
    name: raw.name.trim().slice(0, MAX_NAME_LENGTH),
    content:
      typeof raw.content === "string"
        ? raw.content.slice(0, MAX_TEXT_LENGTH)
        : "",
    target_file: targetFile,
    is_active: toBoolean(raw.is_active, false),
  };
}

export function parseImportData(value: unknown): ParsedImportData {
  if (!Array.isArray(value)) {
    throw new Error("导入文件格式错误：必须是数组");
  }
  if (value.length === 0) {
    throw new Error("空数据");
  }
  if (value.length > MAX_IMPORT_ITEMS) {
    throw new Error(`导入条目过多（最多 ${MAX_IMPORT_ITEMS} 条）`);
  }

  const sample = value[0];
  if (!isPlainObject(sample)) {
    throw new Error("导入文件格式错误：数组项必须是对象");
  }

  if ("provider_type" in sample) {
    const items = value
      .map((item) => parseProviderItem(item))
      .filter((item): item is ProviderImportItem => item !== null);
    return { module: "providers", items };
  }

  if ("transport_type" in sample) {
    const items = value
      .map((item) => parseMcpItem(item))
      .filter((item): item is McpImportItem => item !== null);
    return { module: "mcp_servers", items };
  }

  if ("target_file" in sample) {
    const items = value
      .map((item) => parsePromptItem(item))
      .filter((item): item is PromptImportItem => item !== null);
    return { module: "prompts", items };
  }

  throw new Error("不支持的导入类型");
}

export function decodeDeepLinkProviders(encoded: string): DeepLinkProviderItem[] {
  if (!encoded || encoded.length > MAX_DEEPLINK_LENGTH) {
    throw new Error("无效的导入链接");
  }

  const decoded = JSON.parse(decodeURIComponent(atob(encoded))) as unknown;
  if (!Array.isArray(decoded)) {
    throw new Error("无效的导入链接");
  }
  if (decoded.length > MAX_DEEPLINK_ITEMS) {
    throw new Error(`链接数据过大（最多 ${MAX_DEEPLINK_ITEMS} 条）`);
  }

  return decoded
    .map((raw) => parseProviderItem(raw))
    .filter((item): item is ProviderImportItem => item !== null)
    .map((item) => ({
      name: item.name,
      provider_type: item.provider_type || "custom",
      base_url: item.base_url || "",
      app_type: item.app_type || "claude",
    }));
}
