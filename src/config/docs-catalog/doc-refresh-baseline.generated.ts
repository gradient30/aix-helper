export const DOC_REFRESH_BASELINE_MANIFEST = {
  "cli": {
    "claude": [
      {
        "entityKey": "cli:claude:会话管理:/help",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/help",
        "description": "显示可用命令列表和使用说明",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/help",
          "description": "显示可用命令列表和使用说明",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:会话管理:/help"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/clear",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/clear",
        "description": "清空当前会话上下文并释放 token",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/clear",
          "description": "清空当前会话上下文并释放 token",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/reset",
            "/new"
          ],
          "entityKey": "cli:claude:会话管理:/clear"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/exit",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/exit",
        "description": "退出 Claude Code CLI",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/exit",
          "description": "退出 Claude Code CLI",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/quit"
          ],
          "entityKey": "cli:claude:会话管理:/exit"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/branch",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/branch",
        "description": "在当前对话点创建分支，探索不同方向",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/branch",
          "description": "在当前对话点创建分支，探索不同方向",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/fork"
          ],
          "examples": [
            "/branch risky-refactor"
          ],
          "entityKey": "cli:claude:会话管理:/branch"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/resume",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/resume",
        "description": "按 ID 或名称恢复之前的对话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/resume",
          "description": "按 ID 或名称恢复之前的对话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/continue"
          ],
          "examples": [
            "/resume auth-refactor",
            "/resume"
          ],
          "entityKey": "cli:claude:会话管理:/resume"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/rename",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/rename",
        "description": "重命名当前会话并在提示栏显示名称",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/rename",
          "description": "重命名当前会话并在提示栏显示名称",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/rename auth-refactor"
          ],
          "entityKey": "cli:claude:会话管理:/rename"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/copy",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/copy",
        "description": "复制最近的助手响应到剪贴板",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/copy",
          "description": "复制最近的助手响应到剪贴板",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/copy",
            "/copy 2"
          ],
          "entityKey": "cli:claude:会话管理:/copy"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/export",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/export",
        "description": "将当前对话导出为纯文本文件",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/export",
          "description": "将当前对话导出为纯文本文件",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/export conversation.txt"
          ],
          "entityKey": "cli:claude:会话管理:/export"
        }
      },
      {
        "entityKey": "cli:claude:会话管理:/btw",
        "vendorId": "claude",
        "category": "会话管理",
        "command": "/btw",
        "description": "快速提问，不添加到对话历史",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/btw",
          "description": "快速提问，不添加到对话历史",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/btw 为什么选择这个方案？"
          ],
          "entityKey": "cli:claude:会话管理:/btw"
        }
      },
      {
        "entityKey": "cli:claude:上下文管理:/compact",
        "vendorId": "claude",
        "category": "上下文管理",
        "command": "/compact",
        "description": "压缩对话历史，释放上下文窗口",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/context-window",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/compact",
          "description": "压缩对话历史，释放上下文窗口",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/compact 重点关注 API 变更和修改的文件列表"
          ],
          "entityKey": "cli:claude:上下文管理:/compact"
        }
      },
      {
        "entityKey": "cli:claude:上下文管理:/context",
        "vendorId": "claude",
        "category": "上下文管理",
        "command": "/context",
        "description": "以彩色网格可视化当前上下文使用情况",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/context-window",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/context",
          "description": "以彩色网格可视化当前上下文使用情况",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/context-window",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:上下文管理:/context"
        }
      },
      {
        "entityKey": "cli:claude:上下文管理:/rewind",
        "vendorId": "claude",
        "category": "上下文管理",
        "command": "/rewind",
        "description": "回退对话和/或代码到之前的状态",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/checkpointing",
          "https://docs.anthropic.com/en/docs/claude-code/context-window",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/rewind",
          "description": "回退对话和/或代码到之前的状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/checkpointing",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/checkpoint"
          ],
          "entityKey": "cli:claude:上下文管理:/rewind"
        }
      },
      {
        "entityKey": "cli:claude:模型配置:/model",
        "vendorId": "claude",
        "category": "模型配置",
        "command": "/model",
        "description": "选择或更改当前会话使用的 AI 模型",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/model",
          "description": "选择或更改当前会话使用的 AI 模型",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/model opus",
            "/model sonnet",
            "/model opus[1m]"
          ],
          "entityKey": "cli:claude:模型配置:/model"
        }
      },
      {
        "entityKey": "cli:claude:模型配置:/effort",
        "vendorId": "claude",
        "category": "模型配置",
        "command": "/effort",
        "description": "设置模型努力级别，影响推理深度",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/effort",
          "description": "设置模型努力级别，影响推理深度",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/effort high",
            "/effort low",
            "/effort auto"
          ],
          "entityKey": "cli:claude:模型配置:/effort"
        }
      },
      {
        "entityKey": "cli:claude:模型配置:/fast",
        "vendorId": "claude",
        "category": "模型配置",
        "command": "/fast",
        "description": "切换快速模式，使用更轻量的模型",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/fast-mode",
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/fast",
          "description": "切换快速模式，使用更轻量的模型",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/fast-mode",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/fast on",
            "/fast off"
          ],
          "entityKey": "cli:claude:模型配置:/fast"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/mcp",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/mcp",
        "description": "管理 MCP 服务器连接和 OAuth 认证",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/mcp",
          "description": "管理 MCP 服务器连接和 OAuth 认证",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/mcp",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/mcp"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/agents",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/agents",
        "description": "管理子代理配置和行为",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/sub-agents"
        ],
        "payload": {
          "command": "/agents",
          "description": "管理子代理配置和行为",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/agents"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/ide",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/ide",
        "description": "管理 IDE 集成并显示当前状态",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/vs-code"
        ],
        "payload": {
          "command": "/ide",
          "description": "管理 IDE 集成并显示当前状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/vs-code",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/ide"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/chrome",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/chrome",
        "description": "配置 Chrome 浏览器集成设置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/chrome",
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/chrome",
          "description": "配置 Chrome 浏览器集成设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/chrome",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/chrome"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/hooks",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/hooks",
        "description": "查看工具事件的 Hook 配置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/hooks",
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/hooks",
          "description": "查看工具事件的 Hook 配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/hooks",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/hooks"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/install-github-app",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/install-github-app",
        "description": "为仓库设置 Claude GitHub Actions 应用",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/github-actions",
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/install-github-app",
          "description": "为仓库设置 Claude GitHub Actions 应用",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/github-actions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/install-github-app"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/install-slack-app",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/install-slack-app",
        "description": "安装 Claude Slack 应用",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slack"
        ],
        "payload": {
          "command": "/install-slack-app",
          "description": "安装 Claude Slack 应用",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slack",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:集成配置:/install-slack-app"
        }
      },
      {
        "entityKey": "cli:claude:集成配置:/add-dir",
        "vendorId": "claude",
        "category": "集成配置",
        "command": "/add-dir",
        "description": "添加额外工作目录到当前会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/add-dir",
          "description": "添加额外工作目录到当前会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/add-dir ../shared-lib"
          ],
          "entityKey": "cli:claude:集成配置:/add-dir"
        }
      },
      {
        "entityKey": "cli:claude:代码审查:/diff",
        "vendorId": "claude",
        "category": "代码审查",
        "command": "/diff",
        "description": "打开交互式 diff 查看器，显示未提交更改",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/code-review",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/diff",
          "description": "打开交互式 diff 查看器，显示未提交更改",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:代码审查:/diff"
        }
      },
      {
        "entityKey": "cli:claude:代码审查:/review",
        "vendorId": "claude",
        "category": "代码审查",
        "command": "/review",
        "description": "已弃用，请使用 code-review 插件替代",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/code-review",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/review",
          "description": "已弃用，请使用 code-review 插件替代",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令（已弃用）",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/code-review",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:代码审查:/review"
        }
      },
      {
        "entityKey": "cli:claude:代码审查:/security-review",
        "vendorId": "claude",
        "category": "代码审查",
        "command": "/security-review",
        "description": "分析当前分支待提交更改中的安全漏洞",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/code-review",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/security-review",
          "description": "分析当前分支待提交更改中的安全漏洞",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:代码审查:/security-review"
        }
      },
      {
        "entityKey": "cli:claude:代码审查:/pr-comments",
        "vendorId": "claude",
        "category": "代码审查",
        "command": "/pr-comments",
        "description": "获取并显示 GitHub PR 的评论",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/code-review",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/pr-comments",
          "description": "获取并显示 GitHub PR 的评论",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/pr-comments",
            "/pr-comments https://github.com/org/repo/pull/123"
          ],
          "entityKey": "cli:claude:代码审查:/pr-comments"
        }
      },
      {
        "entityKey": "cli:claude:权限管理:/permissions",
        "vendorId": "claude",
        "category": "权限管理",
        "command": "/permissions",
        "description": "查看或更新工具权限设置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "/permissions",
          "description": "查看或更新工具权限设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/allowed-tools"
          ],
          "entityKey": "cli:claude:权限管理:/permissions"
        }
      },
      {
        "entityKey": "cli:claude:自动化:/schedule",
        "vendorId": "claude",
        "category": "自动化",
        "command": "/schedule",
        "description": "创建、更新、列出或运行云端定时任务",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks"
        ],
        "payload": {
          "command": "/schedule",
          "description": "创建、更新、列出或运行云端定时任务",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/schedule 每天上午9点检查 CI"
          ],
          "entityKey": "cli:claude:自动化:/schedule"
        }
      },
      {
        "entityKey": "cli:claude:自动化:/loop",
        "vendorId": "claude",
        "category": "自动化",
        "command": "/loop",
        "description": "创建循环检查任务，定期执行并报告结果",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks"
        ],
        "payload": {
          "command": "/loop",
          "description": "创建循环检查任务，定期执行并报告结果",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/loop 5m check if deploy succeeded"
          ],
          "entityKey": "cli:claude:自动化:/loop"
        }
      },
      {
        "entityKey": "cli:claude:自动化:/tasks",
        "vendorId": "claude",
        "category": "自动化",
        "command": "/tasks",
        "description": "列出和管理后台任务",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/tasks",
          "description": "列出和管理后台任务",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:自动化:/tasks"
        }
      },
      {
        "entityKey": "cli:claude:自动化:/bashes",
        "vendorId": "claude",
        "category": "自动化",
        "command": "/bashes",
        "description": "列出和管理后台 bash 命令",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/bashes",
          "description": "列出和管理后台 bash 命令",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:自动化:/bashes"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/config",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/config",
        "description": "打开设置界面，调整主题、模型、输出风格等",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "/config",
          "description": "打开设置界面，调整主题、模型、输出风格等",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/settings",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/settings"
          ],
          "entityKey": "cli:claude:设置与外观:/config"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/status",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/status",
        "description": "打开设置界面的状态标签页",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/status",
          "description": "打开设置界面的状态标签页",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/status"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/theme",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/theme",
        "description": "更改终端颜色主题",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/theme",
          "description": "更改终端颜色主题",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/theme"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/color",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/color",
        "description": "设置当前会话的提示栏颜色",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/color",
          "description": "设置当前会话的提示栏颜色",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/color red",
            "/color blue",
            "/color default"
          ],
          "entityKey": "cli:claude:设置与外观:/color"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/keybindings",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/keybindings",
        "description": "打开或创建快捷键配置文件",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/keybindings",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "/keybindings",
          "description": "打开或创建快捷键配置文件",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/keybindings",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/keybindings"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/statusline",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/statusline",
        "description": "配置 Claude Code 状态行显示",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://docs.anthropic.com/en/docs/claude-code/statusline"
        ],
        "payload": {
          "command": "/statusline",
          "description": "配置 Claude Code 状态行显示",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/statusline",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/statusline"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/terminal-setup",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/terminal-setup",
        "description": "配置终端快捷键",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://docs.anthropic.com/en/docs/claude-code/terminal-config"
        ],
        "payload": {
          "command": "/terminal-setup",
          "description": "配置终端快捷键",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/terminal-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/terminal-setup"
        }
      },
      {
        "entityKey": "cli:claude:设置与外观:/vim",
        "vendorId": "claude",
        "category": "设置与外观",
        "command": "/vim",
        "description": "切换 Vim 和普通编辑模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/interactive-mode",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "/vim",
          "description": "切换 Vim 和普通编辑模式",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/interactive-mode",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置与外观:/vim"
        }
      },
      {
        "entityKey": "cli:claude:记忆管理:/memory",
        "vendorId": "claude",
        "category": "记忆管理",
        "command": "/memory",
        "description": "编辑 CLAUDE.md 记忆文件，管理自动记忆",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/memory",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/memory",
          "description": "编辑 CLAUDE.md 记忆文件，管理自动记忆",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/memory",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:记忆管理:/memory"
        }
      },
      {
        "entityKey": "cli:claude:记忆管理:/init",
        "vendorId": "claude",
        "category": "记忆管理",
        "command": "/init",
        "description": "使用 CLAUDE.md 指南初始化新项目",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/memory",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/init",
          "description": "使用 CLAUDE.md 指南初始化新项目",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/memory",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:记忆管理:/init"
        }
      },
      {
        "entityKey": "cli:claude:用量统计:/cost",
        "vendorId": "claude",
        "category": "用量统计",
        "command": "/cost",
        "description": "显示当前会话的 token 使用和费用统计",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/cost",
          "description": "显示当前会话的 token 使用和费用统计",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/costs",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:用量统计:/cost"
        }
      },
      {
        "entityKey": "cli:claude:用量统计:/usage",
        "vendorId": "claude",
        "category": "用量统计",
        "command": "/usage",
        "description": "显示计划用量限制和速率限制状态",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/usage",
          "description": "显示计划用量限制和速率限制状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:用量统计:/usage"
        }
      },
      {
        "entityKey": "cli:claude:用量统计:/stats",
        "vendorId": "claude",
        "category": "用量统计",
        "command": "/stats",
        "description": "可视化每日使用量、会话历史、连续天数和模型偏好",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/stats",
          "description": "可视化每日使用量、会话历史、连续天数和模型偏好",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:用量统计:/stats"
        }
      },
      {
        "entityKey": "cli:claude:用量统计:/insights",
        "vendorId": "claude",
        "category": "用量统计",
        "command": "/insights",
        "description": "生成 Claude Code 会话分析报告",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/insights",
          "description": "生成 Claude Code 会话分析报告",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:用量统计:/insights"
        }
      },
      {
        "entityKey": "cli:claude:用量统计:/extra-usage",
        "vendorId": "claude",
        "category": "用量统计",
        "command": "/extra-usage",
        "description": "配置额外用量以在达到速率限制时继续工作",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/extra-usage",
          "description": "配置额外用量以在达到速率限制时继续工作",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:用量统计:/extra-usage"
        }
      },
      {
        "entityKey": "cli:claude:跨平台:/desktop",
        "vendorId": "claude",
        "category": "跨平台",
        "command": "/desktop",
        "description": "在 Claude Code Desktop 应用中继续当前会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/desktop",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/desktop",
          "description": "在 Claude Code Desktop 应用中继续当前会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/desktop",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/app"
          ],
          "entityKey": "cli:claude:跨平台:/desktop"
        }
      },
      {
        "entityKey": "cli:claude:跨平台:/mobile",
        "vendorId": "claude",
        "category": "跨平台",
        "command": "/mobile",
        "description": "显示二维码以下载 Claude 移动应用",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/desktop",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/mobile",
          "description": "显示二维码以下载 Claude 移动应用",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/ios",
            "/android"
          ],
          "entityKey": "cli:claude:跨平台:/mobile"
        }
      },
      {
        "entityKey": "cli:claude:跨平台:/remote-control",
        "vendorId": "claude",
        "category": "跨平台",
        "command": "/remote-control",
        "description": "从 claude.ai 远程控制当前会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/desktop",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/remote-control"
        ],
        "payload": {
          "command": "/remote-control",
          "description": "从 claude.ai 远程控制当前会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/remote-control",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/rc"
          ],
          "entityKey": "cli:claude:跨平台:/remote-control"
        }
      },
      {
        "entityKey": "cli:claude:跨平台:/remote-env",
        "vendorId": "claude",
        "category": "跨平台",
        "command": "/remote-env",
        "description": "配置 Web 会话的默认远程环境",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
          "https://docs.anthropic.com/en/docs/claude-code/desktop",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/remote-env",
          "description": "配置 Web 会话的默认远程环境",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:跨平台:/remote-env"
        }
      },
      {
        "entityKey": "cli:claude:跨平台:/teleport",
        "vendorId": "claude",
        "category": "跨平台",
        "command": "/teleport",
        "description": "在本地终端恢复 Web 会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
          "https://docs.anthropic.com/en/docs/claude-code/desktop",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/teleport",
          "description": "在本地终端恢复 Web 会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/tp"
          ],
          "entityKey": "cli:claude:跨平台:/teleport"
        }
      },
      {
        "entityKey": "cli:claude:账户管理:/login",
        "vendorId": "claude",
        "category": "账户管理",
        "command": "/login",
        "description": "登录 Anthropic 账户",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/login",
          "description": "登录 Anthropic 账户",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/authentication",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:账户管理:/login"
        }
      },
      {
        "entityKey": "cli:claude:账户管理:/logout",
        "vendorId": "claude",
        "category": "账户管理",
        "command": "/logout",
        "description": "退出 Anthropic 账户",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/logout",
          "description": "退出 Anthropic 账户",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/authentication",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:账户管理:/logout"
        }
      },
      {
        "entityKey": "cli:claude:账户管理:/passes",
        "vendorId": "claude",
        "category": "账户管理",
        "command": "/passes",
        "description": "与朋友分享一周免费 Claude Code 使用",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/passes",
          "description": "与朋友分享一周免费 Claude Code 使用",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:账户管理:/passes"
        }
      },
      {
        "entityKey": "cli:claude:账户管理:/privacy-settings",
        "vendorId": "claude",
        "category": "账户管理",
        "command": "/privacy-settings",
        "description": "查看和更新隐私设置（Pro/Max 计划）",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/privacy-settings",
          "description": "查看和更新隐私设置（Pro/Max 计划）",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:账户管理:/privacy-settings"
        }
      },
      {
        "entityKey": "cli:claude:账户管理:/upgrade",
        "vendorId": "claude",
        "category": "账户管理",
        "command": "/upgrade",
        "description": "打开升级页面切换到更高计划层级",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/upgrade",
          "description": "打开升级页面切换到更高计划层级",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:账户管理:/upgrade"
        }
      },
      {
        "entityKey": "cli:claude:插件管理:/plugin",
        "vendorId": "claude",
        "category": "插件管理",
        "command": "/plugin",
        "description": "管理 Claude Code 插件",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/plugins"
        ],
        "payload": {
          "command": "/plugin",
          "description": "管理 Claude Code 插件",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/plugins",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/plugin",
            "/plugin install code-review@claude-plugins-official"
          ],
          "entityKey": "cli:claude:插件管理:/plugin"
        }
      },
      {
        "entityKey": "cli:claude:插件管理:/reload-plugins",
        "vendorId": "claude",
        "category": "插件管理",
        "command": "/reload-plugins",
        "description": "重新加载所有活动插件以应用待处理更改",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/plugins"
        ],
        "payload": {
          "command": "/reload-plugins",
          "description": "重新加载所有活动插件以应用待处理更改",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/plugins",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:插件管理:/reload-plugins"
        }
      },
      {
        "entityKey": "cli:claude:工作模式:/plan",
        "vendorId": "claude",
        "category": "工作模式",
        "command": "/plan",
        "description": "直接从提示进入计划模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/plan",
          "description": "直接从提示进入计划模式",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/plan 修复认证 bug",
            "/plan 重构用户模块"
          ],
          "entityKey": "cli:claude:工作模式:/plan"
        }
      },
      {
        "entityKey": "cli:claude:安全:/sandbox",
        "vendorId": "claude",
        "category": "安全",
        "command": "/sandbox",
        "description": "切换沙盒模式，在隔离环境中运行",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/sandboxing"
        ],
        "payload": {
          "command": "/sandbox",
          "description": "切换沙盒模式，在隔离环境中运行",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/sandboxing",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:安全:/sandbox"
        }
      },
      {
        "entityKey": "cli:claude:技能管理:/skills",
        "vendorId": "claude",
        "category": "技能管理",
        "command": "/skills",
        "description": "列出可用技能",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "command": "/skills",
          "description": "列出可用技能",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:技能管理:/skills"
        }
      },
      {
        "entityKey": "cli:claude:输入方式:/voice",
        "vendorId": "claude",
        "category": "输入方式",
        "command": "/voice",
        "description": "切换语音输入模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/voice-dictation"
        ],
        "payload": {
          "command": "/voice",
          "description": "切换语音输入模式",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/voice-dictation",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:输入方式:/voice"
        }
      },
      {
        "entityKey": "cli:claude:故障排查:/doctor",
        "vendorId": "claude",
        "category": "故障排查",
        "command": "/doctor",
        "description": "诊断并验证 Claude Code 安装和设置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "command": "/doctor",
          "description": "诊断并验证 Claude Code 安装和设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:故障排查:/doctor"
        }
      },
      {
        "entityKey": "cli:claude:故障排查:/feedback",
        "vendorId": "claude",
        "category": "故障排查",
        "command": "/feedback",
        "description": "提交关于 Claude Code 的反馈",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "command": "/feedback",
          "description": "提交关于 Claude Code 的反馈",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/bug"
          ],
          "examples": [
            "/feedback",
            "/feedback report"
          ],
          "entityKey": "cli:claude:故障排查:/feedback"
        }
      },
      {
        "entityKey": "cli:claude:帮助:/release-notes",
        "vendorId": "claude",
        "category": "帮助",
        "command": "/release-notes",
        "description": "查看完整更新日志",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/changelog",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/release-notes",
          "description": "查看完整更新日志",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/changelog",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:帮助:/release-notes"
        }
      },
      {
        "entityKey": "cli:claude:其他:/stickers",
        "vendorId": "claude",
        "category": "其他",
        "command": "/stickers",
        "description": "订购 Claude Code 贴纸",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/slash-commands"
        ],
        "payload": {
          "command": "/stickers",
          "description": "订购 Claude Code 贴纸",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:其他:/stickers"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude",
        "description": "启动交互式会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude",
          "description": "启动交互式会话",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude",
          "entityKey": "cli:claude:CLI 启动方式:claude"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude \"query\"",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude \"query\"",
        "description": "带初始问题启动交互式会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude \"query\"",
          "description": "带初始问题启动交互式会话",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude \"explain this project\"",
          "entityKey": "cli:claude:CLI 启动方式:claude \"query\""
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude -p",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude -p",
        "description": "非交互输出模式，打印响应后退出",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude -p",
          "description": "非交互输出模式，打印响应后退出",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "cat diff.txt | claude -p \"summarize changes\"",
          "entityKey": "cli:claude:CLI 启动方式:claude -p"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude -c",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude -c",
        "description": "继续当前目录最近的对话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude -c",
          "description": "继续当前目录最近的对话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -c",
          "entityKey": "cli:claude:CLI 启动方式:claude -c"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude -r",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude -r",
        "description": "按 ID 或名称恢复特定会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude -r",
          "description": "按 ID 或名称恢复特定会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -r \"auth-refactor\" \"Finish this PR\"",
          "entityKey": "cli:claude:CLI 启动方式:claude -r"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude update",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude update",
        "description": "更新到最新版本",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude update",
          "description": "更新到最新版本",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude update",
          "entityKey": "cli:claude:CLI 启动方式:claude update"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude auth login",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude auth login",
        "description": "登录 Anthropic 账户",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude auth login",
          "description": "登录 Anthropic 账户",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/authentication",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude auth login --console",
          "entityKey": "cli:claude:CLI 启动方式:claude auth login"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude auth logout",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude auth logout",
        "description": "退出 Anthropic 账户",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude auth logout",
          "description": "退出 Anthropic 账户",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/authentication",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude auth logout",
          "entityKey": "cli:claude:CLI 启动方式:claude auth logout"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude auth status",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude auth status",
        "description": "显示认证状态（JSON 格式）",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/authentication",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude auth status",
          "description": "显示认证状态（JSON 格式）",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/authentication",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude auth status",
          "entityKey": "cli:claude:CLI 启动方式:claude auth status"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude agents",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude agents",
        "description": "列出所有配置的子代理",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/sub-agents"
        ],
        "payload": {
          "command": "claude agents",
          "description": "列出所有配置的子代理",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude agents",
          "entityKey": "cli:claude:CLI 启动方式:claude agents"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude mcp",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude mcp",
        "description": "配置 MCP 服务器",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "claude mcp",
          "description": "配置 MCP 服务器",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/mcp",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude mcp",
          "entityKey": "cli:claude:CLI 启动方式:claude mcp"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude plugin",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude plugin",
        "description": "管理 Claude Code 插件",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/plugins"
        ],
        "payload": {
          "command": "claude plugin",
          "description": "管理 Claude Code 插件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/plugins",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude plugin install code-review@claude-plugins-official",
          "entityKey": "cli:claude:CLI 启动方式:claude plugin"
        }
      },
      {
        "entityKey": "cli:claude:CLI 启动方式:claude remote-control",
        "vendorId": "claude",
        "category": "CLI 启动方式",
        "command": "claude remote-control",
        "description": "启动远程控制服务器",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/remote-control"
        ],
        "payload": {
          "command": "claude remote-control",
          "description": "启动远程控制服务器",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/remote-control",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude remote-control --name \"My Project\"",
          "entityKey": "cli:claude:CLI 启动方式:claude remote-control"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--continue, -c",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--continue, -c",
        "description": "加载当前目录最近的对话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--continue, -c",
          "description": "加载当前目录最近的对话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --continue",
          "entityKey": "cli:claude:CLI 参数:--continue, -c"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--resume, -r",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--resume, -r",
        "description": "恢复特定会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--resume, -r",
          "description": "恢复特定会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --resume auth-refactor",
          "entityKey": "cli:claude:CLI 参数:--resume, -r"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--name, -n",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--name, -n",
        "description": "设置会话显示名称",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--name, -n",
          "description": "设置会话显示名称",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -n \"my-feature-work\"",
          "entityKey": "cli:claude:CLI 参数:--name, -n"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--print, -p",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--print, -p",
        "description": "打印响应，不进入交互模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--print, -p",
          "description": "打印响应，不进入交互模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -p \"query\"",
          "entityKey": "cli:claude:CLI 参数:--print, -p"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--model",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--model",
        "description": "指定使用的 AI 模型",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--model",
          "description": "指定使用的 AI 模型",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --model claude-sonnet-4-6",
          "entityKey": "cli:claude:CLI 参数:--model"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--effort",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--effort",
        "description": "设置当前会话的努力级别",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--effort",
          "description": "设置当前会话的努力级别",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --effort high",
          "entityKey": "cli:claude:CLI 参数:--effort"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--fallback-model",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--fallback-model",
        "description": "默认模型过载时自动回退",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--fallback-model",
          "description": "默认模型过载时自动回退",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -p --fallback-model sonnet \"query\"",
          "entityKey": "cli:claude:CLI 参数:--fallback-model"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--add-dir",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--add-dir",
        "description": "添加额外工作目录",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--add-dir",
          "description": "添加额外工作目录",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --add-dir ../apps ../lib",
          "entityKey": "cli:claude:CLI 参数:--add-dir"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--agent",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--agent",
        "description": "指定子代理配置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/sub-agents"
        ],
        "payload": {
          "command": "--agent",
          "description": "指定子代理配置",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --agent my-custom-agent",
          "entityKey": "cli:claude:CLI 参数:--agent"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--allowedTools",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--allowedTools",
        "description": "预授权特定工具",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "--allowedTools",
          "description": "预授权特定工具",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --allowedTools \"Bash(git log *)\" \"Read\"",
          "entityKey": "cli:claude:CLI 参数:--allowedTools"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--disallowedTools",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--disallowedTools",
        "description": "禁用特定工具",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "--disallowedTools",
          "description": "禁用特定工具",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --disallowedTools \"Bash(curl *)\"",
          "entityKey": "cli:claude:CLI 参数:--disallowedTools"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--dangerously-skip-permissions",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--dangerously-skip-permissions",
        "description": "跳过权限确认模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "--dangerously-skip-permissions",
          "description": "跳过权限确认模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --dangerously-skip-permissions",
          "entityKey": "cli:claude:CLI 参数:--dangerously-skip-permissions"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--permission-mode",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--permission-mode",
        "description": "设置权限模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "--permission-mode",
          "description": "设置权限模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --permission-mode plan",
          "entityKey": "cli:claude:CLI 参数:--permission-mode"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--tools",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--tools",
        "description": "限制 Claude 可使用的内置工具",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions"
        ],
        "payload": {
          "command": "--tools",
          "description": "限制 Claude 可使用的内置工具",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --tools \"Bash,Edit,Read\"",
          "entityKey": "cli:claude:CLI 参数:--tools"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--system-prompt",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--system-prompt",
        "description": "设置系统提示",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--system-prompt",
          "description": "设置系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --system-prompt \"You are a Python expert\"",
          "entityKey": "cli:claude:CLI 参数:--system-prompt"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--system-prompt-file",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--system-prompt-file",
        "description": "从文件加载系统提示",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--system-prompt-file",
          "description": "从文件加载系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --system-prompt-file ./custom-prompt.txt",
          "entityKey": "cli:claude:CLI 参数:--system-prompt-file"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--append-system-prompt",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--append-system-prompt",
        "description": "追加额外系统提示",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--append-system-prompt",
          "description": "追加额外系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --append-system-prompt \"Always use TypeScript\"",
          "entityKey": "cli:claude:CLI 参数:--append-system-prompt"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--append-system-prompt-file",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--append-system-prompt-file",
        "description": "从文件加载并追加系统提示",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--append-system-prompt-file",
          "description": "从文件加载并追加系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --append-system-prompt-file ./extra-rules.txt",
          "entityKey": "cli:claude:CLI 参数:--append-system-prompt-file"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--max-budget-usd",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--max-budget-usd",
        "description": "API 调用最大美元金额",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--max-budget-usd",
          "description": "API 调用最大美元金额",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/costs",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -p --max-budget-usd 5.00 \"query\"",
          "entityKey": "cli:claude:CLI 参数:--max-budget-usd"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--max-turns",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--max-turns",
        "description": "限制最大对话轮数",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/costs",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--max-turns",
          "description": "限制最大对话轮数",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/costs",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -p --max-turns 3 \"query\"",
          "entityKey": "cli:claude:CLI 参数:--max-turns"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--bare",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--bare",
        "description": "最小模式：跳过自动发现，脚本调用更快",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--bare",
          "description": "最小模式：跳过自动发现，脚本调用更快",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --bare -p \"query\"",
          "entityKey": "cli:claude:CLI 参数:--bare"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--output-format",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--output-format",
        "description": "设置输出格式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--output-format",
          "description": "设置输出格式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -p \"query\" --output-format json",
          "entityKey": "cli:claude:CLI 参数:--output-format"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--fork-session",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--fork-session",
        "description": "恢复时创建新会话 ID",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--fork-session",
          "description": "恢复时创建新会话 ID",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --resume abc123 --fork-session",
          "entityKey": "cli:claude:CLI 参数:--fork-session"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--from-pr",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--from-pr",
        "description": "从 GitHub PR 恢复会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/github-actions",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--from-pr",
          "description": "从 GitHub PR 恢复会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/github-actions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --from-pr 123",
          "entityKey": "cli:claude:CLI 参数:--from-pr"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--remote",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--remote",
        "description": "从 Web 会话恢复本地执行",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--remote",
          "description": "从 Web 会话恢复本地执行",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --remote \"Fix the login bug\"",
          "entityKey": "cli:claude:CLI 参数:--remote"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--teleport",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--teleport",
        "description": "在本地终端恢复 Web 会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--teleport",
          "description": "在本地终端恢复 Web 会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/claude-code-on-the-web",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --teleport",
          "entityKey": "cli:claude:CLI 参数:--teleport"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--worktree, -w",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--worktree, -w",
        "description": "在隔离的 git worktree 中启动",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--worktree, -w",
          "description": "在隔离的 git worktree 中启动",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -w feature-auth",
          "entityKey": "cli:claude:CLI 参数:--worktree, -w"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--tmux",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--tmux",
        "description": "为 worktree 创建 tmux 会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--tmux",
          "description": "为 worktree 创建 tmux 会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -w feature-auth --tmux",
          "entityKey": "cli:claude:CLI 参数:--tmux"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--chrome",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--chrome",
        "description": "启用 Chrome 浏览器集成",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/chrome",
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--chrome",
          "description": "启用 Chrome 浏览器集成",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/chrome",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --chrome",
          "entityKey": "cli:claude:CLI 参数:--chrome"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--verbose",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--verbose",
        "description": "启用详细输出模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "command": "--verbose",
          "description": "启用详细输出模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --verbose",
          "entityKey": "cli:claude:CLI 参数:--verbose"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--debug",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--debug",
        "description": "启用调试输出",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "command": "--debug",
          "description": "启用调试输出",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --debug \"api,mcp\"",
          "entityKey": "cli:claude:CLI 参数:--debug"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--version, -v",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--version, -v",
        "description": "输出版本号",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--version, -v",
          "description": "输出版本号",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude -v",
          "entityKey": "cli:claude:CLI 参数:--version, -v"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--no-session-persistence",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--no-session-persistence",
        "description": "禁用会话持久化",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--no-session-persistence",
          "description": "禁用会话持久化",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --no-session-persistence",
          "entityKey": "cli:claude:CLI 参数:--no-session-persistence"
        }
      },
      {
        "entityKey": "cli:claude:CLI 参数:--channels",
        "vendorId": "claude",
        "category": "CLI 参数",
        "command": "--channels",
        "description": "指定更新渠道",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "--channels",
          "description": "指定更新渠道",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "claude --channels beta",
          "entityKey": "cli:claude:CLI 参数:--channels"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + C",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + C",
        "description": "中断当前执行",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + C",
          "description": "中断当前执行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + C"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + D",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + D",
        "description": "退出会话",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + D",
          "description": "退出会话",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + D"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Esc Esc",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Esc Esc",
        "description": "编辑上一条输入",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Esc Esc",
          "description": "编辑上一条输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Esc Esc"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + L",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + L",
        "description": "清屏",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + L",
          "description": "清屏",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + L"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + K",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + K",
        "description": "清空输入行",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + K",
          "description": "清空输入行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + K"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + A",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + A",
        "description": "光标移到行首",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + A",
          "description": "光标移到行首",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + A"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + E",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + E",
        "description": "光标移到行尾",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + E",
          "description": "光标移到行尾",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + E"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + U",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + U",
        "description": "删除光标前所有内容",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + U",
          "description": "删除光标前所有内容",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + U"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + W",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + W",
        "description": "删除光标前一个单词",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + W",
          "description": "删除光标前一个单词",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + W"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + P / ↑",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + P / ↑",
        "description": "上一条历史记录",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + P / ↑",
          "description": "上一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + P / ↑"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + N / ↓",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + N / ↓",
        "description": "下一条历史记录",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + N / ↓",
          "description": "下一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + N / ↓"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + R",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + R",
        "description": "反向搜索历史",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + R",
          "description": "反向搜索历史",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + R"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + B / ←",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + B / ←",
        "description": "光标左移",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + B / ←",
          "description": "光标左移",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + B / ←"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + F / →",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + F / →",
        "description": "光标右移",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + F / →",
          "description": "光标右移",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + F / →"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Alt + B",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Alt + B",
        "description": "光标左移一个单词",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Alt + B",
          "description": "光标左移一个单词",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Alt + B"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Alt + F",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Alt + F",
        "description": "光标右移一个单词",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Alt + F",
          "description": "光标右移一个单词",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Alt + F"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Enter",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Enter",
        "description": "提交输入",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Enter",
          "description": "提交输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Enter"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Shift + Enter",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Shift + Enter",
        "description": "换行（多行输入）",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Shift + Enter",
          "description": "换行（多行输入）",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Shift + Enter"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + G / Ctrl+X Ctrl+E",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + G / Ctrl+X Ctrl+E",
        "description": "在默认编辑器中打开输入",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + G / Ctrl+X Ctrl+E",
          "description": "在默认编辑器中打开输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + G / Ctrl+X Ctrl+E"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + O",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + O",
        "description": "切换详细输出模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + O",
          "description": "切换详细输出模式",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + O"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + V",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + V",
        "description": "从剪贴板粘贴图片",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + V",
          "description": "从剪贴板粘贴图片",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + V"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + B",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + B",
        "description": "后台运行任务",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + B",
          "description": "后台运行任务",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + B"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + T",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + T",
        "description": "切换任务列表",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + T",
          "description": "切换任务列表",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + T"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Shift + Tab",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Shift + Tab",
        "description": "循环切换权限模式",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Shift + Tab",
          "description": "循环切换权限模式",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Shift + Tab"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + Y",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + Y",
        "description": "粘贴删除的文本",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + Y",
          "description": "粘贴删除的文本",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + Y"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + J",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + J",
        "description": "多行输入换行符",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + J",
          "description": "多行输入换行符",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + J"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:/ (行首)",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "/ (行首)",
        "description": "命令或技能菜单",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "/ (行首)",
          "description": "命令或技能菜单",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:/ (行首)"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:! (行首)",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "! (行首)",
        "description": "Bash 模式直接运行",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "! (行首)",
          "description": "Bash 模式直接运行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:! (行首)"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:@",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "@",
        "description": "文件路径自动补全",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "@",
          "description": "文件路径自动补全",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:@"
        }
      },
      {
        "entityKey": "cli:claude:快捷键:Ctrl + S",
        "vendorId": "claude",
        "category": "快捷键",
        "command": "Ctrl + S",
        "description": "暂存提示草稿",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "command": "Ctrl + S",
          "description": "暂存提示草稿",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:快捷键:Ctrl + S"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:permissions.allow",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "permissions.allow",
        "description": "允许的工具列表",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "permissions.allow",
          "description": "允许的工具列表",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:permissions.allow"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:permissions.deny",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "permissions.deny",
        "description": "禁止的工具列表",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/permissions",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "permissions.deny",
          "description": "禁止的工具列表",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/permissions",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:permissions.deny"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:env.*",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "env.*",
        "description": "环境变量配置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "env.*",
          "description": "环境变量配置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/settings",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:env.*"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:mcpServers",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "mcpServers",
        "description": "MCP 服务器配置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "mcpServers",
          "description": "MCP 服务器配置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/mcp",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:mcpServers"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:model",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "model",
        "description": "默认模型设置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/model-config",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "model",
          "description": "默认模型设置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/model-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:model"
        }
      },
      {
        "entityKey": "cli:claude:设置配置:hooks",
        "vendorId": "claude",
        "category": "设置配置",
        "command": "hooks",
        "description": "Hook 事件配置",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/hooks",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "command": "hooks",
          "description": "Hook 事件配置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/hooks",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:claude:设置配置:hooks"
        }
      }
    ],
    "codex": [
      {
        "entityKey": "cli:codex:会话管理:/help",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/help",
        "description": "显示命令帮助和使用说明",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/help",
          "description": "显示命令帮助和使用说明",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:会话管理:/help"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/clear",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/clear",
        "description": "清空当前会话上下文并释放 token",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/clear",
          "description": "清空当前会话上下文并释放 token",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/reset"
          ],
          "entityKey": "cli:codex:会话管理:/clear"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/new",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/new",
        "description": "开启新会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/new",
          "description": "开启新会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:会话管理:/new"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/quit",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/quit",
        "description": "退出会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/quit",
          "description": "退出会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/exit"
          ],
          "entityKey": "cli:codex:会话管理:/quit"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/resume",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/resume",
        "description": "恢复之前的会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/resume",
          "description": "恢复之前的会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/continue"
          ],
          "examples": [
            "/resume session-id"
          ],
          "entityKey": "cli:codex:会话管理:/resume"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/copy",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/copy",
        "description": "复制最近的助手响应到剪贴板",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/copy",
          "description": "复制最近的助手响应到剪贴板",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/copy",
            "/copy 2"
          ],
          "entityKey": "cli:codex:会话管理:/copy"
        }
      },
      {
        "entityKey": "cli:codex:会话管理:/export",
        "vendorId": "codex",
        "category": "会话管理",
        "command": "/export",
        "description": "导出当前对话为文本文件",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/export",
          "description": "导出当前对话为文本文件",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/export conversation.md"
          ],
          "entityKey": "cli:codex:会话管理:/export"
        }
      },
      {
        "entityKey": "cli:codex:上下文管理:/compact",
        "vendorId": "codex",
        "category": "上下文管理",
        "command": "/compact",
        "description": "压缩对话历史，释放上下文窗口",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/compact",
          "description": "压缩对话历史，释放上下文窗口",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/compact 重点关注 API 变更"
          ],
          "entityKey": "cli:codex:上下文管理:/compact"
        }
      },
      {
        "entityKey": "cli:codex:上下文管理:/context",
        "vendorId": "codex",
        "category": "上下文管理",
        "command": "/context",
        "description": "查看当前上下文使用情况",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/context",
          "description": "查看当前上下文使用情况",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:上下文管理:/context"
        }
      },
      {
        "entityKey": "cli:codex:模型配置:/model",
        "vendorId": "codex",
        "category": "模型配置",
        "command": "/model",
        "description": "切换当前会话使用的模型",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/model",
          "description": "切换当前会话使用的模型",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/model o4-mini",
            "/model o3"
          ],
          "entityKey": "cli:codex:模型配置:/model"
        }
      },
      {
        "entityKey": "cli:codex:审批与权限:/approval",
        "vendorId": "codex",
        "category": "审批与权限",
        "command": "/approval",
        "description": "查看或调整审批策略",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/approval",
          "description": "查看或调整审批策略",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/approval",
            "/approval on-request"
          ],
          "entityKey": "cli:codex:审批与权限:/approval"
        }
      },
      {
        "entityKey": "cli:codex:审批与权限:/permissions",
        "vendorId": "codex",
        "category": "审批与权限",
        "command": "/permissions",
        "description": "查看或更新工具权限设置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/permissions",
          "description": "查看或更新工具权限设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/allowed-tools"
          ],
          "entityKey": "cli:codex:审批与权限:/permissions"
        }
      },
      {
        "entityKey": "cli:codex:集成配置:/mcp",
        "vendorId": "codex",
        "category": "集成配置",
        "command": "/mcp",
        "description": "管理 MCP 服务器连接",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/mcp",
          "description": "管理 MCP 服务器连接",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:集成配置:/mcp"
        }
      },
      {
        "entityKey": "cli:codex:集成配置:/agent",
        "vendorId": "codex",
        "category": "集成配置",
        "command": "/agent",
        "description": "切换当前代理配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/agent",
          "description": "切换当前代理配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:集成配置:/agent"
        }
      },
      {
        "entityKey": "cli:codex:集成配置:/agents",
        "vendorId": "codex",
        "category": "集成配置",
        "command": "/agents",
        "description": "列出和管理子代理",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/agents",
          "description": "列出和管理子代理",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:集成配置:/agents"
        }
      },
      {
        "entityKey": "cli:codex:集成配置:/hooks",
        "vendorId": "codex",
        "category": "集成配置",
        "command": "/hooks",
        "description": "管理 Hook 配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/hooks",
          "description": "管理 Hook 配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:集成配置:/hooks"
        }
      },
      {
        "entityKey": "cli:codex:代码审查:/review",
        "vendorId": "codex",
        "category": "代码审查",
        "command": "/review",
        "description": "执行代码审查流程",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/review",
          "description": "执行代码审查流程",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:代码审查:/review"
        }
      },
      {
        "entityKey": "cli:codex:代码审查:/diff",
        "vendorId": "codex",
        "category": "代码审查",
        "command": "/diff",
        "description": "查看当前未提交的代码差异",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/diff",
          "description": "查看当前未提交的代码差异",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:代码审查:/diff"
        }
      },
      {
        "entityKey": "cli:codex:代码审查:/security-review",
        "vendorId": "codex",
        "category": "代码审查",
        "command": "/security-review",
        "description": "分析安全漏洞",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/security-review",
          "description": "分析安全漏洞",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:代码审查:/security-review"
        }
      },
      {
        "entityKey": "cli:codex:用量统计:/cost",
        "vendorId": "codex",
        "category": "用量统计",
        "command": "/cost",
        "description": "查看当前会话的费用统计",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/cost",
          "description": "查看当前会话的费用统计",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:用量统计:/cost"
        }
      },
      {
        "entityKey": "cli:codex:用量统计:/usage",
        "vendorId": "codex",
        "category": "用量统计",
        "command": "/usage",
        "description": "查看 API 用量和速率限制",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/usage",
          "description": "查看 API 用量和速率限制",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:用量统计:/usage"
        }
      },
      {
        "entityKey": "cli:codex:用量统计:/stats",
        "vendorId": "codex",
        "category": "用量统计",
        "command": "/stats",
        "description": "查看会话统计信息",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/stats",
          "description": "查看会话统计信息",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:用量统计:/stats"
        }
      },
      {
        "entityKey": "cli:codex:设置与外观:/status",
        "vendorId": "codex",
        "category": "设置与外观",
        "command": "/status",
        "description": "查看当前会话与配置状态",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/status",
          "description": "查看当前会话与配置状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:设置与外观:/status"
        }
      },
      {
        "entityKey": "cli:codex:设置与外观:/config",
        "vendorId": "codex",
        "category": "设置与外观",
        "command": "/config",
        "description": "查看和修改配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/config",
          "description": "查看和修改配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/settings"
          ],
          "entityKey": "cli:codex:设置与外观:/config"
        }
      },
      {
        "entityKey": "cli:codex:设置与外观:/theme",
        "vendorId": "codex",
        "category": "设置与外观",
        "command": "/theme",
        "description": "切换主题",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/theme",
          "description": "切换主题",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:设置与外观:/theme"
        }
      },
      {
        "entityKey": "cli:codex:记忆管理:/memory",
        "vendorId": "codex",
        "category": "记忆管理",
        "command": "/memory",
        "description": "管理记忆内容",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/memory",
          "description": "管理记忆内容",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:记忆管理:/memory"
        }
      },
      {
        "entityKey": "cli:codex:记忆管理:/init",
        "vendorId": "codex",
        "category": "记忆管理",
        "command": "/init",
        "description": "初始化项目指令文件",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/init",
          "description": "初始化项目指令文件",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:记忆管理:/init"
        }
      },
      {
        "entityKey": "cli:codex:自动化:/tasks",
        "vendorId": "codex",
        "category": "自动化",
        "command": "/tasks",
        "description": "列出和管理后台任务",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/tasks",
          "description": "列出和管理后台任务",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:自动化:/tasks"
        }
      },
      {
        "entityKey": "cli:codex:故障排查:/doctor",
        "vendorId": "codex",
        "category": "故障排查",
        "command": "/doctor",
        "description": "运行诊断检查",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/doctor",
          "description": "运行诊断检查",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:故障排查:/doctor"
        }
      },
      {
        "entityKey": "cli:codex:故障排查:/feedback",
        "vendorId": "codex",
        "category": "故障排查",
        "command": "/feedback",
        "description": "提交反馈",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "/feedback",
          "description": "提交反馈",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/bug"
          ],
          "entityKey": "cli:codex:故障排查:/feedback"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex",
        "description": "启动交互式 TUI 会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex",
          "description": "启动交互式 TUI 会话",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex",
          "entityKey": "cli:codex:CLI 启动方式:codex"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex exec",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex exec",
        "description": "非交互执行单次任务",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex exec",
          "description": "非交互执行单次任务",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex exec \"summarize this repo\"",
          "entityKey": "cli:codex:CLI 启动方式:codex exec"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex login",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex login",
        "description": "登录并配置认证",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex login",
          "description": "登录并配置认证",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex login",
          "entityKey": "cli:codex:CLI 启动方式:codex login"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex logout",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex logout",
        "description": "退出登录并清除认证",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex logout",
          "description": "退出登录并清除认证",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex logout",
          "entityKey": "cli:codex:CLI 启动方式:codex logout"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex status",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex status",
        "description": "查看认证和配置状态",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex status",
          "description": "查看认证和配置状态",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex status",
          "entityKey": "cli:codex:CLI 启动方式:codex status"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex mcp",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex mcp",
        "description": "管理 MCP 连接",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex mcp",
          "description": "管理 MCP 连接",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex mcp",
          "entityKey": "cli:codex:CLI 启动方式:codex mcp"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex agents",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex agents",
        "description": "列出和管理子代理",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex agents",
          "description": "列出和管理子代理",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex agents",
          "entityKey": "cli:codex:CLI 启动方式:codex agents"
        }
      },
      {
        "entityKey": "cli:codex:CLI 启动方式:codex update",
        "vendorId": "codex",
        "category": "CLI 启动方式",
        "command": "codex update",
        "description": "更新到最新版本",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "codex update",
          "description": "更新到最新版本",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex update",
          "entityKey": "cli:codex:CLI 启动方式:codex update"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--model",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--model",
        "description": "指定使用的 AI 模型",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--model",
          "description": "指定使用的 AI 模型",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --model o4-mini",
          "entityKey": "cli:codex:CLI 参数:--model"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--approval-policy",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--approval-policy",
        "description": "设置审批策略",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--approval-policy",
          "description": "设置审批策略",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --approval-policy on-request",
          "entityKey": "cli:codex:CLI 参数:--approval-policy"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--continue, -c",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--continue, -c",
        "description": "继续最近的会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--continue, -c",
          "description": "继续最近的会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --continue",
          "entityKey": "cli:codex:CLI 参数:--continue, -c"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--resume, -r",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--resume, -r",
        "description": "恢复特定会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--resume, -r",
          "description": "恢复特定会话",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --resume session-id",
          "entityKey": "cli:codex:CLI 参数:--resume, -r"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--name, -n",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--name, -n",
        "description": "设置会话名称",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--name, -n",
          "description": "设置会话名称",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex -n \"my-feature\"",
          "entityKey": "cli:codex:CLI 参数:--name, -n"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--system-prompt",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--system-prompt",
        "description": "设置系统提示",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--system-prompt",
          "description": "设置系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --system-prompt \"You are a Python expert\"",
          "entityKey": "cli:codex:CLI 参数:--system-prompt"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--system-prompt-file",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--system-prompt-file",
        "description": "从文件加载系统提示",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--system-prompt-file",
          "description": "从文件加载系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --system-prompt-file ./prompt.txt",
          "entityKey": "cli:codex:CLI 参数:--system-prompt-file"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--allowed-tools",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--allowed-tools",
        "description": "预授权工具列表",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--allowed-tools",
          "description": "预授权工具列表",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --allowed-tools \"Bash,Edit,Read\"",
          "entityKey": "cli:codex:CLI 参数:--allowed-tools"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--disallowed-tools",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--disallowed-tools",
        "description": "禁用工具列表",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--disallowed-tools",
          "description": "禁用工具列表",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --disallowed-tools \"Bash(curl *)\"",
          "entityKey": "cli:codex:CLI 参数:--disallowed-tools"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--dangerously-skip-permissions",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--dangerously-skip-permissions",
        "description": "跳过权限确认",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--dangerously-skip-permissions",
          "description": "跳过权限确认",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --dangerously-skip-permissions",
          "entityKey": "cli:codex:CLI 参数:--dangerously-skip-permissions"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--max-turns",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--max-turns",
        "description": "限制最大对话轮数",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--max-turns",
          "description": "限制最大对话轮数",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --max-turns 10",
          "entityKey": "cli:codex:CLI 参数:--max-turns"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--verbose",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--verbose",
        "description": "启用详细输出",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--verbose",
          "description": "启用详细输出",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --verbose",
          "entityKey": "cli:codex:CLI 参数:--verbose"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--debug",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--debug",
        "description": "启用调试模式",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--debug",
          "description": "启用调试模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --debug",
          "entityKey": "cli:codex:CLI 参数:--debug"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--worktree, -w",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--worktree, -w",
        "description": "在 git worktree 中启动",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--worktree, -w",
          "description": "在 git worktree 中启动",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --worktree feature-branch",
          "entityKey": "cli:codex:CLI 参数:--worktree, -w"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--output-format",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--output-format",
        "description": "设置输出格式",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--output-format",
          "description": "设置输出格式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --output-format json",
          "entityKey": "cli:codex:CLI 参数:--output-format"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--version, -v",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--version, -v",
        "description": "输出版本号",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--version, -v",
          "description": "输出版本号",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --version",
          "entityKey": "cli:codex:CLI 参数:--version, -v"
        }
      },
      {
        "entityKey": "cli:codex:CLI 参数:--help, -h",
        "vendorId": "codex",
        "category": "CLI 参数",
        "command": "--help, -h",
        "description": "查看帮助信息",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "--help, -h",
          "description": "查看帮助信息",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "codex --help",
          "entityKey": "cli:codex:CLI 参数:--help, -h"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + C",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + C",
        "description": "中断当前执行",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + C",
          "description": "中断当前执行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + C"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + D",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + D",
        "description": "退出会话",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + D",
          "description": "退出会话",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + D"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Esc Esc",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Esc Esc",
        "description": "编辑上一条输入",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Esc Esc",
          "description": "编辑上一条输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Esc Esc"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + L",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + L",
        "description": "清屏",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + L",
          "description": "清屏",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + L"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + K",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + K",
        "description": "清空输入行",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + K",
          "description": "清空输入行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + K"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + A",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + A",
        "description": "光标移到行首",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + A",
          "description": "光标移到行首",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + A"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + E",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + E",
        "description": "光标移到行尾",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + E",
          "description": "光标移到行尾",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + E"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + U",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + U",
        "description": "删除光标前所有内容",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + U",
          "description": "删除光标前所有内容",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + U"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + W",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + W",
        "description": "删除光标前一个单词",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + W",
          "description": "删除光标前一个单词",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + W"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + P / ↑",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + P / ↑",
        "description": "上一条历史记录",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + P / ↑",
          "description": "上一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + P / ↑"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + N / ↓",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + N / ↓",
        "description": "下一条历史记录",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + N / ↓",
          "description": "下一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + N / ↓"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + R",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + R",
        "description": "反向搜索历史",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + R",
          "description": "反向搜索历史",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + R"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + B",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + B",
        "description": "后台运行任务",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + B",
          "description": "后台运行任务",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + B"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Shift + Enter",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Shift + Enter",
        "description": "换行（多行输入）",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Shift + Enter",
          "description": "换行（多行输入）",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Shift + Enter"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Shift + Tab",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Shift + Tab",
        "description": "循环切换权限模式",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Shift + Tab",
          "description": "循环切换权限模式",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Shift + Tab"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:Ctrl + G",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "Ctrl + G",
        "description": "在编辑器中打开输入",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "Ctrl + G",
          "description": "在编辑器中打开输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:Ctrl + G"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:@",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "@",
        "description": "文件路径自动补全",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "@",
          "description": "文件路径自动补全",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:@"
        }
      },
      {
        "entityKey": "cli:codex:快捷键:! (行首)",
        "vendorId": "codex",
        "category": "快捷键",
        "command": "! (行首)",
        "description": "Bash 模式直接运行",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "! (行首)",
          "description": "Bash 模式直接运行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:快捷键:! (行首)"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:~/.codex/config.toml",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "~/.codex/config.toml",
        "description": "全局配置文件路径",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "~/.codex/config.toml",
          "description": "全局配置文件路径",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:~/.codex/config.toml"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:AGENTS.md",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "AGENTS.md",
        "description": "项目级指令文件",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "command": "AGENTS.md",
          "description": "项目级指令文件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方指令文件",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:AGENTS.md"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:approval_policy",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "approval_policy",
        "description": "默认审批策略字段",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "approval_policy",
          "description": "默认审批策略字段",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方字段",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:approval_policy"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:model",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "model",
        "description": "默认模型配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "model",
          "description": "默认模型配置",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方字段",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:model"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:env.*",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "env.*",
        "description": "环境变量配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "env.*",
          "description": "环境变量配置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:env.*"
        }
      },
      {
        "entityKey": "cli:codex:配置入口:hooks",
        "vendorId": "codex",
        "category": "配置入口",
        "command": "hooks",
        "description": "Hook 事件配置",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "command": "hooks",
          "description": "Hook 事件配置",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:codex:配置入口:hooks"
        }
      }
    ],
    "gemini": [
      {
        "entityKey": "cli:gemini:会话管理:/help",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/help",
        "description": "显示帮助与命令列表",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/help",
          "description": "显示帮助与命令列表",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:会话管理:/help"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/clear",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/clear",
        "description": "清空当前会话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/clear",
          "description": "清空当前会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/reset"
          ],
          "entityKey": "cli:gemini:会话管理:/clear"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/quit",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/quit",
        "description": "退出会话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/quit",
          "description": "退出会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/exit"
          ],
          "entityKey": "cli:gemini:会话管理:/quit"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/resume",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/resume",
        "description": "恢复之前的会话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/resume",
          "description": "恢复之前的会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/continue"
          ],
          "entityKey": "cli:gemini:会话管理:/resume"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/chat",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/chat",
        "description": "管理会话与对话线程",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/chat",
          "description": "管理会话与对话线程",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:会话管理:/chat"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/copy",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/copy",
        "description": "复制最近的响应到剪贴板",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/copy",
          "description": "复制最近的响应到剪贴板",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/copy"
          ],
          "entityKey": "cli:gemini:会话管理:/copy"
        }
      },
      {
        "entityKey": "cli:gemini:会话管理:/export",
        "vendorId": "gemini",
        "category": "会话管理",
        "command": "/export",
        "description": "导出当前对话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/export",
          "description": "导出当前对话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/export conversation.md"
          ],
          "entityKey": "cli:gemini:会话管理:/export"
        }
      },
      {
        "entityKey": "cli:gemini:上下文管理:/compress",
        "vendorId": "gemini",
        "category": "上下文管理",
        "command": "/compress",
        "description": "压缩上下文",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/compress",
          "description": "压缩上下文",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/compress 重点关注 API 变更"
          ],
          "entityKey": "cli:gemini:上下文管理:/compress"
        }
      },
      {
        "entityKey": "cli:gemini:上下文管理:/context",
        "vendorId": "gemini",
        "category": "上下文管理",
        "command": "/context",
        "description": "查看上下文使用情况",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/context",
          "description": "查看上下文使用情况",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:上下文管理:/context"
        }
      },
      {
        "entityKey": "cli:gemini:模型配置:/model",
        "vendorId": "gemini",
        "category": "模型配置",
        "command": "/model",
        "description": "切换当前模型",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/model",
          "description": "切换当前模型",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "/model gemini-2.5-flash",
            "/model gemini-2.5-pro"
          ],
          "entityKey": "cli:gemini:模型配置:/model"
        }
      },
      {
        "entityKey": "cli:gemini:集成配置:/mcp",
        "vendorId": "gemini",
        "category": "集成配置",
        "command": "/mcp",
        "description": "管理 MCP 连接",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/mcp",
          "description": "管理 MCP 连接",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:集成配置:/mcp"
        }
      },
      {
        "entityKey": "cli:gemini:集成配置:/extensions",
        "vendorId": "gemini",
        "category": "集成配置",
        "command": "/extensions",
        "description": "管理扩展",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/extensions",
          "description": "管理扩展",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:集成配置:/extensions"
        }
      },
      {
        "entityKey": "cli:gemini:集成配置:/tools",
        "vendorId": "gemini",
        "category": "集成配置",
        "command": "/tools",
        "description": "查看工具状态",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/tools",
          "description": "查看工具状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:集成配置:/tools"
        }
      },
      {
        "entityKey": "cli:gemini:集成配置:/hooks",
        "vendorId": "gemini",
        "category": "集成配置",
        "command": "/hooks",
        "description": "管理 Hook 配置",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/hooks",
          "description": "管理 Hook 配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:集成配置:/hooks"
        }
      },
      {
        "entityKey": "cli:gemini:权限管理:/permissions",
        "vendorId": "gemini",
        "category": "权限管理",
        "command": "/permissions",
        "description": "查看或更新权限设置",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/permissions",
          "description": "查看或更新权限设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/allowed-tools"
          ],
          "entityKey": "cli:gemini:权限管理:/permissions"
        }
      },
      {
        "entityKey": "cli:gemini:用量统计:/cost",
        "vendorId": "gemini",
        "category": "用量统计",
        "command": "/cost",
        "description": "查看费用统计",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/cost",
          "description": "查看费用统计",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:用量统计:/cost"
        }
      },
      {
        "entityKey": "cli:gemini:用量统计:/stats",
        "vendorId": "gemini",
        "category": "用量统计",
        "command": "/stats",
        "description": "查看会话统计",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/stats",
          "description": "查看会话统计",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:用量统计:/stats"
        }
      },
      {
        "entityKey": "cli:gemini:用量统计:/usage",
        "vendorId": "gemini",
        "category": "用量统计",
        "command": "/usage",
        "description": "查看 API 用量",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/usage",
          "description": "查看 API 用量",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:用量统计:/usage"
        }
      },
      {
        "entityKey": "cli:gemini:设置与外观:/settings",
        "vendorId": "gemini",
        "category": "设置与外观",
        "command": "/settings",
        "description": "查看和修改设置",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/settings",
          "description": "查看和修改设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/config"
          ],
          "entityKey": "cli:gemini:设置与外观:/settings"
        }
      },
      {
        "entityKey": "cli:gemini:设置与外观:/theme",
        "vendorId": "gemini",
        "category": "设置与外观",
        "command": "/theme",
        "description": "切换主题",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/theme",
          "description": "切换主题",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:设置与外观:/theme"
        }
      },
      {
        "entityKey": "cli:gemini:设置与外观:/status",
        "vendorId": "gemini",
        "category": "设置与外观",
        "command": "/status",
        "description": "查看当前会话状态",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/status",
          "description": "查看当前会话状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:设置与外观:/status"
        }
      },
      {
        "entityKey": "cli:gemini:记忆管理:/memory",
        "vendorId": "gemini",
        "category": "记忆管理",
        "command": "/memory",
        "description": "管理记忆内容",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/memory",
          "description": "管理记忆内容",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:记忆管理:/memory"
        }
      },
      {
        "entityKey": "cli:gemini:记忆管理:/init",
        "vendorId": "gemini",
        "category": "记忆管理",
        "command": "/init",
        "description": "初始化项目",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/init",
          "description": "初始化项目",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:记忆管理:/init"
        }
      },
      {
        "entityKey": "cli:gemini:自动化:/tasks",
        "vendorId": "gemini",
        "category": "自动化",
        "command": "/tasks",
        "description": "管理后台任务",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/tasks",
          "description": "管理后台任务",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:自动化:/tasks"
        }
      },
      {
        "entityKey": "cli:gemini:认证管理:/auth",
        "vendorId": "gemini",
        "category": "认证管理",
        "command": "/auth",
        "description": "管理认证状态",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/auth",
          "description": "管理认证状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:认证管理:/auth"
        }
      },
      {
        "entityKey": "cli:gemini:故障排查:/about",
        "vendorId": "gemini",
        "category": "故障排查",
        "command": "/about",
        "description": "查看版本与构建信息",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/about",
          "description": "查看版本与构建信息",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:故障排查:/about"
        }
      },
      {
        "entityKey": "cli:gemini:故障排查:/version",
        "vendorId": "gemini",
        "category": "故障排查",
        "command": "/version",
        "description": "查看版本信息",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/version",
          "description": "查看版本信息",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:故障排查:/version"
        }
      },
      {
        "entityKey": "cli:gemini:故障排查:/bug",
        "vendorId": "gemini",
        "category": "故障排查",
        "command": "/bug",
        "description": "提交问题反馈",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/bug",
          "description": "提交问题反馈",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "aliases": [
            "/feedback"
          ],
          "entityKey": "cli:gemini:故障排查:/bug"
        }
      },
      {
        "entityKey": "cli:gemini:故障排查:/doctor",
        "vendorId": "gemini",
        "category": "故障排查",
        "command": "/doctor",
        "description": "运行诊断检查",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "/doctor",
          "description": "运行诊断检查",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:故障排查:/doctor"
        }
      },
      {
        "entityKey": "cli:gemini:上下文注入:@<path>",
        "vendorId": "gemini",
        "category": "上下文注入",
        "command": "@<path>",
        "description": "将文件或目录注入上下文",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "@<path>",
          "description": "将文件或目录注入上下文",
          "badge": "at",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方语法",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "@src/auth/middleware.ts"
          ],
          "entityKey": "cli:gemini:上下文注入:@<path>"
        }
      },
      {
        "entityKey": "cli:gemini:上下文注入:!<shell_command>",
        "vendorId": "gemini",
        "category": "上下文注入",
        "command": "!<shell_command>",
        "description": "执行本地 shell 命令并注入输出",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "!<shell_command>",
          "description": "执行本地 shell 命令并注入输出",
          "badge": "shell",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方语法",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "examples": [
            "!git status"
          ],
          "entityKey": "cli:gemini:上下文注入:!<shell_command>"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini",
        "description": "启动交互式会话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "command": "gemini",
          "description": "启动交互式会话",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini",
          "entityKey": "cli:gemini:CLI 启动方式:gemini"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini -p",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini -p",
        "description": "非交互执行单次任务",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "gemini -p",
          "description": "非交互执行单次任务",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini -p \"explain this error\"",
          "entityKey": "cli:gemini:CLI 启动方式:gemini -p"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini login",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini login",
        "description": "登录认证",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "command": "gemini login",
          "description": "登录认证",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini login",
          "entityKey": "cli:gemini:CLI 启动方式:gemini login"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini logout",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini logout",
        "description": "退出登录",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "command": "gemini logout",
          "description": "退出登录",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini logout",
          "entityKey": "cli:gemini:CLI 启动方式:gemini logout"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini status",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini status",
        "description": "查看状态",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "command": "gemini status",
          "description": "查看状态",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini status",
          "entityKey": "cli:gemini:CLI 启动方式:gemini status"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 启动方式:gemini mcp",
        "vendorId": "gemini",
        "category": "CLI 启动方式",
        "command": "gemini mcp",
        "description": "管理 MCP 连接",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "command": "gemini mcp",
          "description": "管理 MCP 连接",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini mcp",
          "entityKey": "cli:gemini:CLI 启动方式:gemini mcp"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--model",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--model",
        "description": "指定模型名称",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--model",
          "description": "指定模型名称",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --model gemini-2.5-flash",
          "entityKey": "cli:gemini:CLI 参数:--model"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--system-prompt",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--system-prompt",
        "description": "设置系统提示",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--system-prompt",
          "description": "设置系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --system-prompt \"You are a Go expert\"",
          "entityKey": "cli:gemini:CLI 参数:--system-prompt"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--system-prompt-file",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--system-prompt-file",
        "description": "从文件加载系统提示",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--system-prompt-file",
          "description": "从文件加载系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --system-prompt-file ./prompt.txt",
          "entityKey": "cli:gemini:CLI 参数:--system-prompt-file"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--allowed-tools",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--allowed-tools",
        "description": "预授权工具列表",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--allowed-tools",
          "description": "预授权工具列表",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --allowed-tools \"Bash,Edit,Read\"",
          "entityKey": "cli:gemini:CLI 参数:--allowed-tools"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--disallowed-tools",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--disallowed-tools",
        "description": "禁用工具列表",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--disallowed-tools",
          "description": "禁用工具列表",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --disallowed-tools \"Bash(curl *)\"",
          "entityKey": "cli:gemini:CLI 参数:--disallowed-tools"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--max-turns",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--max-turns",
        "description": "限制最大对话轮数",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--max-turns",
          "description": "限制最大对话轮数",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --max-turns 10",
          "entityKey": "cli:gemini:CLI 参数:--max-turns"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--verbose",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--verbose",
        "description": "启用详细输出",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--verbose",
          "description": "启用详细输出",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --verbose",
          "entityKey": "cli:gemini:CLI 参数:--verbose"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--debug",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--debug",
        "description": "启用调试模式",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--debug",
          "description": "启用调试模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --debug",
          "entityKey": "cli:gemini:CLI 参数:--debug"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--version",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--version",
        "description": "查看版本信息",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--version",
          "description": "查看版本信息",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --version",
          "entityKey": "cli:gemini:CLI 参数:--version"
        }
      },
      {
        "entityKey": "cli:gemini:CLI 参数:--help",
        "vendorId": "gemini",
        "category": "CLI 参数",
        "command": "--help",
        "description": "查看参数说明",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "--help",
          "description": "查看参数说明",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "gemini --help",
          "entityKey": "cli:gemini:CLI 参数:--help"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + C",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + C",
        "description": "中断当前执行",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + C",
          "description": "中断当前执行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + C"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + D",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + D",
        "description": "退出会话",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + D",
          "description": "退出会话",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + D"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Esc Esc",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Esc Esc",
        "description": "编辑上一条输入",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Esc Esc",
          "description": "编辑上一条输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Esc Esc"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + L",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + L",
        "description": "清屏",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + L",
          "description": "清屏",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + L"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + K",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + K",
        "description": "清空输入行",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + K",
          "description": "清空输入行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + K"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + A",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + A",
        "description": "光标移到行首",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + A",
          "description": "光标移到行首",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + A"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + E",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + E",
        "description": "光标移到行尾",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + E",
          "description": "光标移到行尾",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + E"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + U",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + U",
        "description": "删除光标前所有内容",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + U",
          "description": "删除光标前所有内容",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + U"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + W",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + W",
        "description": "删除光标前一个单词",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + W",
          "description": "删除光标前一个单词",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + W"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + P / ↑",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + P / ↑",
        "description": "上一条历史记录",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + P / ↑",
          "description": "上一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + P / ↑"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + N / ↓",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + N / ↓",
        "description": "下一条历史记录",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + N / ↓",
          "description": "下一条历史记录",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + N / ↓"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + R",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + R",
        "description": "反向搜索历史",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + R",
          "description": "反向搜索历史",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + R"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + B",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + B",
        "description": "后台运行任务",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + B",
          "description": "后台运行任务",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + B"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Shift + Enter",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Shift + Enter",
        "description": "换行（多行输入）",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Shift + Enter",
          "description": "换行（多行输入）",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Shift + Enter"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:Ctrl + G",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "Ctrl + G",
        "description": "在编辑器中打开输入",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "Ctrl + G",
          "description": "在编辑器中打开输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:Ctrl + G"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:@",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "@",
        "description": "文件路径自动补全",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "@",
          "description": "文件路径自动补全",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:@"
        }
      },
      {
        "entityKey": "cli:gemini:快捷键:! (行首)",
        "vendorId": "gemini",
        "category": "快捷键",
        "command": "! (行首)",
        "description": "Bash 模式直接运行",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "command": "! (行首)",
          "description": "Bash 模式直接运行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:快捷键:! (行首)"
        }
      },
      {
        "entityKey": "cli:gemini:配置入口:GEMINI.md",
        "vendorId": "gemini",
        "category": "配置入口",
        "command": "GEMINI.md",
        "description": "项目级指令文件",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "command": "GEMINI.md",
          "description": "项目级指令文件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方文件说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:配置入口:GEMINI.md"
        }
      },
      {
        "entityKey": "cli:gemini:配置入口:GEMINI_API_KEY",
        "vendorId": "gemini",
        "category": "配置入口",
        "command": "GEMINI_API_KEY",
        "description": "API Key 环境变量",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "command": "GEMINI_API_KEY",
          "description": "API Key 环境变量",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:配置入口:GEMINI_API_KEY"
        }
      },
      {
        "entityKey": "cli:gemini:配置入口:GOOGLE_API_KEY",
        "vendorId": "gemini",
        "category": "配置入口",
        "command": "GOOGLE_API_KEY",
        "description": "Google API Key 环境变量",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "command": "GOOGLE_API_KEY",
          "description": "Google API Key 环境变量",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:配置入口:GOOGLE_API_KEY"
        }
      },
      {
        "entityKey": "cli:gemini:配置入口:settings.json",
        "vendorId": "gemini",
        "category": "配置入口",
        "command": "settings.json",
        "description": "用户级配置文件",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "command": "settings.json",
          "description": "用户级配置文件",
          "badge": "setting",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:gemini:配置入口:settings.json"
        }
      }
    ],
    "opencode": [
      {
        "entityKey": "cli:opencode:会话命令:/help",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/help",
        "description": "显示可用命令列表",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/help",
          "description": "显示可用命令列表",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/help"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/clear",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/clear",
        "description": "清空当前会话上下文",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/clear",
          "description": "清空当前会话上下文",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/clear"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/quit",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/quit",
        "description": "退出会话",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/quit",
          "description": "退出会话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/quit"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/model",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/model",
        "description": "切换当前模型",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/model",
          "description": "切换当前模型",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/model"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/mcp",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/mcp",
        "description": "管理 MCP 服务器",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/mcp",
          "description": "管理 MCP 服务器",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/mcp"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/settings",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/settings",
        "description": "查看和修改设置",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/settings",
          "description": "查看和修改设置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/settings"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/status",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/status",
        "description": "查看当前会话状态",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/status",
          "description": "查看当前会话状态",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/status"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/config",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/config",
        "description": "查看配置信息",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/config",
          "description": "查看配置信息",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/config"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/memory",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/memory",
        "description": "管理记忆内容",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/memory",
          "description": "管理记忆内容",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/memory"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/export",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/export",
        "description": "导出当前对话",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/export",
          "description": "导出当前对话",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/export"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/bug",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/bug",
        "description": "提交问题反馈",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/bug",
          "description": "提交问题反馈",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/bug"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/feedback",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/feedback",
        "description": "提交反馈",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/feedback",
          "description": "提交反馈",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/feedback"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/version",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/version",
        "description": "查看版本信息",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/version",
          "description": "查看版本信息",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/version"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/init",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/init",
        "description": "初始化项目",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/init",
          "description": "初始化项目",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/init"
        }
      },
      {
        "entityKey": "cli:opencode:会话命令:/hooks",
        "vendorId": "opencode",
        "category": "会话命令",
        "command": "/hooks",
        "description": "管理 Hook 配置",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "/hooks",
          "description": "管理 Hook 配置",
          "badge": "slash",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:会话命令:/hooks"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 命令:opencode",
        "vendorId": "opencode",
        "category": "CLI 命令",
        "command": "opencode",
        "description": "启动交互式会话",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "opencode",
          "description": "启动交互式会话",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:CLI 命令:opencode"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 命令:opencode --help",
        "vendorId": "opencode",
        "category": "CLI 命令",
        "command": "opencode --help",
        "description": "查看帮助信息",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "opencode --help",
          "description": "查看帮助信息",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:CLI 命令:opencode --help"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 命令:opencode --version",
        "vendorId": "opencode",
        "category": "CLI 命令",
        "command": "opencode --version",
        "description": "查看版本信息",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "opencode --version",
          "description": "查看版本信息",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:CLI 命令:opencode --version"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--model",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--model",
        "description": "指定使用的 AI 模型",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--model",
          "description": "指定使用的 AI 模型",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --model claude-sonnet-4-6",
          "entityKey": "cli:opencode:CLI 参数:--model"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--config",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--config",
        "description": "指定配置文件路径",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--config",
          "description": "指定配置文件路径",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --config ./opencode.json",
          "entityKey": "cli:opencode:CLI 参数:--config"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--verbose",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--verbose",
        "description": "启用详细输出",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--verbose",
          "description": "启用详细输出",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --verbose",
          "entityKey": "cli:opencode:CLI 参数:--verbose"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--debug",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--debug",
        "description": "启用调试模式",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--debug",
          "description": "启用调试模式",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --debug",
          "entityKey": "cli:opencode:CLI 参数:--debug"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--system-prompt",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--system-prompt",
        "description": "设置系统提示",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--system-prompt",
          "description": "设置系统提示",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --system-prompt \"You are a Rust expert\"",
          "entityKey": "cli:opencode:CLI 参数:--system-prompt"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--allowed-tools",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--allowed-tools",
        "description": "预授权工具列表",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--allowed-tools",
          "description": "预授权工具列表",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --allowed-tools \"Bash,Edit,Read\"",
          "entityKey": "cli:opencode:CLI 参数:--allowed-tools"
        }
      },
      {
        "entityKey": "cli:opencode:CLI 参数:--max-turns",
        "vendorId": "opencode",
        "category": "CLI 参数",
        "command": "--max-turns",
        "description": "限制最大对话轮数",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "--max-turns",
          "description": "限制最大对话轮数",
          "badge": "flag",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方参数",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "usage": "opencode --max-turns 10",
          "entityKey": "cli:opencode:CLI 参数:--max-turns"
        }
      },
      {
        "entityKey": "cli:opencode:配置入口:opencode.json",
        "vendorId": "opencode",
        "category": "配置入口",
        "command": "opencode.json",
        "description": "项目级配置文件",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "opencode.json",
          "description": "项目级配置文件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:配置入口:opencode.json"
        }
      },
      {
        "entityKey": "cli:opencode:配置入口:~/.config/opencode/opencode.json",
        "vendorId": "opencode",
        "category": "配置入口",
        "command": "~/.config/opencode/opencode.json",
        "description": "全局配置文件",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "~/.config/opencode/opencode.json",
          "description": "全局配置文件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:配置入口:~/.config/opencode/opencode.json"
        }
      },
      {
        "entityKey": "cli:opencode:配置入口:AGENTS.md",
        "vendorId": "opencode",
        "category": "配置入口",
        "command": "AGENTS.md",
        "description": "项目级指令文件",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "AGENTS.md",
          "description": "项目级指令文件",
          "badge": "cli",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方指令文件",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:配置入口:AGENTS.md"
        }
      },
      {
        "entityKey": "cli:opencode:快捷键:Ctrl + C",
        "vendorId": "opencode",
        "category": "快捷键",
        "command": "Ctrl + C",
        "description": "中断当前执行",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "Ctrl + C",
          "description": "中断当前执行",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:快捷键:Ctrl + C"
        }
      },
      {
        "entityKey": "cli:opencode:快捷键:Ctrl + D",
        "vendorId": "opencode",
        "category": "快捷键",
        "command": "Ctrl + D",
        "description": "退出会话",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "Ctrl + D",
          "description": "退出会话",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:快捷键:Ctrl + D"
        }
      },
      {
        "entityKey": "cli:opencode:快捷键:Esc Esc",
        "vendorId": "opencode",
        "category": "快捷键",
        "command": "Esc Esc",
        "description": "编辑上一条输入",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "Esc Esc",
          "description": "编辑上一条输入",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:快捷键:Esc Esc"
        }
      },
      {
        "entityKey": "cli:opencode:快捷键:Ctrl + L",
        "vendorId": "opencode",
        "category": "快捷键",
        "command": "Ctrl + L",
        "description": "清屏",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "Ctrl + L",
          "description": "清屏",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:快捷键:Ctrl + L"
        }
      },
      {
        "entityKey": "cli:opencode:快捷键:Ctrl + R",
        "vendorId": "opencode",
        "category": "快捷键",
        "command": "Ctrl + R",
        "description": "反向搜索历史",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "command": "Ctrl + R",
          "description": "反向搜索历史",
          "badge": "shortcut",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "cli:opencode:快捷键:Ctrl + R"
        }
      }
    ]
  },
  "skills": {
    "claude": [
      {
        "entityKey": "guide:skills:claude:概述:Skills 定义",
        "vendorId": "claude",
        "category": "概述",
        "title": "Skills 定义",
        "description": "Skill 是按需加载的指令模块，每个 Skill 目录包含一个 SKILL.md。Claude 会按请求语义自动匹配和调用，避免将所有指令注入上下文。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "Skills 定义",
          "description": "Skill 是按需加载的指令模块，每个 Skill 目录包含一个 SKILL.md。Claude 会按请求语义自动匹配和调用，避免将所有指令注入上下文。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方定义",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:概述:Skills 定义"
        }
      },
      {
        "entityKey": "guide:skills:claude:概述:加载策略",
        "vendorId": "claude",
        "category": "概述",
        "title": "加载策略",
        "description": "Skills 使用渐进式加载，仅在匹配到相关任务时才加载对应 SKILL.md，大幅节省上下文窗口。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "加载策略",
          "description": "Skills 使用渐进式加载，仅在匹配到相关任务时才加载对应 SKILL.md，大幅节省上下文窗口。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方行为说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:概述:加载策略"
        }
      },
      {
        "entityKey": "guide:skills:claude:概述:匹配机制",
        "vendorId": "claude",
        "category": "概述",
        "title": "匹配机制",
        "description": "Claude 根据 SKILL.md 中的 name 和 description 字段进行语义匹配，无需显式调用即可自动触发。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "匹配机制",
          "description": "Claude 根据 SKILL.md 中的 name 和 description 字段进行语义匹配，无需显式调用即可自动触发。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方匹配说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:概述:匹配机制"
        }
      },
      {
        "entityKey": "guide:skills:claude:目录结构:项目级",
        "vendorId": "claude",
        "category": "目录结构",
        "title": "项目级",
        "description": "项目内 Skill 目录路径，仅在当前项目生效。",
        "code": ".claude/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "项目级",
          "description": "项目内 Skill 目录路径，仅在当前项目生效。",
          "code": ".claude/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:目录结构:项目级"
        }
      },
      {
        "entityKey": "guide:skills:claude:目录结构:用户级",
        "vendorId": "claude",
        "category": "目录结构",
        "title": "用户级",
        "description": "用户全局 Skill 目录路径，对所有项目生效。",
        "code": "~/.claude/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "用户级",
          "description": "用户全局 Skill 目录路径，对所有项目生效。",
          "code": "~/.claude/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:目录结构:用户级"
        }
      },
      {
        "entityKey": "guide:skills:claude:调用方式:自动调用",
        "vendorId": "claude",
        "category": "调用方式",
        "title": "自动调用",
        "description": "在自然语言任务匹配到 skill 描述时，Claude 自动加载对应 Skill，无需手动触发。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "自动调用",
          "description": "在自然语言任务匹配到 skill 描述时，Claude 自动加载对应 Skill，无需手动触发。",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:调用方式:自动调用"
        }
      },
      {
        "entityKey": "guide:skills:claude:调用方式:显式调用",
        "vendorId": "claude",
        "category": "调用方式",
        "title": "显式调用",
        "description": "使用 $skill-name 显式触发指定 Skill，适合精确控制场景。",
        "code": "$code-review 请审查 src/main.ts",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "显式调用",
          "description": "使用 $skill-name 显式触发指定 Skill，适合精确控制场景。",
          "code": "$code-review 请审查 src/main.ts",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方语法",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:调用方式:显式调用"
        }
      },
      {
        "entityKey": "guide:skills:claude:调用方式:/skills 命令",
        "vendorId": "claude",
        "category": "调用方式",
        "title": "/skills 命令",
        "description": "列出所有已安装的 Skills，查看可用技能列表。",
        "code": "/skills",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "/skills 命令",
          "description": "列出所有已安装的 Skills，查看可用技能列表。",
          "code": "/skills",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:调用方式:/skills 命令"
        }
      },
      {
        "entityKey": "guide:skills:claude:SKILL.md 结构:Frontmatter + 指令正文",
        "vendorId": "claude",
        "category": "SKILL.md 结构",
        "title": "Frontmatter + 指令正文",
        "description": "SKILL.md 使用 YAML frontmatter 定义元数据（name、description），并用 Markdown 编写任务指令。",
        "code": "---\nname: code-review\ndescription: Review code changes with security and reliability checks\n---\n\n# Workflow\n1. Read the diff\n2. Identify bugs and risks\n3. Propose actionable fixes",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "Frontmatter + 指令正文",
          "description": "SKILL.md 使用 YAML frontmatter 定义元数据（name、description），并用 Markdown 编写任务指令。",
          "code": "---\nname: code-review\ndescription: Review code changes with security and reliability checks\n---\n\n# Workflow\n1. Read the diff\n2. Identify bugs and risks\n3. Propose actionable fixes",
          "badge": "template",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方示例结构",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:SKILL.md 结构:Frontmatter + 指令正文"
        }
      },
      {
        "entityKey": "guide:skills:claude:SKILL.md 结构:最佳实践",
        "vendorId": "claude",
        "category": "SKILL.md 结构",
        "title": "最佳实践",
        "description": "保持 Skill 职责单一，描述清晰具体。避免在 SKILL.md 中放置过多通用指令，应聚焦特定任务域。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "最佳实践",
          "description": "保持 Skill 职责单一，描述清晰具体。避免在 SKILL.md 中放置过多通用指令，应聚焦特定任务域。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方建议",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:SKILL.md 结构:最佳实践"
        }
      },
      {
        "entityKey": "guide:skills:claude:技能发现:扫描机制",
        "vendorId": "claude",
        "category": "技能发现",
        "title": "扫描机制",
        "description": "Claude Code 启动时自动扫描项目级和用户级 Skills 目录，加载所有 SKILL.md 的元数据。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "扫描机制",
          "description": "Claude Code 启动时自动扫描项目级和用户级 Skills 目录，加载所有 SKILL.md 的元数据。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方扫描说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:技能发现:扫描机制"
        }
      },
      {
        "entityKey": "guide:skills:claude:技能发现:缓存策略",
        "vendorId": "claude",
        "category": "技能发现",
        "title": "缓存策略",
        "description": "Skills 元数据会被缓存，修改 SKILL.md 后需要重启会话或重新扫描才能生效。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "缓存策略",
          "description": "Skills 元数据会被缓存，修改 SKILL.md 后需要重启会话或重新扫描才能生效。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方缓存说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:技能发现:缓存策略"
        }
      },
      {
        "entityKey": "guide:skills:claude:技能开发:创建流程",
        "vendorId": "claude",
        "category": "技能开发",
        "title": "创建流程",
        "description": "在 .claude/skills/ 下创建以 Skill 名命名的目录，在其中编写 SKILL.md 文件。",
        "code": "mkdir -p .claude/skills/my-skill\ntouch .claude/skills/my-skill/SKILL.md",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "创建流程",
          "description": "在 .claude/skills/ 下创建以 Skill 名命名的目录，在其中编写 SKILL.md 文件。",
          "code": "mkdir -p .claude/skills/my-skill\ntouch .claude/skills/my-skill/SKILL.md",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方创建方式",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:技能开发:创建流程"
        }
      },
      {
        "entityKey": "guide:skills:claude:技能开发:测试方法",
        "vendorId": "claude",
        "category": "技能开发",
        "title": "测试方法",
        "description": "使用 /skills 确认 Skill 已被发现，然后用自然语言任务触发测试匹配效果。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "测试方法",
          "description": "使用 /skills 确认 Skill 已被发现，然后用自然语言任务触发测试匹配效果。",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方测试建议",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:技能开发:测试方法"
        }
      },
      {
        "entityKey": "guide:skills:claude:常见问题:Skill 未被加载",
        "vendorId": "claude",
        "category": "常见问题",
        "title": "Skill 未被加载",
        "description": "检查目录结构是否正确（.claude/skills/<name>/SKILL.md），确认 SKILL.md 包含有效的 YAML frontmatter。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "Skill 未被加载",
          "description": "检查目录结构是否正确（.claude/skills/<name>/SKILL.md），确认 SKILL.md 包含有效的 YAML frontmatter。",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方排查建议",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:常见问题:Skill 未被加载"
        }
      },
      {
        "entityKey": "guide:skills:claude:常见问题:匹配不准确",
        "vendorId": "claude",
        "category": "常见问题",
        "title": "匹配不准确",
        "description": "优化 SKILL.md 中的 description 字段，使其更具体和独特，避免过于通用的描述。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "匹配不准确",
          "description": "优化 SKILL.md 中的 description 字段，使其更具体和独特，避免过于通用的描述。",
          "badge": "optimize",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方优化建议",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/skills",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:常见问题:匹配不准确"
        }
      },
      {
        "entityKey": "guide:skills:claude:与 CLAUDE.md 的关系:互补设计",
        "vendorId": "claude",
        "category": "与 CLAUDE.md 的关系",
        "title": "互补设计",
        "description": "CLAUDE.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。两者互补，不应重复。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/memory",
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "互补设计",
          "description": "CLAUDE.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。两者互补，不应重复。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方设计说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/memory",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:与 CLAUDE.md 的关系:互补设计"
        }
      },
      {
        "entityKey": "guide:skills:claude:与 CLAUDE.md 的关系:优先级",
        "vendorId": "claude",
        "category": "与 CLAUDE.md 的关系",
        "title": "优先级",
        "description": "CLAUDE.md 始终加载，Skills 按需加载。通用规则放 CLAUDE.md，特定工作流放 Skills。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/memory",
          "https://docs.anthropic.com/en/docs/claude-code/skills"
        ],
        "payload": {
          "title": "优先级",
          "description": "CLAUDE.md 始终加载，Skills 按需加载。通用规则放 CLAUDE.md，特定工作流放 Skills。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方优先级说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/memory",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:claude:与 CLAUDE.md 的关系:优先级"
        }
      }
    ],
    "codex": [
      {
        "entityKey": "guide:skills:codex:概述:Agent Skills 机制",
        "vendorId": "codex",
        "category": "概述",
        "title": "Agent Skills 机制",
        "description": "Codex 使用 Agent Skills 作为可复用能力包，通过 AGENTS.md 和项目指令文件定义行为，按任务语义按需加载。",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "Agent Skills 机制",
          "description": "Codex 使用 Agent Skills 作为可复用能力包，通过 AGENTS.md 和项目指令文件定义行为，按任务语义按需加载。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方定义",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:概述:Agent Skills 机制"
        }
      },
      {
        "entityKey": "guide:skills:codex:概述:官方优先语义",
        "vendorId": "codex",
        "category": "概述",
        "title": "官方优先语义",
        "description": "本手册仅保留官方可验证的 Skills 语义，不收录社区未验证命令。",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "官方优先语义",
          "description": "本手册仅保留官方可验证的 Skills 语义，不收录社区未验证命令。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "治理策略",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:概述:官方优先语义"
        }
      },
      {
        "entityKey": "guide:skills:codex:目录与作用域:项目级目录",
        "vendorId": "codex",
        "category": "目录与作用域",
        "title": "项目级目录",
        "description": "仓库级 Skills 目录，仅在当前仓库生效。",
        "code": ".agents/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "项目级目录",
          "description": "仓库级 Skills 目录，仅在当前仓库生效。",
          "code": ".agents/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:目录与作用域:项目级目录"
        }
      },
      {
        "entityKey": "guide:skills:codex:目录与作用域:用户级目录",
        "vendorId": "codex",
        "category": "目录与作用域",
        "title": "用户级目录",
        "description": "用户全局 Skills 目录，对所有项目生效。",
        "code": "~/.agents/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "用户级目录",
          "description": "用户全局 Skills 目录，对所有项目生效。",
          "code": "~/.agents/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:目录与作用域:用户级目录"
        }
      },
      {
        "entityKey": "guide:skills:codex:目录与作用域:AGENTS.md",
        "vendorId": "codex",
        "category": "目录与作用域",
        "title": "AGENTS.md",
        "description": "项目级指令文件，定义 Codex 在该项目中的行为准则。",
        "code": "AGENTS.md",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "AGENTS.md",
          "description": "项目级指令文件，定义 Codex 在该项目中的行为准则。",
          "code": "AGENTS.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方指令文件",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:目录与作用域:AGENTS.md"
        }
      },
      {
        "entityKey": "guide:skills:codex:编写规范:SKILL.md 结构",
        "vendorId": "codex",
        "category": "编写规范",
        "title": "SKILL.md 结构",
        "description": "保持单一职责，明确触发条件、执行步骤、输入输出与失败处理。",
        "code": "---\nname: migrate-db\ndescription: Plan and execute safe schema migration\n---\n\n# Inputs\n- migration target\n\n# Workflow\n1. Inspect schema\n2. Propose migration plan\n3. Apply and verify",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "SKILL.md 结构",
          "description": "保持单一职责，明确触发条件、执行步骤、输入输出与失败处理。",
          "code": "---\nname: migrate-db\ndescription: Plan and execute safe schema migration\n---\n\n# Inputs\n- migration target\n\n# Workflow\n1. Inspect schema\n2. Propose migration plan\n3. Apply and verify",
          "badge": "template",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方示例",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:编写规范:SKILL.md 结构"
        }
      },
      {
        "entityKey": "guide:skills:codex:编写规范:调用方式",
        "vendorId": "codex",
        "category": "编写规范",
        "title": "调用方式",
        "description": "可按提示语义自动调用，也可通过 $skill-name 显式调用。",
        "code": "$migrate-db users table",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "调用方式",
          "description": "可按提示语义自动调用，也可通过 $skill-name 显式调用。",
          "code": "$migrate-db users table",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:编写规范:调用方式"
        }
      },
      {
        "entityKey": "guide:skills:codex:质量要求:最小漂移原则",
        "vendorId": "codex",
        "category": "质量要求",
        "title": "最小漂移原则",
        "description": "禁止使用过时字段名与历史路径（例如旧版 skills 路径与 legacy 审批字段）。",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "最小漂移原则",
          "description": "禁止使用过时字段名与历史路径（例如旧版 skills 路径与 legacy 审批字段）。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方当前语义约束",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:质量要求:最小漂移原则"
        }
      },
      {
        "entityKey": "guide:skills:codex:质量要求:可验证输出",
        "vendorId": "codex",
        "category": "质量要求",
        "title": "可验证输出",
        "description": "Skill 输出必须可被测试或命令验证，避免仅描述性结果。",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "可验证输出",
          "description": "Skill 输出必须可被测试或命令验证，避免仅描述性结果。",
          "badge": "field",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "实践约束",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:质量要求:可验证输出"
        }
      },
      {
        "entityKey": "guide:skills:codex:技能发现:扫描机制",
        "vendorId": "codex",
        "category": "技能发现",
        "title": "扫描机制",
        "description": "Codex 启动时扫描项目级和用户级 Skills 目录，加载所有可用的 Skills。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "扫描机制",
          "description": "Codex 启动时扫描项目级和用户级 Skills 目录，加载所有可用的 Skills。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方扫描说明",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:技能发现:扫描机制"
        }
      },
      {
        "entityKey": "guide:skills:codex:技能发现:与审批策略集成",
        "vendorId": "codex",
        "category": "技能发现",
        "title": "与审批策略集成",
        "description": "Skills 执行敏感操作时受 approval_policy 约束，确保安全性。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "与审批策略集成",
          "description": "Skills 执行敏感操作时受 approval_policy 约束，确保安全性。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安全说明",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:技能发现:与审批策略集成"
        }
      },
      {
        "entityKey": "guide:skills:codex:技能开发:创建流程",
        "vendorId": "codex",
        "category": "技能开发",
        "title": "创建流程",
        "description": "在 .agents/skills/ 下创建 Skill 目录，编写 SKILL.md 定义行为。",
        "code": "mkdir -p .agents/skills/my-skill\ntouch .agents/skills/my-skill/SKILL.md",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "创建流程",
          "description": "在 .agents/skills/ 下创建 Skill 目录，编写 SKILL.md 定义行为。",
          "code": "mkdir -p .agents/skills/my-skill\ntouch .agents/skills/my-skill/SKILL.md",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方创建方式",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:技能开发:创建流程"
        }
      },
      {
        "entityKey": "guide:skills:codex:技能开发:测试方法",
        "vendorId": "codex",
        "category": "技能开发",
        "title": "测试方法",
        "description": "使用 codex exec 执行测试任务，验证 Skill 是否按预期触发和执行。",
        "code": "codex exec \"test my-skill workflow\"",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "测试方法",
          "description": "使用 codex exec 执行测试任务，验证 Skill 是否按预期触发和执行。",
          "code": "codex exec \"test my-skill workflow\"",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方测试建议",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:codex:技能开发:测试方法"
        }
      }
    ],
    "gemini": [
      {
        "entityKey": "guide:skills:gemini:状态说明:当前策略",
        "vendorId": "gemini",
        "category": "状态说明",
        "title": "当前策略",
        "description": "Gemini Skills 命令区已下线。当前页面仅保留官方入口和兼容性说明，不提供未验证命令示例。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "当前策略",
          "description": "Gemini Skills 命令区已下线。当前页面仅保留官方入口和兼容性说明，不提供未验证命令示例。",
          "badge": "config",
          "support_level": "unsupported",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "策略说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:状态说明:当前策略"
        }
      },
      {
        "entityKey": "guide:skills:gemini:状态说明:替代建议",
        "vendorId": "gemini",
        "category": "状态说明",
        "title": "替代建议",
        "description": "如需扩展能力，优先使用官方文档支持的 MCP 与扩展机制，并以官方发布为准。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "替代建议",
          "description": "如需扩展能力，优先使用官方文档支持的 MCP 与扩展机制，并以官方发布为准。",
          "badge": "command",
          "support_level": "unsupported",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "官方入口",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:状态说明:替代建议"
        }
      },
      {
        "entityKey": "guide:skills:gemini:MCP 扩展:MCP 服务器",
        "vendorId": "gemini",
        "category": "MCP 扩展",
        "title": "MCP 服务器",
        "description": "通过 MCP 协议连接外部工具和服务，扩展 Gemini CLI 的能力边界。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "MCP 服务器",
          "description": "通过 MCP 协议连接外部工具和服务，扩展 Gemini CLI 的能力边界。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "官方 MCP 说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:MCP 扩展:MCP 服务器"
        }
      },
      {
        "entityKey": "guide:skills:gemini:MCP 扩展:扩展管理",
        "vendorId": "gemini",
        "category": "MCP 扩展",
        "title": "扩展管理",
        "description": "使用 /extensions 命令管理已安装的扩展和集成。",
        "code": "/extensions",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "扩展管理",
          "description": "使用 /extensions 命令管理已安装的扩展和集成。",
          "code": "/extensions",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "官方扩展命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:MCP 扩展:扩展管理"
        }
      },
      {
        "entityKey": "guide:skills:gemini:GEMINI.md 指令:项目级指令",
        "vendorId": "gemini",
        "category": "GEMINI.md 指令",
        "title": "项目级指令",
        "description": "在仓库根目录创建 GEMINI.md 文件，定义 Gemini CLI 在该项目的行为准则。",
        "code": "GEMINI.md",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "项目级指令",
          "description": "在仓库根目录创建 GEMINI.md 文件，定义 Gemini CLI 在该项目的行为准则。",
          "code": "GEMINI.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "官方文件说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:GEMINI.md 指令:项目级指令"
        }
      },
      {
        "entityKey": "guide:skills:gemini:GEMINI.md 指令:编写建议",
        "vendorId": "gemini",
        "category": "GEMINI.md 指令",
        "title": "编写建议",
        "description": "保持指令简洁明确，聚焦项目特定的编码规范和工具使用偏好。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "编写建议",
          "description": "保持指令简洁明确，聚焦项目特定的编码规范和工具使用偏好。",
          "badge": "template",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "官方建议",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:GEMINI.md 指令:编写建议"
        }
      },
      {
        "entityKey": "guide:skills:gemini:后续跟踪:恢复条件",
        "vendorId": "gemini",
        "category": "后续跟踪",
        "title": "恢复条件",
        "description": "仅当官方文档提供稳定、可验证的 Skills 命令与路径规范后，再恢复对应命令手册内容。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "恢复条件",
          "description": "仅当官方文档提供稳定、可验证的 Skills 命令与路径规范后，再恢复对应命令手册内容。",
          "support_level": "unsupported",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "warn",
            "verification_reason": "恢复门槛",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:gemini:后续跟踪:恢复条件"
        }
      }
    ],
    "opencode": [
      {
        "entityKey": "guide:skills:opencode:概述:Skills 定义",
        "vendorId": "opencode",
        "category": "概述",
        "title": "Skills 定义",
        "description": "OpenCode 使用 Skills 作为可复用的任务指令模块，每个 Skill 包含触发条件、执行步骤和输出规范。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "Skills 定义",
          "description": "OpenCode 使用 Skills 作为可复用的任务指令模块，每个 Skill 包含触发条件、执行步骤和输出规范。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方定义",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:概述:Skills 定义"
        }
      },
      {
        "entityKey": "guide:skills:opencode:概述:加载策略",
        "vendorId": "opencode",
        "category": "概述",
        "title": "加载策略",
        "description": "Skills 采用按需加载策略，仅在任务语义匹配时才加载对应指令，节省上下文窗口。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "加载策略",
          "description": "Skills 采用按需加载策略，仅在任务语义匹配时才加载对应指令，节省上下文窗口。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方加载说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:概述:加载策略"
        }
      },
      {
        "entityKey": "guide:skills:opencode:目录结构:项目级",
        "vendorId": "opencode",
        "category": "目录结构",
        "title": "项目级",
        "description": "项目内 Skill 目录路径，仅在当前项目生效。",
        "code": ".opencode/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "项目级",
          "description": "项目内 Skill 目录路径，仅在当前项目生效。",
          "code": ".opencode/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:目录结构:项目级"
        }
      },
      {
        "entityKey": "guide:skills:opencode:目录结构:用户级",
        "vendorId": "opencode",
        "category": "目录结构",
        "title": "用户级",
        "description": "用户全局 Skill 目录路径，对所有项目生效。",
        "code": "~/.config/opencode/skills/<skill-name>/SKILL.md",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "用户级",
          "description": "用户全局 Skill 目录路径，对所有项目生效。",
          "code": "~/.config/opencode/skills/<skill-name>/SKILL.md",
          "badge": "path",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:目录结构:用户级"
        }
      },
      {
        "entityKey": "guide:skills:opencode:调用方式:自动调用",
        "vendorId": "opencode",
        "category": "调用方式",
        "title": "自动调用",
        "description": "在自然语言任务匹配到 skill 描述时，OpenCode 自动加载对应 Skill。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "自动调用",
          "description": "在自然语言任务匹配到 skill 描述时，OpenCode 自动加载对应 Skill。",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:调用方式:自动调用"
        }
      },
      {
        "entityKey": "guide:skills:opencode:调用方式:显式调用",
        "vendorId": "opencode",
        "category": "调用方式",
        "title": "显式调用",
        "description": "使用 $skill-name 显式触发指定 Skill。",
        "code": "$code-review 请审查 src/main.ts",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "显式调用",
          "description": "使用 $skill-name 显式触发指定 Skill。",
          "code": "$code-review 请审查 src/main.ts",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方语法",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:调用方式:显式调用"
        }
      },
      {
        "entityKey": "guide:skills:opencode:SKILL.md 结构:Frontmatter + 指令正文",
        "vendorId": "opencode",
        "category": "SKILL.md 结构",
        "title": "Frontmatter + 指令正文",
        "description": "SKILL.md 使用 YAML frontmatter 定义元数据，并用 Markdown 编写任务指令。",
        "code": "---\nname: code-review\ndescription: Review code changes with security checks\n---\n\n# Workflow\n1. Read the diff\n2. Identify bugs and risks\n3. Propose fixes",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "Frontmatter + 指令正文",
          "description": "SKILL.md 使用 YAML frontmatter 定义元数据，并用 Markdown 编写任务指令。",
          "code": "---\nname: code-review\ndescription: Review code changes with security checks\n---\n\n# Workflow\n1. Read the diff\n2. Identify bugs and risks\n3. Propose fixes",
          "badge": "template",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方示例结构",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:SKILL.md 结构:Frontmatter + 指令正文"
        }
      },
      {
        "entityKey": "guide:skills:opencode:与 AGENTS.md 的关系:互补设计",
        "vendorId": "opencode",
        "category": "与 AGENTS.md 的关系",
        "title": "互补设计",
        "description": "AGENTS.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。",
        "sourceUrls": [
          "https://opencode.ai",
          "https://opencode.ai/docs/agents"
        ],
        "payload": {
          "title": "互补设计",
          "description": "AGENTS.md 提供项目全局的通用指令，Skills 提供按需加载的特定任务指令。",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方设计说明",
            "source_url": "https://opencode.ai/docs/agents",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:与 AGENTS.md 的关系:互补设计"
        }
      },
      {
        "entityKey": "guide:skills:opencode:与 AGENTS.md 的关系:优先级",
        "vendorId": "opencode",
        "category": "与 AGENTS.md 的关系",
        "title": "优先级",
        "description": "AGENTS.md 始终加载，Skills 按需加载。通用规则放 AGENTS.md，特定工作流放 Skills。",
        "sourceUrls": [
          "https://opencode.ai",
          "https://opencode.ai/docs/agents"
        ],
        "payload": {
          "title": "优先级",
          "description": "AGENTS.md 始终加载，Skills 按需加载。通用规则放 AGENTS.md，特定工作流放 Skills。",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方优先级说明",
            "source_url": "https://opencode.ai/docs/agents",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:skills:opencode:与 AGENTS.md 的关系:优先级"
        }
      }
    ]
  },
  "setup": {
    "claude": [
      {
        "entityKey": "guide:setup:claude:前置条件:操作系统支持",
        "vendorId": "claude",
        "category": "前置条件",
        "title": "操作系统支持",
        "description": "官方支持 macOS、Linux 和 Windows（含 WSL）。请确认系统版本满足最低要求。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "操作系统支持",
          "description": "官方支持 macOS、Linux 和 Windows（含 WSL）。请确认系统版本满足最低要求。",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方支持说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:前置条件:操作系统支持"
        }
      },
      {
        "entityKey": "guide:setup:claude:前置条件:Node.js 与 npm",
        "vendorId": "claude",
        "category": "前置条件",
        "title": "Node.js 与 npm",
        "description": "Claude Code 通过 npm 分发，需要 Node.js 环境。",
        "code": "node --version\nnpm --version",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "Node.js 与 npm",
          "description": "Claude Code 通过 npm 分发，需要 Node.js 环境。",
          "code": "node --version\nnpm --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方前置要求",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:前置条件:Node.js 与 npm"
        }
      },
      {
        "entityKey": "guide:setup:claude:前置条件:Git（推荐）",
        "vendorId": "claude",
        "category": "前置条件",
        "title": "Git（推荐）",
        "description": "代码审查与差异分析场景建议安装 Git。",
        "code": "git --version",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "Git（推荐）",
          "description": "代码审查与差异分析场景建议安装 Git。",
          "code": "git --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方工作流建议",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:前置条件:Git（推荐）"
        }
      },
      {
        "entityKey": "guide:setup:claude:安装步骤:官方安装脚本",
        "vendorId": "claude",
        "category": "安装步骤",
        "title": "官方安装脚本",
        "description": "使用官方安装脚本，自动处理依赖和路径配置。",
        "code": "# macOS / Linux\ncurl -fsSL https://claude.ai/install.sh | bash",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "官方安装脚本",
          "description": "使用官方安装脚本，自动处理依赖和路径配置。",
          "code": "# macOS / Linux\ncurl -fsSL https://claude.ai/install.sh | bash",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装方式",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:安装步骤:官方安装脚本"
        }
      },
      {
        "entityKey": "guide:setup:claude:安装步骤:npm 安装",
        "vendorId": "claude",
        "category": "安装步骤",
        "title": "npm 安装",
        "description": "通过 npm 全局安装，适合已有 Node.js 环境的用户。",
        "code": "npm install -g @anthropic-ai/claude-code",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "npm 安装",
          "description": "通过 npm 全局安装，适合已有 Node.js 环境的用户。",
          "code": "npm install -g @anthropic-ai/claude-code",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装方式",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:安装步骤:npm 安装"
        }
      },
      {
        "entityKey": "guide:setup:claude:安装步骤:升级",
        "vendorId": "claude",
        "category": "安装步骤",
        "title": "升级",
        "description": "使用官方命令升级到最新版本。",
        "code": "claude update",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "升级",
          "description": "使用官方命令升级到最新版本。",
          "code": "claude update",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方升级命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:安装步骤:升级"
        }
      },
      {
        "entityKey": "guide:setup:claude:配置与认证:settings.json",
        "vendorId": "claude",
        "category": "配置与认证",
        "title": "settings.json",
        "description": "通过 settings.json 管理环境变量与默认行为。",
        "code": "{\n  \"env\": {\n    \"ANTHROPIC_AUTH_TOKEN\": \"your-token\"\n  }\n}",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "title": "settings.json",
          "description": "通过 settings.json 管理环境变量与默认行为。",
          "code": "{\n  \"env\": {\n    \"ANTHROPIC_AUTH_TOKEN\": \"your-token\"\n  }\n}",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置文件",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/settings",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:配置与认证:settings.json"
        }
      },
      {
        "entityKey": "guide:setup:claude:配置与认证:OAuth / API Key",
        "vendorId": "claude",
        "category": "配置与认证",
        "title": "OAuth / API Key",
        "description": "可使用官方登录流程或 API Key 认证，实际可用方式以账户权限为准。",
        "code": "claude auth login",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "title": "OAuth / API Key",
          "description": "可使用官方登录流程或 API Key 认证，实际可用方式以账户权限为准。",
          "code": "claude auth login",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方认证说明",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:配置与认证:OAuth / API Key"
        }
      },
      {
        "entityKey": "guide:setup:claude:配置与认证:环境变量",
        "vendorId": "claude",
        "category": "配置与认证",
        "title": "环境变量",
        "description": "ANTHROPIC_API_KEY 或 ANTHROPIC_AUTH_TOKEN 用于 API 认证。",
        "code": "export ANTHROPIC_API_KEY=\"your-api-key\"",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "title": "环境变量",
          "description": "ANTHROPIC_API_KEY 或 ANTHROPIC_AUTH_TOKEN 用于 API 认证。",
          "code": "export ANTHROPIC_API_KEY=\"your-api-key\"",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方环境变量",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/settings",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:配置与认证:环境变量"
        }
      },
      {
        "entityKey": "guide:setup:claude:初始化验证:版本检查",
        "vendorId": "claude",
        "category": "初始化验证",
        "title": "版本检查",
        "description": "验证是否成功安装。",
        "code": "claude --version",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "版本检查",
          "description": "验证是否成功安装。",
          "code": "claude --version",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:初始化验证:版本检查"
        }
      },
      {
        "entityKey": "guide:setup:claude:初始化验证:帮助命令",
        "vendorId": "claude",
        "category": "初始化验证",
        "title": "帮助命令",
        "description": "查看可用命令并检查运行状态。",
        "code": "claude --help",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "帮助命令",
          "description": "查看可用命令并检查运行状态。",
          "code": "claude --help",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:初始化验证:帮助命令"
        }
      },
      {
        "entityKey": "guide:setup:claude:初始化验证:诊断工具",
        "vendorId": "claude",
        "category": "初始化验证",
        "title": "诊断工具",
        "description": "运行完整诊断检查，验证安装和配置。",
        "code": "/doctor",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/cli-usage",
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "title": "诊断工具",
          "description": "运行完整诊断检查，验证安装和配置。",
          "code": "/doctor",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方诊断命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:初始化验证:诊断工具"
        }
      },
      {
        "entityKey": "guide:setup:claude:MCP 配置:MCP 服务器设置",
        "vendorId": "claude",
        "category": "MCP 配置",
        "title": "MCP 服务器设置",
        "description": "在 settings.json 中配置 MCP 服务器连接。",
        "code": "{\n  \"mcpServers\": {\n    \"filesystem\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"/path/to/allowed/dir\"]\n    }\n  }\n}",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "MCP 服务器设置",
          "description": "在 settings.json 中配置 MCP 服务器连接。",
          "code": "{\n  \"mcpServers\": {\n    \"filesystem\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"/path/to/allowed/dir\"]\n    }\n  }\n}",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方 MCP 配置",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/mcp",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:MCP 配置:MCP 服务器设置"
        }
      },
      {
        "entityKey": "guide:setup:claude:MCP 配置:OAuth 认证",
        "vendorId": "claude",
        "category": "MCP 配置",
        "title": "OAuth 认证",
        "description": "部分 MCP 服务器需要 OAuth 认证，通过 /mcp 命令管理。",
        "code": "/mcp",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/mcp",
          "https://docs.anthropic.com/en/docs/claude-code/overview"
        ],
        "payload": {
          "title": "OAuth 认证",
          "description": "部分 MCP 服务器需要 OAuth 认证，通过 /mcp 命令管理。",
          "code": "/mcp",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方 MCP 命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/mcp",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:MCP 配置:OAuth 认证"
        }
      },
      {
        "entityKey": "guide:setup:claude:插件配置:安装插件",
        "vendorId": "claude",
        "category": "插件配置",
        "title": "安装插件",
        "description": "使用 /plugin 命令安装和管理插件。",
        "code": "/plugin install code-review@claude-plugins-official",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/plugins"
        ],
        "payload": {
          "title": "安装插件",
          "description": "使用 /plugin 命令安装和管理插件。",
          "code": "/plugin install code-review@claude-plugins-official",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方插件命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/plugins",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:插件配置:安装插件"
        }
      },
      {
        "entityKey": "guide:setup:claude:插件配置:重新加载",
        "vendorId": "claude",
        "category": "插件配置",
        "title": "重新加载",
        "description": "修改插件配置后重新加载。",
        "code": "/reload-plugins",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/plugins"
        ],
        "payload": {
          "title": "重新加载",
          "description": "修改插件配置后重新加载。",
          "code": "/reload-plugins",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/plugins",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:插件配置:重新加载"
        }
      },
      {
        "entityKey": "guide:setup:claude:终端配置:终端快捷键",
        "vendorId": "claude",
        "category": "终端配置",
        "title": "终端快捷键",
        "description": "配置终端快捷键以快速访问常用功能。",
        "code": "/terminal-setup",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/terminal-config"
        ],
        "payload": {
          "title": "终端快捷键",
          "description": "配置终端快捷键以快速访问常用功能。",
          "code": "/terminal-setup",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/terminal-config",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:终端配置:终端快捷键"
        }
      },
      {
        "entityKey": "guide:setup:claude:终端配置:状态行",
        "vendorId": "claude",
        "category": "终端配置",
        "title": "状态行",
        "description": "自定义状态行显示内容。",
        "code": "/statusline",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/statusline",
          "https://docs.anthropic.com/en/docs/claude-code/terminal-config"
        ],
        "payload": {
          "title": "状态行",
          "description": "自定义状态行显示内容。",
          "code": "/statusline",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/statusline",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:终端配置:状态行"
        }
      },
      {
        "entityKey": "guide:setup:claude:问题排查:诊断检查",
        "vendorId": "claude",
        "category": "问题排查",
        "title": "诊断检查",
        "description": "运行 /doctor 进行完整诊断。",
        "code": "/doctor",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "title": "诊断检查",
          "description": "运行 /doctor 进行完整诊断。",
          "code": "/doctor",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方诊断命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:问题排查:诊断检查"
        }
      },
      {
        "entityKey": "guide:setup:claude:问题排查:常见问题",
        "vendorId": "claude",
        "category": "问题排查",
        "title": "常见问题",
        "description": "认证失败、网络问题、权限错误等常见问题请参考官方故障排查文档。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "title": "常见问题",
          "description": "认证失败、网络问题、权限错误等常见问题请参考官方故障排查文档。",
          "badge": "faq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方排查文档",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:问题排查:常见问题"
        }
      },
      {
        "entityKey": "guide:setup:claude:问题排查:提交反馈",
        "vendorId": "claude",
        "category": "问题排查",
        "title": "提交反馈",
        "description": "遇到问题可通过 /feedback 提交报告。",
        "code": "/feedback",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/overview",
          "https://docs.anthropic.com/en/docs/claude-code/troubleshooting"
        ],
        "payload": {
          "title": "提交反馈",
          "description": "遇到问题可通过 /feedback 提交报告。",
          "code": "/feedback",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方反馈命令",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/troubleshooting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:claude:问题排查:提交反馈"
        }
      }
    ],
    "codex": [
      {
        "entityKey": "guide:setup:codex:前置条件:Node.js 与包管理器",
        "vendorId": "codex",
        "category": "前置条件",
        "title": "Node.js 与包管理器",
        "description": "安装前请按官方文档确认当前最低 Node.js 版本要求。",
        "code": "node --version",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli"
        ],
        "payload": {
          "title": "Node.js 与包管理器",
          "description": "安装前请按官方文档确认当前最低 Node.js 版本要求。",
          "code": "node --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方前置要求",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:前置条件:Node.js 与包管理器"
        }
      },
      {
        "entityKey": "guide:setup:codex:前置条件:Windows 支持",
        "vendorId": "codex",
        "category": "前置条件",
        "title": "Windows 支持",
        "description": "Codex 支持 Windows。是否需要 WSL 取决于你的终端与工具链，按官方 Windows 页面配置。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/windows"
        ],
        "payload": {
          "title": "Windows 支持",
          "description": "Codex 支持 Windows。是否需要 WSL 取决于你的终端与工具链，按官方 Windows 页面配置。",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方 Windows 指南",
            "source_url": "https://developers.openai.com/codex/windows",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:前置条件:Windows 支持"
        }
      },
      {
        "entityKey": "guide:setup:codex:前置条件:Git（推荐）",
        "vendorId": "codex",
        "category": "前置条件",
        "title": "Git（推荐）",
        "description": "代码审查与版本管理场景建议安装 Git。",
        "code": "git --version",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli"
        ],
        "payload": {
          "title": "Git（推荐）",
          "description": "代码审查与版本管理场景建议安装 Git。",
          "code": "git --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方工作流建议",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:前置条件:Git（推荐）"
        }
      },
      {
        "entityKey": "guide:setup:codex:安装步骤:全局安装",
        "vendorId": "codex",
        "category": "安装步骤",
        "title": "全局安装",
        "description": "通过 npm 全局安装 Codex CLI。",
        "code": "npm install -g @openai/codex",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli"
        ],
        "payload": {
          "title": "全局安装",
          "description": "通过 npm 全局安装 Codex CLI。",
          "code": "npm install -g @openai/codex",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装命令",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:安装步骤:全局安装"
        }
      },
      {
        "entityKey": "guide:setup:codex:安装步骤:首次登录",
        "vendorId": "codex",
        "category": "安装步骤",
        "title": "首次登录",
        "description": "按官方流程完成认证配置。",
        "code": "codex login",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "首次登录",
          "description": "按官方流程完成认证配置。",
          "code": "codex login",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方子命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:安装步骤:首次登录"
        }
      },
      {
        "entityKey": "guide:setup:codex:安装步骤:升级",
        "vendorId": "codex",
        "category": "安装步骤",
        "title": "升级",
        "description": "使用 npm 升级到最新版本。",
        "code": "npm update -g @openai/codex",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli"
        ],
        "payload": {
          "title": "升级",
          "description": "使用 npm 升级到最新版本。",
          "code": "npm update -g @openai/codex",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方升级方式",
            "source_url": "https://developers.openai.com/codex/cli",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:安装步骤:升级"
        }
      },
      {
        "entityKey": "guide:setup:codex:配置与认证:配置文件路径",
        "vendorId": "codex",
        "category": "配置与认证",
        "title": "配置文件路径",
        "description": "全局配置文件位置。",
        "code": "~/.codex/config.toml",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "配置文件路径",
          "description": "全局配置文件位置。",
          "code": "~/.codex/config.toml",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方路径",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:配置与认证:配置文件路径"
        }
      },
      {
        "entityKey": "guide:setup:codex:配置与认证:关键配置字段",
        "vendorId": "codex",
        "category": "配置与认证",
        "title": "关键配置字段",
        "description": "建议使用官方字段名（例如 approval_policy），避免旧字段漂移。",
        "code": "model = \"o4-mini\"\napproval_policy = \"on-request\"",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "关键配置字段",
          "description": "建议使用官方字段名（例如 approval_policy），避免旧字段漂移。",
          "code": "model = \"o4-mini\"\napproval_policy = \"on-request\"",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方字段",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:配置与认证:关键配置字段"
        }
      },
      {
        "entityKey": "guide:setup:codex:配置与认证:项目指令文件",
        "vendorId": "codex",
        "category": "配置与认证",
        "title": "项目指令文件",
        "description": "在仓库根目录维护 AGENTS.md。",
        "code": "AGENTS.md",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference",
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "title": "项目指令文件",
          "description": "在仓库根目录维护 AGENTS.md。",
          "code": "AGENTS.md",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方说明",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:配置与认证:项目指令文件"
        }
      },
      {
        "entityKey": "guide:setup:codex:核心命令:交互模式",
        "vendorId": "codex",
        "category": "核心命令",
        "title": "交互模式",
        "description": "启动 TUI 会话。",
        "code": "codex",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "交互模式",
          "description": "启动 TUI 会话。",
          "code": "codex",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:核心命令:交互模式"
        }
      },
      {
        "entityKey": "guide:setup:codex:核心命令:非交互执行",
        "vendorId": "codex",
        "category": "核心命令",
        "title": "非交互执行",
        "description": "单次任务执行并输出结果。",
        "code": "codex exec \"summarize changes\"",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "非交互执行",
          "description": "单次任务执行并输出结果。",
          "code": "codex exec \"summarize changes\"",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:核心命令:非交互执行"
        }
      },
      {
        "entityKey": "guide:setup:codex:核心命令:MCP 管理",
        "vendorId": "codex",
        "category": "核心命令",
        "title": "MCP 管理",
        "description": "配置并检查 MCP 连接。",
        "code": "codex mcp",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "MCP 管理",
          "description": "配置并检查 MCP 连接。",
          "code": "codex mcp",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:核心命令:MCP 管理"
        }
      },
      {
        "entityKey": "guide:setup:codex:初始化验证:版本检查",
        "vendorId": "codex",
        "category": "初始化验证",
        "title": "版本检查",
        "description": "验证是否成功安装。",
        "code": "codex --version",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "版本检查",
          "description": "验证是否成功安装。",
          "code": "codex --version",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:初始化验证:版本检查"
        }
      },
      {
        "entityKey": "guide:setup:codex:初始化验证:帮助命令",
        "vendorId": "codex",
        "category": "初始化验证",
        "title": "帮助命令",
        "description": "查看可用命令。",
        "code": "codex --help",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "帮助命令",
          "description": "查看可用命令。",
          "code": "codex --help",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:初始化验证:帮助命令"
        }
      },
      {
        "entityKey": "guide:setup:codex:初始化验证:认证状态",
        "vendorId": "codex",
        "category": "初始化验证",
        "title": "认证状态",
        "description": "检查认证是否配置正确。",
        "code": "codex status",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "认证状态",
          "description": "检查认证是否配置正确。",
          "code": "codex status",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:初始化验证:认证状态"
        }
      },
      {
        "entityKey": "guide:setup:codex:问题排查:帮助与版本",
        "vendorId": "codex",
        "category": "问题排查",
        "title": "帮助与版本",
        "description": "优先确认 CLI 版本和参数是否与官方一致。",
        "code": "codex --version\ncodex --help",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "帮助与版本",
          "description": "优先确认 CLI 版本和参数是否与官方一致。",
          "code": "codex --version\ncodex --help",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:问题排查:帮助与版本"
        }
      },
      {
        "entityKey": "guide:setup:codex:问题排查:常见问题",
        "vendorId": "codex",
        "category": "问题排查",
        "title": "常见问题",
        "description": "认证失败、网络问题、权限错误等请参考官方文档。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/cli/reference"
        ],
        "payload": {
          "title": "常见问题",
          "description": "认证失败、网络问题、权限错误等请参考官方文档。",
          "badge": "faq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方排查文档",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:codex:问题排查:常见问题"
        }
      }
    ],
    "gemini": [
      {
        "entityKey": "guide:setup:gemini:前置条件:Node.js",
        "vendorId": "gemini",
        "category": "前置条件",
        "title": "Node.js",
        "description": "请按官方安装页面确认最低 Node.js 要求。",
        "code": "node --version",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "Node.js",
          "description": "请按官方安装页面确认最低 Node.js 要求。",
          "code": "node --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方前置要求",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:前置条件:Node.js"
        }
      },
      {
        "entityKey": "guide:setup:gemini:前置条件:认证方式",
        "vendorId": "gemini",
        "category": "前置条件",
        "title": "认证方式",
        "description": "支持 Google 登录或 API Key 认证。具体配额与可用模型以官方页面为准。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "认证方式",
          "description": "支持 Google 登录或 API Key 认证。具体配额与可用模型以官方页面为准。",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方认证说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:前置条件:认证方式"
        }
      },
      {
        "entityKey": "guide:setup:gemini:前置条件:操作系统",
        "vendorId": "gemini",
        "category": "前置条件",
        "title": "操作系统",
        "description": "支持 macOS、Linux 和 Windows。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "操作系统",
          "description": "支持 macOS、Linux 和 Windows。",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方支持说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:前置条件:操作系统"
        }
      },
      {
        "entityKey": "guide:setup:gemini:安装步骤:npx 运行",
        "vendorId": "gemini",
        "category": "安装步骤",
        "title": "npx 运行",
        "description": "无需全局安装，直接运行最新版本。",
        "code": "npx @google/gemini-cli",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "npx 运行",
          "description": "无需全局安装，直接运行最新版本。",
          "code": "npx @google/gemini-cli",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装方式",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:安装步骤:npx 运行"
        }
      },
      {
        "entityKey": "guide:setup:gemini:安装步骤:全局安装",
        "vendorId": "gemini",
        "category": "安装步骤",
        "title": "全局安装",
        "description": "需要全局命令时使用 npm 安装。",
        "code": "npm install -g @google/gemini-cli",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "全局安装",
          "description": "需要全局命令时使用 npm 安装。",
          "code": "npm install -g @google/gemini-cli",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装方式",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:安装步骤:全局安装"
        }
      },
      {
        "entityKey": "guide:setup:gemini:安装步骤:升级",
        "vendorId": "gemini",
        "category": "安装步骤",
        "title": "升级",
        "description": "使用 npm 升级到最新版本。",
        "code": "npm update -g @google/gemini-cli",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "升级",
          "description": "使用 npm 升级到最新版本。",
          "code": "npm update -g @google/gemini-cli",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方升级方式",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:安装步骤:升级"
        }
      },
      {
        "entityKey": "guide:setup:gemini:配置与认证:环境变量",
        "vendorId": "gemini",
        "category": "配置与认证",
        "title": "环境变量",
        "description": "优先通过环境变量提供 API Key（例如 GEMINI_API_KEY 或 GOOGLE_API_KEY）。",
        "code": "export GEMINI_API_KEY=\"your-key\"",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "title": "环境变量",
          "description": "优先通过环境变量提供 API Key（例如 GEMINI_API_KEY 或 GOOGLE_API_KEY）。",
          "code": "export GEMINI_API_KEY=\"your-key\"",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置方式",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:配置与认证:环境变量"
        }
      },
      {
        "entityKey": "guide:setup:gemini:配置与认证:项目指令文件",
        "vendorId": "gemini",
        "category": "配置与认证",
        "title": "项目指令文件",
        "description": "使用 GEMINI.md 管理项目级行为指令。",
        "code": "GEMINI.md",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "title": "项目指令文件",
          "description": "使用 GEMINI.md 管理项目级行为指令。",
          "code": "GEMINI.md",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方文件说明",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:配置与认证:项目指令文件"
        }
      },
      {
        "entityKey": "guide:setup:gemini:配置与认证:OAuth 登录",
        "vendorId": "gemini",
        "category": "配置与认证",
        "title": "OAuth 登录",
        "description": "使用 Google 账户登录进行认证。",
        "code": "gemini login",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration"
        ],
        "payload": {
          "title": "OAuth 登录",
          "description": "使用 Google 账户登录进行认证。",
          "code": "gemini login",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方登录方式",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:配置与认证:OAuth 登录"
        }
      },
      {
        "entityKey": "guide:setup:gemini:核心命令:交互模式",
        "vendorId": "gemini",
        "category": "核心命令",
        "title": "交互模式",
        "description": "启动交互会话。",
        "code": "gemini",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "title": "交互模式",
          "description": "启动交互会话。",
          "code": "gemini",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:核心命令:交互模式"
        }
      },
      {
        "entityKey": "guide:setup:gemini:核心命令:非交互模式",
        "vendorId": "gemini",
        "category": "核心命令",
        "title": "非交互模式",
        "description": "执行一次性任务。",
        "code": "gemini -p \"summarize this file\"",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "title": "非交互模式",
          "description": "执行一次性任务。",
          "code": "gemini -p \"summarize this file\"",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:核心命令:非交互模式"
        }
      },
      {
        "entityKey": "guide:setup:gemini:核心命令:帮助命令",
        "vendorId": "gemini",
        "category": "核心命令",
        "title": "帮助命令",
        "description": "查看当前版本支持的参数与命令。",
        "code": "gemini --help",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "title": "帮助命令",
          "description": "查看当前版本支持的参数与命令。",
          "code": "gemini --help",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:核心命令:帮助命令"
        }
      },
      {
        "entityKey": "guide:setup:gemini:初始化验证:版本检查",
        "vendorId": "gemini",
        "category": "初始化验证",
        "title": "版本检查",
        "description": "验证是否成功安装。",
        "code": "gemini --version",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "title": "版本检查",
          "description": "验证是否成功安装。",
          "code": "gemini --version",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:初始化验证:版本检查"
        }
      },
      {
        "entityKey": "guide:setup:gemini:初始化验证:认证状态",
        "vendorId": "gemini",
        "category": "初始化验证",
        "title": "认证状态",
        "description": "检查认证是否配置正确。",
        "code": "gemini status",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/",
          "https://google-gemini.github.io/gemini-cli/docs/cli/commands"
        ],
        "payload": {
          "title": "认证状态",
          "description": "检查认证是否配置正确。",
          "code": "gemini status",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/docs/cli/commands",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:初始化验证:认证状态"
        }
      },
      {
        "entityKey": "guide:setup:gemini:MCP 配置:MCP 服务器",
        "vendorId": "gemini",
        "category": "MCP 配置",
        "title": "MCP 服务器",
        "description": "通过 MCP 协议连接外部工具和服务。",
        "code": "gemini mcp",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "MCP 服务器",
          "description": "通过 MCP 协议连接外部工具和服务。",
          "code": "gemini mcp",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方 MCP 命令",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:MCP 配置:MCP 服务器"
        }
      },
      {
        "entityKey": "guide:setup:gemini:常见问题:模型与配额",
        "vendorId": "gemini",
        "category": "常见问题",
        "title": "模型与配额",
        "description": "模型可用性、免费额度和限制会变化。请始终以官方文档实时信息为准。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "模型与配额",
          "description": "模型可用性、免费额度和限制会变化。请始终以官方文档实时信息为准。",
          "badge": "faq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "动态信息治理",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:常见问题:模型与配额"
        }
      },
      {
        "entityKey": "guide:setup:gemini:常见问题:问题排查",
        "vendorId": "gemini",
        "category": "常见问题",
        "title": "问题排查",
        "description": "遇到问题请参考官方文档的故障排查部分。",
        "sourceUrls": [
          "https://google-gemini.github.io/gemini-cli/"
        ],
        "payload": {
          "title": "问题排查",
          "description": "遇到问题请参考官方文档的故障排查部分。",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方排查文档",
            "source_url": "https://google-gemini.github.io/gemini-cli/",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:gemini:常见问题:问题排查"
        }
      }
    ],
    "opencode": [
      {
        "entityKey": "guide:setup:opencode:前置条件:操作系统",
        "vendorId": "opencode",
        "category": "前置条件",
        "title": "操作系统",
        "description": "支持 macOS、Linux 和 Windows。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "操作系统",
          "description": "支持 macOS、Linux 和 Windows。",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方支持说明",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:前置条件:操作系统"
        }
      },
      {
        "entityKey": "guide:setup:opencode:前置条件:Node.js",
        "vendorId": "opencode",
        "category": "前置条件",
        "title": "Node.js",
        "description": "请按官方安装页面确认最低 Node.js 要求。",
        "code": "node --version",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "Node.js",
          "description": "请按官方安装页面确认最低 Node.js 要求。",
          "code": "node --version",
          "badge": "prereq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方前置要求",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:前置条件:Node.js"
        }
      },
      {
        "entityKey": "guide:setup:opencode:安装步骤:官方安装",
        "vendorId": "opencode",
        "category": "安装步骤",
        "title": "官方安装",
        "description": "按官方安装文档选择适合的安装方式。",
        "code": "# 请参考官方安装文档\n# https://opencode.ai/docs/install",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "官方安装",
          "description": "按官方安装文档选择适合的安装方式。",
          "code": "# 请参考官方安装文档\n# https://opencode.ai/docs/install",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方安装方式",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:安装步骤:官方安装"
        }
      },
      {
        "entityKey": "guide:setup:opencode:安装步骤:升级",
        "vendorId": "opencode",
        "category": "安装步骤",
        "title": "升级",
        "description": "使用官方方式升级到最新版本。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "升级",
          "description": "使用官方方式升级到最新版本。",
          "badge": "install",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方升级方式",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:安装步骤:升级"
        }
      },
      {
        "entityKey": "guide:setup:opencode:配置与认证:项目级配置",
        "vendorId": "opencode",
        "category": "配置与认证",
        "title": "项目级配置",
        "description": "在项目根目录创建 opencode.json 配置文件。",
        "code": "opencode.json",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "项目级配置",
          "description": "在项目根目录创建 opencode.json 配置文件。",
          "code": "opencode.json",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方配置文件",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:配置与认证:项目级配置"
        }
      },
      {
        "entityKey": "guide:setup:opencode:配置与认证:全局配置",
        "vendorId": "opencode",
        "category": "配置与认证",
        "title": "全局配置",
        "description": "用户全局配置文件位置。",
        "code": "~/.config/opencode/opencode.json",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "全局配置",
          "description": "用户全局配置文件位置。",
          "code": "~/.config/opencode/opencode.json",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方全局配置",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:配置与认证:全局配置"
        }
      },
      {
        "entityKey": "guide:setup:opencode:配置与认证:项目指令文件",
        "vendorId": "opencode",
        "category": "配置与认证",
        "title": "项目指令文件",
        "description": "使用 AGENTS.md 管理项目级行为指令。",
        "code": "AGENTS.md",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "项目指令文件",
          "description": "使用 AGENTS.md 管理项目级行为指令。",
          "code": "AGENTS.md",
          "badge": "config",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方指令文件",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:配置与认证:项目指令文件"
        }
      },
      {
        "entityKey": "guide:setup:opencode:核心命令:交互模式",
        "vendorId": "opencode",
        "category": "核心命令",
        "title": "交互模式",
        "description": "启动交互会话。",
        "code": "opencode",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "交互模式",
          "description": "启动交互会话。",
          "code": "opencode",
          "badge": "command",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:核心命令:交互模式"
        }
      },
      {
        "entityKey": "guide:setup:opencode:核心命令:帮助命令",
        "vendorId": "opencode",
        "category": "核心命令",
        "title": "帮助命令",
        "description": "查看可用命令和参数说明。",
        "code": "opencode --help",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "帮助命令",
          "description": "查看可用命令和参数说明。",
          "code": "opencode --help",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:核心命令:帮助命令"
        }
      },
      {
        "entityKey": "guide:setup:opencode:核心命令:版本检查",
        "vendorId": "opencode",
        "category": "核心命令",
        "title": "版本检查",
        "description": "查看当前版本。",
        "code": "opencode --version",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "版本检查",
          "description": "查看当前版本。",
          "code": "opencode --version",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:核心命令:版本检查"
        }
      },
      {
        "entityKey": "guide:setup:opencode:初始化验证:版本检查",
        "vendorId": "opencode",
        "category": "初始化验证",
        "title": "版本检查",
        "description": "验证是否成功安装。",
        "code": "opencode --version",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "版本检查",
          "description": "验证是否成功安装。",
          "code": "opencode --version",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:初始化验证:版本检查"
        }
      },
      {
        "entityKey": "guide:setup:opencode:初始化验证:帮助命令",
        "vendorId": "opencode",
        "category": "初始化验证",
        "title": "帮助命令",
        "description": "查看可用命令。",
        "code": "opencode --help",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "帮助命令",
          "description": "查看可用命令。",
          "code": "opencode --help",
          "badge": "verify",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:初始化验证:帮助命令"
        }
      },
      {
        "entityKey": "guide:setup:opencode:问题排查:调试模式",
        "vendorId": "opencode",
        "category": "问题排查",
        "title": "调试模式",
        "description": "启用调试输出以排查问题。",
        "code": "opencode --debug",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "调试模式",
          "description": "启用调试输出以排查问题。",
          "code": "opencode --debug",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方调试命令",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:问题排查:调试模式"
        }
      },
      {
        "entityKey": "guide:setup:opencode:问题排查:详细输出",
        "vendorId": "opencode",
        "category": "问题排查",
        "title": "详细输出",
        "description": "启用详细输出模式。",
        "code": "opencode --verbose",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "详细输出",
          "description": "启用详细输出模式。",
          "code": "opencode --verbose",
          "badge": "debug",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方详细模式",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:问题排查:详细输出"
        }
      },
      {
        "entityKey": "guide:setup:opencode:问题排查:常见问题",
        "vendorId": "opencode",
        "category": "问题排查",
        "title": "常见问题",
        "description": "遇到问题请参考官方文档的故障排查部分。",
        "sourceUrls": [
          "https://opencode.ai"
        ],
        "payload": {
          "title": "常见问题",
          "description": "遇到问题请参考官方文档的故障排查部分。",
          "badge": "faq",
          "support_level": "official",
          "verification": {
            "last_verified_at": "2026-04-07",
            "verification_status": "pass",
            "verification_reason": "官方排查文档",
            "source_url": "https://opencode.ai",
            "source_anchor": "",
            "verification_source": "official_doc"
          },
          "entityKey": "guide:setup:opencode:问题排查:常见问题"
        }
      }
    ]
  },
  "help": {
    "/providers": [
      {
        "pageRoute": "/providers",
        "entityKey": "help:/providers:providers",
        "vendorId": "page:providers",
        "category": "/providers",
        "title": "providers",
        "description": "Provider 帮助文案基于官方 API 文档与认证说明整理。",
        "sourceUrls": [
          "https://developers.openai.com/api"
        ],
        "payload": {
          "entityKey": "help:/providers:providers",
          "title": "providers",
          "description": "Provider 帮助文案基于官方 API 文档与认证说明整理。",
          "sourceUrl": "https://developers.openai.com/api",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "Provider 帮助文案基于官方 API 文档与认证说明整理。",
            "source_url": "https://developers.openai.com/api",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      },
      {
        "pageRoute": "/providers",
        "entityKey": "help:/providers:local_deploy",
        "vendorId": "page:providers",
        "category": "/providers",
        "title": "local deploy",
        "description": "本地部署路径说明按官方配置路径核验。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli/reference",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
          "https://opencode.ai/docs/config/"
        ],
        "payload": {
          "entityKey": "help:/providers:local_deploy",
          "title": "local deploy",
          "description": "本地部署路径说明按官方配置路径核验。",
          "sourceUrl": "https://developers.openai.com/codex/cli/reference",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "本地部署路径说明按官方配置路径核验。",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      }
    ],
    "/mcp": [
      {
        "pageRoute": "/mcp",
        "entityKey": "help:/mcp:mcp",
        "vendorId": "page:mcp",
        "category": "/mcp",
        "title": "mcp",
        "description": "MCP 基础说明与术语来自官方 MCP 站点。",
        "sourceUrls": [
          "https://modelcontextprotocol.io/introduction"
        ],
        "payload": {
          "entityKey": "help:/mcp:mcp",
          "title": "mcp",
          "description": "MCP 基础说明与术语来自官方 MCP 站点。",
          "sourceUrl": "https://modelcontextprotocol.io/introduction",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "MCP 基础说明与术语来自官方 MCP 站点。",
            "source_url": "https://modelcontextprotocol.io/introduction",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      },
      {
        "pageRoute": "/mcp",
        "entityKey": "help:/mcp:local_deploy",
        "vendorId": "page:mcp",
        "category": "/mcp",
        "title": "local deploy",
        "description": "本地部署路径说明按官方配置路径核验。",
        "sourceUrls": [
          "https://developers.openai.com/codex/cli/reference",
          "https://docs.anthropic.com/en/docs/claude-code/settings",
          "https://google-gemini.github.io/gemini-cli/docs/get-started/configuration",
          "https://opencode.ai/docs/config/"
        ],
        "payload": {
          "entityKey": "help:/mcp:local_deploy",
          "title": "local deploy",
          "description": "本地部署路径说明按官方配置路径核验。",
          "sourceUrl": "https://developers.openai.com/codex/cli/reference",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "本地部署路径说明按官方配置路径核验。",
            "source_url": "https://developers.openai.com/codex/cli/reference",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      }
    ],
    "/skills": [
      {
        "pageRoute": "/skills",
        "entityKey": "help:/skills:skills",
        "vendorId": "page:skills",
        "category": "/skills",
        "title": "skills",
        "description": "Skills 帮助以官方 Agent Skills 文档为准。",
        "sourceUrls": [
          "https://developers.openai.com/codex/prompting"
        ],
        "payload": {
          "entityKey": "help:/skills:skills",
          "title": "skills",
          "description": "Skills 帮助以官方 Agent Skills 文档为准。",
          "sourceUrl": "https://developers.openai.com/codex/prompting",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "Skills 帮助以官方 Agent Skills 文档为准。",
            "source_url": "https://developers.openai.com/codex/prompting",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      }
    ],
    "/export": [
      {
        "pageRoute": "/export",
        "entityKey": "help:/export:export",
        "vendorId": "page:export",
        "category": "/export",
        "title": "export",
        "description": "导出路径与配置字段按各官方 CLI 文档校对。",
        "sourceUrls": [
          "https://docs.anthropic.com/en/docs/claude-code/settings"
        ],
        "payload": {
          "entityKey": "help:/export:export",
          "title": "export",
          "description": "导出路径与配置字段按各官方 CLI 文档校对。",
          "sourceUrl": "https://docs.anthropic.com/en/docs/claude-code/settings",
          "verification": {
            "last_verified_at": "2026-02-23",
            "verification_status": "pass",
            "verification_reason": "导出路径与配置字段按各官方 CLI 文档校对。",
            "source_url": "https://docs.anthropic.com/en/docs/claude-code/settings",
            "source_anchor": "",
            "verification_source": "official_doc"
          }
        }
      }
    ]
  }
} as const;
