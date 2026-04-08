import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { vi } from "vitest";

import { DocRefreshToolbar } from "@/components/docs-refresh/DocRefreshToolbar";

describe("DocRefreshToolbar", () => {
  it("shows refresh status and primary actions", () => {
    render(
      <DocRefreshToolbar
        run={{
          runId: "run-1",
          scope: "skills",
          pageRoute: "/skills-guide",
          sourceMode: "official_fetch",
          status: "partial_success",
          startedAt: "2026-04-08T10:00:00.000Z",
          finishedAt: "2026-04-08T10:02:00.000Z",
          errorMessage: null,
          summary: {
            totalSources: 5,
            successfulSnapshots: 4,
            failedSources: 1,
            pending: 2,
            applied: 1,
            dismissed: 0,
          },
        }}
        onRefresh={() => {}}
        onOpenConfig={() => {}}
        onOpenDiff={() => {}}
      />,
    );

    expect(screen.getByRole("button", { name: /数据刷新/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Firecrawl 配置/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /查看差异/i })).toBeInTheDocument();
    expect(screen.getByText("待处理 2")).toBeInTheDocument();
  });

  it("allows switching refresh source mode", () => {
    const onSourceModeChange = vi.fn();

    render(
      <DocRefreshToolbar
        run={{
          runId: "run-1",
          scope: "skills",
          pageRoute: "/skills-guide",
          sourceMode: "official_fetch",
          status: "success",
          startedAt: "2026-04-08T10:00:00.000Z",
          finishedAt: "2026-04-08T10:02:00.000Z",
          errorMessage: null,
          summary: {
            totalSources: 5,
            successfulSnapshots: 5,
            failedSources: 0,
            pending: 0,
            applied: 2,
            dismissed: 0,
          },
        }}
        sourceMode="official_fetch"
        onSourceModeChange={onSourceModeChange}
        onRefresh={() => {}}
        onOpenConfig={() => {}}
        onOpenDiff={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Firecrawl 手动抓取" }));

    expect(onSourceModeChange).toHaveBeenCalledWith("firecrawl_manual");
  });
});
