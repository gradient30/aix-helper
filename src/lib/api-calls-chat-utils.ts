export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type BuildOpenAiCompatiblePayloadInput = {
  model: string;
  messages: ChatMessage[];
  stream: boolean;
  includeMaxOutputTokens: boolean;
  maxOutputTokens: number;
  reasoningEffort: "low" | "medium" | "high" | null;
  temperature: number | null;
  thinkingType: "enabled" | "disabled" | null;
};

export function normalizeModelList(raw: unknown, fallback: string[] = []): string[] {
  const base = Array.isArray(raw) ? raw : [];
  const merged = [...fallback, ...base]
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return Array.from(new Set(merged));
}

export function buildChatMessages(history: ChatMessage[], prompt: string): ChatMessage[] {
  const content = prompt.trim();
  if (!content) return history;
  return [...history, { role: "user", content }];
}

export function buildOpenAiCompatiblePayload(input: BuildOpenAiCompatiblePayloadInput): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    model: input.model.trim(),
    messages: input.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    stream: input.stream,
  };

  if (input.includeMaxOutputTokens) {
    payload.max_tokens = Math.max(1, Math.floor(input.maxOutputTokens));
  }

  if (input.reasoningEffort) {
    payload.reasoning_effort = input.reasoningEffort;
  }

  if (typeof input.temperature === "number" && Number.isFinite(input.temperature)) {
    payload.temperature = input.temperature;
  }

  if (input.thinkingType) {
    payload.thinking = { type: input.thinkingType };
  }

  return payload;
}

function extractTextFromOpenAiChunk(raw: unknown): string {
  if (typeof raw !== "object" || raw === null) return "";
  const choices = (raw as Record<string, unknown>).choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const first = choices[0];
  if (typeof first !== "object" || first === null) return "";
  const choice = first as Record<string, unknown>;

  const delta = choice.delta;
  if (typeof delta === "object" && delta !== null) {
    const content = (delta as Record<string, unknown>).content;
    if (typeof content === "string") return content;
  }

  const message = choice.message;
  if (typeof message === "object" && message !== null) {
    const content = (message as Record<string, unknown>).content;
    if (typeof content === "string") return content;
  }

  return "";
}

function extractSseText(raw: string): string {
  if (!raw.includes("data:")) return "";

  const pieces: string[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    try {
      const parsed = JSON.parse(data);
      const text = extractTextFromOpenAiChunk(parsed);
      if (text) {
        pieces.push(text);
      }
    } catch {
      // Ignore invalid chunk lines and continue parsing next chunks.
    }
  }

  return pieces.join("");
}

export function parseAssistantText(result: unknown): string {
  if (typeof result !== "object" || result === null) return "";

  const normalized = (result as Record<string, unknown>).normalized;
  if (typeof normalized === "object" && normalized !== null) {
    const text = (normalized as Record<string, unknown>).text;
    if (typeof text === "string" && text.trim()) {
      const streamText = extractSseText(text);
      return streamText || text;
    }
  }

  const raw = (result as Record<string, unknown>).raw;
  if (typeof raw === "string" && raw.trim()) {
    const streamText = extractSseText(raw);
    return streamText || raw;
  }

  return "";
}
