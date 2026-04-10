import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/ui/tooltip";
import CliGuide from "@/pages/CliGuide";
import { CLI_GUIDE_TOOLS } from "@/config/docs-catalog/cli";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@/features/docs-refresh/hooks", () => ({
  useDocRefreshSettings: () => ({
    data: {
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    },
    isLoading: false,
  }),
  useLatestDocRefreshRun: () => ({
    data: {
      runId: null,
      scope: "cli",
      pageRoute: "/cli-guide",
      sourceMode: "official_fetch",
      status: "idle",
      startedAt: null,
      finishedAt: null,
      errorMessage: null,
      summary: {
        totalSources: 0,
        successfulSnapshots: 0,
        failedSources: 0,
        pending: 0,
        applied: 0,
        dismissed: 0,
      },
    },
    isLoading: false,
  }),
  useDocRefreshDiffItems: () => ({
    data: [],
    isLoading: false,
  }),
  useDocCatalogOverrides: () => ({
    data: [
      {
        scope: "cli",
        vendorId: "claude",
        entityKey: "cli:claude:CLI 参数:--model",
        overrideType: "delete",
        payload: {},
      },
    ],
    isLoading: false,
  }),
  useTriggerDocRefresh: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useSaveDocRefreshSettings: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useClearDocRefreshSettings: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useApplyDocRefreshDecision: () => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useDismissDocRefreshDecision: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
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

  it("hides deleted Claude CLI params after published overrides are applied", () => {
    fireEvent.click(screen.getByRole("button", { name: "cliGuide.expandAll" }));

    const panel = screen.getByRole("tabpanel", { name: "Claude Code" });

    expect(within(panel).queryByText("--model")).not.toBeInTheDocument();
    expect(within(panel).getByText("--permission-mode")).toBeInTheDocument();
  });
});
