import { FormEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { Terminal, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type AuthMode = "login" | "register" | "forgot" | "reset";
type RememberDuration = "7d" | "forever";
type RememberedCredentials = {
  email: string;
  password: string;
  expiresAt: number | null;
};

const REMEMBER_ENABLED_KEY = "auth-remember-enabled";
const REMEMBER_DURATION_KEY = "auth-remember-duration";
const REMEMBER_CREDENTIALS_KEY = "auth-remember-credentials";
const LEGACY_REMEMBER_EMAIL_ENABLED_KEY = "auth-remember-email-enabled";
const LEGACY_REMEMBER_EMAIL_VALUE_KEY = "auth-remember-email-value";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function clearRememberedCredentials() {
  try {
    localStorage.removeItem(REMEMBER_CREDENTIALS_KEY);
    localStorage.removeItem(LEGACY_REMEMBER_EMAIL_VALUE_KEY);
  } catch {
    // ignore storage failures
  }
}

function readRememberEnabled(): boolean {
  try {
    const saved = localStorage.getItem(REMEMBER_ENABLED_KEY);
    if (saved === null) {
      const legacySaved = localStorage.getItem(LEGACY_REMEMBER_EMAIL_ENABLED_KEY);
      return legacySaved === null ? true : legacySaved === "true";
    }
    return saved === null ? true : saved === "true";
  } catch {
    return true;
  }
}

function readRememberDuration(): RememberDuration {
  try {
    const saved = localStorage.getItem(REMEMBER_DURATION_KEY);
    return saved === "forever" ? "forever" : "7d";
  } catch {
    return "7d";
  }
}

function readRememberedCredentials(enabled: boolean): Pick<RememberedCredentials, "email" | "password"> {
  if (!enabled) return { email: "", password: "" };
  try {
    const raw = localStorage.getItem(REMEMBER_CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<RememberedCredentials>;
      const expiresAt = typeof parsed.expiresAt === "number" ? parsed.expiresAt : null;
      if (expiresAt !== null && Date.now() > expiresAt) {
        clearRememberedCredentials();
        return { email: "", password: "" };
      }
      return {
        email: typeof parsed.email === "string" ? parsed.email : "",
        password: typeof parsed.password === "string" ? parsed.password : "",
      };
    }

    const legacyEmail = localStorage.getItem(LEGACY_REMEMBER_EMAIL_VALUE_KEY) || "";
    return { email: legacyEmail, password: "" };
  } catch {
    return { email: "", password: "" };
  }
}

function buildRememberPayload(
  email: string,
  password: string,
  duration: RememberDuration,
): RememberedCredentials {
  return {
    email,
    password,
    expiresAt: duration === "forever" ? null : Date.now() + SEVEN_DAYS_MS,
  };
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
  const initialRememberEnabled = readRememberEnabled();
  const initialRememberDuration = readRememberDuration();
  const initialRemembered = readRememberedCredentials(initialRememberEnabled);
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
  const [email, setEmail] = useState(initialRemembered.email);
  const [password, setPassword] = useState(() => (initialMode === "login" ? initialRemembered.password : ""));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rememberCredentials, setRememberCredentials] = useState(initialRememberEnabled);
  const [rememberDuration, setRememberDuration] = useState<RememberDuration>(initialRememberDuration);
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
      localStorage.setItem(REMEMBER_ENABLED_KEY, rememberCredentials ? "true" : "false");
      localStorage.setItem(REMEMBER_DURATION_KEY, rememberDuration);
      if (!rememberCredentials) {
        clearRememberedCredentials();
      }
    } catch {
      // ignore storage failures
    }
  }, [rememberCredentials, rememberDuration]);

  const goToLogin = () => {
    setMode("login");
    setConfirmPassword("");
    const remembered = readRememberedCredentials(rememberCredentials);
    setEmail(remembered.email);
    setPassword(remembered.password);
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
          if (rememberCredentials) {
            const payload = buildRememberPayload(trimmedEmail, password, rememberDuration);
            localStorage.setItem(REMEMBER_CREDENTIALS_KEY, JSON.stringify(payload));
            localStorage.removeItem(LEGACY_REMEMBER_EMAIL_VALUE_KEY);
          } else {
            clearRememberedCredentials();
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberCredentials"
                      checked={rememberCredentials}
                      onCheckedChange={(checked) => setRememberCredentials(checked === true)}
                    />
                    <Label htmlFor="rememberCredentials" className="font-normal">
                      {t("auth.remember")}
                    </Label>
                  </div>
                  {rememberCredentials && (
                    <ToggleGroup
                      type="single"
                      value={rememberDuration}
                      onValueChange={(value) => {
                        if (value === "7d" || value === "forever") {
                          setRememberDuration(value);
                        }
                      }}
                      size="sm"
                      variant="outline"
                    >
                      <ToggleGroupItem value="7d" aria-label={t("auth.remember7Days")}>
                        {t("auth.remember7Days")}
                      </ToggleGroupItem>
                      <ToggleGroupItem value="forever" aria-label={t("auth.rememberForever")}>
                        {t("auth.rememberForever")}
                      </ToggleGroupItem>
                    </ToggleGroup>
                  )}
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
