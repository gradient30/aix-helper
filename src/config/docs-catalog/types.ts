import type { LucideIcon } from "lucide-react";

export type GuideVerificationStatus = "pass" | "warn" | "fail";

export type GuideVerificationSource =
  | "official_doc"
  | "official_repo"
  | "registry";

export type GuideSupportLevel = "official" | "unsupported";

export type GuideVerificationMeta = {
  last_verified_at: string;
  verification_status: GuideVerificationStatus;
  verification_reason: string;
  source_url: string;
  source_anchor?: string;
  verification_source: GuideVerificationSource;
};

export type GuideCommandBadge =
  | "slash"
  | "flag"
  | "shortcut"
  | "cli"
  | "interactive"
  | "at"
  | "shell";

export type GuideItemBadge =
  | "path"
  | "command"
  | "field"
  | "config"
  | "template"
  | "prereq"
  | "install"
  | "verify"
  | "scenario"
  | "optimize"
  | "debug"
  | "faq";

export type GuideCommand = {
  command: string;
  description: string;
  usage?: string;
  badge?: GuideCommandBadge;
  subcommands?: { command: string; description: string }[];
  support_level: GuideSupportLevel;
  verification: GuideVerificationMeta;
};

export type GuideGroup<TItem> = {
  category: string;
  icon: LucideIcon;
  items: TItem[];
  verification: GuideVerificationMeta;
};

export type CliGuideTool = {
  id: "claude" | "codex" | "gemini";
  name: string;
  official_url: string;
  support_level: GuideSupportLevel;
  verification: GuideVerificationMeta;
  groups: GuideGroup<GuideCommand>[];
};

export type GuideContentItem = {
  title: string;
  description: string;
  code?: string;
  badge?: GuideItemBadge;
  table?: { headers: string[]; rows: string[][] };
  support_level: GuideSupportLevel;
  verification: GuideVerificationMeta;
};

export type SkillsGuideTool = {
  id: "claude" | "codex" | "gemini";
  name: string;
  official_url: string;
  support_level: GuideSupportLevel;
  verification: GuideVerificationMeta;
  groups: GuideGroup<GuideContentItem>[];
  templates: { filename: string; content: string; label: string }[];
};

export type SetupGuideTool = {
  id: "claude" | "codex" | "gemini";
  name: string;
  official_url: string;
  support_level: GuideSupportLevel;
  verification: GuideVerificationMeta;
  groups: GuideGroup<GuideContentItem>[];
};

export type HelpDocCatalog = {
  providers: GuideVerificationMeta;
  mcp: GuideVerificationMeta;
  skills: GuideVerificationMeta;
  export: GuideVerificationMeta;
  local_deploy: GuideVerificationMeta;
};
