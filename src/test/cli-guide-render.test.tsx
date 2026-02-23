import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/ui/tooltip";
import CliGuide from "@/pages/CliGuide";
import { CLI_GUIDE_TOOLS } from "@/config/docs-catalog/cli";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("CliGuide", () => {
  beforeEach(() => {
    render(
      <TooltipProvider>
        <CliGuide />
      </TooltipProvider>,
    );
  });

  it("renders official docs links for codex and gemini", () => {
    const links = screen.getAllByRole("link", { name: "cliGuide.officialDocs" });
    const hrefs = links.map((link) => link.getAttribute("href") || "");
    const codexUrl = CLI_GUIDE_TOOLS.find((tool) => tool.id === "codex")?.official_url || "";
    const geminiUrl = CLI_GUIDE_TOOLS.find((tool) => tool.id === "gemini")?.official_url || "";

    expect(codexUrl.includes("developers.openai.com/codex/cli")).toBe(true);
    expect(geminiUrl.includes("google-gemini.github.io/gemini-cli")).toBe(true);
    expect(codexUrl.includes("github.com/openai/codex")).toBe(false);
    expect(geminiUrl.includes("github.com/google-gemini/gemini-cli")).toBe(false);
    expect(hrefs.every((href) => !href.includes("github.com/openai/codex"))).toBe(true);
  });
});
