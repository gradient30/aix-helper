import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import Auth from "./pages/Auth";
import Providers from "./pages/Providers";
import McpServers from "./pages/McpServers";
import Skills from "./pages/Skills";
import Prompts from "./pages/Prompts";
import Export from "./pages/Export";
import ImportPage from "./pages/Import";
import NotFound from "./pages/NotFound";
import CliGuide from "./pages/CliGuide";
import SkillsGuide from "./pages/SkillsGuide";
import SetupGuide from "./pages/SetupGuide";
import AiGlossary from "./pages/AiGlossary";

const queryClient = new QueryClient();

const MissingSupabaseConfig = () => (
  <div className="min-h-screen bg-background text-foreground p-6 md:p-10 flex items-center justify-center">
    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-4">
      <h1 className="text-2xl font-semibold">Supabase 配置缺失</h1>
      <p className="text-sm text-muted-foreground">
        当前未检测到前端运行所需环境变量，已阻止白屏崩溃。请在项目环境中配置后刷新页面。
      </p>
      <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
        <p className="font-medium mb-2">必填环境变量</p>
        <p>
          <code>VITE_SUPABASE_URL</code>
        </p>
        <p>
          <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        本地：写入 <code>.env.local</code> 后重启 <code>npm run dev</code>。部署：同步到 GitHub
        Secrets / Cloudflare Pages 环境变量。
      </p>
    </div>
  </div>
);

const App = () => (
  !isSupabaseConfigured ? (
    <MissingSupabaseConfig />
  ) : (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/import" element={<ProtectedRoute><ImportPage /></ProtectedRoute>} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/providers" replace />} />
                      <Route path="/providers" element={<Providers />} />
                      <Route path="/mcp" element={<McpServers />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/prompts" element={<Prompts />} />
                      <Route path="/export" element={<Export />} />
                      <Route path="/cli-guide" element={<CliGuide />} />
                      <Route path="/skills-guide" element={<SkillsGuide />} />
                      <Route path="/setup-guide" element={<SetupGuide />} />
                      <Route path="/ai-glossary" element={<AiGlossary />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  )
);

export default App;
