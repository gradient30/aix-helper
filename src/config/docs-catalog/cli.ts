import {
  BookOpen,
  Bug,
  Cloud,
  Code,
  Eye,
  FolderOpen,
  GitBranch,
  Keyboard,
  Link,
  MessageSquare,
  Monitor,
  Moon,
  Palette,
  Play,
  Plug,
  Search,
  Settings,
  Shield,
  Smartphone,
  Star,
  Terminal,
  Timer,
  Users,
  Wrench,
} from "lucide-react";
import type { CliGuideTool, GuideVerificationMeta } from "./types";

const VERIFIED_AT = "2026-04-07";

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

// ─── URL constants ───────────────────────────────────────────────────────────

const claudeOverview = "https://docs.anthropic.com/en/docs/claude-code/overview";
const claudeSlash = "https://docs.anthropic.com/en/docs/claude-code/slash-commands";
const claudeCli = "https://docs.anthropic.com/en/docs/claude-code/cli-usage";
const claudeSettings = "https://docs.anthropic.com/en/docs/claude-code/settings";
const claudeMemory = "https://docs.anthropic.com/en/docs/claude-code/memory";
const claudeContext = "https://docs.anthropic.com/en/docs/claude-code/context-window";
const claudeModelConfig = "https://docs.anthropic.com/en/docs/claude-code/model-config";
const claudePermissions = "https://docs.anthropic.com/en/docs/claude-code/permissions";
const claudeMcp = "https://docs.anthropic.com/en/docs/claude-code/mcp";
const claudeSubAgents = "https://docs.anthropic.com/en/docs/claude-code/sub-agents";
const claudeHooks = "https://docs.anthropic.com/en/docs/claude-code/hooks";
const claudeSandbox = "https://docs.anthropic.com/en/docs/claude-code/sandboxing";
const claudeScheduled = "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks";
const claudeDesktop = "https://docs.anthropic.com/en/docs/claude-code/desktop";
const claudeRemote = "https://docs.anthropic.com/en/docs/claude-code/remote-control";
const claudeWeb = "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web";
const claudeAuth = "https://docs.anthropic.com/en/docs/claude-code/authentication";
const claudePlugins = "https://docs.anthropic.com/en/docs/claude-code/plugins";
const claudeStatusline = "https://docs.anthropic.com/en/docs/claude-code/statusline";
const claudeKeybindings = "https://docs.anthropic.com/en/docs/claude-code/keybindings";
const claudeTerminalConfig = "https://docs.anthropic.com/en/docs/claude-code/terminal-config";
const claudeCosts = "https://docs.anthropic.com/en/docs/claude-code/costs";
const claudeTroubleshooting = "https://docs.anthropic.com/en/docs/claude-code/troubleshooting";
const claudeChangelog = "https://docs.anthropic.com/en/docs/claude-code/changelog";
const claudeVoice = "https://docs.anthropic.com/en/docs/claude-code/voice-dictation";
const claudeInteractive = "https://docs.anthropic.com/en/docs/claude-code/interactive-mode";
const claudeGithub = "https://docs.anthropic.com/en/docs/claude-code/github-actions";
const claudeChrome = "https://docs.anthropic.com/en/docs/claude-code/chrome";
const claudeVscode = "https://docs.anthropic.com/en/docs/claude-code/vs-code";
const claudeSlack = "https://docs.anthropic.com/en/docs/claude-code/slack";
const claudeCodeReview = "https://docs.anthropic.com/en/docs/claude-code/code-review";
const claudeCheckpoint = "https://docs.anthropic.com/en/docs/claude-code/checkpointing";

const codexCli = "https://developers.openai.com/codex/cli";
const codexCommands = "https://developers.openai.com/codex/cli/reference";
const codexReference = "https://developers.openai.com/codex/cli/reference";

const geminiRoot = "https://google-gemini.github.io/gemini-cli/";
const geminiCommands = "https://google-gemini.github.io/gemini-cli/docs/cli/commands";
const geminiConfig = "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration";

const opencodeRoot = "https://opencode.ai";

// ─── CLI Guide Tools ─────────────────────────────────────────────────────────

export const CLI_GUIDE_TOOLS: CliGuideTool[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Claude Code
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "claude",
    name: "Claude Code",
    official_url: claudeOverview,
    support_level: "official",
    verification: meta(claudeOverview, "Anthropic 官方 Claude Code 概览页面可访问。"),
    groups: [
      // ── 会话管理 ────────────────────────────────────────────────────────
      {
        category: "会话管理",
        icon: MessageSquare,
        verification: meta(claudeSlash, "会话命令来自官方 slash-commands 页面。"),
        items: [
          { command: "/help", description: "显示可用命令列表和使用说明", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/clear", description: "清空当前会话上下文并释放 token", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/reset", "/new"] },
          { command: "/exit", description: "退出 Claude Code CLI", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/quit"] },
          { command: "/branch", description: "在当前对话点创建分支，探索不同方向", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/fork"], examples: ["/branch risky-refactor"] },
          { command: "/resume", description: "按 ID 或名称恢复之前的对话", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/continue"], examples: ["/resume auth-refactor", "/resume"] },
          { command: "/rename", description: "重命名当前会话并在提示栏显示名称", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/rename auth-refactor"] },
          { command: "/copy", description: "复制最近的助手响应到剪贴板", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/copy", "/copy 2"] },
          { command: "/export", description: "将当前对话导出为纯文本文件", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/export conversation.txt"] },
          { command: "/btw", description: "快速提问，不添加到对话历史", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/btw 为什么选择这个方案？"] },
        ],
      },
      // ── 上下文管理 ──────────────────────────────────────────────────────
      {
        category: "上下文管理",
        icon: Eye,
        verification: meta(claudeContext, "上下文命令来自官方 context-window 页面。"),
        items: [
          { command: "/compact", description: "压缩对话历史，释放上下文窗口", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/compact 重点关注 API 变更和修改的文件列表"] },
          { command: "/context", description: "以彩色网格可视化当前上下文使用情况", badge: "slash", support_level: "official", verification: meta(claudeContext, "官方命令") },
          { command: "/rewind", description: "回退对话和/或代码到之前的状态", badge: "slash", support_level: "official", verification: meta(claudeCheckpoint, "官方命令"), aliases: ["/checkpoint"] },
        ],
      },
      // ── 模型配置 ────────────────────────────────────────────────────────
      {
        category: "模型配置",
        icon: Settings,
        verification: meta(claudeModelConfig, "模型配置来自官方 model-config 页面。"),
        items: [
          { command: "/model", description: "选择或更改当前会话使用的 AI 模型", badge: "slash", support_level: "official", verification: meta(claudeModelConfig, "官方命令"), examples: ["/model opus", "/model sonnet", "/model opus[1m]"] },
          { command: "/effort", description: "设置模型努力级别，影响推理深度", badge: "slash", support_level: "official", verification: meta(claudeModelConfig, "官方命令"), examples: ["/effort high", "/effort low", "/effort auto"] },
          { command: "/fast", description: "切换快速模式，使用更轻量的模型", badge: "slash", support_level: "official", verification: meta("https://docs.anthropic.com/en/docs/claude-code/fast-mode", "官方命令"), examples: ["/fast on", "/fast off"] },
        ],
      },
      // ── 集成配置 ────────────────────────────────────────────────────────
      {
        category: "集成配置",
        icon: Wrench,
        verification: meta(claudeMcp, "集成命令来自官方集成文档。"),
        items: [
          { command: "/mcp", description: "管理 MCP 服务器连接和 OAuth 认证", badge: "slash", support_level: "official", verification: meta(claudeMcp, "官方命令") },
          { command: "/agents", description: "管理子代理配置和行为", badge: "slash", support_level: "official", verification: meta(claudeSubAgents, "官方命令") },
          { command: "/ide", description: "管理 IDE 集成并显示当前状态", badge: "slash", support_level: "official", verification: meta(claudeVscode, "官方命令") },
          { command: "/chrome", description: "配置 Chrome 浏览器集成设置", badge: "slash", support_level: "official", verification: meta(claudeChrome, "官方命令") },
          { command: "/hooks", description: "查看工具事件的 Hook 配置", badge: "slash", support_level: "official", verification: meta(claudeHooks, "官方命令") },
          { command: "/install-github-app", description: "为仓库设置 Claude GitHub Actions 应用", badge: "slash", support_level: "official", verification: meta(claudeGithub, "官方命令") },
          { command: "/install-slack-app", description: "安装 Claude Slack 应用", badge: "slash", support_level: "official", verification: meta(claudeSlack, "官方命令") },
          { command: "/add-dir", description: "添加额外工作目录到当前会话", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/add-dir ../shared-lib"] },
        ],
      },
      // ── 代码审查 ────────────────────────────────────────────────────────
      {
        category: "代码审查",
        icon: Search,
        verification: meta(claudeCodeReview, "代码审查命令来自官方文档。"),
        items: [
          { command: "/diff", description: "打开交互式 diff 查看器，显示未提交更改", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/review", description: "已弃用，请使用 code-review 插件替代", badge: "slash", support_level: "official", verification: meta(claudeCodeReview, "官方命令（已弃用）") },
          { command: "/security-review", description: "分析当前分支待提交更改中的安全漏洞", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/pr-comments", description: "获取并显示 GitHub PR 的评论", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/pr-comments", "/pr-comments https://github.com/org/repo/pull/123"] },
        ],
      },
      // ── 权限管理 ────────────────────────────────────────────────────────
      {
        category: "权限管理",
        icon: Shield,
        verification: meta(claudePermissions, "权限命令来自官方 permissions 页面。"),
        items: [
          { command: "/permissions", description: "查看或更新工具权限设置", badge: "slash", support_level: "official", verification: meta(claudePermissions, "官方命令"), aliases: ["/allowed-tools"] },
        ],
      },
      // ── 自动化 ──────────────────────────────────────────────────────────
      {
        category: "自动化",
        icon: Timer,
        verification: meta(claudeScheduled, "自动化命令来自官方文档。"),
        items: [
          { command: "/schedule", description: "创建、更新、列出或运行云端定时任务", badge: "slash", support_level: "official", verification: meta(claudeScheduled, "官方命令"), examples: ["/schedule 每天上午9点检查 CI"] },
          { command: "/loop", description: "创建循环检查任务，定期执行并报告结果", badge: "slash", support_level: "official", verification: meta(claudeScheduled, "官方命令"), examples: ["/loop 5m check if deploy succeeded"] },
          { command: "/tasks", description: "列出和管理后台任务", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/bashes", description: "列出和管理后台 bash 命令", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      // ── 设置与外观 ──────────────────────────────────────────────────────
      {
        category: "设置与外观",
        icon: Palette,
        verification: meta(claudeSettings, "设置命令来自官方 settings 页面。"),
        items: [
          { command: "/config", description: "打开设置界面，调整主题、模型、输出风格等", badge: "slash", support_level: "official", verification: meta(claudeSettings, "官方命令"), aliases: ["/settings"] },
          { command: "/status", description: "打开设置界面的状态标签页", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/theme", description: "更改终端颜色主题", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/color", description: "设置当前会话的提示栏颜色", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/color red", "/color blue", "/color default"] },
          { command: "/keybindings", description: "打开或创建快捷键配置文件", badge: "slash", support_level: "official", verification: meta(claudeKeybindings, "官方命令") },
          { command: "/statusline", description: "配置 Claude Code 状态行显示", badge: "slash", support_level: "official", verification: meta(claudeStatusline, "官方命令") },
          { command: "/terminal-setup", description: "配置终端快捷键", badge: "slash", support_level: "official", verification: meta(claudeTerminalConfig, "官方命令") },
          { command: "/vim", description: "切换 Vim 和普通编辑模式", badge: "slash", support_level: "official", verification: meta(claudeInteractive, "官方命令") },
        ],
      },
      // ── 记忆管理 ────────────────────────────────────────────────────────
      {
        category: "记忆管理",
        icon: BookOpen,
        verification: meta(claudeMemory, "记忆命令来自官方 memory 页面。"),
        items: [
          { command: "/memory", description: "编辑 CLAUDE.md 记忆文件，管理自动记忆", badge: "slash", support_level: "official", verification: meta(claudeMemory, "官方命令") },
          { command: "/init", description: "使用 CLAUDE.md 指南初始化新项目", badge: "slash", support_level: "official", verification: meta(claudeMemory, "官方命令") },
        ],
      },
      // ── 用量统计 ────────────────────────────────────────────────────────
      {
        category: "用量统计",
        icon: Star,
        verification: meta(claudeCosts, "用量命令来自官方 costs 页面。"),
        items: [
          { command: "/cost", description: "显示当前会话的 token 使用和费用统计", badge: "slash", support_level: "official", verification: meta(claudeCosts, "官方命令") },
          { command: "/usage", description: "显示计划用量限制和速率限制状态", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/stats", description: "可视化每日使用量、会话历史、连续天数和模型偏好", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/insights", description: "生成 Claude Code 会话分析报告", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/extra-usage", description: "配置额外用量以在达到速率限制时继续工作", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      // ── 跨平台 ──────────────────────────────────────────────────────────
      {
        category: "跨平台",
        icon: Cloud,
        verification: meta(claudeDesktop, "跨平台命令来自官方文档。"),
        items: [
          { command: "/desktop", description: "在 Claude Code Desktop 应用中继续当前会话", badge: "slash", support_level: "official", verification: meta(claudeDesktop, "官方命令"), aliases: ["/app"] },
          { command: "/mobile", description: "显示二维码以下载 Claude 移动应用", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/ios", "/android"] },
          { command: "/remote-control", description: "从 claude.ai 远程控制当前会话", badge: "slash", support_level: "official", verification: meta(claudeRemote, "官方命令"), aliases: ["/rc"] },
          { command: "/remote-env", description: "配置 Web 会话的默认远程环境", badge: "slash", support_level: "official", verification: meta(claudeWeb, "官方命令") },
          { command: "/teleport", description: "在本地终端恢复 Web 会话", badge: "slash", support_level: "official", verification: meta(claudeWeb, "官方命令"), aliases: ["/tp"] },
        ],
      },
      // ── 账户管理 ────────────────────────────────────────────────────────
      {
        category: "账户管理",
        icon: Users,
        verification: meta(claudeAuth, "账户命令来自官方 authentication 页面。"),
        items: [
          { command: "/login", description: "登录 Anthropic 账户", badge: "slash", support_level: "official", verification: meta(claudeAuth, "官方命令") },
          { command: "/logout", description: "退出 Anthropic 账户", badge: "slash", support_level: "official", verification: meta(claudeAuth, "官方命令") },
          { command: "/passes", description: "与朋友分享一周免费 Claude Code 使用", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/privacy-settings", description: "查看和更新隐私设置（Pro/Max 计划）", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
          { command: "/upgrade", description: "打开升级页面切换到更高计划层级", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      // ── 插件管理 ────────────────────────────────────────────────────────
      {
        category: "插件管理",
        icon: Plug,
        verification: meta(claudePlugins, "插件命令来自官方 plugins 页面。"),
        items: [
          { command: "/plugin", description: "管理 Claude Code 插件", badge: "slash", support_level: "official", verification: meta(claudePlugins, "官方命令"), examples: ["/plugin", "/plugin install code-review@claude-plugins-official"] },
          { command: "/reload-plugins", description: "重新加载所有活动插件以应用待处理更改", badge: "slash", support_level: "official", verification: meta(claudePlugins, "官方命令") },
        ],
      },
      // ── 工作模式 ────────────────────────────────────────────────────────
      {
        category: "工作模式",
        icon: Play,
        verification: meta(claudeSlash, "工作模式命令来自官方文档。"),
        items: [
          { command: "/plan", description: "直接从提示进入计划模式", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), examples: ["/plan 修复认证 bug", "/plan 重构用户模块"] },
        ],
      },
      // ── 安全 ────────────────────────────────────────────────────────────
      {
        category: "安全",
        icon: Shield,
        verification: meta(claudeSandbox, "安全命令来自官方 sandboxing 页面。"),
        items: [
          { command: "/sandbox", description: "切换沙盒模式，在隔离环境中运行", badge: "slash", support_level: "official", verification: meta(claudeSandbox, "官方命令") },
        ],
      },
      // ── 技能管理 ────────────────────────────────────────────────────────
      {
        category: "技能管理",
        icon: Star,
        verification: meta("https://docs.anthropic.com/en/docs/claude-code/skills", "技能命令来自官方 skills 页面。"),
        items: [
          { command: "/skills", description: "列出可用技能", badge: "slash", support_level: "official", verification: meta("https://docs.anthropic.com/en/docs/claude-code/skills", "官方命令") },
        ],
      },
      // ── 输入方式 ────────────────────────────────────────────────────────
      {
        category: "输入方式",
        icon: Monitor,
        verification: meta(claudeVoice, "输入方式来自官方 voice-dictation 页面。"),
        items: [
          { command: "/voice", description: "切换语音输入模式", badge: "slash", support_level: "official", verification: meta(claudeVoice, "官方命令") },
        ],
      },
      // ── 故障排查 ────────────────────────────────────────────────────────
      {
        category: "故障排查",
        icon: Bug,
        verification: meta(claudeTroubleshooting, "故障排查来自官方 troubleshooting 页面。"),
        items: [
          { command: "/doctor", description: "诊断并验证 Claude Code 安装和设置", badge: "slash", support_level: "official", verification: meta(claudeTroubleshooting, "官方命令") },
          { command: "/feedback", description: "提交关于 Claude Code 的反馈", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令"), aliases: ["/bug"], examples: ["/feedback", "/feedback report"] },
        ],
      },
      // ── 帮助 ────────────────────────────────────────────────────────────
      {
        category: "帮助",
        icon: BookOpen,
        verification: meta(claudeChangelog, "帮助命令来自官方文档。"),
        items: [
          { command: "/release-notes", description: "查看完整更新日志", badge: "slash", support_level: "official", verification: meta(claudeChangelog, "官方命令") },
        ],
      },
      // ── 其他 ────────────────────────────────────────────────────────────
      {
        category: "其他",
        icon: Moon,
        verification: meta(claudeSlash, "其他命令来自官方文档。"),
        items: [
          { command: "/stickers", description: "订购 Claude Code 贴纸", badge: "slash", support_level: "official", verification: meta(claudeSlash, "官方命令") },
        ],
      },
      // ── CLI 启动方式 ────────────────────────────────────────────────────
      {
        category: "CLI 启动方式",
        icon: Play,
        verification: meta(claudeCli, "CLI 启动方式来自官方 cli-usage 页面。"),
        items: [
          { command: "claude", description: "启动交互式会话", badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: "claude" },
          { command: 'claude "query"', description: "带初始问题启动交互式会话", badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: 'claude "explain this project"' },
          { command: "claude -p", description: "非交互输出模式，打印响应后退出", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: 'cat diff.txt | claude -p "summarize changes"' },
          { command: "claude -c", description: "继续当前目录最近的对话", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: "claude -c" },
          { command: "claude -r", description: "按 ID 或名称恢复特定会话", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: 'claude -r "auth-refactor" "Finish this PR"' },
          { command: "claude update", description: "更新到最新版本", badge: "cli", support_level: "official", verification: meta(claudeCli, "官方命令"), usage: "claude update" },
          { command: "claude auth login", description: "登录 Anthropic 账户", badge: "cli", support_level: "official", verification: meta(claudeAuth, "官方命令"), usage: "claude auth login --console" },
          { command: "claude auth logout", description: "退出 Anthropic 账户", badge: "cli", support_level: "official", verification: meta(claudeAuth, "官方命令"), usage: "claude auth logout" },
          { command: "claude auth status", description: "显示认证状态（JSON 格式）", badge: "cli", support_level: "official", verification: meta(claudeAuth, "官方命令"), usage: "claude auth status" },
          { command: "claude agents", description: "列出所有配置的子代理", badge: "cli", support_level: "official", verification: meta(claudeSubAgents, "官方命令"), usage: "claude agents" },
          { command: "claude mcp", description: "配置 MCP 服务器", badge: "cli", support_level: "official", verification: meta(claudeMcp, "官方命令"), usage: "claude mcp" },
          { command: "claude plugin", description: "管理 Claude Code 插件", badge: "cli", support_level: "official", verification: meta(claudePlugins, "官方命令"), usage: "claude plugin install code-review@claude-plugins-official" },
          { command: "claude remote-control", description: "启动远程控制服务器", badge: "cli", support_level: "official", verification: meta(claudeRemote, "官方命令"), usage: 'claude remote-control --name "My Project"' },
        ],
      },
      // ── CLI 参数 ────────────────────────────────────────────────────────
      {
        category: "CLI 参数",
        icon: Terminal,
        verification: meta(claudeCli, "CLI 参数来自官方 cli-reference 页面。"),
        items: [
          { command: "--continue, -c", description: "加载当前目录最近的对话", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --continue" },
          { command: "--resume, -r", description: "恢复特定会话", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --resume auth-refactor" },
          { command: "--name, -n", description: "设置会话显示名称", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude -n "my-feature-work"' },
          { command: "--print, -p", description: "打印响应，不进入交互模式", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude -p "query"' },
          { command: "--model", description: "指定使用的 AI 模型", badge: "flag", support_level: "official", verification: meta(claudeModelConfig, "官方参数"), usage: "claude --model claude-sonnet-4-6" },
          { command: "--effort", description: "设置当前会话的努力级别", badge: "flag", support_level: "official", verification: meta(claudeModelConfig, "官方参数"), usage: "claude --effort high" },
          { command: "--fallback-model", description: "默认模型过载时自动回退", badge: "flag", support_level: "official", verification: meta(claudeModelConfig, "官方参数"), usage: 'claude -p --fallback-model sonnet "query"' },
          { command: "--add-dir", description: "添加额外工作目录", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --add-dir ../apps ../lib" },
          { command: "--agent", description: "指定子代理配置", badge: "flag", support_level: "official", verification: meta(claudeSubAgents, "官方参数"), usage: "claude --agent my-custom-agent" },
          { command: "--allowedTools", description: "预授权特定工具", badge: "flag", support_level: "official", verification: meta(claudePermissions, "官方参数"), usage: 'claude --allowedTools "Bash(git log *)" "Read"' },
          { command: "--disallowedTools", description: "禁用特定工具", badge: "flag", support_level: "official", verification: meta(claudePermissions, "官方参数"), usage: 'claude --disallowedTools "Bash(curl *)"' },
          { command: "--dangerously-skip-permissions", description: "跳过权限确认模式", badge: "flag", support_level: "official", verification: meta(claudePermissions, "官方参数"), usage: "claude --dangerously-skip-permissions" },
          { command: "--permission-mode", description: "设置权限模式", badge: "flag", support_level: "official", verification: meta(claudePermissions, "官方参数"), usage: "claude --permission-mode plan" },
          { command: "--tools", description: "限制 Claude 可使用的内置工具", badge: "flag", support_level: "official", verification: meta(claudePermissions, "官方参数"), usage: 'claude --tools "Bash,Edit,Read"' },
          { command: "--system-prompt", description: "设置系统提示", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude --system-prompt "You are a Python expert"' },
          { command: "--system-prompt-file", description: "从文件加载系统提示", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --system-prompt-file ./custom-prompt.txt" },
          { command: "--append-system-prompt", description: "追加额外系统提示", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude --append-system-prompt "Always use TypeScript"' },
          { command: "--append-system-prompt-file", description: "从文件加载并追加系统提示", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --append-system-prompt-file ./extra-rules.txt" },
          { command: "--max-budget-usd", description: "API 调用最大美元金额", badge: "flag", support_level: "official", verification: meta(claudeCosts, "官方参数"), usage: 'claude -p --max-budget-usd 5.00 "query"' },
          { command: "--max-turns", description: "限制最大对话轮数", badge: "flag", support_level: "official", verification: meta(claudeCosts, "官方参数"), usage: 'claude -p --max-turns 3 "query"' },
          { command: "--bare", description: "最小模式：跳过自动发现，脚本调用更快", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude --bare -p "query"' },
          { command: "--output-format", description: "设置输出格式", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: 'claude -p "query" --output-format json' },
          { command: "--fork-session", description: "恢复时创建新会话 ID", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --resume abc123 --fork-session" },
          { command: "--from-pr", description: "从 GitHub PR 恢复会话", badge: "flag", support_level: "official", verification: meta(claudeGithub, "官方参数"), usage: "claude --from-pr 123" },
          { command: "--remote", description: "从 Web 会话恢复本地执行", badge: "flag", support_level: "official", verification: meta(claudeWeb, "官方参数"), usage: 'claude --remote "Fix the login bug"' },
          { command: "--teleport", description: "在本地终端恢复 Web 会话", badge: "flag", support_level: "official", verification: meta(claudeWeb, "官方参数"), usage: "claude --teleport" },
          { command: "--worktree, -w", description: "在隔离的 git worktree 中启动", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude -w feature-auth" },
          { command: "--tmux", description: "为 worktree 创建 tmux 会话", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude -w feature-auth --tmux" },
          { command: "--chrome", description: "启用 Chrome 浏览器集成", badge: "flag", support_level: "official", verification: meta(claudeChrome, "官方参数"), usage: "claude --chrome" },
          { command: "--verbose", description: "启用详细输出模式", badge: "flag", support_level: "official", verification: meta(claudeTroubleshooting, "官方参数"), usage: "claude --verbose" },
          { command: "--debug", description: "启用调试输出", badge: "flag", support_level: "official", verification: meta(claudeTroubleshooting, "官方参数"), usage: 'claude --debug "api,mcp"' },
          { command: "--version, -v", description: "输出版本号", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude -v" },
          { command: "--no-session-persistence", description: "禁用会话持久化", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --no-session-persistence" },
          { command: "--channels", description: "指定更新渠道", badge: "flag", support_level: "official", verification: meta(claudeCli, "官方参数"), usage: "claude --channels beta" },
        ],
      },
      // ── 快捷键 ──────────────────────────────────────────────────────────
      {
        category: "快捷键",
        icon: Keyboard,
        verification: meta(claudeCli, "快捷键来自官方 CLI 文档说明。"),
        items: [
          { command: "Ctrl + C", description: "中断当前执行", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + D", description: "退出会话", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Esc Esc", description: "编辑上一条输入", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + L", description: "清屏", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + K", description: "清空输入行", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + A", description: "光标移到行首", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + E", description: "光标移到行尾", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + U", description: "删除光标前所有内容", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + W", description: "删除光标前一个单词", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + P / ↑", description: "上一条历史记录", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + N / ↓", description: "下一条历史记录", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + R", description: "反向搜索历史", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + B / ←", description: "光标左移", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + F / →", description: "光标右移", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Alt + B", description: "光标左移一个单词", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Alt + F", description: "光标右移一个单词", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Enter", description: "提交输入", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Shift + Enter", description: "换行（多行输入）", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + G / Ctrl+X Ctrl+E", description: "在默认编辑器中打开输入", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + O", description: "切换详细输出模式", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + V", description: "从剪贴板粘贴图片", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + B", description: "后台运行任务", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + T", description: "切换任务列表", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Shift + Tab", description: "循环切换权限模式", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + Y", description: "粘贴删除的文本", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + J", description: "多行输入换行符", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "/ (行首)", description: "命令或技能菜单", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "! (行首)", description: "Bash 模式直接运行", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "@", description: "文件路径自动补全", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
          { command: "Ctrl + S", description: "暂存提示草稿", badge: "shortcut", support_level: "official", verification: meta(claudeCli, "官方说明") },
        ],
      },
      // ── 设置配置 ────────────────────────────────────────────────────────
      {
        category: "设置配置",
        icon: Settings,
        verification: meta(claudeSettings, "设置配置来自官方 settings 页面。"),
        items: [
          { command: "permissions.allow", description: "允许的工具列表", badge: "setting", support_level: "official", verification: meta(claudePermissions, "官方配置") },
          { command: "permissions.deny", description: "禁止的工具列表", badge: "setting", support_level: "official", verification: meta(claudePermissions, "官方配置") },
          { command: "env.*", description: "环境变量配置", badge: "setting", support_level: "official", verification: meta(claudeSettings, "官方配置") },
          { command: "mcpServers", description: "MCP 服务器配置", badge: "setting", support_level: "official", verification: meta(claudeMcp, "官方配置") },
          { command: "model", description: "默认模型设置", badge: "setting", support_level: "official", verification: meta(claudeModelConfig, "官方配置") },
          { command: "hooks", description: "Hook 事件配置", badge: "setting", support_level: "official", verification: meta(claudeHooks, "官方配置") },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Codex CLI
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "codex",
    name: "Codex CLI",
    official_url: codexCli,
    support_level: "official",
    verification: meta(codexCli, "OpenAI Codex CLI 官方文档入口可访问。"),
    groups: [
      // ── 会话管理 ────────────────────────────────────────────────────────
      {
        category: "会话管理",
        icon: MessageSquare,
        verification: meta(codexCommands, "会话命令来自 Codex CLI 参考页面。"),
        items: [
          { command: "/help", description: "显示命令帮助和使用说明", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/clear", description: "清空当前会话上下文并释放 token", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), aliases: ["/reset"] },
          { command: "/new", description: "开启新会话", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/quit", description: "退出会话", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), aliases: ["/exit"] },
          { command: "/resume", description: "恢复之前的会话", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), aliases: ["/continue"], examples: ["/resume session-id"] },
          { command: "/copy", description: "复制最近的助手响应到剪贴板", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), examples: ["/copy", "/copy 2"] },
          { command: "/export", description: "导出当前对话为文本文件", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), examples: ["/export conversation.md"] },
        ],
      },
      // ── 上下文管理 ──────────────────────────────────────────────────────
      {
        category: "上下文管理",
        icon: Eye,
        verification: meta(codexCommands, "上下文命令来自 Codex CLI 参考页面。"),
        items: [
          { command: "/compact", description: "压缩对话历史，释放上下文窗口", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), examples: ["/compact 重点关注 API 变更"] },
          { command: "/context", description: "查看当前上下文使用情况", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
        ],
      },
      // ── 模型配置 ────────────────────────────────────────────────────────
      {
        category: "模型配置",
        icon: Settings,
        verification: meta(codexReference, "模型配置来自官方参考页面。"),
        items: [
          { command: "/model", description: "切换当前会话使用的模型", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), examples: ["/model o4-mini", "/model o3"] },
        ],
      },
      // ── 审批与权限 ──────────────────────────────────────────────────────
      {
        category: "审批与权限",
        icon: Shield,
        verification: meta(codexReference, "审批命令来自 Codex CLI 参考页面。"),
        items: [
          { command: "/approval", description: "查看或调整审批策略", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令"), examples: ["/approval", "/approval on-request"] },
          { command: "/permissions", description: "查看或更新工具权限设置", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令"), aliases: ["/allowed-tools"] },
        ],
      },
      // ── 集成配置 ────────────────────────────────────────────────────────
      {
        category: "集成配置",
        icon: Wrench,
        verification: meta(codexReference, "集成命令来自官方参考页面。"),
        items: [
          { command: "/mcp", description: "管理 MCP 服务器连接", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/agent", description: "切换当前代理配置", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/agents", description: "列出和管理子代理", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "/hooks", description: "管理 Hook 配置", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 代码审查 ────────────────────────────────────────────────────────
      {
        category: "代码审查",
        icon: Search,
        verification: meta(codexReference, "代码审查命令来自官方参考页面。"),
        items: [
          { command: "/review", description: "执行代码审查流程", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/diff", description: "查看当前未提交的代码差异", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/security-review", description: "分析安全漏洞", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 用量统计 ────────────────────────────────────────────────────────
      {
        category: "用量统计",
        icon: Star,
        verification: meta(codexReference, "用量命令来自官方参考页面。"),
        items: [
          { command: "/cost", description: "查看当前会话的费用统计", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/usage", description: "查看 API 用量和速率限制", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "/stats", description: "查看会话统计信息", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 设置与外观 ──────────────────────────────────────────────────────
      {
        category: "设置与外观",
        icon: Palette,
        verification: meta(codexReference, "设置命令来自官方参考页面。"),
        items: [
          { command: "/status", description: "查看当前会话与配置状态", badge: "slash", support_level: "official", verification: meta(codexCommands, "官方命令") },
          { command: "/config", description: "查看和修改配置", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令"), aliases: ["/settings"] },
          { command: "/theme", description: "切换主题", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 记忆管理 ────────────────────────────────────────────────────────
      {
        category: "记忆管理",
        icon: BookOpen,
        verification: meta(codexReference, "记忆命令来自官方参考页面。"),
        items: [
          { command: "/memory", description: "管理记忆内容", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "/init", description: "初始化项目指令文件", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 自动化 ──────────────────────────────────────────────────────────
      {
        category: "自动化",
        icon: Timer,
        verification: meta(codexReference, "自动化命令来自官方参考页面。"),
        items: [
          { command: "/tasks", description: "列出和管理后台任务", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
        ],
      },
      // ── 故障排查 ────────────────────────────────────────────────────────
      {
        category: "故障排查",
        icon: Bug,
        verification: meta(codexReference, "故障排查来自官方参考页面。"),
        items: [
          { command: "/doctor", description: "运行诊断检查", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令") },
          { command: "/feedback", description: "提交反馈", badge: "slash", support_level: "official", verification: meta(codexReference, "官方命令"), aliases: ["/bug"] },
        ],
      },
      // ── CLI 启动方式 ────────────────────────────────────────────────────
      {
        category: "CLI 启动方式",
        icon: Play,
        verification: meta(codexReference, "CLI 启动来自官方参考页面。"),
        items: [
          { command: "codex", description: "启动交互式 TUI 会话", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex" },
          { command: "codex exec", description: "非交互执行单次任务", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: 'codex exec "summarize this repo"' },
          { command: "codex login", description: "登录并配置认证", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex login" },
          { command: "codex logout", description: "退出登录并清除认证", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex logout" },
          { command: "codex status", description: "查看认证和配置状态", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex status" },
          { command: "codex mcp", description: "管理 MCP 连接", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex mcp" },
          { command: "codex agents", description: "列出和管理子代理", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex agents" },
          { command: "codex update", description: "更新到最新版本", badge: "cli", support_level: "official", verification: meta(codexReference, "官方命令"), usage: "codex update" },
        ],
      },
      // ── CLI 参数 ────────────────────────────────────────────────────────
      {
        category: "CLI 参数",
        icon: Terminal,
        verification: meta(codexReference, "CLI 参数来自官方参考页面。"),
        items: [
          { command: "--model", description: "指定使用的 AI 模型", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --model o4-mini" },
          { command: "--approval-policy", description: "设置审批策略", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --approval-policy on-request" },
          { command: "--continue, -c", description: "继续最近的会话", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --continue" },
          { command: "--resume, -r", description: "恢复特定会话", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --resume session-id" },
          { command: "--name, -n", description: "设置会话名称", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: 'codex -n "my-feature"' },
          { command: "--system-prompt", description: "设置系统提示", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: 'codex --system-prompt "You are a Python expert"' },
          { command: "--system-prompt-file", description: "从文件加载系统提示", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --system-prompt-file ./prompt.txt" },
          { command: "--allowed-tools", description: "预授权工具列表", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: 'codex --allowed-tools "Bash,Edit,Read"' },
          { command: "--disallowed-tools", description: "禁用工具列表", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: 'codex --disallowed-tools "Bash(curl *)"' },
          { command: "--dangerously-skip-permissions", description: "跳过权限确认", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --dangerously-skip-permissions" },
          { command: "--max-turns", description: "限制最大对话轮数", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --max-turns 10" },
          { command: "--verbose", description: "启用详细输出", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --verbose" },
          { command: "--debug", description: "启用调试模式", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --debug" },
          { command: "--worktree, -w", description: "在 git worktree 中启动", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --worktree feature-branch" },
          { command: "--output-format", description: "设置输出格式", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --output-format json" },
          { command: "--version, -v", description: "输出版本号", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --version" },
          { command: "--help, -h", description: "查看帮助信息", badge: "flag", support_level: "official", verification: meta(codexReference, "官方参数"), usage: "codex --help" },
        ],
      },
      // ── 快捷键 ──────────────────────────────────────────────────────────
      {
        category: "快捷键",
        icon: Keyboard,
        verification: meta(codexReference, "快捷键来自官方文档。"),
        items: [
          { command: "Ctrl + C", description: "中断当前执行", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + D", description: "退出会话", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Esc Esc", description: "编辑上一条输入", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + L", description: "清屏", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + K", description: "清空输入行", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + A", description: "光标移到行首", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + E", description: "光标移到行尾", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + U", description: "删除光标前所有内容", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + W", description: "删除光标前一个单词", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + P / ↑", description: "上一条历史记录", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + N / ↓", description: "下一条历史记录", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + R", description: "反向搜索历史", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + B", description: "后台运行任务", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Shift + Enter", description: "换行（多行输入）", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Shift + Tab", description: "循环切换权限模式", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "Ctrl + G", description: "在编辑器中打开输入", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "@", description: "文件路径自动补全", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
          { command: "! (行首)", description: "Bash 模式直接运行", badge: "shortcut", support_level: "official", verification: meta(codexReference, "官方说明") },
        ],
      },
      // ── 配置入口 ────────────────────────────────────────────────────────
      {
        category: "配置入口",
        icon: Settings,
        verification: meta(codexReference, "配置入口来自官方参考页面。"),
        items: [
          { command: "~/.codex/config.toml", description: "全局配置文件路径", badge: "cli", support_level: "official", verification: meta(codexReference, "官方路径") },
          { command: "AGENTS.md", description: "项目级指令文件", badge: "cli", support_level: "official", verification: meta("https://developers.openai.com/codex/prompting", "官方指令文件") },
          { command: "approval_policy", description: "默认审批策略字段", badge: "flag", support_level: "official", verification: meta(codexReference, "官方字段") },
          { command: "model", description: "默认模型配置", badge: "flag", support_level: "official", verification: meta(codexReference, "官方字段") },
          { command: "env.*", description: "环境变量配置", badge: "setting", support_level: "official", verification: meta(codexReference, "官方配置") },
          { command: "hooks", description: "Hook 事件配置", badge: "setting", support_level: "official", verification: meta(codexReference, "官方配置") },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Gemini CLI
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "gemini",
    name: "Gemini CLI",
    official_url: geminiRoot,
    support_level: "official",
    verification: meta(geminiRoot, "Gemini CLI 官方文档入口可访问。"),
    groups: [
      // ── 会话管理 ────────────────────────────────────────────────────────
      {
        category: "会话管理",
        icon: MessageSquare,
        verification: meta(geminiCommands, "命令来自 Gemini CLI commands 页面。"),
        items: [
          { command: "/help", description: "显示帮助与命令列表", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/clear", description: "清空当前会话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/reset"] },
          { command: "/quit", description: "退出会话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/exit"] },
          { command: "/resume", description: "恢复之前的会话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/continue"] },
          { command: "/chat", description: "管理会话与对话线程", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/copy", description: "复制最近的响应到剪贴板", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), examples: ["/copy"] },
          { command: "/export", description: "导出当前对话", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), examples: ["/export conversation.md"] },
        ],
      },
      // ── 上下文管理 ──────────────────────────────────────────────────────
      {
        category: "上下文管理",
        icon: Eye,
        verification: meta(geminiCommands, "上下文命令来自 commands 页面。"),
        items: [
          { command: "/compress", description: "压缩上下文", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), examples: ["/compress 重点关注 API 变更"] },
          { command: "/context", description: "查看上下文使用情况", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 模型配置 ────────────────────────────────────────────────────────
      {
        category: "模型配置",
        icon: Settings,
        verification: meta(geminiCommands, "模型命令来自 commands 页面。"),
        items: [
          { command: "/model", description: "切换当前模型", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), examples: ["/model gemini-2.5-flash", "/model gemini-2.5-pro"] },
        ],
      },
      // ── 集成配置 ────────────────────────────────────────────────────────
      {
        category: "集成配置",
        icon: Wrench,
        verification: meta(geminiCommands, "集成命令来自 commands 页面。"),
        items: [
          { command: "/mcp", description: "管理 MCP 连接", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/extensions", description: "管理扩展", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/tools", description: "查看工具状态", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/hooks", description: "管理 Hook 配置", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 权限管理 ────────────────────────────────────────────────────────
      {
        category: "权限管理",
        icon: Shield,
        verification: meta(geminiCommands, "权限命令来自 commands 页面。"),
        items: [
          { command: "/permissions", description: "查看或更新权限设置", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/allowed-tools"] },
        ],
      },
      // ── 用量统计 ────────────────────────────────────────────────────────
      {
        category: "用量统计",
        icon: Star,
        verification: meta(geminiCommands, "用量命令来自 commands 页面。"),
        items: [
          { command: "/cost", description: "查看费用统计", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/stats", description: "查看会话统计", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/usage", description: "查看 API 用量", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 设置与外观 ──────────────────────────────────────────────────────
      {
        category: "设置与外观",
        icon: Palette,
        verification: meta(geminiCommands, "设置命令来自 commands 页面。"),
        items: [
          { command: "/settings", description: "查看和修改设置", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/config"] },
          { command: "/theme", description: "切换主题", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/status", description: "查看当前会话状态", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 记忆管理 ────────────────────────────────────────────────────────
      {
        category: "记忆管理",
        icon: BookOpen,
        verification: meta(geminiCommands, "记忆命令来自 commands 页面。"),
        items: [
          { command: "/memory", description: "管理记忆内容", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/init", description: "初始化项目", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 自动化 ──────────────────────────────────────────────────────────
      {
        category: "自动化",
        icon: Timer,
        verification: meta(geminiCommands, "自动化命令来自 commands 页面。"),
        items: [
          { command: "/tasks", description: "管理后台任务", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 认证管理 ────────────────────────────────────────────────────────
      {
        category: "认证管理",
        icon: Users,
        verification: meta(geminiCommands, "认证命令来自 commands 页面。"),
        items: [
          { command: "/auth", description: "管理认证状态", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 故障排查 ────────────────────────────────────────────────────────
      {
        category: "故障排查",
        icon: Bug,
        verification: meta(geminiCommands, "故障排查命令来自 commands 页面。"),
        items: [
          { command: "/about", description: "查看版本与构建信息", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/version", description: "查看版本信息", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
          { command: "/bug", description: "提交问题反馈", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令"), aliases: ["/feedback"] },
          { command: "/doctor", description: "运行诊断检查", badge: "slash", support_level: "official", verification: meta(geminiCommands, "官方命令") },
        ],
      },
      // ── 上下文注入 ──────────────────────────────────────────────────────
      {
        category: "上下文注入",
        icon: FolderOpen,
        verification: meta(geminiCommands, "上下文注入语法来自 commands 页面。"),
        items: [
          { command: "@<path>", description: "将文件或目录注入上下文", badge: "at", support_level: "official", verification: meta(geminiCommands, "官方语法"), examples: ["@src/auth/middleware.ts"] },
          { command: "!<shell_command>", description: "执行本地 shell 命令并注入输出", badge: "shell", support_level: "official", verification: meta(geminiCommands, "官方语法"), examples: ["!git status"] },
        ],
      },
      // ── CLI 启动方式 ────────────────────────────────────────────────────
      {
        category: "CLI 启动方式",
        icon: Play,
        verification: meta(geminiRoot, "CLI 启动来自官方首页。"),
        items: [
          { command: "gemini", description: "启动交互式会话", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令"), usage: "gemini" },
          { command: "gemini -p", description: "非交互执行单次任务", badge: "cli", support_level: "official", verification: meta(geminiCommands, "官方命令"), usage: 'gemini -p "explain this error"' },
          { command: "gemini login", description: "登录认证", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令"), usage: "gemini login" },
          { command: "gemini logout", description: "退出登录", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令"), usage: "gemini logout" },
          { command: "gemini status", description: "查看状态", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令"), usage: "gemini status" },
          { command: "gemini mcp", description: "管理 MCP 连接", badge: "cli", support_level: "official", verification: meta(geminiRoot, "官方命令"), usage: "gemini mcp" },
        ],
      },
      // ── CLI 参数 ────────────────────────────────────────────────────────
      {
        category: "CLI 参数",
        icon: Terminal,
        verification: meta(geminiCommands, "CLI 参数来自 commands 页面。"),
        items: [
          { command: "--model", description: "指定模型名称", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: "gemini --model gemini-2.5-flash" },
          { command: "--system-prompt", description: "设置系统提示", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: 'gemini --system-prompt "You are a Go expert"' },
          { command: "--system-prompt-file", description: "从文件加载系统提示", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: "gemini --system-prompt-file ./prompt.txt" },
          { command: "--allowed-tools", description: "预授权工具列表", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: 'gemini --allowed-tools "Bash,Edit,Read"' },
          { command: "--disallowed-tools", description: "禁用工具列表", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: 'gemini --disallowed-tools "Bash(curl *)"' },
          { command: "--max-turns", description: "限制最大对话轮数", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: "gemini --max-turns 10" },
          { command: "--verbose", description: "启用详细输出", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: "gemini --verbose" },
          { command: "--debug", description: "启用调试模式", badge: "flag", support_level: "official", verification: meta(geminiCommands, "官方参数"), usage: "gemini --debug" },
          { command: "--version", description: "查看版本信息", badge: "flag", support_level: "official", verification: meta(geminiRoot, "官方参数"), usage: "gemini --version" },
          { command: "--help", description: "查看参数说明", badge: "flag", support_level: "official", verification: meta(geminiRoot, "官方参数"), usage: "gemini --help" },
        ],
      },
      // ── 快捷键 ──────────────────────────────────────────────────────────
      {
        category: "快捷键",
        icon: Keyboard,
        verification: meta(geminiCommands, "快捷键来自官方文档。"),
        items: [
          { command: "Ctrl + C", description: "中断当前执行", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + D", description: "退出会话", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Esc Esc", description: "编辑上一条输入", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + L", description: "清屏", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + K", description: "清空输入行", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + A", description: "光标移到行首", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + E", description: "光标移到行尾", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + U", description: "删除光标前所有内容", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + W", description: "删除光标前一个单词", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + P / ↑", description: "上一条历史记录", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + N / ↓", description: "下一条历史记录", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + R", description: "反向搜索历史", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + B", description: "后台运行任务", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Shift + Enter", description: "换行（多行输入）", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "Ctrl + G", description: "在编辑器中打开输入", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "@", description: "文件路径自动补全", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
          { command: "! (行首)", description: "Bash 模式直接运行", badge: "shortcut", support_level: "official", verification: meta(geminiCommands, "官方说明") },
        ],
      },
      // ── 配置入口 ────────────────────────────────────────────────────────
      {
        category: "配置入口",
        icon: Settings,
        verification: meta(geminiConfig, "配置来自 configuration 页面。"),
        items: [
          { command: "GEMINI.md", description: "项目级指令文件", badge: "cli", support_level: "official", verification: meta(geminiConfig, "官方文件说明") },
          { command: "GEMINI_API_KEY", description: "API Key 环境变量", badge: "flag", support_level: "official", verification: meta(geminiConfig, "官方配置") },
          { command: "GOOGLE_API_KEY", description: "Google API Key 环境变量", badge: "flag", support_level: "official", verification: meta(geminiConfig, "官方配置") },
          { command: "settings.json", description: "用户级配置文件", badge: "setting", support_level: "official", verification: meta(geminiConfig, "官方配置") },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // OpenCode
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "opencode",
    name: "OpenCode",
    official_url: opencodeRoot,
    support_level: "official",
    verification: meta(opencodeRoot, "OpenCode 官方文档入口可访问。"),
    groups: [
      {
        category: "会话命令",
        icon: MessageSquare,
        verification: meta(opencodeRoot, "命令来自 OpenCode 官方文档。"),
        items: [
          { command: "/help", description: "显示可用命令列表", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/clear", description: "清空当前会话上下文", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/quit", description: "退出会话", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/model", description: "切换当前模型", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/mcp", description: "管理 MCP 服务器", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/settings", description: "查看和修改设置", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/status", description: "查看当前会话状态", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/config", description: "查看配置信息", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/memory", description: "管理记忆内容", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/export", description: "导出当前对话", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/bug", description: "提交问题反馈", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/feedback", description: "提交反馈", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/version", description: "查看版本信息", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/init", description: "初始化项目", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "/hooks", description: "管理 Hook 配置", badge: "slash", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
        ],
      },
      {
        category: "CLI 命令",
        icon: Play,
        verification: meta(opencodeRoot, "CLI 命令来自官方文档。"),
        items: [
          { command: "opencode", description: "启动交互式会话", badge: "cli", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "opencode --help", description: "查看帮助信息", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
          { command: "opencode --version", description: "查看版本信息", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方命令") },
        ],
      },
      {
        category: "CLI 参数",
        icon: Terminal,
        verification: meta(opencodeRoot, "CLI 参数来自官方文档。"),
        items: [
          { command: "--model", description: "指定使用的 AI 模型", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: "opencode --model claude-sonnet-4-6" },
          { command: "--config", description: "指定配置文件路径", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: "opencode --config ./opencode.json" },
          { command: "--verbose", description: "启用详细输出", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: "opencode --verbose" },
          { command: "--debug", description: "启用调试模式", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: "opencode --debug" },
          { command: "--system-prompt", description: "设置系统提示", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: 'opencode --system-prompt "You are a Rust expert"' },
          { command: "--allowed-tools", description: "预授权工具列表", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: 'opencode --allowed-tools "Bash,Edit,Read"' },
          { command: "--max-turns", description: "限制最大对话轮数", badge: "flag", support_level: "official", verification: meta(opencodeRoot, "官方参数"), usage: "opencode --max-turns 10" },
        ],
      },
      {
        category: "配置入口",
        icon: Settings,
        verification: meta(opencodeRoot, "配置来自官方文档。"),
        items: [
          { command: "opencode.json", description: "项目级配置文件", badge: "cli", support_level: "official", verification: meta(opencodeRoot, "官方路径") },
          { command: "~/.config/opencode/opencode.json", description: "全局配置文件", badge: "cli", support_level: "official", verification: meta(opencodeRoot, "官方路径") },
          { command: "AGENTS.md", description: "项目级指令文件", badge: "cli", support_level: "official", verification: meta(opencodeRoot, "官方指令文件") },
        ],
      },
      {
        category: "快捷键",
        icon: Keyboard,
        verification: meta(opencodeRoot, "快捷键来自官方文档。"),
        items: [
          { command: "Ctrl + C", description: "中断当前执行", badge: "shortcut", support_level: "official", verification: meta(opencodeRoot, "官方说明") },
          { command: "Ctrl + D", description: "退出会话", badge: "shortcut", support_level: "official", verification: meta(opencodeRoot, "官方说明") },
          { command: "Esc Esc", description: "编辑上一条输入", badge: "shortcut", support_level: "official", verification: meta(opencodeRoot, "官方说明") },
          { command: "Ctrl + L", description: "清屏", badge: "shortcut", support_level: "official", verification: meta(opencodeRoot, "官方说明") },
          { command: "Ctrl + R", description: "反向搜索历史", badge: "shortcut", support_level: "official", verification: meta(opencodeRoot, "官方说明") },
        ],
      },
    ],
  },
];

// ─── Badge labels ────────────────────────────────────────────────────────────

export const CLI_BADGE_LABELS: Record<string, { label: string; className: string }> = {
  slash: { label: "斜杠命令", className: "bg-primary/15 text-primary border-primary/30" },
  flag: { label: "CLI 参数", className: "bg-accent/15 text-accent border-accent/30" },
  shortcut: { label: "快捷键", className: "bg-success/15 text-[hsl(var(--success))] border-success/30" },
  cli: { label: "CLI 命令", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  interactive: { label: "交互命令", className: "bg-primary/15 text-primary border-primary/30" },
  at: { label: "@ 命令", className: "bg-accent/15 text-accent border-accent/30" },
  shell: { label: "! 命令", className: "bg-warning/15 text-[hsl(var(--warning))] border-warning/30" },
  setting: { label: "设置项", className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  workflow: { label: "工作流", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  tip: { label: "社区技巧", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
};

// ─── Metadata ────────────────────────────────────────────────────────────────

export const CLI_METADATA = {
  codex_official_url: codexCli,
  gemini_official_url: geminiRoot,
  opencode_official_url: opencodeRoot,
  verified_at: VERIFIED_AT,
};
