import { describe, expect, it } from "vitest";

import { buildDocRefreshSourcePlan } from "@/features/docs-refresh/source-plan";

describe("doc refresh source plan", () => {
  it("collects official sources for requested cli vendors", () => {
    const result = buildDocRefreshSourcePlan({
      scope: "cli",
      vendorIds: ["claude", "codex"],
    });

    expect(result).toHaveLength(2);
    expect(result.map((entry) => entry.vendorId)).toEqual(["claude", "codex"]);
    expect(result[0]?.sourceUrls.some((url) => url.includes("docs.anthropic.com"))).toBe(true);
    expect(result[1]?.sourceUrls.some((url) => url.includes("developers.openai.com"))).toBe(true);
  });

  it("includes synced opencode sources for non-help pages", () => {
    const result = buildDocRefreshSourcePlan({
      scope: "skills",
      vendorIds: ["opencode"],
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        vendorId: "opencode",
      }),
    );
    expect(result[0]?.sourceUrls.some((url) => url.includes("opencode.ai"))).toBe(true);
  });

  it("resolves help pages by route when no vendor is selected", () => {
    const result = buildDocRefreshSourcePlan({
      scope: "help",
      pageRoute: "/providers",
      vendorIds: [],
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.pageRoute).toBe("/providers");
    expect(result[0]?.sourceUrls.length).toBeGreaterThan(0);
  });
});
