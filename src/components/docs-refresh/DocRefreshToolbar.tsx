import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DocRefreshRunView, DocRefreshSourceMode } from "@/features/docs-refresh/types";
import { GitCompareArrows, RefreshCw, Settings2, Sparkles, TriangleAlert } from "lucide-react";

type DocRefreshToolbarProps = {
  run: DocRefreshRunView;
  sourceMode?: DocRefreshSourceMode;
  onSourceModeChange?: (mode: DocRefreshSourceMode) => void;
  onRefresh: () => void;
  onOpenConfig: () => void;
  onOpenDiff: () => void;
  refreshDisabled?: boolean;
  configDisabled?: boolean;
  diffDisabled?: boolean;
};

const STATUS_LABELS: Record<DocRefreshRunView["status"], string> = {
  idle: "尚未刷新",
  running: "刷新中",
  success: "已完成",
  partial_success: "部分成功",
  failed: "刷新失败",
};

const STATUS_CLASS_NAMES: Record<DocRefreshRunView["status"], string> = {
  idle: "border-border/60 bg-muted/60 text-muted-foreground",
  running: "border-blue-500/30 bg-blue-500/10 text-blue-700",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
  partial_success: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  failed: "border-red-500/30 bg-red-500/10 text-red-700",
};

function formatTimestamp(value: string | null): string {
  if (!value) return "未记录";
  return new Date(value).toLocaleString("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DocRefreshToolbar({
  run,
  sourceMode,
  onSourceModeChange,
  onRefresh,
  onOpenConfig,
  onOpenDiff,
  refreshDisabled,
  configDisabled,
  diffDisabled,
}: DocRefreshToolbarProps) {
  const activeSourceMode = sourceMode ?? run.sourceMode ?? "official_fetch";

  return (
    <Card className="overflow-hidden border border-border/70 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted))/0.4)] p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={`h-6 rounded-full px-2.5 text-[11px] font-medium ${STATUS_CLASS_NAMES[run.status]}`}
            >
              {STATUS_LABELS[run.status]}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-2.5 text-[11px]">
              来源 {run.sourceMode === "firecrawl_manual" ? "Firecrawl" : "Official"}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-2.5 text-[11px]">
              待处理 {run.summary.pending}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              已抓取 {run.summary.successfulSnapshots}/{run.summary.totalSources}
            </span>
            <span>失败 {run.summary.failedSources}</span>
            <span>最近完成 {formatTimestamp(run.finishedAt)}</span>
          </div>

          {run.errorMessage && (
            <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-2 text-xs text-red-700">
              <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{run.errorMessage}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {onSourceModeChange && (
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={activeSourceMode === "official_fetch" ? "default" : "outline"}
                onClick={() => onSourceModeChange("official_fetch")}
              >
                官方直抓
              </Button>
              <Button
                type="button"
                size="sm"
                variant={activeSourceMode === "firecrawl_manual" ? "default" : "outline"}
                onClick={() => onSourceModeChange("firecrawl_manual")}
              >
                Firecrawl 手动抓取
              </Button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onRefresh} disabled={refreshDisabled} className="min-w-[112px] gap-2">
            <RefreshCw className="h-4 w-4" />
            数据刷新
          </Button>
          <Button variant="outline" onClick={onOpenConfig} disabled={configDisabled} className="min-w-[128px] gap-2">
            <Settings2 className="h-4 w-4" />
            Firecrawl 配置
          </Button>
          <Button variant="outline" onClick={onOpenDiff} disabled={diffDisabled} className="min-w-[112px] gap-2">
            <GitCompareArrows className="h-4 w-4" />
            查看差异
          </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
