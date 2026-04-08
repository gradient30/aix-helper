import { beforeEach, describe, expect, it, vi } from "vitest";

const invokeMock = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: invokeMock,
    },
  },
}));

describe("doc refresh settings client", () => {
  beforeEach(() => {
    invokeMock.mockReset();
  });

  it("loads masked Firecrawl settings status", async () => {
    invokeMock.mockResolvedValue({
      data: {
        firecrawlConfigured: true,
        firecrawlKeyMask: "fc-12***90",
        firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
      },
      error: null,
    });

    const { fetchDocRefreshSettings } = await import("@/features/docs-refresh/api");
    const result = await fetchDocRefreshSettings();

    expect(invokeMock).toHaveBeenCalledWith("doc-refresh-settings", {
      body: { action: "get" },
    });
    expect(result).toEqual({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-12***90",
      firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
    });
  });

  it("saves a Firecrawl key through the settings function", async () => {
    invokeMock.mockResolvedValue({
      data: {
        firecrawlConfigured: true,
        firecrawlKeyMask: "fc-12***90",
        firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
      },
      error: null,
    });

    const { saveDocRefreshSettings } = await import("@/features/docs-refresh/api");
    await saveDocRefreshSettings("fc-demo-secret");

    expect(invokeMock).toHaveBeenCalledWith("doc-refresh-settings", {
      body: {
        action: "save",
        firecrawlKey: "fc-demo-secret",
      },
    });
  });

  it("clears the saved Firecrawl key", async () => {
    invokeMock.mockResolvedValue({
      data: {
        firecrawlConfigured: false,
        firecrawlKeyMask: null,
        firecrawlLastVerifiedAt: null,
      },
      error: null,
    });

    const { clearDocRefreshSettings } = await import("@/features/docs-refresh/api");
    const result = await clearDocRefreshSettings();

    expect(invokeMock).toHaveBeenCalledWith("doc-refresh-settings", {
      body: { action: "clear" },
    });
    expect(result.firecrawlConfigured).toBe(false);
    expect(result.firecrawlKeyMask).toBeNull();
    expect(result.firecrawlLastVerifiedAt).toBeNull();
  });
});
