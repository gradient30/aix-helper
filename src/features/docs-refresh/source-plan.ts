import { DOC_REFRESH_SOURCE_MANIFEST } from "../../config/docs-catalog/doc-refresh-sources.generated.ts";

export type DocRefreshSourceScope = keyof typeof DOC_REFRESH_SOURCE_MANIFEST;

export type DocRefreshSourcePlanInput = {
  scope: DocRefreshSourceScope;
  vendorIds: string[];
  pageRoute?: string;
};

export type DocRefreshSourcePlanEntry = {
  scope: DocRefreshSourceScope;
  vendorId: string | null;
  pageRoute: string | null;
  sourceUrls: string[];
};

function resolveHelpSourcePlan(pageRoute: string | undefined): DocRefreshSourcePlanEntry[] {
  if (!pageRoute) {
    throw new Error("pageRoute is required for help doc refresh");
  }

  const sourceUrls = DOC_REFRESH_SOURCE_MANIFEST.help[pageRoute as keyof typeof DOC_REFRESH_SOURCE_MANIFEST.help];
  if (!sourceUrls) {
    throw new Error(`Unsupported help page route: ${pageRoute}`);
  }

  return [
    {
      scope: "help",
      vendorId: null,
      pageRoute,
      sourceUrls: [...sourceUrls],
    },
  ];
}

export function buildDocRefreshSourcePlan(input: DocRefreshSourcePlanInput): DocRefreshSourcePlanEntry[] {
  if (input.scope === "help") {
    return resolveHelpSourcePlan(input.pageRoute);
  }

  const scopeManifest = DOC_REFRESH_SOURCE_MANIFEST[input.scope];
  const requestedVendorIds = input.vendorIds.length > 0
    ? input.vendorIds
    : Object.keys(scopeManifest);

  return requestedVendorIds.map((vendorId) => {
    const sourceUrls = scopeManifest[vendorId as keyof typeof scopeManifest];
    if (!sourceUrls) {
      throw new Error(`Unsupported ${input.scope} vendor: ${vendorId}`);
    }

    return {
      scope: input.scope,
      vendorId,
      pageRoute: input.pageRoute ?? null,
      sourceUrls: [...sourceUrls],
    };
  });
}
