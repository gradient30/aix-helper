import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, BookOpen, Loader2, GitBranch, RefreshCw, Pencil, FolderGit2, LayoutGrid, List, Search, Info, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HelpDialog } from "@/components/HelpDialog";
import type { Tables } from "@/integrations/supabase/types";
import { getErrorMessage } from "@/lib/errors";
import { PRESET_REPOS, PRESET_TABS } from "@/config/preset-catalog/skills";
import type { SkillsRepoPreset } from "@/config/preset-catalog/types";

type SkillsRepo = Tables<"skills_repos">;
type Skill = Tables<"skills">;

type GitHubContentItem = {
  type: string;
  name: string;
  path: string;
};

function isGitHubContentItem(value: unknown): value is GitHubContentItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.type === "string" &&
    typeof item.name === "string" &&
    typeof item.path === "string"
  );
}

async function readSkillDescription(
  owner: string,
  repo: string,
  branch: string,
  dirPath: string,
): Promise<string> {
  try {
    const readmeResp = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}/README.md?ref=${branch}`,
    );
    if (!readmeResp.ok) return "";

    const readmeData = (await readmeResp.json()) as Record<string, unknown>;
    if (typeof readmeData.content !== "string") return "";

    const decoded = atob(readmeData.content);
    const firstLine = decoded
      .split("\n")
      .find((line) => line.trim() && !line.startsWith("#"));
    return firstLine?.trim().slice(0, 200) || "";
  } catch {
    return "";
  }
}

type GitHubFetchResult = {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: string;
};

const GITHUB_RETRY_DELAYS_MS = [500, 1200];

async function fetchGitHubJsonWithRetry(url: string): Promise<GitHubFetchResult> {
  let lastResult: GitHubFetchResult = {
    ok: false,
    status: 0,
    error: "Unknown GitHub error",
  };

  for (let attempt = 0; attempt <= GITHUB_RETRY_DELAYS_MS.length; attempt++) {
    try {
      const resp = await fetch(url);
      const payload = (await resp.json()) as unknown;
      if (resp.ok) {
        return { ok: true, status: resp.status, data: payload };
      }

      const message =
        payload && typeof payload === "object" && "message" in payload
          ? String((payload as Record<string, unknown>).message)
          : `GitHub API error: ${resp.status}`;

      lastResult = { ok: false, status: resp.status, error: message };

      // Secondary rate limit or transient server error.
      if (resp.status === 403 || resp.status >= 500) {
        if (attempt < GITHUB_RETRY_DELAYS_MS.length) {
          await new Promise((resolve) =>
            setTimeout(resolve, GITHUB_RETRY_DELAYS_MS[attempt]),
          );
          continue;
        }
      }

      return lastResult;
    } catch (error) {
      lastResult = {
        ok: false,
        status: 0,
        error: getErrorMessage(error),
      };
      if (attempt < GITHUB_RETRY_DELAYS_MS.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, GITHUB_RETRY_DELAYS_MS[attempt]),
        );
        continue;
      }
      return lastResult;
    }
  }

  return lastResult;
}

async function hasSkillManifest(
  owner: string,
  repo: string,
  branch: string,
  dirPath: string,
): Promise<boolean> {
  const candidates = ["SKILL.md", "skill.md"];
  for (const fileName of candidates) {
    const fileResp = await fetchGitHubJsonWithRetry(
      `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}/${fileName}?ref=${branch}`,
    );
    if (fileResp.status === 403) {
      throw new Error("GitHub API 访问受限或限流，请稍后重试（已自动重试）");
    }
    if (fileResp.ok) return true;
  }
  return false;
}

// Skill 中文说明 Tooltip — 通用技能 + 常见仓库扫描出的技能
const SKILL_TIPS: Record<string, string> = {
  // MCP 相关
  "mcp-fetch": "为 AI 提供网络请求能力，可以访问外部 API 和网页内容",
  "mcp-filesystem": "让 AI 能够读写本地文件系统中的文件",
  "mcp-memory": "为 AI 提供持久化记忆存储，跨对话保持上下文",
  "playwright": "浏览器自动化测试工具，支持截图、表单操作等",
  "context7": "上下文增强服务，提升 AI 对项目代码的理解能力",
  "github": "GitHub API 集成，支持仓库管理、Issue、PR 等操作",
  "puppeteer": "Chrome 浏览器自动化，网页爬取、截图、PDF 生成",
  "brave-search": "Brave 搜索引擎集成，为 AI 提供实时网络搜索",
  "sequential-thinking": "增强 AI 的逐步思考和推理能力",
  "sqlite": "SQLite 数据库操作，支持本地数据库查询和管理",
  "postgres": "PostgreSQL 数据库连接与查询",
  "slack": "Slack 消息发送和频道管理集成",
  // 常见 Claude Skills
  "code-review": "代码审查助手，自动检查代码质量和潜在问题",
  "unit-test": "单元测试生成器，为代码自动生成测试用例",
  "unit-tests": "单元测试生成器，为代码自动生成测试用例",
  "refactor": "代码重构助手，优化代码结构和可读性",
  "debug": "调试助手，帮助定位和修复代码中的问题",
  "documentation": "文档生成器，自动为代码生成文档注释",
  "docs": "文档生成器，自动为代码生成技术文档",
  "translate": "翻译助手，支持多语言互译",
  "translation": "翻译助手，支持文本和代码注释翻译",
  "api-design": "API 设计助手，帮助设计 RESTful 接口",
  "database": "数据库设计助手，辅助表结构和查询优化",
  "devops": "DevOps 助手，CI/CD 和基础设施配置",
  "security": "安全审计助手，检测代码中的安全漏洞",
  "performance": "性能优化助手，分析和改善应用性能",
  "architect": "架构设计助手，提供系统设计和技术方案",
  "architecture": "架构设计助手，提供系统设计建议",
  "frontend": "前端开发助手，React/Vue/CSS 等技术支持",
  "backend": "后端开发助手，服务端逻辑和 API 开发",
  "fullstack": "全栈开发助手，前后端一体化支持",
  "data-analysis": "数据分析助手，数据清洗和可视化",
  "machine-learning": "机器学习助手，模型训练和部署",
  "writing": "写作助手，辅助技术文章和文案创作",
  "creative-writing": "创意写作助手，故事和内容创作",
  "summarize": "内容摘要助手，快速提炼文章要点",
  "explain": "概念解释助手，深入浅出讲解技术概念",
  "git": "Git 操作助手，分支管理和提交规范",
  "docker": "Docker 容器化助手，镜像构建和编排",
  "kubernetes": "K8s 容器编排助手，集群管理和部署",
  "terraform": "基础设施即代码助手，云资源编排",
  "aws": "AWS 云服务助手，云架构设计和配置",
  "python": "Python 开发助手，脚本和应用开发",
  "javascript": "JavaScript 开发助手，前后端 JS 开发",
  "typescript": "TypeScript 开发助手，类型安全开发",
  "rust": "Rust 开发助手，系统级编程支持",
  "go": "Go 开发助手，高并发服务开发",
  "java": "Java 开发助手，企业级应用开发",
  "sql": "SQL 助手，数据库查询和优化",
  "css": "CSS 样式助手，布局和动画设计",
  "react": "React 开发助手，组件和 Hooks 开发",
  "vue": "Vue 开发助手，组件化前端开发",
  "nextjs": "Next.js 开发助手，SSR/SSG 应用开发",
  "tailwind": "Tailwind CSS 助手，实用类样式开发",
  "markdown": "Markdown 助手，文档格式化和排版",
  "regex": "正则表达式助手，模式匹配和文本处理",
  "cli": "命令行工具助手，Shell 脚本和 CLI 开发",
  "testing": "测试助手，自动化测试策略和用例编写",
  "migration": "数据迁移助手，数据库和系统迁移",
  "optimization": "优化助手，代码和系统性能调优",
  "monitoring": "监控助手，日志分析和告警配置",
  "accessibility": "无障碍助手，Web 可访问性优化",
  "seo": "SEO 优化助手，搜索引擎优化策略",
  "i18n": "国际化助手，多语言和本地化支持",
  "email": "邮件模板助手，HTML 邮件设计",
  "chatbot": "聊天机器人助手，对话流程设计",
  "scraping": "网页抓取助手，数据采集和解析",
  "pdf": "PDF 处理助手，文档生成和解析",
  "image": "图像处理助手，图片编辑和优化",
  "video": "视频处理助手，视频编辑和转码",
  "audio": "音频处理助手，音频编辑和转换",
  "math": "数学计算助手，公式推导和计算",
  "finance": "金融分析助手，财务数据和报表",
  "legal": "法律助手，合同和法规分析",
  "medical": "医疗助手，医学知识和文献查阅",
  "education": "教育助手，课程设计和学习辅导",
  "game": "游戏开发助手，游戏逻辑和设计",
  "blockchain": "区块链助手，智能合约和 DApp 开发",
  "ai-prompt": "提示词工程助手，Prompt 设计和优化",
  "prompt-engineering": "提示词工程助手，Prompt 优化",
};

const SKILL_BUNDLE_SLUGS = new Set(
  PRESET_REPOS.skills.map((preset) => `${preset.owner}/${preset.repo}`.toLowerCase()),
);

function toRepoSlug(owner: string, repo: string): string {
  return `${owner}/${repo}`.toLowerCase();
}

function getRepoKind(owner: string, repo: string): SkillsRepoPreset["repo_kind"] {
  return SKILL_BUNDLE_SLUGS.has(toRepoSlug(owner, repo))
    ? "skill_bundle"
    : "reference_repo";
}

function getGitHubErrorMessage(status: number, fallback?: string): string {
  if (status === 404) return "仓库路径不存在，请检查 owner/repo/branch/subdirectory 配置";
  if (status === 403) {
    return "GitHub API 访问受限或限流，请稍后重试（已自动重试）";
  }
  if (fallback?.trim()) return fallback;
  return `GitHub API error: ${status}`;
}

function RepoForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Partial<SkillsRepo>;
  onSave: (data: Partial<SkillsRepo>) => void;
  saving: boolean;
}) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    owner: initial?.owner || "",
    repo: initial?.repo || "",
    branch: initial?.branch || "main",
    subdirectory: initial?.subdirectory || "",
    is_default: initial?.is_default ?? false,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t("skills.repoOwner")} <span className="text-destructive">*</span></Label>
        <Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="anthropics" maxLength={100} />
      </div>
      <div className="space-y-2">
        <Label>{t("skills.repoName")} <span className="text-destructive">*</span></Label>
        <Input value={form.repo} onChange={(e) => setForm({ ...form, repo: e.target.value })} placeholder="claude-code" maxLength={100} />
      </div>
      <div className="space-y-2">
        <Label>{t("skills.branch")} <span className="text-xs text-muted-foreground ml-1">(选填)</span></Label>
        <Input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} placeholder="main" maxLength={50} />
      </div>
      <div className="space-y-2">
        <Label>{t("skills.subdirectory")} <span className="text-xs text-muted-foreground ml-1">(选填)</span></Label>
        <Input value={form.subdirectory} onChange={(e) => setForm({ ...form, subdirectory: e.target.value })} placeholder="skills" maxLength={200} />
      </div>
      <div className="flex items-center justify-between">
        <Label>{t("skills.isDefault")} <span className="text-xs text-muted-foreground ml-1">(选填)</span></Label>
        <Switch checked={form.is_default} onCheckedChange={(v) => setForm({ ...form, is_default: v })} />
      </div>
      <Button className="w-full" onClick={() => onSave(form)} disabled={saving || !form.owner.trim() || !form.repo.trim()}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("common.save")}
      </Button>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [repoDialogOpen, setRepoDialogOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<SkillsRepo | null>(null);
  const [scanningRepoId, setScanningRepoId] = useState<string | null>(null);
  const [scanningAll, setScanningAll] = useState(false);
  const [deleteRepoTarget, setDeleteRepoTarget] = useState<SkillsRepo | null>(null);

  // Skills view & filter state
  const [viewMode, setViewMode] = useState<string>(() => localStorage.getItem("skills-view") || "card");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRepo, setFilterRepo] = useState<string>("all");

  const { data: repos = [], isLoading: reposLoading } = useQuery({
    queryKey: ["skills_repos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills_repos").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data as SkillsRepo[];
    },
    enabled: !!user,
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("name", { ascending: true });
      if (error) throw error;
      return data as Skill[];
    },
    enabled: !!user,
  });

  const createRepoMutation = useMutation({
    mutationFn: async (data: Partial<SkillsRepo>) => {
      const { error } = await supabase.from("skills_repos").insert({ ...data, user_id: user!.id, owner: data.owner!, repo: data.repo! });
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["skills_repos"] }); setRepoDialogOpen(false); toast({ title: t("common.success") }); },
    onError: (e) => toast({ title: t("common.error"), description: e.message, variant: "destructive" }),
  });

  const updateRepoMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<SkillsRepo> & { id: string }) => {
      const { error } = await supabase.from("skills_repos").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["skills_repos"] }); setEditingRepo(null); toast({ title: t("common.success") }); },
    onError: (e) => toast({ title: t("common.error"), description: e.message, variant: "destructive" }),
  });

  const deleteRepoMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("skills").delete().eq("repo_id", id);
      const { error } = await supabase.from("skills_repos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["skills_repos"] }); queryClient.invalidateQueries({ queryKey: ["skills"] }); toast({ title: t("common.success") }); },
    onError: (e) => toast({ title: t("common.error"), description: e.message, variant: "destructive" }),
  });

  const toggleInstalled = useMutation({
    mutationFn: async ({ id, installed }: { id: string; installed: boolean }) => {
      const { error } = await supabase.from("skills").update({ installed }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });

  const scanRepoSkills = async (repo: SkillsRepo): Promise<number> => {
    const repoKind = getRepoKind(repo.owner, repo.repo);
    if (repoKind !== "skill_bundle") {
      throw new Error("仅 skill_bundle 仓库允许扫描导入 Skills");
    }

    const basePath = repo.subdirectory ? `${repo.subdirectory}` : "";
    const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${basePath}?ref=${repo.branch}`;
    const listing = await fetchGitHubJsonWithRetry(apiUrl);
    if (!listing.ok) {
      throw new Error(getGitHubErrorMessage(listing.status, listing.error));
    }

    const items = listing.data;
    const skillDirs = Array.isArray(items)
      ? items.filter(
          (item): item is GitHubContentItem =>
            isGitHubContentItem(item) && item.type === "dir",
        )
      : [];

    let count = 0;
    for (const dir of skillDirs) {
      const manifestOk = await hasSkillManifest(
        repo.owner,
        repo.repo,
        repo.branch,
        dir.path,
      );
      if (!manifestOk) continue;

      const existing = skills.find((s) => s.name === dir.name && s.repo_id === repo.id);
      if (existing) continue;

      const description = await readSkillDescription(
        repo.owner,
        repo.repo,
        repo.branch,
        dir.path,
      );

      const { error } = await supabase.from("skills").insert({
        name: dir.name,
        description,
        repo_id: repo.id,
        user_id: user!.id,
      });
      if (!error) count++;
    }
    return count;
  };

  const scanSkills = async (repo: SkillsRepo) => {
    setScanningRepoId(repo.id);
    try {
      const count = await scanRepoSkills(repo);
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast({ title: t("skills.scanSuccess").replace("{count}", String(count)) });
    } catch (error) {
      toast({
        title: t("skills.scanFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setScanningRepoId(null);
    }
  };

  const scanAllSkills = async () => {
    const scanTargets = repos.filter(
      (repo) => getRepoKind(repo.owner, repo.repo) === "skill_bundle",
    );
    if (scanTargets.length === 0) {
      toast({
        title: "没有可扫描仓库",
        description: "仅 skill_bundle 仓库支持扫描导入。",
      });
      return;
    }

    setScanningAll(true);
    let totalCount = 0;
    let failedCount = 0;
    for (const repo of scanTargets) {
      setScanningRepoId(repo.id);
      try {
        totalCount += await scanRepoSkills(repo);
      } catch {
        failedCount += 1;
      }
    }
    setScanningAll(false);
    setScanningRepoId(null);
    queryClient.invalidateQueries({ queryKey: ["skills"] });
    toast({
      title: "一键扫描完成",
      description:
        failedCount > 0
          ? `新增 ${totalCount} 个 Skills，失败 ${failedCount} 个仓库`
          : `共新增 ${totalCount} 个 Skills`,
      variant: failedCount > 0 ? "destructive" : "default",
    });
  };

  const addPresetRepo = (preset: SkillsRepoPreset) => {
    createRepoMutation.mutate({
      owner: preset.owner,
      repo: preset.repo,
      branch: preset.branch || "main",
      subdirectory: "",
      is_default: preset.repo_kind === "skill_bundle",
    });
  };

  const handleViewChange = (v: string) => {
    if (v) {
      setViewMode(v);
      localStorage.setItem("skills-view", v);
    }
  };

  // Filter skills
  const filteredSkills = skills.filter((skill) => {
    const matchSearch = !searchQuery || skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || (skill.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || (filterStatus === "installed" ? skill.installed : !skill.installed);
    const matchRepo = filterRepo === "all" || skill.repo_id === filterRepo;
    return matchSearch && matchStatus && matchRepo;
  });
  const scanEligibleRepoCount = repos.filter(
    (repo) => getRepoKind(repo.owner, repo.repo) === "skill_bundle",
  ).length;

  if (reposLoading || skillsLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">{t("skills.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("skills.subtitle")}</p>
          </div>
          <HelpDialog sections={[
            { title: t("helpSkills.what"), content: t("helpSkills.whatDesc"), tip: t("helpSkills.whatTip") },
            { title: t("helpSkills.repos"), content: t("helpSkills.reposDesc"), tip: t("helpSkills.reposTip") },
            { title: t("helpSkills.scan"), content: t("helpSkills.scanDesc"), tip: t("helpSkills.scanTip") },
            { title: t("helpSkills.views"), content: t("helpSkills.viewsDesc") },
          ]} />
        </div>
      </div>

      <Tabs defaultValue="repos">
        <TabsList>
          <TabsTrigger value="repos" className="gap-1"><FolderGit2 className="h-3.5 w-3.5" />仓库</TabsTrigger>
          <TabsTrigger value="skills" className="gap-1"><BookOpen className="h-3.5 w-3.5" />Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="repos" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            {repos.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={scanAllSkills}
                disabled={scanningAll || scanningRepoId !== null || scanEligibleRepoCount === 0}
              >
                {scanningAll ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <PlayCircle className="mr-1.5 h-3.5 w-3.5" />}
                一键扫描 ({scanEligibleRepoCount})
              </Button>
            )}
            <Dialog open={repoDialogOpen} onOpenChange={setRepoDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="mr-1 h-4 w-4" />{t("skills.addRepo")}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{t("skills.addRepo")}</DialogTitle></DialogHeader>
                {/* Preset repos by category */}
                <Tabs defaultValue="skills" className="mb-4">
                  <TabsList className="flex-wrap h-auto gap-1">
                    {PRESET_TABS.map((tab) => (
                      <TabsTrigger key={tab.key} value={tab.key} className="text-xs">{tab.label}</TabsTrigger>
                    ))}
                  </TabsList>
                  {PRESET_TABS.map((tab) => (
                    <TabsContent key={tab.key} value={tab.key} className="mt-2">
                      <div className="grid grid-cols-2 gap-1.5">
                        {PRESET_REPOS[tab.key as keyof typeof PRESET_REPOS].map((p) => (
                          <TooltipProvider key={`${p.owner}/${p.repo}`} delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="justify-between text-xs h-8 font-mono gap-2"
                                  onClick={() => addPresetRepo(p)}
                                  title={`${p.repo_kind} · ${p.verification.last_verified_at}`}
                                >
                                  <span>{p.owner}/{p.repo}</span>
                                  <span className="text-[10px] uppercase text-muted-foreground">
                                    {p.verification.verification_status}
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-1 text-xs">
                                  <p>{p.desc}</p>
                                  <p>kind: {p.repo_kind}</p>
                                  <p>verified: {p.verification.last_verified_at}</p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
                <p className="mb-4 text-xs text-muted-foreground">
                  仅 `skill_bundle` 仓库允许扫描导入；其余均作为参考仓库管理。
                </p>
                <RepoForm onSave={(data) => createRepoMutation.mutate(data)} saving={createRepoMutation.isPending} />
              </DialogContent>
            </Dialog>
          </div>

          {repos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FolderGit2 className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <p className="text-lg font-medium text-muted-foreground">{t("skills.emptyRepos")}</p>
                <p className="text-sm text-muted-foreground/60">{t("skills.emptyReposHint")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {repos.map((repo) => {
                const canScan = getRepoKind(repo.owner, repo.repo) === "skill_bundle";
                return (
                  <Card key={repo.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          {repo.owner}/{repo.repo}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {repo.branch}{repo.subdirectory ? ` / ${repo.subdirectory}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost" size="icon" className="h-7 w-7"
                          disabled={!canScan || scanningRepoId === repo.id || scanningAll}
                          onClick={() => scanSkills(repo)}
                          title={canScan ? t("skills.scanSkills") : "仅 skill_bundle 支持扫描"}
                        >
                          {scanningRepoId === repo.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingRepo(repo)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost" size="icon" className="h-7 w-7 text-destructive"
                          onClick={() => setDeleteRepoTarget(repo)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        {repo.is_default && <Badge variant="secondary" className="text-[10px]">默认</Badge>}
                        <Badge variant="outline" className="text-[10px]">
                          {canScan ? "skill_bundle" : "reference_repo"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{skills.filter((s) => s.repo_id === repo.id).length} Skills</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <Dialog open={!!editingRepo} onOpenChange={(open) => !open && setEditingRepo(null)}>
            <DialogContent>
              <DialogHeader><DialogTitle>{t("skills.editRepo")}</DialogTitle></DialogHeader>
              {editingRepo && (
                <RepoForm
                  initial={editingRepo}
                  onSave={(data) => updateRepoMutation.mutate({ id: editingRepo.id, ...data })}
                  saving={updateRepoMutation.isPending}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Repo Confirm Dialog */}
          <AlertDialog open={!!deleteRepoTarget} onOpenChange={(open) => !open && setDeleteRepoTarget(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除仓库</AlertDialogTitle>
                <AlertDialogDescription>
                  确定要删除仓库「<strong>{deleteRepoTarget?.owner}/{deleteRepoTarget?.repo}</strong>」及其所有 Skills 吗？此操作不可撤销。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => {
                    if (deleteRepoTarget) deleteRepoMutation.mutate(deleteRepoTarget.id);
                    setDeleteRepoTarget(null);
                  }}
                >
                  删除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="skills" className="mt-4 space-y-3">
          {/* Toolbar: search, filters, view toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索技能名称或描述..."
                className="pl-9 h-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="installed">已安装</SelectItem>
                <SelectItem value="uninstalled">未安装</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRepo} onValueChange={setFilterRepo}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部仓库</SelectItem>
                {repos.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.owner}/{r.repo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ToggleGroup type="single" value={viewMode} onValueChange={handleViewChange} size="sm">
              <ToggleGroupItem value="card" aria-label="卡片视图"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="列表视图"><List className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>

          {filteredSkills.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <p className="text-lg font-medium text-muted-foreground">{skills.length === 0 ? t("skills.emptySkills") : "无匹配结果"}</p>
                <p className="text-sm text-muted-foreground/60">{skills.length === 0 ? t("skills.emptySkillsHint") : "尝试调整筛选条件"}</p>
              </CardContent>
            </Card>
          ) : viewMode === "list" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">名称</TableHead>
                    <TableHead className="w-[140px]">来源仓库</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead className="w-[80px]">状态</TableHead>
                    <TableHead className="w-[60px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.map((skill) => {
                    const repo = repos.find((r) => r.id === skill.repo_id);
                    const tip = SKILL_TIPS[skill.name] || SKILL_TIPS[skill.name.toLowerCase()];
                    const descText = skill.description || tip || "-";
                    return (
                      <TableRow key={skill.id} className={!skill.installed ? "opacity-60" : ""}>
                        <TableCell className="font-medium text-sm max-w-[160px]">
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="block truncate cursor-help">{skill.name}</span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-sm">
                                <p className="font-semibold">{skill.name}</p>
                                {tip && <p className="text-xs mt-1">{tip}</p>}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[140px]">
                          <span className="block truncate">{repo ? `${repo.owner}/${repo.repo}` : "-"}</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="block truncate max-w-[240px] cursor-help">{descText}</span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-sm"><p>{descText}</p></TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <Badge variant={skill.installed ? "default" : "secondary"} className="text-[10px] whitespace-nowrap">
                            {skill.installed ? "已安装" : "未安装"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={skill.installed}
                            onCheckedChange={(v) => toggleInstalled.mutate({ id: skill.id, installed: v })}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => {
                const repo = repos.find((r) => r.id === skill.repo_id);
                const tip = SKILL_TIPS[skill.name] || SKILL_TIPS[skill.name.toLowerCase()];
                const descText = skill.description || tip || "";
                return (
                  <Card key={skill.id} className={`transition-opacity ${!skill.installed ? "opacity-60" : ""}`}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CardTitle className="text-sm truncate cursor-help">{skill.name}</CardTitle>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-sm">
                              <p className="font-semibold">{skill.name}</p>
                              {tip && <p className="text-xs mt-1">{tip}</p>}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {repo && <p className="text-[10px] text-muted-foreground truncate">{repo.owner}/{repo.repo}</p>}
                      </div>
                      <Switch
                        className="shrink-0"
                        checked={skill.installed}
                        onCheckedChange={(v) => toggleInstalled.mutate({ id: skill.id, installed: v })}
                      />
                    </CardHeader>
                    {descText && (
                      <CardContent>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-xs text-muted-foreground line-clamp-2 cursor-help">{descText}</p>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-sm"><p>{descText}</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
