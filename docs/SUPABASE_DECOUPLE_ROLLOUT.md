# Supabase 去 Lovable 耦合落地手册

## 1. 目标

将项目从历史 Lovable 托管依赖中剥离，确保：

1. 前端不再隐式回退到旧 Supabase 项目。
2. Edge Function 不再依赖 `ai.gateway.lovable.dev`。
3. Supabase CLI 配置不再绑定旧 `project_id`。
4. 现有部署链路（GitHub Pages + Cloudflare Pages）保持不变，仅更新配置。

## 2. 已完成代码改造

1. 去除 `vite` 内旧 Supabase fallback（避免误连旧库）  
文件：`vite.config.ts`
2. `optimize-prompt` 改为通用 AI 网关配置，不再写死 Lovable AI Gateway  
文件：`supabase/functions/optimize-prompt/index.ts`
3. `supabase/config.toml` 替换旧项目 ref 为占位值  
文件：`supabase/config.toml`

## 3. 新增/变更的环境变量

### 前端构建（GitHub Actions / 本地构建）

1. `VITE_SUPABASE_URL`（必填）
2. `VITE_SUPABASE_PUBLISHABLE_KEY`（必填）
3. `VITE_SUPABASE_PROJECT_ID`（可选，不填会从 URL 推断）
4. `VITE_AUTH_REDIRECT_URL`（可选）
5. `VITE_AUTH_REDIRECT_ORIGIN`（可选）

说明：

1. 当前仓库工作流 `deploy-pages.yml` / `deploy-cloudflare.yml` 仅显式注入了 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY`。
2. `VITE_SUPABASE_PROJECT_ID` 不注入也可工作（`vite.config.ts` 会从 `VITE_SUPABASE_URL` 推断）。
3. 若你希望显式注入 `VITE_SUPABASE_PROJECT_ID`，需同步修改两条 workflow 的 `Build -> env`。

### Supabase Edge Function: `optimize-prompt`

1. `AI_GATEWAY_API_KEY`（必填）
2. `AI_GATEWAY_API_URL`（可选，默认 `https://api.openai.com/v1/chat/completions`）
3. `AI_MODEL`（可选，默认 `gpt-4o-mini`）
4. `ALLOWED_ORIGINS`（建议配置）

协议要求：

1. `AI_GATEWAY_API_URL` 需兼容 OpenAI Chat Completions 协议。
2. 响应需包含 `choices[0].message.content`，否则前端将拿不到优化结果。

## 4. 一次性落地步骤（建议顺序）

### Step 1: 绑定新 Supabase 项目

1. 在 Supabase 控制台创建新项目。
2. 将 `supabase/config.toml` 中 `project_id` 替换为你的新项目 ref。
3. 本地执行：

```bash
supabase link --project-ref <your_project_ref>
supabase db push
```

### Step 2: 配置 Supabase Auth

控制台路径：`Authentication -> URL Configuration`

1. `Site URL` 设为主域名（建议 `https://helper.996fb.cn`）。
2. `Additional Redirect URLs` 至少加：
   1. `https://helper.996fb.cn/auth`
   2. `https://helper.996fb.cn/auth?mode=reset`
   3. `https://aix-helper.pages.dev/auth`
   4. `https://aix-helper.pages.dev/auth?mode=reset`
   5. 你的 GitHub Pages 地址对应 `/aix-helper/auth` 与 `?mode=reset`（如启用）

### Step 3: 配置找回密码发件

控制台路径：`Authentication -> Email -> SMTP Settings`

推荐：Resend SMTP

1. Host: `smtp.resend.com`
2. Port: `465`
3. Username: `resend`
4. Password: `你的 Resend API Key`
5. Sender email/name: 你的发件地址与名称

### Step 4: 部署 Supabase Functions

```bash
supabase secrets set AI_GATEWAY_API_KEY=xxx
supabase secrets set AI_GATEWAY_API_URL=https://api.openai.com/v1/chat/completions
supabase secrets set AI_MODEL=gpt-4o-mini
supabase secrets set ALLOWED_ORIGINS=https://helper.996fb.cn,https://aix-helper.pages.dev
supabase functions deploy optimize-prompt
supabase functions deploy test-connection
```

说明：

1. 先 `secrets set` 再 `deploy`，避免函数上线即报 `AI_GATEWAY_API_KEY not configured`。
2. 若函数已部署，更新 secrets 后建议再次 deploy 一次确保配置生效。

### Step 5: 更新 GitHub Secrets（不改部署架构）

仓库路径：`Settings -> Secrets and variables -> Actions`

1. `VITE_SUPABASE_URL` = 新 Supabase URL
2. `VITE_SUPABASE_PUBLISHABLE_KEY` = 新 anon key
3. `VITE_SUPABASE_PROJECT_ID` = 新 project ref（可选）
4. `VITE_AUTH_REDIRECT_URL` / `VITE_AUTH_REDIRECT_ORIGIN` 按需要配置

双部署（Cloudflare + GitHub Pages）特别说明：

1. 如果两端都要可用“忘记密码”，不建议把 `VITE_AUTH_REDIRECT_URL` 固定到单一域名。
2. 推荐先留空 `VITE_AUTH_REDIRECT_URL` 与 `VITE_AUTH_REDIRECT_ORIGIN`，让前端按当前访问域名动态回跳。
3. 若必须固定域名，请确认用户只在该域名入口使用找回密码。

推送后会继续由现有两条工作流自动部署：

1. GitHub Pages workflow
2. Cloudflare Pages workflow

## 5. 数据迁移建议（如果你还能登录旧账号）

1. 切到旧后端，导出 `Data Backup`（含 `skills_repos.json`、`skills.json`）。
2. 切到新后端后导入顺序：
   1. `skills_repos.json`
   2. `skills.json`
   3. `providers.json`
   4. `mcp_servers.json`
   5. `prompts.json`
3. 账号体系（Auth users）不做跨库密码迁移，用户需新库注册/找回。

## 6. 验收清单

1. `/auth` 登录正常，无 `supabaseUrl is required`。
2. 忘记密码邮件链接回跳到你自己的域名，不再出现 `*.lovable.app`。
3. Prompt 优化功能正常，`optimize-prompt` 不再依赖 `LOVABLE_API_KEY`。
4. Cloudflare Pages 与 GitHub Pages 均可正常构建和访问。
5. 刷新路由不出现 404 循环。
6. 打开 Prompt 优化页执行一次请求，确认函数无 `AI_GATEWAY_API_KEY not configured`。
7. 构建日志不再出现旧 Supabase 项目 ref（`cllruxedtdvkljmggnxd`）。

## 7. 非阻断残留项（建议后续清理）

以下内容不影响 Supabase 切换与部署可用性，但仍带有 Lovable 字样：

1. `vite.config.ts` 仍使用开发插件 `lovable-tagger`（仅开发态插件，不影响生产后端绑定）。
2. `index.html` 的 meta/OG/Twitter 字段仍包含 `Lovable` 品牌与历史预览图。
3. `DEPLOY_GUIDE.md` 仍有历史“连接 Lovable Cloud 后端”描述，建议后续统一改写为“自有 Supabase 后端”。

## 8. 常见报错快速定位

1. 报错：`supabaseUrl is required`
   1. 检查 GitHub Secrets 是否存在且正确：`VITE_SUPABASE_URL`、`VITE_SUPABASE_PUBLISHABLE_KEY`
   2. 检查 Actions Build 阶段是否读取到对应 env
2. 报错：`Invalid Refresh Token: Refresh Token Not Found`
   1. 多见于切换 Supabase 项目后浏览器仍保留旧会话
   2. 清理站点 localStorage/sessionStorage 后重新登录
3. 报错：`AI_GATEWAY_API_KEY not configured`
   1. 检查 Supabase secrets 是否设置在当前 project ref
   2. 重新 deploy `optimize-prompt`
4. 报错：AI 返回成功但页面无内容
   1. 检查网关响应是否包含 `choices[0].message.content`
   2. 检查 `AI_MODEL` 是否为该网关可用模型

## 9. 回滚策略（最小影响）

如果新网关或新 Supabase 配置异常：

1. 保留代码不回退，只回滚 Secrets 到上一版可用值。
2. 临时禁用 `optimize-prompt` 入口（前端按钮置灰）避免影响核心登录功能。
3. 保证 `Auth` 与主数据读写优先恢复，再处理 AI 网关配置。
