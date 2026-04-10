import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();
const fromMock = vi.fn();
const getSessionMock = vi.fn();
const refreshSessionMock = vi.fn();
const signOutMock = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: fromMock,
    auth: {
      getSession: getSessionMock,
      refreshSession: refreshSessionMock,
      signOut: signOutMock,
    },
  },
}));

describe("doc refresh api", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "public-anon-key");
    fetchMock.mockReset();
    fromMock.mockReset();
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

  it("triggers a doc refresh run through the edge function", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      success: true,
      runId: "run-123",
      status: "success",
      summaryCounts: {
        totalSources: 2,
        successfulSnapshots: 2,
        failedSources: 0,
      },
      pageRoute: "/cli-guide",
      failures: [],
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const { triggerDocRefresh } = await import("@/features/docs-refresh/api");
    const result = await triggerDocRefresh({
      scope: "cli",
      pageRoute: "/cli-guide",
      vendorIds: ["claude"],
      sourceMode: "official_fetch",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-run",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "public-anon-key",
          Authorization: "Bearer session-token",
        }),
        body: JSON.stringify({
          scope: "cli",
          pageRoute: "/cli-guide",
          vendorIds: ["claude"],
          sourceMode: "official_fetch",
          access_token: "session-token",
        }),
      }),
    );
    expect(result).toEqual({
      success: true,
      runId: "run-123",
      status: "success",
      summaryCounts: {
        totalSources: 2,
        successfulSnapshots: 2,
        failedSources: 0,
      },
      pageRoute: "/cli-guide",
      failures: [],
    });
  });

  it("retries the refresh run once after a 401", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "未授权" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        success: true,
        runId: "run-123",
        status: "success",
        summaryCounts: {
          totalSources: 2,
          successfulSnapshots: 2,
          failedSources: 0,
        },
        pageRoute: "/cli-guide",
        failures: [],
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }));

    const { triggerDocRefresh } = await import("@/features/docs-refresh/api");
    const result = await triggerDocRefresh({
      scope: "cli",
      pageRoute: "/cli-guide",
      vendorIds: ["claude"],
      sourceMode: "official_fetch",
    });

    expect(refreshSessionMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      success: true,
      runId: "run-123",
      status: "success",
      summaryCounts: {
        totalSources: 2,
        successfulSnapshots: 2,
        failedSources: 0,
      },
      pageRoute: "/cli-guide",
      failures: [],
    });
  });

  it("maps the latest refresh run into a page-ready summary", async () => {
    const runBuilder = {
      select: vi.fn(),
      eq: vi.fn(),
      order: vi.fn(),
      limit: vi.fn(),
      maybeSingle: vi.fn(),
    };
    runBuilder.select.mockReturnValue(runBuilder);
    runBuilder.eq.mockReturnValue(runBuilder);
    runBuilder.order.mockReturnValue(runBuilder);
    runBuilder.limit.mockReturnValue(runBuilder);
    runBuilder.maybeSingle.mockResolvedValue({
      data: {
        id: "run-456",
        scope: "skills",
        page_route: "/skills-guide",
        source_mode: "official_fetch",
        status: "partial_success",
        summary_counts: {
          totalSources: 5,
          successfulSnapshots: 4,
          failedSources: 1,
        },
        error_message: "https://example.com/doc: timeout",
        started_at: "2026-04-08T10:00:00.000Z",
        finished_at: "2026-04-08T10:02:00.000Z",
      },
      error: null,
    });

    const diffBuilder = {
      select: vi.fn(),
      eq: vi.fn(),
    };
    diffBuilder.select.mockReturnValue(diffBuilder);
    diffBuilder.eq.mockResolvedValue({
      data: [
        { review_status: "pending" },
        { review_status: "pending" },
        { review_status: "applied" },
        { review_status: "dismissed" },
      ],
      error: null,
    });

    fromMock.mockImplementation((table: string) => {
      if (table === "doc_refresh_runs") return runBuilder;
      if (table === "doc_refresh_diff_items") return diffBuilder;
      throw new Error(`Unexpected table: ${table}`);
    });

    const { fetchLatestDocRefreshRun } = await import("@/features/docs-refresh/api");
    const result = await fetchLatestDocRefreshRun("skills", "/skills-guide");

    expect(fromMock).toHaveBeenNthCalledWith(1, "doc_refresh_runs");
    expect(fromMock).toHaveBeenNthCalledWith(2, "doc_refresh_diff_items");
    expect(result).toEqual({
      runId: "run-456",
      scope: "skills",
      pageRoute: "/skills-guide",
      sourceMode: "official_fetch",
      status: "partial_success",
      startedAt: "2026-04-08T10:00:00.000Z",
      finishedAt: "2026-04-08T10:02:00.000Z",
      errorMessage: "https://example.com/doc: timeout",
      summary: {
        totalSources: 5,
        successfulSnapshots: 4,
        failedSources: 1,
        pending: 2,
        applied: 1,
        dismissed: 1,
      },
    });
  });

  it("loads persisted diff items for the latest run", async () => {
    const diffBuilder = {
      select: vi.fn(),
      eq: vi.fn(),
      order: vi.fn(),
    };
    diffBuilder.select.mockReturnValue(diffBuilder);
    diffBuilder.eq.mockReturnValue(diffBuilder);
    diffBuilder.order.mockResolvedValue({
      data: [
        {
          id: "diff-1",
          run_id: "run-1",
          scope: "skills",
          vendor_id: "codex",
          entity_key: "guide:skills:codex:workflow:Agent Skills",
          diff_kind: "added",
          review_action: "skip",
          review_status: "pending",
          similarity_score: null,
          baseline_payload: null,
          candidate_payload: {
            title: "Agent Skills",
            entityKey: "guide:skills:codex:workflow:Agent Skills",
          },
          similar_candidates: [],
          created_at: "2026-04-08T10:00:00.000Z",
          updated_at: "2026-04-08T10:00:00.000Z",
        },
      ],
      error: null,
    });

    fromMock.mockImplementation((table: string) => {
      if (table === "doc_refresh_diff_items") return diffBuilder;
      throw new Error(`Unexpected table: ${table}`);
    });

    const { fetchDocRefreshDiffItems } = await import("@/features/docs-refresh/api");
    const result = await fetchDocRefreshDiffItems("run-1");

    expect(result).toEqual([
      {
        id: "diff-1",
        runId: "run-1",
        scope: "skills",
        vendorId: "codex",
        entityKey: "guide:skills:codex:workflow:Agent Skills",
        diffKind: "added",
        reviewAction: "skip",
        reviewStatus: "pending",
        similarityScore: null,
        baselinePayload: null,
        candidatePayload: {
          title: "Agent Skills",
          entityKey: "guide:skills:codex:workflow:Agent Skills",
        },
        similarCandidates: [],
        createdAt: "2026-04-08T10:00:00.000Z",
        updatedAt: "2026-04-08T10:00:00.000Z",
      },
    ]);
  });

  it("applies a diff decision through the edge function", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const { applyDocRefreshDecision } = await import("@/features/docs-refresh/api");

    await applyDocRefreshDecision({
      item: {
        id: "diff-1",
        runId: "run-1",
        scope: "skills",
        vendorId: "codex",
        entityKey: "guide:skills:codex:workflow:Agent Skills",
        diffKind: "added",
        reviewAction: "skip",
        reviewStatus: "pending",
        similarityScore: null,
        baselinePayload: null,
        candidatePayload: {
          title: "Agent Skills",
          entityKey: "guide:skills:codex:workflow:Agent Skills",
        },
        similarCandidates: [],
        createdAt: "2026-04-08T10:00:00.000Z",
        updatedAt: "2026-04-08T10:00:00.000Z",
      },
      action: "replace_all",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/doc-refresh-apply",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "public-anon-key",
          Authorization: "Bearer session-token",
        }),
        body: JSON.stringify({
          itemId: "diff-1",
          action: "replace_all",
          access_token: "session-token",
        }),
      }),
    );
  });

  it("marks a diff item dismissed without writing overrides", async () => {
    const diffUpdateBuilder = {
      update: vi.fn(),
      eq: vi.fn(),
    };
    diffUpdateBuilder.update.mockReturnValue(diffUpdateBuilder);
    diffUpdateBuilder.eq.mockReturnValue(diffUpdateBuilder);
    diffUpdateBuilder.eq.mockResolvedValue({ error: null });

    fromMock.mockImplementation((table: string) => {
      if (table === "doc_refresh_diff_items") return diffUpdateBuilder;
      throw new Error(`Unexpected table: ${table}`);
    });

    const { dismissDocRefreshDecision } = await import("@/features/docs-refresh/api");
    await dismissDocRefreshDecision("diff-9");

    expect(diffUpdateBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        review_action: "skip",
        review_status: "dismissed",
      }),
    );
  });
});
