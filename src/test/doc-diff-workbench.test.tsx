import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DocDiffWorkbench } from "@/components/docs-refresh/DocDiffWorkbench";

describe("DocDiffWorkbench", () => {
  it("filters pending items and dispatches review actions", () => {
    const onApplyAction = vi.fn();
    const onDismiss = vi.fn();
    const onApplyVisible = vi.fn();

    render(
      <DocDiffWorkbench
        open
        onOpenChange={() => {}}
        run={{
          runId: "run-1",
          scope: "skills",
          pageRoute: "/skills-guide",
          sourceMode: "firecrawl_manual",
          status: "partial_success",
          startedAt: "2026-04-08T10:00:00.000Z",
          finishedAt: "2026-04-08T10:02:00.000Z",
          errorMessage: null,
          summary: {
            totalSources: 4,
            successfulSnapshots: 3,
            failedSources: 1,
            pending: 2,
            applied: 1,
            dismissed: 0,
          },
        }}
        items={[
          {
            id: "diff-added",
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
              description: "最新官方技能工作流。",
            },
            similarCandidates: [],
            createdAt: "2026-04-08T10:02:00.000Z",
            updatedAt: "2026-04-08T10:02:00.000Z",
          },
          {
            id: "diff-stale",
            runId: "run-1",
            scope: "skills",
            vendorId: "codex",
            entityKey: "guide:skills:codex:workflow:Legacy Skill",
            diffKind: "stale",
            reviewAction: "delete_old",
            reviewStatus: "applied",
            similarityScore: null,
            baselinePayload: {
              title: "Legacy Skill",
              description: "已过时的旧内容。",
            },
            candidatePayload: null,
            similarCandidates: [],
            createdAt: "2026-04-08T10:02:00.000Z",
            updatedAt: "2026-04-08T10:03:00.000Z",
          },
        ]}
        onApplyAction={onApplyAction}
        onDismiss={onDismiss}
        onApplyVisible={onApplyVisible}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "未处理" }));

    expect(screen.getByText("Agent Skills")).toBeInTheDocument();
    expect(screen.queryByText("Legacy Skill")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "批量应用当前筛选" }));
    expect(onApplyVisible).toHaveBeenCalledWith("replace_all", ["diff-added"]);

    fireEvent.click(screen.getByRole("button", { name: "覆盖全部" }));
    expect(onApplyAction).toHaveBeenCalledWith("diff-added", "replace_all");

    fireEvent.click(screen.getByRole("button", { name: "暂不处理" }));
    expect(onDismiss).toHaveBeenCalledWith("diff-added");
  });
});
