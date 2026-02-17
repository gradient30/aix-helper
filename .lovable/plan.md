
# 添加「AI 前沿技术概览」图文页面

## 概述

新建一个独立的「AI 前沿技术概览」页面（`/ai-glossary`），以结构化、图文并茂的方式介绍 Agent、Sub-Agent、Agent Team、MCP Servers、Skills、ACP、LSP、RAG、Workflow、Prompt Engineering 等 10 大 AI 前沿技术概念。页面采用与现有指南页面一致的 Tab 分组 + 手风琴展开 + 搜索过滤交互模式。

## 页面结构设计

```text
+----------------------------------------------------------+
| AI 前沿技术概览                                            |
| 大模型相关核心概念与前沿技术全面解析                         |
+----------------------------------------------------------+
| [Agent 体系]  [协议与服务]  [技术方法]                      |
+----------------------------------------------------------+
| 搜索技术概念...          [全部展开] [全部折叠]              |
| 显示 X / 共 Y 条                                          |
+----------------------------------------------------------+
| > Agent（智能代理）                                        |
|   定义与介绍 | 作用/功能 | 应用场景 | 相互关系              |
| > Sub-Agent（子代理）                                      |
|   ...                                                     |
| > Agent Team（代理团队）                                   |
|   ...                                                     |
+----------------------------------------------------------+
```

### 三个 Tab 分组

| Tab | 包含概念 |
|-----|---------|
| Agent 体系 | Agent、Sub-Agent、Agent Team、Skills |
| 协议与服务 | MCP Servers、ACP、LSP |
| 技术方法 | RAG、Workflow、Prompt Engineering |

### 每个概念的条目结构

每个概念展开后包含 4 个子节：
- **定义与介绍** - 核心概念、原理（badge: "concept"）
- **作用/功能** - 解决什么问题、提供什么能力（badge: "function"）
- **应用场景** - 实际案例和潜在用途（badge: "scenario"）
- **相互关系** - 与其他概念的关联、协同、依赖（badge: "relation"）

## 内容大纲

### 1. Agent（智能代理）
- 定义：基于 LLM 的自主决策实体，具备感知、推理、行动能力
- 作用：自主完成复杂任务，替代人工多步操作
- 场景：代码开发助手、客服自动化、数据分析
- 关系：是 Sub-Agent 和 Agent Team 的基础单元；使用 Skills 扩展能力；通过 MCP/ACP 协议通信

### 2. Sub-Agent（子代理）
- 定义：由主 Agent 派生的专注型代理，执行特定子任务
- 作用：任务分解与并行处理，降低单 Agent 复杂度
- 场景：Claude Code 的 `context: fork`、多文件并行编辑
- 关系：由 Agent 创建和调度；可组成 Agent Team；通过 Workflow 编排

### 3. Agent Team（代理团队）
- 定义：多个 Agent 协作的团队架构
- 作用：复杂任务的分工协作、角色专业化
- 场景：软件开发团队（架构师+开发者+测试）、研究团队
- 关系：由多个 Agent/Sub-Agent 组成；通过 ACP 协调；使用 Workflow 定义协作流程

### 4. Skills（智能代理技能）
- 定义：可复用的能力包，扩展 Agent 的专业领域知识
- 作用：渐进式披露能力、模块化复用
- 场景：Claude Code Skills、Codex Skills、Gemini Skills
- 关系：被 Agent 加载和调用；可通过 MCP Server 提供外部能力

### 5. MCP Servers（模型上下文协议服务器）
- 定义：Model Context Protocol 的服务端实现
- 作用：为 Agent 提供标准化的外部工具调用接口
- 场景：文件系统、数据库查询、浏览器自动化、API 集成
- 关系：被 Agent 通过 MCP 协议调用；与 ACP 互补；可作为 Skills 的底层能力提供者

### 6. ACP（Agent 通信协议）
- 定义：Agent Communication Protocol，Agent 间标准化通信协议
- 作用：实现多 Agent 发现、协商和协作
- 场景：跨平台 Agent 互操作、Agent 市场
- 关系：协调 Agent Team 通信；与 MCP 互补（MCP 管工具，ACP 管 Agent 间通信）

### 7. LSP（语言服务协议）
- 定义：Language Server Protocol 在 AI 场景的扩展应用
- 作用：为 Agent 提供代码理解能力（补全、跳转、诊断）
- 场景：AI 编码助手的代码分析、智能重构
- 关系：增强 Agent 的代码理解能力；被 Skills 利用

### 8. RAG（检索增强生成）
- 定义：Retrieval-Augmented Generation，检索外部知识增强 LLM 输出
- 作用：解决 LLM 知识截止和幻觉问题
- 场景：企业知识库问答、文档检索、实时信息查询
- 关系：可作为 MCP Server 提供检索服务；增强 Agent 的知识获取能力

### 9. Workflow（工作流）
- 定义：预定义的任务执行流程编排
- 作用：将复杂任务拆解为可控的步骤序列
- 场景：CI/CD 自动化、多步数据处理、审批流程
- 关系：编排 Agent/Sub-Agent 的执行顺序；可内嵌 Prompt 模板

### 10. Prompt Engineering（提示词工程）
- 定义：设计和优化 LLM 输入提示的方法论
- 作用：引导 LLM 产生高质量、可控的输出
- 场景：CLAUDE.md 系统提示、Few-shot 示例、思维链
- 关系：是 Skills 内容的编写基础；Workflow 中嵌入 Prompt 模板；Agent 的行为由 Prompt 驱动

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/pages/AiGlossary.tsx` | 新建 | AI 前沿技术概览页面（含全部数据定义 + 搜索 + 分组） |
| `src/App.tsx` | 修改 | 添加 `/ai-glossary` 路由 |
| `src/components/AppSidebar.tsx` | 修改 | 添加「AI 技术」导航项（使用 `Brain` 图标） |
| `src/i18n/locales/zh.ts` | 修改 | 添加 `nav.aiGlossary` 及页面相关中文翻译 |
| `src/i18n/locales/en.ts` | 修改 | 添加对应英文翻译 |

### 无新增依赖

全部使用已有组件（Tabs、Badge、Input、Button、Card、Collapsible）。

## 技术实现

### 数据结构

```typescript
interface GlossarySection {
  title: string;           // 子节标题（定义与介绍 / 作用 / 场景 / 关系）
  content: string;         // 详细内容
  badge?: "concept" | "function" | "scenario" | "relation";
}

interface GlossaryConcept {
  id: string;              // 唯一标识
  title: string;           // 概念名称
  subtitle: string;        // 中文副标题
  icon: LucideIcon;
  sections: GlossarySection[];
}

interface GlossaryTab {
  id: string;
  name: string;
  concepts: GlossaryConcept[];
}
```

### Badge 类型

| Badge | 含义 | 样式 |
|-------|------|------|
| concept | 定义与介绍 | 蓝色调 |
| function | 作用/功能 | 绿色调 |
| scenario | 应用场景 | 橙色调 |
| relation | 相互关系 | 紫色调 |

### 视觉设计

- 与现有 `/cli-guide`、`/skills-guide`、`/setup-guide` 页面风格完全一致
- 每个概念使用 Collapsible 展开/折叠
- 概念内部四个子节使用卡片式布局，带 Badge 和图标
- 关系说明中引用其他概念时使用高亮标注
- 搜索实时过滤标题和内容
- 支持暗色主题
