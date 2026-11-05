import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { SelectField, TextField } from "../../components/ui/Field";
import { Icon } from "../../components/ui/Icon";
import { Modal } from "../../components/ui/Modal";
import { useToast } from "../../components/ui/useToast";
import { cx } from "../../lib/cx";
import { formatUsd, shortAddress } from "../../lib/format";
import { fakeRequest } from "../../lib/validate";
import { useMarket } from "../../store/market";
import { useWallet, withdraw } from "../../store/wallet";
import styles from "./WithdrawModal.module.css";

const FEES: Record<string, number> = { BTC: 0.00002, LTC: 0.001, KAS: 1 };
const MIN: Record<string, number> = { BTC: 0.0005, LTC: 0.05, KAS: 50 };
const DEC: Record<string, number> = { BTC: 8, LTC: 4, KAS: 2 };
const ADDRESS_RE: Record<string, RegExp> = {
  BTC: /^(bc1[a-z0-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/,
  LTC: /^(ltc1[a-z0-9]{25,62}|[LM3][a-km-zA-HJ-NP-Z1-9]{26,33})$/,
  KAS: /^kaspa:[a-z0-9]{55,70}$/,
};
const EXAMPLE: Record<string, string> = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  LTC: "ltc1qg82hy7w8e3e9wplh4yxs7e3cn9c8nrgxsuvh9y",
  KAS: "kaspa:qrz5en8x3m0t9frn0qv7tsl2a8vz4e3c0fqa7p4m5n6k8l9x0y2u3w4v5c6d",
};

type Step = "address" | "amount" | "confirm" | "done";

export function WithdrawModal({ open, onClose, initialCoin = "BTC" }: { open: boolean; onClose: () => void; initialCoin?: string }) {
  const wallet = useWallet();
  const market = useMarket();
  const { notify } = useToast();
  const [step, setStep] = useState<Step>("address");
  const [coin, setCoin] = useState(initialCoin);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [txid, setTxid] = useState("");

  const balance = wallet.balance[coin] ?? 0;
  const fee = FEES[coin];
  const value = Number(amount) || 0;
  const receive = Math.max(0, value - fee);
  const price = market[coin]?.price ?? 0;

  const reset = () => {
    setStep("address");
    setAddress("");
    setAmount("");
    setCode("");
    setError(undefined);
  };
  const close = () => {
    onClose();
    window.setTimeout(reset, 300);
  };

  const nextFromAddress = () => {
    if (!ADDRESS_RE[coin].test(address.trim())) {
      setError(`That doesn't look like a valid ${coin} address.`);
      return;
    }
    setError(undefined);
    setStep("amount");
  };
  const nextFromAmount = () => {
    if (!value || value < MIN[coin]) return setError(`Minimum withdrawal is ${MIN[coin]} ${coin}.`);
    if (value > balance) return setError(`You only have ${balance.toFixed(DEC[coin])} ${coin} available.`);
    setError(undefined);
    setStep("confirm");
  };
  const confirm = async () => {
    if (!/^\d{6}$/.test(code)) return setError("Enter the 6-digit code from your authenticator app.");
    setError(undefined);
    setBusy(true);
    await fakeRequest(true, 1400);
    const p = withdraw(coin, value, value * price, address.trim());
    setTxid(p.txid);
    setBusy(false);
    setStep("done");
    notify({ title: "Withdrawal submitted", description: `${receive.toFixed(DEC[coin])} ${coin} is on its way.` });
  };

  const steps = ["Address", "Amount", "Confirm"];
  const idx = ["address", "amount", "confirm", "done"].indexOf(step);

  return (
    <Modal open={open} onClose={close} title={step === "done" ? "Withdrawal submitted" : "Withdraw funds"} size="sm">
      {step !== "done" && (
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s} className={cx(i <= idx && styles.on)}>
              {s}
            </li>
          ))}
        </ol>
      )}

      {step === "address" && (
        <div className={styles.body}>
          <SelectField label="Coin" value={coin} onChange={(e) => { setCoin(e.target.value); setError(undefined); }}>
            {Object.keys(wallet.balance).map((c) => (
              <option key={c} value={c}>
                {c} — {wallet.balance[c].toFixed(DEC[c])} available
              </option>
            ))}
          </SelectField>
          <TextField label={`${coin} destination address`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={EXAMPLE[coin].slice(0, 24) + "…"} error={error} spellCheck={false} autoComplete="off" />
          <button type="button" className={styles.link} onClick={() => setAddress(EXAMPLE[coin])}>
            Use demo address
          </button>
          <Button block onClick={nextFromAddress} icon="arrow-right">
            Continue
          </Button>
        </div>
      )}

      {step === "amount" && (
        <div className={styles.body}>
          <TextField
            label={`Amount (${coin})`}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={error}
            hint={`Available: ${balance.toFixed(DEC[coin])} ${coin} · min ${MIN[coin]} ${coin}`}
            trailing={
              <button type="button" className={styles.max} onClick={() => setAmount(balance.toFixed(DEC[coin]))}>
                MAX
              </button>
            }
          />
          <div className={styles.quick}>
            {[0.25, 0.5, 0.75].map((f) => (
              <button key={f} type="button" onClick={() => setAmount((balance * f).toFixed(DEC[coin]))}>
                {f * 100}%
              </button>
            ))}
          </div>
          <dl className={styles.summary}>
            <div>
              <dt>Network fee</dt>
              <dd>
                {fee} {coin}
              </dd>
            </div>
            <div>
              <dt>You receive</dt>
              <dd>
                {receive.toFixed(DEC[coin])} {coin} ≈ {formatUsd(receive * price)}
              </dd>
            </div>
          </dl>
          <div className={styles.row}>
            <Button variant="outline" onClick={() => { setError(undefined); setStep("address"); }} iconLeft="arrow-left">
              Back
            </Button>
            <Button className={styles.grow} onClick={nextFromAmount}>
              Review
            </Button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className={styles.body}>
          <dl className={styles.summary}>
            <div>
              <dt>To</dt>
              <dd className="mono">{shortAddress(address.trim())}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>
                {value.toFixed(DEC[coin])} {coin}
              </dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd>
                {fee} {coin}
              </dd>
            </div>
            <div className={styles.total}>
              <dt>You receive</dt>
              <dd>
                {receive.toFixed(DEC[coin])} {coin}
              </dd>
            </div>
          </dl>
          <TextField label="2FA code" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="123456" error={error} hint="Demo: any 6 digits work." autoComplete="one-time-code" />
          <div className={styles.row}>
            <Button variant="outline" onClick={() => { setError(undefined); setStep("amount"); }} iconLeft="arrow-left">
              Back
            </Button>
            <Button className={styles.grow} onClick={confirm} loading={busy}>
              Confirm withdrawal
            </Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className={styles.done}>
          <span className={styles.check}>
            <Icon name="check" size={32} />
          </span>
          <p>
            <strong>
              {receive.toFixed(DEC[coin])} {coin}
            </strong>{" "}
            is being sent to <span className="mono">{shortAddress(address.trim())}</span>. It usually arrives within 30 minutes.
          </p>
          <code className={styles.tx}>{txid}</code>
          <Button block onClick={close}>
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}
