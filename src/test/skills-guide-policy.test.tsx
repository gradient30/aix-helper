import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/ui/tooltip";
import SkillsGuide from "@/pages/SkillsGuide";
import { SKILLS_GUIDE_TOOLS } from "@/config/docs-catalog/skills";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("SkillsGuide policy", () => {
  it("uses codex .agents/skills path", () => {
    const codex = SKILLS_GUIDE_TOOLS.find((tool) => tool.id === "codex");
    const text = JSON.stringify(codex);

    expect(text.includes(".agents/skills")).toBe(true);
    expect(text.includes(".codex/skills")).toBe(false);
  });

  it("removes gemini skills command section", () => {
    const gemini = SKILLS_GUIDE_TOOLS.find((tool) => tool.id === "gemini");
    expect(gemini?.support_level).toBe("unsupported");

    render(
      <TooltipProvider>
        <SkillsGuide />
      </TooltipProvider>,
    );

    expect(screen.queryByText(/\/skills list/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/gemini skills/i)).not.toBeInTheDocument();
  });
});
