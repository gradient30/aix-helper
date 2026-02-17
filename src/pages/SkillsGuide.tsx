import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Search, ExternalLink, Terminal, BookOpen, FolderTree, Settings, Zap,
  Play, FileText, Shield, Puzzle, Download, ChevronDown, ChevronRight,
  ChevronsUpDown, Layers, Cog, Eye, Rocket, Brain, Command, RefreshCw,
  ToggleLeft, WrenchIcon, Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { saveAs } from "file-saver";
import type { LucideIcon } from "lucide-react";

// ─── Data types ───

interface SkillGuideItem {
  title: string;
  description: string;
  code?: string;
  badge?: "path" | "command" | "field" | "config" | "template";
  table?: { headers: string[]; rows: string[][] };
}

interface SkillGuideGroup {
  category: string;
  icon: LucideIcon;
  items: SkillGuideItem[];
}

interface SkillGuideTool {
  id: string;
  name: string;
  officialUrl: string;
  groups: SkillGuideGroup[];
  templates: { filename: string; content: string; label: string }[];
}

// ─── Badge config ───

const badgeConfig: Record<string, { label: string; className: string }> = {
  path: { label: "路径", className: "bg-primary/15 text-primary border-primary/30" },
  command: { label: "命令", className: "bg-accent/15 text-accent border-accent/30" },
  field: { label: "字段", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  config: { label: "配置", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  template: { label: "模板", className: "bg-primary/15 text-primary border-primary/30" },
};

// ─── Claude Code Skills Data ───

const claudeSkillsData: SkillGuideGroup[] = [
  {
    category: "概述",
    icon: BookOpen,
    items: [
      {
        title: "Skills 是什么",
        description:
          "Skills 是 Claude Code 中可复用的指令模块，以 SKILL.md 文件形式存在。每个 Skill 封装了特定领域的知识、工作流程或自动化任务。Claude 会在对话中根据用户请求自动发现和调用合适的 Skill，实现渐进式披露（Progressive Disclosure）——用户无需预先加载所有信息，Claude 会在需要时自动获取对应指令。",
      },
      {
        title: "核心优势",
        description:
          "• 复用性：一次编写，跨项目、跨会话反复使用\n• 渐进式披露：不会污染基础上下文，仅在需要时加载\n• 组合能力：多个 Skill 可以协同工作，一个 Skill 可以调用其他 Skill\n• 多作用域：支持企业级、个人级、项目级等多层级管理\n• 参数化：支持 $ARGUMENTS 占位符实现灵活调用",
      },
    ],
  },
  {
    category: "快速开始",
    icon: Rocket,
    items: [
      {
        title: "步骤 1：创建技能目录",
        description: "在项目根目录下创建 .claude/skills/ 目录结构。每个技能是一个子目录，包含一个 SKILL.md 文件。",
        badge: "path",
        code: "mkdir -p .claude/skills/my-first-skill",
      },
      {
        title: "步骤 2：编写 SKILL.md",
        description: "在技能目录中创建 SKILL.md 文件。文件包含可选的 YAML Frontmatter（元数据）和 Markdown 正文（指令内容）。",
        badge: "template",
        code: `---
name: 代码审查助手
description: 执行全面的代码审查，检查代码质量和最佳实践
---

# 代码审查指令

请对提供的代码执行以下审查步骤：

1. **代码风格**：检查命名规范、缩进、注释质量
2. **逻辑正确性**：检查边界条件、错误处理、空值检查
3. **性能优化**：识别潜在的性能瓶颈
4. **安全检查**：检查输入验证、SQL注入、XSS等安全问题
5. **最佳实践**：检查是否遵循语言/框架的最佳实践`,
      },
      {
        title: "步骤 3：测试调用",
        description: "在 Claude Code 会话中，使用 /skills 命令查看可用技能列表，或直接描述需求让 Claude 自动匹配合适的 Skill。也可以通过 $skill-name 语法显式调用。",
        badge: "command",
        code: '# 查看可用技能\n/skills\n\n# 显式调用\n$代码审查助手 请审查 src/main.ts\n\n# 隐式调用（Claude 自动匹配）\n"请帮我审查这段代码的质量"',
      },
    ],
  },
  {
    category: "存放位置",
    icon: FolderTree,
    items: [
      {
        title: "企业级技能（Enterprise）",
        description: "由组织管理员通过管理 API 部署，对组织内所有用户生效。适合统一的编码规范、安全策略、合规检查等企业级标准化 Skill。用户无法修改，确保一致性。",
        badge: "path",
        code: "# 通过管理 API 部署，无本地路径\n# 管理员使用 /admin/skills API 管理",
      },
      {
        title: "个人级技能（User）",
        description: "存放在用户主目录下，跨所有项目全局生效。适合个人常用的工作流程、代码风格偏好等。",
        badge: "path",
        code: "~/.claude/skills/<skill-name>/SKILL.md",
      },
      {
        title: "项目级技能（Project）",
        description: "存放在项目的 .claude/skills/ 目录下，仅在该项目中生效。适合项目特定的构建流程、测试规范、部署配置等。可以提交到版本控制系统与团队共享。",
        badge: "path",
        code: ".claude/skills/<skill-name>/SKILL.md",
      },
      {
        title: "插件级技能（Extension）",
        description: "由 MCP 服务器或其他扩展提供的技能，通过 MCP 协议动态注册。适合需要外部服务支持的复杂工作流。",
        badge: "path",
        code: "# 通过 MCP 服务器注册\n# 在 mcp_servers 配置中指定包含 skills 的服务器",
      },
    ],
  },
  {
    category: "SKILL.md 结构",
    icon: FileText,
    items: [
      {
        title: "Frontmatter 字段参考",
        description: "SKILL.md 文件顶部的 YAML Frontmatter 定义技能的元数据和行为控制。所有字段均为可选。",
        badge: "field",
        table: {
          headers: ["字段", "类型", "默认值", "说明"],
          rows: [
            ["name", "string", "目录名", "技能的显示名称，用于列表展示和调用匹配"],
            ["description", "string", "—", "技能的功能描述，帮助 Claude 判断何时使用该技能"],
            ["disable-model-invocation", "boolean", "false", "设为 true 时，Claude 不会自动调用该技能，仅用户可通过 $ 语法显式调用"],
            ["user-invocable", "boolean", "true", "设为 false 时，用户无法通过 $ 语法调用，仅由其他 Skill 或系统内部调用"],
            ["allowed-tools", "string[]", "全部", "限制该技能可使用的工具列表，如 [\"Read\", \"Write\", \"Bash\"]"],
            ["context", "string", "—", "上下文模式：省略为默认（共享上下文），设为 fork 时在子代理中执行"],
            ["agent", "string", "—", "指定执行此技能的子代理名称"],
            ["model", "string", "当前模型", "指定执行此技能时使用的模型"],
            ["hooks", "object", "—", "定义技能的生命周期钩子（如执行前/后的回调）"],
          ],
        },
      },
    ],
  },
  {
    category: "内容类型",
    icon: Layers,
    items: [
      {
        title: "参考内容（Reference Content）",
        description: "提供信息和上下文供 Claude 参考，但不要求执行具体动作。常用于项目约定、编码规范、API 文档等。当 Claude 需要相关知识时会自动加载。",
        code: `---
name: 项目编码规范
description: 团队统一的 TypeScript 编码规范和约定
---

# TypeScript 编码规范

## 命名约定
- 组件使用 PascalCase
- 变量和函数使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 类型/接口使用 PascalCase，接口不加 I 前缀

## 文件组织
- 每个文件只导出一个主要组件
- 工具函数放在 utils/ 目录
- 类型定义放在 types/ 目录`,
      },
      {
        title: "任务内容（Task Content）",
        description: "包含具体的执行步骤和操作指令，Claude 会按照指令完成任务。常用于自动化工作流、构建流程、部署操作等。",
        code: `---
name: 创建 React 组件
description: 按照团队标准创建新的 React 组件
---

# 创建 React 组件

请按以下步骤创建新组件：

1. 在 src/components/ 下创建组件目录
2. 创建组件文件，使用函数式组件 + TypeScript
3. 创建对应的 .test.tsx 测试文件
4. 创建 index.ts 导出文件
5. 在 Storybook 中添加 stories 文件`,
      },
    ],
  },
  {
    category: "调用控制",
    icon: Shield,
    items: [
      {
        title: "用户调用 vs 模型调用",
        description:
          "默认情况下，Skill 可被用户（通过 $ 语法）和 Claude（自动匹配）两种方式调用。通过 Frontmatter 中的 disable-model-invocation 和 user-invocable 字段可以精确控制调用权限。",
        badge: "config",
        table: {
          headers: ["场景", "disable-model-invocation", "user-invocable", "效果"],
          rows: [
            ["默认", "false", "true", "用户和 Claude 都可以调用"],
            ["仅用户调用", "true", "true", "只能通过 $skill-name 显式调用"],
            ["仅内部调用", "false", "false", "只能被其他 Skill 或系统内部调用"],
            ["工具型技能", "true", "false", "完全由内部逻辑触发，不对外暴露"],
          ],
        },
      },
    ],
  },
  {
    category: "参数传递",
    icon: Cog,
    items: [
      {
        title: "$ARGUMENTS 占位符",
        description:
          "使用 $ARGUMENTS 在 SKILL.md 中接收用户调用时传入的完整参数字符串。$ARGUMENTS[0]、$ARGUMENTS[1] 等按空格分割获取各个参数。$1、$2 是 $ARGUMENTS[0]、$ARGUMENTS[1] 的简写形式。",
        badge: "field",
        code: `---
name: 搜索替换
description: 在指定文件中搜索并替换文本
---

在文件 $1 中，将所有 "$2" 替换为 "$3"。

# 调用示例：
# $搜索替换 src/config.ts oldValue newValue
# 等同于：$1=src/config.ts  $2=oldValue  $3=newValue`,
      },
    ],
  },
  {
    category: "高级模式",
    icon: Brain,
    items: [
      {
        title: "动态上下文注入",
        description: "使用 !`command` 语法在 SKILL.md 中嵌入 Shell 命令的输出。Claude 加载技能时会自动执行命令并将结果注入上下文，实现动态数据获取。",
        badge: "command",
        code: `---
name: Git 状态感知
description: 根据当前 Git 状态提供建议
---

当前 Git 状态：
\`\`\`
!\`git status --short\`
\`\`\`

最近的提交记录：
\`\`\`
!\`git log --oneline -10\`
\`\`\`

请根据以上信息分析当前工作进度并提供建议。`,
      },
      {
        title: "子代理执行（context: fork）",
        description: "设置 context: fork 时，技能会在独立的子代理中执行，拥有独立的上下文窗口。适合长时间运行的任务或需要大量上下文的操作，避免污染主对话。",
        badge: "config",
        code: `---
name: 大型重构
description: 执行跨文件的大规模代码重构
context: fork
allowed-tools: ["Read", "Write", "Bash", "Glob", "Grep"]
---

# 大型重构任务

此技能在子代理中执行，拥有独立的上下文空间。
请按照 $ARGUMENTS 中的要求执行重构。`,
      },
      {
        title: "权限控制（allowed-tools）",
        description: "通过 allowed-tools 字段限制技能可使用的工具，实现最小权限原则。例如只读分析型技能可限制为只有 Read 和 Grep 工具。",
        badge: "config",
        code: `---
name: 安全审计
description: 只读模式的代码安全审计
allowed-tools: ["Read", "Glob", "Grep"]
---

# 安全审计（只读模式）

此技能仅有读取权限，无法修改任何文件。
请全面检查代码中的安全隐患。`,
      },
    ],
  },
  {
    category: "预置技能",
    icon: Puzzle,
    items: [
      {
        title: "官方预置 Agent Skills",
        description:
          "Claude Code 内置了多个预置技能，用于处理常见的办公文件格式。这些技能开箱即用，无需额外安装。",
        table: {
          headers: ["技能名称", "功能说明", "支持格式"],
          rows: [
            ["PowerPoint 技能", "创建和编辑 PowerPoint 演示文稿", ".pptx"],
            ["Excel 技能", "创建和操作 Excel 电子表格", ".xlsx"],
            ["Word 技能", "创建和编辑 Word 文档", ".docx"],
            ["PDF 技能", "读取和分析 PDF 文档内容", ".pdf"],
          ],
        },
      },
    ],
  },
];

// ─── Codex CLI Skills Data ───

const codexSkillsData: SkillGuideGroup[] = [
  {
    category: "概述",
    icon: BookOpen,
    items: [
      {
        title: "Skills 概念",
        description:
          "Codex CLI 的 Skills 系统是一个开放标准的可复用指令框架。每个 Skill 是一个包含 SKILL.md 文件的目录，定义了特定任务的指令和上下文。Codex 采用渐进式披露机制，仅在需要时加载相关 Skill，避免不必要的上下文膨胀。Skills 遵循 Agent Skills 开放标准，可与其他兼容工具互通。",
      },
    ],
  },
  {
    category: "快速开始",
    icon: Rocket,
    items: [
      {
        title: "使用 $skill-creator 创建技能",
        description: "Codex 内置了 $skill-creator 技能，可以通过对话方式引导你创建新的 Skill。它会自动创建目录结构、生成 SKILL.md 模板，并配置基本的元数据。",
        badge: "command",
        code: '# 在 Codex 会话中调用\n$skill-creator\n\n# 或直接描述需求\n$skill-creator 创建一个用于数据库迁移的技能',
      },
      {
        title: "手动创建技能",
        description: "你也可以手动创建 Skill 目录和 SKILL.md 文件。将目录放在任意一个 Skill 搜索路径下即可被 Codex 发现。",
        badge: "path",
        code: "# 在项目中创建\nmkdir -p .codex/skills/my-skill\ntouch .codex/skills/my-skill/SKILL.md\n\n# 在用户目录中创建（全局可用）\nmkdir -p ~/.codex/skills/my-skill\ntouch ~/.codex/skills/my-skill/SKILL.md",
      },
    ],
  },
  {
    category: "存放位置",
    icon: FolderTree,
    items: [
      {
        title: "四级作用域",
        description: "Codex CLI 按以下优先级从高到低搜索 Skills。高优先级的 Skill 可覆盖低优先级的同名 Skill。",
        badge: "path",
        table: {
          headers: ["作用域", "路径", "说明"],
          rows: [
            ["REPO（项目级）", ".codex/skills/<name>/", "仅在当前项目中生效，可提交到版本控制"],
            ["USER（用户级）", "~/.codex/skills/<name>/", "当前用户全局生效，跨项目共享"],
            ["ADMIN（管理员级）", "/etc/codex/skills/<name>/", "系统管理员配置，所有用户共享"],
            ["SYSTEM（系统级）", "内置", "Codex CLI 自带的预置技能，如 $skill-creator"],
          ],
        },
      },
    ],
  },
  {
    category: "安装技能",
    icon: Download,
    items: [
      {
        title: "$skill-installer 使用方法",
        description: "使用内置的 $skill-installer 技能从 GitHub 仓库或本地路径安装第三方 Skill。安装后的 Skill 会被复制到用户级或项目级目录中。",
        badge: "command",
        code: '# 从 GitHub 安装\n$skill-installer https://github.com/user/repo/tree/main/skills/my-skill\n\n# 安装到项目级\n$skill-installer --scope repo https://github.com/user/repo/tree/main/skills/my-skill\n\n# 查看已安装的技能\n/skills',
      },
    ],
  },
  {
    category: "启用与禁用",
    icon: ToggleLeft,
    items: [
      {
        title: "config.toml 中的 Skills 配置",
        description: "在 ~/.codex/config.toml 文件中，可以通过 [[skills.config]] 段落精细控制每个 Skill 的启用状态、参数覆盖等。",
        badge: "config",
        code: `# ~/.codex/config.toml

# 禁用特定技能
[[skills.config]]
name = "unwanted-skill"
enabled = false

# 为技能设置默认参数
[[skills.config]]
name = "code-review"
enabled = true
default_args = "--strict --format detailed"`,
      },
    ],
  },
  {
    category: "调用方式",
    icon: Play,
    items: [
      {
        title: "显式调用",
        description: "通过 /skills 命令查看技能列表，或使用 $skill-name 语法直接调用指定技能。",
        badge: "command",
        code: '# 列出所有可用技能\n/skills\n\n# 显式调用技能\n$code-review 请审查 src/utils.ts\n\n# 带参数调用\n$generate-test --coverage 90 src/api/',
      },
      {
        title: "隐式调用",
        description: "当用户的请求与某个 Skill 的描述匹配时，Codex 会自动选择并加载该 Skill，无需手动指定。这是渐进式披露机制的核心体现。",
      },
    ],
  },
  {
    category: "可选元数据",
    icon: Settings,
    items: [
      {
        title: "agents/openai.yaml 配置",
        description: "在 Skill 目录下创建 agents/openai.yaml 文件，可以定义额外的 UI 元数据、执行策略和工具依赖。此文件完全可选，用于更精细的控制。",
        badge: "config",
        code: `# my-skill/agents/openai.yaml

display:
  name: "代码审查助手"
  description: "自动化代码审查流程"
  icon: "🔍"
  category: "开发工具"

policy:
  approval_mode: "auto-edit"
  sandbox: "workspace-write"
  max_tokens: 4096

tools:
  required:
    - "Read"
    - "Write"
    - "Bash"
  optional:
    - "WebSearch"`,
      },
    ],
  },
  {
    category: "最佳实践",
    icon: Eye,
    items: [
      {
        title: "编写高质量 Skill 的原则",
        description:
          "• 单一职责：每个 Skill 只做一件事，做好一件事\n• 指令优先于脚本：用自然语言描述目标，而不是硬编码步骤\n• 明确输入输出：清晰定义期望的输入格式和输出结果\n• 提供示例：在 SKILL.md 中包含使用示例帮助理解\n• 错误处理：指导 Claude 如何处理异常情况\n• 渐进复杂度：从简单版本开始，逐步增加功能",
      },
    ],
  },
];

// ─── Gemini CLI Skills Data ───

const geminiSkillsData: SkillGuideGroup[] = [
  {
    category: "概述",
    icon: BookOpen,
    items: [
      {
        title: "Agent Skills 开放标准",
        description:
          "Gemini CLI 的 Agent Skills 遵循开放标准规范，与 Claude Code、Codex CLI 的 Skills 格式兼容。每个 Skill 是一个包含 SKILL.md 的目录，定义可复用的指令和上下文。",
      },
      {
        title: "与 GEMINI.md 的区别",
        description:
          "• GEMINI.md：项目级或用户级的全局指令文件，始终加载到上下文中，类似于 Claude 的 CLAUDE.md\n• Agent Skills：按需加载的模块化指令，仅在相关时才注入上下文，适合特定任务的复杂指令\n\n两者互补：GEMINI.md 适合通用偏好设置，Skills 适合特定工作流。",
      },
      {
        title: "核心优势",
        description: "• 模块化：指令按功能拆分，便于管理和维护\n• 按需加载：不会污染基础上下文窗口\n• 可共享：Skill 目录可通过 Git 仓库分发\n• 跨工具兼容：遵循开放标准，可在多个 AI CLI 工具间复用",
      },
    ],
  },
  {
    category: "技能发现层级",
    icon: FolderTree,
    items: [
      {
        title: "三级发现路径",
        description: "Gemini CLI 按以下层级搜索 Skills，高优先级可覆盖低优先级的同名 Skill。",
        badge: "path",
        table: {
          headers: ["层级", "路径", "说明"],
          rows: [
            ["工作区级", ".gemini/skills/<name>/", "项目特定的技能，跟随项目版本控制"],
            ["用户级", "~/.gemini/skills/<name>/", "用户全局技能，跨所有项目可用"],
            ["扩展级", "通过扩展注册", "由 Gemini 扩展或 MCP 服务器提供的技能"],
          ],
        },
      },
    ],
  },
  {
    category: "会话内管理",
    icon: Command,
    items: [
      {
        title: "/skills list",
        description: "列出当前可用的所有技能及其状态（已启用/已禁用/已链接等）。",
        badge: "command",
        code: "/skills list",
      },
      {
        title: "/skills link <path>",
        description: "将指定路径的 Skill 链接到当前工作区，使其在当前项目中可用。",
        badge: "command",
        code: "/skills link ~/shared-skills/code-review",
      },
      {
        title: "/skills disable <name>",
        description: "在当前会话中禁用指定的 Skill，被禁用的 Skill 不会被自动调用。",
        badge: "command",
        code: "/skills disable code-review",
      },
      {
        title: "/skills enable <name>",
        description: "重新启用之前被禁用的 Skill。",
        badge: "command",
        code: "/skills enable code-review",
      },
      {
        title: "/skills reload",
        description: "重新扫描所有 Skill 目录并刷新可用技能列表。当你在会话中添加或修改了 SKILL.md 文件后使用。",
        badge: "command",
        code: "/skills reload",
      },
    ],
  },
  {
    category: "终端管理",
    icon: Terminal,
    items: [
      {
        title: "gemini skills list",
        description: "在终端中（非交互会话）列出所有已安装和可用的 Skills。",
        badge: "command",
        code: "gemini skills list",
      },
      {
        title: "gemini skills link <source>",
        description: "从 GitHub 仓库 URL 或本地路径链接 Skill 到当前工作区。",
        badge: "command",
        code: "# 从 GitHub 链接\ngemini skills link https://github.com/user/repo/tree/main/skills/my-skill\n\n# 从本地路径链接\ngemini skills link ~/my-skills/helper",
      },
      {
        title: "gemini skills install <source>",
        description: "从远程源安装 Skill 到用户级目录（~/.gemini/skills/），使其全局可用。",
        badge: "command",
        code: "gemini skills install https://github.com/user/repo/tree/main/skills/my-skill",
      },
      {
        title: "gemini skills uninstall <name>",
        description: "卸载已安装的 Skill，从用户目录中移除。",
        badge: "command",
        code: "gemini skills uninstall my-skill",
      },
    ],
  },
  {
    category: "工作机制",
    icon: RefreshCw,
    items: [
      {
        title: "完整工作流程",
        description:
          "Gemini CLI 的 Skill 从发现到执行经历以下五个阶段：\n\n1️⃣ 发现（Discovery）：启动时扫描所有层级的 skills 目录，建立可用技能清单\n2️⃣ 激活（Activation）：用户请求匹配到某个 Skill 的描述时，Gemini 提议激活该 Skill\n3️⃣ 确认（Confirmation）：用户确认是否允许加载该 Skill（可配置为自动确认）\n4️⃣ 注入（Injection）：将 SKILL.md 的内容注入到当前对话上下文中\n5️⃣ 执行（Execution）：Gemini 按照注入的指令执行任务",
      },
    ],
  },
  {
    category: "创建自定义技能",
    icon: WrenchIcon,
    items: [
      {
        title: "SKILL.md 格式",
        description: "Gemini CLI 的 SKILL.md 格式与 Claude Code 兼容。文件包含可选的 YAML Frontmatter 和 Markdown 正文。Frontmatter 中最重要的字段是 name 和 description，它们用于技能匹配。",
        badge: "template",
        code: `---
name: API 文档生成器
description: 根据代码自动生成 API 接口文档
---

# API 文档生成指令

分析指定的源代码文件，提取所有公开的 API 接口，生成标准化的文档，包含：

- 接口路径和方法
- 请求参数说明
- 响应格式示例
- 错误码说明`,
      },
      {
        title: "目录结构",
        description: "每个 Skill 是一个独立的目录，至少包含一个 SKILL.md 文件。你可以在目录中包含其他辅助文件（如模板、脚本等），在 SKILL.md 中通过相对路径引用。",
        badge: "path",
        code: `.gemini/skills/
├── api-doc-gen/
│   ├── SKILL.md          # 主技能文件
│   ├── template.md       # 文档模板
│   └── examples/         # 示例文件
│       └── sample.md
├── code-review/
│   └── SKILL.md
└── test-gen/
    └── SKILL.md`,
      },
    ],
  },
];

// ─── Templates ───

const claudeTemplates = [
  {
    filename: "SKILL.md",
    label: "Claude Code SKILL.md 模板",
    content: `---
name: 我的技能名称
description: 简要描述此技能的功能和用途
# disable-model-invocation: false   # 设为 true 禁止 Claude 自动调用
# user-invocable: true              # 设为 false 禁止用户直接调用
# allowed-tools:                    # 限制可使用的工具
#   - Read
#   - Write
#   - Bash
#   - Glob
#   - Grep
# context: fork                     # 设为 fork 在子代理中执行
# model: claude-sonnet-4-20250514       # 指定使用的模型
---

# 技能标题

## 目标
清晰描述此技能要完成的目标。

## 指令
1. 第一步操作说明
2. 第二步操作说明
3. 第三步操作说明

## 输入
- 参数说明：\$ARGUMENTS 或 \$1, \$2 等

## 输出
- 期望的输出格式和内容

## 示例
\`\`\`
$我的技能名称 参数1 参数2
\`\`\`

## 注意事项
- 边界条件处理
- 错误情况处理
`,
  },
];

const codexTemplates = [
  {
    filename: "SKILL.md",
    label: "Codex CLI SKILL.md 模板",
    content: `---
name: 我的技能名称
description: 简要描述此技能的功能和用途
---

# 技能标题

## 目标
清晰描述此技能要完成的目标。

## 指令
1. 第一步操作说明
2. 第二步操作说明
3. 第三步操作说明

## 输入
- 参数说明：\$ARGUMENTS

## 输出
- 期望的输出格式和内容

## 注意事项
- 边界条件处理
- 错误情况处理
`,
  },
  {
    filename: "openai.yaml",
    label: "Codex CLI openai.yaml 模板",
    content: `# agents/openai.yaml - Codex CLI 技能元数据配置

display:
  name: "技能显示名称"
  description: "技能的详细描述"
  icon: "🔧"
  category: "工具类别"

policy:
  approval_mode: "suggest"        # suggest | auto-edit | full-auto
  sandbox: "workspace-write"      # docker | none | workspace-write
  max_tokens: 4096

tools:
  required:
    - "Read"
    - "Write"
  optional:
    - "Bash"
    - "WebSearch"
`,
  },
];

const geminiTemplates = [
  {
    filename: "SKILL.md",
    label: "Gemini CLI SKILL.md 模板",
    content: `---
name: 我的技能名称
description: 简要描述此技能的功能和用途
---

# 技能标题

## 目标
清晰描述此技能要完成的目标。

## 指令
1. 第一步操作说明
2. 第二步操作说明
3. 第三步操作说明

## 输入
- 参数说明

## 输出
- 期望的输出格式和内容

## 注意事项
- 边界条件处理
- 错误情况处理
`,
  },
];

// ─── All tools ───

const skillGuideTools: SkillGuideTool[] = [
  {
    id: "claude",
    name: "Claude Code",
    officialUrl: "https://docs.anthropic.com/en/docs/claude-code/skills",
    groups: claudeSkillsData,
    templates: claudeTemplates,
  },
  {
    id: "codex",
    name: "Codex CLI",
    officialUrl: "https://github.com/openai/codex/blob/main/docs/skills.md",
    groups: codexSkillsData,
    templates: codexTemplates,
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    officialUrl: "https://github.com/google-gemini/gemini-cli/blob/main/docs/skills.md",
    groups: geminiSkillsData,
    templates: geminiTemplates,
  },
];

// ─── Components ───

function SkillItemRow({ item }: { item: SkillGuideItem }) {
  const [open, setOpen] = useState(false);
  const expandable = !!(item.code || item.table);

  return (
    <div className="group">
      <div
        className={`flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors ${expandable ? "cursor-pointer hover:bg-muted/60" : ""}`}
        onClick={() => expandable && setOpen(!open)}
      >
        {expandable ? (
          <span className="mt-1 shrink-0 text-muted-foreground">
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </span>
        ) : (
          <span className="mt-1 shrink-0 w-3.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium text-sm text-foreground">{item.title}</span>
            {item.badge && (
              <Badge variant="outline" className={`shrink-0 text-[10px] px-1.5 py-0 h-5 ${badgeConfig[item.badge]?.className ?? ""}`}>
                {badgeConfig[item.badge]?.label}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
        </div>
      </div>

      {open && (
        <div className="ml-10 mb-2 space-y-2">
          {item.code && (
            <div className="rounded-md bg-muted/50 border border-border px-3 py-2 overflow-x-auto">
              <pre className="text-xs font-mono text-foreground whitespace-pre">{item.code}</pre>
            </div>
          )}
          {item.table && (
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {item.table.headers.map((h) => (
                      <TableHead key={h} className="text-xs h-8">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.table.rows.map((row, i) => (
                    <TableRow key={i}>
                      {row.map((cell, j) => (
                        <TableCell key={j} className="text-xs py-1.5">
                          {j === 0 ? (
                            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{cell}</code>
                          ) : (
                            cell
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkillGroupSection({ group, defaultOpen }: { group: SkillGuideGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = group.icon;

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
      >
        <Icon className="h-4 w-4 text-primary shrink-0" />
        <span className="font-medium text-sm text-foreground">{group.category}</span>
        <Badge variant="secondary" className="ml-auto text-[10px] h-5">{group.items.length}</Badge>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="border-t border-border divide-y divide-border/50">
          {group.items.map((item) => (
            <SkillItemRow key={item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateDownload({ templates }: { templates: SkillGuideTool["templates"] }) {
  const handleDownload = (tpl: { filename: string; content: string }) => {
    const blob = new Blob([tpl.content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, tpl.filename);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Download className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm text-foreground">配置模板下载</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {templates.map((tpl) => (
          <Button
            key={tpl.filename}
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => handleDownload(tpl)}
          >
            <Download className="h-3.5 w-3.5" />
            {tpl.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}

// ─── Main Page ───

export default function SkillsGuide() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("claude");
  const [allExpanded, setAllExpanded] = useState(false);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return skillGuideTools;
    const q = search.toLowerCase();
    return skillGuideTools.map((tool) => ({
      ...tool,
      groups: tool.groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q)
          ),
        }))
        .filter((g) => g.items.length > 0),
    }));
  }, [search]);

  const activeTool = filteredTools.find((t) => t.id === activeTab) ?? filteredTools[0];
  const originalTool = skillGuideTools.find((t) => t.id === activeTab)!;

  const totalItems = originalTool.groups.reduce((sum, g) => sum + g.items.length, 0);
  const filteredItems = activeTool?.groups.reduce((sum, g) => sum + g.items.length, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("skillsGuide.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("skillsGuide.subtitle")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearch(""); }}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="claude" className="gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            Claude Code
          </TabsTrigger>
          <TabsTrigger value="codex" className="gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            Codex CLI
          </TabsTrigger>
          <TabsTrigger value="gemini" className="gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            Gemini CLI
          </TabsTrigger>
        </TabsList>

        {skillGuideTools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("skillsGuide.searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setAllExpanded(!allExpanded)}>
                  {allExpanded ? t("skillsGuide.collapseAll") : t("skillsGuide.expandAll")}
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("skillsGuide.officialDocs")}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{tool.officialUrl}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {search
                ? `${t("skillsGuide.showing")} ${filteredItems} / ${totalItems} ${t("skillsGuide.items")}`
                : `${t("skillsGuide.total")} ${totalItems} ${t("skillsGuide.items")}`}
            </div>

            <div className="space-y-3">
              {activeTool?.groups.map((group) => (
                <SkillGroupSection key={group.category} group={group} defaultOpen={allExpanded || !!search} />
              ))}
              {activeTool?.groups.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground text-sm">
                  {t("skillsGuide.noResults")}
                </Card>
              )}
            </div>

            <TemplateDownload templates={tool.templates} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
