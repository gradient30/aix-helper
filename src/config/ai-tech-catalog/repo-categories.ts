import type { AiRepoCategoryMeta, AiVerificationMeta } from "./types.ts";

export const AI_TECH_BASELINE_DATE = "2026-02-23";

export const AI_TECH_VERIFIED_AT = "2026-02-23";

export function verification(
  source_url: string,
  verification_reason: string,
  verification_source: AiVerificationMeta["verification_source"] = "official_doc",
): AiVerificationMeta {
  return {
    last_verified_at: AI_TECH_VERIFIED_AT,
    verification_status: "pass",
    verification_reason,
    source_url,
    verification_source,
  };
}

export const AI_TECH_REPO_CATEGORIES: AiRepoCategoryMeta[] = [
  {
    id: "rd_efficiency_tools",
    label: { zh: "研发效率工具", en: "R&D Efficiency Tools" },
    description: {
      zh: "用于提升研发交付效率的 AI 工具与平台（编码、自动化、协作）。",
      en: "AI tools and platforms that improve engineering delivery speed and reliability.",
    },
    keywords: ["developer productivity", "ai coding assistant", "workflow automation", "dev tool"],
  },
  {
    id: "skill_repos",
    label: { zh: "Skill 仓库", en: "Skill Repositories" },
    description: {
      zh: "可复用的 Agent Skills 仓库，要求可检测到 `SKILL.md`。",
      en: "Reusable Agent Skills repositories with detectable `SKILL.md` assets.",
    },
    keywords: ["skill", "agent skills", "claude code skills", "codex skills", "SKILL.md"],
  },
  {
    id: "mcp_repos",
    label: { zh: "MCP 仓库", en: "MCP Repositories" },
    description: {
      zh: "与 Model Context Protocol 相关的服务端、框架、生态仓库。",
      en: "Model Context Protocol servers, frameworks, and ecosystem repositories.",
    },
    keywords: ["mcp", "model context protocol", "mcp server", "fastmcp"],
  },
  {
    id: "prompt_optimization_repos",
    label: { zh: "提示词优化仓库", en: "Prompt Optimization Repositories" },
    description: {
      zh: "提示词工程、评测、优化和治理相关仓库。",
      en: "Prompt engineering, testing, optimization, and governance repositories.",
    },
    keywords: ["prompt engineering", "prompt optimization", "prompt testing", "eval"],
  },
  {
    id: "agent_repos",
    label: { zh: "Agent 仓库", en: "Agent Repositories" },
    description: {
      zh: "多 Agent 框架、Agent 平台与 Agentic 工作流核心仓库。",
      en: "Multi-agent frameworks, platforms, and agentic workflow repositories.",
    },
    keywords: ["agent", "agentic", "multi-agent", "autonomous agent"],
  },
];
