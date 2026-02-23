export type PromptAction = "optimize" | "iterate" | "evaluate";
export type PromptMode = "system" | "user";

export function resolveTemplateId(params: {
  action: PromptAction;
  mode: PromptMode;
  template?: string;
}): string {
  const { action, mode, template } = params;

  if (action === "evaluate") {
    return "evaluate/analyze";
  }

  if (action === "iterate") {
    return "iterate/refine";
  }

  if (mode === "user") {
    return "user-optimize/general";
  }

  return `optimize/${template || "general"}`;
}
