import { BookOpen, Terminal } from "lucide-react";

import type {
  CliGuideTool,
  GuideCommand,
  GuideCommandBadge,
  GuideContentItem,
  GuideGroup,
  GuideItemBadge,
  GuideSupportLevel,
  GuideVerificationMeta,
  SetupGuideTool,
  SkillsGuideTool,
} from "@/config/docs-catalog/types";
import { buildCliCommandEntityKey, buildGuideEntityKey } from "./entity-keys";

export type PublishedDocCatalogOverride = {
  entityKey: string;
  overrideType: "upsert" | "delete";
  payload: Record<string, unknown> | null;
  scope: "cli" | "skills" | "setup" | "help";
  vendorId: string;
};

const COMMAND_BADGES: GuideCommandBadge[] = [
  "slash",
  "flag",
  "shortcut",
  "cli",
  "interactive",
  "at",
  "shell",
  "setting",
  "workflow",
  "tip",
];

const ITEM_BADGES: GuideItemBadge[] = [
  "path",
  "command",
  "field",
  "config",
  "template",
  "prereq",
  "install",
  "verify",
  "scenario",
  "optimize",
  "debug",
  "faq",
  "setting",
  "workflow",
  "tip",
];

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function readString(payload: Record<string, unknown> | null, key: string): string | undefined {
  const value = payload?.[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

function readStringArray(payload: Record<string, unknown> | null, key: string): string[] | undefined {
  const value = payload?.[key];
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0);
  return items.length > 0 ? items : undefined;
}

function readTable(payload: Record<string, unknown> | null, key: string): GuideContentItem["table"] | undefined {
  const table = asRecord(payload?.[key]);
  if (!table) return undefined;

  const headers = Array.isArray(table.headers)
    ? table.headers.filter((value): value is string => typeof value === "string")
    : [];
  const rows = Array.isArray(table.rows)
    ? table.rows
      .filter((row): row is unknown[] => Array.isArray(row))
      .map((row) => row.filter((cell): cell is string => typeof cell === "string"))
      .filter((row) => row.length > 0)
    : [];

  if (headers.length === 0 || rows.length === 0) return undefined;
  return { headers, rows };
}

function readSubcommands(payload: Record<string, unknown> | null): GuideCommand["subcommands"] | undefined {
  const value = payload?.subcommands;
  if (!Array.isArray(value)) return undefined;

  const subcommands = value
    .map((entry) => asRecord(entry))
    .filter((entry): entry is Record<string, unknown> => Boolean(entry))
    .map((entry) => {
      const command = readString(entry, "command");
      const description = readString(entry, "description");
      if (!command || !description) return null;
      return { command, description };
    })
    .filter((entry): entry is { command: string; description: string } => Boolean(entry));

  return subcommands.length > 0 ? subcommands : undefined;
}

function readSupportLevel(payload: Record<string, unknown> | null, fallback: GuideSupportLevel): GuideSupportLevel {
  const value = payload?.support_level;
  return value === "official" || value === "unsupported" ? value : fallback;
}

function readCommandBadge(payload: Record<string, unknown> | null, fallback?: GuideCommandBadge): GuideCommandBadge | undefined {
  const value = payload?.badge;
  return typeof value === "string" && COMMAND_BADGES.includes(value as GuideCommandBadge)
    ? value as GuideCommandBadge
    : fallback;
}

function readItemBadge(payload: Record<string, unknown> | null, fallback?: GuideItemBadge): GuideItemBadge | undefined {
  const value = payload?.badge;
  return typeof value === "string" && ITEM_BADGES.includes(value as GuideItemBadge)
    ? value as GuideItemBadge
    : fallback;
}

function readVerification(payload: Record<string, unknown> | null, fallback: GuideVerificationMeta): GuideVerificationMeta {
  const verification = asRecord(payload?.verification);
  if (!verification) return fallback;

  const lastVerifiedAt = readString(verification, "last_verified_at");
  const verificationStatus = verification.verification_status;
  const verificationReason = readString(verification, "verification_reason");
  const sourceUrl = readString(verification, "source_url");
  const sourceAnchor = readString(verification, "source_anchor");
  const verificationSource = verification.verification_source;

  if (
    !lastVerifiedAt ||
    (verificationStatus !== "pass" && verificationStatus !== "warn" && verificationStatus !== "fail") ||
    !verificationReason ||
    !sourceUrl ||
    (verificationSource !== "official_doc" && verificationSource !== "official_repo" && verificationSource !== "registry")
  ) {
    return fallback;
  }

  return {
    last_verified_at: lastVerifiedAt,
    verification_status: verificationStatus,
    verification_reason: verificationReason,
    source_url: sourceUrl,
    source_anchor: sourceAnchor,
    verification_source: verificationSource,
  };
}

function parseCliEntityKey(entityKey: string): { vendorId: string; category: string; command: string } | null {
  const parts = entityKey.split(":");
  if (parts.length < 4 || parts[0] !== "cli") return null;
  const vendorId = parts[1];
  const category = parts[2];
  const command = parts.slice(3).join(":");
  if (!vendorId || !category || !command) return null;
  return { vendorId, category, command };
}

function parseGuideEntityKey(
  scope: "skills" | "setup",
  entityKey: string,
): { vendorId: string; category: string; title: string } | null {
  const parts = entityKey.split(":");
  if (parts.length < 5 || parts[0] !== "guide" || parts[1] !== scope) return null;
  const vendorId = parts[2];
  const category = parts[3];
  const title = parts.slice(4).join(":");
  if (!vendorId || !category || !title) return null;
  return { vendorId, category, title };
}

function mergeCliItem(
  base: GuideCommand | null,
  payload: Record<string, unknown> | null,
  fallbackCommand: string,
  fallbackVerification: GuideVerificationMeta,
): GuideCommand {
  return {
    command: readString(payload, "command") ?? base?.command ?? fallbackCommand,
    description: readString(payload, "description") ?? base?.description ?? fallbackCommand,
    usage: readString(payload, "usage") ?? base?.usage,
    badge: readCommandBadge(payload, base?.badge),
    subcommands: readSubcommands(payload) ?? base?.subcommands,
    support_level: readSupportLevel(payload, base?.support_level ?? "official"),
    verification: readVerification(payload, base?.verification ?? fallbackVerification),
    examples: readStringArray(payload, "examples") ?? base?.examples,
    aliases: readStringArray(payload, "aliases") ?? base?.aliases,
    sourceUrl: readString(payload, "sourceUrl") ?? base?.sourceUrl,
    communityTips: readStringArray(payload, "communityTips") ?? base?.communityTips,
  };
}

function mergeGuideItem(
  base: GuideContentItem | null,
  payload: Record<string, unknown> | null,
  fallbackTitle: string,
  fallbackVerification: GuideVerificationMeta,
): GuideContentItem {
  return {
    title: readString(payload, "title") ?? base?.title ?? fallbackTitle,
    description: readString(payload, "description") ?? base?.description ?? fallbackTitle,
    code: readString(payload, "code") ?? base?.code,
    badge: readItemBadge(payload, base?.badge),
    table: readTable(payload, "table") ?? base?.table,
    support_level: readSupportLevel(payload, base?.support_level ?? "official"),
    verification: readVerification(payload, base?.verification ?? fallbackVerification),
    sourceUrl: readString(payload, "sourceUrl") ?? base?.sourceUrl,
    relatedCommands: readStringArray(payload, "relatedCommands") ?? base?.relatedCommands,
  };
}

function finalizeGroupOrder<TItem, TTool extends { groups: GuideGroup<TItem>[] }>(
  originalGroups: TTool["groups"],
  groupsByCategory: Map<string, GuideGroup<TItem>>,
): GuideGroup<TItem>[] {
  const ordered: GuideGroup<TItem>[] = [];

  for (const group of originalGroups) {
    const nextGroup = groupsByCategory.get(group.category);
    if (nextGroup && nextGroup.items.length > 0) {
      ordered.push(nextGroup);
      groupsByCategory.delete(group.category);
    }
  }

  for (const group of groupsByCategory.values()) {
    if (group.items.length > 0) {
      ordered.push(group);
    }
  }

  return ordered;
}

export function applyCliGuideOverrides(
  tools: CliGuideTool[],
  overrides: PublishedDocCatalogOverride[],
): CliGuideTool[] {
  return tools.map((tool) => {
    const toolOverrides = overrides.filter((override) => override.scope === "cli" && override.vendorId === tool.id);
    if (toolOverrides.length === 0) return tool;

    const overrideByKey = new Map(toolOverrides.map((override) => [override.entityKey, override] as const));
    const groupsByCategory = new Map<string, GuideGroup<GuideCommand>>(
      tool.groups.map((group) => [group.category, { ...group, items: [] }]),
    );
    const iconByCategory = new Map(tool.groups.map((group) => [group.category, group.icon]));
    const verificationByCategory = new Map(tool.groups.map((group) => [group.category, group.verification]));
    const consumedKeys = new Set<string>();

    for (const group of tool.groups) {
      const nextGroup = groupsByCategory.get(group.category)!;

      for (const item of group.items) {
        const entityKey = buildCliCommandEntityKey(tool.id, group.category, item.command);
        const override = overrideByKey.get(entityKey);
        if (!override) {
          nextGroup.items.push(item);
          continue;
        }

        consumedKeys.add(entityKey);
        if (override.overrideType === "delete") {
          continue;
        }

        nextGroup.items.push(mergeCliItem(item, override.payload, item.command, item.verification));
      }
    }

    for (const override of toolOverrides) {
      if (override.overrideType !== "upsert" || consumedKeys.has(override.entityKey)) continue;
      const parsed = parseCliEntityKey(override.entityKey);
      if (!parsed || parsed.vendorId !== tool.id) continue;

      const currentGroup = groupsByCategory.get(parsed.category) ?? {
        category: parsed.category,
        icon: iconByCategory.get(parsed.category) ?? Terminal,
        verification: verificationByCategory.get(parsed.category) ?? tool.verification,
        items: [],
      };

      currentGroup.items.push(
        mergeCliItem(
          null,
          override.payload,
          parsed.command,
          currentGroup.verification,
        ),
      );
      groupsByCategory.set(parsed.category, currentGroup);
    }

    return {
      ...tool,
      groups: finalizeGroupOrder(tool.groups, groupsByCategory),
    };
  });
}

export function applyGuideToolOverrides<TTool extends SkillsGuideTool | SetupGuideTool>(
  scope: "skills" | "setup",
  tools: TTool[],
  overrides: PublishedDocCatalogOverride[],
): TTool[] {
  return tools.map((tool) => {
    const toolOverrides = overrides.filter((override) => override.scope === scope && override.vendorId === tool.id);
    if (toolOverrides.length === 0) return tool;

    const overrideByKey = new Map(toolOverrides.map((override) => [override.entityKey, override] as const));
    const groupsByCategory = new Map<string, GuideGroup<GuideContentItem>>(
      tool.groups.map((group) => [group.category, { ...group, items: [] }]),
    );
    const iconByCategory = new Map(tool.groups.map((group) => [group.category, group.icon]));
    const verificationByCategory = new Map(tool.groups.map((group) => [group.category, group.verification]));
    const consumedKeys = new Set<string>();

    for (const group of tool.groups) {
      const nextGroup = groupsByCategory.get(group.category)!;

      for (const item of group.items) {
        const entityKey = buildGuideEntityKey(scope, tool.id, group.category, item.title);
        const override = overrideByKey.get(entityKey);
        if (!override) {
          nextGroup.items.push(item);
          continue;
        }

        consumedKeys.add(entityKey);
        if (override.overrideType === "delete") {
          continue;
        }

        nextGroup.items.push(mergeGuideItem(item, override.payload, item.title, item.verification));
      }
    }

    for (const override of toolOverrides) {
      if (override.overrideType !== "upsert" || consumedKeys.has(override.entityKey)) continue;
      const parsed = parseGuideEntityKey(scope, override.entityKey);
      if (!parsed || parsed.vendorId !== tool.id) continue;

      const currentGroup = groupsByCategory.get(parsed.category) ?? {
        category: parsed.category,
        icon: iconByCategory.get(parsed.category) ?? BookOpen,
        verification: verificationByCategory.get(parsed.category) ?? tool.verification,
        items: [],
      };

      currentGroup.items.push(
        mergeGuideItem(
          null,
          override.payload,
          parsed.title,
          currentGroup.verification,
        ),
      );
      groupsByCategory.set(parsed.category, currentGroup);
    }

    return {
      ...tool,
      groups: finalizeGroupOrder(tool.groups, groupsByCategory),
    };
  });
}
