import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AiGlossary from "@/pages/AiGlossary";
import { AI_TECH_REPO_CATEGORIES, AI_TOP_REPOS_SNAPSHOT } from "@/config/ai-tech-catalog";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { resolvedLanguage: "en" },
  }),
}));

describe("AiGlossary", () => {
  it("renders paradigms and top repository rankings from catalog", async () => {
    render(<AiGlossary />);

    expect(screen.getByText("aiGlossary.title")).toBeInTheDocument();

    const paradigmTab = screen.getByRole("tab", { name: "aiGlossary.tabs.paradigms" });
    fireEvent.pointerDown(paradigmTab);
    fireEvent.click(paradigmTab);
    fireEvent.keyDown(paradigmTab, { key: "Enter" });
    expect(await screen.findByText("A2A Protocol Upgrade")).toBeInTheDocument();

    const topRepoTab = screen.getByRole("tab", { name: "aiGlossary.tabs.topRepos" });
    fireEvent.pointerDown(topRepoTab);
    fireEvent.click(topRepoTab);
    fireEvent.keyDown(topRepoTab, { key: "Enter" });
    const firstCategory = AI_TECH_REPO_CATEGORIES[0].id;
    const firstRepo = AI_TOP_REPOS_SNAPSHOT.categories[firstCategory][0]?.full_name ?? "";
    const escapedRepo = firstRepo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(await screen.findByText(new RegExp(escapedRepo, "i"))).toBeInTheDocument();
    const ratingBadges = await screen.findAllByText(/aiGlossary\.recommendedStars/i);
    expect(ratingBadges.length).toBeGreaterThan(0);
  });
});
