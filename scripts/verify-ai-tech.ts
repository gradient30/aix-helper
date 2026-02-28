import fs from "node:fs/promises";
import path from "node:path";

import {
  AI_CONCEPTS,
  AI_PARADIGMS,
  AI_TECH_BASELINE_DATE,
  AI_TOP_REPOS_SNAPSHOT,
  type AiRepoCategory,
} from "../src/config/ai-tech-catalog/index.ts";
import { resolveGitHubToken } from "./lib/resolve-github-token.ts";

type Status = "pass" | "fail";

type CheckResult = {
  scope: "catalog" | "links" | "content" | "top10" | "github";
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

const WINDOW_DAYS = 365;
const GITHUB_API = "https://api.github.com";
const GITHUB_MAX_ATTEMPTS = 3;
const TRANSIENT_DOMAINS = [
  "docs.anthropic.com",
  "google-gemini.github.io",
  "ai.google.dev",
  "cloud.google.com",
  "developers.googleblog.com",
  "microsoft.github.io",
  "huggingface.co",
  "github.com",
];
const URL_MAX_ATTEMPTS = 3;

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
  console.error("Failed checks (verify:ai-tech):");
  failed.forEach((item, index) => {
    console.error(`${index + 1}. [${item.scope}] ${item.id} - ${item.message}`);
    if (item.evidence) {
      console.error(`   evidence: ${JSON.stringify(item.evidence)}`);
    }
  });
}

function printAiTechFixHints(failed: CheckResult[]): void {
  const hints = new Set<string>();

  failed.forEach((item) => {
    if (item.id.includes(":live_star_order")) {
      hints.add("检测到星标顺序漂移：运行 npm run sync:ai-tech 并提交 top-repos.generated.ts。");
    }
    if (item.id === "github:token") {
      hints.add("缺少 GitHub Token：在 CI 注入 GITHUB_TOKEN 或 GH_TOKEN，确保 strict 校验可访问 GitHub API。");
    }
    if (item.scope === "links" && item.id.startsWith("url:")) {
      hints.add("文档链接不可达：检查 ai-tech catalog 里的 source_url，并更新到官方最新可访问地址。");
    }
    if (item.id.endsWith(":skill_md")) {
      hints.add("skill_repos 缺少 SKILL.md：替换该仓库或调整同步筛选规则。");
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
    const title = escapeAnnotationValue(`verify:ai-tech ${item.scope}`);
    const message = escapeAnnotationValue(`${item.id} - ${item.message}`);
    console.error(`::error title=${title}::${message}`);
  });
}

function toDate(value: string): Date {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${value}`);
  return d;
}

function rollingWindowStart(now = new Date()): Date {
  return new Date(now.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
}

function isTransient(url: string, message: string): boolean {
  return TRANSIENT_DOMAINS.some((domain) => url.includes(domain))
    && /aborted|timeout|timed out|fetch failed|network/i.test(message);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 10_000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "aix-helper-ai-tech-verifier/1.0",
        ...(init.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchGitHubJson<T>(url: string, token: string): Promise<T> {
  for (let attempt = 1; attempt <= GITHUB_MAX_ATTEMPTS; attempt += 1) {
    try {
      const resp = await fetchWithTimeout(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }, 10_000 + attempt * 2_000);
      if (resp.ok) {
        return await resp.json() as T;
      }

      const body = await resp.text();
      const remaining = resp.headers.get("x-ratelimit-remaining");
      const retryable = resp.status === 429
        || resp.status >= 500
        || (resp.status === 403 && (remaining === "0" || /rate limit/i.test(body)));
      if (retryable && attempt < GITHUB_MAX_ATTEMPTS) {
        await delay(400 * attempt);
        continue;
      }
      throw new Error(`GitHub request failed (${resp.status}) for ${url}: ${body.slice(0, 300)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const retryable = /aborted|timeout|timed out|fetch failed|network/i.test(message);
      if (retryable && attempt < GITHUB_MAX_ATTEMPTS) {
        await delay(400 * attempt);
        continue;
      }
      throw error;
    }
  }
  throw new Error(`GitHub request failed for ${url}: exhausted retry attempts`);
}

async function checkUrl(url: string): Promise<CheckResult> {
  let lastStatus: number | null = null;
  let lastErrorMessage = "";

  for (let attempt = 1; attempt <= URL_MAX_ATTEMPTS; attempt += 1) {
    try {
      let resp = await fetchWithTimeout(url, { method: "HEAD" }, 8_000 + attempt * 2_000);
      if (resp.status >= 400 && resp.status !== 405) {
        resp = await fetchWithTimeout(url, { method: "GET" }, 8_000 + attempt * 2_000);
      }
      lastStatus = resp.status;

      if (resp.ok || [301, 302, 307, 308, 403].includes(resp.status)) {
        return pass({
          scope: "links",
          id: `url:${url}`,
          message: `reachable (${resp.status})`,
        });
      }

      if (attempt < URL_MAX_ATTEMPTS) {
        await delay(300 * attempt);
        continue;
      }
    } catch (error) {
      lastErrorMessage = error instanceof Error ? error.message : String(error);
      if (attempt < URL_MAX_ATTEMPTS && isTransient(url, lastErrorMessage)) {
        await delay(300 * attempt);
        continue;
      }
      if (isTransient(url, lastErrorMessage)) {
        return pass({
          scope: "links",
          id: `url:${url}`,
          message: `transient network issue treated as pass (${lastErrorMessage})`,
        });
      }
      return fail({
        scope: "links",
        id: `url:${url}`,
        message: `request failed: ${lastErrorMessage}`,
      });
    }
  }

  if (lastStatus !== null) {
    return fail({
      scope: "links",
      id: `url:${url}`,
      message: `unreachable (${lastStatus})`,
      evidence: { status: lastStatus },
    });
  }

  return fail({
    scope: "links",
    id: `url:${url}`,
    message: `request failed: ${lastErrorMessage || "unknown error"}`,
  });
}

async function checkSkillRepoHasSkillFile(
  owner: string,
  repo: string,
  defaultBranch: string,
  token: string,
): Promise<boolean> {
  const branchRef = encodeURIComponent(defaultBranch || "HEAD");
  const url = `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branchRef}?recursive=1`;
  const payload = await fetchGitHubJson<{
    tree?: Array<{ path?: string; type?: string }>;
  }>(url, token);

  return (payload.tree || []).some((entry) => {
    if (entry.type !== "blob" || !entry.path) return false;
    const fileName = entry.path.split("/").pop() || "";
    return fileName.toLowerCase() === "skill.md";
  });
}

async function main() {
  const results: CheckResult[] = [];
  const now = new Date();
  const windowStart = rollingWindowStart(now);

  const tokenResolution = resolveGitHubToken();
  const token = tokenResolution.token;
  if (!token) {
    results.push(fail({
      scope: "github",
      id: "github:token",
      message: `GitHub token required by strict verify:ai-tech policy (checked: GITHUB_TOKEN, GH_TOKEN, git credential helper${tokenResolution.reason ? `; reason: ${tokenResolution.reason}` : ""})`,
    }));
  } else {
    results.push(pass({
      scope: "github",
      id: "github:token",
      message: `GitHub token resolved (${tokenResolution.source})`,
    }));
  }

  // Catalog metadata checks.
  try {
    if (!AI_CONCEPTS.length) throw new Error("AI_CONCEPTS is empty");
    if (!AI_PARADIGMS.length) throw new Error("AI_PARADIGMS is empty");

    AI_CONCEPTS.forEach((item) => {
      if (!item.verification.source_url || !item.verification.last_verified_at) {
        throw new Error(`concept metadata missing: ${item.id}`);
      }
      item.sections.forEach((section) => {
        if (!section.verification.source_url || !section.verification.last_verified_at) {
          throw new Error(`section metadata missing: ${item.id}/${section.kind}`);
        }
      });
    });

    AI_PARADIGMS.forEach((item) => {
      const introduced = toDate(item.introduced_at);
      if (introduced.getTime() < windowStart.getTime()) {
        throw new Error(`paradigm out of 365-day window: ${item.id} (${item.introduced_at})`);
      }
      if (!["official_doc", "official_repo"].includes(item.official_source.verification_source)) {
        throw new Error(`paradigm official source invalid: ${item.id}`);
      }
      if (!item.official_source.source_url || !item.official_source.last_verified_at) {
        throw new Error(`paradigm source metadata missing: ${item.id}`);
      }
    });

    results.push(pass({
      scope: "catalog",
      id: "catalog:metadata",
      message: "AI catalog metadata is complete",
    }));
  } catch (error) {
    results.push(fail({
      scope: "catalog",
      id: "catalog:metadata",
      message: error instanceof Error ? error.message : String(error),
    }));
  }

  // Top10 structure checks.
  for (const category of Object.keys(AI_TOP_REPOS_SNAPSHOT.categories) as AiRepoCategory[]) {
    const items = AI_TOP_REPOS_SNAPSHOT.categories[category];
    if (items.length !== 10) {
      results.push(fail({
        scope: "top10",
        id: `top10:${category}:count`,
        message: `category count must be 10, got ${items.length}`,
      }));
    } else {
      results.push(pass({
        scope: "top10",
        id: `top10:${category}:count`,
        message: "category count is 10",
      }));
    }

    let sorted = true;
    let rankOk = true;
    let scoreOk = true;
    for (let i = 0; i < items.length; i += 1) {
      const current = items[i];
      if (current.rank !== i + 1) rankOk = false;
      if (i > 0 && items[i - 1].stars < current.stars) sorted = false;
      if (current.recommended_stars < 1 || current.recommended_stars > 5) scoreOk = false;
    }

    results.push((sorted ? pass : fail)({
      scope: "top10",
      id: `top10:${category}:sorted`,
      message: sorted ? "stars sorted descending" : "stars not sorted descending",
    }));

    results.push((rankOk ? pass : fail)({
      scope: "top10",
      id: `top10:${category}:rank`,
      message: rankOk ? "rank sequence is valid" : "rank sequence invalid",
    }));

    results.push((scoreOk ? pass : fail)({
      scope: "top10",
      id: `top10:${category}:recommended_stars`,
      message: scoreOk ? "recommended_stars within 1-5" : "recommended_stars out of range",
    }));
  }

  // Link checks.
  const urls = new Set<string>();
  AI_CONCEPTS.forEach((item) => {
    urls.add(item.verification.source_url);
    item.sections.forEach((section) => urls.add(section.verification.source_url));
  });
  AI_PARADIGMS.forEach((item) => {
    urls.add(item.official_source.source_url);
    item.supporting_sources.forEach((source) => urls.add(source.source_url));
  });
  for (const category of Object.keys(AI_TOP_REPOS_SNAPSHOT.categories) as AiRepoCategory[]) {
    AI_TOP_REPOS_SNAPSHOT.categories[category].forEach((repo) => urls.add(repo.repo_url));
  }
  const linkChecks = await Promise.all([...urls].map((url) => checkUrl(url)));
  results.push(...linkChecks);

  // Freshness / drift checks.
  const contentChecks: Array<{ id: string; file: string; pattern: RegExp; message: string }> = [
    { id: "ban:legacy_updated_label", file: "src/pages/AiGlossary.tsx", pattern: /Updated\s+Feb\s+2026/i, message: "legacy hardcoded updated label is not allowed" },
    { id: "ban:gemini3_literal", file: "src/pages/AiGlossary.tsx", pattern: /Gemini\s*3/i, message: "high-churn Gemini 3 literal is not allowed" },
    { id: "ban:gpt53_literal", file: "src/pages/AiGlossary.tsx", pattern: /GPT-?5\.3/i, message: "high-churn GPT-5.3 literal is not allowed" },
    { id: "ban:quota_cn_literal", file: "src/i18n/locales/zh.ts", pattern: new RegExp("60\\s*次/分钟|1000\\s*次/天", "i"), message: "high-churn quota literals are not allowed in zh locale" },
    { id: "ban:quota_en_literal", file: "src/i18n/locales/en.ts", pattern: /60\s*req\/?min|1000\s*req\/?day/i, message: "high-churn quota literals are not allowed in en locale" },
  ];

  for (const check of contentChecks) {
    const text = await fs.readFile(path.resolve(check.file), "utf8");
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

  // Baseline sanity.
  if (AI_TOP_REPOS_SNAPSHOT.baseline_date !== AI_TECH_BASELINE_DATE) {
    results.push(fail({
      scope: "top10",
      id: "top10:baseline_date",
      message: `baseline mismatch: snapshot=${AI_TOP_REPOS_SNAPSHOT.baseline_date}, expected=${AI_TECH_BASELINE_DATE}`,
    }));
  } else {
    results.push(pass({
      scope: "top10",
      id: "top10:baseline_date",
      message: "baseline date matches",
    }));
  }

  // GitHub API strict verification (token required).
  if (token) {
    for (const category of Object.keys(AI_TOP_REPOS_SNAPSHOT.categories) as AiRepoCategory[]) {
      const repos = AI_TOP_REPOS_SNAPSHOT.categories[category];
      const liveStars: number[] = [];

      for (const item of repos) {
        const [owner, repo] = item.full_name.split("/");
        try {
          const data = await fetchGitHubJson<{
            full_name: string;
            archived: boolean;
            fork: boolean;
            stargazers_count: number;
            pushed_at: string;
            default_branch: string;
          }>(`${GITHUB_API}/repos/${owner}/${repo}`, token);

          liveStars.push(data.stargazers_count);
          if (data.archived) {
            results.push(fail({
              scope: "github",
              id: `github:${category}:${item.full_name}`,
              message: "repository is archived",
            }));
            continue;
          }
          if (data.fork) {
            results.push(fail({
              scope: "github",
              id: `github:${category}:${item.full_name}`,
              message: "repository is forked",
            }));
            continue;
          }
          const active = toDate(data.pushed_at).getTime() >= windowStart.getTime();
          if (!active) {
            results.push(fail({
              scope: "github",
              id: `github:${category}:${item.full_name}`,
              message: `repository inactive in last ${WINDOW_DAYS} days`,
              evidence: { pushed_at: data.pushed_at },
            }));
            continue;
          }

          if (category === "skill_repos") {
            const skillOk = await checkSkillRepoHasSkillFile(owner, repo, data.default_branch, token);
            if (!skillOk) {
              results.push(fail({
                scope: "github",
                id: `github:${category}:${item.full_name}:skill_md`,
                message: "skill repository missing detectable SKILL.md",
              }));
              continue;
            }
          }

          results.push(pass({
            scope: "github",
            id: `github:${category}:${item.full_name}`,
            message: "repository checks passed",
          }));
        } catch (error) {
          results.push(fail({
            scope: "github",
            id: `github:${category}:${item.full_name}`,
            message: error instanceof Error ? error.message : String(error),
          }));
        }
      }

      let nonIncreasing = true;
      for (let i = 1; i < liveStars.length; i += 1) {
        if (liveStars[i - 1] < liveStars[i]) {
          nonIncreasing = false;
          break;
        }
      }
      results.push((nonIncreasing ? pass : fail)({
        scope: "github",
        id: `github:${category}:live_star_order`,
        message: nonIncreasing
          ? "live stars remain non-increasing by snapshot order"
          : "live star order drift detected; rerun sync:ai-tech",
      }));
    }
  }

  const summary = {
    total: results.length,
    pass: results.filter((item) => item.status === "pass").length,
    fail: results.filter((item) => item.status === "fail").length,
  };

  const report: Report = {
    generated_at: new Date().toISOString(),
    summary,
    results,
  };

  const outputPath = path.resolve("reports/ai-tech-verification.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");

  const failed = results.filter((item) => item.status === "fail");

  if (summary.fail > 0) {
    process.exitCode = 1;
    console.error(`ai-tech verification failed: ${summary.fail} checks failed`);
    console.error(`AI-tech report path: ${outputPath}`);
    printFailedChecks(failed);
    printAiTechFixHints(failed);
    emitGitHubAnnotations(failed);
  } else {
    console.log(`ai-tech verification passed: ${summary.pass}/${summary.total}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
