import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("AI tech freshness", () => {
  it("removes high-churn hardcoded literals from AI module and locale payloads", () => {
    const aiPage = fs.readFileSync(path.resolve("src/pages/AiGlossary.tsx"), "utf8");
    const zh = fs.readFileSync(path.resolve("src/i18n/locales/zh.ts"), "utf8");
    const en = fs.readFileSync(path.resolve("src/i18n/locales/en.ts"), "utf8");

    expect(aiPage).not.toMatch(/Updated\s+Feb\s+2026/i);
    expect(aiPage).not.toMatch(/Gemini\s*3/i);
    expect(aiPage).not.toMatch(/GPT-?5\.3/i);

    expect(zh).not.toMatch(new RegExp("Gemini\\s*3|GPT-?5\\.3|60\\s*次/分钟|1000\\s*次/天", "i"));
    expect(en).not.toMatch(/Gemini\s*3|GPT-?5\.3|60\s*req\/?min|1000\s*req\/?day/i);
  });
});
