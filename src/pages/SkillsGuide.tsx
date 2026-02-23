import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import { ChevronDown, ChevronRight, ChevronsUpDown, Download, ExternalLink, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SKILLS_BADGE_LABELS, SKILLS_GUIDE_TOOLS } from "@/config/docs-catalog/skills";
import type { GuideContentItem, SkillsGuideTool } from "@/config/docs-catalog/types";

function SupportBadge({ level }: { level: "official" | "unsupported" }) {
  if (level === "official") {
    return <Badge variant="outline" className="text-[10px] h-5 bg-emerald-500/10 text-emerald-700 border-emerald-500/30">official</Badge>;
  }
  return <Badge variant="outline" className="text-[10px] h-5 bg-yellow-500/10 text-yellow-700 border-yellow-500/30">unsupported</Badge>;
}

function SkillItemRow({ item }: { item: GuideContentItem }) {
  const [open, setOpen] = useState(false);
  const expandable = !!(item.code || item.table);

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

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium text-sm text-foreground">{item.title}</span>
            {item.badge && (
              <Badge variant="outline" className={`shrink-0 text-[10px] px-1.5 py-0 h-5 ${SKILLS_BADGE_LABELS[item.badge]?.className ?? ""}`}>
                {SKILLS_BADGE_LABELS[item.badge]?.label}
              </Badge>
            )}
            <SupportBadge level={item.support_level} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
        </div>
      </div>

      {open && (
        <div className="ml-10 mb-2 space-y-2">
          {item.code && (
            <div className="rounded-md bg-muted/50 border border-border px-3 py-2 overflow-x-auto">
              <pre className="text-xs font-mono text-foreground whitespace-pre">{item.code}</pre>
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
                  {item.table.rows.map((row, idx) => (
                    <TableRow key={`${row[0]}-${idx}`}>
                      {row.map((cell, j) => (
                        <TableCell key={`${cell}-${j}`} className="text-xs py-1.5">{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GroupSection({
  group,
  defaultOpen,
}: {
  group: SkillsGuideTool["groups"][number];
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
            <SkillItemRow key={item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SkillsGuide() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("claude");
  const [allExpanded, setAllExpanded] = useState(false);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return SKILLS_GUIDE_TOOLS;
    const q = search.toLowerCase();
    return SKILLS_GUIDE_TOOLS.map((tool) => ({
      ...tool,
      groups: tool.groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0),
    }));
  }, [search]);

  const activeTool = filteredTools.find((tool) => tool.id === activeTab) ?? filteredTools[0];
  const originalTool = SKILLS_GUIDE_TOOLS.find((tool) => tool.id === activeTab)!;
  const totalItems = originalTool.groups.reduce((sum, g) => sum + g.items.length, 0);
  const filteredItems = activeTool?.groups.reduce((sum, g) => sum + g.items.length, 0) ?? 0;

  const exportTemplate = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, filename);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("skillsGuide.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("skillsGuide.subtitle")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearch(""); }}>
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1">
          {SKILLS_GUIDE_TOOLS.map((tool) => (
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
                      {t("skillsGuide.officialDocs")}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{tool.official_url}</TooltipContent>
                </Tooltip>
                <SupportBadge level={tool.support_level} />
                <Badge variant="outline" className="text-[10px]">last_verified_at: {tool.verification.last_verified_at}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">source: {tool.verification.source_url}</p>
              {tool.support_level === "unsupported" && (
                <p className="text-xs text-yellow-700 bg-yellow-500/10 border border-yellow-500/30 rounded px-2 py-1 inline-flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  当前无官方稳定 Skills 命令体系，命令示例已下线。
                </p>
              )}
            </Card>

            {tool.templates.length > 0 && (
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {tool.templates.map((tpl) => (
                    <Button key={tpl.filename} variant="outline" size="sm" onClick={() => exportTemplate(tpl.filename, tpl.content)}>
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      {tpl.label}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Input
                placeholder={t("skillsGuide.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:max-w-xs"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setAllExpanded((v) => !v)}>
                  {allExpanded ? t("skillsGuide.collapseAll") : t("skillsGuide.expandAll")}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {search.trim()
                    ? `${t("skillsGuide.showing")} ${filteredItems} / ${totalItems} ${t("skillsGuide.items")}`
                    : `${t("skillsGuide.total")} ${totalItems} ${t("skillsGuide.items")}`}
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
              <Card className="p-10 text-center text-sm text-muted-foreground">{t("skillsGuide.noResults")}</Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
