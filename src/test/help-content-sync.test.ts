import { describe, expect, it } from "vitest";

import zh from "@/i18n/locales/zh";
import en from "@/i18n/locales/en";

const TARGET_KEYS = ["helpProviders", "helpMcp", "helpSkills", "helpExport"] as const;
type HelpSection = (typeof TARGET_KEYS)[number];
type LocaleHelpShape = Record<HelpSection, Record<string, unknown>>;

describe("help content sync", () => {
  TARGET_KEYS.forEach((section) => {
    it(`${section} has the same key set in zh/en`, () => {
      const zhKeys = Object.keys((zh as unknown as LocaleHelpShape)[section] || {}).sort();
      const enKeys = Object.keys((en as unknown as LocaleHelpShape)[section] || {}).sort();
      expect(zhKeys).toEqual(enKeys);
    });
  });
});
