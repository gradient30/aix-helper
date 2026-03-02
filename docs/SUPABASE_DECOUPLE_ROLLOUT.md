# Supabase 去 Lovable 剥离手册（高中生模式）

> 这份文档是“照着做就能完成”的版本。  
> 你不需要理解所有概念，只需要按顺序执行。

## 0. 你现在要做什么

你要把项目从“历史 Lovable 后端”切到“你自己的 Supabase 后端”。

你的既定策略：

1. 测试数据可以清空，不做迁移。
2. 正式域名用 `https://helper.996fb.cn`。
3. Cloudflare Pages 是正式入口。
4. GitHub Pages 只当备用/预览入口。

---

## 1. 先看术语（不懂就看这里）

1. `Supabase`：你的云数据库 + 登录系统。
2. `project_ref`：Supabase 项目的唯一短 ID（像 `ewwqhzwwgtmaauuznvyy`）。
3. `VITE_SUPABASE_URL`：前端连接数据库的地址。
4. `VITE_SUPABASE_PUBLISHABLE_KEY`：前端匿名访问 key（可公开）。
5. `SMTP`：邮件发送服务配置（用于“忘记密码”邮件）。
6. `Edge Function`：运行在 Supabase 云端的函数（本项目用于 Prompt 优化）。
7. `GitHub Secrets`：GitHub Actions 的环境变量密钥仓库。

---

## 2. 你需要准备的东西（开始前 2 分钟）

## 必备

1. Supabase 账号（已登录控制台）。
2. GitHub 仓库管理员权限（能改 Secrets）。
3. 本地命令行可用 `supabase`（你已安装成功）。

## 稍后会用到

1. 新 Supabase 的 `Project URL`。
2. 新 Supabase 的 `anon public key`。
3. 你的 OpenAI API Key（仅当你要启用 Prompt 优化时）。
4. 可收邮件的测试邮箱（用于找回密码测试）。

---

## 3. 一眼看懂流程图

1. 创建/绑定新 Supabase 项目。
2. 把数据库表结构推送到新项目。
3. 配置 Auth 回跳地址（登录/找回密码）。
4. 配置邮件发送（默认先通，再升级 SMTP）。
5. 更新 GitHub Secrets（前端连接新 Supabase）。
6. 推送 `main` 触发部署。
7. 验收登录、找回密码、业务页面。
8. 可选：配置并部署 Edge Functions（Prompt 优化）。

---

## 4. Step 1：绑定你的 Supabase 项目

你这一步已经做过成功了，这里保留标准步骤，方便以后复盘。

## 4.1 修改项目配置

打开 `supabase/config.toml`，确认：

```toml
project_id = "你的 project_ref"
```

例子：

```toml
project_id = "ewwqhzwwgtmaauuznvyy"
```

## 4.2 绑定项目

在仓库根目录执行：

```bash
supabase link --project-ref 你的project_ref
```

成功标志：

1. 出现 `Finished supabase link.`

## 4.3 推送数据库结构

继续执行：

```bash
supabase db push
```

看到 `[Y/n]` 输入 `Y` 回车。

成功标志：

1. 输出 `Applying migration ...`
2. 最后输出 `Finished supabase db push.`

---

## 5. Step 2：配置登录与找回密码回跳地址（非常重要）

如果这一步不做，找回密码可能跳到旧域名或失败。

## 5.1 打开 Supabase 配置页面

1. 进入 Supabase 控制台。
2. 选择你的项目。
3. 左侧点 `Authentication`。
4. 点 `URL Configuration`。

## 5.2 填写 Site URL

把 `Site URL` 设置为：

```text
https://helper.996fb.cn
```

## 5.3 填写 Additional Redirect URLs

至少加这 4 个：

1. `https://helper.996fb.cn/auth`
2. `https://helper.996fb.cn/auth?mode=reset`
3. `https://aix-helper.pages.dev/auth`
4. `https://aix-helper.pages.dev/auth?mode=reset`

如果你要保留 GitHub Pages 的登录预览，再额外加：

1. `https://<github_username>.github.io/aix-helper/auth`
2. `https://<github_username>.github.io/aix-helper/auth?mode=reset`

## 5.4 保存并检查

1. 点保存。
2. 重新发一次找回密码邮件（旧邮件链接不会自动更新）。

---

## 6. Step 3：配置邮件发送（忘记密码）

目标：让用户点击“忘记密码”后，稳定收到重置邮件。

## 6.1 最简单做法：先不配 SMTP

1. 保持 Supabase 默认邮件通道。
2. 先测一次找回密码流程。
3. 如果能收邮件并重置成功，说明流程已打通。

## 6.2 进阶做法：改成 SMTP（推荐 Resend）

适合长期稳定使用。

### A. 先在 Resend 准备

1. 注册并登录 Resend。
2. 创建 API Key。
3. 记下这个 Key（后面填到 Password）。

### B. 回到 Supabase 填 SMTP

路径：`Authentication -> Email -> SMTP Settings`

按下面填写：

1. Host：`smtp.resend.com`
2. Port：`465`
3. Username：`resend`
4. Password：`你的 Resend API Key`
5. Sender email：例如 `noreply@你的域名`
6. Sender name：例如 `AI Helper`

保存后，立刻再测一次“忘记密码”。

## 6.3 成功标准

1. 邮件能收到。
2. 邮件链接跳到你的域名，不是 `*.lovable.app`。
3. 新密码能设置成功并登录。

---

## 7. Step 4：更新 GitHub Secrets（前端连接新 Supabase）

如果这一步不做，线上会报 `supabaseUrl is required` 或连接到旧库。

## 7.1 打开仓库设置

GitHub 仓库 -> `Settings` -> `Secrets and variables` -> `Actions`

## 7.2 新增或修改 4 个关键变量

1. `VITE_SUPABASE_URL` = 你的新 Supabase URL  （集成-Data API-API URL）
   例：`https://ewwqhzwwgtmaauuznvyy.supabase.co`
2. `VITE_SUPABASE_PUBLISHABLE_KEY` = 新项目 anon key（Publishable key）
3. `VITE_AUTH_REDIRECT_URL` = `https://helper.996fb.cn/auth?mode=reset`
4. `VITE_AUTH_REDIRECT_ORIGIN` = `https://helper.996fb.cn`

## 7.3 这些值去哪里拿

在 Supabase 控制台：

1. `Project URL` -> 对应 `VITE_SUPABASE_URL`
2. `API Keys` 里的 `anon` -> 对应 `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## 8. Step 5：触发部署

1. 本地随便改一个文件（比如文档加一行）。
2. 提交并推送到 `main`。
3. GitHub Actions 会按顺序执行：
   1. `Quality Gate`
   2. `Deploy to Cloudflare Pages`
   3. `Deploy to GitHub Pages`（备用）

---

## 9. Step 6：E2E 验收（照着点就行）

按这个顺序测试：

1. 打开 `https://helper.996fb.cn/auth`。
2. 打开浏览器控制台，确认没有 `supabaseUrl is required`。
3. 用新邮箱注册一个账号。
4. 退出后再登录，确认登录正常。
5. 进入 `providers/mcp/skills/prompts` 页面，确认都能打开。
6. 点击“忘记密码”，收邮件，点链接进入重置页。
7. 设置新密码并登录成功。
8. 访问 `https://aix-helper.pages.dev`，确认备用入口也能打开。

---

## 10. Step 7（可选）：部署 Edge Functions（仅 Prompt 优化需要）

如果你暂时不用 Prompt 优化，这一步可以先跳过。

## 10.1 变量含义（简单版）

1. `AI_GATEWAY_API_KEY`：你的 AI 平台密钥（最关键）。
2. `AI_GATEWAY_API_URL`：AI 接口地址。
3. `AI_MODEL`：模型名。
4. `ALLOWED_ORIGINS`：允许哪些域名调用函数。

## 10.2 直接复制执行（在仓库根目录）

```bash
supabase secrets set AI_GATEWAY_API_KEY=你的真实key
supabase secrets set AI_GATEWAY_API_URL=https://api.openai.com/v1/chat/completions
supabase secrets set AI_MODEL=gpt-4o-mini
supabase secrets set ALLOWED_ORIGINS=https://helper.996fb.cn,https://aix-helper.pages.dev
supabase functions deploy optimize-prompt
supabase functions deploy test-connection
```

## 10.3 成功标准

1. 命令执行无报错。
2. 页面用 Prompt 优化时，不再出现 `AI_GATEWAY_API_KEY not configured`。

---

## 11. 常见报错速查（报错 -> 原因 -> 解决）

| 报错/现象 | 常见原因 | 解决动作 |
| --- | --- | --- |
| `supabaseUrl is required` | GitHub Secrets 没填或填错 | 重填 `VITE_SUPABASE_URL`、`VITE_SUPABASE_PUBLISHABLE_KEY`，重新部署 |
| 找回密码跳到 `*.lovable.app` | Supabase URL Configuration 仍是旧值 | 改 `Site URL`/Redirect URLs 后重发邮件 |
| `Invalid Refresh Token` | 浏览器里还留着旧会话 | 清空该站点 `localStorage/sessionStorage` 后重登 |
| `AI_GATEWAY_API_KEY not configured` | Edge Function secrets 没设置 | 执行 `supabase secrets set ...` 再 `functions deploy` |
| Cloudflare 显示 `HEAD` 预览 | 工作流未显式分支 | 保持 `deploy-cloudflare.yml` 的 `--branch` 参数 |

---

## 12. 回滚方案（出问题就用）

1. 不回滚代码，只回滚 GitHub Secrets 到上一组可用值。
2. 若 Prompt 优化异常，先关闭该功能入口，保证登录和基础数据可用。
3. 先恢复认证流程，再排查 AI 网关配置。

---

## 13. 你当前进度记录（本次执行）

你已完成：

1. `supabase link --project-ref ewwqhzwwgtmaauuznvyy`
2. `supabase db push`（2 条 migration 已成功）

你接下来只需要做：

1. Step 2（Supabase Auth URL 配置）
2. Step 3（邮件发送测试/SMTP）
3. Step 4（GitHub Secrets 重置）
4. Step 5 + Step 6（部署与验收）
