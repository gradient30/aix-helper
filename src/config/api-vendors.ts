import type { Json } from "@/integrations/supabase/types";

export type ApiAuthMode = "bearer" | "x-api-key" | "query-key" | "custom-header";
export type ApiRequestMode = "chat" | "custom";
export type ApiSchemaFieldType = "string" | "number" | "boolean" | "json" | "array_messages";

export type ApiSchemaField = {
  key: string;
  label: string;
  type: ApiSchemaFieldType;
  required?: boolean;
  default?: Json;
  help?: string;
  order?: number;
};

export type ApiVendorTemplate = {
  vendor_id: string;
  name: string;
  auth_mode: ApiAuthMode;
  base_url: string;
  default_path?: string;
  default_request_schema: ApiSchemaField[];
  defaults: Record<string, unknown>;
  favorite_models: string[];
  sample_python: string;
  sample_curl: string;
};

export const API_VENDOR_TEMPLATES: ApiVendorTemplate[] = [
  {
    vendor_id: "baishan",
    name: "白山",
    auth_mode: "bearer",
    base_url: "https://api.edgefn.net",
    default_path: "/v1/chat/completions",
    default_request_schema: [
      {
        key: "model",
        label: "模型",
        type: "string",
        required: true,
        default: "GLM-5",
        help: "支持自由输入任意模型名称",
        order: 1,
      },
      {
        key: "messages",
        label: "消息",
        type: "array_messages",
        required: true,
        default: [{ role: "user", content: "Hello, how are you?" }],
        help: "每行格式：role: content",
        order: 2,
      },
      {
        key: "temperature",
        label: "温度",
        type: "number",
        default: 0.7,
        order: 3,
      },
      {
        key: "max_tokens",
        label: "最大输出",
        type: "number",
        default: 1024,
        order: 4,
      },
    ],
    defaults: {
      model: "GLM-5",
      messages: [{ role: "user", content: "Hello, how are you?" }],
      temperature: 0.7,
      max_tokens: 1024,
    },
    favorite_models: ["GLM-5", "gpt-4o-mini", "deepseek-chat"],
    sample_python: `import requests

url = "https://api.edgefn.net/v1/chat/completions"
headers = {
    "Authorization": "Bearer {YOUR_API_KEY}",
    "Content-Type": "application/json"
}
data = {
    "model": "GLM-5",
    "messages": [{"role": "user", "content": "Hello, how are you?"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    sample_curl: `curl -X POST "https://api.edgefn.net/v1/chat/completions" \\
  -H "Authorization: Bearer {YOUR_API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"GLM-5","messages":[{"role":"user","content":"Hello, how are you?"}]}'`,
  },
  {
    vendor_id: "custom",
    name: "Custom",
    auth_mode: "bearer",
    base_url: "https://api.example.com",
    default_path: "/v1/chat/completions",
    default_request_schema: [
      { key: "model", label: "Model", type: "string", required: true, default: "gpt-4o-mini", order: 1 },
      {
        key: "messages",
        label: "Messages",
        type: "array_messages",
        required: true,
        default: [{ role: "user", content: "Hello" }],
        order: 2,
      },
    ],
    defaults: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
    },
    favorite_models: [],
    sample_python: "",
    sample_curl: "",
  },
];

export function getVendorTemplateById(vendorId: string): ApiVendorTemplate | undefined {
  return API_VENDOR_TEMPLATES.find((item) => item.vendor_id === vendorId);
}
