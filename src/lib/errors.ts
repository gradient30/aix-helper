export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  return "Unknown error";
}

function readErrorMessageFromJson(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const source = raw as Record<string, unknown>;

  const candidates: unknown[] = [
    source.message,
    source.error_message,
    source.reason,
    source.error,
    typeof source.error === "object" && source.error !== null
      ? (source.error as Record<string, unknown>).message
      : undefined,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }
  return "";
}

export async function getDetailedErrorMessage(error: unknown): Promise<string> {
  const fallback = getErrorMessage(error);
  if (!error || typeof error !== "object") return fallback;

  const context = (error as { context?: unknown }).context;
  if (!context || typeof context !== "object") return fallback;
  if (typeof (context as Response).text !== "function") return fallback;

  const response = context as Response;
  let rawText = "";
  try {
    rawText = await response.clone().text();
  } catch {
    rawText = "";
  }

  let parsed: unknown = null;
  if (rawText.trim()) {
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }
  }

  const parsedMessage = readErrorMessageFromJson(parsed);
  if (response.status === 401 && /invalid jwt/i.test(`${parsedMessage} ${rawText}`)) {
    return "登录状态已失效，请重新登录后再试";
  }

  if (parsedMessage) {
    return parsedMessage;
  }

  if (rawText.trim()) {
    return `HTTP ${response.status}: ${rawText.trim()}`;
  }

  if (response.status) {
    return `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}`;
  }

  return fallback;
}
