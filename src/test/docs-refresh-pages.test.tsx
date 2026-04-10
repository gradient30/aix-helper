import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/ui/tooltip";
import CliGuide from "@/pages/CliGuide";
import SkillsGuide from "@/pages/SkillsGuide";
import SetupGuide from "@/pages/SetupGuide";
import Providers from "@/pages/Providers";
import McpServers from "@/pages/McpServers";

const { fromMock } = vi.hoisted(() => ({
  fromMock: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user-1" },
  }),
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
  useLatestDocRefreshRun: (_scope: string, pageRoute: string) => ({
    data: {
      runId: null,
      scope: "help",
      pageRoute,
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

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: fromMock,
    auth: {
      getSession: vi.fn(),
    },
  },
}));

function createQueryBuilder(data: unknown[]) {
  const builder = {
    select: vi.fn(),
    order: vi.fn(),
  };

  builder.select.mockReturnValue(builder);
  builder.order.mockResolvedValue({
    data,
    error: null,
  });

  return builder;
}

function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{ui}</TooltipProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

describe("docs refresh page integration", () => {
  beforeEach(() => {
    fromMock.mockReset();
    fromMock.mockImplementation((table: string) => {
      if (table === "providers") return createQueryBuilder([]);
      if (table === "mcp_servers") return createQueryBuilder([]);
      throw new Error(`Unexpected table: ${table}`);
    });
  });

  it("shows shared refresh controls on guide pages", () => {
    const { unmount } = renderWithProviders(<CliGuide />);
    expect(screen.getByRole("button", { name: "数据刷新" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "OpenCode" })).toBeInTheDocument();
    unmount();

    renderWithProviders(<SkillsGuide />);
    expect(screen.getByRole("button", { name: "数据刷新" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "OpenCode" })).toBeInTheDocument();
  });

  it("shows shared refresh controls on setup, providers, and mcp pages", async () => {
    const { unmount } = renderWithProviders(<SetupGuide />);
    expect(screen.getByRole("button", { name: "数据刷新" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "OpenCode" })).toBeInTheDocument();
    unmount();

    renderWithProviders(<Providers />);
    expect(await screen.findByRole("button", { name: "数据刷新" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Firecrawl 配置" })).toBeInTheDocument();
    unmount();

    renderWithProviders(<McpServers />);
    expect(await screen.findByRole("button", { name: "数据刷新" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Firecrawl 配置" })).toBeInTheDocument();
  });
});
