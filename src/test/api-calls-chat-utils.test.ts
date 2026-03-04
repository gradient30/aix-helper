import { describe, expect, it } from "vitest";

import {
  buildChatMessages,
  buildOpenAiCompatiblePayload,
  normalizeModelList,
  parseAssistantText,
} from "@/lib/api-calls-chat-utils";

describe("api-calls-chat-utils", () => {
  it("normalizes model list with trim + unique and keeps fallback", () => {
    const models = normalizeModelList([" GLM-5 ", "gpt-4o-mini", "GLM-5", "", 123], ["GLM-5"]);
    expect(models).toEqual(["GLM-5", "gpt-4o-mini"]);
  });

  it("builds chat messages by appending current user prompt", () => {
    const next = buildChatMessages(
      [{ role: "assistant", content: "hi" }],
      "  hello  ",
    );

    expect(next).toEqual([
      { role: "assistant", content: "hi" },
      { role: "user", content: "hello" },
    ]);
  });

  it("parses normalized text first", () => {
    const text = parseAssistantText({ normalized: { text: "done" }, raw: "raw" });
    expect(text).toBe("done");
  });

  it("falls back to raw string when normalized text is absent", () => {
    const text = parseAssistantText({ raw: "raw-response" });
    expect(text).toBe("raw-response");
  });

  it("extracts assistant text from openai compatible stream chunks", () => {
    const streamRaw = [
      'data: {"choices":[{"delta":{"role":"assistant"}}]}',
      'data: {"choices":[{"delta":{"content":"Hello"}}]}',
      'data: {"choices":[{"delta":{"content":" world"}}]}',
      "data: [DONE]",
    ].join("\n");

    const text = parseAssistantText({ raw: streamRaw });
    expect(text).toBe("Hello world");
  });

  it("builds openai compatible payload with messages and stream settings", () => {
    const payload = buildOpenAiCompatiblePayload({
      model: "kimi-for-coding",
      messages: [
        { role: "assistant", content: "Hi" },
        { role: "user", content: "Hello" },
      ],
      stream: true,
      includeMaxOutputTokens: true,
      maxOutputTokens: 32768,
      reasoningEffort: "medium",
      temperature: null,
      thinkingType: null,
    });

    expect(payload).toEqual({
      model: "kimi-for-coding",
      messages: [
        { role: "assistant", content: "Hi" },
        { role: "user", content: "Hello" },
      ],
      stream: true,
      max_tokens: 32768,
      reasoning_effort: "medium",
    });
  });

  it("omits optional fields in openai compatible payload when disabled", () => {
    const payload = buildOpenAiCompatiblePayload({
      model: "GLM-5",
      messages: [{ role: "user", content: "Ping" }],
      stream: false,
      includeMaxOutputTokens: false,
      maxOutputTokens: 4096,
      reasoningEffort: null,
      temperature: null,
      thinkingType: null,
    });

    expect(payload).toEqual({
      model: "GLM-5",
      messages: [{ role: "user", content: "Ping" }],
      stream: false,
    });
  });

  it("includes vendor-specific thinking and temperature for openai compatible payload", () => {
    const payload = buildOpenAiCompatiblePayload({
      model: "coding-glm-5-free",
      messages: [{ role: "user", content: "hello" }],
      stream: false,
      includeMaxOutputTokens: true,
      maxOutputTokens: 65536,
      reasoningEffort: null,
      temperature: 1,
      thinkingType: "enabled",
    });

    expect(payload).toEqual({
      model: "coding-glm-5-free",
      messages: [{ role: "user", content: "hello" }],
      stream: false,
      max_tokens: 65536,
      temperature: 1,
      thinking: { type: "enabled" },
    });
  });
});
