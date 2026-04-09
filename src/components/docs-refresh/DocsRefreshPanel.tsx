import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/errors";
import {
  useApplyDocRefreshDecision,
  useClearDocRefreshSettings,
  useDismissDocRefreshDecision,
  useDocRefreshDiffItems,
  useDocRefreshSettings,
  useLatestDocRefreshRun,
  useSaveDocRefreshSettings,
  useTriggerDocRefresh,
} from "@/features/docs-refresh/hooks";
import type { DocRefreshScope, DocRefreshSourceMode } from "@/features/docs-refresh/types";
import { DocDiffWorkbench } from "./DocDiffWorkbench";
import { DocRefreshToolbar } from "./DocRefreshToolbar";
import { FirecrawlConfigDialog } from "./FirecrawlConfigDialog";

type DocsRefreshPanelProps = {
  scope: DocRefreshScope;
  pageRoute: string;
  vendorId?: string | null;
};

const EMPTY_SETTINGS = {
  firecrawlConfigured: false,
  firecrawlKeyMask: null,
  firecrawlLastVerifiedAt: null,
};

const EMPTY_RUN_SUMMARY = {
  totalSources: 0,
  successfulSnapshots: 0,
  failedSources: 0,
  pending: 0,
  applied: 0,
  dismissed: 0,
};

export function DocsRefreshPanel({ scope, pageRoute, vendorId }: DocsRefreshPanelProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [sourceMode, setSourceMode] = useState<DocRefreshSourceMode>("official_fetch");

  const settingsQuery = useDocRefreshSettings();
  const runQuery = useLatestDocRefreshRun(scope, pageRoute);
  const diffItemsQuery = useDocRefreshDiffItems(runQuery.data?.runId ?? null);
  const triggerMutation = useTriggerDocRefresh();
  const saveSettingsMutation = useSaveDocRefreshSettings();
  const clearSettingsMutation = useClearDocRefreshSettings();
  const applyDecisionMutation = useApplyDocRefreshDecision(scope, pageRoute);
  const dismissDecisionMutation = useDismissDocRefreshDecision(scope, pageRoute);

  const settings = settingsQuery.data ?? EMPTY_SETTINGS;
  const run = runQuery.data ?? {
    runId: null,
    scope,
    pageRoute,
    sourceMode: sourceMode,
    status: "idle" as const,
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    summary: EMPTY_RUN_SUMMARY,
  };
  const diffItems = diffItemsQuery.data ?? [];

  const refreshDisabled = triggerMutation.isPending
    || (sourceMode === "firecrawl_manual" && !settings.firecrawlConfigured);
  const configErrorMessage = saveSettingsMutation.error
    ? getErrorMessage(saveSettingsMutation.error)
    : clearSettingsMutation.error
      ? getErrorMessage(clearSettingsMutation.error)
      : null;

  const handleConfigOpenChange = (open: boolean) => {
    if (!open) {
      saveSettingsMutation.reset();
      clearSettingsMutation.reset();
    }
    setIsConfigOpen(open);
  };

  return (
    <>
      <DocRefreshToolbar
        run={run}
        sourceMode={sourceMode}
        onSourceModeChange={setSourceMode}
        onRefresh={() => {
          if (sourceMode === "firecrawl_manual" && !settings.firecrawlConfigured) {
            setIsConfigOpen(true);
            return;
          }

          triggerMutation.mutate({
            scope,
            pageRoute,
            vendorIds: vendorId ? [vendorId] : [],
            sourceMode,
          });
        }}
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenDiff={() => setIsDiffOpen(true)}
        refreshDisabled={refreshDisabled}
        diffDisabled={!run.runId}
      />

      <FirecrawlConfigDialog
        open={isConfigOpen}
        onOpenChange={handleConfigOpenChange}
        settings={settings}
        onSave={(firecrawlKey) => {
          clearSettingsMutation.reset();
          saveSettingsMutation.reset();
          saveSettingsMutation.mutate(firecrawlKey, {
            onSuccess: (data) => {
              toast({
                title: "Firecrawl Key 已保存",
                description: data.firecrawlKeyMask ? `当前掩码：${data.firecrawlKeyMask}` : undefined,
              });
              setIsConfigOpen(false);
            },
            onError: (error) => {
              toast({
                title: "Firecrawl Key 保存失败",
                description: getErrorMessage(error),
                variant: "destructive",
              });
            },
          });
        }}
        onClear={() => {
          saveSettingsMutation.reset();
          clearSettingsMutation.reset();
          clearSettingsMutation.mutate(undefined, {
            onSuccess: () => {
              toast({ title: "Firecrawl Key 已清除" });
              setIsConfigOpen(false);
            },
            onError: (error) => {
              toast({
                title: "Firecrawl Key 清除失败",
                description: getErrorMessage(error),
                variant: "destructive",
              });
            },
          });
        }}
        isSaving={saveSettingsMutation.isPending}
        isClearing={clearSettingsMutation.isPending}
        errorMessage={configErrorMessage}
      />

      <DocDiffWorkbench
        open={isDiffOpen}
        onOpenChange={setIsDiffOpen}
        run={run}
        items={diffItems}
        onApplyAction={(itemId, action) => {
          const item = diffItems.find((entry) => entry.id === itemId);
          if (!item) return;

          applyDecisionMutation.mutate({
            item,
            action,
          });
        }}
        onDismiss={(itemId) => {
          if (!run.runId) return;
          dismissDecisionMutation.mutate({
            itemId,
            runId: run.runId,
          });
        }}
        onApplyVisible={(action, itemIds) => {
          void (async () => {
            for (const itemId of itemIds) {
              const item = diffItems.find((entry) => entry.id === itemId);
              if (!item) continue;

              await applyDecisionMutation.mutateAsync({
                item,
                action,
              });
            }
          })();
        }}
        isApplying={applyDecisionMutation.isPending || dismissDecisionMutation.isPending}
      />
    </>
  );
}
