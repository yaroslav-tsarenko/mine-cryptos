import { useState } from "react";
import { useNavigate } from "react-router";
import { formatUsd } from "../../lib/format";
import { createRng, hashString } from "../../lib/random";
import { fakeRequest, validateEmail } from "../../lib/validate";
import { cx } from "../../lib/cx";
import { Button } from "../ui/Button";
import { Checkbox, TextField } from "../ui/Field";
import { Icon } from "../ui/Icon";
import { Modal } from "../ui/Modal";
import { useToast } from "../ui/useToast";
import { FakeQr } from "./FakeQr";
import styles from "./CheckoutModal.module.css";
import { copyText } from "../../lib/clipboard";

export type OrderSummary = {
  planName: string;
  hashrateLabel: string;
  durationLabel: string;
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
};

const METHODS = [
  { id: "BTC", label: "Bitcoin", network: "Bitcoin network" },
  { id: "USDT", label: "Tether USDT", network: "TRC-20 / ERC-20" },
  { id: "USDC", label: "USD Coin", network: "ERC-20 / Solana" },
] as const;

type Step = "review" | "payment" | "processing" | "done";
const STEP_ORDER: Step[] = ["review", "payment", "processing", "done"];

function depositAddress(method: string, seed: string) {
  const rng = createRng(hashString(method + seed));
  const chars = "023456789acdefghjklmnpqrstuvwxyz";
  const body = Array.from({ length: 34 }, () => chars[Math.floor(rng() * chars.length)]).join("");
  return method === "BTC" ? `bc1q${body.slice(0, 38)}` : `0x${body.slice(0, 40)}`;
}

export function CheckoutModal({ open, onClose, order }: { open: boolean; onClose: () => void; order: OrderSummary }) {
  const [step, setStep] = useState<Step>("review");
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("USDT");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; agree?: string }>({});
  const [orderId, setOrderId] = useState("");
  const { notify } = useToast();
  const navigate = useNavigate();
  const address = depositAddress(method, order.planName);

  const close = () => {
    onClose();
    window.setTimeout(() => setStep("review"), 300);
  };

  const pay = async () => {
    const e = { email: validateEmail(email), agree: agree ? undefined : "Please accept the terms to continue." };
    setErrors(e);
    if (e.email || e.agree) return;
    setStep("processing");
    await fakeRequest(true, 2200);
    setOrderId(`MC-${String(hashString(email + order.total)).slice(0, 6)}`);
    setStep("done");
    notify({ title: "Order confirmed", description: `${order.planName} is being allocated to your account.` });
  };

  const copy = async () => {
    try {
      await copyText(address);
      notify({ title: "Address copied", description: "Demo address — please don't send real funds." });
    } catch {
      notify({ kind: "error", title: "Copy failed", description: "Select the address and copy it manually." });
    }
  };

  const current = STEP_ORDER.indexOf(step);

  return (
    <Modal open={open} onClose={close} title={step === "done" ? "You're all set!" : "Checkout"}>
      <ol className={styles.steps} aria-label="Checkout progress">
        {["Review", "Payment", "Confirm"].map((label, i) => (
          <li key={label} className={cx(i < current && styles.stepDone, i === Math.min(current, 2) && styles.stepCurrent)}>
            <span>{i < current ? <Icon name="check" size={14} /> : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      {step === "review" && (
        <div className={styles.body}>
          <dl className={styles.summary}>
            <div>
              <dt>Plan</dt>
              <dd>{order.planName}</dd>
            </div>
            <div>
              <dt>Hashpower</dt>
              <dd>{order.hashrateLabel}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{order.durationLabel}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>× {order.quantity}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatUsd(order.subtotal)}</dd>
            </div>
            {order.discount > 0 && (
              <div className={styles.discount}>
                <dt>Duration discount</dt>
                <dd>−{formatUsd(order.discount)}</dd>
              </div>
            )}
            <div className={styles.total}>
              <dt>Total due</dt>
              <dd>{formatUsd(order.total)}</dd>
            </div>
          </dl>
          <Button block icon="arrow-right" onClick={() => setStep("payment")}>
            Continue to payment
          </Button>
        </div>
      )}

      {step === "payment" && (
        <div className={styles.body}>
          <fieldset className={styles.methods}>
            <legend>Pay with</legend>
            {METHODS.map((m) => (
              <label key={m.id} className={cx(styles.method, method === m.id && styles.methodActive)}>
                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} />
                <strong>{m.id}</strong>
                <span>{m.label}</span>
                <small>{m.network}</small>
              </label>
            ))}
          </fieldset>
          <div className={styles.deposit}>
            <FakeQr value={address} size={120} />
            <div className={styles.depositText}>
              <small>Send exactly</small>
              <strong>{formatUsd(order.total)} in {method}</strong>
              <code>{address}</code>
              <button type="button" onClick={copy} className={styles.copy}>
                <Icon name="copy" size={14} /> Copy address
              </button>
            </div>
          </div>
          <TextField label="Email for receipt" type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} error={errors.email} placeholder="name@example.com" autoComplete="email" />
          <Checkbox
            checked={agree}
            onChange={(e) => { setAgree(e.target.checked); setErrors((x) => ({ ...x, agree: undefined })); }}
            label={
              <>
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and understand mining returns are not guaranteed.
              </>
            }
          />
          {errors.agree && <p className={styles.error}>{errors.agree}</p>}
          <p className="demo-note">
            <Icon name="info" size={16} /> Demo checkout — no payment is processed.
          </p>
          <div className={styles.row}>
            <Button variant="outline" onClick={() => setStep("review")} iconLeft="arrow-left">
              Back
            </Button>
            <Button onClick={pay} className={styles.grow}>
              I've sent the payment
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <div className={styles.processing} role="status">
          <span className={styles.ring} />
          <strong>Confirming your payment…</strong>
          <p>Waiting for network confirmations. This usually takes a few seconds in demo mode.</p>
        </div>
      )}

      {step === "done" && (
        <div className={styles.done}>
          <span className={styles.check}>
            <Icon name="check" size={34} />
          </span>
          <p>
            Order <strong>{orderId}</strong> is confirmed. Your {order.hashrateLabel} of hashpower will start mining within minutes — we've sent a
            receipt to <strong>{email}</strong>.
          </p>
          <div className={styles.row}>
            <Button
              className={styles.grow}
              onClick={() => {
                close();
                navigate("/dashboard");
              }}
            >
              Go to dashboard
            </Button>
            <Button variant="outline" onClick={close}>
              Keep browsing
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
