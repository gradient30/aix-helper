import { useState, useEffect } from "react";
import { CreditCard, Loader2, ChevronDown, AlertCircle, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "kimi-api-key";

interface UsageData {
  user?: {
    userId?: string;
    region?: string;
    membership?: string | object;
    businessId?: string;
  };
  usage?: {
    limit?: string | number;
    used?: string | number;
    remaining?: string | number;
    resetTime?: string;
  };
  limits?: Array<{
    type?: string;
    window?: string | object;
    detail?: {
      limit?: string | number;
      used?: string | number;
      remaining?: string | number;
      resetTime?: string;
    };
  }>;
  parallel?: {
    limit?: number;
    used?: number;
  };
  [key: string]: unknown;
}

function formatNumber(num: string | number | undefined): string {
  if (num === undefined || num === null) return "0";
  const n = typeof num === "string" ? parseInt(num, 10) : num;
  if (isNaN(n)) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString("zh-CN");
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeUntil(dateStr: string | undefined): string {
  if (!dateStr) return "-";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "已重置";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}天${hours}小时`;
  return `${hours}小时`;
}

export function KimiUsageQuery() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UsageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedKey(stored);
      setApiKey(stored);
    }
  }, []);

  const saveKey = () => {
    if (apiKey.trim()) {
      sessionStorage.setItem(STORAGE_KEY, apiKey.trim());
      setSavedKey(apiKey.trim());
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      setSavedKey("");
    }
  };

  const queryUsage = async () => {
    if (!apiKey.trim()) {
      setError("请输入 API Key");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      setError("Supabase 未配置，请在环境变量中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_PUBLISHABLE_KEY");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    try {
      const getAccessTokenOrThrow = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (sessionData.session?.access_token) return sessionData.session.access_token;

        const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
        if (refreshedError || !refreshedData.session?.access_token) {
          await supabase.auth.signOut();
          throw new Error("登录状态已失效，请重新登录后再试");
        }

        return refreshedData.session.access_token;
      };

      const requestUsage = async (accessToken: string) =>
        fetch(`${supabaseUrl}/functions/v1/kimi-usage`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            apiKey: apiKey.trim(),
            access_token: accessToken,
          }),
        });

      let accessToken = await getAccessTokenOrThrow();
      let response = await requestUsage(accessToken);
      let result = await response.json().catch(() => null);

      if (response.status === 401) {
        const { data: refreshedData, error: refreshedError } = await supabase.auth.refreshSession();
        if (refreshedError || !refreshedData.session?.access_token) {
          await supabase.auth.signOut();
          throw new Error("登录状态已失效，请重新登录后再试");
        }

        accessToken = refreshedData.session.access_token;
        response = await requestUsage(accessToken);
        result = await response.json().catch(() => null);
      }

      if (!response.ok) {
        const message = result?.error || result?.message || "未知错误";
        if (/invalid jwt|unauthorized|认证失败|未授权/i.test(String(message))) {
          await supabase.auth.signOut();
          throw new Error("登录状态已失效，请重新登录后再试");
        }
        throw new Error(`请求失败 (${response.status}): ${message}`);
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请检查网络连接");
    } finally {
      setLoading(false);
    }
  };

  const clearKey = () => {
    setApiKey("");
    setSavedKey("");
    sessionStorage.removeItem(STORAGE_KEY);
    setData(null);
    setError(null);
  };

  const parseValue = (val: unknown): number => {
    if (val === undefined || val === null) return 0;
    const parsed = parseInt(String(val), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const getGlobalQuota = () => {
    if (!data?.usage || !data.usage.limit) return null;
    const limit = parseValue(data.usage.limit);
    const used = parseValue(data.usage.used);
    const remaining = parseValue(data.usage.remaining) || Math.max(limit - used, 0);
    return {
      limit,
      used,
      remaining,
      percent: limit > 0 ? (used / limit) * 100 : 0,
      resetTime: data.usage.resetTime,
    };
  };

  const getPersonalQuota = () => {
    const detail = data?.limits?.[0]?.detail;
    if (!detail) return null;
    const limit = parseValue(detail.limit);
    const used = parseValue(detail.used);
    const remaining = parseValue(detail.remaining) || Math.max(limit - used, 0);
    return {
      limit,
      used,
      remaining,
      percent: limit > 0 ? (used / limit) * 100 : 0,
      resetTime: detail.resetTime,
    };
  };

  const globalQuota = getGlobalQuota();
  const personalQuota = getPersonalQuota();

  const healthGood = (() => {
    const quotas: number[] = [];
    if (personalQuota) quotas.push(personalQuota.percent);
    if (globalQuota) quotas.push(globalQuota.percent);
    if (quotas.length === 0) return null;
    return quotas.every((p) => p < 80);
  })();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <CreditCard className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">额度</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-3 border-b">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-md border bg-muted">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <DialogTitle className="text-sm">Kimi 额度查询</DialogTitle>
                <DialogDescription className="text-[10px] text-muted-foreground">
                  通过 Supabase Edge Function 代理查询 Kimi 额度，避免前端直连暴露请求链路。
                </DialogDescription>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => setShowConfig((value) => !value)}
            >
              <Settings className="h-3.5 w-3.5" />
              配置
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 space-y-4 py-4">
          {showConfig && (
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs space-y-2">
              <p className="font-medium text-foreground">运行要求</p>
              <p className="text-muted-foreground">
                前端环境变量：<code>VITE_SUPABASE_URL</code>、<code>VITE_SUPABASE_PUBLISHABLE_KEY</code>
              </p>
              <p className="text-muted-foreground">
                deploy kimi-usage Edge Function：<code>supabase functions deploy kimi-usage</code>
              </p>
              <p className="text-muted-foreground">
                API Key 仅缓存到当前浏览器会话；关闭浏览器后需要重新填入，避免长期落盘到本地存储。
              </p>
              <p className="text-muted-foreground">
                若持续出现 401，请重新登录后再试；当前查询会在一次 401 后自动刷新登录态并重试。
              </p>
            </div>
          )}

          {/* API Key Input */}
          <div className="p-3 border-l-2 border-primary bg-muted/50 rounded-r">
            <label className="block text-[10px] uppercase tracking-wider mb-2 text-muted-foreground">
              API Key
            </label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-kimi-..."
                className="flex-1 text-xs"
                onKeyDown={(e) => e.key === "Enter" && queryUsage()}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={saveKey}
                disabled={!apiKey.trim()}
                className="text-[10px]"
              >
                保存
              </Button>
              <Button
                size="sm"
                onClick={queryUsage}
                disabled={loading || !apiKey.trim()}
                className="text-[10px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    查询中
                  </>
                ) : (
                  "查询"
                )}
              </Button>
            </div>

            {savedKey && (
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] border-green-500 text-green-600 dark:text-green-400">
                  已保存
                </Badge>
                <button
                  onClick={clearKey}
                  className="text-[10px] text-primary hover:underline"
                >
                  清除
                </button>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 border-l-2 border-destructive bg-destructive/10 rounded-r flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Quota Display */}
          {data && (personalQuota || globalQuota) && (
            <div className="space-y-3">
              {/* Personal Quota */}
              {personalQuota && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="px-3 py-2 border-b bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        个人Key额度
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        personalQuota.percent >= 80
                          ? "border-destructive text-destructive"
                          : "border-green-500 text-green-600 dark:text-green-400"
                      }`}
                    >
                      {personalQuota.percent >= 80 ? "即将用完" : "正常"}
                    </Badge>
                  </div>

                  <div className="p-3">
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-4xl font-light text-foreground">
                        {formatNumber(personalQuota.remaining)}
                      </span>
                      <span className="text-xs mb-1 text-muted-foreground">
                        / {formatNumber(personalQuota.limit)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-[10px] mb-0.5 text-muted-foreground">已使用</div>
                        <div className="text-base">{formatNumber(personalQuota.used)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] mb-0.5 text-muted-foreground">使用率</div>
                        <div
                          className={`text-base ${
                            personalQuota.percent >= 80
                              ? "text-destructive"
                              : "text-primary"
                          }`}
                        >
                          {personalQuota.percent.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="h-1 mb-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          personalQuota.percent >= 80 ? "bg-destructive" : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(personalQuota.percent, 100)}%` }}
                      />
                    </div>

                    <div className="pt-2 border-t flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-muted-foreground">重置时间</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(personalQuota.resetTime)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-muted-foreground">剩余</div>
                        <div className="text-xs text-primary">
                          {getTimeUntil(personalQuota.resetTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Global Quota */}
              {globalQuota && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          全局周限制
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-light text-muted-foreground">
                        {formatNumber(globalQuota.remaining)}
                      </span>
                      <span className="text-xs mb-0.5 text-muted-foreground">
                        / {formatNumber(globalQuota.limit)}
                      </span>
                    </div>

                    <div className="h-1 mb-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-muted-foreground rounded-full"
                        style={{ width: `${Math.min(globalQuota.percent, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>已用: {formatNumber(globalQuota.used)}</span>
                      <span>重置: {formatDate(globalQuota.resetTime)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Info, Concurrency, Health */}
              <div className="grid grid-cols-3 gap-2">
                {data.user && (
                  <div className="p-2 border rounded-lg bg-muted/50">
                    <div className="text-[10px] mb-1.5 text-muted-foreground">账户信息</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">ID</span>
                        <span className="text-muted-foreground">
                          {String(data.user.userId || "").slice(0, 6)}...
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">地区</span>
                        <span className="text-muted-foreground">
                          {data.user.region === "REGION_CN" ? "CN" : data.user.region}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-2 border rounded-lg bg-muted/50">
                  <div className="text-[10px] mb-1.5 text-muted-foreground">并发限制</div>
                  {data.parallel ? (
                    <div className="flex gap-2">
                      <div className="flex-1 text-center py-1 bg-background rounded">
                        <div className="text-sm">{data.parallel.limit || 0}</div>
                        <div className="text-[10px] text-muted-foreground">最大</div>
                      </div>
                      <div className="flex-1 text-center py-1 bg-background rounded">
                        <div
                          className={`text-sm ${
                            (data.parallel.used || 0) >= (data.parallel.limit || 0) * 0.8
                              ? "text-destructive"
                              : ""
                          }`}
                        >
                          {data.parallel.used || 0}
                        </div>
                        <div className="text-[10px] text-muted-foreground">当前</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-center py-2 text-muted-foreground">无数据</div>
                  )}
                </div>

                <div className="p-2 border rounded-lg bg-muted/50">
                  <div className="text-[10px] mb-1.5 text-muted-foreground">健康度</div>
                  {healthGood !== null ? (
                    <>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] text-muted-foreground">状态</span>
                        <span
                          className={`text-[10px] ${
                            healthGood ? "text-green-600 dark:text-green-400" : "text-destructive"
                          }`}
                        >
                          {healthGood ? "良好" : "注意"}
                        </span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${
                              100 - Math.max(personalQuota?.percent ?? 0, globalQuota?.percent ?? 0)
                            }%`,
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-[10px] text-center py-2 text-muted-foreground">未知</div>
                  )}
                </div>
              </div>

              {/* Raw Data */}
              <details className="border rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between px-3 py-2 cursor-pointer bg-muted/50">
                  <span className="text-[10px] text-muted-foreground">原始数据</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </summary>
                <pre className="p-3 text-[10px] overflow-auto max-h-48 bg-background text-muted-foreground font-mono">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
