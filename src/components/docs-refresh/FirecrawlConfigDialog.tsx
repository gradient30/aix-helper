import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FirecrawlSettings } from "@/features/docs-refresh/api";
import { KeyRound, ShieldCheck, Trash2 } from "lucide-react";

type FirecrawlConfigDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: FirecrawlSettings;
  onSave: (firecrawlKey: string) => void;
  onClear: () => void;
  isSaving?: boolean;
  isClearing?: boolean;
};

function formatTimestamp(value: string | null): string {
  if (!value) return "未验证";
  return new Date(value).toLocaleString("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FirecrawlConfigDialog({
  open,
  onOpenChange,
  settings,
  onSave,
  onClear,
  isSaving,
  isClearing,
}: FirecrawlConfigDialogProps) {
  const [draftKey, setDraftKey] = useState("");

  useEffect(() => {
    if (open) {
      setDraftKey("");
    }
  }, [open]);

  const saveDisabled = isSaving || !draftKey.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Firecrawl 配置
          </DialogTitle>
          <DialogDescription>
            在这里手动保存你的 Firecrawl API Key。系统只显示掩码，不会在界面回显明文。
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={settings.firecrawlConfigured ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700" : ""}>
              {settings.firecrawlConfigured ? "已配置" : "未配置"}
            </Badge>
            {settings.firecrawlKeyMask && (
              <Badge variant="outline" className="font-mono text-[11px]">
                {settings.firecrawlKeyMask}
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            最近验证时间：{formatTimestamp(settings.firecrawlLastVerifiedAt)}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="firecrawl-api-key">Firecrawl API Key</Label>
            <Input
              id="firecrawl-api-key"
              type="password"
              placeholder="fc-..."
              value={draftKey}
              onChange={(event) => setDraftKey(event.target.value)}
            />
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-xs text-muted-foreground">
            保存后将用于当前登录用户的手动抓取流程。建议先保存，再到文档页执行 Firecrawl 刷新。
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            disabled={isClearing || !settings.firecrawlConfigured}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            清除配置
          </Button>
          <Button
            type="button"
            onClick={() => onSave(draftKey.trim())}
            disabled={saveDisabled}
            className="gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            保存 Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
