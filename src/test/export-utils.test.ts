import { describe, expect, it } from "vitest";
import {
  buildClaudeSettingsJson,
  buildDeepLinkPayload,
  buildMcpServersObject,
  generateCodexConfigToml,
  getAppStats,
  stripDbFields,
  toStringArray,
  toStringRecord,
  type McpServer,
  type Provider,
  type Skill,
} from "@/lib/export-utils";

function makeProvider(overrides: Partial<Provider> = {}): Provider {
  return {
    id: "provider-1",
    user_id: "user-1",
    name: "Custom Provider",
    provider_type: "custom",
    app_type: "codex",
    api_key: "sk-test",
    base_url: "https://api.example.com/v1",
    enabled: true,
    endpoints: [],
    model_config: { model: "o4-mini" },
    sort_order: 0,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function makeMcp(overrides: Partial<McpServer> = {}): McpServer {
  return {
    id: "mcp-1",
    user_id: "user-1",
    name: "playwright",
    transport_type: "stdio",
    command: "npx",
    args: ["@playwright/mcp@latest"],
    url: null,
    env: { TOKEN: "abc" },
    enabled: true,
    app_bindings: ["codex"],
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function makeSkill(overrides: Partial<Skill> = {}): Skill {
  return {
    id: "skill-1",
    user_id: "user-1",
    repo_id: "repo-1",
    name: "code-review",
    description: "review code",
    installed: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("export-utils", () => {
  it("toStringArray should keep only string items", () => {
    expect(toStringArray(["a", 1, true, "b", null])).toEqual(["a", "b"]);
    expect(toStringArray(null)).toEqual([]);
  });

  it("toStringRecord should keep only string values", () => {
    expect(toStringRecord({ A: "1", B: 2, C: true, D: "ok" })).toEqual({
      A: "1",
      D: "ok",
    });
    expect(toStringRecord(["x"])).toEqual({});
  });

  it("buildMcpServersObject should build stdio and remote configs", () => {
    const mcps = [
      makeMcp(),
      makeMcp({
        id: "mcp-2",
        name: "remote-server",
        transport_type: "http",
        command: null,
        args: [],
        url: "https://mcp.example.com",
      }),
      makeMcp({
        id: "mcp-3",
        name: "invalid-stdio",
        command: null,
      }),
    ];

    expect(buildMcpServersObject(mcps)).toEqual({
      playwright: {
        command: "npx",
        args: ["@playwright/mcp@latest"],
        env: { TOKEN: "abc" },
      },
      "remote-server": {
        type: "http",
        url: "https://mcp.example.com",
      },
    });
  });

  it("buildClaudeSettingsJson should merge provider env and mcp servers", () => {
    const settings = buildClaudeSettingsJson(
      [makeMcp({ app_bindings: ["claude"] })],
      [makeProvider({ app_type: "claude" })],
    );

    expect(settings.env).toMatchObject({
      ANTHROPIC_AUTH_TOKEN: "sk-test",
      ANTHROPIC_BASE_URL: "https://api.example.com/v1",
      ANTHROPIC_MODEL: "o4-mini",
    });
    expect(settings.model).toBe("o4-mini");
    expect(settings.mcpServers?.playwright).toBeTruthy();
  });

  it("generateCodexConfigToml should include escaped provider and mcp values", () => {
    const toml = generateCodexConfigToml(
      [makeProvider({ api_key: 'sk-"quoted"', base_url: "https://api.example.com\\v1" })],
      [makeMcp({ env: { KEY: 'v"1' } })],
    );

    expect(toml).toContain('model = "o4-mini"');
    expect(toml).toContain('api_key = "sk-\\"quoted\\""');
    expect(toml).toContain('provider_base_url = "https://api.example.com\\\\v1"');
    expect(toml).toContain('[mcp_servers.playwright]');
    expect(toml).toContain('env.KEY = "v\\"1"');
  });

  it("getAppStats should filter by app type and enable flag", () => {
    const stats = getAppStats(
      "codex",
      [
        makeMcp({ id: "mcp-1", enabled: true, app_bindings: ["codex"] }),
        makeMcp({ id: "mcp-2", enabled: false, app_bindings: ["codex"] }),
        makeMcp({ id: "mcp-3", enabled: true, app_bindings: ["claude"] }),
      ],
      [makeSkill({ installed: true }), makeSkill({ id: "skill-2", installed: false })],
      [
        makeProvider({ enabled: true, app_type: "codex" }),
        makeProvider({ id: "provider-2", enabled: false, app_type: "codex" }),
        makeProvider({ id: "provider-3", enabled: true, app_type: "claude" }),
      ],
    );

    expect(stats.enabledMcps).toHaveLength(1);
    expect(stats.installedSkills).toHaveLength(1);
    expect(stats.enabledProviders).toHaveLength(1);
  });

  it("buildDeepLinkPayload should include only enabled providers", () => {
    const payload = buildDeepLinkPayload([
      makeProvider({ name: "A", enabled: true }),
      makeProvider({ id: "provider-2", name: "B", enabled: false }),
    ]);

    expect(payload).toEqual([
      {
        name: "A",
        provider_type: "custom",
        base_url: "https://api.example.com/v1",
        app_type: "codex",
      },
    ]);
  });

  it("stripDbFields should remove database metadata keys", () => {
    const stripped = stripDbFields(
      makeProvider(),
      ["id", "user_id", "created_at", "updated_at"] as const,
    );

    expect(stripped).not.toHaveProperty("id");
    expect(stripped).not.toHaveProperty("user_id");
    expect(stripped).toHaveProperty("name", "Custom Provider");
  });
});
