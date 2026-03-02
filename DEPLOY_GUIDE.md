# AI Helper 部署指南（自有 Supabase 版）

> 适用于当前仓库的双工作流部署结构：GitHub Actions 构建，发布到 GitHub Pages 与 Cloudflare Pages。  
> 推荐正式入口：`https://helper.996fb.cn`（Cloudflare）。

## 1. 前置条件

1. 你已拥有当前 GitHub 仓库管理权限。
2. 你已创建自己的 Supabase 项目。
3. 你已准备以下变量：

| 变量名 | 示例 |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://<your-project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `<your-anon-key>` |
| `VITE_AUTH_REDIRECT_URL` | `https://helper.996fb.cn/auth?mode=reset` |
| `VITE_AUTH_REDIRECT_ORIGIN` | `https://helper.996fb.cn` |

说明：

1. `VITE_SUPABASE_PUBLISHABLE_KEY` 是 anon key，可出现在前端。
2. 若构建阶段缺少 `VITE_SUPABASE_*`，页面会无法正常连接后端。

## 2. 10 分钟检查清单

1. Supabase `Site URL` 是否设置为 `https://helper.996fb.cn`。
2. Supabase Redirect URLs 是否包含 `/auth` 与 `/auth?mode=reset`。
3. GitHub Secrets 是否更新为新 Supabase 项目值。
4. 推送 `main` 后 `Quality Gate` 是否成功。
5. Cloudflare 部署是否显示为 `main` 生产分支而非 `HEAD` 预览。
6. `https://helper.996fb.cn/auth` 是否可打开且无 `supabaseUrl is required`。

## 3. GitHub Secrets 配置（必须）

路径：`Repo Settings -> Secrets and variables -> Actions`

新增或更新：

1. `VITE_SUPABASE_URL`
2. `VITE_SUPABASE_PUBLISHABLE_KEY`
3. `VITE_AUTH_REDIRECT_URL`
4. `VITE_AUTH_REDIRECT_ORIGIN`
5. `CLOUDFLARE_API_TOKEN`（Cloudflare 发布必需）
6. `CLOUDFLARE_ACCOUNT_ID`（Cloudflare 发布必需）

## 4. 工作流触发说明

## 4.1 质量门禁

文件：`.github/workflows/quality-gate.yml`

1. `push main/master` 会触发。
2. 后续部署工作流监听其成功状态。

## 4.2 GitHub Pages 部署

文件：`.github/workflows/deploy-pages.yml`

1. 仅在 `Quality Gate` 成功后触发。
2. 使用 `VITE_BASE_URL=/aix-helper/` 构建。
3. 定位为备用/预览入口，不建议作为正式主入口。

## 4.3 Cloudflare Pages 部署

文件：`.github/workflows/deploy-cloudflare.yml`

1. 仅在 `Quality Gate` 成功后触发。
2. 使用 `VITE_BASE_URL=/` 构建。
3. 已显式传入 `--branch` 与 `--commit-hash`，避免被识别为 `HEAD` 预览。

## 5. Supabase Auth URL 配置（必须）

控制台路径：`Authentication -> URL Configuration`

1. `Site URL`：`https://helper.996fb.cn`
2. `Additional Redirect URLs`：
   1. `https://helper.996fb.cn/auth`
   2. `https://helper.996fb.cn/auth?mode=reset`
   3. `https://aix-helper.pages.dev/auth`
   4. `https://aix-helper.pages.dev/auth?mode=reset`
   5. 可选：`https://<github_username>.github.io/aix-helper/auth`
   6. 可选：`https://<github_username>.github.io/aix-helper/auth?mode=reset`

## 6. SMTP（忘记密码）建议

优先级建议：

1. 先使用 Supabase 默认邮件通道验证流程。
2. 再切换到 SMTP（推荐 Resend）做稳定发件：
   1. Host `smtp.resend.com`
   2. Port `465`
   3. Username `resend`
   4. Password `<Resend API Key>`

## 7. 部署后验收

1. `https://helper.996fb.cn/auth` 打开正常。
2. 注册、登录、退出正常。
3. 忘记密码邮件可收，链接回跳 `/auth?mode=reset`。
4. 控制台无 `supabaseUrl is required`。
5. 刷新业务路由不出现循环 404。
6. `aix-helper.pages.dev` 可访问（备用入口）。

## 8. 故障对照表（报错 -> 检查项）

| 现象/报错 | 主要原因 | 处理动作 |
| --- | --- | --- |
| 页面白屏 + `supabaseUrl is required` | 构建时 `VITE_SUPABASE_*` 未注入 | 更新 GitHub Secrets，重新触发部署 |
| 找回密码跳到 `*.lovable.app` | Supabase Auth URL 仍是旧站点 | 更新 `Site URL` / Redirect 并重发邮件 |
| Cloudflare 显示预览 `HEAD` | 部署命令未显式分支 | 保留 `--branch` 参数后重新部署 |
| `Invalid Refresh Token: Refresh Token Not Found` | 浏览器残留旧 Supabase 会话 | 清理站点存储后重新登录 |
| `AI_GATEWAY_API_KEY not configured` | 函数 secrets 缺失 | 设置 secrets 后重新 deploy functions |
| 登录后无业务数据 | URL 或 anon key 仍指向旧库 | 校验 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY` |

## 9. 常用命令

```bash
# 本地开发
npm install
npm run dev

# 本地构建验证
npm run build

# 质量门禁
npm run ci:gate
```

## 10. 说明

1. 本仓库已按“自有 Supabase”口径维护，不再建议使用历史 Lovable 托管后端配置。
2. 若仅保留 Cloudflare 正式发布，可将 GitHub Pages 视为备用通道，而不是主流量入口。
