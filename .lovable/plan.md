
# 解决两个核心问题

## 问题诊断

### 问题一：「测试失败 supabaseKey is required」

**根本原因**：`supabase/functions/test-connection/index.ts` 的第 24 行使用的是 `SUPABASE_PUBLISHABLE_KEY` 这个 secret 名称，但实际上 Supabase 内置环境中该变量名是 `SUPABASE_ANON_KEY`（Lovable Cloud 会自动注入 `SUPABASE_URL`、`SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`，而不是 `SUPABASE_PUBLISHABLE_KEY`）。

通过查看 secrets 列表，Lovable Cloud 配置的密钥名是 `SUPABASE_ANON_KEY`（标准名），但代码里读取的是 `SUPABASE_PUBLISHABLE_KEY`，导致 `supabaseKey` 为空，触发 Supabase 客户端的 "supabaseKey is required" 错误。

**修复**：将 `test-connection` edge function 中的 `SUPABASE_PUBLISHABLE_KEY` 改为 `SUPABASE_ANON_KEY`。

---

### 问题二：Providers / MCP Servers / Skills 启用后能否真实生效到本地 PC？

**现状说明**（重要，需要向用户清楚解释）：

这是一个 **Web 应用**，它运行在浏览器中。Web 端**无法直接修改本地 PC 的文件系统**（如 `~/.claude/settings.json`、`~/.codex/config.toml` 等），这是浏览器安全沙箱的根本限制，不是 Bug。

**当前架构的定位**是：**云端配置备份与管理中心 + 配置文件生成器**。

**目前已有的「应用到本地」机制**（导出功能已存在）：
- 用户在 Web 端管理配置 → 云端保存
- 用户通过「导出」页面，将配置导出为对应格式的本地文件（`settings.json`、`CLAUDE.md` 等）
- 用户手动将这些文件放到本地 CLI 工具读取的路径

**需要改进的地方**：这个「导出→手动部署」的流程对用户不够直观，很多用户不知道需要这一步。应该在 MCP Servers 等功能页面加入**清晰的本地部署说明**。

---

## 解决方案

### 修复一：修复 test-connection Edge Function

将 `supabase/functions/test-connection/index.ts` 第 24 行：
```typescript
// 修改前（错误）
const supabaseKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

// 修改后（正确）
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
```

同时增加防御性检查，避免 key 为 undefined 时导致崩溃：
```typescript
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
if (!supabaseUrl || !supabaseKey) {
  return new Response(JSON.stringify({ success: false, message: "服务配置错误" }), { ... });
}
```

这一个改动将直接修复连通性测试的报错。

### 修复二：在 MCP Servers 页面添加「本地部署指引」Banner

在 MCP Servers 页面顶部（以及 Providers 页面）添加一个信息横幅，清楚说明：
- Web 端管理配置会**实时同步到云端**（即云端备份效果已实现）
- 要让配置**生效于本地 CLI**，需要通过「导出」→ 将文件放置到本地指定路径
- 提供快捷跳转到「导出」页面的按钮，并显示每个应用对应的本地配置文件路径

横幅内容示例：
```
信息提示卡片：
标题：本地部署说明
内容：配置已实时备份到云端。要应用到本地 CLI，需将配置文件放置到对应路径：
  - Claude Code：~/.claude/settings.json
  - Codex CLI：~/.codex/config.toml
  - Gemini CLI：~/.gemini/settings.json
按钮：[前往导出配置]
```

### 修复三：改善导出页面的「应用导出」说明

在导出页面的「应用导出」卡片里，为每个 CLI 工具添加本地文件放置路径说明，让用户清楚下一步操作。

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `supabase/functions/test-connection/index.ts` | 修改 | 将 `SUPABASE_PUBLISHABLE_KEY` 改为 `SUPABASE_ANON_KEY`，并增加防御性检查 |
| `src/pages/McpServers.tsx` | 修改 | 添加本地部署说明横幅，指引用户将配置同步到本地 |
| `src/pages/Providers.tsx` | 修改 | 添加同步说明横幅 |
| `src/pages/Export.tsx` | 修改 | 在应用导出卡片中添加目标路径说明 |

### 无新增依赖，无数据库变更

---

## 关于「Stdio MCP 连通性测试」的特殊说明

对于 `transport_type = "stdio"` 的 MCP Server（如 `npx -y @anthropics/mcp-fetch`），即使修复了 key 问题，测试结果也会是「配置有效，但需在本地验证」，这是正确的预期行为——因为 stdio 类型的 MCP Server 需要在本地有 Node.js 运行时才能执行 `npx` 命令，云端 Edge Function 环境没有 Node.js，无法真正启动这些进程。HTTP/SSE 类型的 MCP Server 可以真正测试连通性。
