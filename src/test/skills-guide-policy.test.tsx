import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/ui/tooltip";
import SkillsGuide from "@/pages/SkillsGuide";
import { SKILLS_GUIDE_TOOLS } from "@/config/docs-catalog/skills";

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
      scope: "skills",
      pageRoute: "/skills-guide",
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
    data: [],
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
