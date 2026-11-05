import { useState, type FormEvent } from "react";
import { useLocation } from "react-router";
import { Button } from "../../components/ui/Button";
import { SelectField, TextField, Toggle } from "../../components/ui/Field";
import { Tabs } from "../../components/ui/Tabs";
import { useToast } from "../../components/ui/useToast";
import { FakeQr } from "../../components/widgets/FakeQr";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { fakeRequest, required, validateEmail } from "../../lib/validate";
import styles from "./Dashboard.module.css";
import s from "./Settings.module.css";

type Tab = "profile" | "security" | "wallets" | "notifications";

export default function Settings() {
  useDocumentMeta({ title: "Settings", description: "Manage your MineCryptos account settings." });
  const { hash } = useLocation();
  const [tab, setTab] = useState<Tab>(hash === "#notifications" ? "notifications" : "profile");
  return (
    <div className={s.page}>
      <Tabs
        label="Settings sections"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: "profile", label: "Profile" },
          { id: "security", label: "Security" },
          { id: "wallets", label: "Payout wallets" },
          { id: "notifications", label: "Notifications" },
        ]}
      />
      <div role="tabpanel" id={tab}>
        {tab === "profile" && <Profile />}
        {tab === "security" && <Security />}
        {tab === "wallets" && <Wallets />}
        {tab === "notifications" && <Notifications />}
      </div>
    </div>
  );
}

function useSave(message: string) {
  const { notify } = useToast();
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    await fakeRequest(true, 800);
    setBusy(false);
    notify({ title: "Saved", description: message });
  };
  return { busy, save };
}

function Profile() {
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [country, setCountry] = useState("GB");
  const [currency, setCurrency] = useState("USD");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const { busy, save } = useSave("Your profile has been updated.");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = { name: required(name, "Name"), email: validateEmail(email) };
    setErrors(errs);
    if (!errs.name && !errs.email) void save();
  };
  return (
    <form className={styles.panel} onSubmit={submit} noValidate>
      <h2 className={s.title}>Profile</h2>
      <div className={s.grid}>
        <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} autoComplete="name" />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="email" />
        <SelectField label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="AE">United Arab Emirates</option>
          <option value="SG">Singapore</option>
          <option value="CA">Canada</option>
        </SelectField>
        <SelectField label="Display currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD — US Dollar</option>
        </SelectField>
      </div>
      <div>
        <Button type="submit" loading={busy}>
          Save changes
        </Button>
      </div>
    </form>
  );
}

function Security() {
  const { notify } = useToast();
  const [twoFa, setTwoFa] = useState(false);
  const [setup, setSetup] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [allowList, setAllowList] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on macOS", place: "London, UK", current: true },
    { id: 2, device: "Safari on iPhone", place: "London, UK", current: false },
    { id: 3, device: "Firefox on Windows", place: "Berlin, DE", current: false },
  ]);

  const enable = () => {
    if (!/^\d{6}$/.test(code)) return setCodeError("Enter the 6-digit code from your authenticator app.");
    setCodeError(undefined);
    setTwoFa(true);
    setSetup(false);
    setCode("");
    notify({ title: "Two-factor authentication enabled", description: "Your account is now better protected." });
  };

  return (
    <div className={s.stack}>
      <section className={styles.panel}>
        <h2 className={s.title}>Two-factor authentication</h2>
        <Toggle
          label="Authenticator app (TOTP)"
          description={twoFa ? "Enabled — codes are required to sign in and withdraw." : "Add a second step to sign-ins and withdrawals."}
          checked={twoFa || setup}
          onChange={(v) => {
            if (v) setSetup(true);
            else {
              setTwoFa(false);
              setSetup(false);
              notify({ kind: "info", title: "2FA disabled", description: "We recommend keeping 2FA on." });
            }
          }}
        />
        {setup && !twoFa && (
          <div className={s.setup}>
            <FakeQr value="otpauth://totp/MineCryptos:alex" size={132} />
            <div className={s.setupText}>
              <p>Scan this code with Google Authenticator or 1Password, then enter the 6-digit code.</p>
              <TextField label="Verification code" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} error={codeError} hint="Demo: any 6 digits work." autoComplete="one-time-code" />
              <div className={s.row}>
                <Button size="sm" onClick={enable}>
                  Verify & enable
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSetup(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        <Toggle label="Withdrawal address allow-list" description="Only allow withdrawals to saved addresses." checked={allowList} onChange={setAllowList} />
      </section>
      <section className={styles.panel}>
        <h2 className={s.title}>Active sessions</h2>
        <ul className={s.sessions}>
          {sessions.map((x) => (
            <li key={x.id}>
              <div>
                <strong>{x.device}</strong>
                <span>
                  {x.place}
                  {x.current && " · this device"}
                </span>
              </div>
              {!x.current && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSessions((all) => all.filter((y) => y.id !== x.id));
                    notify({ title: "Session signed out", description: x.device });
                  }}
                >
                  Sign out
                </Button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const WALLET_RULES: Record<string, RegExp> = {
  BTC: /^(bc1[a-z0-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/,
  LTC: /^(ltc1[a-z0-9]{25,62}|[LM3][a-km-zA-HJ-NP-Z1-9]{26,33})$/,
  KAS: /^kaspa:[a-z0-9]{55,70}$/,
};

function Wallets() {
  const [wallets, setWallets] = useState<Record<string, string>>({ BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", LTC: "", KAS: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { busy, save } = useSave("Payout wallets updated. Changes apply after a 24-hour security window.");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = Object.fromEntries(Object.entries(wallets).map(([c, v]) => [c, v && !WALLET_RULES[c].test(v.trim()) ? `Enter a valid ${c} address or leave empty.` : undefined]));
    setErrors(errs);
    if (!Object.values(errs).some(Boolean)) void save();
  };
  return (
    <form className={styles.panel} onSubmit={submit} noValidate>
      <h2 className={s.title}>Payout wallets</h2>
      <p className="copy">Daily rewards are sent to these addresses. Leave a coin empty to keep rewards on your MineCryptos balance.</p>
      {Object.keys(wallets).map((c) => (
        <TextField key={c} label={`${c} address`} value={wallets[c]} onChange={(e) => setWallets((w) => ({ ...w, [c]: e.target.value }))} error={errors[c]} spellCheck={false} placeholder={c === "KAS" ? "kaspa:…" : c === "LTC" ? "ltc1…" : "bc1…"} />
      ))}
      <div>
        <Button type="submit" loading={busy}>
          Save wallets
        </Button>
      </div>
    </form>
  );
}

function Notifications() {
  const [prefs, setPrefs] = useState({ payouts: true, workers: true, news: false, referrals: true, security: true });
  const { busy, save } = useSave("Notification preferences saved.");
  const items: { key: keyof typeof prefs; label: string; description: string }[] = [
    { key: "payouts", label: "Payout receipts", description: "Email me when a payout is sent." },
    { key: "workers", label: "Worker alerts", description: "Alert me when a worker goes offline or overheats." },
    { key: "referrals", label: "Referral activity", description: "Tell me when a friend joins or purchases." },
    { key: "security", label: "Security alerts", description: "New sign-ins and wallet changes (recommended)." },
    { key: "news", label: "Product news", description: "Occasional updates about new plans and features." },
  ];
  return (
    <section className={styles.panel} id="notifications">
      <h2 className={s.title}>Notifications</h2>
      <div>
        {items.map((i) => (
          <Toggle key={i.key} label={i.label} description={i.description} checked={prefs[i.key]} onChange={(v) => setPrefs((p) => ({ ...p, [i.key]: v }))} />
        ))}
      </div>
      <div>
        <Button onClick={save} loading={busy}>
          Save preferences
        </Button>
      </div>
    </section>
  );
}
