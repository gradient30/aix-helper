
## 修复构建错误计划

你在本地优化代码后引入了一些 TypeScript 类型错误，导致 GitHub Pages 部署时构建失败。以下是所有错误及修复方案：

---

### 错误总览

共 **5 类错误**，涉及 **6 个文件**：

| 错误位置 | 问题描述 |
|---------|---------|
| `supabase/functions/test-connection/index.ts` (5处) | `catch(err)` 中 `err` 类型为 `unknown`，直接访问 `.message` / `.name` 报错 |
| `src/components/PromptOptimizer.tsx` (1处) | `setSaveTarget` 类型不匹配，`Select` 的 `onValueChange` 传入的是 `string`，但 state 限定为字面量联合类型 |
| `src/lib/export-utils.ts` (2处) | 类型谓词不能引用解构参数；`fromEntries` 返回类型与 `Record<string, string>` 不兼容 |
| `src/pages/McpServers.tsx` (2处) | `testConnection` 的 `catch` 分支返回值缺少 `latency_ms`，导致 `.then()` 中访问该属性报错 |
| `src/pages/Providers.tsx` (2处) | 同上 |
| `src/test/*.test.tsx` (3处) | `@testing-library/react` 未安装或版本不对，缺少 `fireEvent` / `screen` 导出 |

---

### 修复方案

#### 1. `supabase/functions/test-connection/index.ts`
将 3 个 `catch (err)` 改为 `catch (err: unknown)`，并在使用前做类型断言：

```typescript
catch (err: unknown) {
  const e = err instanceof Error ? err : new Error(String(err));
  // 然后用 e.message、e.name
}
```

#### 2. `src/components/PromptOptimizer.tsx` 第479行
`onValueChange={setSaveTarget}` 类型不兼容。改为显式类型转换：

```typescript
onValueChange={(v) => setSaveTarget(v as SaveTarget)}
```

#### 3. `src/lib/export-utils.ts` 第76-79行
类型谓词 `v is string` 不能用于解构参数 `[, v]`。改为 `filter` + 普通函数：

```typescript
const pairs = Object.entries(value).filter(
  (entry): entry is [string, string] => typeof entry[1] === "string",
);
return Object.fromEntries(pairs) as Record<string, string>;
```

#### 4. `src/pages/McpServers.tsx` 和 `src/pages/Providers.tsx`
`testConnection` 的 `catch` 分支返回 `{ success, message }` 缺少 `latency_ms`。两种修复方式任选：
- **方案 A**（推荐）：在 `.then()` 中用可选链 `result?.latency_ms`（实际代码已用可选链，问题在于 TS 推断）
- **方案 B**：给 `testConnection` 函数显式标注返回类型 `Promise<ConnectionTestResult>`，同时在 catch 中补上 `latency_ms: undefined`

采用方案 B，在 catch 块中补充：
```typescript
const result: ConnectionTestResult = { success: false, message: getErrorMessage(error) };
```

#### 5. 测试文件（`ai-tech-render.test.tsx`、`cli-guide-render.test.tsx`、`skills-guide-policy.test.tsx`）
`@testing-library/react` 未安装。需要安装依赖：
```
npm install -D @testing-library/react @testing-library/jest-dom
```

---

### 技术细节

所有修改均为类型层面的修复，不改变任何运行时逻辑。修复后本地运行 `npm run build` 应无错误，推送后 GitHub Pages 部署将恢复正常。
