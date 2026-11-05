import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { Checkbox, TextField } from "../components/ui/Field";
import { Icon } from "../components/ui/Icon";
import { useToast } from "../components/ui/useToast";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { fakeRequest, validateEmail } from "../lib/validate";
import { AuthShell } from "./AuthShell";
import styles from "./Auth.module.css";

export default function Login() {
  useDocumentMeta({ title: "Log In", description: "Log in to your MineCryptos account to manage hashpower, workers and payouts." });
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = { email: validateEmail(email), password: mode === "login" && !password ? "Please enter your password." : undefined };
    setErrors(errs);
    if (errs.email || errs.password) return;
    setBusy(true);
    await fakeRequest(true, 1000);
    setBusy(false);
    if (mode === "reset") {
      notify({ title: "Check your inbox", description: `If an account exists for ${email}, a reset link is on its way.` });
      setMode("login");
      return;
    }
    notify({ title: "Welcome back!", description: "You're signed in to the demo dashboard." });
    navigate("/dashboard");
  };

  const social = (provider: string) => notify({ kind: "info", title: `${provider} sign-in`, description: "Social sign-in is not available in this demo." });

  return (
    <AuthShell
      title={mode === "login" ? "Welcome back" : "Reset your password"}
      subtitle={
        mode === "login" ? (
          <>
            New to MineCryptos? <Link to="/signup">Create an account</Link>
          </>
        ) : (
          "Enter the email you signed up with and we'll send you a reset link."
        )
      }
    >
      <form className={styles.form} onSubmit={submit} noValidate>
        <TextField label="Email" type="email" required autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        {mode === "login" && (
          <TextField
            label="Password"
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            trailing={
              <button type="button" className={styles.eye} onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
                <Icon name={show ? "eye-off" : "eye"} size={18} />
              </button>
            }
          />
        )}
        {mode === "login" && (
          <div className={styles.row}>
            <Checkbox label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <button type="button" className={styles.textBtn} onClick={() => setMode("reset")}>
              Forgot password?
            </button>
          </div>
        )}
        <Button type="submit" block loading={busy}>
          {mode === "login" ? "Log in" : "Send reset link"}
        </Button>
        {mode === "reset" && (
          <button type="button" className={styles.textBtn} onClick={() => setMode("login")}>
            ← Back to log in
          </button>
        )}
      </form>
      {mode === "login" && (
        <>
          <div className={styles.divider}>or continue with</div>
          <div className={styles.social}>
            <button type="button" onClick={() => social("Google")}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5Z" />
                <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5Z" />
                <path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3Z" />
                <path fill="#EA4335" d="M12 5c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3C6.5 7 9 5 12 5Z" />
              </svg>
              Google
            </button>
            <button type="button" onClick={() => social("Apple")}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9a4.8 4.8 0 0 0-3.8-2c-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9a5 5 0 0 0-4.2 2.6c-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.3 3-2.5a10 10 0 0 0 1.4-2.8 4.3 4.3 0 0 1-2.3-4.2ZM13.9 4.9A4.3 4.3 0 0 0 14.9 1.7a4.4 4.4 0 0 0-2.9 1.5 4.1 4.1 0 0 0-1 3.1 3.7 3.7 0 0 0 2.9-1.4Z" />
              </svg>
              Apple
            </button>
          </div>
          <p className={`demo-note ${styles.demo}`}>
            <Icon name="info" size={16} /> Demo: any email and password will sign you in.
          </p>
        </>
      )}
    </AuthShell>
  );
}
