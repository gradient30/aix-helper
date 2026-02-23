import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitFork,
  Link2,
  Search,
  Server,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AI_CONCEPTS,
  AI_PARADIGMS,
  AI_TECH_REPO_CATEGORIES,
  AI_TOP_REPOS_SNAPSHOT,
  type AiConceptItem,
  type AiConceptTabId,
  type AiRepoCategory,
} from "@/config/ai-tech-catalog";
import type { LucideIcon } from "lucide-react";

type MainTab = AiConceptTabId | "paradigms" | "top-repos";

const MAIN_TABS: MainTab[] = [
  "agent-system",
  "protocols",
  "methods",
  "models",
  "paradigms",
  "top-repos",
];

const TAB_TRANSLATION_KEYS: Record<MainTab, string> = {
  "agent-system": "aiGlossary.tabs.agentSystem",
  protocols: "aiGlossary.tabs.protocols",
  methods: "aiGlossary.tabs.methods",
  models: "aiGlossary.tabs.models",
  paradigms: "aiGlossary.tabs.paradigms",
  "top-repos": "aiGlossary.tabs.topRepos",
};

const CONCEPT_ICON: Record<string, LucideIcon> = {
  agent: Bot,
  "sub-agent": GitFork,
  skills: Wrench,
  mcp: Server,
  a2a: Link2,
  lsp: Wrench,
  rag: Search,
  workflow: Target,
  "eval-loop": Sparkles,
  "model-routing": BrainCircuit,
  "multimodal-reasoning": Sparkles,
  slm: Bot,
};

function levelBadge(level: "official" | "community") {
  if (level === "official") {
    return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30">official</Badge>;
  }
  return <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30">community</Badge>;
}

export default function AiGlossary() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "en" ? "en" : "zh";
  const [activeTab, setActiveTab] = useState<MainTab>("agent-system");
  const [activeRepoCategory, setActiveRepoCategory] = useState<AiRepoCategory>(AI_TECH_REPO_CATEGORIES[0].id);
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const conceptsByTab = useMemo(() => {
    const grouped: Record<AiConceptTabId, AiConceptItem[]> = {
      "agent-system": [],
      protocols: [],
      methods: [],
      models: [],
    };
    for (const item of AI_CONCEPTS) grouped[item.tab].push(item);
    return grouped;
  }, []);

  const filteredConcepts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conceptsByTab;
    const grouped: Record<AiConceptTabId, AiConceptItem[]> = {
      "agent-system": [],
      protocols: [],
      methods: [],
      models: [],
    };
    (Object.keys(conceptsByTab) as AiConceptTabId[]).forEach((tab) => {
      grouped[tab] = conceptsByTab[tab].filter((item) => {
        const inTitle = item.title[locale].toLowerCase().includes(q) || item.subtitle[locale].toLowerCase().includes(q);
        const inBody = item.sections.some((section) => section.content[locale].toLowerCase().includes(q));
        return inTitle || inBody;
      });
    });
    return grouped;
  }, [conceptsByTab, search, locale]);

  const filteredParadigms = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return AI_PARADIGMS;
    return AI_PARADIGMS.filter((item) =>
      item.title[locale].toLowerCase().includes(q) ||
      item.summary[locale].toLowerCase().includes(q) ||
      item.scenario[locale].toLowerCase().includes(q),
    );
  }, [search, locale]);

  const filteredTopRepos = useMemo(() => {
    const q = search.trim().toLowerCase();
    const records = AI_TOP_REPOS_SNAPSHOT.categories[activeRepoCategory];
    if (!q) return records;
    return records.filter((repo) =>
      repo.full_name.toLowerCase().includes(q) ||
      repo.recommendation_note[locale].toLowerCase().includes(q) ||
      repo.app_scenarios[locale].toLowerCase().includes(q),
    );
  }, [search, locale, activeRepoCategory]);

  const allConceptIds = useMemo(
    () => AI_CONCEPTS.map((item) => item.id),
    [],
  );

  const activeConceptCount = (activeTab === "agent-system" || activeTab === "protocols" || activeTab === "methods" || activeTab === "models")
    ? filteredConcepts[activeTab].length
    : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("aiGlossary.title")}</h1>
        <p className="text-muted-foreground">{t("aiGlossary.subtitle")}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">last_verified_at: {AI_TOP_REPOS_SNAPSHOT.baseline_date}</Badge>
          <span>{t("aiGlossary.policyOfficialFirst")}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MainTab)}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-1">
          {MAIN_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="text-xs sm:text-sm py-2.5">
              {t(TAB_TRANSLATION_KEYS[tab])}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("aiGlossary.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {(activeTab === "agent-system" || activeTab === "protocols" || activeTab === "methods" || activeTab === "models") && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setOpenItems(allConceptIds)}>
                <ChevronDown className="mr-1 h-4 w-4" />
                {t("aiGlossary.expandAll")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setOpenItems([])}>
                <ChevronUp className="mr-1 h-4 w-4" />
                {t("aiGlossary.collapseAll")}
              </Button>
            </div>
          )}
        </div>

        {(activeTab === "agent-system" || activeTab === "protocols" || activeTab === "methods" || activeTab === "models") && (
          <p className="text-sm text-muted-foreground mt-2">
            {t("aiGlossary.showing")} {activeConceptCount} {t("aiGlossary.items")}
          </p>
        )}

        {(Object.keys(filteredConcepts) as AiConceptTabId[]).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3">
            {filteredConcepts[tab].length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{t("aiGlossary.noResults")}</p>
            ) : (
              <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-3">
                {filteredConcepts[tab].map((concept) => {
                  const Icon = CONCEPT_ICON[concept.id] || Sparkles;
                  return (
                    <AccordionItem key={concept.id} value={concept.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold">{concept.title[locale]}</span>
                            <span className="text-muted-foreground text-sm ml-2">{concept.subtitle[locale]}</span>
                          </div>
                          {levelBadge(concept.support_level)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {concept.sections.map((section) => (
                            <Card key={`${concept.id}-${section.kind}`} className="border">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center justify-between gap-2">
                                  <span>{section.title[locale]}</span>
                                  <a href={section.verification.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
                                    source
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 pt-0">
                                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                  {section.content[locale]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  last_verified_at: {section.verification.last_verified_at}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </TabsContent>
        ))}

        <TabsContent value="paradigms" className="space-y-3">
          {filteredParadigms.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">{t("aiGlossary.noResults")}</p>
          ) : (
            filteredParadigms.map((item) => (
              <Card key={item.id}>
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{item.title[locale]}</CardTitle>
                    {levelBadge(item.support_level)}
                    <Badge variant="outline">{t("aiGlossary.introducedAt")}: {item.introduced_at}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{item.summary[locale]}</p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">{t("aiGlossary.applicationScenario")}:</span> {item.scenario[locale]}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <a className="inline-flex items-center gap-1 text-primary hover:underline" href={item.official_source.source_url} target="_blank" rel="noopener noreferrer">
                      official source
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <p>last_verified_at: {item.official_source.last_verified_at}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="top-repos" className="space-y-4">
          <Card className="p-4 space-y-3">
            <div className="text-sm text-muted-foreground">{AI_TOP_REPOS_SNAPSHOT.rank_policy[locale]}</div>
            <div className="text-xs text-muted-foreground">{AI_TOP_REPOS_SNAPSHOT.source_policy[locale]}</div>
          </Card>

          <Tabs value={activeRepoCategory} onValueChange={(v) => setActiveRepoCategory(v as AiRepoCategory)}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto gap-1">
              {AI_TECH_REPO_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs py-2.5">
                  {category.label[locale]}
                </TabsTrigger>
              ))}
            </TabsList>

            {AI_TECH_REPO_CATEGORIES.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-3">
                <p className="text-sm text-muted-foreground">{category.description[locale]}</p>
                {filteredTopRepos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t("aiGlossary.noResults")}</p>
                ) : (
                  filteredTopRepos.map((repo) => (
                    <Card key={`${repo.category}-${repo.rank}-${repo.full_name}`}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">#{repo.rank}</Badge>
                          <a href={repo.repo_url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline inline-flex items-center gap-1">
                            {repo.full_name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <Badge variant="secondary">★ {repo.stars.toLocaleString()}</Badge>
                          <Badge variant="outline">{t("aiGlossary.recommendedStars")}: {repo.recommended_stars}/5</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{t("aiGlossary.recommendation")}:</span> {repo.recommendation_note[locale]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{t("aiGlossary.applicationScenario")}:</span> {repo.app_scenarios[locale]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          pushed_at: {repo.pushed_at.slice(0, 10)} · last_verified_at: {repo.verification.last_verified_at}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
