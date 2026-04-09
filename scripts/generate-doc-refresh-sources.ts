import fs from "node:fs/promises";
import path from "node:path";

import { CLI_GUIDE_TOOLS } from "../src/config/docs-catalog/cli.ts";
import { HELP_DOC_CATALOG, LOCAL_DEPLOY_DOCS } from "../src/config/docs-catalog/help.ts";
import { SETUP_GUIDE_TOOLS } from "../src/config/docs-catalog/setup.ts";
import { SKILLS_GUIDE_TOOLS } from "../src/config/docs-catalog/skills.ts";
import {
  buildCliCommandEntityKey,
  buildGuideEntityKey,
} from "../src/features/docs-refresh/entity-keys.ts";

type VerificationMetaLike = {
  source_url: string;
  last_verified_at?: string;
  verification_reason?: string;
  verification_source?: string;
  verification_status?: string;
};

type ToolItemLike = {
  command?: string;
  title?: string;
  description?: string;
  code?: string;
  content?: string;
  body?: string;
  verification: VerificationMetaLike;
  sourceUrl?: string;
  [key: string]: unknown;
};

type ToolGroupLike = {
  category: string;
  verification: VerificationMetaLike;
  items: ToolItemLike[];
};

type ToolLike = {
  id: string;
  official_url: string;
  verification: VerificationMetaLike;
  groups: ToolGroupLike[];
};

type ScopeManifest = Record<string, string[]>;

type SourceManifest = {
  cli: ScopeManifest;
  skills: ScopeManifest;
  setup: ScopeManifest;
  help: ScopeManifest;
};

type BaselineEntry = {
  entityKey: string;
  vendorId: string;
  category: string;
  title?: string;
  command?: string;
  description?: string;
  code?: string;
  content?: string;
  body?: string;
  sourceUrls: string[];
  payload: Record<string, unknown>;
};

type HelpBaselineEntry = BaselineEntry & {
  pageRoute: string;
};

type BaselineManifest = {
  cli: Record<string, BaselineEntry[]>;
  skills: Record<string, BaselineEntry[]>;
  setup: Record<string, BaselineEntry[]>;
  help: Record<string, HelpBaselineEntry[]>;
};

const OUTPUT_PATH = path.resolve("src/config/docs-catalog/doc-refresh-sources.generated.ts");
const BASELINE_OUTPUT_PATH = path.resolve("src/config/docs-catalog/doc-refresh-baseline.generated.ts");

function uniqueUrls(urls: Array<string | undefined>): string[] {
  return [...new Set(urls.filter((value): value is string => Boolean(value)))].sort();
}

function collectToolSourceUrls(tool: ToolLike): string[] {
  const urls = new Set<string>([tool.official_url, tool.verification.source_url]);

  for (const group of tool.groups) {
    urls.add(group.verification.source_url);
    for (const item of group.items) {
      urls.add(item.verification.source_url);
      if (item.sourceUrl) {
        urls.add(item.sourceUrl);
      }
    }
  }

  return [...urls].filter(Boolean).sort();
}

function buildScopeManifest(tools: ToolLike[]): ScopeManifest {
  return Object.fromEntries(
    tools.map((tool) => [tool.id, collectToolSourceUrls(tool)]),
  );
}

function buildHelpManifest(): ScopeManifest {
  const sharedLocalDeployUrls = Object.values(LOCAL_DEPLOY_DOCS).sort();

  return {
    "/providers": [
      HELP_DOC_CATALOG.providers.source_url,
      ...sharedLocalDeployUrls,
    ].sort(),
    "/mcp": [
      HELP_DOC_CATALOG.mcp.source_url,
      ...sharedLocalDeployUrls,
    ].sort(),
    "/skills": [HELP_DOC_CATALOG.skills.source_url],
    "/export": [HELP_DOC_CATALOG.export.source_url],
  };
}

function buildCliBaselineManifest(tools: ToolLike[]): Record<string, BaselineEntry[]> {
  return Object.fromEntries(
    tools.map((tool) => [
      tool.id,
      tool.groups.flatMap((group) =>
        group.items
          .filter((item) => typeof item.command === "string" && item.command)
          .map((item) => {
            const entityKey = buildCliCommandEntityKey(tool.id, group.category, item.command!);
            return {
              entityKey,
              vendorId: tool.id,
              category: group.category,
              command: item.command,
              description: item.description,
              sourceUrls: uniqueUrls([
                tool.official_url,
                tool.verification.source_url,
                group.verification.source_url,
                item.verification.source_url,
                item.sourceUrl,
              ]),
              payload: {
                ...item,
                entityKey,
              },
            } satisfies BaselineEntry;
          })
      ),
    ]),
  );
}

function buildGuideBaselineManifest(
  scope: "skills" | "setup",
  tools: ToolLike[],
): Record<string, BaselineEntry[]> {
  return Object.fromEntries(
    tools.map((tool) => [
      tool.id,
      tool.groups.flatMap((group) =>
        group.items
          .filter((item) => typeof item.title === "string" && item.title)
          .map((item) => {
            const entityKey = buildGuideEntityKey(scope, tool.id, group.category, item.title!);
            return {
              entityKey,
              vendorId: tool.id,
              category: group.category,
              title: item.title,
              description: item.description,
              code: item.code,
              content: item.content,
              body: item.body,
              sourceUrls: uniqueUrls([
                tool.official_url,
                tool.verification.source_url,
                group.verification.source_url,
                item.verification.source_url,
                item.sourceUrl,
              ]),
              payload: {
                ...item,
                entityKey,
              },
            } satisfies BaselineEntry;
          })
      ),
    ]),
  );
}

function buildHelpEntry(
  pageRoute: string,
  field: keyof typeof HELP_DOC_CATALOG,
  sourceUrls: string[],
): HelpBaselineEntry {
  const title = field.replace(/_/g, " ");
  const entityKey = `help:${pageRoute}:${field}`;
  const verification = HELP_DOC_CATALOG[field];

  return {
    pageRoute,
    entityKey,
    vendorId: `page:${pageRoute.replace(/^\/+/, "")}`,
    category: pageRoute,
    title,
    description: verification.verification_reason,
    sourceUrls: uniqueUrls(sourceUrls),
    payload: {
      entityKey,
      title,
      description: verification.verification_reason,
      sourceUrl: verification.source_url,
      verification,
    },
  };
}

function buildHelpBaselineManifest(): Record<string, HelpBaselineEntry[]> {
  const localDeployUrls = Object.values(LOCAL_DEPLOY_DOCS);

  return {
    "/providers": [
      buildHelpEntry("/providers", "providers", [HELP_DOC_CATALOG.providers.source_url]),
      buildHelpEntry("/providers", "local_deploy", localDeployUrls),
    ],
    "/mcp": [
      buildHelpEntry("/mcp", "mcp", [HELP_DOC_CATALOG.mcp.source_url]),
      buildHelpEntry("/mcp", "local_deploy", localDeployUrls),
    ],
    "/skills": [
      buildHelpEntry("/skills", "skills", [HELP_DOC_CATALOG.skills.source_url]),
    ],
    "/export": [
      buildHelpEntry("/export", "export", [HELP_DOC_CATALOG.export.source_url]),
    ],
  };
}

async function main() {
  const manifest: SourceManifest = {
    cli: buildScopeManifest(CLI_GUIDE_TOOLS as ToolLike[]),
    skills: buildScopeManifest(SKILLS_GUIDE_TOOLS as ToolLike[]),
    setup: buildScopeManifest(SETUP_GUIDE_TOOLS as ToolLike[]),
    help: buildHelpManifest(),
  };

  const baselineManifest: BaselineManifest = {
    cli: buildCliBaselineManifest(CLI_GUIDE_TOOLS as ToolLike[]),
    skills: buildGuideBaselineManifest("skills", SKILLS_GUIDE_TOOLS as ToolLike[]),
    setup: buildGuideBaselineManifest("setup", SETUP_GUIDE_TOOLS as ToolLike[]),
    help: buildHelpBaselineManifest(),
  };

  const fileContents = `export const DOC_REFRESH_SOURCE_MANIFEST = ${JSON.stringify(
    manifest,
    null,
    2,
  )} as const;\n`;

  const baselineFileContents = `export const DOC_REFRESH_BASELINE_MANIFEST = ${JSON.stringify(
    baselineManifest,
    null,
    2,
  )} as const;\n`;

  await fs.writeFile(OUTPUT_PATH, fileContents, "utf8");
  await fs.writeFile(BASELINE_OUTPUT_PATH, baselineFileContents, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
  console.log(`Wrote ${BASELINE_OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
