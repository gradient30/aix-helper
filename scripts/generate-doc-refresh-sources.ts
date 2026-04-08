import fs from "node:fs/promises";
import path from "node:path";

import { CLI_GUIDE_TOOLS } from "../src/config/docs-catalog/cli.ts";
import { HELP_DOC_CATALOG, LOCAL_DEPLOY_DOCS } from "../src/config/docs-catalog/help.ts";
import { SETUP_GUIDE_TOOLS } from "../src/config/docs-catalog/setup.ts";
import { SKILLS_GUIDE_TOOLS } from "../src/config/docs-catalog/skills.ts";

type VerificationMetaLike = {
  source_url: string;
};

type ToolItemLike = {
  verification: VerificationMetaLike;
  sourceUrl?: string;
};

type ToolGroupLike = {
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

const OUTPUT_PATH = path.resolve("src/config/docs-catalog/doc-refresh-sources.generated.ts");

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

async function main() {
  const manifest: SourceManifest = {
    cli: buildScopeManifest(CLI_GUIDE_TOOLS as ToolLike[]),
    skills: buildScopeManifest(SKILLS_GUIDE_TOOLS as ToolLike[]),
    setup: buildScopeManifest(SETUP_GUIDE_TOOLS as ToolLike[]),
    help: buildHelpManifest(),
  };

  const fileContents = `export const DOC_REFRESH_SOURCE_MANIFEST = ${JSON.stringify(
    manifest,
    null,
    2,
  )} as const;\n`;

  await fs.writeFile(OUTPUT_PATH, fileContents, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
