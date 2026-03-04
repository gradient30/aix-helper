# invoke-model-api 401 事件复盘（2026-03-04）

## 1. 结论（最终根因）
本次“前端调用 `invoke-model-api` 持续 401 + 后续 CORS 报错”不是单一问题，而是三层问题叠加：

1. 入口鉴权不稳定（`Invalid JWT`）
- 本地链路存在代理/拦截（请求显示 `127.0.0.1:7897`，并出现 `ajaxRequestInterceptor`）。
- 仅依赖 `Authorization` 头时，JWT 可能被代理链路改写或丢失，导致 Supabase 网关或函数鉴权失败。

2. 误导性 CORS 报错
- 浏览器报 “preflight 不通过” 的直接原因不是 CORS 配置本身，而是函数启动失败（`503 BOOT_ERROR`）。
- 只看浏览器 CORS 文案会被误导，必须先用 `OPTIONS` 直测函数端点状态。

3. 成功后 UI 不显示
- 调用成功后触发 provider 刷新，旧逻辑在同一 provider 刷新时也会清空 `messages`，导致聊天窗口看起来“没返回”。

## 2. 关键证据

1. 401 阶段证据
- Response：`{"code":401,"message":"Invalid JWT"}`
- 请求链路显示：`Remote Address: 127.0.0.1:7897`

2. CORS 阶段证据
- 预检 `OPTIONS /functions/v1/invoke-model-api` 返回：
  - `HTTP 503`
  - `{"code":"BOOT_ERROR","message":"Function failed to start (please check logs)"}`

3. 修复后证据
- 预检 `OPTIONS` 返回 `HTTP 200`，且有完整 CORS 响应头。
- `POST` 调用返回 `200`，业务响应正常（`success=true`，`normalized.text` 有内容）。

## 3. 最终修复方案（已落地）

### 3.1 前端（ApiCalls）
文件：`src/pages/ApiCalls.tsx`

1. 函数调用从 SDK 黑盒调用改为可控 `fetch`。
2. 请求同时携带：
- Header：`Authorization: Bearer <access_token>`
- Body：`access_token`
3. 401 时先 `refreshSession` 重试；再次 401 则强制退出并回登录。
4. 修复聊天窗口清空逻辑：仅在“真正切换会话作用域（vendor/provider）”时清空。

### 3.2 Edge Function
文件：`supabase/functions/invoke-model-api/index.ts`

1. 函数重写为纯 `fetch` 实现，去除 `supabase-js` 运行时依赖，避免启动异常导致 `BOOT_ERROR`。
2. 鉴权从“只读 header”升级为“header/body 双通道取 token”，并在函数内调用 Auth API 校验用户。
3. `OPTIONS` 明确返回 `200` 与完整 CORS 头。
4. 调用白山时支持最小请求体 `model + messages` 正常透传。

### 3.3 函数配置
文件：`supabase/config.toml`

`[functions.invoke-model-api]` 使用：
- `verify_jwt = false`

说明：由函数内部自行验 token，规避网关层在代理链路下对 header JWT 的脆弱性。

## 4. 防再发标准流程（必须按顺序）

1. 先测预检，不先看浏览器文案
```bash
curl -i -X OPTIONS "https://<project>.supabase.co/functions/v1/invoke-model-api" \
  -H "Origin: http://localhost:8080" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: apikey,authorization,content-type"
```

判定：
- `200` 才进入业务排查。
- `503 BOOT_ERROR` 先修函数启动问题，不要先改 CORS。

2. 再测业务调用
- 看 `status code` + response body（不要只看控制台堆栈）。
- 若 401，先核查本地代理/拦截插件是否改写请求。

3. 本地排查环境固定项
- 无痕窗口测试一次（禁插件）。
- 临时关闭本地代理（或加入 Supabase 域名直连）。
- 清理登录态后重登（`sb-<project-ref>-auth-token`）。

## 5. 发布前门禁（新增）
每次改 `invoke-model-api` 必须执行：

1. `supabase functions deploy invoke-model-api --project-ref <project-ref>`
2. 预检 `OPTIONS` 必须 `200`
3. Chat 最小 payload 回归：
```json
{"model":"GLM-5","messages":[{"role":"user","content":"你的模型能力"}]}
```
4. UI 回归：发送成功后聊天窗口必须出现“一问一答”。

## 6. 本次教训

1. “CORS 报错”常是结果，不一定是根因。
2. 函数入口异常必须先用 `OPTIONS` 判活。
3. 代理/拦截环境会放大 JWT 链路脆弱性，生产逻辑要有 token 兜底方案。
4. 请求成功不等于 UI 成功，状态重置逻辑同样要纳入故障闭环。

