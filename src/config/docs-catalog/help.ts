import type { HelpDocCatalog } from "./types";

const VERIFIED_AT = "2026-02-23";

function meta(
  source_url: string,
  verification_reason: string,
  source_anchor = "",
) {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status: "pass" as const,
    verification_reason,
    source_url,
    source_anchor,
    verification_source: "official_doc" as const,
  };
}

export const HELP_DOC_CATALOG: HelpDocCatalog = {
  providers: meta(
    "https://developers.openai.com/api",
    "Provider 帮助文案基于官方 API 文档与认证说明整理。",
  ),
  mcp: meta(
    "https://modelcontextprotocol.io/introduction",
    "MCP 基础说明与术语来自官方 MCP 站点。",
  ),
  skills: meta(
    "https://developers.openai.com/codex/prompting",
    "Skills 帮助以官方 Agent Skills 文档为准。",
  ),
  export: meta(
    "https://docs.anthropic.com/en/docs/claude-code/settings",
    "导出路径与配置字段按各官方 CLI 文档校对。",
  ),
  local_deploy: meta(
    "https://developers.openai.com/codex/cli/reference",
    "本地部署路径说明按官方配置路径核验。",
  ),
};

export const LOCAL_DEPLOY_DOCS = {
  claude: "https://docs.anthropic.com/en/docs/claude-code/settings",
  codex: "https://developers.openai.com/codex/cli/reference",
  gemini: "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
  opencode: "https://opencode.ai/docs/config/",
};

export const DOCS_CATALOG_VERIFIED_AT = VERIFIED_AT;
