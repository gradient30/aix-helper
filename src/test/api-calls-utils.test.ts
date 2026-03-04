import { describe, expect, test } from "vitest";
import {
  DEFAULT_RESPONSE_SNAPSHOT_LIMIT,
  applyDefaults,
  maskSensitiveObject,
  normalizeApiKey,
  parseCurlSnippet,
  parsePythonRequestsSnippet,
  toResponseSnapshot,
} from "@/lib/api-calls-utils";

describe("api-calls-utils", () => {
  test("parses python requests snippet into url, headers and payload", () => {
    const snippet = `import requests

url = "https://api.edgefn.net/v1/chat/completions"
headers = {
  "Authorization": "Bearer {YOUR_API_KEY}",
  "Content-Type": "application/json"
}
data = {
  "model": "GLM-5",
  "messages": [{"role": "user", "content": "Hello"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`;

    const parsed = parsePythonRequestsSnippet(snippet);
    expect(parsed.url).toBe("https://api.edgefn.net/v1/chat/completions");
    expect(parsed.method).toBe("POST");
    expect(parsed.headers.Authorization).toBe("Bearer {YOUR_API_KEY}");
    expect(parsed.payload.model).toBe("GLM-5");
  });

  test("parses curl snippet into method, url, headers and payload", () => {
    const snippet = `curl -X POST "https://api.edgefn.net/v1/chat/completions" \\
  -H "Authorization: Bearer test_key" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"GLM-5","messages":[{"role":"user","content":"hi"}]}'`;

    const parsed = parseCurlSnippet(snippet);
    expect(parsed.method).toBe("POST");
    expect(parsed.url).toBe("https://api.edgefn.net/v1/chat/completions");
    expect(parsed.headers.Authorization).toBe("Bearer test_key");
    expect(parsed.payload.model).toBe("GLM-5");
  });

  test("masks sensitive headers and tokens recursively", () => {
    const masked = maskSensitiveObject({
      headers: {
        Authorization: "Bearer super-secret",
        "x-api-key": "super-key",
        normal: "ok",
      },
      api_key: "abc",
      nested: { token: "xyz" },
    });

    expect(masked.headers.Authorization).toContain("***");
    expect(masked.headers["x-api-key"]).toContain("***");
    expect(masked.headers.normal).toBe("ok");
    expect(masked.api_key).toContain("***");
    expect(masked.nested.token).toContain("***");
  });

  test("truncates response snapshot to 20KB by default", () => {
    const large = "x".repeat(DEFAULT_RESPONSE_SNAPSHOT_LIMIT + 1024);
    const snapshot = toResponseSnapshot(large);
    expect(snapshot.length).toBeLessThanOrEqual(DEFAULT_RESPONSE_SNAPSHOT_LIMIT);
  });

  test("applies defaults without overwriting provided payload", () => {
    const merged = applyDefaults(
      {
        model: "GLM-5",
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        model: "custom-model",
      },
    );

    expect(merged.model).toBe("custom-model");
    expect(merged.temperature).toBe(0.7);
    expect(merged.max_tokens).toBe(2048);
  });

  test("normalizes API key by stripping bearer prefix and quotes", () => {
    expect(normalizeApiKey(`  "Bearer sk-abc123"  `)).toBe("sk-abc123");
    expect(normalizeApiKey("Bearer sk-xyz")).toBe("sk-xyz");
    expect(normalizeApiKey("sk-plain")).toBe("sk-plain");
  });
});
