import type { Database } from "../../integrations/supabase/types.ts";
import { DOC_REFRESH_BASELINE_MANIFEST } from "../../config/docs-catalog/doc-refresh-baseline.generated.ts";
import { diffCatalogItems } from "./diff.ts";
import { buildCliCommandEntityKey, buildGuideEntityKey } from "./entity-keys.ts";
import type {
  DocRefreshBaseEntity,
  DocRefreshDiffResult,
  DocRefreshScope,
  DocRefreshSourceMode,
} from "./types.ts";

type DiffRowInsert = Database["public"]["Tables"]["doc_refresh_diff_items"]["Insert"];

type BaselineManifest = typeof DOC_REFRESH_BASELINE_MANIFEST;
type ScopeBaselineEntry =
  BaselineManifest[keyof BaselineManifest][string][number];

type RunArtifactEntity = DocRefreshBaseEntity & {
  sourceUrls: string[];
  payload: Record<string, unknown>;
};

type MarkdownSection = {
  id: string;
  snapshotIndex: number;
  vendorId: string;
  pageRoute: string;
  sourceUrl: string;
  title: string;
  body: string;
  description: string | null;
  code: string | null;
  commands: string[];
};

export type DocRefreshSnapshotInput = {
  vendorId: string;
  pageRoute: string;
  sourceUrl: string;
  rawMarkdown: string;
};

export type DocRefreshRunArtifactInput = {
  runId: string;
  userId: string;
  scope: DocRefreshScope;
  pageRoute: string;
  sourceMode: DocRefreshSourceMode;
  snapshots: DocRefreshSnapshotInput[];
  generatedAt?: string;
};

export type DocRefreshRunArtifacts = {
  snapshotRows: Array<DocRefreshSnapshotInput & { normalizedPayload: Record<string, unknown> }>;
  diffRows: DiffRowInsert[];
};

function normalizeLoose(value: string | undefined): string {
  return (value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, "$1")
    .replace(/`+/gu, "")
    .replace(/[^\p{L}\p{N}./:_-]+/gu, " ")
    .trim();
}

function tokenizeLoose(value: string | undefined): Set<string> {
  const normalized = normalizeLoose(value);
  if (!normalized) return new Set();
  return new Set(normalized.split(/\s+/).filter(Boolean));
}

function similarityText(left: string | undefined, right: string | undefined): number {
  const leftTokens = tokenizeLoose(left);
  const rightTokens = tokenizeLoose(right);
  if (leftTokens.size === 0 && rightTokens.size === 0) return 1;

  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) intersection += 1;
  }

  const union = new Set([...leftTokens, ...rightTokens]).size;
  return union === 0 ? 0 : intersection / union;
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, "$1")
    .replace(/`([^`]+)`/gu, "$1")
    .replace(/[*_>#-]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function extractFirstCode(body: string): string | null {
  const match = body.match(/```[^\n]*\n([\s\S]*?)```/u);
  return match?.[1]?.trim() || null;
}

function extractDescription(body: string): string | null {
  const withoutCode = body.replace(/```[\s\S]*?```/gu, " ");
  const paragraphs = withoutCode
    .split(/\n\s*\n/gu)
    .map((part) => stripMarkdown(part))
    .filter(Boolean);

  return paragraphs[0] || null;
}

function deriveFallbackTitle(sourceUrl: string): string {
  try {
    const url = new URL(sourceUrl);
    const pathname = url.pathname.replace(/\/+$/u, "");
    const lastSegment = pathname.split("/").filter(Boolean).pop();
    if (lastSegment) return decodeURIComponent(lastSegment);
    return url.hostname;
  } catch {
    return sourceUrl;
  }
}

function extractInlineCommands(body: string): string[] {
  const matches = [...body.matchAll(/`([^`\n]+)`/gu)];
  return matches.map((match) => match[1].trim());
}

function looksLikeCliCommand(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^\/[\w-]+/u.test(trimmed) ||
    /^--[\w-]+/u.test(trimmed) ||
    /^(claude|codex|gemini|opencode)\b/u.test(trimmed);
}

function extractCliCommands(section: { body: string }): string[] {
  const commands = new Set<string>();
  const codeBlocks = [...section.body.matchAll(/```[^\n]*\n([\s\S]*?)```/gu)];

  for (const match of codeBlocks) {
    const lines = match[1]
      .split(/\r?\n/gu)
      .map((line) => line.trim())
      .filter(Boolean);
    for (const line of lines) {
      if (looksLikeCliCommand(line)) commands.add(line);
    }
  }

  for (const value of extractInlineCommands(section.body)) {
    if (looksLikeCliCommand(value)) commands.add(value);
  }

  return [...commands];
}

function parseMarkdownSections(snapshot: DocRefreshSnapshotInput, snapshotIndex: number): MarkdownSection[] {
  const lines = snapshot.rawMarkdown.replace(/\r\n/gu, "\n").split("\n");
  const sections: MarkdownSection[] = [];
  const fallbackTitle = deriveFallbackTitle(snapshot.sourceUrl);

  let currentTitle = fallbackTitle;
  let currentLines: string[] = [];
  let inCodeFence = false;

  const flush = () => {
    const body = currentLines.join("\n").trim();
    if (!body && !currentTitle) return;

    const id = `${snapshotIndex}:${sections.length}`;
    sections.push({
      id,
      snapshotIndex,
      vendorId: snapshot.vendorId,
      pageRoute: snapshot.pageRoute,
      sourceUrl: snapshot.sourceUrl,
      title: stripMarkdown(currentTitle) || fallbackTitle,
      body,
      description: extractDescription(body),
      code: extractFirstCode(body),
      commands: extractCliCommands({ body }),
    });
  };

  for (const line of lines) {
    if (/^```/u.test(line.trim())) {
      inCodeFence = !inCodeFence;
      currentLines.push(line);
      continue;
    }

    const headingMatch = !inCodeFence ? line.match(/^#{1,6}\s+(.+)$/u) : null;
    if (headingMatch) {
      if (currentLines.length > 0) {
        flush();
      }
      currentTitle = headingMatch[1].trim();
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  flush();
  return sections.filter((section) => section.title || section.body);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function recordString(value: Record<string, unknown>, key: string): string | undefined {
  const candidate = value[key];
  return typeof candidate === "string" && candidate.trim() ? candidate : undefined;
}

function toCatalogEntity(entry: ScopeBaselineEntry): RunArtifactEntity {
  return {
    entityKey: entry.entityKey,
    vendorId: entry.vendorId,
    category: entry.category,
    title: entry.title,
    command: entry.command,
    description: entry.description,
    code: entry.code,
    content: entry.content,
    body: entry.body,
    sourceUrls: [...entry.sourceUrls],
    payload: asRecord(entry.payload),
  };
}

function getRelevantBaselineEntries(
  scope: DocRefreshScope,
  pageRoute: string,
  snapshots: DocRefreshSnapshotInput[],
): RunArtifactEntity[] {
  if (scope === "help") {
    const helpEntries = DOC_REFRESH_BASELINE_MANIFEST.help[pageRoute] ?? [];
    return helpEntries.map((entry) => toCatalogEntity(entry));
  }

  const scopeEntries = DOC_REFRESH_BASELINE_MANIFEST[scope];
  const vendorIds = new Set(snapshots.map((snapshot) => snapshot.vendorId));
  const sourceUrls = new Set(snapshots.map((snapshot) => snapshot.sourceUrl));

  return Object.entries(scopeEntries)
    .filter(([vendorId]) => vendorIds.has(vendorId))
    .flatMap(([, entries]) =>
      entries
        .map((entry) => toCatalogEntity(entry))
        .filter((entry) => entry.sourceUrls.some((sourceUrl) => sourceUrls.has(sourceUrl)))
    );
}

function buildAutoVerification(sourceUrl: string, generatedAt: string): Record<string, unknown> {
  return {
    last_verified_at: generatedAt.slice(0, 10),
    verification_status: "warn",
    verification_reason: "Auto-extracted from doc refresh snapshot. Review before publishing.",
    source_url: sourceUrl,
    verification_source: "official_doc",
  };
}

function toCandidateEntity(
  entityKey: string,
  vendorId: string,
  category: string,
  payload: Record<string, unknown>,
  sourceUrls: string[],
): RunArtifactEntity {
  return {
    entityKey,
    vendorId,
    category,
    title: recordString(payload, "title"),
    command: recordString(payload, "command"),
    description: recordString(payload, "description"),
    code: recordString(payload, "code"),
    content: recordString(payload, "content"),
    body: recordString(payload, "body"),
    sourceUrls,
    payload,
  };
}

function inferCategory(
  vendorId: string,
  sourceUrl: string,
  text: string,
  baselineEntries: RunArtifactEntity[],
): string {
  const relevantEntries = baselineEntries.filter(
    (entry) => entry.vendorId === vendorId && entry.sourceUrls.includes(sourceUrl),
  );
  if (relevantEntries.length === 0) {
    return deriveFallbackTitle(sourceUrl);
  }

  let bestCategory = relevantEntries[0].category;
  let bestScore = -1;

  for (const entry of relevantEntries) {
    const score = similarityText(
      text,
      [entry.title, entry.command, entry.description].filter(Boolean).join(" "),
    );
    if (score > bestScore) {
      bestScore = score;
      bestCategory = entry.category;
    }
  }

  return bestCategory;
}

function findGuideExactSection(entry: RunArtifactEntity, sections: MarkdownSection[]): MarkdownSection | null {
  const entryTitle = normalizeLoose(entry.title);
  if (!entryTitle) return null;

  let bestSection: MarkdownSection | null = null;
  let bestScore = 0;

  for (const section of sections) {
    const sectionTitle = normalizeLoose(section.title);
    if (!sectionTitle) continue;

    const exactTitleMatch = sectionTitle === entryTitle ||
      sectionTitle.includes(entryTitle) ||
      entryTitle.includes(sectionTitle);
    if (!exactTitleMatch) continue;

    const score = similarityText(
      `${section.title} ${section.description ?? ""}`,
      `${entry.title ?? ""} ${entry.description ?? ""}`,
    );
    if (score >= bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  return bestSection;
}

function findCliExactSection(entry: RunArtifactEntity, sections: MarkdownSection[]): MarkdownSection | null {
  const command = (entry.command ?? "").trim().toLowerCase();
  if (!command) return null;

  for (const section of sections) {
    if (section.commands.some((value) => value.trim().toLowerCase() === command)) {
      return section;
    }

    if (section.body.toLowerCase().includes(command)) {
      return section;
    }
  }

  return null;
}

function buildMatchedGuideCandidate(entry: RunArtifactEntity, section: MarkdownSection): RunArtifactEntity {
  const payload = {
    ...entry.payload,
    entityKey: entry.entityKey,
  };

  if (section.description && normalizeLoose(section.description) !== normalizeLoose(recordString(payload, "description"))) {
    payload.description = section.description;
  }

  if (section.code && normalizeLoose(section.code) !== normalizeLoose(recordString(payload, "code"))) {
    payload.code = section.code;
  }

  return toCandidateEntity(entry.entityKey, entry.vendorId, entry.category, payload, [section.sourceUrl]);
}

function buildMatchedCliCandidate(entry: RunArtifactEntity, section: MarkdownSection): RunArtifactEntity {
  const payload = {
    ...entry.payload,
    entityKey: entry.entityKey,
  };

  if (section.description && normalizeLoose(section.description) !== normalizeLoose(recordString(payload, "description"))) {
    payload.description = section.description;
  }

  const primaryCommand = section.commands[0];
  if (primaryCommand && normalizeLoose(primaryCommand) !== normalizeLoose(recordString(payload, "usage"))) {
    payload.usage = primaryCommand;
  }

  return toCandidateEntity(entry.entityKey, entry.vendorId, entry.category, payload, [section.sourceUrl]);
}

function buildMatchedHelpCandidate(
  entry: RunArtifactEntity,
  snapshot: DocRefreshSnapshotInput,
): RunArtifactEntity {
  const payload = {
    ...entry.payload,
    entityKey: entry.entityKey,
  };
  const description = extractDescription(snapshot.rawMarkdown);
  if (description && normalizeLoose(description) !== normalizeLoose(recordString(payload, "description"))) {
    payload.description = description;
  }
  return toCandidateEntity(entry.entityKey, entry.vendorId, entry.category, payload, [snapshot.sourceUrl]);
}

function buildAddedGuideCandidate(
  scope: Exclude<DocRefreshScope, "cli" | "help">,
  section: MarkdownSection,
  baselineEntries: RunArtifactEntity[],
  generatedAt: string,
): RunArtifactEntity | null {
  const title = stripMarkdown(section.title);
  if (!title || (!section.description && !section.code)) return null;

  const category = inferCategory(
    section.vendorId,
    section.sourceUrl,
    `${title} ${section.description ?? ""}`,
    baselineEntries,
  );
  const entityKey = buildGuideEntityKey(scope, section.vendorId, category, title);
  const payload: Record<string, unknown> = {
    entityKey,
    title,
    description: section.description ?? title,
    support_level: "official",
    verification: buildAutoVerification(section.sourceUrl, generatedAt),
  };

  if (section.code) {
    payload.code = section.code;
  }

  return toCandidateEntity(entityKey, section.vendorId, category, payload, [section.sourceUrl]);
}

function buildAddedCliCandidate(
  section: MarkdownSection,
  command: string,
  baselineEntries: RunArtifactEntity[],
  generatedAt: string,
): RunArtifactEntity {
  const category = inferCategory(
    section.vendorId,
    section.sourceUrl,
    `${section.title} ${section.description ?? ""} ${command}`,
    baselineEntries,
  );
  const entityKey = buildCliCommandEntityKey(section.vendorId, category, command);
  const payload: Record<string, unknown> = {
    entityKey,
    command,
    description: section.description ?? section.title,
    usage: command,
    support_level: "official",
    verification: buildAutoVerification(section.sourceUrl, generatedAt),
  };

  return toCandidateEntity(entityKey, section.vendorId, category, payload, [section.sourceUrl]);
}

function dedupeCandidates(candidates: RunArtifactEntity[]): RunArtifactEntity[] {
  const byKey = new Map<string, RunArtifactEntity>();

  for (const candidate of candidates) {
    const existing = byKey.get(candidate.entityKey);
    if (!existing) {
      byKey.set(candidate.entityKey, candidate);
      continue;
    }

    const existingWeight = JSON.stringify(existing.payload).length;
    const candidateWeight = JSON.stringify(candidate.payload).length;
    if (candidateWeight > existingWeight) {
      byKey.set(candidate.entityKey, candidate);
    }
  }

  return [...byKey.values()];
}

function buildDiffRows(
  input: {
    runId: string;
    userId: string;
    scope: DocRefreshScope;
  },
  diffResult: DocRefreshDiffResult<RunArtifactEntity>,
): DiffRowInsert[] {
  const rows: DiffRowInsert[] = [];

  for (const candidate of diffResult.added) {
    rows.push({
      run_id: input.runId,
      user_id: input.userId,
      scope: input.scope,
      vendor_id: candidate.vendorId,
      entity_key: candidate.entityKey,
      diff_kind: "added",
      baseline_payload: null,
      candidate_payload: candidate.payload,
      similarity_score: null,
      similar_candidates: [],
      review_action: "skip",
      review_status: "pending",
    });
  }

  for (const pair of diffResult.modified) {
    rows.push({
      run_id: input.runId,
      user_id: input.userId,
      scope: input.scope,
      vendor_id: pair.candidate.vendorId,
      entity_key: pair.candidate.entityKey,
      diff_kind: "modified",
      baseline_payload: pair.baseline.payload,
      candidate_payload: pair.candidate.payload,
      similarity_score: null,
      similar_candidates: [],
      review_action: "skip",
      review_status: "pending",
    });
  }

  for (const baseline of diffResult.stale) {
    rows.push({
      run_id: input.runId,
      user_id: input.userId,
      scope: input.scope,
      vendor_id: baseline.vendorId,
      entity_key: baseline.entityKey,
      diff_kind: "stale",
      baseline_payload: baseline.payload,
      candidate_payload: null,
      similarity_score: null,
      similar_candidates: [],
      review_action: "skip",
      review_status: "pending",
    });
  }

  for (const pair of diffResult.similar) {
    rows.push({
      run_id: input.runId,
      user_id: input.userId,
      scope: input.scope,
      vendor_id: pair.candidate.vendorId,
      entity_key: pair.candidate.entityKey,
      diff_kind: "similar",
      baseline_payload: pair.baseline.payload,
      candidate_payload: pair.candidate.payload,
      similarity_score: pair.similarityScore ?? null,
      similar_candidates: [pair.baseline.payload],
      review_action: "skip",
      review_status: "pending",
    });
  }

  return rows.sort((left, right) => left.entity_key.localeCompare(right.entity_key));
}

export function buildDocRefreshRunArtifacts(input: DocRefreshRunArtifactInput): DocRefreshRunArtifacts {
  const generatedAt = input.generatedAt ?? new Date().toISOString();
  const baselineEntries = getRelevantBaselineEntries(input.scope, input.pageRoute, input.snapshots);
  const sectionsBySnapshot = input.snapshots.map((snapshot, index) => parseMarkdownSections(snapshot, index));
  const flatSections = sectionsBySnapshot.flat();

  const exactCandidates: RunArtifactEntity[] = [];
  const exactGuideSectionIds = new Set<string>();
  const matchedCliCommands = new Set<string>();

  for (const entry of baselineEntries) {
    if (input.scope === "help") {
      const snapshot = input.snapshots.find(
        (candidate) => candidate.vendorId === entry.vendorId && entry.sourceUrls.includes(candidate.sourceUrl),
      );
      if (!snapshot) continue;
      exactCandidates.push(buildMatchedHelpCandidate(entry, snapshot));
      continue;
    }

    const relevantSections = flatSections.filter(
      (section) => section.vendorId === entry.vendorId && entry.sourceUrls.includes(section.sourceUrl),
    );

    if (input.scope === "cli") {
      const match = findCliExactSection(entry, relevantSections);
      if (!match) continue;
      exactCandidates.push(buildMatchedCliCandidate(entry, match));
      if (entry.command) matchedCliCommands.add(entry.command.toLowerCase());
      continue;
    }

    const match = findGuideExactSection(entry, relevantSections);
    if (!match) continue;
    exactCandidates.push(buildMatchedGuideCandidate(entry, match));
    exactGuideSectionIds.add(match.id);
  }

  const addedCandidates: RunArtifactEntity[] = [];

  if (input.scope === "cli") {
    for (const section of flatSections) {
      for (const command of section.commands) {
        const normalizedCommand = command.toLowerCase();
        if (matchedCliCommands.has(normalizedCommand)) continue;
        addedCandidates.push(buildAddedCliCandidate(section, command, baselineEntries, generatedAt));
      }
    }
  }

  if (input.scope === "skills" || input.scope === "setup") {
    for (const section of flatSections) {
      if (exactGuideSectionIds.has(section.id)) continue;
      const candidate = buildAddedGuideCandidate(input.scope, section, baselineEntries, generatedAt);
      if (candidate) addedCandidates.push(candidate);
    }
  }

  const candidateEntities = dedupeCandidates([...exactCandidates, ...addedCandidates]);
  const diffResult = diffCatalogItems({
    baseline: baselineEntries,
    candidate: candidateEntities,
  });

  const snapshotRows = input.snapshots.map((snapshot, index) => {
    const snapshotSections = sectionsBySnapshot[index];
    const extractedEntities = candidateEntities
      .filter((candidate) => snapshotSections.some((section) => {
        if (input.scope === "cli") {
          return section.commands.some((command) => command === candidate.command);
        }
        return normalizeLoose(section.title) === normalizeLoose(candidate.title);
      }))
      .map((candidate) => candidate.payload);

    return {
      ...snapshot,
      normalizedPayload: {
        sourceMode: input.sourceMode,
        pageRoute: snapshot.pageRoute,
        sourceUrl: snapshot.sourceUrl,
        vendorId: snapshot.vendorId,
        extractedEntityCount: extractedEntities.length,
        extractedEntities,
      },
    };
  });

  return {
    snapshotRows,
    diffRows: buildDiffRows(
      {
        runId: input.runId,
        userId: input.userId,
        scope: input.scope,
      },
      diffResult,
    ),
  };
}
