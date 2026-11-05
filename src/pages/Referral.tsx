import { useState } from "react";
import { CtaBand } from "../components/sections/CtaBand";
import { Accordion } from "../components/ui/Accordion";
import { AnimatedValue } from "../components/ui/AnimatedValue";
import { Avatar } from "../components/ui/Avatar";
import { RangeField } from "../components/ui/Field";
import { Icon, type IconName } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ReferralLink } from "../components/widgets/ReferralLink";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatUsd } from "../lib/format";
import styles from "./Referral.module.css";

const TIERS = [
  { name: "Bronze", min: 0, rate: 3, perks: ["3% commission", "Monthly payouts", "Referral dashboard"] },
  { name: "Silver", min: 5, rate: 5, perks: ["5% commission", "Weekly payouts", "Co-branded landing page"] },
  { name: "Gold", min: 20, rate: 8, perks: ["8% commission", "Daily payouts", "Dedicated partner manager"] },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "share", title: "Share your link", text: "Copy your personal link and share it with friends, followers or your community." },
  { icon: "users", title: "Friends start mining", text: "They get 5% off their first plan; you get credited when they buy hashpower." },
  { icon: "gift", title: "Earn commission", text: "Receive 3–8% of every purchase, paid in the coin your friends mine." },
];

const LEADERS = [
  { name: "CryptoCass", referrals: 214, earned: 18240 },
  { name: "HashHunter", referrals: 167, earned: 13980 },
  { name: "NodeNomad", referrals: 121, earned: 9875 },
  { name: "SatsStacker", referrals: 96, earned: 7420 },
  { name: "BlockBarista", referrals: 73, earned: 5310 },
];

export default function Referral() {
  useDocumentMeta({ title: "Referral Program", description: "Invite friends to MineCryptos and earn up to 8% commission on every hashpower purchase they make." });
  const [friends, setFriends] = useState(8);
  const [spend, setSpend] = useState(200);
  const tier = [...TIERS].reverse().find((t) => friends >= t.min)!;
  const monthly = friends * spend * (tier.rate / 100);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Referral Program" }]}
        eyebrow="Up to 8% commission"
        title="Invite Friends, Earn Hashpower"
        description="Share MineCryptos with the people you know. They get 5% off their first plan, and you earn commission on every purchase — for as long as they mine."
        art={{ src: "/images/art-eth-wallet.webp", width: 760, height: 808 }}
      />

      <section className="section">
        <div className="container">
          <Reveal className={styles.linkCard}>
            <div>
              <h2 className={styles.linkTitle}>Your referral link</h2>
              <p className="copy">This is a demo link. Sign in to get your personal code and track referrals in the dashboard.</p>
            </div>
            <ReferralLink />
          </Reveal>

          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className={styles.step}>
                <span className={styles.stepIcon}>
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="h3">{s.title}</h3>
                <p className="copy">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container grid-2">
          <div className={styles.estimator}>
            <SectionHeading title="Estimate your earnings" description="Move the sliders to see what your network could earn you each month." />
            <RangeField label="Friends who start mining" value={friends} min={1} max={60} onChange={setFriends} display={`${friends} friends`} />
            <RangeField label="Average monthly spend per friend" value={spend} min={50} max={1000} step={25} onChange={setSpend} display={formatUsd(spend)} />
          </div>
          <div className={styles.result}>
            <span className={styles.tierBadge}>{tier.name} tier · {tier.rate}%</span>
            <small>Estimated monthly commission</small>
            <AnimatedValue value={monthly} format={(n) => formatUsd(n, { decimals: 2 })} className={styles.big} />
            <small>
              That's about <AnimatedValue value={monthly * 12} format={(n) => formatUsd(n, { decimals: 0 })} className={styles.year} /> per year.
            </small>
            <p className={styles.note}>Illustrative estimate based on your inputs.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading align="center" title="Commission tiers" description="Your tier upgrades automatically as more friends start mining." />
          <div className="grid-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className={cx("card-outline", styles.tier, t.name === tier.name && styles.tierActive)}>
                  {t.name === tier.name && <span className={styles.current}>Your estimate</span>}
                  <h3 className="h3">{t.name}</h3>
                  <strong className={styles.rate}>{t.rate}%</strong>
                  <span className="muted">{t.min === 0 ? "From your first referral" : `From ${t.min} active referrals`}</span>
                  <ul>
                    {t.perks.map((p) => (
                      <li key={p}>
                        <Icon name="check" size={16} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading title="Top referrers this month" />
            <ol className={styles.board}>
              {LEADERS.map((l, i) => (
                <li key={l.name}>
                  <span className={styles.pos}>{i + 1}</span>
                  <Avatar name={l.name.replace(/([a-z])([A-Z])/g, "$1 $2")} size={40} />
                  <div>
                    <strong>{l.name}</strong>
                    <span className="muted">{l.referrals} referrals</span>
                  </div>
                  <b>{formatUsd(l.earned, { decimals: 0 })}</b>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title="Referral FAQ" />
            <Accordion
              defaultOpen="a"
              items={[
                { id: "a", title: "When is commission paid?", content: "Commission is credited when your friend's payment confirms and is paid out on your tier's schedule (monthly, weekly or daily)." },
                { id: "b", title: "Is there a limit to how much I can earn?", content: "No. There is no cap on referrals or commission. Gold partners can also negotiate custom rates." },
                { id: "c", title: "Which coin is commission paid in?", content: "Commission is paid in the coin your friend mines — BTC, LTC, DOGE or KAS — straight to your payout wallet." },
                { id: "d", title: "Can I refer myself?", content: "Self-referrals and incentivised sign-ups are not allowed and may lead to forfeited commission." },
              ]}
            />
          </div>
        </div>
      </section>
      <CtaBand title="Start earning with your network" primary={{ label: "Create free account", to: "/signup" }} secondary={{ label: "View dashboard", to: "/dashboard/referrals" }} />
    </>
  );
}
