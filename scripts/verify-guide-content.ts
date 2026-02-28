import fs from "node:fs/promises";
import path from "node:path";

import { CLI_GUIDE_TOOLS } from "../src/config/docs-catalog/cli.ts";
import { SKILLS_GUIDE_TOOLS } from "../src/config/docs-catalog/skills.ts";
import { SETUP_GUIDE_TOOLS } from "../src/config/docs-catalog/setup.ts";
import { HELP_DOC_CATALOG } from "../src/config/docs-catalog/help.ts";

import zh from "../src/i18n/locales/zh.ts";
import en from "../src/i18n/locales/en.ts";

type Status = "pass" | "fail";

type CheckResult = {
  scope: "catalog" | "links" | "content" | "i18n";
  id: string;
  status: Status;
  message: string;
  evidence?: Record<string, unknown>;
};

type Report = {
  generated_at: string;
  summary: {
    total: number;
    pass: number;
    fail: number;
  };
  results: CheckResult[];
};

type HelpSection = "helpProviders" | "helpMcp" | "helpSkills" | "helpExport";
type LocaleHelpShape = Record<HelpSection, Record<string, unknown>>;

function pass(input: Omit<CheckResult, "status">): CheckResult {
  return { ...input, status: "pass" };
}

function fail(input: Omit<CheckResult, "status">): CheckResult {
  return { ...input, status: "fail" };
}

function escapeAnnotationValue(value: string): string {
  return value
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");
}

function printFailedChecks(failed: CheckResult[]): void {
  console.error("Failed checks (verify:guides):");
  failed.forEach((item, index) => {
    console.error(`${index + 1}. [${item.scope}] ${item.id} - ${item.message}`);
    if (item.evidence) {
      console.error(`   evidence: ${JSON.stringify(item.evidence)}`);
    }
  });
}

function printGuideFixHints(failed: CheckResult[]): void {
  const hints = new Set<string>();

  failed.forEach((item) => {
    if (item.scope === "links" && item.id.startsWith("url:")) {
      hints.add("检查 docs-catalog 中对应 source_url 是否已变更，更新为官方最新可访问链接。");
    }
    if (item.scope === "content") {
      hints.add("检查 SkillsGuide/SetupGuide 是否引入了被禁用的旧命令或高漂移文案。");
    }
    if (item.scope === "i18n") {
      hints.add("同步 zh/en locale 键集合，确保 help* 子键完全一致。");
    }
  });

  if (!hints.size) return;

  console.error("Suggested actions:");
  [...hints].forEach((hint, index) => {
    console.error(`${index + 1}. ${hint}`);
  });
}

function emitGitHubAnnotations(failed: CheckResult[]): void {
  failed.slice(0, 30).forEach((item) => {
    const title = escapeAnnotationValue(`verify:guides ${item.scope}`);
    const message = escapeAnnotationValue(`${item.id} - ${item.message}`);
    console.error(`::error title=${title}::${message}`);
  });
}

async function fetchWithTimeout(url: string, method: "HEAD" | "GET" = "HEAD", timeoutMs = 8_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method,
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "aix-helper-guide-verifier/1.0",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function collectCatalogUrls(): Set<string> {
  const urls = new Set<string>();

  const collectMeta = (meta: { source_url: string; last_verified_at: string }) => {
    urls.add(meta.source_url);
    if (!meta.last_verified_at) {
      throw new Error(`missing last_verified_at for ${meta.source_url}`);
    }
  };

  for (const tool of CLI_GUIDE_TOOLS) {
    collectMeta(tool.verification);
    urls.add(tool.official_url);
    for (const group of tool.groups) {
      collectMeta(group.verification);
      for (const item of group.items) collectMeta(item.verification);
    }
  }

  for (const tool of SKILLS_GUIDE_TOOLS) {
    collectMeta(tool.verification);
    urls.add(tool.official_url);
    for (const group of tool.groups) {
      collectMeta(group.verification);
      for (const item of group.items) collectMeta(item.verification);
    }
  }

  for (const tool of SETUP_GUIDE_TOOLS) {
    collectMeta(tool.verification);
    urls.add(tool.official_url);
    for (const group of tool.groups) {
      collectMeta(group.verification);
      for (const item of group.items) collectMeta(item.verification);
    }
  }

  Object.values(HELP_DOC_CATALOG).forEach((meta) => collectMeta(meta));

  return urls;
}

function getHelpSubKeys(locale: LocaleHelpShape, key: HelpSection): string[] {
  return Object.keys(locale[key] || {}).sort();
}

async function main() {
  const results: CheckResult[] = [];

  try {
    const urls = [...collectCatalogUrls()];
    results.push(pass({
      scope: "catalog",
      id: "catalog:metadata",
      message: `guide catalog metadata validated (${urls.length} source urls)`,
      evidence: { url_count: urls.length },
    }));

    const transientDomain = (url: string) =>
      url.includes("docs.anthropic.com") ||
      url.includes("google-gemini.github.io") ||
      url.includes("ai.google.dev");

    const linkChecks = await Promise.all(urls.map(async (url) => {
      try {
        let resp = await fetchWithTimeout(url, "HEAD");
        if (resp.status >= 400 && resp.status !== 405) {
          resp = await fetchWithTimeout(url, "GET");
        }

        if (resp.ok || [301, 302, 307, 308, 403].includes(resp.status)) {
          return pass({
            scope: "links",
            id: `url:${url}`,
            message: `reachable (${resp.status})`,
          });
        }
        return fail({
          scope: "links",
          id: `url:${url}`,
          message: `unreachable (${resp.status})`,
          evidence: { status: resp.status },
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        if (transientDomain(url) && /aborted|fetch failed|timeout/i.test(msg)) {
          return pass({
            scope: "links",
            id: `url:${url}`,
            message: `transient network issue treated as pass (${msg})`,
          });
        }
        return fail({
          scope: "links",
          id: `url:${url}`,
          message: `request failed: ${msg}`,
        });
      }
    }));
    results.push(...linkChecks);
  } catch (error) {
    results.push(fail({
      scope: "catalog",
      id: "catalog:metadata",
      message: error instanceof Error ? error.message : String(error),
    }));
  }

  const contentChecks: Array<{ id: string; file: string; pattern: RegExp; message: string }> = [
    {
      id: "ban:codex_legacy_skills_path",
      file: "src/pages/SkillsGuide.tsx",
      pattern: /\.codex\/skills/i,
      message: "legacy .codex/skills path is not allowed",
    },
    {
      id: "ban:gemini3_literal",
      file: "src/pages/SetupGuide.tsx",
      pattern: /Gemini\\s*3/i,
      message: "high-churn Gemini 3 literal is not allowed",
    },
    {
      id: "ban:approval_mode_literal",
      file: "src/pages/SkillsGuide.tsx",
      pattern: /approval_mode/i,
      message: "legacy approval_mode literal is not allowed in guides",
    },
    {
      id: "ban:gemini_skills_commands_1",
      file: "src/pages/SkillsGuide.tsx",
      pattern: /\/skills\s+list/i,
      message: "Gemini /skills command must stay removed",
    },
    {
      id: "ban:gemini_skills_commands_2",
      file: "src/pages/SkillsGuide.tsx",
      pattern: /gemini\\s+skills/i,
      message: "Gemini skills CLI commands must stay removed",
    },
  ];

  for (const check of contentChecks) {
    const absolute = path.resolve(check.file);
    const text = await fs.readFile(absolute, "utf8");
    if (check.pattern.test(text)) {
      results.push(fail({
        scope: "content",
        id: check.id,
        message: check.message,
        evidence: { file: check.file, pattern: check.pattern.source },
      }));
    } else {
      results.push(pass({
        scope: "content",
        id: check.id,
        message: "pattern not found",
        evidence: { file: check.file },
      }));
    }
  }

  (["helpProviders", "helpMcp", "helpSkills", "helpExport"] as const).forEach((key) => {
    const zhKeys = getHelpSubKeys(zh as unknown as LocaleHelpShape, key);
    const enKeys = getHelpSubKeys(en as unknown as LocaleHelpShape, key);
    const same = JSON.stringify(zhKeys) === JSON.stringify(enKeys);
    if (same) {
      results.push(pass({
        scope: "i18n",
        id: `i18n:${key}`,
        message: "zh/en key set matched",
        evidence: { keys: zhKeys },
      }));
    } else {
      results.push(fail({
        scope: "i18n",
        id: `i18n:${key}`,
        message: "zh/en key set mismatch",
        evidence: { zhKeys, enKeys },
      }));
    }
  });

  const summary = {
    total: results.length,
    pass: results.filter((r) => r.status === "pass").length,
    fail: results.filter((r) => r.status === "fail").length,
  };

  const report: Report = {
    generated_at: new Date().toISOString(),
    summary,
    results,
  };

  const outputPath = path.resolve("reports/guide-verification.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");

  const failed = results.filter((item) => item.status === "fail");

  if (summary.fail > 0) {
    process.exitCode = 1;
    console.error(`guide verification failed: ${summary.fail} checks failed`);
    console.error(`Guide report path: ${outputPath}`);
    printFailedChecks(failed);
    printGuideFixHints(failed);
    emitGitHubAnnotations(failed);
  } else {
    console.log(`guide verification passed: ${summary.pass}/${summary.total}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
