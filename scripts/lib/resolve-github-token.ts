import { spawnSync } from "node:child_process";

export type GitHubTokenSource = "env:GITHUB_TOKEN" | "env:GH_TOKEN" | "git:credential" | "missing";

export type GitHubTokenResolution = {
  token: string;
  source: GitHubTokenSource;
  reason?: string;
};

function readEnvToken(name: "GITHUB_TOKEN" | "GH_TOKEN"): string {
  return (process.env[name] || "").trim();
}

function readGitCredentialToken(): GitHubTokenResolution {
  try {
    const result = spawnSync("git", ["credential", "fill"], {
      input: "protocol=https\nhost=github.com\n\n",
      encoding: "utf8",
      timeout: 3000,
      windowsHide: true,
    });

    if (result.error) {
      return {
        token: "",
        source: "missing",
        reason: `git credential helper error: ${result.error.message}`,
      };
    }
    if (result.status !== 0) {
      return {
        token: "",
        source: "missing",
        reason: `git credential helper exited with code ${String(result.status)}`,
      };
    }

    const output = result.stdout || "";
    const line = output
      .split(/\r?\n/)
      .find((row) => row.toLowerCase().startsWith("password="));
    const token = line ? line.slice("password=".length).trim() : "";
    if (!token) {
      return {
        token: "",
        source: "missing",
        reason: "git credential helper returned no password field",
      };
    }
    return {
      token,
      source: "git:credential",
    };
  } catch (error) {
    return {
      token: "",
      source: "missing",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

export function resolveGitHubToken(): GitHubTokenResolution {
  const fromGithubToken = readEnvToken("GITHUB_TOKEN");
  if (fromGithubToken) {
    return {
      token: fromGithubToken,
      source: "env:GITHUB_TOKEN",
    };
  }

  const fromGhToken = readEnvToken("GH_TOKEN");
  if (fromGhToken) {
    return {
      token: fromGhToken,
      source: "env:GH_TOKEN",
    };
  }

  return readGitCredentialToken();
}
