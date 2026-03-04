import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Loader2, Plus, Save, Send } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Json, Tables } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";
import { getDetailedErrorMessage, getErrorMessage } from "@/lib/errors";
import {
  buildChatMessages,
  buildOpenAiCompatiblePayload,
  normalizeModelList,
  parseAssistantText,
  type ChatMessage,
} from "@/lib/api-calls-chat-utils";
import { normalizeApiKey } from "@/lib/api-calls-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type VendorTemplate = {
  id: string;
  name: string;
  baseUrl: string;
  path: string;
  defaultModel: string;
  defaultModels: string[];
  useLegacyOpenAiFormat: boolean;
  stream: boolean;
  includeMaxOutputTokens: boolean;
  maxOutputTokens: number;
  reasoningEffort: "low" | "medium" | "high";
  reasoningMode: "effort" | "thinking";
  defaultThinkingEnabled: boolean;
  supportsTemperature: boolean;
  defaultTemperature: number;
  contextWindowSize: number;
};

const VENDOR_TEMPLATES: VendorTemplate[] = [
  {
    id: "baishan",
    name: "白山",
    baseUrl: "https://api.edgefn.net",
    path: "/v1/chat/completions",
    defaultModel: "GLM-5",
    defaultModels: ["GLM-5", "DeepSeek-V3.2", "MiniMax-M2.5"],
    useLegacyOpenAiFormat: true,
    stream: false,
    includeMaxOutputTokens: false,
    maxOutputTokens: 4096,
    reasoningEffort: "medium",
    reasoningMode: "effort",
    defaultThinkingEnabled: false,
    supportsTemperature: false,
    defaultTemperature: 1,
    contextWindowSize: 131072,
  },
  {
    id: "kimi",
    name: "KIMI",
    baseUrl: "https://api.kimi.com/coding/v1",
    path: "/chat/completions",
    defaultModel: "kimi-for-coding",
    defaultModels: ["kimi-for-coding"],
    useLegacyOpenAiFormat: true,
    stream: true,
    includeMaxOutputTokens: true,
    maxOutputTokens: 32768,
    reasoningEffort: "medium",
    reasoningMode: "effort",
    defaultThinkingEnabled: false,
    supportsTemperature: false,
    defaultTemperature: 1,
    contextWindowSize: 262144,
  },
  {
    id: "reasoning-era",
    name: "推理时代",
    baseUrl: "https://aihubmix.com",
    path: "/v1/chat/completions",
    defaultModel: "coding-glm-5-free",
    defaultModels: ["coding-glm-5-free"],
    useLegacyOpenAiFormat: true,
    stream: false,
    includeMaxOutputTokens: true,
    maxOutputTokens: 65536,
    reasoningEffort: "medium",
    reasoningMode: "thinking",
    defaultThinkingEnabled: true,
    supportsTemperature: true,
    defaultTemperature: 1,
    contextWindowSize: 262144,
  },
];

type ApiProvider = Tables<"api_call_providers">;
type ApiHistory = Tables<"api_call_history">;

type InvokeResult = {
  status?: number;
  latency_ms?: number;
  raw?: string;
  normalized?: { text?: string };
};

const toObject = (value: unknown): Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const buildRequestSchema = () => [
  { key: "model", label: "model", type: "string", required: true, order: 1 },
  { key: "messages", label: "messages", type: "array_messages", required: true, order: 2 },
];

export default function ApiCalls() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [selectedVendorId, setSelectedVendorId] = useState(VENDOR_TEMPLATES[0].id);
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState(VENDOR_TEMPLATES[0].defaultModel);
  const [modelDraft, setModelDraft] = useState("");
  const [modelList, setModelList] = useState<string[]>(VENDOR_TEMPLATES[0].defaultModels);
  const [useOpenAiCompatible, setUseOpenAiCompatible] = useState(VENDOR_TEMPLATES[0].useLegacyOpenAiFormat);
  const [streamEnabled, setStreamEnabled] = useState(VENDOR_TEMPLATES[0].stream);
  const [includeMaxOutputTokens, setIncludeMaxOutputTokens] = useState(VENDOR_TEMPLATES[0].includeMaxOutputTokens);
  const [maxOutputTokens, setMaxOutputTokens] = useState(VENDOR_TEMPLATES[0].maxOutputTokens);
  const [reasoningEffort, setReasoningEffort] = useState<"low" | "medium" | "high">(VENDOR_TEMPLATES[0].reasoningEffort);
  const [thinkingEnabled, setThinkingEnabled] = useState(VENDOR_TEMPLATES[0].defaultThinkingEnabled);
  const [temperature, setTemperature] = useState(VENDOR_TEMPLATES[0].defaultTemperature);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [saveHistory, setSaveHistory] = useState(true);
  const [result, setResult] = useState<InvokeResult | null>(null);
  const selectedTemplate = useMemo(
    () => VENDOR_TEMPLATES.find((item) => item.id === selectedVendorId) ?? VENDOR_TEMPLATES[0],
    [selectedVendorId],
  );

  const providersQuery = useQuery({
    queryKey: ["api-call-providers", "simple-vendors"],
    queryFn: async () => {
      const vendorIds = VENDOR_TEMPLATES.map((item) => item.id);
      const { data, error } = await supabase
        .from("api_call_providers")
        .select("*")
        .in("vendor_id", vendorIds)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as ApiProvider[];
    },
    enabled: Boolean(user),
  });

  const providers = useMemo(() => providersQuery.data ?? [], [providersQuery.data]);
  const selectedProvider = useMemo(() => {
    const vendorProviders = providers.filter((item) => item.vendor_id === selectedVendorId);
    if (vendorProviders.length === 0) return null;
    return vendorProviders.find((item) => item.id === selectedProviderId) ?? vendorProviders[0];
  }, [providers, selectedProviderId, selectedVendorId]);

  const historyQuery = useQuery({
    queryKey: ["api-call-history", selectedProviderId],
    queryFn: async () => {
      if (!selectedProviderId) return [] as ApiHistory[];
      const { data, error } = await supabase
        .from("api_call_history")
        .select("*")
        .eq("provider_id", selectedProviderId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as ApiHistory[];
    },
    enabled: Boolean(user && selectedProviderId),
  });

  useEffect(() => {
    const vendorProviders = providers.filter((item) => item.vendor_id === selectedVendorId);
    const exists = vendorProviders.some((item) => item.id === selectedProviderId);
    if (!exists) {
      setSelectedProviderId(vendorProviders[0]?.id ?? "");
    }
  }, [providers, selectedProviderId, selectedVendorId]);

  useEffect(() => {
    if (!providersQuery.error) return;
    toast({
      title: t("apiCalls.providerLoadFailed"),
      description: getErrorMessage(providersQuery.error),
      variant: "destructive",
    });
  }, [providersQuery.error, t]);

  useEffect(() => {
    if (!historyQuery.error) return;
    toast({
      title: t("apiCalls.historyLoadFailed"),
      description: getErrorMessage(historyQuery.error),
      variant: "destructive",
    });
  }, [historyQuery.error, t]);

  useEffect(() => {
    if (selectedProvider) {
      setApiKey(selectedProvider.api_key || "");
      const defaults = toObject(selectedProvider.defaults);
      const defaultModel =
        typeof defaults.model === "string" && defaults.model.trim()
          ? defaults.model.trim()
          : selectedTemplate.defaultModel;
      const nextModelList = normalizeModelList(selectedProvider.favorite_models, [defaultModel, ...selectedTemplate.defaultModels]);
      setModelList(nextModelList.length > 0 ? nextModelList : [selectedTemplate.defaultModel]);
      setSelectedModel(defaultModel);
      setUseOpenAiCompatible(
        typeof defaults.use_openai_compatible === "boolean"
          ? defaults.use_openai_compatible
          : selectedTemplate.useLegacyOpenAiFormat,
      );
      setStreamEnabled(typeof defaults.stream === "boolean" ? defaults.stream : selectedTemplate.stream);
      setIncludeMaxOutputTokens(
        typeof defaults.include_max_output_tokens === "boolean"
          ? defaults.include_max_output_tokens
          : selectedTemplate.includeMaxOutputTokens,
      );
      setMaxOutputTokens(
        typeof defaults.max_tokens === "number" && Number.isFinite(defaults.max_tokens)
          ? Math.max(1, Math.floor(defaults.max_tokens))
          : selectedTemplate.maxOutputTokens,
      );
      setTemperature(
        typeof defaults.temperature === "number" && Number.isFinite(defaults.temperature)
          ? defaults.temperature
          : selectedTemplate.defaultTemperature,
      );
      const effort = defaults.reasoning_effort;
      setReasoningEffort(effort === "low" || effort === "high" || effort === "medium" ? effort : selectedTemplate.reasoningEffort);
      const thinking = toObject(defaults.thinking);
      const thinkingType = typeof thinking.type === "string" ? thinking.type : "";
      if (thinkingType === "enabled" || thinkingType === "disabled") {
        setThinkingEnabled(thinkingType === "enabled");
      } else if (typeof defaults.thinking_enabled === "boolean") {
        setThinkingEnabled(defaults.thinking_enabled);
      } else {
        setThinkingEnabled(selectedTemplate.defaultThinkingEnabled);
      }
      setMessages([]);
      setResult(null);
      return;
    }

    setApiKey("");
    setSelectedModel(selectedTemplate.defaultModel);
    setModelList(selectedTemplate.defaultModels);
    setUseOpenAiCompatible(selectedTemplate.useLegacyOpenAiFormat);
    setStreamEnabled(selectedTemplate.stream);
    setIncludeMaxOutputTokens(selectedTemplate.includeMaxOutputTokens);
    setMaxOutputTokens(selectedTemplate.maxOutputTokens);
    setReasoningEffort(selectedTemplate.reasoningEffort);
    setThinkingEnabled(selectedTemplate.defaultThinkingEnabled);
    setTemperature(selectedTemplate.defaultTemperature);
    setMessages([]);
    setResult(null);
  }, [selectedProvider, selectedTemplate]);

  const ensureProvider = async () => {
    if (!user) {
      throw new Error("missing user");
    }

    if (selectedProvider) {
      return selectedProvider;
    }

    const { data, error } = await supabase
      .from("api_call_providers")
      .insert({
        user_id: user.id,
        vendor_id: selectedTemplate.id,
        name: selectedTemplate.name,
        base_url: selectedTemplate.baseUrl,
        api_key: "",
        auth_mode: "bearer",
        auth_header_name: null,
        enabled: true,
        sort_order: providers.length,
        request_schema: buildRequestSchema() as unknown as Json,
        defaults: {
          model: selectedTemplate.defaultModel,
          path: selectedTemplate.path,
          use_openai_compatible: selectedTemplate.useLegacyOpenAiFormat,
          stream: selectedTemplate.stream,
          include_max_output_tokens: selectedTemplate.includeMaxOutputTokens,
          max_tokens: selectedTemplate.maxOutputTokens,
          reasoning_effort: selectedTemplate.reasoningEffort,
          temperature: selectedTemplate.defaultTemperature,
          thinking: { type: selectedTemplate.defaultThinkingEnabled ? "enabled" : "disabled" },
          thinking_enabled: selectedTemplate.defaultThinkingEnabled,
          messages: [],
        } as unknown as Json,
        favorite_models: selectedTemplate.defaultModels as unknown as Json,
        sample_snippets: {} as unknown as Json,
      })
      .select("*")
      .single();

    if (error) throw error;

    const created = data as ApiProvider;
    setSelectedProviderId(created.id);
    await queryClient.invalidateQueries({ queryKey: ["api-call-providers", "simple-vendors"] });
    toast({ title: t("apiCalls.providerCreated") });
    return created;
  };

  const persistConfig = async (
    provider: ApiProvider,
    nextModelList: string[],
    nextModel: string,
    nextApiKey: string,
  ) => {
    const { error } = await supabase
      .from("api_call_providers")
      .update({
        name: selectedTemplate.name,
        base_url: selectedTemplate.baseUrl,
        api_key: nextApiKey,
        auth_mode: "bearer",
        auth_header_name: null,
        enabled: true,
        request_schema: buildRequestSchema() as unknown as Json,
        defaults: {
          model: nextModel,
          path: selectedTemplate.path,
          use_openai_compatible: useOpenAiCompatible,
          stream: streamEnabled,
          include_max_output_tokens: includeMaxOutputTokens,
          max_tokens: includeMaxOutputTokens ? maxOutputTokens : null,
          reasoning_effort: reasoningEffort,
          temperature: selectedTemplate.supportsTemperature ? temperature : null,
          thinking: { type: thinkingEnabled ? "enabled" : "disabled" },
          thinking_enabled: thinkingEnabled,
          messages: [],
        } as unknown as Json,
        favorite_models: nextModelList as unknown as Json,
      })
      .eq("id", provider.id);

    if (error) throw error;
  };

  const saveConfig = useMutation({
    mutationFn: async () => {
      const model = selectedModel.trim();
      if (!model) {
        throw new Error(t("apiCalls.modelRequired"));
      }
      const normalizedKey = normalizeApiKey(apiKey);
      if (normalizedKey !== apiKey) {
        setApiKey(normalizedKey);
      }

      const provider = await ensureProvider();
      const nextModelList = normalizeModelList([...modelList, model], selectedTemplate.defaultModels);
      await persistConfig(provider, nextModelList, model, normalizedKey);
      return { nextModelList, model };
    },
    onSuccess: ({ nextModelList, model }) => {
      setModelList(nextModelList);
      setSelectedModel(model);
      queryClient.invalidateQueries({ queryKey: ["api-call-providers", "simple-vendors"] });
      toast({ title: t("apiCalls.providerSaved") });
    },
    onError: (error) => {
      toast({ title: t("apiCalls.providerSaveFailed"), description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const sendPrompt = useMutation({
    mutationFn: async () => {
      const content = prompt.trim();
      if (!content) {
        throw new Error(t("apiCalls.promptRequired"));
      }

      const normalizedKey = normalizeApiKey(apiKey);
      if (!normalizedKey) {
        throw new Error(t("apiCalls.apiKeyRequired"));
      }
      if (normalizedKey !== apiKey) {
        setApiKey(normalizedKey);
      }

      const model = selectedModel.trim();
      if (!model) {
        throw new Error(t("apiCalls.modelRequired"));
      }

      const provider = await ensureProvider();
      const nextModelList = normalizeModelList([...modelList, model], selectedTemplate.defaultModels);
      await persistConfig(provider, nextModelList, model, normalizedKey);

      const nextMessages = buildChatMessages(messages, content);
      const payload =
        selectedTemplate.id === "baishan"
          ? ({
              model,
              messages: nextMessages.map((message) => ({
                role: message.role,
                content: message.content,
              })),
            } as Record<string, unknown>)
          : useOpenAiCompatible
            ? buildOpenAiCompatiblePayload({
                model,
                messages: nextMessages,
                stream: streamEnabled,
                includeMaxOutputTokens,
                maxOutputTokens,
                reasoningEffort: selectedTemplate.reasoningMode === "effort" ? reasoningEffort : null,
                temperature: selectedTemplate.supportsTemperature ? temperature : null,
                thinkingType: selectedTemplate.reasoningMode === "thinking" ? (thinkingEnabled ? "enabled" : "disabled") : null,
              })
            : ({
                model,
                messages: nextMessages,
                stream: streamEnabled,
                ...(selectedTemplate.supportsTemperature ? { temperature } : {}),
                ...(selectedTemplate.reasoningMode === "thinking" ? { thinking: { type: thinkingEnabled ? "enabled" : "disabled" } } : {}),
                ...(includeMaxOutputTokens ? { max_tokens: maxOutputTokens } : {}),
                ...(selectedTemplate.reasoningMode === "effort" ? { reasoning_effort: reasoningEffort } : {}),
              } as Record<string, unknown>);

      const invokeBody = {
        provider_id: provider.id,
        mode: "chat",
        payload,
        save_history: saveHistory,
      };

      const invokeWithToken = async (accessToken: string) =>
        supabase.functions.invoke("invoke-model-api", {
          body: invokeBody,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

      const { data: currentSessionData, error: currentSessionError } = await supabase.auth.getSession();
      if (currentSessionError) {
        throw currentSessionError;
      }

      let accessToken = currentSessionData.session?.access_token;
      if (!accessToken) {
        const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
        if (refreshedError || !refreshedData.session?.access_token) {
          await supabase.auth.signOut();
          throw new Error("登录状态已失效，请重新登录后再试");
        }
        accessToken = refreshedData.session.access_token;
      }

      let { data, error } = await invokeWithToken(accessToken);

      if (error) {
        const firstErrorMessage = await getDetailedErrorMessage(error);
        const shouldRetryByRefresh = /登录状态已失效|invalid jwt|unauthorized/i.test(firstErrorMessage);

        if (!shouldRetryByRefresh) {
          throw new Error(firstErrorMessage);
        }

        const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
        if (refreshedError || !refreshedData.session?.access_token) {
          await supabase.auth.signOut();
          throw new Error("登录状态已失效，请重新登录后再试");
        }

        const retryResult = await invokeWithToken(refreshedData.session.access_token);
        data = retryResult.data;
        error = retryResult.error;

        if (error) {
          throw new Error(await getDetailedErrorMessage(error));
        }
      }

      return {
        nextMessages,
        nextModelList,
        data: (data ?? {}) as InvokeResult,
      };
    },
    onSuccess: ({ nextMessages, nextModelList, data }) => {
      const assistantText = parseAssistantText(data) || t("apiCalls.emptyResponse");
      setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
      setModelList(nextModelList);
      setPrompt("");
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["api-call-history", selectedProviderId] });
      queryClient.invalidateQueries({ queryKey: ["api-call-providers", "simple-vendors"] });
    },
    onError: (error) => {
      toast({ title: t("apiCalls.invokeFailed"), description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const addModel = () => {
    const model = modelDraft.trim();
    if (!model) return;

    const next = normalizeModelList([...modelList, model], selectedTemplate.defaultModels);
    setModelList(next);
    setSelectedModel(model);
    setModelDraft("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{t("apiCalls.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("apiCalls.simpleSubtitle")}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("apiCalls.templateTitle")}</CardTitle>
            <CardDescription>{t("apiCalls.autoCreateHint")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label>{t("apiCalls.vendor")}</Label>
              <Select value={selectedVendorId} onValueChange={setSelectedVendorId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VENDOR_TEMPLATES.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>{t("apiCalls.endpoint")}</Label>
              <Input value={`${selectedTemplate.baseUrl}${selectedTemplate.path}`} readOnly />
            </div>

            <div className="space-y-1">
              <Label>{t("apiCalls.apiKey")}</Label>
              <div className="relative">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                  onClick={() => setShowApiKey((prev) => !prev)}
                  aria-label={showApiKey ? "Hide API key" : "Show API key"}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label>{t("apiCalls.currentModel")}</Label>
              <Input value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} placeholder={selectedTemplate.defaultModel} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between rounded border p-2">
                <Label>{t("apiCalls.legacyFormat")}</Label>
                <Switch checked={useOpenAiCompatible} onCheckedChange={setUseOpenAiCompatible} />
              </div>
              <div className="space-y-1">
                <Label>{t("apiCalls.contextWindowSize")}</Label>
                <Input value={String(selectedTemplate.contextWindowSize)} readOnly />
              </div>
            </div>

            <div className="flex items-center justify-between rounded border p-2">
              <Label>{t("apiCalls.enableStreaming")}</Label>
              <Switch checked={streamEnabled} onCheckedChange={setStreamEnabled} />
            </div>

            <div className="flex items-center justify-between rounded border p-2">
              <Label>{t("apiCalls.includeMaxOutputTokens")}</Label>
              <Switch checked={includeMaxOutputTokens} onCheckedChange={setIncludeMaxOutputTokens} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label>{t("apiCalls.maxOutputTokens")}</Label>
                <Input
                  type="number"
                  min={1}
                  value={String(maxOutputTokens)}
                  onChange={(e) => setMaxOutputTokens(Math.max(1, Number(e.target.value) || selectedTemplate.maxOutputTokens))}
                  disabled={!includeMaxOutputTokens}
                />
              </div>
              {selectedTemplate.reasoningMode === "effort" ? (
                <div className="space-y-1">
                  <Label>{t("apiCalls.reasoningEffort")}</Label>
                  <Select value={reasoningEffort} onValueChange={(value) => setReasoningEffort(value as "low" | "medium" | "high")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded border p-2">
                  <Label>{t("apiCalls.enableThinking")}</Label>
                  <Switch checked={thinkingEnabled} onCheckedChange={setThinkingEnabled} />
                </div>
              )}
            </div>

            {selectedTemplate.supportsTemperature && (
              <div className="space-y-1">
                <Label>{t("apiCalls.temperature")}</Label>
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  max={2}
                  value={String(temperature)}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!Number.isFinite(value)) return;
                    setTemperature(Math.max(0, Math.min(2, value)));
                  }}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>{t("apiCalls.savedModels")}</Label>
              <div className="flex flex-wrap gap-2">
                {modelList.map((model) => (
                  <Button
                    key={model}
                    type="button"
                    size="sm"
                    variant={model === selectedModel ? "default" : "outline"}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Input value={modelDraft} onChange={(e) => setModelDraft(e.target.value)} placeholder={t("apiCalls.newModel")} />
              <Button type="button" variant="outline" onClick={addModel}>
                <Plus className="mr-1 h-4 w-4" />
                {t("apiCalls.addModel")}
              </Button>
            </div>

            <Button onClick={() => saveConfig.mutate()} disabled={saveConfig.isPending}>
              {saveConfig.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {t("apiCalls.saveProvider")}
            </Button>
          </CardContent>
        </Card>

        <Card className="xl:col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("apiCalls.chatWindow")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-[420px] overflow-y-auto rounded-md border p-3">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("apiCalls.chatEmpty")}</p>
              ) : (
                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
                        message.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="mb-1 text-[10px] uppercase opacity-70">{message.role}</div>
                      <div className="whitespace-pre-wrap break-words">{message.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("apiCalls.chatPlaceholder")}
              className="min-h-[96px]"
            />

            <div className="flex items-center justify-between rounded border p-2">
              <Label>{t("apiCalls.saveHistory")}</Label>
              <Switch checked={saveHistory} onCheckedChange={setSaveHistory} />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-muted-foreground">
                {t("apiCalls.status")}: {result?.status ?? "-"} · {t("apiCalls.latency")}: {result?.latency_ms ?? "-"}ms
              </div>
              <Button onClick={() => sendPrompt.mutate()} disabled={sendPrompt.isPending || !prompt.trim()}>
                {sendPrompt.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {t("apiCalls.send")}
              </Button>
            </div>

            {historyQuery.data && historyQuery.data.length > 0 && (
              <div className="rounded border p-2 text-xs text-muted-foreground">
                <p className="mb-1 font-medium text-foreground">{t("apiCalls.recentHistory")}</p>
                <div className="space-y-1">
                  {historyQuery.data.map((item) => (
                    <div key={item.id}>
                      {item.selected_model || "-"} · {item.response_status || "-"} · {new Date(item.created_at).toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
