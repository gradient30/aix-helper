

# CC-Switch Web 云端配置管理平台

基于 cc-switch 开源项目的核心功能，构建一个支持用户注册登录、云端持久化存储、导出下载的 Web 端管理平台。

---

## 🔐 用户系统

- **注册与登录**：支持邮箱密码注册/登录
- **用户资料**：基础用户档案（昵称、头像）
- **会话管理**：登录状态保持，安全退出

---

## 📡 Provider 管理（API 配置管理）

cc-switch 的核心功能，管理 Claude Code / Codex / Gemini CLI / OpenCode 的 API 配置。

- **Provider 列表**：卡片/列表视图展示所有已配置的 Provider
- **新增 Provider**：支持从预设模板快速创建（如官方登录、PackyCode、自定义等），也支持完全自定义配置
- **编辑/删除 Provider**：修改 API Key、Base URL、模型配置等字段
- **拖拽排序**：自定义 Provider 显示顺序
- **Provider 复制**：一键复制现有配置
- **多端点管理**：每个 Provider 支持多个 API 端点
- **模型粒度配置**：支持 Haiku/Sonnet/Opus/自定义 四级模型配置
- **环境变量冲突检测**：显示不同应用间的配置冲突及解决建议

---

## 🔧 MCP Server 管理

统一管理 Claude Code、Codex、Gemini、OpenCode 四个应用的 MCP 服务器配置。

- **MCP 服务器列表**：展示所有已配置的 MCP 服务器及其状态
- **新增 MCP 服务器**：支持内置模板（mcp-fetch、mcp-filesystem 等）和自定义配置
- **传输类型支持**：stdio / http / sse 三种传输方式
- **启用/禁用**：开关控制哪些服务器同步到配置文件
- **应用分配**：指定每个 MCP 服务器绑定到哪些应用
- **导入**：支持从 JSON 导入现有 MCP 配置
- **导出**：按应用导出 MCP 配置（Claude JSON / Codex TOML / Gemini JSON 格式）

---

## 📚 Skills 管理

管理 AI CLI 技能包，支持从 GitHub 仓库发现和管理 Skills。

- **仓库管理**：添加/删除 GitHub 仓库源（预配置 Anthropic 官方、ComposioHQ 等）
- **Skills 浏览**：展示从仓库扫描到的 Skills 列表（名称、描述、来源）
- **安装状态管理**：标记已安装/未安装状态
- **自定义仓库**：支持添加自定义 GitHub 仓库，包含子目录扫描
- **递归扫描**：支持多级目录结构

---

## 📝 Prompts 管理

管理系统提示词预设，支持跨应用配置。

- **预设列表**：展示所有提示词预设
- **Markdown 编辑器**：代码高亮 + 实时预览的编辑体验
- **多预设管理**：创建无限量的提示词预设，快速切换
- **跨应用支持**：标注每个预设对应的目标文件（CLAUDE.md / AGENTS.md / GEMINI.md / OPENCODE.md）
- **激活状态**：标记当前激活的预设

---

## 📦 导入/导出 & 配置同步

- **全量导出**：一键导出所有配置为 JSON 压缩包
- **按模块导出**：单独导出 Provider / MCP / Skills / Prompts 配置
- **格式化导出**：按目标应用格式导出（Claude settings.json、Codex auth.json + config.toml、Gemini .env + settings.json）
- **全量导入**：从 JSON 文件导入恢复全部配置
- **Deep Link 生成**：生成 `ccswitch://` 协议链接用于分享 Provider 配置

---

## 🎨 界面与体验

- **响应式设计**：桌面端优先，兼容移动端访问
- **深色/浅色模式**：跟随系统或手动切换
- **中英文双语**：完整的 i18n 支持
- **侧边栏导航**：Provider / MCP / Skills / Prompts 模块快速切换
- **操作反馈**：所有关键操作提供 Toast 通知

---

## 🗄️ 后端架构（Supabase）

- **数据库**：使用 Supabase PostgreSQL 存储所有用户配置数据
  - `profiles` - 用户档案
  - `providers` - Provider 配置
  - `mcp_servers` - MCP 服务器配置
  - `skills_repos` / `skills` - 技能仓库和技能
  - `prompts` - 提示词预设
- **认证**：Supabase Auth 邮箱密码登录
- **安全**：所有表启用 RLS，确保用户只能访问自己的数据
- **用户角色**：独立 `user_roles` 表管理角色权限

---

## 📋 实施优先级

1. **第一阶段**：用户系统 + Provider 管理 + 导出功能
2. **第二阶段**：MCP Server 管理 + Prompts 管理
3. **第三阶段**：Skills 管理 + 导入功能 + Deep Link
4. **第四阶段**：i18n 多语言 + 深色模式 + 体验优化

