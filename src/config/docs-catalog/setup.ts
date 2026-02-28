import { Bug, CheckCircle, Download, HelpCircle, Play, Settings, Shield } from "lucide-react";
import type { GuideVerificationMeta, SetupGuideTool } from "./types";

const VERIFIED_AT = "2026-02-23";

function meta(
  source_url: string,
  verification_reason: string,
  source_anchor = "",
): GuideVerificationMeta {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status: "pass",
    verification_reason,
    source_url,
    source_anchor,
    verification_source: "official_doc",
  };
}

const claudeOverview = "https://docs.anthropic.com/en/docs/claude-code/overview";
const claudeSettings = "https://docs.anthropic.com/en/docs/claude-code/settings";
const claudeCliUsage = "https://docs.anthropic.com/en/docs/claude-code/cli-usage";

const codexCli = "https://developers.openai.com/codex/cli";
const codexConfig = "https://developers.openai.com/codex/cli/reference";
const codexWindows = "https://developers.openai.com/codex/windows";
const codexReference = "https://developers.openai.com/codex/cli/reference";

const geminiRoot = "https://google-gemini.github.io/gemini-cli/";
const geminiCommands = "https://google-gemini.github.io/gemini-cli/docs/cli/commands";
const geminiConfig = "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration";

export const SETUP_GUIDE_TOOLS: SetupGuideTool[] = [
  {
    id: "claude",
    name: "Claude Code",
    official_url: claudeOverview,
    support_level: "official",
    verification: meta(claudeOverview, "Claude Code 官方安装与使用页面可访问。"),
    groups: [
      {
        category: "前置条件",
        icon: Shield,
        verification: meta(claudeOverview, "前置条件来自官方概览与安装说明。"),
        items: [
          {
            title: "操作系统支持",
            description: "请以官方安装文档为准确认当前支持平台。Windows、macOS、Linux 均有官方安装入口。",
            badge: "prereq",
            support_level: "official",
            verification: meta(claudeOverview, "官方支持说明"),
          },
          {
            title: "Git（推荐）",
            description: "代码审查与差异分析场景建议安装 Git。",
            code: "git --version",
            badge: "prereq",
            support_level: "official",
            verification: meta(claudeCliUsage, "官方工作流建议"),
          },
        ],
      },
      {
        category: "安装步骤",
        icon: Download,
        verification: meta(claudeOverview, "安装命令来自官方安装文档。"),
        items: [
          {
            title: "官方安装脚本",
            description: "使用官方安装方式，确保后续升级路径一致。",
            code: "# macOS / Linux\ncurl -fsSL https://claude.ai/install.sh | bash",
            badge: "install",
            support_level: "official",
            verification: meta(claudeOverview, "官方安装方式"),
          },
          {
            title: "启动 CLI",
            description: "安装后在项目目录启动并完成登录流程。",
            code: "claude",
            badge: "install",
            support_level: "official",
            verification: meta(claudeCliUsage, "官方启动流程"),
          },
        ],
      },
      {
        category: "配置与认证",
        icon: Settings,
        verification: meta(claudeSettings, "配置字段来自 settings 文档。"),
        items: [
          {
            title: "settings.json",
            description: "建议通过 settings.json 管理环境变量与默认行为。具体字段以官方文档为准。",
            code: `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your-token"
  }
}`,
            badge: "config",
            support_level: "official",
            verification: meta(claudeSettings, "官方配置文件"),
          },
          {
            title: "OAuth / API Key",
            description: "可使用官方登录流程或 API Key 认证，实际可用方式以账户权限为准。",
            badge: "config",
            support_level: "official",
            verification: meta(claudeOverview, "官方认证说明"),
          },
        ],
      },
      {
        category: "初始化验证",
        icon: CheckCircle,
        verification: meta(claudeCliUsage, "验证命令来自官方 CLI 使用文档。"),
        items: [
          {
            title: "版本检查",
            description: "验证是否成功安装。",
            code: "claude --version",
            badge: "verify",
            support_level: "official",
            verification: meta(claudeCliUsage, "官方命令"),
          },
          {
            title: "帮助命令",
            description: "查看可用命令并检查运行状态。",
            code: "claude --help",
            badge: "verify",
            support_level: "official",
            verification: meta(claudeCliUsage, "官方命令"),
          },
        ],
      },
    ],
  },
  {
    id: "codex",
    name: "Codex CLI",
    official_url: codexCli,
    support_level: "official",
    verification: meta(codexCli, "Codex CLI 官方文档入口可访问。"),
    groups: [
      {
        category: "前置条件",
        icon: Shield,
        verification: meta(codexCli, "前置条件来自 Codex CLI 文档。"),
        items: [
          {
            title: "Node.js 与包管理器",
            description: "安装前请按官方文档确认当前最低 Node.js 版本要求。",
            code: "node --version",
            badge: "prereq",
            support_level: "official",
            verification: meta(codexCli, "官方前置要求"),
          },
          {
            title: "Windows 支持",
            description: "Codex 支持 Windows。是否需要 WSL 取决于你的终端与工具链，按官方 Windows 页面配置。",
            badge: "prereq",
            support_level: "official",
            verification: meta(codexWindows, "官方 Windows 指南"),
          },
        ],
      },
      {
        category: "安装步骤",
        icon: Download,
        verification: meta(codexCli, "安装步骤来自官方 CLI 文档。"),
        items: [
          {
            title: "全局安装",
            description: "安装 Codex CLI。",
            code: "npm install -g @openai/codex",
            badge: "install",
            support_level: "official",
            verification: meta(codexCli, "官方安装命令"),
          },
          {
            title: "首次登录",
            description: "按官方流程完成认证配置。",
            code: "codex login",
            badge: "install",
            support_level: "official",
            verification: meta(codexReference, "官方子命令"),
          },
        ],
      },
      {
        category: "配置与认证",
        icon: Settings,
        verification: meta(codexConfig, "配置字段来自官方 config 文档。"),
        items: [
          {
            title: "配置文件路径",
            description: "全局配置文件位置。",
            code: "~/.codex/config.toml",
            badge: "config",
            support_level: "official",
            verification: meta(codexConfig, "官方路径"),
          },
          {
            title: "关键配置字段",
            description: "建议使用官方字段名（例如 approval_policy），避免旧字段漂移。",
            code: `model = "o4-mini"
approval_policy = "on-request"`,
            badge: "config",
            support_level: "official",
            verification: meta(codexConfig, "官方字段"),
          },
          {
            title: "项目指令文件",
            description: "在仓库根目录维护 AGENTS.md。",
            code: "AGENTS.md",
            badge: "config",
            support_level: "official",
            verification: meta("https://developers.openai.com/codex/prompting", "官方说明"),
          },
        ],
      },
      {
        category: "核心命令",
        icon: Play,
        verification: meta(codexReference, "命令来自 /cli/reference。"),
        items: [
          {
            title: "交互模式",
            description: "启动 TUI 会话。",
            code: "codex",
            badge: "command",
            support_level: "official",
            verification: meta(codexReference, "官方命令"),
          },
          {
            title: "非交互执行",
            description: "单次任务执行并输出结果。",
            code: 'codex exec "summarize changes"',
            badge: "command",
            support_level: "official",
            verification: meta(codexReference, "官方命令"),
          },
          {
            title: "MCP 管理",
            description: "配置并检查 MCP 连接。",
            code: "codex mcp",
            badge: "command",
            support_level: "official",
            verification: meta(codexReference, "官方命令"),
          },
        ],
      },
      {
        category: "问题排查",
        icon: Bug,
        verification: meta(codexReference, "排查命令来自官方帮助。"),
        items: [
          {
            title: "帮助与版本",
            description: "优先确认 CLI 版本和参数是否与官方一致。",
            code: "codex --version\ncodex --help",
            badge: "debug",
            support_level: "official",
            verification: meta(codexReference, "官方命令"),
          },
        ],
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    official_url: geminiRoot,
    support_level: "official",
    verification: meta(geminiRoot, "Gemini CLI 官方文档入口可访问。"),
    groups: [
      {
        category: "前置条件",
        icon: Shield,
        verification: meta(geminiRoot, "前置条件来自官方文档。"),
        items: [
          {
            title: "Node.js",
            description: "请按官方安装页面确认最低 Node.js 要求。",
            code: "node --version",
            badge: "prereq",
            support_level: "official",
            verification: meta(geminiRoot, "官方前置要求"),
          },
          {
            title: "认证方式",
            description: "支持 Google 登录或 API Key 认证。具体配额与可用模型以官方页面为准。",
            badge: "prereq",
            support_level: "official",
            verification: meta(geminiRoot, "官方认证说明"),
          },
        ],
      },
      {
        category: "安装步骤",
        icon: Download,
        verification: meta(geminiRoot, "安装方式来自官方文档。"),
        items: [
          {
            title: "npx 运行",
            description: "无需全局安装，直接运行最新版本。",
            code: "npx @google/gemini-cli",
            badge: "install",
            support_level: "official",
            verification: meta(geminiRoot, "官方安装方式"),
          },
          {
            title: "全局安装",
            description: "需要全局命令时使用 npm 安装。",
            code: "npm install -g @google/gemini-cli",
            badge: "install",
            support_level: "official",
            verification: meta(geminiRoot, "官方安装方式"),
          },
        ],
      },
      {
        category: "配置与认证",
        icon: Settings,
        verification: meta(geminiConfig, "配置项来自 configuration 页面。"),
        items: [
          {
            title: "环境变量",
            description: "优先通过环境变量提供 API Key（例如 GEMINI_API_KEY 或 GOOGLE_API_KEY）。",
            code: "export GEMINI_API_KEY=\"your-key\"",
            badge: "config",
            support_level: "official",
            verification: meta(geminiConfig, "官方配置方式"),
          },
          {
            title: "项目指令文件",
            description: "使用 GEMINI.md 管理项目级行为指令。",
            code: "GEMINI.md",
            badge: "config",
            support_level: "official",
            verification: meta(geminiConfig, "官方文件说明"),
          },
        ],
      },
      {
        category: "核心命令",
        icon: Play,
        verification: meta(geminiCommands, "命令来自 commands 页面。"),
        items: [
          {
            title: "交互模式",
            description: "启动交互会话。",
            code: "gemini",
            badge: "command",
            support_level: "official",
            verification: meta(geminiCommands, "官方命令"),
          },
          {
            title: "非交互模式",
            description: "执行一次性任务。",
            code: 'gemini -p "summarize this file"',
            badge: "command",
            support_level: "official",
            verification: meta(geminiCommands, "官方命令"),
          },
          {
            title: "帮助命令",
            description: "查看当前版本支持的参数与命令。",
            code: "gemini --help",
            badge: "verify",
            support_level: "official",
            verification: meta(geminiCommands, "官方命令"),
          },
        ],
      },
      {
        category: "常见问题",
        icon: HelpCircle,
        verification: meta(geminiRoot, "FAQ 以官方文档为准。"),
        items: [
          {
            title: "模型与配额",
            description: "模型可用性、免费额度和限制会变化。请始终以官方文档实时信息为准。",
            badge: "faq",
            support_level: "official",
            verification: meta(geminiRoot, "动态信息治理"),
          },
        ],
      },
    ],
  },
];

export const SETUP_BADGE_LABELS: Record<string, { label: string; className: string }> = {
  path: { label: "路径", className: "bg-primary/15 text-primary border-primary/30" },
  command: { label: "命令", className: "bg-primary/15 text-primary border-primary/30" },
  field: { label: "字段", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  config: { label: "配置项", className: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  template: { label: "模板", className: "bg-primary/15 text-primary border-primary/30" },
  prereq: { label: "前置条件", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  install: { label: "安装步骤", className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30" },
  verify: { label: "验证命令", className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  scenario: { label: "应用场景", className: "bg-accent/15 text-accent-foreground border-accent/30" },
  optimize: { label: "性能优化", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  debug: { label: "问题排查", className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  faq: { label: "常见问题", className: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30" },
};

export const SETUP_METADATA = {
  verified_at: VERIFIED_AT,
  codex_windows_doc: codexWindows,
};
