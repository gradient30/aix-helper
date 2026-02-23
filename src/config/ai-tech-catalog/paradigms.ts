import type { AiParadigmItem } from "./types.ts";
import { verification } from "./repo-categories.ts";

function paradigm(item: AiParadigmItem): AiParadigmItem {
  return item;
}

export const AI_PARADIGMS: AiParadigmItem[] = [
  paradigm({
    id: "a2a-protocol-upgrade",
    title: { zh: "A2A 协议升级", en: "A2A Protocol Upgrade" },
    introduced_at: "2025-04-09",
    summary: {
      zh: "Agent2Agent 从实验性互通走向标准化协作，强调跨 Agent 的任务交接与状态同步。",
      en: "Agent2Agent moved toward standardized collaboration with stronger task handoff and state sync.",
    },
    scenario: {
      zh: "跨团队 Agent 协作、跨系统审批流、复合任务拆分执行。",
      en: "Cross-team agent collaboration, cross-system approval flows, and composite task decomposition.",
    },
    support_level: "official",
    official_source: verification(
      "https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade",
      "Google Cloud 官方发布。",
      "official_doc",
    ),
    supporting_sources: [
      verification(
        "https://github.com/google-a2a/A2A",
        "A2A 官方仓库持续更新。",
        "official_repo",
      ),
    ],
  }),
  paradigm({
    id: "a2a-linux-foundation",
    title: { zh: "A2A 进入 Linux Foundation 治理", en: "A2A Donated to Linux Foundation Governance" },
    introduced_at: "2025-06-23",
    summary: {
      zh: "A2A 进入基金会治理阶段，协议生态从单一厂商推进转向开放协作。",
      en: "A2A entered foundation governance, shifting from vendor-led to open collaborative stewardship.",
    },
    scenario: {
      zh: "企业在多供应商 Agent 栈中建立更稳定的互操作策略。",
      en: "Enterprises building stable interoperability across multi-vendor agent stacks.",
    },
    support_level: "official",
    official_source: verification(
      "https://developers.googleblog.com/google-cloud-donates-a2a-to-linux-foundation/",
      "Google Developers 官方公告。",
      "official_doc",
    ),
    supporting_sources: [
      verification(
        "https://github.com/google-a2a/A2A",
        "官方仓库可追溯规范演进。",
        "official_repo",
      ),
    ],
  }),
  paradigm({
    id: "mcp-productionization",
    title: { zh: "MCP 生产化落地", en: "MCP Productionization" },
    introduced_at: "2025-07-01",
    summary: {
      zh: "MCP 从“演示级工具接入”升级为“可治理、可审计、可复用”的生产连接层。",
      en: "MCP evolved from demo integrations into a governable, auditable, and reusable production layer.",
    },
    scenario: {
      zh: "研发团队统一接入搜索、浏览器、文档与内部服务能力，减少重复适配。",
      en: "Teams unify search, browser, docs, and internal services with less repeated integration work.",
    },
    support_level: "official",
    official_source: verification(
      "https://modelcontextprotocol.io/introduction",
      "MCP 官方站点定义与落地路径。",
      "official_doc",
    ),
    supporting_sources: [
      verification(
        "https://registry.modelcontextprotocol.io",
        "官方 Registry 可用于模板与生态可用性核验。",
        "official_doc",
      ),
      verification(
        "https://github.com/modelcontextprotocol/servers",
        "官方参考实现持续更新。",
        "official_repo",
      ),
    ],
  }),
  paradigm({
    id: "cli-native-agentic-engineering",
    title: { zh: "CLI 原生 Agentic Engineering", en: "CLI-Native Agentic Engineering" },
    introduced_at: "2025-08-01",
    summary: {
      zh: "主流 AI 编程工具将 Agent 能力前置到终端工作流，强调可执行、可回归、可审计。",
      en: "Mainstream AI coding tools made agent capabilities terminal-native with executable and auditable flows.",
    },
    scenario: {
      zh: "需求到提交的完整闭环：规划、编码、测试、审查、导出配置。",
      en: "End-to-end loop from intent to commit: planning, coding, testing, review, and config export.",
    },
    support_level: "official",
    official_source: verification(
      "https://developers.openai.com/codex/cli",
      "OpenAI Codex CLI 官方文档入口。",
      "official_doc",
    ),
    supporting_sources: [
      verification(
        "https://docs.anthropic.com/en/docs/claude-code/overview",
        "Anthropic 官方 Claude Code 文档入口。",
        "official_doc",
      ),
      verification(
        "https://google-gemini.github.io/gemini-cli/",
        "Gemini CLI 官方文档入口。",
        "official_doc",
      ),
    ],
  }),
  paradigm({
    id: "skills-as-infrastructure",
    title: { zh: "Skills 资产化与工程治理", en: "Skills as Governed Engineering Assets" },
    introduced_at: "2025-10-01",
    summary: {
      zh: "Skills 从提示词片段演进为可版本化、可验证、可审查的工程资产。",
      en: "Skills evolved from prompt snippets to versioned, verifiable, and reviewable engineering assets.",
    },
    scenario: {
      zh: "团队共享审查流程、迁移模板和安全基线，降低 AI 交付波动。",
      en: "Teams share review flows, migration templates, and security baselines with lower delivery variance.",
    },
    support_level: "official",
    official_source: verification(
      "https://docs.anthropic.com/en/docs/claude-code/skills",
      "Claude Skills 官方文档。",
      "official_doc",
    ),
    supporting_sources: [
      verification(
        "https://developers.openai.com/codex/prompting",
        "OpenAI Agent Skills 文档入口。",
        "official_doc",
      ),
      verification(
        "https://github.com/anthropics/skills",
        "官方 Skills 仓库作为参考实现。",
        "official_repo",
      ),
    ],
  }),
];
