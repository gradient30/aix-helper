import { describe, expect, it } from "vitest";
import { decodeDeepLinkProviders, parseImportData } from "@/lib/import-utils";

describe("import-utils", () => {
  it("parseImportData should parse provider module and apply defaults", () => {
    const parsed = parseImportData([
      {
        name: "Provider A",
        provider_type: "custom",
        app_type: "claude",
        enabled: true,
      },
      {
        name: "Provider B",
      },
    ]);

    expect(parsed.module).toBe("providers");
    if (parsed.module !== "providers") return;
    expect(parsed.items).toHaveLength(2);
    expect(parsed.items[1]).toMatchObject({
      name: "Provider B",
      provider_type: "custom",
      app_type: "claude",
      enabled: true,
    });
  });

  it("parseImportData should parse mcp module", () => {
    const parsed = parseImportData([
      {
        name: "playwright",
        transport_type: "stdio",
        command: "npx",
        args: ["@playwright/mcp@latest"],
      },
    ]);

    expect(parsed.module).toBe("mcp_servers");
    if (parsed.module !== "mcp_servers") return;
    expect(parsed.items[0]).toMatchObject({
      name: "playwright",
      transport_type: "stdio",
      command: "npx",
    });
  });

  it("parseImportData should parse prompts module", () => {
    const parsed = parseImportData([
      {
        name: "Prompt A",
        target_file: "AGENTS.md",
        content: "hello",
      },
    ]);

    expect(parsed.module).toBe("prompts");
    if (parsed.module !== "prompts") return;
    expect(parsed.items[0]).toMatchObject({
      name: "Prompt A",
      target_file: "AGENTS.md",
      content: "hello",
      is_active: false,
    });
  });

  it("parseImportData should reject invalid payload", () => {
    expect(() => parseImportData({ foo: "bar" })).toThrow("必须是数组");
    expect(() => parseImportData([])).toThrow("空数据");
    expect(() => parseImportData([{ name: "x" }])).toThrow("不支持的导入类型");
  });

  it("decodeDeepLinkProviders should decode and sanitize provider list", () => {
    const encoded = btoa(
      encodeURIComponent(
        JSON.stringify([
          {
            name: "DeepLink Provider",
            provider_type: "custom",
            app_type: "codex",
            base_url: "https://api.example.com/v1",
          },
          { name: "" },
        ]),
      ),
    );

    expect(decodeDeepLinkProviders(encoded)).toEqual([
      {
        name: "DeepLink Provider",
        provider_type: "custom",
        app_type: "codex",
        base_url: "https://api.example.com/v1",
      },
    ]);
  });

  it("decodeDeepLinkProviders should reject malformed data", () => {
    const encoded = btoa(encodeURIComponent(JSON.stringify({ hello: "world" })));
    expect(() => decodeDeepLinkProviders(encoded)).toThrow("无效的导入链接");
  });
});
