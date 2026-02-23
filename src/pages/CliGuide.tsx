import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronRight, ChevronsUpDown, ExternalLink, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CLI_BADGE_LABELS, CLI_GUIDE_TOOLS } from "@/config/docs-catalog/cli";
import type { CliGuideTool, GuideCommand } from "@/config/docs-catalog/types";

function SupportBadge({ level }: { level: "official" | "unsupported" }) {
  if (level === "official") {
    return <Badge variant="outline" className="text-[10px] h-5 bg-emerald-500/10 text-emerald-700 border-emerald-500/30">official</Badge>;
  }
  return <Badge variant="outline" className="text-[10px] h-5 bg-yellow-500/10 text-yellow-700 border-yellow-500/30">unsupported</Badge>;
}

function CommandRow({ cmd }: { cmd: GuideCommand }) {
  const [open, setOpen] = useState(false);
  const hasSub = !!cmd.subcommands?.length;
  const hasUsage = !!cmd.usage;
  const expandable = hasSub || hasUsage;

  return (
    <div className="group">
      <div
        className={`flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors ${expandable ? "cursor-pointer hover:bg-muted/60" : ""}`}
        onClick={() => expandable && setOpen((v) => !v)}
      >
        {expandable ? (
          <span className="mt-1 shrink-0 text-muted-foreground">
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </span>
        ) : (
          <span className="mt-1 shrink-0 w-3.5" />
        )}
        <code className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-sm font-semibold text-foreground">
          {cmd.command}
        </code>
        {cmd.badge && (
          <Badge variant="outline" className={`shrink-0 text-[10px] px-1.5 py-0 h-5 ${CLI_BADGE_LABELS[cmd.badge]?.className ?? ""}`}>
            {CLI_BADGE_LABELS[cmd.badge]?.label}
          </Badge>
        )}
        <SupportBadge level={cmd.support_level} />
        <span className="text-sm text-muted-foreground leading-relaxed">{cmd.description}</span>
      </div>

      {open && (hasUsage || hasSub) && (
        <div className="ml-10 mb-2 space-y-1.5">
          {hasUsage && (
            <div className="rounded-md bg-muted/50 border border-border px-3 py-2">
              <span className="text-xs text-muted-foreground mr-2">用法示例：</span>
              <code className="text-xs font-mono text-foreground">{cmd.usage}</code>
            </div>
          )}
          {hasSub && cmd.subcommands!.map((sub) => (
            <div key={sub.command} className="flex items-start gap-2 px-3 py-1.5">
              <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{sub.command}</code>
              <span className="text-xs text-muted-foreground">{sub.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GroupSection({
  category,
  icon: Icon,
  commands,
  defaultOpen,
}: {
  category: string;
  icon: CliGuideTool["groups"][number]["icon"];
  commands: GuideCommand[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
      >
        <Icon className="h-4 w-4 text-primary shrink-0" />
        <span className="font-medium text-sm text-foreground">{category}</span>
        <Badge variant="secondary" className="ml-auto text-[10px] h-5">{commands.length}</Badge>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="border-t border-border divide-y divide-border/50">
          {commands.map((cmd) => (
            <CommandRow key={cmd.command} cmd={cmd} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CliGuide() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("claude");
  const [allExpanded, setAllExpanded] = useState(false);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return CLI_GUIDE_TOOLS;
    const q = search.toLowerCase();

    return CLI_GUIDE_TOOLS.map((tool) => ({
      ...tool,
      groups: tool.groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (c) =>
              c.command.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0),
    }));
  }, [search]);

  const activeTool = filteredTools.find((tool) => tool.id === activeTab) ?? filteredTools[0];
  const originalTool = CLI_GUIDE_TOOLS.find((tool) => tool.id === activeTab)!;

  const totalCommands = originalTool.groups.reduce((sum, g) => sum + g.items.length, 0);
  const filteredCommands = activeTool?.groups.reduce((sum, g) => sum + g.items.length, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("cliGuide.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("cliGuide.subtitle")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearch(""); }}>
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1">
          {CLI_GUIDE_TOOLS.map((tool) => (
            <TabsTrigger key={tool.id} value={tool.id} className="capitalize text-sm py-2.5">
              {tool.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredTools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={tool.official_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("cliGuide.officialDocs")}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{tool.official_url}</TooltipContent>
                </Tooltip>
                <SupportBadge level={tool.support_level} />
                <Badge variant="outline" className="text-[10px]">last_verified_at: {tool.verification.last_verified_at}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                source: {tool.verification.source_url}
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Input
                placeholder={t("cliGuide.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:max-w-xs"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setAllExpanded((v) => !v)}>
                  {allExpanded ? t("cliGuide.collapseAll") : t("cliGuide.expandAll")}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {search.trim()
                    ? `${t("cliGuide.showing")} ${filteredCommands} / ${totalCommands} ${t("cliGuide.commands")}`
                    : `${t("cliGuide.total")} ${totalCommands} ${t("cliGuide.commands")}`}
                </span>
              </div>
            </div>

            {tool.groups.length > 0 ? (
              <div className="space-y-3">
                {tool.groups.map((group) => (
                  <GroupSection
                    key={`${group.category}-${allExpanded ? "open" : "closed"}`}
                    category={group.category}
                    icon={group.icon}
                    commands={group.items}
                    defaultOpen={allExpanded}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldAlert className="h-4 w-4" />
                  {t("cliGuide.noResults")}
                </div>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
