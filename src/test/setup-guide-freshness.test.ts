import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("SetupGuide freshness", () => {
  it("does not include high-churn literals", () => {
    const file = path.resolve("src/pages/SetupGuide.tsx");
    const text = fs.readFileSync(file, "utf8");

    expect(text).not.toMatch(/Gemini\s*3/i);
    expect(text).not.toMatch(/gpt-5\.3/i);
    expect(text).not.toMatch(/60\s*次\/分钟|1000\s*次\/天/i);
  });
});
