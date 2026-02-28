# 版本号规则

## 目标

1. 左上角固定展示可追踪版本号。
2. 每次 commit 都能看到版本变化（至少构建后变化）。
3. 保留语义化版本（SemVer）用于功能级迭代管理。

## 格式

展示格式：

`v<MAJOR>.<MINOR>.<PATCH>+<BUILD>`

示例：

`v0.0.0+7fed3ee`

- `MAJOR.MINOR.PATCH`：语义化版本主干（来自 `package.json` 的 `version`）。
- `BUILD`：当前 commit 的短 SHA（7 位），每次 commit 变化。

## 递增规则

### 1) 每次 commit 的自动变化（始终生效）

- `BUILD` 使用当前 commit short SHA。
- 因此每次 commit 后，显示版本都会变化，无需手工修改代码。

### 2) 语义化版本的人工升级（发布前执行）

- `MAJOR`：不兼容变更（Breaking Change）。
- `MINOR`：新增功能且向后兼容（`feat`）。
- `PATCH`：修复与优化且向后兼容（`fix/refactor/perf/docs/test/chore`）。

建议命令：

```bash
npm version patch --no-git-tag-version
npm version minor --no-git-tag-version
npm version major --no-git-tag-version
```

> 建议在“准备发布”时升级 SemVer 主干，日常 commit 由 `+<shortSha>` 提供细粒度追踪。

## CI/CD 约定

- 构建流程通过 `VITE_COMMIT_SHA`（来自 `github.sha`）注入构建元信息。
- 本地构建若未注入该变量，将回退读取本地 git short SHA。
