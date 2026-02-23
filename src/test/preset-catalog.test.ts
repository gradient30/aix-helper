import { describe, expect, it } from "vitest";

import {
  APP_TYPES,
  OFFICIAL_PROVIDER_ENDPOINTS,
  PROVIDER_PRESETS,
  getAutoBaseUrl,
} from "@/config/preset-catalog/providers";
import { MCP_PRESETS } from "@/config/preset-catalog/mcp";
import { PRESET_REPOS } from "@/config/preset-catalog/skills";

describe("preset catalog", () => {
  it("includes 4 provider app types with official endpoints", () => {
    expect(APP_TYPES).toEqual(["claude", "codex", "gemini", "opencode"]);
    APP_TYPES.forEach((appType) => {
      expect(OFFICIAL_PROVIDER_ENDPOINTS[appType]).toBeTruthy();
      expect(getAutoBaseUrl("official", appType)).toBeTruthy();
    });
  });

  it("provider templates include verification metadata", () => {
    PROVIDER_PRESETS.forEach((preset) => {
      expect(preset.verification.last_verified_at).toBeTruthy();
      expect(preset.verification.source_url).toMatch(/^https?:\/\//);
      expect(["pass", "warn", "fail"]).toContain(preset.verification.verification_status);
    });
  });

  it("removes blocked mcp templates and keeps metadata", () => {
    const all = Object.values(MCP_PRESETS).flatMap((group) => group.items);
    const names = new Set(all.map((item) => item.name));

    expect(names.has("postgres")).toBe(false);
    expect(names.has("sqlite")).toBe(false);
    expect(names.has("puppeteer")).toBe(false);

    all.forEach((item) => {
      expect(item.source_url).toMatch(/^https?:\/\//);
      expect(item.install_method).toBeTruthy();
      expect(item.verification.last_verified_at).toBeTruthy();
      expect(item.verification.verification_status).toBe("pass");
    });
  });

  it("skills presets are 54 and legacy broken repos are removed", () => {
    const categories = Object.values(PRESET_REPOS);
    const all = categories.flatMap((repos) => repos);
    expect(all).toHaveLength(54);

    const slugs = new Set(all.map((repo) => `${repo.owner}/${repo.repo}`.toLowerCase()));
    expect(slugs.has("sourcegraph/cody")).toBe(false);
    expect(slugs.has("azimutt/azimutt")).toBe(false);
    expect(slugs.has("sourcegraph/sourcegraph-public-snapshot")).toBe(false);
    expect(slugs.has("sourcegraph/sourcegraph")).toBe(true);
    expect(slugs.has("azimuttapp/azimutt")).toBe(true);
  });

  it("enforces repo_kind semantics by category", () => {
    PRESET_REPOS.skills.forEach((repo) => {
      expect(repo.repo_kind).toBe("skill_bundle");
    });

    (["dev", "design", "office", "qa", "docs"] as const).forEach((category) => {
      PRESET_REPOS[category].forEach((repo) => {
        expect(repo.repo_kind).toBe("reference_repo");
      });
    });
  });
});

