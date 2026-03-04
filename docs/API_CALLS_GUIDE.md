# 接口调用页面使用手册

## 1. 功能入口
- 页面路由：`/api-calls`
- 侧边栏菜单：`接口调用`

## 2. 首次使用
1. 在左侧选择模板（默认白山）并点击 `+` 新建配置。
2. 在配置区填写 `API Key`，保存。
3. 在中间 `Chat 模式` 设置 `model/messages` 等字段，点击 `调用接口`。
4. 右侧查看状态码、耗时、标准化结果、原始响应。

## 3. 示例代码导入
- 支持两种示例：
  - Python requests
  - cURL
- 粘贴后点击对应导入按钮，会自动解析：
  - URL（自动拆成 `base_url + path`）
  - headers
  - body/payload
  - model/messages（可直接回填到可视化表单）

## 4. 历史记录
- 每次调用默认写入 `api_call_history`。
- 单条响应快照自动截断到 20KB，避免历史膨胀。
- 历史默认保留 30 天，可用页面按钮清理过期历史。

## 5. 安全说明
- API Key 仅保存到 `api_call_providers`，前端展示为密码输入形式。
- 实际调用走 Supabase Edge Function `invoke-model-api`，避免前端直连厂商接口。
- 调用历史会对常见敏感字段（如 `Authorization`、`api_key`、`token`）做脱敏处理。

## 6. 新增厂商扩展方式
1. 在 `src/config/api-vendors.ts` 新增模板：
   - `vendor_id`
   - `auth_mode`
   - `base_url`
   - `default_request_schema`
   - `defaults`
   - `sample_python / sample_curl`
2. 页面会自动读取模板，可直接创建并编辑。

## 7. 后端部署步骤
1. 执行数据库迁移（新增两张表 + RLS）：
   - `supabase/migrations/20260303121000_add_api_calls_tables.sql`
2. 部署函数：
   - `supabase functions deploy invoke-model-api`
3. 确保 `supabase/config.toml` 中开启：
   - `[functions.invoke-model-api]`
   - `verify_jwt = true`

## 8. 验收清单（研发/产品/用户联合）
1. 白山模板可一键创建并保存。
2. `model` 字段支持自由输入，不受枚举限制。
3. Python requests 示例可导入到可视化表单。
4. cURL 示例可导入到可视化表单。
5. Chat 模式调用成功后展示：状态码、耗时、标准化结果、原始响应。
6. Custom 模式支持 `method/path/headers/body` 调用。
7. 历史可写入、可回填；单条响应快照不超过 20KB。
8. 历史默认保留 30 天，可通过按钮清理过期记录。
9. 未登录请求函数返回 401；越权 provider 返回 403/404。

## 9. 当前版本边界（首版）
1. 仅实现非流式调用（`stream=false`）。
2. 未实现多厂商专用高级适配器 UI（如 Anthropic/Gemini 专有字段面板），但后端与模板机制已可扩展。
3. 暂无完整 E2E 自动化（已覆盖 lint/test/build 与核心工具单测）。

## 10. 白山接口在 PowerShell 的调用说明（重要）
### 10.1 常见误区
1. 在 PowerShell 里直接输入 `curl`，实际会命中 `Invoke-WebRequest` 别名，不是 `curl.exe`。
2. 即便使用 `curl.exe`，若用不当的内联 JSON 写法，JSON 双引号可能被 PowerShell 解析吞掉，服务端会收到类似 `{model:GLM-5,...}` 的非法/弱格式请求，进而出现 `ModelNotFound`（404）等误导性报错。

### 10.2 推荐方案 A（最稳）：`Invoke-RestMethod`
```powershell
$headers = @{
  Authorization = "Bearer <YOUR_API_KEY>"
  "Content-Type" = "application/json"
}

$body = @{
  model = "GLM-5"
  messages = @(
    @{ role = "user"; content = "你的模型能力" }
  )
} | ConvertTo-Json -Depth 8

Invoke-RestMethod `
  -Uri "https://api.edgefn.net/v1/chat/completions" `
  -Method POST `
  -Headers $headers `
  -Body $body
```

### 10.3 推荐方案 B：`curl.exe --%`（阻止 PowerShell 改写参数）
```powershell
curl.exe --% -X POST https://api.edgefn.net/v1/chat/completions `
  -H "Authorization: Bearer <YOUR_API_KEY>" `
  -H "Content-Type: application/json" `
  -d "{\"model\":\"GLM-5\",\"messages\":[{\"role\":\"user\",\"content\":\"你的模型能力\"}]}"
```

### 10.4 推荐方案 C：`curl.exe` + JSON 文件（UTF-8 无 BOM）
```powershell
$json = @'
{
  "model": "GLM-5",
  "messages": [{"role": "user", "content": "你的模型能力"}]
}
'@

$payloadFile = "$env:TEMP\\edgefn_payload.json"
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($payloadFile, $json, $utf8NoBom)

curl.exe --request POST "https://api.edgefn.net/v1/chat/completions" `
  --header "Authorization: Bearer <YOUR_API_KEY>" `
  --header "Content-Type: application/json" `
  --data-binary "@$payloadFile"
```

### 10.5 快速自检
1. 先测模型列表确认 key 可用：
```powershell
curl.exe "https://api.edgefn.net/v1/models" `
  --header "Authorization: Bearer <YOUR_API_KEY>"
```
2. 再测 `chat/completions`。若 `models` 成功但 `chat` 失败，优先检查请求体 JSON 是否被 PowerShell 改写。
