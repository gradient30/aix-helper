import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Download, Upload, Link2, Package, Database, FileArchive, Copy, Loader2, CheckCircle2, FileCode, FileText, Settings } from "lucide-react";
import { HelpDialog } from "@/components/HelpDialog";
import { useTranslation } from "react-i18next";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getErrorMessage } from "@/lib/errors";
import {
  buildClaudeSettingsJson,
  buildDeepLinkPayload,
  buildMcpServersObject,
  buildSkillMd,
  encodeDeepLinkPayload,
  generateCodexConfigToml,
  getAppStats,
  sanitizeMcpForBackup,
  sanitizeProviderForBackup,
  stripDbFields,
  type AppType,
  type McpServer,
  type Prompt,
  type Provider,
  type Skill,
  type SkillsRepo,
} from "@/lib/export-utils";
import { parseImportData } from "@/lib/import-utils";

type ExportingTarget = AppType | "backup" | null;

function buildRepoSignature(
  owner: string,
  repo: string,
  branch?: string | null,
  subdirectory?: string | null,
): string {
  return [
    owner.trim().toLowerCase(),
    repo.trim().toLowerCase(),
    (branch || "main").trim().toLowerCase(),
    (subdirectory || "").trim().toLowerCase(),
  ].join("::");
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Export() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [exporting, setExporting] = useState<ExportingTarget>(null);
  const [importing, setImporting] = useState(false);
  const [deepLink, setDeepLink] = useState("");
  const [includeSecrets, setIncludeSecrets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: providers = [] } = useQuery<Provider[]>({
    queryKey: ["providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: mcpServers = [] } = useQuery<McpServer[]>({
    queryKey: ["mcp_servers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mcp_servers")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: prompts = [] } = useQuery<Prompt[]>({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("name");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: skillsRepos = [] } = useQuery<SkillsRepo[]>({
    queryKey: ["skills_repos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills_repos")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // ── Claude Code ZIP Export ──────────────────────────────────────────────────

  const exportClaude = async () => {
    setExporting("claude");
    try {
      const date = new Date().toISOString().slice(0, 10);
      const zip = new JSZip();
      const folder = zip.folder(`claude-export-${date}`)!;

      const { enabledMcps, installedSkills, enabledProviders } = getAppStats(
        "claude",
        mcpServers,
        skills,
        providers,
      );

      // settings.json — MCP + Provider env merged per official spec
      folder.file(
        "settings.json",
        JSON.stringify(buildClaudeSettingsJson(enabledMcps, enabledProviders), null, 2)
      );

      // CLAUDE.md — active prompt targeting CLAUDE.md
      const claudePrompt = prompts.find(
        (prompt) => prompt.is_active && prompt.target_file === "CLAUDE.md",
      );
      if (claudePrompt) {
        folder.file("CLAUDE.md", claudePrompt.content || "");
      }

      // skills/<name>/SKILL.md
      if (installedSkills.length > 0) {
        const skillsFolder = folder.folder("skills")!;
        installedSkills.forEach((skill) => {
          const skillFolder = skillsFolder.folder(skill.name)!;
          skillFolder.file("SKILL.md", buildSkillMd(skill));
        });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `claude-export-${date}.zip`);
      toast({
        title: t("export.exportSuccess"),
        description: `settings.json${claudePrompt ? " · CLAUDE.md" : ""}${installedSkills.length > 0 ? ` · skills/ (${installedSkills.length})` : ""}`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // ── Codex ZIP Export ────────────────────────────────────────────────────────

  const exportCodex = async () => {
    setExporting("codex");
    try {
      const date = new Date().toISOString().slice(0, 10);
      const zip = new JSZip();
      const folder = zip.folder(`codex-export-${date}`)!;

      const { enabledMcps, enabledProviders } = getAppStats(
        "codex",
        mcpServers,
        skills,
        providers,
      );

      // config.toml — Provider + MCP Servers in TOML format (official ~/.codex/config.toml spec)
      folder.file("config.toml", generateCodexConfigToml(enabledProviders, enabledMcps));

      // AGENTS.md — active prompt
      const agentsPrompt = prompts.find(
        (prompt) => prompt.is_active && prompt.target_file === "AGENTS.md",
      );
      if (agentsPrompt) {
        folder.file("AGENTS.md", agentsPrompt.content || "");
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `codex-export-${date}.zip`);
      toast({
        title: t("export.exportSuccess"),
        description: `config.toml${agentsPrompt ? " · AGENTS.md" : ""}`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // ── Gemini ZIP Export ───────────────────────────────────────────────────────

  const exportGemini = async () => {
    setExporting("gemini");
    try {
      const date = new Date().toISOString().slice(0, 10);
      const zip = new JSZip();
      const folder = zip.folder(`gemini-export-${date}`)!;

      const { enabledMcps } = getAppStats("gemini", mcpServers, skills, providers);

      // settings.json — MCP Servers (Gemini API key via GOOGLE_API_KEY env var, not in file)
      const mcpServersObj = buildMcpServersObject(enabledMcps);
      folder.file("settings.json", JSON.stringify({ mcpServers: mcpServersObj }, null, 2));

      // GEMINI.md — active prompt
      const geminiPrompt = prompts.find(
        (prompt) => prompt.is_active && prompt.target_file === "GEMINI.md",
      );
      if (geminiPrompt) {
        folder.file("GEMINI.md", geminiPrompt.content || "");
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `gemini-export-${date}.zip`);
      toast({
        title: t("export.exportSuccess"),
        description: `settings.json${geminiPrompt ? " · GEMINI.md" : ""}`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // ── OpenCode ZIP Export ─────────────────────────────────────────────────────

  const exportOpenCode = async () => {
    setExporting("opencode");
    try {
      const date = new Date().toISOString().slice(0, 10);
      const zip = new JSZip();
      const folder = zip.folder(`opencode-export-${date}`)!;

      const { enabledMcps } = getAppStats("opencode", mcpServers, skills, providers);

      const mcpServersObj = buildMcpServersObject(enabledMcps);
      folder.file("opencode.json", JSON.stringify({ mcpServers: mcpServersObj }, null, 2));

      const opencodePrompt = prompts.find(
        (prompt) => prompt.is_active && prompt.target_file === "OPENCODE.md",
      );
      const agentsPrompt = prompts.find(
        (prompt) => prompt.is_active && prompt.target_file === "AGENTS.md",
      );
      const openCodePromptContent = opencodePrompt?.content || agentsPrompt?.content;
      if (openCodePromptContent) {
        // OpenCode official instructions file is AGENTS.md.
        folder.file("AGENTS.md", openCodePromptContent);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `opencode-export-${date}.zip`);
      toast({
        title: t("export.exportSuccess"),
        description: `opencode.json${openCodePromptContent ? " · AGENTS.md" : ""}`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // ── Data Backup Export (Module) ─────────────────────────────────────────────

  const handleDataBackup = async () => {
    setExporting("backup");
    try {
      const zip = new JSZip();

      // Strip internal DB fields, keep only meaningful user data
      const cleanProviders = providers.map((provider) =>
        sanitizeProviderForBackup(provider, includeSecrets),
      );
      const cleanMcps = mcpServers.map((server) =>
        sanitizeMcpForBackup(server, includeSecrets),
      );
      const cleanPrompts = prompts.map((prompt) =>
        stripDbFields(prompt, ["id", "user_id", "created_at", "updated_at"] as const),
      );
      const repoById = new Map(skillsRepos.map((repo) => [repo.id, repo]));
      const cleanSkills = skills.map((skill) => {
        const repo = repoById.get(skill.repo_id);
        return {
          ...stripDbFields(skill, ["id", "user_id", "created_at", "updated_at"] as const),
          repo_owner: repo?.owner || null,
          repo_name: repo?.repo || null,
          repo_branch: repo?.branch || null,
          repo_subdirectory: repo?.subdirectory || null,
          repo_is_default: repo?.is_default || false,
        };
      });
      const cleanRepos = skillsRepos.map((repo) =>
        stripDbFields(repo, ["user_id", "created_at", "updated_at"] as const),
      );

      zip.file("providers.json", JSON.stringify(cleanProviders, null, 2));
      zip.file("mcp_servers.json", JSON.stringify(cleanMcps, null, 2));
      zip.file("prompts.json", JSON.stringify(cleanPrompts, null, 2));
      zip.file("skills.json", JSON.stringify(cleanSkills, null, 2));
      zip.file("skills_repos.json", JSON.stringify(cleanRepos, null, 2));

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `ai-helper-backup-${new Date().toISOString().slice(0, 10)}.zip`);
      toast({
        title: t("export.exportSuccess"),
        description: `${t("export.backupDesc")}（${
          includeSecrets ? "含敏感字段" : "已脱敏"
        }）`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // ── Module single export ────────────────────────────────────────────────────

  const handleModuleExport = (
    module: string,
    data: Array<Provider | McpServer | Prompt | Skill | SkillsRepo>,
  ) => {
    let clean: Array<Record<string, unknown>> = [];

    if (module === "providers") {
      clean = (data as Provider[]).map((provider) =>
        sanitizeProviderForBackup(provider, includeSecrets),
      );
    } else if (module === "mcp-servers") {
      clean = (data as McpServer[]).map((server) =>
        sanitizeMcpForBackup(server, includeSecrets),
      );
    } else if (module === "skills") {
      const repoById = new Map(skillsRepos.map((repo) => [repo.id, repo]));
      clean = (data as Skill[]).map((skill) => {
        const repo = repoById.get(skill.repo_id);
        return {
          ...stripDbFields(skill, ["id", "user_id", "created_at", "updated_at"] as const),
          repo_owner: repo?.owner || null,
          repo_name: repo?.repo || null,
          repo_branch: repo?.branch || null,
          repo_subdirectory: repo?.subdirectory || null,
          repo_is_default: repo?.is_default || false,
        };
      });
    } else if (module === "skills-repos") {
      clean = (data as SkillsRepo[]).map((repo) =>
        stripDbFields(repo, ["user_id", "created_at", "updated_at"] as const),
      );
    } else {
      clean = data.map((item) =>
        stripDbFields(item, ["id", "user_id", "created_at", "updated_at"] as const),
      );
    }

    const blob = new Blob([JSON.stringify(clean, null, 2)], { type: "application/json" });
    saveAs(blob, `ai-helper-${module}-${new Date().toISOString().slice(0, 10)}.json`);
    toast({
      title: t("export.exportSuccess"),
      description: includeSecrets ? "已包含敏感字段" : "已脱敏导出",
    });
  };

  // ── Import ──────────────────────────────────────────────────────────────────

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const parsed = parseImportData(JSON.parse(text) as unknown);
      let count = 0;

      if (parsed.module === "providers") {
        for (const item of parsed.items) {
          const { error } = await supabase
            .from("providers")
            .insert({ ...item, user_id: user!.id });
          if (!error) count++;
        }
      } else if (parsed.module === "mcp_servers") {
        for (const item of parsed.items) {
          const { error } = await supabase
            .from("mcp_servers")
            .insert({ ...item, user_id: user!.id });
          if (!error) count++;
        }
      } else if (parsed.module === "prompts") {
        for (const item of parsed.items) {
          const { error } = await supabase
            .from("prompts")
            .insert({ ...item, user_id: user!.id });
          if (!error) count++;
        }
      } else if (parsed.module === "skills_repos") {
        const { data: existingRepos, error: existingReposError } = await supabase
          .from("skills_repos")
          .select("id, owner, repo, branch, subdirectory")
          .eq("user_id", user!.id);
        if (existingReposError) throw existingReposError;

        const knownRepoKeys = new Set(
          (existingRepos || []).map((repo) =>
            buildRepoSignature(repo.owner, repo.repo, repo.branch, repo.subdirectory),
          ),
        );

        for (const item of parsed.items) {
          const repoKey = buildRepoSignature(
            item.owner,
            item.repo,
            item.branch,
            item.subdirectory,
          );
          if (knownRepoKeys.has(repoKey)) continue;

          const { error } = await supabase
            .from("skills_repos")
            .insert({ ...item, user_id: user!.id });
          if (!error) {
            knownRepoKeys.add(repoKey);
            count++;
          }
        }
      } else if (parsed.module === "skills") {
        const { data: existingRepos, error: existingReposError } = await supabase
          .from("skills_repos")
          .select("id, owner, repo, branch, subdirectory")
          .eq("user_id", user!.id);
        if (existingReposError) throw existingReposError;

        const reposById = new Map((existingRepos || []).map((repo) => [repo.id, repo]));
        const reposByKey = new Map(
          (existingRepos || []).map((repo) => [
            buildRepoSignature(repo.owner, repo.repo, repo.branch, repo.subdirectory),
            repo,
          ]),
        );

        const { data: existingSkills, error: existingSkillsError } = await supabase
          .from("skills")
          .select("name, repo_id")
          .eq("user_id", user!.id);
        if (existingSkillsError) throw existingSkillsError;

        const knownSkills = new Set(
          (existingSkills || []).map(
            (skill) => `${skill.repo_id}::${skill.name.trim().toLowerCase()}`,
          ),
        );

        for (const item of parsed.items) {
          let repoId =
            item.repo_id && reposById.has(item.repo_id) ? item.repo_id : null;

          if (
            !repoId &&
            item.repo_owner &&
            item.repo_name
          ) {
            const repoKey = buildRepoSignature(
              item.repo_owner,
              item.repo_name,
              item.repo_branch,
              item.repo_subdirectory,
            );
            let matchedRepo = reposByKey.get(repoKey);

            if (!matchedRepo) {
              const { data: createdRepo, error: createRepoError } = await supabase
                .from("skills_repos")
                .insert({
                  user_id: user!.id,
                  owner: item.repo_owner,
                  repo: item.repo_name,
                  branch: item.repo_branch || "main",
                  subdirectory: item.repo_subdirectory || "",
                  is_default: item.repo_is_default ?? false,
                })
                .select("id, owner, repo, branch, subdirectory")
                .single();

              if (createRepoError) continue;
              matchedRepo = createdRepo;
              reposById.set(createdRepo.id, createdRepo);
              reposByKey.set(repoKey, createdRepo);
            }

            repoId = matchedRepo.id;
          }

          if (!repoId) continue;

          const skillKey = `${repoId}::${item.name.trim().toLowerCase()}`;
          if (knownSkills.has(skillKey)) continue;

          const { error } = await supabase
            .from("skills")
            .insert({
              user_id: user!.id,
              name: item.name,
              description: item.description,
              installed: item.installed,
              repo_id: repoId,
            });
          if (!error) {
            knownSkills.add(skillKey);
            count++;
          }
        }
      }

      toast({ title: t("export.importSuccess").replace("{count}", String(count)) });
    } catch (error) {
      toast({
        title: t("export.importFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Deep Link ───────────────────────────────────────────────────────────────

  const generateDeepLink = () => {
    const payload = buildDeepLinkPayload(providers);
    const encoded = encodeDeepLinkPayload(payload);
    const link = `${window.location.origin}/import?data=${encoded}`;
    setDeepLink(link);
  };

  const copyDeepLink = () => {
    navigator.clipboard.writeText(deepLink);
    toast({ title: t("export.linkCopied") });
  };

  // ── App card definition ─────────────────────────────────────────────────────

  const appCards = [
    {
      key: "claude" as const,
      label: "Claude Code",
      onExport: exportClaude,
      files: [
        { name: "settings.json", path: "~/.claude/settings.json", icon: <Settings className="h-3 w-3" />, desc: "MCP + Provider env" },
        { name: "CLAUDE.md", path: "项目根目录（或 ~/.claude/CLAUDE.md）", icon: <FileText className="h-3 w-3" />, desc: "系统提示词", optional: true },
        { name: "skills/<name>/SKILL.md", path: "~/.claude/skills/", icon: <FileCode className="h-3 w-3" />, desc: "已安装 Skills", optional: true },
      ],
      stats: () => {
        const s = getAppStats("claude", mcpServers, skills, providers);
        return `${s.enabledMcps.length} MCP · ${s.installedSkills.length} Skills`;
      },
    },
    {
      key: "codex" as const,
      label: "Codex CLI",
      onExport: exportCodex,
      files: [
        { name: "config.toml", path: "~/.codex/config.toml", icon: <Settings className="h-3 w-3" />, desc: "Provider + MCP Servers（TOML）" },
        { name: "AGENTS.md", path: "项目根目录", icon: <FileText className="h-3 w-3" />, desc: "系统提示词", optional: true },
      ],
      stats: () => {
        const s = getAppStats("codex", mcpServers, skills, providers);
        return `${s.enabledMcps.length} MCP · ${s.enabledProviders.length} Providers`;
      },
    },
    {
      key: "gemini" as const,
      label: "Gemini CLI",
      onExport: exportGemini,
      files: [
        { name: "settings.json", path: "~/.gemini/settings.json 或 ./.gemini/settings.json", icon: <Settings className="h-3 w-3" />, desc: "MCP Servers" },
        { name: "GEMINI.md", path: "项目根目录", icon: <FileText className="h-3 w-3" />, desc: "系统提示词", optional: true },
      ],
      stats: () => {
        const s = getAppStats("gemini", mcpServers, skills, providers);
        return `${s.enabledMcps.length} MCP`;
      },
    },
    {
      key: "opencode" as const,
      label: "OpenCode",
      onExport: exportOpenCode,
      files: [
        { name: "opencode.json", path: "~/.config/opencode/opencode.json 或 ./opencode.json", icon: <Settings className="h-3 w-3" />, desc: "MCP Servers" },
        { name: "AGENTS.md", path: "项目根目录", icon: <FileText className="h-3 w-3" />, desc: "系统提示词", optional: true },
      ],
      stats: () => {
        const s = getAppStats("opencode", mcpServers, skills, providers);
        return `${s.enabledMcps.length} MCP`;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold">{t("export.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("export.subtitle")}</p>
        </div>
        <HelpDialog sections={[
          { title: t("helpExport.what"), content: t("helpExport.whatDesc"), tip: t("helpExport.whatTip") },
          { title: t("helpExport.app"), content: t("helpExport.appDesc"), tip: t("helpExport.appTip") },
          { title: t("helpExport.backup"), content: t("helpExport.backupDesc"), tip: t("helpExport.backupTip") },
          { title: t("helpExport.import"), content: t("helpExport.importDesc"), tip: t("helpExport.importTip") },
          { title: t("helpExport.deepLink"), content: t("helpExport.deepLinkDesc"), tip: t("helpExport.deepLinkTip") },
        ]} />
      </div>

      <Tabs defaultValue="export">
        <TabsList>
          <TabsTrigger value="export" className="gap-1"><Download className="h-3.5 w-3.5" />{t("common.export")}</TabsTrigger>
          <TabsTrigger value="import" className="gap-1"><Upload className="h-3.5 w-3.5" />{t("common.import")}</TabsTrigger>
          <TabsTrigger value="deeplink" className="gap-1"><Link2 className="h-3.5 w-3.5" />Deep Link</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="mt-4 space-y-4">

          {/* ── App Export (ZIP) ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileArchive className="h-4 w-4" />
                {t("export.appExport")}
              </CardTitle>
              <CardDescription>{t("export.appExportDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {appCards.map(({ key, label, onExport, files, stats }) => (
                  <div key={key} className="rounded-lg border p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-xs text-muted-foreground">{stats()}</p>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 text-xs gap-1.5"
                        disabled={exporting !== null}
                        onClick={onExport}
                      >
                        {exporting === key
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : <Download className="h-3 w-3" />}
                        下载 ZIP
                      </Button>
                    </div>

                    {/* File list */}
                    <div className="space-y-1.5">
                      {files.map((f) => (
                        <div key={f.name} className="flex items-start gap-2">
                          <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${f.optional ? "text-muted-foreground/50" : "text-primary"}`} />
                          <div className="min-w-0">
                            <span className="text-xs font-mono font-medium">{f.name}</span>
                            <span className="text-xs text-muted-foreground mx-1">→</span>
                            <span className="text-xs text-muted-foreground font-mono">{f.path}</span>
                            {f.optional && <Badge variant="outline" className="ml-1 text-[10px] h-4 px-1">按需</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground border-t pt-3">
                💡 {t("export.appExportHint")}
              </p>
            </CardContent>
          </Card>

          {/* ── Data Backup ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Database className="h-4 w-4" />
                {t("export.dataBackup")}
              </CardTitle>
            <CardDescription>{t("export.dataBackupDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">包含敏感字段</p>
                <p className="text-xs text-muted-foreground">
                  关闭时将脱敏 `providers.api_key` 与 `mcp_servers.env`
                </p>
              </div>
              <Switch checked={includeSecrets} onCheckedChange={setIncludeSecrets} />
            </div>

              {/* Full backup button */}
              <Button onClick={handleDataBackup} disabled={exporting !== null} variant="outline">
                {exporting === "backup"
                  ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  : <Package className="mr-2 h-4 w-4" />}
                {t("export.fullBackup")}
              </Button>

              {/* Per-module export */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={() => handleModuleExport("providers", providers)}>
                  Providers ({providers.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleModuleExport("mcp-servers", mcpServers)}>
                  MCP Servers ({mcpServers.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleModuleExport("prompts", prompts)}>
                  Prompts ({prompts.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleModuleExport("skills", skills)}>
                  Skills ({skills.length})
                </Button>
              </div>

              <p className="text-xs text-muted-foreground border-t pt-2">
                ⚠️ {t("export.backupWarning")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Upload className="h-4 w-4" />{t("export.import")}</CardTitle>
              <CardDescription>{t("export.importDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <Button onClick={() => fileInputRef.current?.click()} disabled={importing}>
                {importing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {t("export.selectFile")}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">{t("export.importHint")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deeplink" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Link2 className="h-4 w-4" />{t("export.deepLink")}</CardTitle>
              <CardDescription>{t("export.deepLinkDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={generateDeepLink}>
                <Link2 className="mr-2 h-4 w-4" />{t("export.generateLink")}
              </Button>
              {deepLink && (
                <div className="flex gap-2">
                  <Input value={deepLink} readOnly className="font-mono text-xs" />
                  <Button variant="outline" size="icon" onClick={copyDeepLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
