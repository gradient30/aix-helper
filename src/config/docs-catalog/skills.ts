import { BookOpen, Eye, FileText, FolderTree, Play, Rocket, Settings, Shield, Code, Layers, Search, Zap } from "lucide-react";
import type { GuideVerificationMeta, SkillsGuideTool } from "./types";

const VERIFIED_AT = "2026-04-07";

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
const claudeMemory = "https://docs.anthropic.com/en/docs/claude-code/memory";
const codexSkillsDoc = "https://developers.openai.com/codex/prompting";
const codexAgentsDoc = "https://developers.openai.com/codex/cli";
const geminiRoot = "https://google-gemini.github.io/gemini-cli/";
const geminiMcp = "https://google-gemini.github.io/gemini-cli/";
const opencodeRoot = "https://opencode.ai";
const opencodeAgents = "https://opencode.ai/docs/agents";

export const SKILLS_GUIDE_TOOLS: SkillsGuideTool[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Claude Code Skills
  // ═══════════════════════════════════════════════════════════════════════════
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
            description: "Skill 是按需加载的指令模块，每个 Skill 目录包含一个 SKILL.md。Claude 会按请求语义自动匹配和调用，避免将所有指令注入上下文。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方定义"),
          },
          {
            title: "加载策略",
            description: "Skills 使用渐进式加载，仅在匹配到相关任务时才加载对应 SKILL.md，大幅节省上下文窗口。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方行为说明"),
          },
          {
            title: "匹配机制",
            description: "Claude 根据 SKILL.md 中的 name 和 description 字段进行语义匹配，无需显式调用即可自动触发。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方匹配说明"),
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
            description: "项目内 Skill 目录路径，仅在当前项目生效。",
            code: ".claude/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方路径"),
          },
          {
            title: "用户级",
            description: "用户全局 Skill 目录路径，对所有项目生效。",
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
            description: "在自然语言任务匹配到 skill 描述时，Claude 自动加载对应 Skill，无需手动触发。",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方说明"),
          },
          {
            title: "显式调用",
            description: "使用 $skill-name 显式触发指定 Skill，适合精确控制场景。",
            code: "$code-review 请审查 src/main.ts",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方语法"),
          },
          {
            title: "/skills 命令",
            description: "列出所有已安装的 Skills，查看可用技能列表。",
            code: "/skills",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方命令"),
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
            description: "SKILL.md 使用 YAML frontmatter 定义元数据（name、description），并用 Markdown 编写任务指令。",
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
          {
            title: "最佳实践",
            description: "保持 Skill 职责单一，描述清晰具体。避免在 SKILL.md 中放置过多通用指令，应聚焦特定任务域。",
            badge: "config",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方建议"),
          },
        ],
      },
      {
        category: "技能发现",
        icon: Search,
        verification: meta(claudeSkillsDoc, "发现机制来自官方文档。"),
        items: [
          {
            title: "扫描机制",
            description: "Claude Code 启动时自动扫描项目级和用户级 Skills 目录，加载所有 SKILL.md 的元数据。",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方扫描说明"),
          },
          {
            title: "缓存策略",
            description: "Skills 元数据会被缓存，修改 SKILL.md 后需要重启会话或重新扫描才能生效。",
            badge: "config",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方缓存说明"),
          },
        ],
      },
      {
        category: "技能开发",
        icon: Code,
        verification: meta(claudeSkillsDoc, "开发指南来自官方文档。"),
        items: [
          {
            title: "创建流程",
            description: "在 .claude/skills/ 下创建以 Skill 名命名的目录，在其中编写 SKILL.md 文件。",
            code: "mkdir -p .claude/skills/my-skill\ntouch .claude/skills/my-skill/SKILL.md",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方创建方式"),
          },
          {
            title: "测试方法",
            description: "使用 /skills 确认 Skill 已被发现，然后用自然语言任务触发测试匹配效果。",
            badge: "command",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方测试建议"),
          },
        ],
      },
      {
        category: "常见问题",
        icon: Eye,
        verification: meta(claudeSkillsDoc, "FAQ 来自官方文档。"),
        items: [
          {
            title: "Skill 未被加载",
            description: "检查目录结构是否正确（.claude/skills/<name>/SKILL.md），确认 SKILL.md 包含有效的 YAML frontmatter。",
            badge: "debug",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方排查建议"),
          },
          {
            title: "匹配不准确",
            description: "优化 SKILL.md 中的 description 字段，使其更具体和独特，避免过于通用的描述。",
            badge: "optimize",
            support_level: "official",
            verification: meta(claudeSkillsDoc, "官方优化建议"),
          },
        ],
      },
      {
        category: "与 CLAUDE.md 的关系",
        icon: Layers,
        verification: meta(claudeMemory, "与记忆系统的关系来自官方文档。"),
        items: [
          {
            title: "互补设计",
            description: "CLAUDE.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。两者互补，不应重复。",
            support_level: "official",
            verification: meta(claudeMemory, "官方设计说明"),
          },
          {
            title: "优先级",
            description: "CLAUDE.md 始终加载，Skills 按需加载。通用规则放 CLAUDE.md，特定工作流放 Skills。",
            badge: "config",
            support_level: "official",
            verification: meta(claudeMemory, "官方优先级说明"),
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
  // ═══════════════════════════════════════════════════════════════════════════
  // Codex CLI Skills
  // ═══════════════════════════════════════════════════════════════════════════
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
            description: "Codex 使用 Agent Skills 作为可复用能力包，通过 AGENTS.md 和项目指令文件定义行为，按任务语义按需加载。",
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
            description: "仓库级 Skills 目录，仅在当前仓库生效。",
            code: ".agents/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方路径"),
          },
          {
            title: "用户级目录",
            description: "用户全局 Skills 目录，对所有项目生效。",
            code: "~/.agents/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(codexSkillsDoc, "官方路径"),
          },
          {
            title: "AGENTS.md",
            description: "项目级指令文件，定义 Codex 在该项目中的行为准则。",
            code: "AGENTS.md",
            badge: "path",
            support_level: "official",
            verification: meta("https://developers.openai.com/codex/prompting", "官方指令文件"),
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
            description: "可按提示语义自动调用，也可通过 $skill-name 显式调用。",
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
      {
        category: "技能发现",
        icon: Search,
        verification: meta(codexAgentsDoc, "发现机制来自官方文档。"),
        items: [
          {
            title: "扫描机制",
            description: "Codex 启动时扫描项目级和用户级 Skills 目录，加载所有可用的 Skills。",
            support_level: "official",
            verification: meta(codexAgentsDoc, "官方扫描说明"),
          },
          {
            title: "与审批策略集成",
            description: "Skills 执行敏感操作时受 approval_policy 约束，确保安全性。",
            badge: "config",
            support_level: "official",
            verification: meta(codexAgentsDoc, "官方安全说明"),
          },
        ],
      },
      {
        category: "技能开发",
        icon: Code,
        verification: meta(codexAgentsDoc, "开发指南来自官方文档。"),
        items: [
          {
            title: "创建流程",
            description: "在 .agents/skills/ 下创建 Skill 目录，编写 SKILL.md 定义行为。",
            code: "mkdir -p .agents/skills/my-skill\ntouch .agents/skills/my-skill/SKILL.md",
            badge: "command",
            support_level: "official",
            verification: meta(codexAgentsDoc, "官方创建方式"),
          },
          {
            title: "测试方法",
            description: "使用 codex exec 执行测试任务，验证 Skill 是否按预期触发和执行。",
            code: 'codex exec "test my-skill workflow"',
            badge: "command",
            support_level: "official",
            verification: meta(codexAgentsDoc, "官方测试建议"),
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
  // ═══════════════════════════════════════════════════════════════════════════
  // Gemini CLI Skills
  // ═══════════════════════════════════════════════════════════════════════════
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
          "官方文档未提供稳定 /skills 或 gemini skills 命令参考。",
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
        category: "MCP 扩展",
        icon: Zap,
        verification: meta(geminiMcp, "MCP 扩展来自官方 MCP 文档。"),
        items: [
          {
            title: "MCP 服务器",
            description: "通过 MCP 协议连接外部工具和服务，扩展 Gemini CLI 的能力边界。",
            badge: "config",
            support_level: "official",
            verification: meta(geminiMcp, "官方 MCP 说明", "", "warn"),
          },
          {
            title: "扩展管理",
            description: "使用 /extensions 命令管理已安装的扩展和集成。",
            code: "/extensions",
            badge: "command",
            support_level: "official",
            verification: meta(geminiRoot, "官方扩展命令", "", "warn"),
          },
        ],
      },
      {
        category: "GEMINI.md 指令",
        icon: FileText,
        verification: meta(geminiRoot, "项目指令文件来自官方文档。"),
        items: [
          {
            title: "项目级指令",
            description: "在仓库根目录创建 GEMINI.md 文件，定义 Gemini CLI 在该项目的行为准则。",
            code: "GEMINI.md",
            badge: "path",
            support_level: "official",
            verification: meta(geminiRoot, "官方文件说明", "", "warn"),
          },
          {
            title: "编写建议",
            description: "保持指令简洁明确，聚焦项目特定的编码规范和工具使用偏好。",
            badge: "template",
            support_level: "official",
            verification: meta(geminiRoot, "官方建议", "", "warn"),
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
  // ═══════════════════════════════════════════════════════════════════════════
  // OpenCode Skills
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "opencode",
    name: "OpenCode",
    official_url: opencodeRoot,
    support_level: "official",
    verification: meta(opencodeRoot, "OpenCode Skills 官方文档可访问。"),
    groups: [
      {
        category: "概述",
        icon: BookOpen,
        verification: meta(opencodeRoot, "Skills 定义来自官方文档。"),
        items: [
          {
            title: "Skills 定义",
            description: "OpenCode 使用 Skills 作为可复用的任务指令模块，每个 Skill 包含触发条件、执行步骤和输出规范。",
            support_level: "official",
            verification: meta(opencodeRoot, "官方定义"),
          },
          {
            title: "加载策略",
            description: "Skills 采用按需加载策略，仅在任务语义匹配时才加载对应指令，节省上下文窗口。",
            support_level: "official",
            verification: meta(opencodeRoot, "官方加载说明"),
          },
        ],
      },
      {
        category: "目录结构",
        icon: FolderTree,
        verification: meta(opencodeRoot, "目录规则来自官方文档。"),
        items: [
          {
            title: "项目级",
            description: "项目内 Skill 目录路径，仅在当前项目生效。",
            code: ".opencode/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(opencodeRoot, "官方路径"),
          },
          {
            title: "用户级",
            description: "用户全局 Skill 目录路径，对所有项目生效。",
            code: "~/.config/opencode/skills/<skill-name>/SKILL.md",
            badge: "path",
            support_level: "official",
            verification: meta(opencodeRoot, "官方路径"),
          },
        ],
      },
      {
        category: "调用方式",
        icon: Play,
        verification: meta(opencodeRoot, "调用语法来自官方文档。"),
        items: [
          {
            title: "自动调用",
            description: "在自然语言任务匹配到 skill 描述时，OpenCode 自动加载对应 Skill。",
            badge: "command",
            support_level: "official",
            verification: meta(opencodeRoot, "官方说明"),
          },
          {
            title: "显式调用",
            description: "使用 $skill-name 显式触发指定 Skill。",
            code: "$code-review 请审查 src/main.ts",
            badge: "command",
            support_level: "official",
            verification: meta(opencodeRoot, "官方语法"),
          },
        ],
      },
      {
        category: "SKILL.md 结构",
        icon: FileText,
        verification: meta(opencodeRoot, "文件结构来自官方示例。"),
        items: [
          {
            title: "Frontmatter + 指令正文",
            description: "SKILL.md 使用 YAML frontmatter 定义元数据，并用 Markdown 编写任务指令。",
            code: `---
name: code-review
description: Review code changes with security checks
---

# Workflow
1. Read the diff
2. Identify bugs and risks
3. Propose fixes`,
            badge: "template",
            support_level: "official",
            verification: meta(opencodeRoot, "官方示例结构"),
          },
        ],
      },
      {
        category: "与 AGENTS.md 的关系",
        icon: Layers,
        verification: meta(opencodeAgents, "与 Agent 系统的关系来自官方文档。"),
        items: [
          {
            title: "互补设计",
            description: "AGENTS.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。",
            support_level: "official",
            verification: meta(opencodeAgents, "官方设计说明"),
          },
          {
            title: "优先级",
            description: "AGENTS.md 始终加载，Skills 按需加载。通用规则放 AGENTS.md，特定工作流放 Skills。",
            badge: "config",
            support_level: "official",
            verification: meta(opencodeAgents, "官方优先级说明"),
          },
        ],
      },
    ],
    templates: [
      {
        filename: "SKILL.md",
        label: "OpenCode Skill Template",
        content: `---
name: your-opencode-skill
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
];

// ─── Badge labels ────────────────────────────────────────────────────────────

export const SKILLS_BADGE_LABELS: Record<string, { label: string; className: string }> = {
  path: { label: "路径", className: "bg-primary/15 text-primary border-primary/30" },
  command: { label: "命令", className: "bg-accent/15 text-accent border-accent/30" },
  field: { label: "字段", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  config: { label: "配置", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  template: { label: "模板", className: "bg-primary/15 text-primary border-primary/30" },
  debug: { label: "问题排查", className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  optimize: { label: "性能优化", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
};

// ─── Metadata ────────────────────────────────────────────────────────────────

export const SKILLS_METADATA = {
  codex_official_url: codexSkillsDoc,
  gemini_support_level: "unsupported" as const,
  opencode_official_url: opencodeRoot,
  verified_at: VERIFIED_AT,
};
