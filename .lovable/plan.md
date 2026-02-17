
# MCP Servers & Skills 预设分类重构

## 问题分析

当前按 5 大平台（Claude/Codex/Gemini/OpenCode/黑客松）分类存在以下问题：

1. **严重冗余**：playwright、context7、mcp-fetch 在每个平台 Tab 中重复出现
2. **分类逻辑错误**：MCP Server 是协议级工具，与平台无关；Skills 仓库也是通用资源
3. **用户困惑**：用户不知道该从哪个平台 Tab 找需要的工具
4. **维护成本高**：同一工具需在多处更新

## 解决方案

### 原则：按「功能用途」分类，而非按「平台」分类

平台绑定已经在 MCP Server 表单的"绑定应用"字段和导出模块中实现，预设选择阶段无需重复。

---

### MCP Servers 新分类

移除 5 个平台 Tab，改为按功能分类：

| 分类 | 内置 MCP Servers |
|------|-----------------|
| 浏览器与测试 | playwright, puppeteer |
| 搜索与网络 | mcp-fetch, brave-search, context7 |
| 数据与存储 | sqlite, postgres, mcp-memory, mcp-filesystem |
| 开发工具 | github, sequential-thinking, everything |
| 协作与通信 | slack |

共 13 个不重复的 MCP Server，从原来 5 个 Tab x 5 项 = 25 项（大量重复）精简为 5 类 13 项（零重复）。

### Skills 仓库新分类

移除 5 个平台 Tab（claude/codex/gemini/opencode/hackathon），仅保留按功能分类：

| 分类 | 说明 |
|------|------|
| 研发类 | AI 框架、编码助手、MCP 官方资源 |
| 设计类 | 设计工具、白板、动画引擎 |
| 办公类 | Chat UI、工作流、项目管理 |
| QA 测试 | 端到端测试、性能测试、Mock 工具 |
| 文档处理 | PDF 解析、文档转换、内容提取 |

每类保留原有的 10 个高 Star 仓库，去除跨平台重复项。

---

## 技术实现

### 文件变更

**src/pages/McpServers.tsx**
- 将 `MCP_PRESETS` 从平台分类重构为功能分类：
  - `browser`: 浏览器与测试（playwright, puppeteer）
  - `search`: 搜索与网络（mcp-fetch, brave-search, context7）
  - `data`: 数据与存储（sqlite, postgres, mcp-memory, mcp-filesystem）
  - `devtools`: 开发工具（github, sequential-thinking, everything）
  - `collab`: 协作与通信（slack）
- 更新 `MCP_PRESET_KEYS` 和模板选择 Tab UI
- 从 `APP_OPTIONS` 中移除 `hackathon`（保留 claude/codex/gemini/opencode 四个标准平台作为绑定选项）

**src/pages/Skills.tsx**
- 从 `PRESET_REPOS` 中移除 `claude`, `codex`, `gemini`, `opencode`, `hackathon` 五个平台 key
- 仅保留 `dev`, `design`, `office`, `qa`, `docs` 五个功能分类
- 更新 `PRESET_TABS` 移除平台 Tab，只保留 5 个功能 Tab
- Tab 数量从 10 个减少到 5 个，更简洁清晰
