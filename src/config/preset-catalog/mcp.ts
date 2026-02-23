import type {
  McpPresetGroup,
  PresetVerificationResult,
  VerificationSource,
} from "./types";

const VERIFIED_AT = "2026-02-23";

function verification(
  verification_source: VerificationSource,
  source_url: string,
  verification_reason: string,
  resolved_version: string,
): PresetVerificationResult {
  return {
    last_verified_at: VERIFIED_AT,
    verification_status: "pass",
    verification_reason,
    source_url,
    resolved_version,
    verification_source,
  };
}

export const MCP_PRESETS: Record<string, McpPresetGroup> = {
  browser: {
    label: "🌐 浏览器与测试",
    items: [
      {
        name: "playwright",
        transport_type: "stdio",
        command: "npx",
        args: ["@playwright/mcp@latest"],
        desc: "浏览器自动化与端到端测试",
        install_method: "npx",
        source_url: "https://www.npmjs.com/package/@playwright/mcp",
        reference_tier: "production",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40playwright%2Fmcp",
          "npm 最新版本可用且非 deprecated。",
          "0.0.68",
        ),
      },
    ],
  },
  search: {
    label: "🔍 搜索与网络",
    items: [
      {
        name: "mcp-fetch",
        transport_type: "stdio",
        command: "uvx",
        args: ["mcp-server-fetch"],
        desc: "官方 Fetch server（Python 发行包）",
        install_method: "uvx",
        source_url: "https://github.com/modelcontextprotocol/servers",
        reference_tier: "production",
        verification: verification(
          "official_repo",
          "https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md",
          "官方仓库提供 uvx mcp-server-fetch 安装路径。",
          "2025.4.7",
        ),
      },
      {
        name: "brave-search",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@brave/brave-search-mcp-server", "--transport", "stdio"],
        desc: "Brave 官方维护的 MCP 搜索服务",
        install_method: "npx",
        source_url: "https://github.com/brave/brave-search-mcp-server",
        reference_tier: "production",
        verification: verification(
          "official_repo",
          "https://raw.githubusercontent.com/brave/brave-search-mcp-server/main/README.md",
          "官方 README 提供 NPX 安装方式。",
          "2.x",
        ),
      },
      {
        name: "context7",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@upstash/context7-mcp@latest"],
        desc: "上下文增强，实时获取最新文档",
        install_method: "npx",
        source_url: "https://www.npmjs.com/package/@upstash/context7-mcp",
        reference_tier: "production",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40upstash%2Fcontext7-mcp",
          "npm 最新版本可用且非 deprecated。",
          "2.1.2",
        ),
      },
    ],
  },
  data: {
    label: "💾 数据与存储",
    items: [
      {
        name: "mcp-memory",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-memory"],
        desc: "官方 Memory 参考实现",
        install_method: "npx",
        source_url: "https://github.com/modelcontextprotocol/servers",
        reference_tier: "production",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40modelcontextprotocol%2Fserver-memory",
          "npm 最新版本可用且非 deprecated。",
          "2026.1.26",
        ),
      },
      {
        name: "mcp-filesystem",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"],
        desc: "官方 Filesystem 参考实现",
        install_method: "npx",
        source_url: "https://github.com/modelcontextprotocol/servers",
        reference_tier: "production",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40modelcontextprotocol%2Fserver-filesystem",
          "npm 最新版本可用且非 deprecated。",
          "2026.1.14",
        ),
      },
    ],
  },
  devtools: {
    label: "🛠️ 开发工具",
    items: [
      {
        name: "github",
        transport_type: "stdio",
        command: "docker",
        args: [
          "run",
          "-i",
          "--rm",
          "-e",
          "GITHUB_PERSONAL_ACCESS_TOKEN",
          "ghcr.io/github/github-mcp-server",
        ],
        desc: "GitHub 官方 MCP Server（建议 Docker 方式）",
        install_method: "docker",
        source_url: "https://github.com/github/github-mcp-server",
        reference_tier: "production",
        verification: verification(
          "official_repo",
          "https://raw.githubusercontent.com/github/github-mcp-server/main/README.md",
          "官方 README 提供 ghcr.io 镜像部署方式。",
          "main",
        ),
      },
      {
        name: "sequential-thinking",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
        desc: "增强逐步推理能力",
        install_method: "npx",
        source_url: "https://www.npmjs.com/package/@modelcontextprotocol/server-sequential-thinking",
        reference_tier: "production",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40modelcontextprotocol%2Fserver-sequential-thinking",
          "npm 最新版本可用且非 deprecated。",
          "2025.12.18",
        ),
      },
      {
        name: "everything",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-everything"],
        desc: "MCP 全功能参考测试服务（非生产默认）",
        install_method: "npx",
        source_url: "https://github.com/modelcontextprotocol/servers",
        reference_tier: "reference",
        verification: verification(
          "registry",
          "https://registry.npmjs.org/%40modelcontextprotocol%2Fserver-everything",
          "官方 reference server，建议仅用于测试。",
          "2026.1.26",
        ),
      },
    ],
  },
  collab: {
    label: "💬 协作与通信",
    items: [
      {
        name: "slack",
        transport_type: "stdio",
        command: "npx",
        args: ["-y", "@zencoderai/slack-mcp-server"],
        desc: "Slack MCP Server（由 Zencoder 维护）",
        install_method: "npx",
        source_url: "https://github.com/zencoderai/slack-mcp-server",
        reference_tier: "production",
        verification: verification(
          "official_repo",
          "https://raw.githubusercontent.com/zencoderai/slack-mcp-server/main/README.md",
          "迁移维护方提供 npm 与 docker 安装方式。",
          "1.0.0+",
        ),
      },
    ],
  },
};

export const MCP_PRESET_KEYS = Object.keys(MCP_PRESETS);

