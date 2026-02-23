import { describe, expect, it } from "vitest";

import {
  buildProviderCandidateUrls,
  buildProviderHeaders,
  resolveProviderProbePlan,
  withGeminiApiKey,
} from "../../supabase/functions/test-connection/provider-probe";

describe("provider-probe plan", () => {
  it("uses official Anthropic endpoint when official base URL is empty", () => {
    const plan = resolveProviderProbePlan({
      provider_type: "official",
      base_url: "",
      app_type: "claude",
    });

    expect(plan).toBeTruthy();
    expect(plan?.effectiveBaseUrl).toBe("https://api.anthropic.com");
    expect(plan?.authMode).toBe("anthropic");
    expect(plan?.candidateUrls[0]).toContain("/v1/models");
  });

  it("uses gemini query auth mode for gemini app", () => {
    const plan = resolveProviderProbePlan({
      provider_type: "official",
      app_type: "gemini",
    });

    expect(plan?.authMode).toBe("gemini_query");
    const withKey = withGeminiApiKey(
      "https://generativelanguage.googleapis.com/v1beta/models",
      "gemini_query",
      "gk-test",
    );
    expect(withKey).toContain("key=gk-test");
  });

  it("builds openai candidate from /v1 base", () => {
    const urls = buildProviderCandidateUrls("https://api.openai.com/v1", "bearer");
    expect(urls[0]).toBe("https://api.openai.com/v1/models");
    expect(urls).toContain("https://api.openai.com/v1");
  });

  it("builds anthropic headers with version and x-api-key", () => {
    const headers = buildProviderHeaders("anthropic", "sk-ant");
    expect(headers["anthropic-version"]).toBe("2023-06-01");
    expect(headers["x-api-key"]).toBe("sk-ant");
    expect(headers.Authorization).toBeUndefined();
  });

  it("builds bearer auth header", () => {
    const headers = buildProviderHeaders("bearer", "sk-openai");
    expect(headers.Authorization).toBe("Bearer sk-openai");
    expect(headers["anthropic-version"]).toBeUndefined();
  });
});
