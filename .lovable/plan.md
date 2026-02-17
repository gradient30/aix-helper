
# Prompts 提示词优化功能实现计划

## 背景

参考开源项目 `linshenkx/prompt-optimizer`（21k+ Stars）的核心逻辑，为现有 Prompts 模块添加 **AI 提示词优化** 能力。该项目的核心功能包括：

1. **双模式优化**：系统提示词优化 + 用户提示词优化
2. **优化模板**：使用预定义模板指导 LLM 如何优化提示词
3. **迭代改进**：对已优化的提示词进行多轮定向迭代
4. **对比测试**：原始 vs 优化后提示词的效果对比
5. **优化历史**：记录每次优化的版本

## 实现范围

基于当前项目架构（React + Lovable Cloud），提取 prompt-optimizer 的核心优化逻辑，适配为 Edge Function + 前端 UI 方案。

---

## 一、后端 - Edge Function

### 1.1 新建 `optimize-prompt` Edge Function

核心职责：接收原始提示词 + 优化模板，调用 Lovable AI 模型返回优化结果。

```text
POST /optimize-prompt
Body: {
  action: "optimize" | "iterate" | "evaluate",
  prompt: string,           // 原始/当前提示词
  optimizedPrompt?: string, // 迭代时传入已优化版本
  template: string,         // 优化模板 ID
  mode: "system" | "user",  // 系统提示词 or 用户提示词
  feedback?: string         // 迭代时的用户反馈
}

Response: {
  result: string,           // 优化后的提示词
  analysis?: string         // 分析说明（评估模式）
}
```

**优化模板**（内置于 Edge Function，参考 prompt-optimizer 的 default-templates）：

- **optimize/general**: 通用系统提示词优化 - 结构化、明确化、添加约束
- **optimize/academic**: 学术/严谨风格优化
- **optimize/creative**: 创意/开放风格优化
- **user-optimize/general**: 用户提示词优化 - 意图澄清、细节补充
- **iterate/refine**: 定向迭代 - 基于反馈改进已有提示词
- **evaluate/analyze**: 评估分析 - 评分 + 改进建议

模板核心逻辑（参考 prompt-optimizer 的模板处理器）：
- 模板使用 Mustache 风格变量：`{{original_prompt}}`, `{{optimized_prompt}}`, `{{feedback}}`
- Edge Function 内部拼装 system prompt + user prompt 后调用 LLM

**使用的 AI 模型**：`google/gemini-2.5-flash`（Lovable AI 内置，无需 API Key）

### 1.2 数据库 - 优化历史表

新建 `prompt_optimize_history` 表：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid PK | 主键 |
| user_id | text | 用户 ID |
| prompt_id | text, nullable | 关联的 Prompt ID（可选） |
| original_prompt | text | 原始提示词 |
| optimized_prompt | text | 优化后提示词 |
| template | text | 使用的模板 ID |
| mode | text | system / user |
| action | text | optimize / iterate / evaluate |
| feedback | text, nullable | 用户反馈（迭代时） |
| analysis | text, nullable | 分析结果（评估时） |
| created_at | timestamptz | 创建时间 |

RLS 策略：用户只能读写自己的记录。

---

## 二、前端 - Prompts 页面增强

### 2.1 页面布局重构

将 Prompts 页面从纯 CRUD 列表升级为 **双 Tab 布局**：

```text
[Prompts 管理]  [提示词优化器]
```

- **Tab 1 - Prompts 管理**：保留现有 CRUD 功能不变
- **Tab 2 - 提示词优化器**：新增优化工作区（参考 prompt-optimizer 截图的布局）

### 2.2 提示词优化器 UI（核心新增）

布局参考 prompt-optimizer 的三栏设计，适配为上下两栏：

```text
+------------------------------------------+
| [系统提示词优化] [用户提示词优化]           |  <- 模式切换
+------------------------------------------+
| 原始提示词                                |
| +--------------------------------------+ |
| | (Textarea - 输入原始提示词)           | |
| +--------------------------------------+ |
| 优化模板: [通用优化 v]  [分析] [优化]     |  <- 模板选择 + 操作按钮
+------------------------------------------+
| 优化工作区                                |
| +--------------------------------------+ |
| | (优化后的提示词 - 可编辑)             | |
| +--------------------------------------+ |
| [复制] [保存为 Prompt] [继续迭代]         |  <- 操作按钮
+------------------------------------------+
| 迭代反馈（可选）                          |
| +--------------------------------------+ |
| | (用户输入改进方向)                    | |
| +--------------------------------------+ |
+------------------------------------------+
| 优化历史                      [清除历史]  |
| v1 原始 -> v2 通用优化 -> v3 迭代        |  <- 版本链
+------------------------------------------+
```

### 2.3 交互流程

参考 prompt-optimizer 的核心工作流：

1. 用户输入原始提示词
2. 选择优化模板（通用/学术/创意）
3. 点击"分析"查看评估报告（评分 + 改进建议）
4. 点击"优化"获得优化后版本
5. 可在优化结果上继续"迭代"（输入反馈方向）
6. 满意后"保存为 Prompt"（自动创建到 Prompts 管理 Tab）
7. 优化历史记录每一步操作

### 2.4 "保存为 Prompt" 功能

优化完成后，用户可以一键将优化结果保存为 Prompts 管理中的新 Prompt：
- 弹出对话框填写名称和目标文件
- 自动填充优化后的内容

---

## 三、文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `supabase/functions/optimize-prompt/index.ts` | 新建 | 优化 Edge Function（含模板定义） |
| `src/pages/Prompts.tsx` | 修改 | 添加双 Tab 布局 + 优化器 UI |
| `src/i18n/locales/zh.ts` | 修改 | 添加优化器相关中文翻译 |
| `src/i18n/locales/en.ts` | 修改 | 添加优化器相关英文翻译 |
| 数据库迁移 | 新建 | `prompt_optimize_history` 表 + RLS |

### 无新增依赖

全部使用已有组件和库。

---

## 四、风险评估与应对

| 风险 | 等级 | 应对措施 |
|------|------|----------|
| LLM 输出不稳定 | 中 | 模板中严格约束输出格式；前端做容错处理 |
| 优化耗时较长 | 低 | 使用 gemini-2.5-flash（快速模型）；UI 显示加载动画 |
| 模板质量影响效果 | 中 | 严格参考 prompt-optimizer 已验证的模板内容 |
| Edge Function 超时 | 低 | 单次优化 token 量可控，flash 模型响应快 |
| 前端页面复杂度增加 | 低 | 通过 Tab 分离管理和优化功能，互不干扰 |

---

## 五、技术细节

### 5.1 优化模板设计（核心，参考 prompt-optimizer 的 default-templates/optimize）

**通用系统提示词优化模板**（system prompt 部分）：
```
你是一位专业的提示词工程专家。你的任务是优化用户提供的系统提示词（System Prompt），使其更加结构化、明确和高效。

优化原则：
1. 明确角色定义：清晰定义 AI 的角色、身份和专业领域
2. 结构化组织：使用清晰的层级结构（标题、列表、分隔符）
3. 约束与边界：明确 AI 应该做什么和不应该做什么
4. 输出格式：指定期望的输出格式和风格
5. 示例驱动：在适当时添加输入/输出示例
6. 保持原意：优化不等于重写，保留原始意图和核心需求
7. 适度原则：避免过度复杂化，保持简洁有效
8. 变量保留：保留原文中的占位符变量（如 {{variable}}）

直接输出优化后的完整提示词，不要添加解释或说明。
```

### 5.2 Edge Function 调用 Lovable AI

```typescript
const response = await fetch(
  `https://cllruxedtdvkljmggnxd.supabase.co/functions/v1/optimize-prompt`,
  { method: "POST", body: JSON.stringify({ ... }) }
);
```

Edge Function 内部通过 `LOVABLE_API_KEY` 调用 Lovable AI 支持的模型。
