import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const SUPABASE_URL_FALLBACK = "https://cllruxedtdvkljmggnxd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY_FALLBACK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbHJ1eGVkdGR2a2xqbWdnbnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjQ0NDgsImV4cCI6MjA4NjkwMDQ0OH0.nWEfnCwRcwSAJapD4zy0YkdOT3CX-sPr1L8P7a-mUBY";
const SUPABASE_PROJECT_ID_FALLBACK = "cllruxedtdvkljmggnxd";

const envOrFallback = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value : fallback;

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
