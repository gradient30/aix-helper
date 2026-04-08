import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CLI_GUIDE_TOOLS } from "@/config/docs-catalog/cli";
import { VendorGuideTabs } from "@/components/docs-refresh/VendorGuideTabs";

describe("VendorGuideTabs", () => {
  it("renders four vendors in a shared single-row tabs header", () => {
    render(
      <VendorGuideTabs
        value="claude"
        onValueChange={() => {}}
        tools={CLI_GUIDE_TOOLS}
      />,
    );

    expect(screen.getByRole("tab", { name: "Claude Code" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Codex CLI" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Gemini CLI" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "OpenCode" })).toBeInTheDocument();
  });
});
