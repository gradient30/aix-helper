import { describe, expect, it } from "vitest";

import { CLI_GUIDE_TOOLS } from "@/config/docs-catalog/cli";
import { SKILLS_GUIDE_TOOLS } from "@/config/docs-catalog/skills";
import { SETUP_GUIDE_TOOLS } from "@/config/docs-catalog/setup";
import { HELP_DOC_CATALOG } from "@/config/docs-catalog/help";

describe("guide catalog", () => {
  it("all guide tools include verification metadata", () => {
    const tools = [...CLI_GUIDE_TOOLS, ...SKILLS_GUIDE_TOOLS, ...SETUP_GUIDE_TOOLS];

    tools.forEach((tool) => {
      expect(tool.official_url).toMatch(/^https?:\/\//);
      expect(tool.verification.last_verified_at).toBeTruthy();
      expect(["pass", "warn", "fail"]).toContain(tool.verification.verification_status);

      tool.groups.forEach((group) => {
        expect(group.verification.source_url).toMatch(/^https?:\/\//);
        group.items.forEach((item) => {
          expect(item.verification.source_url).toMatch(/^https?:\/\//);
          expect(item.verification.last_verified_at).toBeTruthy();
        });
      });
    });
  });

  it("gemini skills is explicitly marked unsupported", () => {
    const gemini = SKILLS_GUIDE_TOOLS.find((tool) => tool.id === "gemini");
    expect(gemini).toBeTruthy();
    expect(gemini?.support_level).toBe("unsupported");
  });

  it("help docs catalog has full official metadata", () => {
    Object.values(HELP_DOC_CATALOG).forEach((meta) => {
      expect(meta.source_url).toMatch(/^https?:\/\//);
      expect(meta.last_verified_at).toBeTruthy();
      expect(meta.verification_status).toBe("pass");
    });
  });
});
