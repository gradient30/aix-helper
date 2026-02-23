import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronsUpDown, Copy, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SETUP_BADGE_LABELS, SETUP_GUIDE_TOOLS } from "@/config/docs-catalog/setup";
import type { GuideContentItem, SetupGuideTool } from "@/config/docs-catalog/types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={handleCopy}>
      {copied ? <span className="text-[10px] text-emerald-600">OK</span> : <Copy className="h-3 w-3 text-muted-foreground" />}
    </Button>
  );
}

function SupportBadge({ level }: { level: "official" | "unsupported" }) {
  if (level === "official") {
    return <Badge variant="outline" className="text-[10px] h-5 bg-emerald-500/10 text-emerald-700 border-emerald-500/30">official</Badge>;
  }
  return <Badge variant="outline" className="text-[10px] h-5 bg-yellow-500/10 text-yellow-700 border-yellow-500/30">unsupported</Badge>;
}

function ItemRow({ item }: { item: GuideContentItem }) {
  return (
    <div className="px-4 py-3 space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-foreground">{item.title}</span>
            {item.badge && (
              <Badge variant="outline" className={`text-[10px] h-5 ${SETUP_BADGE_LABELS[item.badge]?.className ?? ""}`}>
                {SETUP_BADGE_LABELS[item.badge]?.label}
              </Badge>
            )}
            <SupportBadge level={item.support_level} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">{item.description}</p>
        </div>
      </div>

      {item.code && (
        <div className="relative rounded-md bg-muted/60 dark:bg-muted/30 border border-border">
          <div className="absolute right-1 top-1">
            <CopyButton text={item.code} />
          </div>
          <pre className="p-3 pr-10 text-xs font-mono text-foreground overflow-x-auto whitespace-pre">{item.code}</pre>
        </div>
      )}

      {item.table && (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {item.table.headers.map((h) => (
                  <TableHead key={h} className="text-xs h-8">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.table.rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j} className="text-xs py-1.5">{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function GroupSection({
  group,
  defaultOpen,
}: {
  group: SetupGuideTool["groups"][number];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = group.icon;

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
      >
        <Icon className="h-4 w-4 text-primary shrink-0" />
        <span className="font-medium text-sm text-foreground">{group.category}</span>
        <Badge variant="secondary" className="ml-auto text-[10px] h-5">{group.items.length}</Badge>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="border-t border-border divide-y divide-border/50">
          {group.items.map((item) => (
            <ItemRow key={item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SetupGuide() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("claude");
  const [allExpanded, setAllExpanded] = useState(false);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return SETUP_GUIDE_TOOLS;
    const q = search.toLowerCase();

    return SETUP_GUIDE_TOOLS.map((tool) => ({
      ...tool,
      groups: tool.groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.code?.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0),
    }));
  }, [search]);

  const activeTool = filteredTools.find((tool) => tool.id === activeTab) ?? filteredTools[0];
  const originalTool = SETUP_GUIDE_TOOLS.find((tool) => tool.id === activeTab)!;
  const totalItems = originalTool.groups.reduce((sum, g) => sum + g.items.length, 0);
  const filteredItems = activeTool?.groups.reduce((sum, g) => sum + g.items.length, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("setupGuide.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("setupGuide.subtitle")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearch(""); }}>
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1">
          {SETUP_GUIDE_TOOLS.map((tool) => (
            <TabsTrigger key={tool.id} value={tool.id} className="capitalize text-sm py-2.5">{tool.name}</TabsTrigger>
          ))}
        </TabsList>

        {filteredTools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="mt-4 space-y-4">
            <Card className="p-4 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={tool.official_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("setupGuide.officialDocs")}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{tool.official_url}</TooltipContent>
                </Tooltip>
                <SupportBadge level={tool.support_level} />
                <Badge variant="outline" className="text-[10px]">last_verified_at: {tool.verification.last_verified_at}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">source: {tool.verification.source_url}</p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Input
                placeholder={t("setupGuide.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:max-w-xs"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setAllExpanded((v) => !v)}>
                  {allExpanded ? t("setupGuide.collapseAll") : t("setupGuide.expandAll")}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {search.trim()
                    ? `${t("setupGuide.showing")} ${filteredItems} / ${totalItems} ${t("setupGuide.items")}`
                    : `${t("setupGuide.total")} ${totalItems} ${t("setupGuide.items")}`}
                </span>
              </div>
            </div>

            {tool.groups.length > 0 ? (
              <div className="space-y-3">
                {tool.groups.map((group) => (
                  <GroupSection
                    key={`${group.category}-${allExpanded ? "open" : "closed"}`}
                    group={group}
                    defaultOpen={allExpanded}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center text-sm text-muted-foreground">{t("setupGuide.noResults")}</Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
