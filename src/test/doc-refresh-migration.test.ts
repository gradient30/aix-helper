import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("doc refresh migration", () => {
  it("drops NOT NULL constraints for diff payload columns", () => {
    const migrationsDir = path.resolve("supabase/migrations");
    const sql = fs.readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort()
      .map((file) => fs.readFileSync(path.join(migrationsDir, file), "utf8"))
      .join("\n");

    expect(sql).toContain("ALTER TABLE public.doc_refresh_diff_items");
    expect(sql).toContain("ALTER COLUMN baseline_payload DROP NOT NULL");
    expect(sql).toContain("ALTER COLUMN candidate_payload DROP NOT NULL");
  });
});
