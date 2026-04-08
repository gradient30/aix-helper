import { describe, expect, it } from "vitest";

import { buildCliCommandEntityKey, buildGuideEntityKey } from "@/features/docs-refresh/entity-keys";
import { diffCatalogItems } from "@/features/docs-refresh/diff";
import { mergeOverrides } from "@/features/docs-refresh/merge";

describe("doc refresh diff utilities", () => {
  it("builds stable entity keys", () => {
    expect(buildCliCommandEntityKey("claude", "model config", "/model")).toBe("cli:claude:model config:/model");
    expect(buildGuideEntityKey("skills", "codex", "install", "Agent Skills")).toBe("guide:skills:codex:install:Agent Skills");
  });

  it("classifies added, modified, stale, and similar items", () => {
    const baseline = [
      {
        entityKey: "guide:skills:claude:overview:Task Skills",
        vendorId: "claude",
        category: "overview",
        title: "Task Skills",
        description: "Load skills on demand",
      },
      {
        entityKey: "guide:skills:claude:setup:Install Skills",
        vendorId: "claude",
        category: "setup",
        title: "Install Skills",
        description: "Install via .claude/skills",
      },
    ];

    const candidate = [
      {
        entityKey: "guide:skills:claude:overview:Task Skills",
        vendorId: "claude",
        category: "overview",
        title: "Task Skills",
        description: "Load skills on demand with refreshed wording",
      },
      {
        entityKey: "guide:skills:claude:setup:Install Skills Updated",
        vendorId: "claude",
        category: "setup",
        title: "Install Skills Updated",
        description: "Install via .claude/skills with refreshed wording",
      },
    ];

    const result = diffCatalogItems({ baseline, candidate });

    expect(result.summary).toEqual({
      added: 0,
      modified: 1,
      stale: 1,
      similar: 1,
    });
  });

  it("applies delete tombstones before upserts while keeping order stable", () => {
    const baseline = [
      { entityKey: "one", value: "A" },
      { entityKey: "two", value: "B" },
      { entityKey: "three", value: "C" },
    ];

    const overrides = [
      { entityKey: "two", overrideType: "delete", payload: null },
      { entityKey: "three", overrideType: "upsert", payload: { entityKey: "three", value: "C+" } },
      { entityKey: "four", overrideType: "upsert", payload: { entityKey: "four", value: "D" } },
    ];

    expect(mergeOverrides(baseline, overrides)).toEqual([
      { entityKey: "one", value: "A" },
      { entityKey: "three", value: "C+" },
      { entityKey: "four", value: "D" },
    ]);
  });
});
