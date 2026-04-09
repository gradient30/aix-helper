import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { KimiUsageQuery } from "@/components/KimiUsageQuery";

const getSessionMock = vi.hoisted(() => vi.fn());
const refreshSessionMock = vi.hoisted(() => vi.fn());
const signOutMock = vi.hoisted(() => vi.fn());

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: getSessionMock,
      refreshSession: refreshSessionMock,
      signOut: signOutMock,
    },
  },
}));

describe("KimiUsageQuery", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    getSessionMock.mockReset();
    refreshSessionMock.mockReset();
    signOutMock.mockReset();
    fetchMock.mockReset();
    localStorage.clear();
    sessionStorage.clear();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("renders trigger button without crashing", () => {
    render(<KimiUsageQuery />);

    expect(screen.getByRole("button", { name: "额度" })).toBeInTheDocument();
  });

  it("shows configuration help when config button is toggled", () => {
    render(<KimiUsageQuery />);

    fireEvent.click(screen.getByRole("button", { name: "额度" }));
    fireEvent.click(screen.getByRole("button", { name: /配置/i }));

    expect(screen.getByText("VITE_SUPABASE_URL")).toBeInTheDocument();
    expect(screen.getByText(/deploy kimi-usage edge function/i)).toBeInTheDocument();
  });

  it("stores the api key in session storage instead of local storage", () => {
    render(<KimiUsageQuery />);

    fireEvent.click(screen.getByRole("button", { name: "额度" }));
    fireEvent.change(screen.getByPlaceholderText("sk-kimi-..."), {
      target: { value: "sk-kimi-demo" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存" }));

    expect(sessionStorage.getItem("kimi-api-key")).toBe("sk-kimi-demo");
    expect(localStorage.getItem("kimi-api-key")).toBeNull();
  });

  it("posts api key and access token to the kimi usage function", async () => {
    getSessionMock.mockResolvedValue({
      data: { session: { access_token: "token-123" } },
      error: null,
    });
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        usage: { limit: 100, used: 10, remaining: 90 },
      }),
    });

    render(<KimiUsageQuery />);

    fireEvent.click(screen.getByRole("button", { name: "额度" }));
    fireEvent.change(screen.getByPlaceholderText("sk-kimi-..."), {
      target: { value: "sk-kimi-demo" },
    });
    fireEvent.click(screen.getByRole("button", { name: "查询" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("/functions/v1/kimi-usage");
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer token-123");
    expect(JSON.parse(options.body)).toEqual({
      apiKey: "sk-kimi-demo",
      access_token: "token-123",
    });
  });
});
