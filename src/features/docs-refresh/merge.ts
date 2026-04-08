import type { DocRefreshOverride } from "./types";

function getEntityKey(item: { entityKey: string }): string {
  return item.entityKey;
}

export function mergeOverrides<T extends { entityKey: string }>(
  baseline: T[],
  overrides: DocRefreshOverride<T>[],
): T[] {
  const baselineIndexByKey = new Map<string, number>();
  baseline.forEach((item, index) => baselineIndexByKey.set(getEntityKey(item), index));

  const tombstones = new Set(
    overrides
      .filter((override) => override.overrideType === "delete")
      .map((override) => override.entityKey),
  );

  const upserts = new Map<string, T>();
  const appendedKeys: string[] = [];

  for (const override of overrides) {
    if (override.overrideType !== "upsert") continue;
    upserts.set(override.entityKey, override.payload);
    if (!baselineIndexByKey.has(override.entityKey) && !appendedKeys.includes(override.entityKey)) {
      appendedKeys.push(override.entityKey);
    }
  }

  const merged: T[] = [];

  for (const item of baseline) {
    const key = getEntityKey(item);
    if (tombstones.has(key) && !upserts.has(key)) {
      continue;
    }

    merged.push(upserts.get(key) ?? item);
  }

  for (const key of appendedKeys) {
    const payload = upserts.get(key);
    if (payload) merged.push(payload);
  }

  return merged;
}
