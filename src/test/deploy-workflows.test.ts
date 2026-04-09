import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

function readWorkflow(fileName: string): string {
  return fs.readFileSync(path.resolve(".github/workflows", fileName), "utf8");
}

describe("deploy workflows", () => {
  it.each([
    "deploy-cloudflare.yml",
    "deploy-pages.yml",
  ])("%s waits for successful Quality Gate before deploy", (fileName) => {
    const workflow = readWorkflow(fileName);

    expect(workflow).toMatch(/workflow_run:/);
    expect(workflow).toMatch(/Quality Gate/);
    expect(workflow).toMatch(/completed/);
    expect(workflow).toMatch(/github\.event\.workflow_run\.conclusion == 'success'/);
    expect(workflow).not.toMatch(/^ {2}push:/m);
  });
});
