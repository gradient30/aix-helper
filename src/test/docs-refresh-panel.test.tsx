import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DocsRefreshPanel } from "@/components/docs-refresh/DocsRefreshPanel";

const { hookState } = vi.hoisted(() => ({
  hookState: {
    settings: {
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    },
    run: {
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
    diffItems: [],
    triggerMutation: {
      mutate: vi.fn(),
      isPending: false,
    },
    saveMutation: {
      mutate: vi.fn(),
      isPending: false,
      error: null as Error | null,
      reset: vi.fn(),
    },
    clearMutation: {
      mutate: vi.fn(),
      isPending: false,
      error: null as Error | null,
      reset: vi.fn(),
    },
    applyMutation: {
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      isPending: false,
    },
    dismissMutation: {
      mutate: vi.fn(),
      isPending: false,
    },
  },
}));

vi.mock("@/features/docs-refresh/hooks", () => ({
  useDocRefreshSettings: () => ({
    data: hookState.settings,
    isLoading: false,
  }),
  useLatestDocRefreshRun: () => ({
    data: hookState.run,
    isLoading: false,
  }),
  useDocRefreshDiffItems: () => ({
    data: hookState.diffItems,
    isLoading: false,
  }),
  useTriggerDocRefresh: () => hookState.triggerMutation,
  useSaveDocRefreshSettings: () => hookState.saveMutation,
  useClearDocRefreshSettings: () => hookState.clearMutation,
  useApplyDocRefreshDecision: () => hookState.applyMutation,
  useDismissDocRefreshDecision: () => hookState.dismissMutation,
}));

describe("DocsRefreshPanel", () => {
  beforeEach(() => {
    hookState.settings = {
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    };
    hookState.run = {
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
    };
    hookState.diffItems = [];
    hookState.triggerMutation.isPending = false;
    hookState.saveMutation.isPending = false;
    hookState.saveMutation.error = null;
    hookState.clearMutation.isPending = false;
    hookState.clearMutation.error = null;
    hookState.saveMutation.reset.mockReset();
    hookState.clearMutation.reset.mockReset();
  });

  it("shows the save error in the config dialog", () => {
    hookState.saveMutation.error = new Error("Missing DOC_REFRESH_FIRECRAWL_SECRET or SUPABASE_SERVICE_ROLE_KEY");

    render(<DocsRefreshPanel scope="skills" pageRoute="/skills-guide" />);

    fireEvent.click(screen.getByRole("button", { name: "Firecrawl 配置" }));

    expect(screen.getByText("Missing DOC_REFRESH_FIRECRAWL_SECRET or SUPABASE_SERVICE_ROLE_KEY")).toBeInTheDocument();
  });
});
