import { describe, expect, it } from "vitest";

import { buildDocRefreshRunArtifacts } from "@/features/docs-refresh/run-artifacts";

describe("doc refresh run artifacts", () => {
  it("builds persisted diff rows from the static catalog baseline and fetched markdown", () => {
    const result = buildDocRefreshRunArtifacts({
      runId: "run-123",
      userId: "user-123",
      scope: "skills",
      pageRoute: "/skills-guide",
      sourceMode: "official_fetch",
      snapshots: [
        {
          vendorId: "codex",
          pageRoute: "/skills-guide",
          sourceUrl: "https://developers.openai.com/codex/prompting",
          rawMarkdown: `# Codex Agent Skills

## Agent Skills 机制
Codex uses Agent Skills as reusable capability packs. They load on demand through AGENTS.md, project instructions, and shared workflows.

## AGENTS.md Guide
Keep repository instructions in AGENTS.md so Codex can reuse them consistently across sessions.

## Sandbox Profiles
Use sandbox profiles to separate read-only and write-enabled workflows.

\`\`\`bash
codex --sandbox workspace-write
\`\`\`
`,
        },
      ],
    });

    expect(result.snapshotRows).toHaveLength(1);
    expect(result.snapshotRows[0].normalizedPayload).toEqual(
      expect.objectContaining({
        sourceMode: "official_fetch",
        pageRoute: "/skills-guide",
        sourceUrl: "https://developers.openai.com/codex/prompting",
        vendorId: "codex",
        extractedEntityCount: expect.any(Number),
      }),
    );

    expect(result.diffRows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          run_id: "run-123",
          user_id: "user-123",
          scope: "skills",
          vendor_id: "codex",
          entity_key: "guide:skills:codex:概述:Agent Skills 机制",
          diff_kind: "modified",
          review_action: "skip",
          review_status: "pending",
        }),
        expect.objectContaining({
          run_id: "run-123",
          user_id: "user-123",
          scope: "skills",
          vendor_id: "codex",
          diff_kind: "added",
          review_action: "skip",
          review_status: "pending",
          candidate_payload: expect.objectContaining({
            title: "Sandbox Profiles",
          }),
        }),
        expect.objectContaining({
          run_id: "run-123",
          user_id: "user-123",
          scope: "skills",
          vendor_id: "codex",
          entity_key: "guide:skills:codex:概述:官方优先语义",
          diff_kind: "stale",
          review_action: "skip",
          review_status: "pending",
        }),
      ]),
    );
  });
});
