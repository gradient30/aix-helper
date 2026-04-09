/**
 * Firecrawl 数据抓取脚本
 *
 * 从官方文档和社区来源实时抓取最新数据，用于：
 * 1. 验证当前 docs-catalog 数据的时效性
 * 2. 发现遗漏的命令、参数、快捷键
 * 3. 生成数据新鲜度报告
 *
 * 用法:
 *   FIRECRAWL_API_KEY=fc-xxx npx tsx scripts/fetch-docs-firecrawl.ts
 *
 * 输出:
 *   reports/firecrawl-raw-data.json  - 原始抓取数据
 *   reports/firecrawl-summary.json   - 抓取摘要
 *   reports/firecrawl-gap-analysis.json - 与当前 catalog 的差距分析
 */

import fs from "node:fs/promises";
import path from "node:path";
import { CLI_GUIDE_TOOLS } from "../src/config/docs-catalog/cli.ts";

// ─── 数据源配置 ──────────────────────────────────────────────────────────────

const OFFICIAL_DOCS: Record<string, string> = {
  claude_commands: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
  claude_settings: "https://docs.anthropic.com/en/docs/claude-code/settings",
  claude_cli_usage: "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
  claude_keybindings: "https://docs.anthropic.com/en/docs/claude-code/keybindings",
  claude_permissions: "https://docs.anthropic.com/en/docs/claude-code/permissions",
  claude_model_config: "https://docs.anthropic.com/en/docs/claude-code/model-config",
  claude_hooks: "https://docs.anthropic.com/en/docs/claude-code/hooks",
  claude_memory: "https://docs.anthropic.com/en/docs/claude-code/memory",
  claude_sub_agents: "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
  claude_chrome: "https://docs.anthropic.com/en/docs/claude-code/chrome",
  claude_fast_mode: "https://docs.anthropic.com/en/docs/claude-code/fast-mode",
  claude_context_window: "https://docs.anthropic.com/en/docs/claude-code/context-window",
  claude_costs: "https://docs.anthropic.com/en/docs/claude-code/costs",
  claude_desktop: "https://docs.anthropic.com/en/docs/claude-code/desktop",
  claude_sandboxing: "https://docs.anthropic.com/en/docs/claude-code/sandboxing",
  claude_skills: "https://docs.anthropic.com/en/docs/claude-code/skills",
  claude_voice: "https://docs.anthropic.com/en/docs/claude-code/voice-dictation",
  claude_remote_control: "https://docs.anthropic.com/en/docs/claude-code/remote-control",
  claude_scheduled_tasks: "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks",
  claude_plugins: "https://docs.anthropic.com/en/docs/claude-code/plugins",
  claude_statusline: "https://docs.anthropic.com/en/docs/claude-code/statusline",
  claude_terminal_config: "https://docs.anthropic.com/en/docs/claude-code/terminal-config",
  claude_authentication: "https://docs.anthropic.com/en/docs/claude-code/authentication",
  claude_vscode: "https://docs.anthropic.com/en/docs/claude-code/vs-code",
  claude_github_actions: "https://docs.anthropic.com/en/docs/claude-code/github-actions",
  claude_slack: "https://docs.anthropic.com/en/docs/claude-code/slack",
  claude_checkpointing: "https://docs.anthropic.com/en/docs/claude-code/checkpointing",
  claude_code_review: "https://docs.anthropic.com/en/docs/claude-code/code-review",
  claude_web: "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
  claude_interactive: "https://docs.anthropic.com/en/docs/claude-code/interactive-mode",
  claude_troubleshooting: "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
};

const COMMUNITY_SOURCES: string[] = [
  "https://www.builder.io/blog/claude-code-tips-best-practices",
  "https://smcleod.net/2026/03/the-advice-i-find-myself-repeating/",
];

// ─── 抓取函数 ────────────────────────────────────────────────────────────────

async function scrapeWithFirecrawl(url: string, apiKey: string): Promise<{ success: boolean; markdown?: string; error?: string }> {
  try {
    const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        timeout: 30000,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { success: false, error: `HTTP ${resp.status}: ${text}` };
    }

    const data = await resp.json();
    const markdown = data.data?.markdown || "";

    if (!markdown) {
      return { success: false, error: "No markdown content returned" };
    }

    return { success: true, markdown };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function scrapeWithFetch(url: string): Promise<{ success: boolean; markdown?: string; error?: string }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "aix-helper-docs-verifier/1.0" },
    });
    clearTimeout(timer);

    if (!resp.ok) {
      return { success: false, error: `HTTP ${resp.status}` };
    }

    const html = await resp.text();
    // 简易 HTML → text 转换（仅用于无 Firecrawl 时的降级）
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return { success: true, markdown: text };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// ─── 数据提取 ────────────────────────────────────────────────────────────────

function extractSlashCommands(markdown: string): Set<string> {
  const commands = new Set<string>();
  const regex = /`\/([a-z][a-z0-9-]*)/gi;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    commands.add(`/${match[1]}`);
  }
  return commands;
}

function extractCliFlags(markdown: string): Set<string> {
  const flags = new Set<string>();
  const regex = /`(--[a-z][a-z0-9-]*)/gi;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    flags.add(match[1]);
  }
  return flags;
}

function extractShortcuts(markdown: string): Set<string> {
  const shortcuts = new Set<string>();
  const patterns = [
    /`(Ctrl\+[A-Za-z0-9])/gi,
    /`(Cmd\+[A-Za-z0-9])/gi,
    /`(Esc)/gi,
    /`(Tab)/gi,
    /`(Enter)/gi,
    /`(Shift\+[A-Za-z0-9])/gi,
    /`(Alt\+[A-Za-z0-9])/gi,
    /`(Option\+[A-Za-z0-9])/gi,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(markdown)) !== null) {
      shortcuts.add(match[1]);
    }
  }
  return shortcuts;
}

// ─── 收集当前 catalog 中的命令 ───────────────────────────────────────────────

function collectCatalogCommands(): Set<string> {
  const commands = new Set<string>();
  const claudeTool = CLI_GUIDE_TOOLS.find((t) => t.id === "claude");
  if (!claudeTool) return commands;

  for (const group of claudeTool.groups) {
    for (const item of group.items) {
      if (item.command.startsWith("/")) {
        commands.add(item.command.split(" ")[0].split("[")[0]);
      }
      if (item.aliases) {
        for (const alias of item.aliases) {
          commands.add(alias.split(" ")[0].split("[")[0]);
        }
      }
    }
  }
  return commands;
}

// ─── 主函数 ──────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  const useFirecrawl = !!apiKey;

  console.log(`🚀 开始抓取官方文档...`);
  console.log(`   模式: ${useFirecrawl ? "Firecrawl" : "Fetch (降级)"}`);
  console.log(`   数据源: ${Object.keys(OFFICIAL_DOCS).length} 个官方页面`);
  console.log(`   社区来源: ${COMMUNITY_SOURCES.length} 个社区页面\n`);

  const results: Record<string, { url: string; success: boolean; markdown?: string; error?: string; commands?: string[]; flags?: string[]; shortcuts?: string[] }> = {};
  const allCommands = new Set<string>();
  const allFlags = new Set<string>();
  const allShortcuts = new Set<string>();

  // 1. 抓取官方文档
  console.log("📚 抓取官方文档...");
  for (const [key, url] of Object.entries(OFFICIAL_DOCS)) {
    console.log(`  📄 ${key}: ${url}`);

    const scrapeResult = useFirecrawl
      ? await scrapeWithFirecrawl(url, apiKey)
      : await scrapeWithFetch(url);

    results[key] = {
      url,
      success: scrapeResult.success,
      markdown: scrapeResult.markdown,
      error: scrapeResult.error,
    };

    if (scrapeResult.success && scrapeResult.markdown) {
      const cmds = extractSlashCommands(scrapeResult.markdown);
      const flags = extractCliFlags(scrapeResult.markdown);
      const shortcuts = extractShortcuts(scrapeResult.markdown);

      results[key].commands = [...cmds];
      results[key].flags = [...flags];
      results[key].shortcuts = [...shortcuts];

      cmds.forEach((c) => allCommands.add(c));
      flags.forEach((f) => allFlags.add(f));
      shortcuts.forEach((s) => allShortcuts.add(s));

      console.log(`    ✅ ${scrapeResult.markdown.length} 字符, ${cmds.size} 命令, ${flags.size} 参数, ${shortcuts.size} 快捷键`);
    } else {
      console.log(`    ❌ ${scrapeResult.error}`);
    }
  }

  // 2. 抓取社区技巧
  console.log("\n💡 抓取社区技巧...");
  for (const url of COMMUNITY_SOURCES) {
    console.log(`  📄 ${url}`);
    const scrapeResult = useFirecrawl
      ? await scrapeWithFirecrawl(url, apiKey)
      : await scrapeWithFetch(url);

    results[`community_${url.slice(0, 50)}`] = {
      url,
      success: scrapeResult.success,
      markdown: scrapeResult.markdown,
      error: scrapeResult.error,
    };

    if (scrapeResult.success) {
      console.log(`    ✅ ${scrapeResult.markdown?.length} 字符`);
    } else {
      console.log(`    ❌ ${scrapeResult.error}`);
    }
  }

  // 3. 差距分析
  console.log("\n🔍 差距分析...");
  const catalogCommands = collectCatalogCommands();
  const catalogArray = [...catalogCommands].sort();
  const scrapedArray = [...allCommands].sort();

  const missing = scrapedArray.filter((c) => !catalogCommands.has(c));
  const extra = catalogArray.filter((c) => !allCommands.has(c));

  console.log(`   当前 catalog 命令: ${catalogCommands.size}`);
  console.log(`   抓取到的命令: ${allCommands.size}`);
  console.log(`   遗漏的命令: ${missing.length}`);
  if (missing.length > 0) {
    console.log(`   遗漏列表: ${missing.join(", ")}`);
  }
  if (extra.length > 0) {
    console.log(`   catalog 独有: ${extra.join(", ")}`);
  }

  // 4. 保存报告
  const reportDir = path.resolve("reports");
  await fs.mkdir(reportDir, { recursive: true });

  // 原始数据（不含 markdown 内容，避免文件过大）
  const rawData = Object.fromEntries(
    Object.entries(results).map(([key, value]) => [
      key,
      {
        url: value.url,
        success: value.success,
        error: value.error,
        commands: value.commands,
        flags: value.flags,
        shortcuts: value.shortcuts,
      },
    ]),
  );

  await fs.writeFile(
    path.join(reportDir, "firecrawl-raw-data.json"),
    JSON.stringify(rawData, null, 2),
    "utf8",
  );

  const summary = {
    timestamp: new Date().toISOString(),
    mode: useFirecrawl ? "firecrawl" : "fetch-fallback",
    totalSources: Object.keys(OFFICIAL_DOCS).length + COMMUNITY_SOURCES.length,
    successSources: Object.values(results).filter((r) => r.success).length,
    failedSources: Object.values(results).filter((r) => !r.success).length,
    totalCommands: allCommands.size,
    totalFlags: allFlags.size,
    totalShortcuts: allShortcuts.size,
    catalogCommands: catalogCommands.size,
    missingCommands: missing,
    extraCommands: extra,
  };

  await fs.writeFile(
    path.join(reportDir, "firecrawl-summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );

  const gapAnalysis = {
    timestamp: new Date().toISOString(),
    catalog: { commands: catalogArray },
    scraped: { commands: scrapedArray },
    missing,
    extra,
    recommendation: missing.length > 0
      ? `建议将 ${missing.length} 个遗漏命令添加到 src/config/docs-catalog/cli.ts`
      : "当前 catalog 命令覆盖完整",
  };

  await fs.writeFile(
    path.join(reportDir, "firecrawl-gap-analysis.json"),
    JSON.stringify(gapAnalysis, null, 2),
    "utf8",
  );

  console.log(`\n✅ 报告已生成:`);
  console.log(`   reports/firecrawl-raw-data.json`);
  console.log(`   reports/firecrawl-summary.json`);
  console.log(`   reports/firecrawl-gap-analysis.json`);
  console.log(`\n📊 摘要:`);
  console.log(`   成功: ${summary.successSources}/${summary.totalSources}`);
  console.log(`   命令: ${summary.totalCommands}`);
  console.log(`   参数: ${summary.totalFlags}`);
  console.log(`   快捷键: ${summary.totalShortcuts}`);
  console.log(`   遗漏: ${summary.missingCommands.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
