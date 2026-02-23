import { BookOpen, Eye, FileText, FolderTree, Play, Rocket, Settings, Shield } from "lucide-react";
import type { GuideVerificationMeta, SkillsGuideTool } from "./types";

const VERIFIED_AT = "2026-02-23";

function meta(
  source_url: string,
  verification_reason: string,
  source_anchor = "",
  verification_status: "pass" | "warn" | "fail" = "pass",
): GuideVerificationMeta {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status,
    verification_reason,
    source_url,
    source_anchor,
    verification_source: "official_doc",
  };
}

const claudeSkillsDoc = "https://docs.anthropic.com/en/docs/claude-code/skills";
const codexSkillsDoc = "https://developers.openai.com/codex/prompting";
const geminiRoot = "https://google-gemini.github.io/gemini-cli/";

export const SKILLS_GUIDE_TOOLS: SkillsGuideTool[] = [
  {
    id: "claude",
    name: "Claude Code",
    official_url: claudeSkillsDoc,
    support_level: "official",
    verification: meta(claudeSkillsDoc, "Claude Skills 官方文档可访问。"),
    groups: [
      {
        category: "概述",
        icon: BookOpen,
        verification: meta(claudeSkillsDoc, "定义与机制来自官方 skills 页面。"),
        items: [
          {
            title: "Skills 定义",
            description: "Skill 是按需加载的指令模块，每个 Skill 目录包含一个 SKILL.md。Claude 会按请求语义自动匹配和调用。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方定义"),
          },
          {
            title: "加载策略",
            description: "Skills 使用渐进式加载，避免将全部工作流预先注入上下文。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方行为说明"),
          },
        ],
      },
      {
        category: "目录结构",
        icon: FolderTree,
        verification: meta(claudeSkillsDoc, "目录规则来自官方 skills 页面。"),
        items: [
          {
            title: "项目级",
            description: "项目内 Skill 目录路径。",
            code: ".claude/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方路径"),
          },
          {
            title: "用户级",
            description: "用户全局 Skill 目录路径。",
            code: "~/.claude/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方路径"),
          },
        ],
      },
      {
        category: "调用方式",
        icon: Play,
        verification: meta(claudeSkillsDoc, "调用语法来自官方 skills 页面。"),
        items: [
          {
            title: "自动调用",
            description: "在自然语言任务匹配到 skill 描述时，Claude 可自动加载对应 Skill。",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方说明"),
          },
          {
            title: "显式调用",
            description: "可使用 `$skill-name` 显式触发指定 Skill。",
            code: "$code-review 请审查 src/main.ts",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方语法"),
          },
        ],
      },
      {
        category: "SKILL.md 结构",
        icon: FileText,
        verification: meta(claudeSkillsDoc, "文件结构来自官方示例。"),
        items: [
          {
            title: "Frontmatter + 指令正文",
            description: "SKILL.md 使用 YAML frontmatter 定义元数据，并用 Markdown 编写任务指令。",
            code: `---
name: code-review
description: Review code changes with security and reliability checks
---

# Workflow
1. Read the diff
2. Identify bugs and risks
3. Propose actionable fixes`,
            badge: "template",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方示例结构"),
          },
        ],
      },
    ],
    templates: [
      {
        filename: "SKILL.md",
        label: "Claude Skill Template",
        content: `---
name: your-skill-name
description: Describe when this skill should be used
---

# Objective
Describe the goal.

# Steps
1. Step one
2. Step two

# Output
Expected result format.`,
      },
    ],
  },
  {
    id: "codex",
    name: "Codex CLI",
    official_url: codexSkillsDoc,
    support_level: "official",
    verification: meta(codexSkillsDoc, "Codex Agent Skills 官方文档可访问。"),
    groups: [
      {
        category: "概述",
        icon: BookOpen,
        verification: meta(codexSkillsDoc, "定义来自 Codex Agent Skills 文档。"),
        items: [
          {
            title: "Agent Skills 机制",
            description: "Codex 使用 Agent Skills 作为可复用能力包，按任务语义按需加载。",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方定义"),
          },
          {
            title: "官方优先语义",
            description: "本手册仅保留官方可验证的 Skills 语义，不收录社区未验证命令。",
            support_level: "official",
            verification: meta(codexSkillsDoc, "治理策略"),
          },
        ],
      },
      {
        category: "目录与作用域",
        icon: FolderTree,
        verification: meta(codexSkillsDoc, "路径来自官方 Agent Skills 文档。"),
        items: [
          {
            title: "项目级目录",
            description: "仓库级 Skills 目录。",
            code: ".agents/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方路径"),
          },
          {
            title: "用户级目录",
            description: "用户全局 Skills 目录。",
            code: "~/.agents/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方路径"),
          },
        ],
      },
      {
        category: "编写规范",
        icon: Settings,
        verification: meta(codexSkillsDoc, "结构规范来自官方示例。"),
        items: [
          {
            title: "SKILL.md 结构",
            description: "保持单一职责，明确触发条件、执行步骤、输入输出与失败处理。",
            code: `---
name: migrate-db
description: Plan and execute safe schema migration
---

# Inputs
- migration target

# Workflow
1. Inspect schema
2. Propose migration plan
3. Apply and verify`,
            badge: "template",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方示例"),
          },
          {
            title: "调用方式",
            description: "可按提示语义自动调用，也可通过 `$skill-name` 显式调用。",
            code: "$migrate-db users table",
            badge: "command",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方说明"),
          },
        ],
      },
      {
        category: "质量要求",
        icon: Shield,
        verification: meta(codexSkillsDoc, "质量原则与官方 Agentic 编程文档一致。"),
        items: [
          {
            title: "最小漂移原则",
            description: "禁止使用过时字段名与历史路径（例如旧版 skills 路径与 legacy 审批字段）。",
            badge: "config",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方当前语义约束"),
          },
          {
            title: "可验证输出",
            description: "Skill 输出必须可被测试或命令验证，避免仅描述性结果。",
            badge: "field",
            support_level: "official",
            verification: meta(codexSkillsDoc, "实践约束"),
          },
        ],
      },
    ],
    templates: [
      {
        filename: "SKILL.md",
        label: "Codex Skill Template",
        content: `---
name: your-codex-skill
description: Define when this skill should run
---

# Inputs
- required inputs

# Process
1. Inspect context
2. Execute workflow
3. Validate result

# Output
Expected artifacts and checks.`,
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    official_url: geminiRoot,
    support_level: "unsupported",
    verification: meta(
      geminiRoot,
      "Gemini CLI 官方文档当前未提供稳定 Skills 命令体系，按 unsupported 管理。",
      "",
      "warn",
    ),
    groups: [
      {
        category: "状态说明",
        icon: Eye,
        verification: meta(
          geminiRoot,
          "官方文档未提供稳定 `/skills` 或 `gemini skills` 命令参考。",
          "",
          "warn",
        ),
        items: [
          {
            title: "当前策略",
            description: "Gemini Skills 命令区已下线。当前页面仅保留官方入口和兼容性说明，不提供未验证命令示例。",
            badge: "config",
            support_level: "unsupported",
            verification: meta(geminiRoot, "策略说明", "", "warn"),
          },
          {
            title: "替代建议",
            description: "如需扩展能力，优先使用官方文档支持的 MCP 与扩展机制，并以官方发布为准。",
            badge: "command",
            support_level: "unsupported",
            verification: meta(geminiRoot, "官方入口", "", "warn"),
          },
        ],
      },
      {
        category: "后续跟踪",
        icon: Rocket,
        verification: meta(geminiRoot, "后续以官方发布更新为准。", "", "warn"),
        items: [
          {
            title: "恢复条件",
            description: "仅当官方文档提供稳定、可验证的 Skills 命令与路径规范后，再恢复对应命令手册内容。",
            support_level: "unsupported",
            verification: meta(geminiRoot, "恢复门槛", "", "warn"),
          },
        ],
      },
    ],
    templates: [],
  },
];

export const SKILLS_BADGE_LABELS: Record<string, { label: string; className: string }> = {
  path: { label: "路径", className: "bg-primary/15 text-primary border-primary/30" },
  command: { label: "命令", className: "bg-accent/15 text-accent border-accent/30" },
  field: { label: "字段", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  config: { label: "配置", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  template: { label: "模板", className: "bg-primary/15 text-primary border-primary/30" },
};

export const SKILLS_METADATA = {
  codex_official_url: codexSkillsDoc,
  gemini_support_level: "unsupported" as const,
  verified_at: VERIFIED_AT,
};
