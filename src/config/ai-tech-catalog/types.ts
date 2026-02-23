export type AiVerificationStatus = "pass" | "warn" | "fail";

export type AiVerificationSource =
  | "official_doc"
  | "official_repo"
  | "mainstream_platform"
  | "github_api";

export type AiSupportLevel = "official" | "community";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type AiVerificationMeta = {
  last_verified_at: string;
  verification_status: AiVerificationStatus;
  verification_reason: string;
  source_url: string;
  source_anchor?: string;
  verification_source: AiVerificationSource;
};

export type AiConceptTabId =
  | "agent-system"
  | "protocols"
  | "methods"
  | "models";

export type AiConceptSectionKind =
  | "definition"
  | "function"
  | "scenario"
  | "relation";

export type AiConceptSection = {
  kind: AiConceptSectionKind;
  title: LocalizedText;
  content: LocalizedText;
  verification: AiVerificationMeta;
};

export type AiConceptItem = {
  id: string;
  tab: AiConceptTabId;
  title: LocalizedText;
  subtitle: LocalizedText;
  support_level: AiSupportLevel;
  verification: AiVerificationMeta;
  sections: AiConceptSection[];
};

export type AiParadigmItem = {
  id: string;
  title: LocalizedText;
  introduced_at: string;
  summary: LocalizedText;
  scenario: LocalizedText;
  support_level: AiSupportLevel;
  official_source: AiVerificationMeta;
  supporting_sources: AiVerificationMeta[];
};

export type AiRepoCategory =
  | "rd_efficiency_tools"
  | "skill_repos"
  | "mcp_repos"
  | "prompt_optimization_repos"
  | "agent_repos";

export type AiRepoCategoryMeta = {
  id: AiRepoCategory;
  label: LocalizedText;
  description: LocalizedText;
  keywords: string[];
};

export type AiRepoRankItem = {
  category: AiRepoCategory;
  rank: number;
  full_name: string;
  repo_url: string;
  stars: number;
  pushed_at: string;
  recommended_stars: 1 | 2 | 3 | 4 | 5;
  recommendation_note: LocalizedText;
  app_scenarios: LocalizedText;
  verification: AiVerificationMeta;
};

export type AiTopReposSnapshot = {
  generated_at: string;
  baseline_date: string;
  source_policy: LocalizedText;
  rank_policy: LocalizedText;
  categories: Record<AiRepoCategory, AiRepoRankItem[]>;
};
