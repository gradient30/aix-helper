import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  applyDocRefreshDecision,
  clearDocRefreshSettings,
  dismissDocRefreshDecision,
  fetchDocRefreshDiffItems,
  fetchDocRefreshSettings,
  fetchLatestDocRefreshRun,
  saveDocRefreshSettings,
  triggerDocRefresh,
  type ApplyDocRefreshDecisionInput,
  type TriggerDocRefreshInput,
} from "./api";
import type { DocRefreshDiffItemView, DocRefreshScope } from "./types";

export function useDocRefreshSettings() {
  return useQuery({
    queryKey: ["doc-refresh-settings"],
    queryFn: fetchDocRefreshSettings,
  });
}

export function useLatestDocRefreshRun(scope: DocRefreshScope, pageRoute: string) {
  return useQuery({
    queryKey: ["doc-refresh-run", scope, pageRoute],
    queryFn: () => fetchLatestDocRefreshRun(scope, pageRoute),
  });
}

export function useDocRefreshDiffItems(runId: string | null) {
  return useQuery({
    queryKey: ["doc-refresh-diff-items", runId],
    queryFn: () => fetchDocRefreshDiffItems(runId as string),
    enabled: Boolean(runId),
  });
}

export function useTriggerDocRefresh() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TriggerDocRefreshInput) => triggerDocRefresh(input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doc-refresh-run", variables.scope, variables.pageRoute],
      });
    },
  });
}

export function useSaveDocRefreshSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (firecrawlKey: string) => saveDocRefreshSettings(firecrawlKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doc-refresh-settings"] });
    },
  });
}

export function useClearDocRefreshSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearDocRefreshSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doc-refresh-settings"] });
    },
  });
}

export function useApplyDocRefreshDecision(scope: DocRefreshScope, pageRoute: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ApplyDocRefreshDecisionInput) => applyDocRefreshDecision(input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doc-refresh-run", scope, pageRoute],
      });
      queryClient.invalidateQueries({
        queryKey: ["doc-refresh-diff-items", variables.item.runId],
      });
    },
  });
}

export function useDismissDocRefreshDecision(scope: DocRefreshScope, pageRoute: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, runId }: { itemId: string; runId: string }) => dismissDocRefreshDecision(itemId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doc-refresh-run", scope, pageRoute],
      });
      queryClient.invalidateQueries({
        queryKey: ["doc-refresh-diff-items", variables.runId],
      });
    },
  });
}

export async function applyDocRefreshDecisionBatch(args: {
  items: DocRefreshDiffItemView[];
  mutateAsync: (input: ApplyDocRefreshDecisionInput) => Promise<unknown>;
}) {
  for (const item of args.items) {
    const action = item.diffKind === "similar"
      ? "replace_similar"
      : item.diffKind === "stale"
        ? "delete_old"
        : "replace_all";

    await args.mutateAsync({
      item,
      action,
    });
  }
}
