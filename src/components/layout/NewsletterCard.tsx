import { useState, type FormEvent } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { fakeRequest, validateEmail } from "../../lib/validate";
import { Icon } from "../ui/Icon";
import { useToast } from "../ui/useToast";
import styles from "./Footer.module.css";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [subscribed, setSubscribed] = useLocalStorage("mc-newsletter", false);
  const { notify } = useToast();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setError(err);
    if (err) return;
    setBusy(true);
    await fakeRequest(true);
    setBusy(false);
    setSubscribed(true);
    setEmail("");
    notify({ title: "You're subscribed!", description: "Your 10% welcome code is on its way to your inbox." });
  };

  return (
    <div className={styles.newsletter} id="newsletter">
      <h2 className={styles.newsTitle}>Subscribe and Save with MineCryptos</h2>
      <p className={styles.newsText}>Subscribe and save 10% on every purchase with MineCryptos.</p>
      {subscribed ? (
        <div className={styles.subscribed}>
          <Icon name="check-circle" size={22} />
          <span>You're on the list. Watch your inbox for mining insights and your discount code.</span>
          <button type="button" onClick={() => setSubscribed(false)}>
            Use another email
          </button>
        </div>
      ) : (
        <form className={styles.newsForm} onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Provide your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            aria-invalid={!!error || undefined}
            aria-describedby={error ? "newsletter-error" : undefined}
          />
          <button type="submit" disabled={busy} aria-label="Subscribe">
            {busy ? <span className="spinner" aria-hidden="true" /> : <Icon name="arrow-right" size={22} />}
          </button>
        </form>
      )}
      {error && (
        <p id="newsletter-error" className={styles.newsError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
