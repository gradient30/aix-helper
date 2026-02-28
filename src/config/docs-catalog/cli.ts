import { Bug, FolderOpen, Keyboard, MessageSquare, Palette, Play, Settings, Terminal, Wrench } from "lucide-react";
import type { CliGuideTool, GuideVerificationMeta } from "./types";

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
const claudeSlash = "https://docs.anthropic.com/en/docs/claude-code/slash-commands";
const claudeCli = "https://docs.anthropic.com/en/docs/claude-code/cli-usage";

const codexCli = "https://developers.openai.com/codex/cli";
const codexCommands = "https://developers.openai.com/codex/cli/reference";
const codexReference = "https://developers.openai.com/codex/cli/reference";

const geminiRoot = "https://google-gemini.github.io/gemini-cli/";
const geminiCommands = "https://google-gemini.github.io/gemini-cli/docs/cli/commands";
const geminiConfig = "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration";

export const CLI_GUIDE_TOOLS: CliGuideTool[] = [
  {
    id: "claude",
    name: "Claude Code",
    official_url: claudeOverview,
    support_level: "official",
    verification: meta(claudeOverview, "Anthropic 官方 Claude Code 概览页面可访问。"),
    groups: [
      {
        category: "会话命令",
        icon: MessageSquare,
        verification: meta(claudeSlash, "斜杠命令来自官方 slash-commands 页面。"),
        items: [
          { command: "/help", description: "显示可用命令列表", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/clear", description: "清空当前会话上下文", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/compact", description: "压缩上下文并保留关键内容", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/init", description: "初始化项目指令文件", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/review", description: "审查当前代码改动", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/status", description: "查看当前会话状态", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      {
        category: "工具与配置",
        icon: Wrench,
        verification: meta(claudeSlash, "工具类命令来自官方 slash-commands 页面。"),
        items: [
          { command: "/model", description: "切换会话模型", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/mcp", description: "管理 MCP 服务器", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/agents", description: "管理子代理", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/add-dir", description: "添加额外工作目录", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/doctor", description: "运行诊断检查", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      {
        category: "CLI 启动",
        icon: Play,
        verification: meta(claudeCli, "CLI 启动方式来自官方 cli-usage 页面。"),
        items: [
          { command: "claude", description: "启动交互会话", usage: "claude", badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令") },
          { command: 'claude "query"', description: "带初始问题启动会话", usage: 'claude "review this patch"', badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令") },
          { command: "claude -p", description: "非交互输出模式", usage: 'cat diff.txt | claude -p "summarize changes"', badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令") },
          { command: "claude -c", description: "继续最近会话", usage: "claude -c", badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令") },
        ],
      },
      {
        category: "快捷键",
        icon: Keyboard,
        verification: meta(claudeCli, "快捷键来自官方 CLI 文档说明。"),
        items: [
          { command: "Ctrl + C", description: "中断当前执行", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + D", description: "退出会话", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Esc Esc", description: "编辑上一条输入", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
        ],
      },
    ],
  },
  {
    id: "codex",
    name: "Codex CLI",
    official_url: codexCli,
    support_level: "official",
    verification: meta(codexCli, "OpenAI Codex CLI 官方文档入口可访问。"),
    groups: [
      {
        category: "斜杠命令",
        icon: Terminal,
        verification: meta(codexCommands, "命令来自 Codex CLI 参考页面。"),
        items: [
          { command: "/help", description: "显示命令帮助", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/model", description: "切换模型", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/approval", description: "查看或调整审批策略", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/mcp", description: "管理 MCP 服务器", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/agent", description: "切换当前代理配置", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/review", description: "执行代码审查流程", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/status", description: "查看当前会话与配置状态", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/compact", description: "压缩上下文", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/new", description: "开启新会话", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/quit", description: "退出会话", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
        ],
      },
      {
        category: "CLI 命令",
        icon: Play,
        verification: meta(codexReference, "CLI 子命令来自 /cli/reference 页面。"),
        items: [
          { command: "codex", description: "启动交互式 TUI 会话", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "codex exec", description: "非交互执行单次任务", usage: 'codex exec "summarize this repo"', badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "codex login", description: "登录并配置认证", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "codex mcp", description: "管理 MCP 连接", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "codex --help", description: "查看参数与帮助信息", badge: "flag", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      {
        category: "配置入口",
        icon: Settings,
        verification: meta(codexReference, "配置入口与字段示例来自官方 Codex 文档。"),
        items: [
          { command: "~/.codex/config.toml", description: "全局配置文件", badge: "cli", support_level: "official", verification: meta(codexReference, "官方路径") },
          { command: "approval_policy", description: "默认审批策略字段", badge: "flag", support_level: "official", verification: meta(codexReference, "官方字段") },
          { command: "AGENTS.md", description: "项目级指令文件", badge: "cli", support_level: "official", verification: meta("https://developers.openai.com/codex/prompting", "官方指令文件") },
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
        category: "会话命令",
        icon: MessageSquare,
        verification: meta(geminiCommands, "命令来自 Gemini CLI commands 页面。"),
        items: [
          { command: "/help", description: "显示帮助与命令列表", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/clear", description: "清空当前会话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/chat", description: "管理会话与对话线程", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/memory", description: "管理记忆内容", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/mcp", description: "管理 MCP 连接", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/extensions", description: "管理扩展", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/tools", description: "查看工具状态", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/quit", description: "退出会话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      {
        category: "CLI 启动",
        icon: Play,
        verification: meta(geminiRoot, "安装与启动方式来自官方首页。"),
        items: [
          { command: "gemini", description: "启动交互式会话", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令") },
          { command: "gemini -p", description: "非交互执行单次任务", usage: 'gemini -p "explain this error"', badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "gemini --model <model>", description: "指定模型名称", usage: "gemini --model gemini-2.5-flash", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "gemini --help", description: "查看参数说明", badge: "flag", support_level: "official", verification: meta(geminiRoot, "官方命令") },
        ],
      },
      {
        category: "配置与主题",
        icon: Palette,
        verification: meta(geminiConfig, "配置项来自 configuration 页面。"),
        items: [
          { command: "/theme", description: "切换主题", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/auth", description: "管理认证状态", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "GEMINI.md", description: "项目级指令文件", badge: "cli", support_level: "official", verification: meta(geminiConfig, "官方文件说明") },
        ],
      },
      {
        category: "调试信息",
        icon: Bug,
        verification: meta(geminiCommands, "调试命令来自 commands 页面。"),
        items: [
          { command: "/stats", description: "查看会话统计", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/about", description: "查看版本与构建信息", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/bug", description: "提交问题反馈", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      {
        category: "上下文注入",
        icon: FolderOpen,
        verification: meta(geminiCommands, "上下文注入语法来自 commands 页面。"),
        items: [
          { command: "@<path>", description: "将文件或目录注入上下文", badge: "at", support_level: "official", verification: meta(geminiCommands, "官方语法") },
          { command: "!<shell_command>", description: "执行本地 shell 命令并注入输出", badge: "shell", support_level: "official", verification: meta(geminiCommands, "官方语法") },
        ],
      },
    ],
  },
];

export const CLI_BADGE_LABELS: Record<string, { label: string; className: string }> = {
  slash: { label: "斜杠命令", className: "bg-primary/15 text-primary border-primary/30" },
  flag: { label: "CLI 参数", className: "bg-accent/15 text-accent border-accent/30" },
  shortcut: { label: "快捷键", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  cli: { label: "CLI 命令", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  interactive: { label: "交互命令", className: "bg-primary/15 text-primary border-primary/30" },
  at: { label: "@ 命令", className: "bg-accent/15 text-accent border-accent/30" },
  shell: { label: "! 命令", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
};

export const CLI_METADATA = {
  codex_official_url: codexCli,
  gemini_official_url: geminiRoot,
  verified_at: VERIFIED_AT,
};
