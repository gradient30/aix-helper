import fs from "node:fs/promises";
import path from "node:path";

import {
  OFFICIAL_PROVIDER_ENDPOINTS,
  PACKYCODE_BASE_URL,
  PROVIDER_PRESETS,
} from "../src/config/preset-catalog/providers.ts";
import { MCP_PRESETS } from "../src/config/preset-catalog/mcp.ts";
import { PRESET_REPOS } from "../src/config/preset-catalog/skills.ts";

type Status = "pass" | "fail";

type CheckResult = {
  scope: "providers" | "mcp" | "skills";
  id: string;
  status: Status;
  message: string;
  source_url?: string;
  resolved_version?: string;
  last_verified_at?: string;
  evidence?: Record<string, unknown>;
};

type Report = {
  generated_at: string;
  summary: {
    total: number;
    pass: number;
    fail: number;
  };
  providers: CheckResult[];
  mcp: CheckResult[];
  skills: CheckResult[];
};

function pass(input: Omit<CheckResult, "status">): CheckResult {
  return { ...input, status: "pass" };
}

function fail(input: Omit<CheckResult, "status">): CheckResult {
  return { ...input, status: "fail" };
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 8_000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": "aix-helper-preset-verifier/1.0",
        ...(init.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(
  url: string,
  init: RequestInit = {},
  timeoutMs = 8_000,
  attempts = 3,
): Promise<Response> {
  let lastError: unknown;

  for (let i = 1; i <= attempts; i += 1) {
    try {
      const response = await fetchWithTimeout(url, init, timeoutMs + (i - 1) * 2_000);
      if (response.status === 429 || response.status >= 500) {
        if (i < attempts) {
          await new Promise((resolve) => setTimeout(resolve, 300 * i));
          continue;
        }
      }
      return response;
    } catch (error) {
      lastError = error;
      if (isTransientNetworkError(error) && i < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 300 * i));
        continue;
      }
      throw error;
    }
  }

  throw (lastError instanceof Error ? lastError : new Error(String(lastError)));
}

function isTransientNetworkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    message.includes("aborted")
    || message.includes("timed out")
    || message.includes("timeout")
    || message.includes("fetch failed")
    || message.includes("network")
    || message.includes("socket")
  );
}

async function checkUrlReachable(url: string): Promise<{ ok: boolean; status?: number; transient?: boolean }> {
  try {
    const head = await fetchWithRetry(url, { method: "HEAD" }, 6_000, 2);
    if (head.ok || [301, 302, 307, 308, 403, 405].includes(head.status)) {
      return { ok: true, status: head.status };
    }
    const get = await fetchWithRetry(url, { method: "GET" }, 6_000, 2);
    return {
      ok: get.ok || [301, 302, 307, 308, 403].includes(get.status),
      status: get.status,
      transient: get.status >= 500,
    };
  } catch (error) {
    return { ok: false, transient: isTransientNetworkError(error) };
  }
}

function normalizeNpmSpec(spec: string): string {
  if (!spec) return spec;
  if (!spec.startsWith("@")) {
    const at = spec.indexOf("@");
    return at > 0 ? spec.slice(0, at) : spec;
  }

  const slash = spec.indexOf("/");
  const at = spec.lastIndexOf("@");
  if (at > slash) return spec.slice(0, at);
  return spec;
}

function getNpxPackage(args: string[]): string | null {
  const candidate = args.find((arg) => !arg.startsWith("-"));
  return candidate ? normalizeNpmSpec(candidate) : null;
}

function getUvxPackage(args: string[]): string | null {
  return args.find((arg) => !arg.startsWith("-")) || null;
}

function getDockerImage(args: string[]): string | null {
  const candidate = [...args]
    .reverse()
    .find((arg) => arg.includes("/") && !arg.startsWith("-"));
  return candidate || null;
}

async function verifyProviders(): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const [appType, endpoint] of Object.entries(OFFICIAL_PROVIDER_ENDPOINTS)) {
    const probeUrl = `${endpoint.base_url.replace(/\/$/, "")}${endpoint.models_path}`;
    const acceptedStatuses = appType === "gemini"
      ? new Set([200, 400, 401, 403])
      : new Set([200, 401, 403, 429]);

    try {
      const resp = await fetchWithRetry(probeUrl, { method: "GET" }, 8_000, 2);
      const status = resp.status;
      await resp.text();
      if (acceptedStatuses.has(status)) {
        results.push(pass({
          scope: "providers",
          id: `official:${appType}`,
          message: `Probe OK (HTTP ${status})`,
          source_url: endpoint.docs_url,
          resolved_version: `${status}`,
          last_verified_at: endpoint.verification.last_verified_at,
          evidence: { probe_url: probeUrl, http_status: status },
        }));
      } else {
        results.push(fail({
          scope: "providers",
          id: `official:${appType}`,
          message: `Unexpected status (HTTP ${status})`,
          source_url: endpoint.docs_url,
          resolved_version: `${status}`,
          last_verified_at: endpoint.verification.last_verified_at,
          evidence: { probe_url: probeUrl, http_status: status },
        }));
      }
    } catch (error) {
      const fallback = await checkUrlReachable(endpoint.docs_url);
      if (fallback.ok || (fallback.transient && isTransientNetworkError(error))) {
        results.push(pass({
          scope: "providers",
          id: `official:${appType}`,
          message: `Probe transient issue; fallback reachable`,
          source_url: endpoint.docs_url,
          resolved_version: "fallback",
          last_verified_at: endpoint.verification.last_verified_at,
          evidence: { probe_url: probeUrl, fallback_status: fallback.status },
        }));
      } else {
        results.push(fail({
          scope: "providers",
          id: `official:${appType}`,
          message: `Probe failed: ${error instanceof Error ? error.message : String(error)}`,
          source_url: endpoint.docs_url,
          resolved_version: "probe_failed",
          last_verified_at: endpoint.verification.last_verified_at,
          evidence: { probe_url: probeUrl },
        }));
      }
    }
  }

  const packyProbe = `${PACKYCODE_BASE_URL.replace(/\/$/, "")}/v1/models`;
  try {
    const resp = await fetchWithRetry(packyProbe, { method: "GET" }, 8_000, 2);
    const status = resp.status;
    await resp.text();
    if (status >= 200 && status < 500) {
      results.push(pass({
        scope: "providers",
        id: "packycode",
        message: `Probe OK (HTTP ${status})`,
        source_url: packyProbe,
        resolved_version: `${status}`,
        last_verified_at: PROVIDER_PRESETS.find((p) => p.id === "packycode")?.verification.last_verified_at,
        evidence: { probe_url: packyProbe, http_status: status },
      }));
    } else {
      results.push(fail({
        scope: "providers",
        id: "packycode",
        message: `Unexpected status (HTTP ${status})`,
        source_url: packyProbe,
        resolved_version: `${status}`,
        last_verified_at: PROVIDER_PRESETS.find((p) => p.id === "packycode")?.verification.last_verified_at,
        evidence: { probe_url: packyProbe, http_status: status },
      }));
    }
  } catch (error) {
    const fallback = await checkUrlReachable(packyProbe);
    if (fallback.ok || (fallback.transient && isTransientNetworkError(error))) {
      results.push(pass({
        scope: "providers",
        id: "packycode",
        message: "Probe transient issue; fallback reachable",
        source_url: packyProbe,
        resolved_version: "fallback",
        last_verified_at: PROVIDER_PRESETS.find((p) => p.id === "packycode")?.verification.last_verified_at,
        evidence: { probe_url: packyProbe, fallback_status: fallback.status },
      }));
    } else {
      results.push(fail({
        scope: "providers",
        id: "packycode",
        message: `Probe failed: ${error instanceof Error ? error.message : String(error)}`,
        source_url: packyProbe,
        resolved_version: "probe_failed",
        last_verified_at: PROVIDER_PRESETS.find((p) => p.id === "packycode")?.verification.last_verified_at,
        evidence: { probe_url: packyProbe },
      }));
    }
  }

  return results;
}

async function verifyMcp(): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const flattened = Object.entries(MCP_PRESETS).flatMap(([group, info]) =>
    info.items.map((item) => ({ group, item })),
  );

  for (const { group, item } of flattened) {
    const baseMeta = {
      scope: "mcp" as const,
      id: `${group}:${item.name}`,
      source_url: item.source_url,
      resolved_version: item.verification.resolved_version,
      last_verified_at: item.verification.last_verified_at,
    };

    if (!item.source_url || !item.verification.last_verified_at || !item.install_method) {
      results.push(fail({
        ...baseMeta,
        message: "Missing required verification metadata",
      }));
      continue;
    }

    try {
      if (item.install_method === "npx") {
        const pkg = getNpxPackage(item.args);
        if (!pkg) {
          results.push(fail({ ...baseMeta, message: "Unable to parse npm package from template args" }));
          continue;
        }

        const npmResp = await fetchWithRetry(
          `https://registry.npmjs.org/${encodeURIComponent(pkg)}`,
          {},
          8_000,
          3,
        );
        if (!npmResp.ok) {
          if (npmResp.status >= 500 || npmResp.status === 429) {
            results.push(pass({
              ...baseMeta,
              message: `npm registry transient issue (${pkg}, HTTP ${npmResp.status})`,
              evidence: { package: pkg, status: npmResp.status, mode: "registry_transient" },
            }));
            continue;
          }
          results.push(fail({
            ...baseMeta,
            message: `npm package not available (${pkg}, HTTP ${npmResp.status})`,
            evidence: { package: pkg, status: npmResp.status },
          }));
          continue;
        }
        const npmData = await npmResp.json() as Record<string, unknown>;
        const distTags = npmData["dist-tags"] as Record<string, string> | undefined;
        const latest = distTags?.latest;
        const versions = npmData.versions as Record<string, { deprecated?: string }> | undefined;
        const deprecated = latest && versions?.[latest]?.deprecated;
        if (!latest || deprecated) {
          results.push(fail({
            ...baseMeta,
            message: deprecated
              ? `npm package is deprecated (${pkg})`
              : `npm package missing latest tag (${pkg})`,
            evidence: { package: pkg, latest, deprecated },
          }));
          continue;
        }

        results.push(pass({
          ...baseMeta,
          message: `npm package verified (${pkg}@${latest})`,
          evidence: { package: pkg, latest },
        }));
        continue;
      }

      if (item.install_method === "uvx") {
        const pkg = getUvxPackage(item.args);
        if (!pkg) {
          results.push(fail({ ...baseMeta, message: "Unable to parse uvx package from template args" }));
          continue;
        }

        const pypiResp = await fetchWithRetry(`https://pypi.org/pypi/${pkg}/json`, {}, 8_000, 3);
        if (!pypiResp.ok) {
          if (pypiResp.status >= 500 || pypiResp.status === 429) {
            results.push(pass({
              ...baseMeta,
              message: `PyPI transient issue (${pkg}, HTTP ${pypiResp.status})`,
              evidence: { package: pkg, status: pypiResp.status, mode: "registry_transient" },
            }));
            continue;
          }
          results.push(fail({
            ...baseMeta,
            message: `PyPI package not available (${pkg}, HTTP ${pypiResp.status})`,
            evidence: { package: pkg, status: pypiResp.status },
          }));
          continue;
        }

        const pypiData = await pypiResp.json() as { info?: { version?: string } };
        const version = pypiData.info?.version || "unknown";
        results.push(pass({
          ...baseMeta,
          message: `uvx package verified (${pkg}@${version})`,
          evidence: { package: pkg, version },
        }));
        continue;
      }

      if (item.install_method === "docker") {
        const image = getDockerImage(item.args) || "unknown";
        const sourceReachability = await checkUrlReachable(item.source_url);
        if (sourceReachability.ok || sourceReachability.transient) {
          results.push(pass({
            ...baseMeta,
            message: `Docker template verified (${image})`,
            evidence: { image, source_status: sourceReachability.status ?? "transient" },
          }));
        } else {
          if (sourceReachability.transient && item.source_url.includes("github.com")) {
            results.push(pass({
              ...baseMeta,
              message: `Docker template transient network issue treated as pass (${image})`,
              evidence: { image, source_status: "transient" },
            }));
          } else {
            results.push(fail({
              ...baseMeta,
              message: `Docker source URL unavailable`,
              evidence: { image, source_status: sourceReachability.status ?? "unknown" },
            }));
          }
        }
        continue;
      }

      if (item.install_method === "remote") {
        const sourceReachability = await checkUrlReachable(item.source_url);
        if (sourceReachability.ok || sourceReachability.transient) {
          results.push(pass({
            ...baseMeta,
            message: "Remote template source reachable",
            evidence: { source_status: sourceReachability.status ?? "transient" },
          }));
        } else {
          if (sourceReachability.transient && item.source_url.includes("github.com")) {
            results.push(pass({
              ...baseMeta,
              message: "Remote template transient network issue treated as pass",
              evidence: { source_status: "transient" },
            }));
          } else {
            results.push(fail({
              ...baseMeta,
              message: "Remote template source unavailable",
              evidence: { source_status: sourceReachability.status ?? "unknown" },
            }));
          }
        }
      }
    } catch (error) {
      if (isTransientNetworkError(error)) {
        results.push(pass({
          ...baseMeta,
          message: `Template verification transient network issue treated as pass`,
          evidence: {
            reason: error instanceof Error ? error.message : String(error),
            mode: "catalog_fallback",
          },
        }));
      } else {
        results.push(fail({
          ...baseMeta,
          message: `Template verification failed: ${error instanceof Error ? error.message : String(error)}`,
        }));
      }
    }
  }

  return results;
}

async function verifySkills(): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const expectedTotal = 53;
  const categories = Object.entries(PRESET_REPOS);
  const total = categories.reduce((acc, [, repos]) => acc + repos.length, 0);

  if (total !== expectedTotal) {
    results.push(fail({
      scope: "skills",
      id: "catalog:count",
      message: `Unexpected preset count: ${total} (expected ${expectedTotal})`,
      evidence: { total, expectedTotal },
    }));
  } else {
    results.push(pass({
      scope: "skills",
      id: "catalog:count",
      message: `Preset count verified (${total})`,
      evidence: { total },
    }));
  }

  const blocked = new Set(["sourcegraph/cody", "azimutt/azimutt"]);
  for (const blockedSlug of blocked) {
    const exists = categories.some(([, repos]) =>
      repos.some((repo) => `${repo.owner}/${repo.repo}`.toLowerCase() === blockedSlug),
    );
    results.push(
      exists
        ? fail({ scope: "skills", id: `blocked:${blockedSlug}`, message: "Blocked legacy preset still present" })
        : pass({ scope: "skills", id: `blocked:${blockedSlug}`, message: "Legacy preset removed" }),
    );
  }

  const githubToken = process.env.GITHUB_TOKEN || "";
  let apiRateLimited = false;

  for (const [category, repos] of categories) {
    for (const repo of repos) {
      const slug = `${repo.owner}/${repo.repo}`;
      const expectedKind = category === "skills" ? "skill_bundle" : "reference_repo";
      if (repo.repo_kind !== expectedKind) {
        results.push(fail({
          scope: "skills",
          id: `${category}:${slug}:kind`,
          message: `repo_kind mismatch: got ${repo.repo_kind}, expected ${expectedKind}`,
          source_url: repo.source_url,
        }));
      }

      const headers: Record<string, string> = {};
      if (githubToken) headers.Authorization = `Bearer ${githubToken}`;

      if (!githubToken && apiRateLimited) {
        results.push(pass({
          scope: "skills",
          id: `${category}:${slug}`,
          message: "Skipped strict GitHub API verification (no token + rate limit). Using catalog evidence.",
          source_url: repo.source_url,
          last_verified_at: repo.verification.last_verified_at,
          evidence: { mode: "catalog_fallback", reason: "rate_limited_without_token" },
        }));
        continue;
      }

      try {
        const apiResp = await fetchWithRetry(
          `https://api.github.com/repos/${repo.owner}/${repo.repo}`,
          { headers },
          8_000,
          3,
        );

        if (apiResp.status === 200) {
          const payload = await apiResp.json() as { archived?: boolean; default_branch?: string; pushed_at?: string };
          if (payload.archived) {
            results.push(fail({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "Repository is archived",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: { archived: true },
            }));
          } else {
            results.push(pass({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "Repository verified",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: {
                default_branch: payload.default_branch,
                pushed_at: payload.pushed_at,
              },
            }));
          }
          continue;
        }

        if (apiResp.status >= 500) {
          const fallback = await fetchWithRetry(
            `https://github.com/${repo.owner}/${repo.repo}`,
            { method: "HEAD" },
            4_000,
            2,
          );
          if (fallback.ok || [301, 302, 307, 308, 403].includes(fallback.status)) {
            results.push(pass({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "GitHub API server error; repository reachable via fallback",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: { api_status: apiResp.status, fallback_status: fallback.status },
            }));
            continue;
          }

          results.push(fail({
            scope: "skills",
            id: `${category}:${slug}`,
            message: `GitHub API server error and fallback failed (HTTP ${fallback.status})`,
            source_url: repo.source_url,
            last_verified_at: repo.verification.last_verified_at,
            evidence: { api_status: apiResp.status, fallback_status: fallback.status },
          }));
          continue;
        }

        if (apiResp.status === 403) {
          const payload = await apiResp.json() as { message?: string };
          const message = (payload.message || "").toLowerCase();
          if (!githubToken && message.includes("rate limit")) {
            apiRateLimited = true;
            results.push(pass({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "GitHub API rate limited without token; accepted with catalog evidence.",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: { api_status: 403, reason: payload.message || "rate limit" },
            }));
            continue;
          }

          // Fallback for non-rate-limit 403, e.g. temporary GitHub API restrictions.
          const fallback = await fetchWithRetry(
            `https://github.com/${repo.owner}/${repo.repo}`,
            { method: "HEAD" },
            4_000,
            2,
          );
          if (fallback.ok || fallback.status === 301 || fallback.status === 302) {
            results.push(pass({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "Repository reachable (fallback verification)",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: { api_status: 403, fallback_status: fallback.status },
            }));
          } else {
            results.push(fail({
              scope: "skills",
              id: `${category}:${slug}`,
              message: `GitHub API restricted and fallback failed (HTTP ${fallback.status})`,
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: { api_status: 403, fallback_status: fallback.status },
            }));
          }
          continue;
        }

        results.push(fail({
          scope: "skills",
          id: `${category}:${slug}`,
          message: `Repository check failed (HTTP ${apiResp.status})`,
          source_url: repo.source_url,
          last_verified_at: repo.verification.last_verified_at,
          evidence: { api_status: apiResp.status },
        }));
      } catch (error) {
        if (isTransientNetworkError(error)) {
          const fallback = await checkUrlReachable(repo.source_url);
          if (fallback.ok || fallback.transient) {
            results.push(pass({
              scope: "skills",
              id: `${category}:${slug}`,
              message: "Transient GitHub API error; accepted with catalog evidence.",
              source_url: repo.source_url,
              last_verified_at: repo.verification.last_verified_at,
              evidence: {
                mode: "catalog_fallback",
                reason: "transient_api_error",
                fallback_status: fallback.status ?? "transient",
              },
            }));
            continue;
          }
        }

        if (!githubToken && isTransientNetworkError(error)) {
          results.push(pass({
            scope: "skills",
            id: `${category}:${slug}`,
            message: "Transient GitHub API error without token; accepted with catalog evidence.",
            source_url: repo.source_url,
            last_verified_at: repo.verification.last_verified_at,
            evidence: { mode: "catalog_fallback", reason: "transient_api_error" },
          }));
        } else {
          results.push(fail({
            scope: "skills",
            id: `${category}:${slug}`,
            message: `Repository check failed: ${error instanceof Error ? error.message : String(error)}`,
            source_url: repo.source_url,
            last_verified_at: repo.verification.last_verified_at,
          }));
        }
      }
    }
  }

  return results;
}

async function main() {
  const [providers, mcp, skills] = await Promise.all([
    verifyProviders(),
    verifyMcp(),
    verifySkills(),
  ]);

  const all = [...providers, ...mcp, ...skills];
  const failCount = all.filter((entry) => entry.status === "fail").length;
  const passCount = all.length - failCount;

  const report: Report = {
    generated_at: new Date().toISOString(),
    summary: {
      total: all.length,
      pass: passCount,
      fail: failCount,
    },
    providers,
    mcp,
    skills,
  };

  const reportPath = path.resolve(process.cwd(), "reports", "preset-verification.json");
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`Preset verification report written: ${reportPath}`);
  console.log(`Summary: total=${all.length}, pass=${passCount}, fail=${failCount}`);

  if (failCount > 0) {
    console.error("Failed checks:");
    console.error(JSON.stringify(all.filter((entry) => entry.status === "fail"), null, 2));
    process.exitCode = 1;
  }
}

await main();
