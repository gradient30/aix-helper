import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { saveDocRefreshSettingsMock, clearDocRefreshSettingsMock } = vi.hoisted(() => ({
  saveDocRefreshSettingsMock: vi.fn(),
  clearDocRefreshSettingsMock: vi.fn(),
}));

vi.mock("@/features/docs-refresh/api", () => ({
  applyDocRefreshDecision: vi.fn(),
  clearDocRefreshSettings: clearDocRefreshSettingsMock,
  dismissDocRefreshDecision: vi.fn(),
  fetchDocRefreshDiffItems: vi.fn(),
  fetchDocRefreshSettings: vi.fn(),
  fetchLatestDocRefreshRun: vi.fn(),
  saveDocRefreshSettings: saveDocRefreshSettingsMock,
  triggerDocRefresh: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe("doc refresh hooks", () => {
  beforeEach(() => {
    saveDocRefreshSettingsMock.mockReset();
    clearDocRefreshSettingsMock.mockReset();
  });

  it("updates cached settings immediately after saving the Firecrawl key", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const wrapper = createWrapper(queryClient);

    queryClient.setQueryData(["doc-refresh-settings"], {
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    });

    saveDocRefreshSettingsMock.mockResolvedValue({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-de***et",
      firecrawlLastVerifiedAt: null,
    });

    const { useSaveDocRefreshSettings } = await import("@/features/docs-refresh/hooks");
    const { result } = renderHook(() => useSaveDocRefreshSettings(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync("fc-demo-secret");
    });

    expect(queryClient.getQueryData(["doc-refresh-settings"])).toEqual({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-de***et",
      firecrawlLastVerifiedAt: null,
    });
  });

  it("updates cached settings immediately after clearing the Firecrawl key", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const wrapper = createWrapper(queryClient);

    queryClient.setQueryData(["doc-refresh-settings"], {
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-de***et",
      firecrawlLastVerifiedAt: "2026-04-09T08:00:00.000Z",
    });

    clearDocRefreshSettingsMock.mockResolvedValue({
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    });

    const { useClearDocRefreshSettings } = await import("@/features/docs-refresh/hooks");
    const { result } = renderHook(() => useClearDocRefreshSettings(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(queryClient.getQueryData(["doc-refresh-settings"])).toEqual({
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    });
  });
});
