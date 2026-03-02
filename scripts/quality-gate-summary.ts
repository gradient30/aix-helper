import fs from "node:fs/promises";
import path from "node:path";

type Status = "pass" | "fail";

type CheckResult = {
  scope: string;
  id: string;
  status: Status;
  message: string;
  evidence?: Record<string, unknown>;
};

type FlatReport = {
  summary?: {
    total: number;
    pass: number;
    fail: number;
  };
  results?: CheckResult[];
  providers?: CheckResult[];
  mcp?: CheckResult[];
  skills?: CheckResult[];
};

type ReportView = {
  name: string;
  path: string;
  summary: { total: number; pass: number; fail: number } | null;
  failed: CheckResult[];
  missing: boolean;
};

const REPORT_SPECS = [
  { name: "preset", path: "reports/preset-verification.json" },
  { name: "guides", path: "reports/guide-verification.json" },
  { name: "ai-tech", path: "reports/ai-tech-verification.json" },
] as const;

function collectChecks(report: FlatReport): CheckResult[] {
  if (Array.isArray(report.results)) return report.results;

  const groups = [report.providers, report.mcp, report.skills].filter((v): v is CheckResult[] => Array.isArray(v));
  return groups.flat();
}

function formatScope(scope: string): string {
  return scope || "unknown";
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function formatEvidenceSnippet(item: CheckResult): string {
  if (!item.evidence) return "";

  if (item.id.includes(":live_star_order")) {
    const severe = asNumber(item.evidence.severe_inversion_count);
    const minor = asNumber(item.evidence.minor_inversion_count);
    const maxSevere = asNumber(item.evidence.max_severe_delta);
    const maxMinor = asNumber(item.evidence.max_minor_delta);
    const tokens: string[] = [];

    if (severe !== null) tokens.push(`severe=${severe}`);
    if (minor !== null) tokens.push(`minor=${minor}`);
    if (maxSevere !== null) tokens.push(`max_severe_delta=${maxSevere}`);
    if (maxMinor !== null) tokens.push(`max_minor_delta=${maxMinor}`);

    return tokens.length ? ` (evidence: ${tokens.join(", ")})` : "";
  }

  if (item.scope === "links") {
    const status = asNumber(item.evidence.status);
    if (status !== null) return ` (evidence: status=${status})`;
  }

  return "";
}

function buildHints(failed: CheckResult[]): string[] {
  const hints = new Set<string>();

  failed.forEach((item) => {
    if (item.id.includes(":live_star_order")) {
      hints.add("检测到 stars 顺序漂移时，运行 `npm run sync:ai-tech` 并提交 `top-repos.generated.ts`。");
    }
    if (item.scope === "links" && item.id.startsWith("url:")) {
      hints.add("链接类失败优先检查 `source_url` 是否已变更并更新到官方最新地址。");
    }
    if (item.id === "github:token") {
      hints.add("若出现 `github:token` 失败，确认 CI 已注入 `GITHUB_TOKEN` 或 `GH_TOKEN`。");
    }
    if (item.scope === "i18n") {
      hints.add("i18n 失败需同步中英文键集合，避免键集不一致。");
    }
  });

  return [...hints];
}

async function loadReport(name: string, filePath: string): Promise<ReportView> {
  const absolute = path.resolve(filePath);
  try {
    const raw = await fs.readFile(absolute, "utf8");
    const json = JSON.parse(raw) as FlatReport;
    const checks = collectChecks(json);
    const failed = checks.filter((item) => item.status === "fail");
    return {
      name,
      path: filePath,
      summary: json.summary ?? { total: checks.length, pass: checks.length - failed.length, fail: failed.length },
      failed,
      missing: false,
    };
  } catch {
    return {
      name,
      path: filePath,
      summary: null,
      failed: [],
      missing: true,
    };
  }
}

async function writeGithubStepSummary(views: ReportView[]): Promise<void> {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;

  const lines: string[] = [];
  lines.push("## Quality Gate Report Summary");
  lines.push("");
  lines.push("| Report | Total | Pass | Fail | Status |");
  lines.push("| --- | ---: | ---: | ---: | --- |");

  views.forEach((view) => {
    if (view.missing || !view.summary) {
      lines.push(`| ${view.name} | - | - | - | missing |`);
      return;
    }
    const status = view.summary.fail > 0 ? "failed" : "passed";
    lines.push(`| ${view.name} | ${view.summary.total} | ${view.summary.pass} | ${view.summary.fail} | ${status} |`);
  });

  lines.push("");

  views.forEach((view) => {
    if (view.missing) {
      lines.push(`### ${view.name}`);
      lines.push(`- report missing: \`${view.path}\``);
      lines.push("");
      return;
    }

    if (!view.failed.length) return;

    lines.push(`### ${view.name} failed checks (${view.failed.length})`);
    view.failed.slice(0, 20).forEach((item) => {
      lines.push(`- [${formatScope(item.scope)}] \`${item.id}\`: ${item.message}${formatEvidenceSnippet(item)}`);
    });
    if (view.failed.length > 20) {
      lines.push(`- ... and ${view.failed.length - 20} more`);
    }
    lines.push("");
  });

  const hints = buildHints(views.flatMap((view) => view.failed));
  if (hints.length) {
    lines.push("### Quick Fix Hints");
    hints.forEach((hint) => lines.push(`- ${hint}`));
    lines.push("");
  }

  await fs.appendFile(summaryPath, `${lines.join("\n")}\n`, "utf8");
}

async function main(): Promise<void> {
  const views = await Promise.all(REPORT_SPECS.map((item) => loadReport(item.name, item.path)));

  console.log("=== quality-gate report summary ===");
  views.forEach((view) => {
    if (view.missing || !view.summary) {
      console.log(`[${view.name}] report missing: ${view.path}`);
      return;
    }
    console.log(`[${view.name}] total=${view.summary.total} pass=${view.summary.pass} fail=${view.summary.fail}`);
    if (view.failed.length > 0) {
      view.failed.slice(0, 20).forEach((item, index) => {
        console.log(`  ${index + 1}. [${formatScope(item.scope)}] ${item.id} - ${item.message}${formatEvidenceSnippet(item)}`);
      });
      if (view.failed.length > 20) {
        console.log(`  ... and ${view.failed.length - 20} more`);
      }
    }
  });

  const hints = buildHints(views.flatMap((view) => view.failed));
  if (hints.length > 0) {
    console.log("Suggested actions:");
    hints.forEach((hint, index) => {
      console.log(`  ${index + 1}. ${hint}`);
    });
  }

  await writeGithubStepSummary(views);
}

main().catch((error) => {
  console.error(error);
});
