import { describe, expect, it } from "vitest";
import { resolveTemplateId } from "@/lib/prompt-routing";

describe("prompt-routing", () => {
  it("should route evaluate action to analyze template", () => {
    expect(
      resolveTemplateId({ action: "evaluate", mode: "system", template: "creative" }),
    ).toBe("evaluate/analyze");
  });

  it("should route iterate action to refine template", () => {
    expect(
      resolveTemplateId({ action: "iterate", mode: "system", template: "general" }),
    ).toBe("iterate/refine");
  });

  it("should route user optimize mode to user template", () => {
    expect(
      resolveTemplateId({ action: "optimize", mode: "user", template: "academic" }),
    ).toBe("user-optimize/general");
  });

  it("should route system optimize mode to selected template with default fallback", () => {
    expect(
      resolveTemplateId({ action: "optimize", mode: "system", template: "creative" }),
    ).toBe("optimize/creative");
    expect(
      resolveTemplateId({ action: "optimize", mode: "system" }),
    ).toBe("optimize/general");
  });
});
