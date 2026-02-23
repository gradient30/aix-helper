import type {
  PresetVerificationResult,
  SkillsRepoPreset,
  VerificationSource,
} from "./types";

const VERIFIED_AT = "2026-02-23";

function verification(
  source_url: string,
  verification_reason: string,
  verification_source: VerificationSource = "official_repo",
): PresetVerificationResult {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status: "pass",
    verification_reason,
    source_url,
    resolved_version: "branch_head",
    verification_source,
  };
}

function repo(
  owner: string,
  repository: string,
  desc: string,
  repo_kind: SkillsRepoPreset["repo_kind"],
  branch?: string,
): SkillsRepoPreset {
  const source_url = `https://github.com/${owner}/${repository}`;
  return {
    owner,
    repo: repository,
    branch,
    desc,
    repo_kind,
    source_url,
    verification: verification(
      source_url,
      repo_kind === "skill_bundle"
        ? "技能仓库预设，支持扫描导入。"
        : "参考仓库预设，仅用于知识参考，不参与技能扫描。",
    ),
  };
}

export const PRESET_REPOS: Record<string, SkillsRepoPreset[]> = {
  skills: [
    repo("ComposioHQ", "awesome-claude-skills", "Claude Skills 大合集（943 个技能）", "skill_bundle", "master"),
    repo("anthropics", "skills", "Anthropic 官方技能仓库（17 个技能）", "skill_bundle"),
    repo("JimLiu", "baoyu-skills", "宝玉技能包（16 个技能）", "skill_bundle"),
    repo("cexll", "myclaude", "个人 Claude 技能集（13 个技能）", "skill_bundle", "master"),
  ],
  dev: [
    repo("anthropics", "anthropic-cookbook", "Anthropic 实战示例", "reference_repo"),
    repo("openai", "openai-cookbook", "OpenAI 实战示例", "reference_repo"),
    repo("modelcontextprotocol", "servers", "MCP 官方服务器集合", "reference_repo"),
    repo("microsoft", "semantic-kernel", "AI 编排框架", "reference_repo"),
    repo("langchain-ai", "langchain", "LangChain 框架", "reference_repo"),
    repo("run-llama", "llama_index", "LlamaIndex 数据框架", "reference_repo"),
    repo("sigoden", "aichat", "全能 AI CLI 工具", "reference_repo"),
    repo("continuedev", "continue", "Continue IDE AI 插件", "reference_repo"),
    repo("cline", "cline", "Cline AI 编码助手", "reference_repo"),
    repo("sourcegraph", "sourcegraph", "Sourcegraph 平台（参考仓库）", "reference_repo"),
  ],
  design: [
    repo("penpot", "penpot", "开源设计平台", "reference_repo"),
    repo("excalidraw", "excalidraw", "手绘风格白板", "reference_repo"),
    repo("tldraw", "tldraw", "在线白板引擎", "reference_repo"),
    repo("theatre-js", "theatre", "动画编辑器", "reference_repo"),
    repo("rive-app", "rive-wasm", "Rive 动画运行时", "reference_repo"),
    repo("imgly", "cesdk-web-examples", "创意设计 SDK", "reference_repo"),
    repo("BuilderIO", "figma-html", "Figma → HTML", "reference_repo"),
    repo("tokens-studio", "figma-plugin", "设计 Token 插件", "reference_repo"),
    repo("jina-ai", "reader", "网页内容提取", "reference_repo"),
    repo("markdoc", "markdoc", "文档标记语言", "reference_repo"),
  ],
  office: [
    repo("lobehub", "lobe-chat", "Lobe Chat", "reference_repo"),
    repo("ChatGPTNextWeb", "ChatGPT-Next-Web", "ChatGPT Next Web", "reference_repo"),
    repo("langgenius", "dify", "Dify AI 平台", "reference_repo"),
    repo("n8n-io", "n8n", "工作流自动化", "reference_repo"),
    repo("FlowiseAI", "Flowise", "可视化 AI 流", "reference_repo"),
    repo("makeplane", "plane", "项目管理", "reference_repo"),
    repo("AppFlowy-IO", "AppFlowy", "开源 Notion 替代", "reference_repo"),
    repo("twentyhq", "twenty", "开源 CRM", "reference_repo"),
    repo("hoppscotch", "hoppscotch", "API 调试工具", "reference_repo"),
    repo("nocodb", "nocodb", "开源 Airtable 替代", "reference_repo"),
  ],
  qa: [
    repo("microsoft", "playwright", "端到端测试框架", "reference_repo"),
    repo("puppeteer", "puppeteer", "浏览器自动化", "reference_repo"),
    repo("cypress-io", "cypress", "前端测试框架", "reference_repo"),
    repo("SeleniumHQ", "selenium", "浏览器自动化", "reference_repo"),
    repo("grafana", "k6", "负载测试工具", "reference_repo"),
    repo("locustio", "locust", "性能测试框架", "reference_repo"),
    repo("postmanlabs", "httpbin", "HTTP 测试服务", "reference_repo"),
    repo("mockoon", "mockoon", "Mock API 工具", "reference_repo"),
    repo("stoplightio", "prism", "API Mock 服务", "reference_repo"),
    repo("karatelabs", "karate", "API 测试框架", "reference_repo"),
  ],
  docs: [
    repo("jina-ai", "reader", "网页内容提取", "reference_repo"),
    repo("Unstructured-IO", "unstructured", "非结构化数据处理", "reference_repo"),
    repo("DS4SD", "docling", "文档解析引擎", "reference_repo"),
    repo("VikParuchuri", "marker", "PDF → Markdown", "reference_repo"),
    repo("opendatalab", "MinerU", "文档数据挖掘", "reference_repo"),
    repo("Stirling-Tools", "Stirling-PDF", "PDF 处理工具", "reference_repo"),
    repo("gotenberg", "gotenberg", "文档转换 API", "reference_repo"),
    repo("jgm", "pandoc", "通用文档转换", "reference_repo"),
    repo("azimuttapp", "azimutt", "数据库可视化", "reference_repo"),
    repo("mermaid-js", "mermaid", "图表生成引擎", "reference_repo"),
  ],
};

export const PRESET_TABS = [
  { key: "skills", label: "🎯 Skills 仓库" },
  { key: "dev", label: "💻 研发类" },
  { key: "design", label: "🎨 设计类" },
  { key: "office", label: "📋 办公类" },
  { key: "qa", label: "🧪 QA 测试" },
  { key: "docs", label: "📄 文档处理" },
] as const;


