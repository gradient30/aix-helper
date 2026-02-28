import { FormEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Terminal, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type AuthMode = "login" | "register" | "forgot" | "reset";

const REMEMBER_EMAIL_ENABLED_KEY = "auth-remember-email-enabled";
const REMEMBER_EMAIL_VALUE_KEY = "auth-remember-email-value";

function readRememberEmailEnabled(): boolean {
  try {
    const saved = localStorage.getItem(REMEMBER_EMAIL_ENABLED_KEY);
    return saved === null ? true : saved === "true";
  } catch {
    return true;
  }
}

function readRememberedEmail(enabled: boolean): string {
  if (!enabled) return "";
  try {
    return localStorage.getItem(REMEMBER_EMAIL_VALUE_KEY) || "";
  } catch {
    return "";
  }
}

function isResetModeFromUrl(search: string, hash: string): boolean {
  const searchParams = new URLSearchParams(search);
  const mode = searchParams.get("mode");
  const searchType = searchParams.get("type");
  const hashType = new URLSearchParams(hash.replace(/^#/, "")).get("type");
  return mode === "reset" || searchType === "recovery" || hashType === "recovery";
}

export default function Auth() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const initialRememberEmail = readRememberEmailEnabled();
  const initialMode = isResetModeFromUrl(location.search, location.hash) ? "reset" : "login";
  const {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    updatePassword,
  } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState(() => readRememberedEmail(initialRememberEmail));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rememberEmail, setRememberEmail] = useState(initialRememberEmail);
  const [submitting, setSubmitting] = useState(false);
  const hasRecoveryContext = new URLSearchParams(location.search).get("type") === "recovery"
    || new URLSearchParams(location.hash.replace(/^#/, "")).get("type") === "recovery"
    || !!session;

  useEffect(() => {
    if (isResetModeFromUrl(location.search, location.hash)) {
      setMode("reset");
    }
  }, [location.search, location.hash]);

  useEffect(() => {
    try {
      localStorage.setItem(REMEMBER_EMAIL_ENABLED_KEY, rememberEmail ? "true" : "false");
      if (!rememberEmail) {
        localStorage.removeItem(REMEMBER_EMAIL_VALUE_KEY);
      }
    } catch {
      // ignore storage failures
    }
  }, [rememberEmail]);

  const goToLogin = () => {
    setMode("login");
    setPassword("");
    setConfirmPassword("");
    navigate("/auth", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && mode !== "reset") return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if ((mode === "login" || mode === "register" || mode === "forgot") && !trimmedEmail) return;
    setSubmitting(true);

    try {
      if (mode === "login") {
        if (!password.trim()) {
          setSubmitting(false);
          return;
        }
        const { error } = await signIn(trimmedEmail, password);
        if (error) {
          toast({ title: t("auth.loginFailed"), description: error.message, variant: "destructive" });
          return;
        }
        try {
          if (rememberEmail) {
            localStorage.setItem(REMEMBER_EMAIL_VALUE_KEY, trimmedEmail);
          } else {
            localStorage.removeItem(REMEMBER_EMAIL_VALUE_KEY);
          }
        } catch {
          // ignore storage failures
        }
      }

      if (mode === "register") {
        if (password.length < 6) {
          toast({ title: t("auth.passwordTooShort"), description: t("auth.passwordTooShortDesc"), variant: "destructive" });
          setSubmitting(false);
          return;
        }
        const { error } = await signUp(trimmedEmail, password, displayName.trim() || undefined);
        if (error) {
          toast({ title: t("auth.registerFailed"), description: error.message, variant: "destructive" });
        } else {
          toast({ title: t("auth.registerSuccess") });
          setMode("login");
        }
      }

      if (mode === "forgot") {
        const { error } = await requestPasswordReset(trimmedEmail);
        if (error) {
          toast({ title: t("auth.resetEmailFailed"), description: error.message, variant: "destructive" });
        } else {
          toast({ title: t("auth.resetEmailSent") });
          setMode("login");
        }
      }

      if (mode === "reset") {
        if (password.length < 6) {
          toast({ title: t("auth.passwordTooShort"), description: t("auth.passwordTooShortDesc"), variant: "destructive" });
          setSubmitting(false);
          return;
        }
        if (password !== confirmPassword) {
          toast({ title: t("auth.passwordMismatch"), variant: "destructive" });
          setSubmitting(false);
          return;
        }
        if (!hasRecoveryContext) {
          toast({ title: t("auth.invalidRecoveryLink"), variant: "destructive" });
          setSubmitting(false);
          return;
        }

        const { error } = await updatePassword(password);
        if (error) {
          toast({ title: t("auth.resetPasswordFailed"), description: error.message, variant: "destructive" });
          return;
        }
        toast({ title: t("auth.resetPasswordSuccess") });
        await signOut();
        goToLogin();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel = mode === "login"
    ? t("auth.login")
    : mode === "register"
      ? t("auth.register")
      : mode === "forgot"
        ? t("auth.sendResetEmail")
        : t("auth.resetPasswordSubmit");

  const description = mode === "login"
    ? t("auth.loginTitle")
    : mode === "register"
      ? t("auth.registerTitle")
      : mode === "forgot"
        ? t("auth.forgotPassword")
        : t("auth.resetPasswordTitle");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Terminal className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">AI Helper</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="displayName">{t("auth.displayName")}</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t("auth.displayName")}
                  maxLength={50}
                />
              </div>
            )}
            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  required
                  maxLength={255}
                />
              </div>
            )}
            {(mode === "login" || mode === "register") && (
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.passwordPlaceholder")}
                  required
                  minLength={6}
                  maxLength={72}
                />
              </div>
            )}
            {mode === "reset" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.newPassword")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    required
                    minLength={6}
                    maxLength={72}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    required
                    minLength={6}
                    maxLength={72}
                  />
                </div>
                {!hasRecoveryContext && (
                  <p className="text-sm text-destructive">{t("auth.invalidRecoveryLink")}</p>
                )}
              </>
            )}
            {mode === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberEmail"
                    checked={rememberEmail}
                    onCheckedChange={(checked) => setRememberEmail(checked === true)}
                  />
                  <Label htmlFor="rememberEmail" className="font-normal">
                    {t("auth.rememberEmail")}
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitLabel}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "login" && (
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-primary underline-offset-4 hover:underline"
              >
                {t("auth.switchToRegister")}
              </button>
            )}
            {mode === "register" && (
              <button
                type="button"
                onClick={goToLogin}
                className="text-primary underline-offset-4 hover:underline"
              >
                {t("auth.switchToLogin")}
              </button>
            )}
            {(mode === "forgot" || mode === "reset") && (
              <button
                type="button"
                onClick={goToLogin}
                className="text-primary underline-offset-4 hover:underline"
              >
                {t("auth.backToLogin")}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
