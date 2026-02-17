

# 添加「环境配置与常用技巧帮助」独立页面

## 概述

新建一个独立的「环境配置与常用技巧」页面（`/setup-guide`），为用户提供 Anthropic Claude Code、OpenAI Codex CLI、Google Gemini CLI 三大工具的完整环境搭建指南、常用技巧、最佳实践和常见问题解决方案。页面采用与现有 `/cli-guide` 和 `/skills-guide` 一致的 Tab + 分组手风琴 + 搜索过滤交互模式。

## 页面结构设计

```text
+----------------------------------------------------------+
| 环境配置与常用技巧                                         |
| Anthropic / Codex / Gemini CLI 环境搭建与最佳实践指南       |
+----------------------------------------------------------+
| [Claude Code]  [Codex CLI]  [Gemini CLI]                  |
+----------------------------------------------------------+
| 搜索配置说明...           [全部展开] [全部折叠]             |
| 显示 X / 共 Y 条                      [官方文档 ↗]        |
+----------------------------------------------------------+
| > 前置条件（3 条）                                         |
|   Node.js >= 18 / Python >= 3.8 / npm 等系统要求           |
| > 安装步骤（4 条）                                         |
|   npm install / pip install / 包管理器安装                  |
| > API 密钥与认证（3 条）                                   |
|   密钥获取 → 环境变量设置 → 认证验证                        |
| > 环境变量配置（3 条）                                     |
|   Windows / macOS / Linux 分操作系统示例                    |
| > 初始化验证（2 条）                                       |
|   验证命令 + 预期输出示例                                   |
| > 核心命令示例（5 条）                                     |
|   最常用命令及参数用法                                      |
| > 典型应用场景（4 条）                                     |
|   模型调用 / 代码审查 / 批量处理 / 成本管理                  |
| > 性能优化（3 条）                                         |
|   批量处理 / 并行调用 / 上下文管理                          |
| > 问题排查（4 条）                                         |
|   常见错误码 / 网络问题 / 权限问题 / 日志查看                |
| > 常见问题 FAQ（5 条）                                     |
|   精选高频问题与解答                                        |
+----------------------------------------------------------+
```

每个条目包含：
- 标题（带 Badge 类型标注：前置条件 / 命令 / 配置 / 技巧 / FAQ）
- 中文详细描述
- 可复制的代码块（命令行 / 配置文件 / 环境变量）
- 可选的多操作系统对照表格

## 内容规划（基于官方文档）

### Claude Code 环境配置

| 分组 | 条目 |
|------|------|
| 前置条件 | Node.js >= 18、Git（推荐）、操作系统要求（macOS / Linux / Windows via WSL2） |
| 安装步骤 | `npm install -g @anthropic-ai/claude-code`、npx 方式运行、版本更新 |
| API 密钥与认证 | Anthropic Console 获取密钥、`ANTHROPIC_API_KEY` 设置、OAuth 登录（`/login`）、Max Plan 认证 |
| 环境变量配置 | Windows / macOS / Linux 三系统环境变量设置示例、`.bashrc` / `.zshrc` / PowerShell 配置 |
| 初始化验证 | `claude --version`、`claude` 启动交互模式验证 |
| 核心命令示例 | 交互模式、一次性查询 `claude "query"`、管道模式 `claude -p`、继续对话 `--continue`、恢复会话 `--resume` |
| 典型应用场景 | 代码审查（`/review`）、项目初始化（`/init`）、上下文压缩（`/compact`）、多模型切换 |
| 性能优化 | 上下文窗口管理、Compact 策略、`/add-dir` 多目录加载、并行子代理 |
| 问题排查 | 认证失败排查、Node.js 版本不兼容、网络代理配置、`/doctor` 诊断 |
| 常见问题 FAQ | 支持哪些模型？费用如何计算？如何在企业代理后使用？如何重置配置？如何查看日志？ |

### Codex CLI 环境配置

| 分组 | 条目 |
|------|------|
| 前置条件 | Node.js >= 22、Git、macOS / Linux（Windows 暂不原生支持，需 WSL2）、沙箱依赖（macOS: Docker；Linux: bubblewrap） |
| 安装步骤 | `npm install -g @openai/codex`、首次运行配置向导 |
| API 密钥与认证 | OpenAI API Key 获取、`OPENAI_API_KEY` 设置、其他提供者密钥（`GEMINI_API_KEY` 等） |
| 环境变量配置 | 三操作系统环境变量示例、`~/.codex/config.toml` 配置文件 |
| 初始化验证 | `codex --version`、`codex --help`、简单查询测试 |
| 核心命令示例 | 交互模式、一次性查询、`--approval-mode` 三种模式、`--model` 选择、`--sandbox` 控制 |
| 典型应用场景 | Full-auto 模式批量重构、沙箱安全执行、多提供者切换、图片输入分析 |
| 性能优化 | `--quiet` 精简输出、`config.toml` 预配置默认值、合理的审批模式选择 |
| 问题排查 | Docker 沙箱启动失败、API 配额超限、模型不可用、权限问题 |
| 常见问题 FAQ | 支持哪些 LLM 提供者？沙箱如何工作？如何离线使用？如何自定义指令？ |

### Gemini CLI 环境配置

| 分组 | 条目 |
|------|------|
| 前置条件 | Node.js >= 18、npm/npx、Google 账户 |
| 安装步骤 | `npx https://github.com/anthropics/claude-code` 方式运行、`npm install -g @anthropic-ai/claude-code` 全局安装 --> 修正为 Gemini: `npx https://github.com/google-gemini/gemini-cli` 或 `npm install -g @anthropic-ai/gemini-cli` --> 实际为 `npx https://github.com/google-gemini/gemini-cli` |
| API 密钥与认证 | Google AI Studio 获取 API Key、`GEMINI_API_KEY` 设置、Google OAuth 登录、Vertex AI 认证 |
| 环境变量配置 | 三操作系统设置示例、`.gemini/settings.json` 配置 |
| 初始化验证 | `gemini --version`、`gemini` 启动交互、`/help` 验证 |
| 核心命令示例 | 交互模式、`--model` 选择、`-p` 非交互模式、`@file` 引用文件、`!command` 执行 Shell |
| 典型应用场景 | 代码生成与重构、文件分析（`@file`）、检查点管理、多工具集成（MCP） |
| 性能优化 | `/compress` 压缩上下文、`--sandbox` 沙箱模式、Memory 系统利用 |
| 问题排查 | OAuth 授权失败、API 配额限制、代理设置、扩展加载错误 |
| 常见问题 FAQ | 免费额度是多少？如何切换模型？如何使用 MCP？如何管理会话历史？ |

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/pages/SetupGuide.tsx` | 新建 | 环境配置与技巧帮助页面（全部数据 + 搜索 + 分组 + 代码复制） |
| `src/App.tsx` | 修改 | 添加 `/setup-guide` 路由 |
| `src/components/AppSidebar.tsx` | 修改 | 添加「环境配置」导航项（使用 `Monitor` 图标） |
| `src/i18n/locales/zh.ts` | 修改 | 添加 `nav.setupGuide` 及页面相关翻译 |
| `src/i18n/locales/en.ts` | 修改 | 添加对应英文翻译 |

### 无新增依赖

全部使用已有组件（Tabs、Badge、Input、Button、Card、Tooltip、Table）和已有模式。

## 技术实现

### 数据结构

```typescript
interface SetupGuideItem {
  title: string;
  description: string;
  code?: string;          // 可复制代码块
  badge?: "prereq" | "install" | "config" | "verify" | "command" | "scenario" | "optimize" | "debug" | "faq";
  table?: { headers: string[]; rows: string[][] };
}

interface SetupGuideGroup {
  category: string;
  icon: LucideIcon;
  items: SetupGuideItem[];
}

interface SetupGuideTool {
  id: string;
  name: string;
  officialUrl: string;
  groups: SetupGuideGroup[];
}
```

### 一键复制功能

每个代码块右上角增加复制按钮，使用 `navigator.clipboard.writeText()` 实现，复制成功后短暂显示"已复制"反馈：

```typescript
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
```

### Badge 类型

| Badge | 含义 | 样式 |
|-------|------|------|
| prereq | 前置条件 | 蓝色调 |
| install | 安装步骤 | 绿色调 |
| config | 配置项 | 橙色调 |
| verify | 验证命令 | 紫色调 |
| command | 核心命令 | 主题色 |
| scenario | 应用场景 | 强调色 |
| optimize | 性能优化 | 成功色 |
| debug | 问题排查 | 警告色 |
| faq | 常见问题 | 信息色 |

### 搜索功能

与 `/cli-guide` 一致：实时过滤标题和描述，自动展开匹配分组，显示匹配/总数统计。

### 视觉设计

- 代码块使用 `font-mono` + 暗色背景 + 右上角复制按钮
- 多操作系统配置使用 Table 组件展示对照表
- Badge 区分条目类型
- 支持暗色主题
- 与现有 `/cli-guide`、`/skills-guide` 页面风格完全一致

