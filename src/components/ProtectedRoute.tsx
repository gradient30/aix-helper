import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

function isRecoveryFlow(search: string, hash: string): boolean {
  const searchType = new URLSearchParams(search).get("type");
  const hashType = new URLSearchParams(hash.replace(/^#/, "")).get("type");
  return searchType === "recovery" || hashType === "recovery";
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    if (isRecoveryFlow(location.search, location.hash)) {
      const params = new URLSearchParams(location.search);
      params.set("mode", "reset");
      return (
        <Navigate
          to={{
            pathname: "/auth",
            search: `?${params.toString()}`,
            hash: location.hash,
          }}
          replace
        />
      );
    }
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
