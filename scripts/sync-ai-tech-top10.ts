import fs from "node:fs/promises";
import path from "node:path";

import {
  AI_TECH_BASELINE_DATE,
  AI_TECH_REPO_CATEGORIES,
  type AiRepoCategory,
  type AiRepoRankItem,
  type AiTopReposSnapshot,
} from "../src/config/ai-tech-catalog/index.ts";
import { resolveGitHubToken } from "./lib/resolve-github-token.ts";

type GitHubSearchRepo = {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
  default_branch: string;
  archived: boolean;
  fork: boolean;
  description: string | null;
  topics?: string[];
};

type RepoLight = {
  full_name: string;
  repo_url: string;
  stars: number;
  pushed_at: string;
  default_branch: string;
  text: string;
  topics: string[];
};

const GITHUB_API = "https://api.github.com";
const WINDOW_DAYS = 365;
const REQUIRED_PER_CATEGORY = 10;
const GITHUB_MAX_ATTEMPTS = 3;

const CATEGORY_QUERIES: Record<AiRepoCategory, string[]> = {
  rd_efficiency_tools: [
    "topic:ai-coding-assistant stars:>200",
    "developer productivity ai in:name,description stars:>200",
    "workflow automation ai in:name,description stars:>200",
  ],
  skill_repos: [
    "topic:agent-skills stars:>20",
    "claude code skills in:name,description stars:>20",
    "codex skills in:name,description stars:>20",
  ],
  mcp_repos: [
    "topic:model-context-protocol stars:>20",
    "mcp server in:name,description stars:>20",
    "fastmcp in:name,description stars:>20",
  ],
  prompt_optimization_repos: [
    "topic:prompt-engineering stars:>100",
    "prompt optimizer in:name,description stars:>100",
    "prompt testing in:name,description stars:>100",
    "prompt evaluation in:name,description stars:>100",
  ],
  agent_repos: [
    "topic:ai-agent stars:>200",
    "topic:agent-framework stars:>200",
    "agentic in:name,description stars:>500",
  ],
};

function requireGitHubToken(): string {
  const tokenResolution = resolveGitHubToken();
  const token = tokenResolution.token || "";
  if (!token.trim()) {
    throw new Error(
      `GitHub token is required for strict sync:ai-tech (checked: GITHUB_TOKEN, GH_TOKEN, git credential helper${tokenResolution.reason ? `; reason: ${tokenResolution.reason}` : ""})`,
    );
  }
  return token.trim();
}

function toDate(value: string): Date {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return d;
}

function rollingWindowStart(now = new Date()): Date {
  return new Date(now.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
}

async function fetchJson<T>(url: string, token: string): Promise<T> {
  for (let attempt = 1; attempt <= GITHUB_MAX_ATTEMPTS; attempt += 1) {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "aix-helper-ai-tech-sync/1.0",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (resp.ok) {
        return await resp.json() as T;
      }

      const body = await resp.text();
      const remaining = resp.headers.get("x-ratelimit-remaining");
      const retryable = resp.status === 429
        || resp.status >= 500
        || (resp.status === 403 && (remaining === "0" || /rate limit/i.test(body)));
      if (retryable && attempt < GITHUB_MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        continue;
      }
      throw new Error(`GitHub request failed (${resp.status}) for ${url}: ${body.slice(0, 300)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const retryable = /aborted|timeout|timed out|fetch failed|network/i.test(message);
      if (retryable && attempt < GITHUB_MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        continue;
      }
      throw error;
    }
  }
  throw new Error(`GitHub request failed for ${url}: exhausted retry attempts`);
}

async function searchRepos(query: string, token: string, perPage = 50): Promise<GitHubSearchRepo[]> {
  const encoded = encodeURIComponent(query);
  const url = `${GITHUB_API}/search/repositories?q=${encoded}&sort=stars&order=desc&per_page=${perPage}`;
  const payload = await fetchJson<{ items: GitHubSearchRepo[] }>(url, token);
  return payload.items || [];
}

function repoText(repo: GitHubSearchRepo): string {
  return `${repo.full_name} ${repo.description || ""}`.toLowerCase();
}

function normalizeRepo(repo: GitHubSearchRepo): RepoLight {
  return {
    full_name: repo.full_name,
    repo_url: repo.html_url,
    stars: repo.stargazers_count,
    pushed_at: repo.pushed_at,
    default_branch: repo.default_branch,
    text: repoText(repo),
    topics: (repo.topics || []).map((v) => v.toLowerCase()),
  };
}

function isActiveWithinWindow(pushed_at: string, now = new Date()): boolean {
  return toDate(pushed_at).getTime() >= rollingWindowStart(now).getTime();
}

function categoryMatch(category: AiRepoCategory, repo: RepoLight): boolean {
  const needles = AI_TECH_REPO_CATEGORIES.find((item) => item.id === category)?.keywords || [];
  const blob = `${repo.text} ${repo.topics.join(" ")}`;
  return needles.some((needle) => blob.includes(needle.toLowerCase()));
}

async function hasSkillMd(repo: RepoLight, token: string): Promise<boolean> {
  const [owner, name] = repo.full_name.split("/");
  const branchRef = encodeURIComponent(repo.default_branch || "HEAD");
  const url = `${GITHUB_API}/repos/${owner}/${name}/git/trees/${branchRef}?recursive=1`;
  const payload = await fetchJson<{
    tree?: Array<{ path?: string; type?: string }>;
  }>(url, token);
  return (payload.tree || []).some((entry) => {
    if (entry.type !== "blob" || !entry.path) return false;
    const fileName = entry.path.split("/").pop() || "";
    return fileName.toLowerCase() === "skill.md";
  });
}

function activityScore(pushedAt: string, now = new Date()): number {
  const days = Math.max(0, Math.floor((now.getTime() - toDate(pushedAt).getTime()) / (24 * 60 * 60 * 1000)));
  if (days <= 30) return 100;
  if (days <= 90) return 85;
  if (days <= 180) return 70;
  if (days <= 270) return 55;
  if (days <= 365) return 40;
  return 0;
}

function starPercentile(rank: number, total: number): number {
  if (total <= 1) return 100;
  return ((total - rank) / (total - 1)) * 100;
}

function recommendedStars(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score >= 85) return 5;
  if (score >= 70) return 4;
  if (score >= 55) return 3;
  if (score >= 40) return 2;
  return 1;
}

function recommendationNote(category: AiRepoCategory, score: number) {
  const noteHigh = {
    zh: "综合 stars 与活跃度表现领先，建议优先纳入生产工具链。",
    en: "Strong stars and activity profile; recommended for production adoption.",
  };
  const noteMid = {
    zh: "具备稳定实践价值，建议在标准流程中按场景引入。",
    en: "Stable practical value; recommended for scenario-based standard adoption.",
  };
  const noteLow = {
    zh: "建议先在试点项目验证后再扩大使用范围。",
    en: "Validate in pilot projects before broader rollout.",
  };
  if (score >= 70) return noteHigh;
  if (score >= 40) return noteMid;
  return noteLow;
}

function categoryScenario(category: AiRepoCategory) {
  const map: Record<AiRepoCategory, { zh: string; en: string }> = {
    rd_efficiency_tools: {
      zh: "研发提效、任务协同、发布与回归自动化。",
      en: "Engineering acceleration, collaboration, release, and regression automation.",
    },
    skill_repos: {
      zh: "Skill 资产复用、团队经验沉淀与工程治理。",
      en: "Skill reuse, team knowledge codification, and engineering governance.",
    },
    mcp_repos: {
      zh: "标准化工具接入、检索增强与跨系统自动化。",
      en: "Standardized tool integration, retrieval augmentation, and cross-system automation.",
    },
    prompt_optimization_repos: {
      zh: "提示词设计、评测对比、优化迭代与安全治理。",
      en: "Prompt design, evaluation, optimization, and safety governance.",
    },
    agent_repos: {
      zh: "多 Agent 编排、任务分解与闭环执行。",
      en: "Multi-agent orchestration, task decomposition, and closed-loop execution.",
    },
  };
  return map[category];
}

function asSnapshot(category: AiRepoCategory, items: RepoLight[], now: Date): AiRepoRankItem[] {
  return items.map((item, index) => {
    const rank = index + 1;
    const percentile = starPercentile(rank, items.length);
    const score = 0.7 * percentile + 0.3 * activityScore(item.pushed_at, now);
    const stars = recommendedStars(score);
    return {
      category,
      rank,
      full_name: item.full_name,
      repo_url: item.repo_url,
      stars: item.stars,
      pushed_at: item.pushed_at,
      recommended_stars: stars,
      recommendation_note: recommendationNote(category, score),
      app_scenarios: categoryScenario(category),
      verification: {
        last_verified_at: AI_TECH_BASELINE_DATE,
        verification_status: "pass",
        verification_reason: "GitHub API 数据采集与活跃度窗口校验通过。",
        source_url: item.repo_url,
        verification_source: "github_api",
      },
    };
  });
}

async function buildCategory(category: AiRepoCategory, token: string, now: Date): Promise<AiRepoRankItem[]> {
  const uniq = new Map<string, RepoLight>();
  for (const query of CATEGORY_QUERIES[category]) {
    const rows = await searchRepos(query, token, 50);
    for (const row of rows) {
      if (row.archived || row.fork) continue;
      if (!isActiveWithinWindow(row.pushed_at, now)) continue;
      const normalized = normalizeRepo(row);
      if (!categoryMatch(category, normalized)) continue;
      uniq.set(normalized.full_name.toLowerCase(), normalized);
    }
  }

  let candidates = [...uniq.values()].sort((a, b) =>
    b.stars - a.stars || toDate(b.pushed_at).getTime() - toDate(a.pushed_at).getTime(),
  );

  if (category === "skill_repos") {
    const picked: RepoLight[] = [];
    for (const item of candidates) {
      if (picked.length >= REQUIRED_PER_CATEGORY) break;
      // Strict rule: skill repositories must contain at least one SKILL.md.
      if (await hasSkillMd(item, token)) {
        picked.push(item);
      }
    }
    candidates = picked;
  }

  if (candidates.length < REQUIRED_PER_CATEGORY) {
    throw new Error(`Category ${category} has only ${candidates.length} valid repositories, require ${REQUIRED_PER_CATEGORY}`);
  }

  return asSnapshot(category, candidates.slice(0, REQUIRED_PER_CATEGORY), now);
}

async function main() {
  const token = requireGitHubToken();
  const now = new Date();
  const categories: AiTopReposSnapshot["categories"] = {
    rd_efficiency_tools: [],
    skill_repos: [],
    mcp_repos: [],
    prompt_optimization_repos: [],
    agent_repos: [],
  };

  for (const category of Object.keys(categories) as AiRepoCategory[]) {
    categories[category] = await buildCategory(category, token, now);
  }

  const snapshot: AiTopReposSnapshot = {
    generated_at: now.toISOString(),
    baseline_date: AI_TECH_BASELINE_DATE,
    source_policy: {
      zh: "官方优先 + 主流平台补充；数据由 GitHub API 采集。",
      en: "Official-first with mainstream platform support; data collected via GitHub API.",
    },
    rank_policy: {
      zh: "按 stars 降序，且仓库最近 12 个月有活跃提交。",
      en: "Sorted by stars descending with activity required in the last 12 months.",
    },
    categories,
  };

  const target = path.resolve("src/config/ai-tech-catalog/top-repos.generated.ts");
  const content = `import type { AiTopReposSnapshot } from "./types";\n\nexport const AI_TOP_REPOS_SNAPSHOT: AiTopReposSnapshot = ${JSON.stringify(snapshot, null, 2)};\n`;
  await fs.writeFile(target, content, "utf8");

  console.log(`AI top repositories snapshot written: ${target}`);
  for (const category of Object.keys(snapshot.categories) as AiRepoCategory[]) {
    console.log(`${category}: ${snapshot.categories[category].length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
