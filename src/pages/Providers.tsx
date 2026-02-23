import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Copy, Zap, Loader2, Activity, CheckCircle2, XCircle, Info, FolderOpen, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import { HelpDialog } from "@/components/HelpDialog";
import type { Tables } from "@/integrations/supabase/types";
import { getErrorMessage } from "@/lib/errors";
import {
  APP_TYPES,
  PROVIDER_PRESETS,
  getAutoBaseUrl,
} from "@/config/preset-catalog/providers";
import { DOCS_CATALOG_VERIFIED_AT, LOCAL_DEPLOY_DOCS } from "@/config/docs-catalog/help";

type Provider = Tables<"providers">;
type ConnectionTestResult = { success: boolean; message: string; latency_ms?: number };

function normalizeConnectionResult(payload: unknown): ConnectionTestResult {
  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;
    if (
      typeof candidate.success === "boolean" &&
      typeof candidate.message === "string"
    ) {
      return {
        success: candidate.success,
        message: candidate.message,
        latency_ms:
          typeof candidate.latency_ms === "number" ? candidate.latency_ms : undefined,
      };
    }
  }
  return { success: false, message: "无效的测试响应" };
}


function ProviderForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Partial<Provider>;
  onSave: (data: Partial<Provider>) => void;
  saving: boolean;
}) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState({
    name: initial?.name || "",
    provider_type: initial?.provider_type || "custom",
    api_key: initial?.api_key || "",
    base_url: initial?.base_url || "",
    app_type: initial?.app_type || "claude",
    enabled: initial?.enabled ?? true,
  });

  const isAutoUrl = form.provider_type === "official" || form.provider_type === "packycode";

  const handleProviderTypeChange = (v: string) => {
    const newUrl = v === "custom" ? "" : getAutoBaseUrl(v, form.app_type);
    setForm({ ...form, provider_type: v, base_url: newUrl });
  };

  const handleAppTypeChange = (v: string) => {
    const newUrl = isAutoUrl ? getAutoBaseUrl(form.provider_type, v) : form.base_url;
    setForm({ ...form, app_type: v, base_url: newUrl });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>名称 <span className="text-destructive">*</span></Label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Provider 名称" maxLength={100} />
      </div>
      <div className="space-y-2">
        <Label>类型 <span className="text-destructive">*</span></Label>
        <Select value={form.provider_type} onValueChange={handleProviderTypeChange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="official">官方登录</SelectItem>
            <SelectItem value="packycode">PackyCode</SelectItem>
            <SelectItem value="custom">自定义</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>应用 <span className="text-destructive">*</span></Label>
        <Select value={form.app_type} onValueChange={handleAppTypeChange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {APP_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>API Key <span className="text-xs text-muted-foreground ml-1">(选填)</span></Label>
        <Input type="password" value={form.api_key} onChange={(e) => setForm({ ...form, api_key: e.target.value })} placeholder="sk-..." maxLength={500} />
      </div>
      <div className="space-y-2">
        <Label>Base URL {isAutoUrl ? <span className="text-xs text-muted-foreground ml-1">(自动填充)</span> : <span className="text-xs text-muted-foreground ml-1">(选填)</span>}</Label>
        <Input value={form.base_url} onChange={(e) => setForm({ ...form, base_url: e.target.value })} placeholder="https://api.example.com" maxLength={500} disabled={isAutoUrl} className={isAutoUrl ? "opacity-70" : ""} />
      </div>
      <div className="flex items-center justify-between">
        <Label>启用</Label>
        <Switch checked={form.enabled} onCheckedChange={(v) => setForm({ ...form, enabled: v })} />
      </div>
      <Button className="w-full" onClick={() => onSave(form)} disabled={saving || !form.name.trim()}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        保存
      </Button>
    </div>
  );
}

export default function Providers() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testingAll, setTestingAll] = useState(false);
  const [testResults, setTestResults] = useState<
    Record<string, ConnectionTestResult | undefined>
  >({});
  const [deleteTarget, setDeleteTarget] = useState<Provider | null>(null);

  const testConnection = async (provider: Provider) => {
    setTestingId(provider.id);
    setTestResults((prev) => ({ ...prev, [provider.id]: undefined }));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/test-connection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            type: "provider",
            provider_type: provider.provider_type,
            base_url: provider.base_url,
            api_key: provider.api_key,
            app_type: provider.app_type,
          }),
        }
      );
      const result = normalizeConnectionResult(await resp.json());
      setTestResults((prev) => ({ ...prev, [provider.id]: result }));
      return result;
    } catch (error) {
      const result = { success: false, message: getErrorMessage(error) };
      setTestResults((prev) => ({ ...prev, [provider.id]: result }));
      return result;
    } finally {
      setTestingId(null);
    }
  };

  const testAllConnections = async () => {
    if (providers.length === 0) return;
    setTestingAll(true);
    let successCount = 0;
    let failCount = 0;
    for (const provider of providers) {
      setTestingId(provider.id);
      const result = await testConnection(provider);
      if (result?.success) successCount++; else failCount++;
    }
    setTestingAll(false);
    setTestingId(null);
    toast({
      title: `一键测试完成`,
      description: `成功 ${successCount} 个，失败 ${failCount} 个`,
      variant: failCount > 0 && successCount === 0 ? "destructive" : "default",
    });
  };

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Provider[];
    },
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Provider>) => {
      const { error } = await supabase.from("providers").insert({
        ...data,
        user_id: user!.id,
        name: data.name!,
        sort_order: providers.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      setDialogOpen(false);
      toast({ title: "创建成功" });
    },
    onError: (e) => toast({ title: "创建失败", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Provider> & { id: string }) => {
      const { error } = await supabase.from("providers").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      setEditingProvider(null);
      toast({ title: "更新成功" });
    },
    onError: (e) => toast({ title: "更新失败", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("providers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({ title: "删除成功" });
    },
    onError: (e) => toast({ title: "删除失败", description: e.message, variant: "destructive" }),
  });

  const duplicateMutation = useMutation({
    mutationFn: async (provider: Provider) => {
      const { id, created_at, updated_at, ...rest } = provider;
      const { error } = await supabase.from("providers").insert({
        ...rest,
        name: `${rest.name} (副本)`,
        sort_order: providers.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({ title: "复制成功" });
    },
    onError: (e) => toast({ title: "复制失败", description: e.message, variant: "destructive" }),
  });

  const applyPreset = (preset: typeof PROVIDER_PRESETS[0]) => {
    createMutation.mutate({
      name: preset.name,
      provider_type: preset.provider_type,
      base_url: preset.base_url,
      app_type: preset.app_type,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">{t("providers.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("providers.subtitle")}</p>
          </div>
          <HelpDialog sections={[
            { title: t("helpProviders.what"), content: t("helpProviders.whatDesc"), tip: t("helpProviders.whatTip") },
            { title: t("helpProviders.types"), content: t("helpProviders.typesDesc"), tip: t("helpProviders.typesTip") },
            { title: t("helpProviders.howTo"), content: t("helpProviders.howToDesc") },
            { title: t("helpProviders.test"), content: t("helpProviders.testDesc"), tip: t("helpProviders.testTip") },
          ]} />
        </div>
        <div className="flex items-center gap-2">
          {providers.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={testAllConnections}
              disabled={testingAll || testingId !== null}
            >
              {testingAll ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <PlayCircle className="mr-1.5 h-3.5 w-3.5" />}
              一键测试
            </Button>
          )}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />新增 Provider</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增 Provider</DialogTitle>
              </DialogHeader>
              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                {PROVIDER_PRESETS.map((p) => (
                  <Button
                    key={p.id}
                    variant="outline"
                    size="sm"
                    className="justify-between gap-2"
                    onClick={() => applyPreset(p)}
                    title={`${p.verification.verification_reason} (${p.verification.last_verified_at})`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] uppercase text-muted-foreground">
                      {p.verification.verification_status}
                    </span>
                  </Button>
                ))}
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                预设已按官方来源验真，最后核验：{PROVIDER_PRESETS[0].verification.last_verified_at}
              </p>
              <ProviderForm onSave={(data) => createMutation.mutate(data)} saving={createMutation.isPending} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Local Deployment Banner */}
      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-sm font-semibold">本地部署说明</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p className="text-sm text-muted-foreground">
            Provider 配置已实时备份到云端。Web 端无法直接写入本地文件，请导出后按官方路径（或环境变量）应用：
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 ml-1">
            <li><code className="bg-muted px-1 rounded">Claude Code</code> → <code className="bg-muted px-1 rounded">~/.claude/settings.json</code>（Windows：<code className="bg-muted px-1 rounded">%USERPROFILE%\\.claude\\settings.json</code>）</li>
            <li><code className="bg-muted px-1 rounded">Codex CLI</code> → <code className="bg-muted px-1 rounded">~/.codex/config.toml</code>（Windows：<code className="bg-muted px-1 rounded">%USERPROFILE%\\.codex\\config.toml</code>）</li>
            <li><code className="bg-muted px-1 rounded">Gemini CLI</code> → API Key 使用 <code className="bg-muted px-1 rounded">GEMINI_API_KEY</code> / <code className="bg-muted px-1 rounded">GOOGLE_API_KEY</code>，配置文件为 <code className="bg-muted px-1 rounded">~/.gemini/settings.json</code> 或 <code className="bg-muted px-1 rounded">./.gemini/settings.json</code></li>
            <li><code className="bg-muted px-1 rounded">OpenCode</code> → <code className="bg-muted px-1 rounded">~/.config/opencode/opencode.json</code> 或 <code className="bg-muted px-1 rounded">./opencode.json</code></li>
          </ul>
          <p className="text-xs text-muted-foreground">
            建议始终以官方文档核对本地配置字段。最新核验日期：{DOCS_CATALOG_VERIFIED_AT}。
          </p>
          <p className="text-xs text-muted-foreground space-x-2">
            <a className="underline underline-offset-2" href={LOCAL_DEPLOY_DOCS.claude} target="_blank" rel="noopener noreferrer">Claude Docs</a>
            <a className="underline underline-offset-2" href={LOCAL_DEPLOY_DOCS.codex} target="_blank" rel="noopener noreferrer">Codex Docs</a>
            <a className="underline underline-offset-2" href={LOCAL_DEPLOY_DOCS.gemini} target="_blank" rel="noopener noreferrer">Gemini Docs</a>
            <a className="underline underline-offset-2" href={LOCAL_DEPLOY_DOCS.opencode} target="_blank" rel="noopener noreferrer">OpenCode Docs</a>
          </p>
          <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" onClick={() => navigate("/export")}>
            <FolderOpen className="mr-1.5 h-3 w-3" />前往导出配置
          </Button>
        </AlertDescription>
      </Alert>

      {providers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Zap className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">暂无 Provider</p>
            <p className="text-sm text-muted-foreground/60">点击「新增 Provider」开始配置</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.id} className={`transition-opacity ${!provider.enabled ? "opacity-50" : ""}`}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">{provider.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {provider.app_type} · {provider.provider_type}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={testingId === provider.id || testingAll}
                    onClick={() => {
                      testConnection(provider).then((result) => {
                        toast({
                          title: result.success ? "连接成功" : "连接失败",
                          description: result.message + (result.latency_ms ? ` (${result.latency_ms}ms)` : ""),
                          variant: result.success ? "default" : "destructive",
                        });
                      });
                    }}
                    title="测试连接"
                  >
                    {testingId === provider.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : testResults[provider.id]?.success === true ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    ) : testResults[provider.id]?.success === false ? (
                      <XCircle className="h-3.5 w-3.5 text-destructive" />
                    ) : (
                      <Activity className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingProvider(provider)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => duplicateMutation.mutate(provider)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => setDeleteTarget(provider)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {provider.base_url && <p className="truncate">URL: {provider.base_url}</p>}
                  <p>API Key: {provider.api_key ? "••••••" + provider.api_key.slice(-4) : "未设置"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingProvider} onOpenChange={(open) => !open && setEditingProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑 Provider</DialogTitle>
          </DialogHeader>
          {editingProvider && (
            <ProviderForm
              initial={editingProvider}
              onSave={(data) => updateMutation.mutate({ id: editingProvider.id, ...data })}
              saving={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除 Provider「<strong>{deleteTarget?.name}</strong>」吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
