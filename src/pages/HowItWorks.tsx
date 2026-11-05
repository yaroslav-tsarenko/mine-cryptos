import { useState } from "react";
import { CtaBand } from "../components/sections/CtaBand";
import { TriadSection } from "../components/sections/TriadSection";
import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { Icon, type IconName } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { FAQS } from "../data/faqs";
import { STEPS } from "../data/steps";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import styles from "./HowItWorks.module.css";

const STEP_LINKS = [
  { to: "/signup", label: "Create account" },
  { to: "/plans", label: "Browse plans" },
  { to: "/data-centers", label: "See our data centers" },
  { to: "/dashboard/payouts", label: "Preview payouts" },
];

const FLOW: { icon: IconName; title: string; text: string }[] = [
  { icon: "user", title: "You", text: "Buy hashpower" },
  { icon: "server", title: "Data center", text: "ASICs compute hashes" },
  { icon: "users", title: "Mining pool", text: "Shares are combined" },
  { icon: "globe", title: "Blockchain", text: "Blocks are found" },
  { icon: "wallet", title: "Your wallet", text: "Daily payout" },
];

const DAY_ONE = [
  { time: "Minute 0", title: "Account created", text: "Sign up and enable two-factor authentication." },
  { time: "Minute 10", title: "Payment confirmed", text: "Pay in BTC, USDT or USDC; confirmation is automatic." },
  { time: "Hour 1", title: "Hashing starts", text: "Machines are assigned and your workers appear online." },
  { time: "Hour 24", title: "First payout", text: "Your first day of rewards lands in your wallet." },
];

export default function HowItWorks() {
  useDocumentMeta({ title: "How It Works", description: "From sign-up to your first payout: see exactly how MineCryptos turns hashpower into daily crypto rewards." });
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "How It Works" }]}
        title="How MineCryptos Works"
        description="Cloud mining without the noise, heat or hardware headaches. You choose the hashpower — we run the machines in renewable-first data centers and pay you every day."
        art={{ src: "/images/art-server-stack.webp", width: 760, height: 699 }}
      >
        <Button to="/signup" variant="white">
          Start Your Journey
        </Button>
        <Button to="/calculator" variant="ghost">
          Estimate profit
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Four simple steps" title="Your path to daily payouts" />
          <div className={styles.stepper}>
            <div className={styles.stepList} role="tablist" aria-label="Steps" aria-orientation="vertical">
              {STEPS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="step-panel"
                  className={cx(styles.stepBtn, i === active && styles.stepActive, i < active && styles.stepDone)}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.stepNum}>{i < active ? <Icon name="check" size={16} /> : i + 1}</span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.text}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.stepPanel} id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} key={active}>
              <span className={styles.bigNum} aria-hidden="true">
                0{active + 1}
              </span>
              <span className={styles.panelIcon}>
                <Icon name={step.icon} size={30} />
              </span>
              <h3 className="h2">{step.title}</h3>
              <p className="lead">{step.detail}</p>
              <div className={styles.panelActions}>
                <Button to={STEP_LINKS[active].to} icon="arrow-right">
                  {STEP_LINKS[active].label}
                </Button>
                {active < STEPS.length - 1 && (
                  <Button variant="outline" onClick={() => setActive(active + 1)}>
                    Next step
                  </Button>
                )}
              </div>
              <div className={styles.progress} aria-hidden="true">
                <span style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container">
          <SectionHeading align="center" eyebrow="Behind the scenes" title="Where your rewards come from" description="Every payout can be traced from the machine that computed it to the block it helped mine." />
          <ol className={styles.flow}>
            {FLOW.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 120} className={styles.node}>
                <span className={styles.nodeIcon}>
                  <Icon name={f.icon} size={26} />
                </span>
                <strong>{f.title}</strong>
                <small>{f.text}</small>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading eyebrow="Timeline" title="Your first 24 hours" />
            <ol className={styles.timeline}>
              {DAY_ONE.map((d) => (
                <li key={d.time}>
                  <span className={styles.time}>{d.time}</span>
                  <div>
                    <strong>{d.title}</strong>
                    <p className="copy">{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Questions" title="Getting started FAQ" />
            <Accordion defaultOpen="0" items={FAQS.filter((f) => f.category === "Getting Started").map((f, i) => ({ id: String(i), title: f.q, content: f.a }))} />
          </div>
        </div>
      </section>

      <TriadSection />
      <CtaBand />
    </>
  );
}
