import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/Button";
import { Checkbox, TextField } from "../components/ui/Field";
import { Icon } from "../components/ui/Icon";
import { useToast } from "../components/ui/useToast";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { PASSWORD_RULES, scorePassword } from "../lib/password";
import { fakeRequest, required, validateEmail } from "../lib/validate";
import { AuthShell } from "./AuthShell";
import styles from "./Auth.module.css";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

export default function Signup() {
  useDocumentMeta({ title: "Create Your Account", description: "Join 48,000+ miners. Create a free MineCryptos account and start mining Bitcoin, Litecoin and Kaspa in minutes." });
  const [params] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [referral, setReferral] = useState(params.get("ref") ?? "");
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const [news, setNews] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();
  const strength = scorePassword(password);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {
      name: required(name, "Full name"),
      email: validateEmail(email),
      password: strength.passed < 3 ? "Please choose a stronger password (meet at least 3 of the rules)." : undefined,
      confirm: confirm !== password || !confirm ? "Passwords don't match." : undefined,
      terms: terms ? undefined : "You need to accept the terms to create an account.",
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setBusy(true);
    await fakeRequest(true, 1200);
    setBusy(false);
    notify({ title: `Welcome aboard, ${name.trim().split(" ")[0]}!`, description: "Your demo account is ready. Let's set up your first miner." });
    navigate("/dashboard");
  };

  return (
    <AuthShell
      title="Start your journey"
      subtitle={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form className={styles.form} onSubmit={submit} noValidate>
        <TextField label="Full name" required autoComplete="name" placeholder="Jane Miner" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <TextField label="Email" type="email" required autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField
          label="Password"
          type={show ? "text" : "password"}
          required
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          trailing={
            <button type="button" className={styles.eye} onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
              <Icon name={show ? "eye-off" : "eye"} size={18} />
            </button>
          }
        />
        <div className={styles.strength} aria-live="polite">
          <div className={styles.meter} aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} style={{ background: password && strength.score >= i ? strength.color : undefined }} />
            ))}
          </div>
          {password && (
            <span className={styles.strengthLabel} style={{ color: strength.color }}>
              Password strength: {strength.label}
            </span>
          )}
          <ul className={styles.rules}>
            {PASSWORD_RULES.map((r) => {
              const ok = r.test(password);
              return (
                <li key={r.id} className={cx(ok && styles.ruleOk)}>
                  <Icon name={ok ? "check-circle" : "info"} size={14} /> {r.label}
                </li>
              );
            })}
          </ul>
        </div>
        <TextField label="Confirm password" type={show ? "text" : "password"} required autoComplete="new-password" placeholder="Repeat your password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        <TextField label="Referral code" placeholder="e.g. MINER-7Q2X" value={referral} onChange={(e) => setReferral(e.target.value.toUpperCase())} hint="Optional — get 5% off your first plan." />
        <Checkbox
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          label={
            <>
              I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
            </>
          }
        />
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
        <Checkbox checked={news} onChange={(e) => setNews(e.target.checked)} label="Send me mining insights and product updates" />
        <Button type="submit" block loading={busy}>
          Create account
        </Button>
        <p className="demo-note">
          <Icon name="info" size={16} /> Demo only — no account is actually created.
        </p>
      </form>
    </AuthShell>
  );
}
