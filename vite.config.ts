import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { componentTagger } from "lovable-tagger";

const SUPABASE_URL_FALLBACK = "https://cllruxedtdvkljmggnxd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY_FALLBACK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbHJ1eGVkdGR2a2xqbWdnbnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjQ0NDgsImV4cCI6MjA4NjkwMDQ0OH0.nWEfnCwRcwSAJapD4zy0YkdOT3CX-sPr1L8P7a-mUBY";
const SUPABASE_PROJECT_ID_FALLBACK = "cllruxedtdvkljmggnxd";

const envOrFallback = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value : fallback;

function readPackageVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf8")) as { version?: string };
    return pkg.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function resolveCommitSha(): string {
  const envSha = process.env.VITE_COMMIT_SHA || process.env.GITHUB_SHA;
  if (envSha && envSha.trim()) {
    return envSha.trim().slice(0, 7);
  }

  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

const appVersionBase = envOrFallback(process.env.VITE_APP_VERSION, readPackageVersion());
const appBuildSha = resolveCommitSha();
const appVersionDisplay = `v${appVersionBase}+${appBuildSha}`;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 动态 base：GitHub Pages 需要 /repo-name/，Cloudflare Pages 用 /
  base: process.env.VITE_BASE_URL || "/",
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
      envOrFallback(process.env.VITE_SUPABASE_URL, SUPABASE_URL_FALLBACK),
    ),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
      envOrFallback(process.env.VITE_SUPABASE_PUBLISHABLE_KEY, SUPABASE_PUBLISHABLE_KEY_FALLBACK),
    ),
    "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(
      envOrFallback(process.env.VITE_SUPABASE_PROJECT_ID, SUPABASE_PROJECT_ID_FALLBACK),
    ),
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersionBase),
    "import.meta.env.VITE_APP_BUILD": JSON.stringify(appBuildSha),
    "import.meta.env.VITE_APP_VERSION_DISPLAY": JSON.stringify(appVersionDisplay),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
