import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FirecrawlConfigDialog } from "@/components/docs-refresh/FirecrawlConfigDialog";

describe("FirecrawlConfigDialog", () => {
  it("shows saved mask and lets the user save or clear the key", () => {
    const onSave = vi.fn();
    const onClear = vi.fn();

    render(
      <FirecrawlConfigDialog
        open
        onOpenChange={() => {}}
        settings={{
          firecrawlConfigured: true,
          firecrawlKeyMask: "fc-12***89",
          firecrawlLastVerifiedAt: "2026-04-08T10:02:00.000Z",
        }}
        onSave={onSave}
        onClear={onClear}
      />,
    );

    expect(screen.getByText("fc-12***89")).toBeInTheDocument();
    expect(screen.getByLabelText("Firecrawl API Key")).toHaveAttribute("type", "password");

    fireEvent.change(screen.getByLabelText("Firecrawl API Key"), {
      target: { value: "fc-live-secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存 Key" }));

    expect(onSave).toHaveBeenCalledWith("fc-live-secret");

    fireEvent.click(screen.getByRole("button", { name: "清除配置" }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
