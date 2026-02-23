import { describe, expect, it } from "vitest";

import {
  AI_CONCEPTS,
  AI_PARADIGMS,
  AI_TOP_REPOS_SNAPSHOT,
  type AiRepoCategory,
} from "@/config/ai-tech-catalog";

describe("ai-tech catalog", () => {
  it("concepts and paradigms include verification metadata", () => {
    AI_CONCEPTS.forEach((concept) => {
      expect(concept.verification.source_url).toMatch(/^https?:\/\//);
      expect(concept.verification.last_verified_at).toBeTruthy();
      concept.sections.forEach((section) => {
        expect(section.verification.source_url).toMatch(/^https?:\/\//);
        expect(section.verification.last_verified_at).toBeTruthy();
      });
    });

    AI_PARADIGMS.forEach((item) => {
      expect(item.official_source.source_url).toMatch(/^https?:\/\//);
      expect(item.official_source.last_verified_at).toBeTruthy();
      expect(["official_doc", "official_repo"]).toContain(item.official_source.verification_source);
    });
  });

  it("paradigms are within the last 365 days of baseline", () => {
    const baseline = new Date("2026-02-23T00:00:00Z").getTime();
    const start = baseline - 365 * 24 * 60 * 60 * 1000;
    AI_PARADIGMS.forEach((item) => {
      const t = new Date(item.introduced_at).getTime();
      expect(t).toBeGreaterThanOrEqual(start);
      expect(t).toBeLessThanOrEqual(baseline);
    });
  });

  it("top repositories keep strict top10 shape", () => {
    (Object.keys(AI_TOP_REPOS_SNAPSHOT.categories) as AiRepoCategory[]).forEach((category) => {
      const repos = AI_TOP_REPOS_SNAPSHOT.categories[category];
      expect(repos).toHaveLength(10);
      repos.forEach((repo, index) => {
        expect(repo.rank).toBe(index + 1);
        expect(repo.recommended_stars).toBeGreaterThanOrEqual(1);
        expect(repo.recommended_stars).toBeLessThanOrEqual(5);
        expect(repo.repo_url).toMatch(/^https:\/\/github\.com\//);
      });
      for (let i = 1; i < repos.length; i += 1) {
        expect(repos[i - 1].stars).toBeGreaterThanOrEqual(repos[i].stars);
      }
    });
  });
});
