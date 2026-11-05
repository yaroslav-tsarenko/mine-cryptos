import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { cx } from "../../lib/cx";
import { Icon } from "../ui/Icon";
import { OPEN_CHAT_EVENT } from "./chatBus";
import styles from "./SupportChat.module.css";

type Msg = { id: number; from: "bot" | "me"; text: string; link?: { to: string; label: string } };

const QUICK = ["How do payouts work?", "Which plan should I pick?", "Is my data secure?", "Talk to a human"];

function reply(input: string): Omit<Msg, "id" | "from"> {
  const q = input.toLowerCase();
  if (/payout|withdraw|paid|wallet/.test(q))
    return { text: "Rewards are settled to your wallet every 24 hours with no minimum threshold. You can track every payout in your dashboard.", link: { to: "/dashboard/payouts", label: "Open payouts" } };
  if (/plan|pick|choose|best|price|cost/.test(q))
    return { text: "Most new miners start with HashPower Hub — 200 TH/s at 17.5 J/TH. Try the calculator to compare plans with your own numbers.", link: { to: "/calculator", label: "Open calculator" } };
  if (/secur|safe|hack|2fa|data/.test(q))
    return { text: "Facilities have biometric access and 24/7 guards; accounts support 2FA and withdrawal allow-lists.", link: { to: "/faq", label: "Security FAQ" } };
  if (/human|agent|person|call|email|contact/.test(q))
    return { text: "Of course! Leave your details on the contact page and a mining expert will get back to you within one business hour.", link: { to: "/contact", label: "Contact the team" } };
  if (/refer|friend|commission/.test(q))
    return { text: "Invite friends and earn 3–8% commission on their hashpower purchases.", link: { to: "/referral", label: "Referral program" } };
  return { text: "Great question! I'm a demo assistant, so my answers are limited — our FAQ covers most topics in detail.", link: { to: "/faq", label: "Browse the FAQ" } };
}

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, from: "bot", text: "Hi, I'm Nesty, your MineCryptos assistant. How can I help you today?" },
  ]);
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: idRef.current++, from: "me", text: clean }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, from: "bot", ...reply(clean) }]);
      setTyping(false);
    }, 800 + Math.min(clean.length * 12, 800));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <div className={styles.root}>
      <section className={cx(styles.panel, open && styles.open)} aria-label="Support chat" inert={!open}>
        <header className={styles.head}>
          <span className={styles.avatar} aria-hidden="true">
            <Icon name="sparkles" size={18} />
          </span>
          <div>
            <strong>MineCryptos Support</strong>
            <span className={styles.online}>Demo assistant · replies instantly</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className={styles.x}>
            <Icon name="close" size={18} />
          </button>
        </header>
        <div className={styles.list} ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={cx(styles.msg, m.from === "me" ? styles.me : styles.bot)}>
              <p>{m.text}</p>
              {m.link && (
                <Link to={m.link.to} onClick={() => setOpen(false)} className={styles.msgLink}>
                  {m.link.label} <Icon name="arrow-right" size={14} />
                </Link>
              )}
            </div>
          ))}
          {typing && (
            <div className={cx(styles.msg, styles.bot, styles.typing)} aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
        <div className={styles.quick}>
          {QUICK.map((q) => (
            <button key={q} type="button" onClick={() => send(q)} disabled={typing}>
              {q}
            </button>
          ))}
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="visually-hidden">
            Type your message
          </label>
          <input id="chat-input" ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your message…" autoComplete="off" maxLength={300} />
          <button type="submit" aria-label="Send message" disabled={!draft.trim() || typing}>
            <Icon name="send" size={18} />
          </button>
        </form>
      </section>
      <button type="button" className={cx(styles.fab, open && styles.fabOpen)} onClick={() => setOpen((o) => !o)} aria-label={open ? "Close support chat" : "Open support chat"} aria-expanded={open}>
        <Icon name={open ? "close" : "chat"} size={26} />
        {!open && <span className={styles.dot} aria-hidden="true" />}
      </button>
    </div>
  );
}
