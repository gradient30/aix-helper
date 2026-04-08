import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type {
  DocRefreshDiffFilter,
  DocRefreshDiffItemView,
  DocRefreshReviewAction,
  DocRefreshRunView,
} from "@/features/docs-refresh/types";
import { GitCompareArrows, Layers3, Sparkles, TriangleAlert } from "lucide-react";

type DocDiffWorkbenchProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  run: DocRefreshRunView;
  items: DocRefreshDiffItemView[];
  onApplyAction: (itemId: string, action: DocRefreshReviewAction) => void;
  onDismiss: (itemId: string) => void;
  onApplyVisible?: (action: DocRefreshReviewAction, itemIds: string[]) => void;
  isApplying?: boolean;
};

const FILTER_LABELS: Record<DocRefreshDiffFilter, string> = {
  all: "全部",
  added: "新增",
  modified: "变更",
  stale: "过时",
  similar: "相似",
  pending: "未处理",
  reviewed: "已处理",
};

function getPrimaryText(payload: Record<string, unknown> | null): string {
  if (!payload) return "无数据";
  const title = payload.title;
  if (typeof title === "string" && title) return title;
  const command = payload.command;
  if (typeof command === "string" && command) return command;
  const entityKey = payload.entityKey;
  if (typeof entityKey === "string" && entityKey) return entityKey;
  return "未命名条目";
}

function getSecondaryText(payload: Record<string, unknown> | null): string | null {
  if (!payload) return null;
  const description = payload.description;
  if (typeof description === "string" && description) return description;
  const content = payload.content;
  if (typeof content === "string" && content) return content;
  const body = payload.body;
  if (typeof body === "string" && body) return body;
  const code = payload.code;
  if (typeof code === "string" && code) return code;
  return null;
}

function getReviewStatusClassName(status: DocRefreshDiffItemView["reviewStatus"]): string {
  if (status === "applied") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700";
  if (status === "dismissed") return "border-slate-500/30 bg-slate-500/10 text-slate-700";
  return "border-amber-500/30 bg-amber-500/10 text-amber-700";
}

function getRecommendedAction(item: DocRefreshDiffItemView): {
  action: DocRefreshReviewAction;
  label: string;
} {
  if (item.diffKind === "similar") {
    return { action: "replace_similar", label: "覆盖相似旧项" };
  }
  if (item.diffKind === "stale") {
    return { action: "delete_old", label: "删除老数据" };
  }
  return { action: "replace_all", label: "覆盖全部" };
}

function matchesFilter(item: DocRefreshDiffItemView, filter: DocRefreshDiffFilter): boolean {
  if (filter === "all") return true;
  if (filter === "pending") return item.reviewStatus === "pending";
  if (filter === "reviewed") return item.reviewStatus !== "pending";
  return item.diffKind === filter;
}

export function DocDiffWorkbench({
  open,
  onOpenChange,
  run,
  items,
  onApplyAction,
  onDismiss,
  onApplyVisible,
  isApplying,
}: DocDiffWorkbenchProps) {
  const [filter, setFilter] = useState<DocRefreshDiffFilter>("all");

  const filteredItems = useMemo(
    () => items.filter((item) => matchesFilter(item, filter)),
    [filter, items],
  );

  const visiblePendingItems = filteredItems.filter((item) => item.reviewStatus === "pending");
  const bulkAction = visiblePendingItems.length > 0
    ? getRecommendedAction(visiblePendingItems[0]).action
    : null;
  const canBulkApply = bulkAction !== null && visiblePendingItems.every(
    (item) => getRecommendedAction(item).action === bulkAction,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl gap-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompareArrows className="h-4 w-4" />
            差异工作台
          </DialogTitle>
          <DialogDescription>
            保留每次抓取后的差异记录。你可以按类型筛选，逐条处理，或对当前筛选结果执行批量应用。
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/25 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">来源 {run.sourceMode === "firecrawl_manual" ? "Firecrawl" : "Official"}</Badge>
            <Badge variant="outline">待处理 {run.summary.pending}</Badge>
            <Badge variant="outline">已应用 {run.summary.applied}</Badge>
            <Badge variant="outline">已忽略 {run.summary.dismissed}</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(FILTER_LABELS) as DocRefreshDiffFilter[]).map((value) => (
              <Button
                key={value}
                type="button"
                variant={filter === value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(value)}
              >
                {FILTER_LABELS[value]}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              当前筛选 {filteredItems.length} 条，未处理 {visiblePendingItems.length} 条
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canBulkApply || !bulkAction || isApplying}
              onClick={() => {
                if (!bulkAction || !onApplyVisible) return;
                onApplyVisible(bulkAction, visiblePendingItems.map((item) => item.id));
              }}
              className="gap-2"
            >
              <Layers3 className="h-4 w-4" />
              批量应用当前筛选
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <Card className="rounded-2xl border-dashed p-8 text-center text-sm text-muted-foreground">
                当前筛选下没有差异项。
              </Card>
            ) : (
              filteredItems.map((item) => {
                const recommendedAction = getRecommendedAction(item);
                const currentPayload = item.baselinePayload;
                const candidatePayload = item.candidatePayload;

                return (
                  <Card key={item.id} className="overflow-hidden rounded-2xl border border-border/70">
                    <div className="flex flex-col gap-4 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{FILTER_LABELS[item.diffKind]}</Badge>
                        <Badge variant="outline" className={getReviewStatusClassName(item.reviewStatus)}>
                          {item.reviewStatus === "pending" ? "待处理" : item.reviewStatus === "applied" ? "已应用" : "已忽略"}
                        </Badge>
                        <Badge variant="outline" className="font-mono text-[11px]">
                          {item.vendorId}
                        </Badge>
                        {typeof item.similarityScore === "number" && (
                          <Badge variant="outline">
                            相似度 {(item.similarityScore * 100).toFixed(0)}%
                          </Badge>
                        )}
                        <span className="truncate text-xs text-muted-foreground">{item.entityKey}</span>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                          <div className="mb-2 text-xs font-medium text-muted-foreground">当前版本</div>
                          <div className="text-sm font-semibold text-foreground">
                            {getPrimaryText(currentPayload)}
                          </div>
                          {getSecondaryText(currentPayload) && (
                            <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                              {getSecondaryText(currentPayload)}
                            </p>
                          )}
                          {!currentPayload && (
                            <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                              <TriangleAlert className="h-4 w-4" />
                              当前版本无对应条目
                            </div>
                          )}
                        </div>

                        <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                          <div className="mb-2 text-xs font-medium text-muted-foreground">抓取版本</div>
                          <div className="text-sm font-semibold text-foreground">
                            {getPrimaryText(candidatePayload)}
                          </div>
                          {getSecondaryText(candidatePayload) && (
                            <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                              {getSecondaryText(candidatePayload)}
                            </p>
                          )}
                          {!candidatePayload && (
                            <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                              <Sparkles className="h-4 w-4" />
                              本次抓取未返回替代内容
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => onApplyAction(item.id, recommendedAction.action)}
                          disabled={item.reviewStatus !== "pending" || isApplying}
                        >
                          {recommendedAction.label}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => onDismiss(item.id)}
                          disabled={item.reviewStatus !== "pending" || isApplying}
                        >
                          暂不处理
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
