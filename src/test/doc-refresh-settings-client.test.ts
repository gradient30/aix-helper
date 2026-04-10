import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();
const getSessionMock = vi.fn();
const refreshSessionMock = vi.fn();
const signOutMock = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: getSessionMock,
      refreshSession: refreshSessionMock,
      signOut: signOutMock,
    },
  },
}));

describe("doc refresh settings client", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "public-anon-key");
    fetchMock.mockReset();
    getSessionMock.mockReset();
    refreshSessionMock.mockReset();
    signOutMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);

    getSessionMock.mockResolvedValue({
      data: { session: { access_token: "session-token" } },
      error: null,
    });
    refreshSessionMock.mockResolvedValue({
      data: { session: { access_token: "refreshed-token" } },
      error: null,
    });
    signOutMock.mockResolvedValue(undefined);
  });

  it("loads masked Firecrawl settings status", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-12***90",
      firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const { fetchDocRefreshSettings } = await import("@/features/docs-refresh/api");
    const result = await fetchDocRefreshSettings();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-settings",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "public-anon-key",
          Authorization: "Bearer session-token",
        }),
        body: JSON.stringify({
          action: "get",
          access_token: "session-token",
        }),
      }),
    );
    expect(result).toEqual({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-12***90",
      firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
    });
  });

  it("retries once with a refreshed access token after a 401", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "未授权" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        firecrawlConfigured: true,
        firecrawlKeyMask: "fc-12***90",
        firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }));

    const { saveDocRefreshSettings } = await import("@/features/docs-refresh/api");
    const result = await saveDocRefreshSettings("fc-demo-secret");

    expect(refreshSessionMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-settings",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer refreshed-token",
        }),
        body: JSON.stringify({
          action: "save",
          firecrawlKey: "fc-demo-secret",
          access_token: "refreshed-token",
        }),
      }),
    );
    expect(result).toEqual({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-12***90",
      firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
    });
  });

  it("saves a Firecrawl key through the settings function", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      firecrawlConfigured: true,
      firecrawlKeyMask: "fc-12***90",
      firecrawlLastVerifiedAt: "2026-04-08T09:00:00.000Z",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const { saveDocRefreshSettings } = await import("@/features/docs-refresh/api");
    await saveDocRefreshSettings("fc-demo-secret");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-settings",
      expect.objectContaining({
        body: JSON.stringify({
          action: "save",
          firecrawlKey: "fc-demo-secret",
          access_token: "session-token",
        }),
      }),
    );
  });

  it("clears the saved Firecrawl key", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      firecrawlConfigured: false,
      firecrawlKeyMask: null,
      firecrawlLastVerifiedAt: null,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const { clearDocRefreshSettings } = await import("@/features/docs-refresh/api");
    const result = await clearDocRefreshSettings();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-settings",
      expect.objectContaining({
        body: JSON.stringify({
          action: "clear",
          access_token: "session-token",
        }),
      }),
    );
    expect(result.firecrawlConfigured).toBe(false);
    expect(result.firecrawlKeyMask).toBeNull();
    expect(result.firecrawlLastVerifiedAt).toBeNull();
  });

  it("surfaces the detailed edge function error message", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      success: false,
      message: "Missing DOC_REFRESH_FIRECRAWL_SECRET or SUPABASE_SERVICE_ROLE_KEY",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }));

    const { saveDocRefreshSettings } = await import("@/features/docs-refresh/api");

    await expect(saveDocRefreshSettings("fc-demo-secret")).rejects.toThrow(
      "Missing DOC_REFRESH_FIRECRAWL_SECRET or SUPABASE_SERVICE_ROLE_KEY",
    );
  });

  it("signs the user out when retrying after 401 still fails", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "未授权" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "认证失败" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }));

    const { fetchDocRefreshSettings } = await import("@/features/docs-refresh/api");

    await expect(fetchDocRefreshSettings()).rejects.toThrow("登录状态已失效，请重新登录后再试");
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});
