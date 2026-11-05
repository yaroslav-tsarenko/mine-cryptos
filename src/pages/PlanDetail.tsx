import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import { PlansSection } from "../components/sections/PlansSection";
import { Avatar } from "../components/ui/Avatar";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { SelectField, TextArea, TextField } from "../components/ui/Field";
import { Icon } from "../components/ui/Icon";
import { QuantityStepper } from "../components/ui/QuantityStepper";
import { Reveal } from "../components/ui/Reveal";
import { Stars } from "../components/ui/Stars";
import { Tabs } from "../components/ui/Tabs";
import { useToast } from "../components/ui/useToast";
import { CheckoutModal } from "../components/widgets/CheckoutModal";
import { MINING_COINS } from "../data/coins";
import { DATA_CENTER_BY_ID } from "../data/dataCenters";
import { HOURLY_DURATIONS, MONTHLY_DURATIONS, PLAN_BY_SLUG, hourlyRate, type Billing, type Plan } from "../data/plans";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatNumber, formatUsd } from "../lib/format";
import { computeProfit } from "../lib/mining";
import { fakeRequest, validateEmail } from "../lib/validate";
import { useMarket } from "../store/market";
import NotFound from "./NotFound";
import styles from "./PlanDetail.module.css";

type Review = { name: string; rating: number; text: string; date: string };

const SEED_REVIEWS: Review[] = [
  { name: "James Carter", rating: 5, text: "Setup took minutes and the first payout arrived the next morning. Dashboard stats are spot on.", date: "Oct 30, 2026" },
  { name: "Mei Lin", rating: 5, text: "Love being able to switch to hourly billing when I want to experiment. Support is fast and friendly.", date: "Oct 18, 2026" },
  { name: "Tomás García", rating: 4, text: "Great uptime so far. Would love even more data center options, but overall very happy.", date: "Sep 27, 2026" },
];

export default function PlanDetail() {
  const { slug = "" } = useParams();
  const plan = PLAN_BY_SLUG[slug];
  if (!plan) return <MissingPlan />;
  return <PlanView key={plan.slug} plan={plan} />;
}

function MissingPlan() {
  return <NotFound title="We couldn't find that mining plan" message="It may have been retired or renamed. Browse all current plans instead." />;
}

function PlanView({ plan }: { plan: Plan }) {
  useDocumentMeta({ title: `${plan.name} — ${plan.hashrate} ${plan.unit} ${plan.coin} Mining Plan`, description: `${plan.tagline}. ${plan.description.slice(0, 120)}…` });
  const [billing, setBilling] = useState<Billing>("monthly");
  const [monthIdx, setMonthIdx] = useState(0);
  const [hourIdx, setHourIdx] = useState(2);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"spec" | "enquiries" | "reviews">("spec");
  const [checkout, setCheckout] = useState(false);
  const market = useMarket();

  const miningCoin = MINING_COINS.find((c) => c.symbol === plan.coin)!;
  const price = market[plan.coin].price;
  const est = computeProfit({ coin: miningCoin, price, hashrate: plan.hashrate * qty, electricity: 0, poolFee: 0, days: 1, difficultyGrowth: 0, contract: false });

  let subtotal: number;
  let discount = 0;
  let durationLabel: string;
  if (billing === "monthly") {
    const d = MONTHLY_DURATIONS[monthIdx];
    subtotal = plan.priceMonthly * d.months * qty;
    discount = subtotal * d.discount;
    durationLabel = d.label;
  } else {
    const d = HOURLY_DURATIONS[hourIdx];
    subtotal = hourlyRate(plan) * d.hours * qty;
    durationLabel = d.label;
  }
  const total = subtotal - discount;

  return (
    <>
      <section className={styles.top}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Mining Plans", to: "/plans" }, { label: plan.name }]} />
        </div>
      </section>

      <section className={`container ${styles.product}`}>
        <Reveal className={cx(styles.media, plan.imageFit === "cover" && styles.cover)}>
          <img src={plan.image} alt={`${plan.name} illustration`} width={760} height={760} fetchPriority="high" />
          {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
        </Reveal>

        <div className={styles.info}>
          <div className={styles.rating}>
            <Stars value={plan.rating} />
            <a href="#plan-tabs" onClick={() => setTab("reviews")}>
              {plan.rating.toFixed(1)} · {formatNumber(plan.reviews)} reviews
            </a>
          </div>
          <h1 className={styles.title}>{plan.name}</h1>
          <h2 className={styles.specs}>
            {plan.algorithm} Algorithm Mining Server {formatNumber(plan.hashrate)} {plan.unit} | {formatNumber(plan.powerW)} W | {plan.efficiency}
          </h2>
          <p className="copy">{plan.description}</p>

          <div className={styles.buy}>
            <Tabs
              label="Billing period"
              value={billing}
              onChange={setBilling}
              variant="pill"
              tabs={[
                { id: "monthly", label: "Monthly" },
                { id: "hourly", label: "Hourly" },
              ]}
            />
            <div className={styles.buyRow}>
              {billing === "monthly" ? (
                <SelectField label="Duration" value={monthIdx} onChange={(e) => setMonthIdx(Number(e.target.value))}>
                  {MONTHLY_DURATIONS.map((d, i) => (
                    <option key={d.months} value={i}>
                      {d.label}
                      {d.discount ? ` (save ${d.discount * 100}%)` : ""}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <SelectField label="Duration" value={hourIdx} onChange={(e) => setHourIdx(Number(e.target.value))}>
                  {HOURLY_DURATIONS.map((d, i) => (
                    <option key={d.hours} value={i}>
                      {d.label}
                    </option>
                  ))}
                </SelectField>
              )}
              <div className={styles.qty}>
                <span className={styles.qtyLabel} id="qty-label">
                  Quantity
                </span>
                <QuantityStepper value={qty} onChange={setQty} label="Quantity" max={20} />
              </div>
            </div>

            <dl className={styles.summary}>
              <div>
                <dt>Hashpower</dt>
                <dd>
                  {formatNumber(plan.hashrate * qty)} {plan.unit}
                </dd>
              </div>
              <div>
                <dt>Rate</dt>
                <dd>{billing === "monthly" ? `${formatUsd(plan.priceMonthly)} / month` : `${formatUsd(hourlyRate(plan), { decimals: 3 })} / hour`}</dd>
              </div>
              {discount > 0 && (
                <div className={styles.save}>
                  <dt>Duration discount</dt>
                  <dd>−{formatUsd(discount)}</dd>
                </div>
              )}
              <div>
                <dt>Est. daily output*</dt>
                <dd>
                  {est.dailyCoins.toFixed(plan.coin === "BTC" ? 6 : 3)} {plan.coin} ≈ {formatUsd(est.dailyRevenue)}
                </dd>
              </div>
              <div className={styles.total}>
                <dt>Total</dt>
                <dd className="tabular">{formatUsd(total)}</dd>
              </div>
            </dl>
            <Button block size="lg" onClick={() => setCheckout(true)} icon="arrow-right">
              Buy hashpower
            </Button>
            <p className={styles.fine}>20% VAT applicable on UK-based products. *Estimate uses demo prices and today's difficulty; returns are not guaranteed.</p>
          </div>

          <ul className={styles.perks}>
            <li>
              <Icon name="shield" size={18} /> {plan.uptime} uptime SLA
            </li>
            <li>
              <Icon name="wallet" size={18} /> Daily payouts
            </li>
            <li>
              <Icon name="refresh" size={18} /> 14-day cancellation
            </li>
          </ul>
        </div>
      </section>

      <section className="section" id="plan-tabs">
        <div className="container">
          <Tabs
            label="Plan information"
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "spec", label: "Specification" },
              { id: "enquiries", label: "Enquiries" },
              { id: "reviews", label: `Reviews (${formatNumber(plan.reviews)})` },
            ]}
          />
          <div className={styles.panel} role="tabpanel">
            {tab === "spec" && <SpecTab plan={plan} />}
            {tab === "enquiries" && <EnquiryTab plan={plan} />}
            {tab === "reviews" && <ReviewsTab plan={plan} />}
          </div>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container grid-2">
          <Reveal className={styles.fortressText}>
            <span className="eyebrow">Fortress of Security</span>
            <h2 className="h2">Safeguarding Your Mining Assets</h2>
            <p className="lead">
              In the ever-evolving landscape of cryptocurrency mining, the Fortress of Security at MineCryptos stands as a sentinel, dedicated to
              safeguarding your mining assets. Our hosting facilities use state-of-the-art security systems, robust encryption and constant threat
              monitoring. With regular audits, compliance adherence and multi-factor authentication, your assets are protected within the walls of our
              fortress.
            </p>
            <div className={styles.sites}>
              <strong>Hosted in</strong>
              {plan.locations.map((id) => {
                const dc = DATA_CENTER_BY_ID[id];
                return (
                  <Link key={id} to={`/data-centers?site=${id}`} className={styles.site}>
                    <Icon name="map-pin" size={14} /> {dc.city}, {dc.country}
                  </Link>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img src="/images/art-secure-server.webp" alt="" loading="lazy" width={800} height={668} className={styles.fortressImg} />
          </Reveal>
        </div>
      </section>

      <PlansSection title="You May Also Like" excludeSlug={plan.slug} />

      <CheckoutModal
        open={checkout}
        onClose={() => setCheckout(false)}
        order={{
          planName: plan.name,
          hashrateLabel: `${formatNumber(plan.hashrate * qty)} ${plan.unit}`,
          durationLabel,
          quantity: qty,
          subtotal,
          discount,
          total,
        }}
      />
    </>
  );
}

function SpecTab({ plan }: { plan: Plan }) {
  return (
    <div className={styles.spec}>
      <dl className={styles.specList}>
        {plan.features.map((f) => (
          <div key={f.title}>
            <dt>{f.title}</dt>
            <dd>{f.text}</dd>
          </div>
        ))}
      </dl>
      <dl className={styles.specFacts}>
        {[
          ["Algorithm", plan.algorithm],
          ["Coin", plan.coin === "LTC" ? "LTC + DOGE (merge-mined)" : plan.coin],
          ["Hashrate", `${formatNumber(plan.hashrate)} ${plan.unit}`],
          ["Power draw", `${formatNumber(plan.powerW)} W`],
          ["Efficiency", plan.efficiency],
          ["Uptime SLA", plan.uptime],
          ["Payouts", "Daily, no minimum"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function EnquiryTab({ plan }: { plan: Plan }) {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState<{ email?: string; question?: string }>({});
  const [busy, setBusy] = useState(false);
  const { notify } = useToast();
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = { email: validateEmail(email), question: question.trim().length < 10 ? "Please write at least 10 characters." : undefined };
    setErrors(errs);
    if (errs.email || errs.question) return;
    setBusy(true);
    await fakeRequest(true);
    setBusy(false);
    setQuestion("");
    notify({ title: "Enquiry sent", description: `Our ${plan.name} specialists will reply to ${email}.` });
  };
  return (
    <form className={styles.enquiry} onSubmit={submit} noValidate>
      <p className="copy">Have a question about {plan.name}? Ask our engineers — we usually reply within one business hour.</p>
      <TextField label="Your email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="name@example.com" autoComplete="email" />
      <TextArea label="Your question" required value={question} onChange={(e) => setQuestion(e.target.value)} error={errors.question} placeholder="e.g. Can I split payouts between two wallets?" />
      <div>
        <Button type="submit" loading={busy}>
          Send enquiry
        </Button>
      </div>
    </form>
  );
}

function ReviewsTab({ plan }: { plan: Plan }) {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string>();
  const { notify } = useToast();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || text.trim().length < 10) {
      setError("Please add your name and a review of at least 10 characters.");
      return;
    }
    setError(undefined);
    setReviews((r) => [{ name: name.trim(), rating, text: text.trim(), date: "Just now" }, ...r]);
    setName("");
    setText("");
    notify({ title: "Thanks for your review!", description: "It's shown below (demo only — not saved)." });
  };
  const dist = [72, 19, 6, 2, 1];
  return (
    <div className={styles.reviews}>
      <aside className={styles.reviewSummary}>
        <strong className={styles.bigRating}>{plan.rating.toFixed(1)}</strong>
        <Stars value={plan.rating} size={20} />
        <span className="muted">{formatNumber(plan.reviews)} verified reviews</span>
        <ul>
          {dist.map((pct, i) => (
            <li key={i}>
              <span>{5 - i}★</span>
              <span className={styles.bar}>
                <span style={{ width: `${pct}%` }} />
              </span>
              <span>{pct}%</span>
            </li>
          ))}
        </ul>
      </aside>
      <div className={styles.reviewList}>
        <form className={styles.reviewForm} onSubmit={submit} noValidate>
          <strong>Write a review</strong>
          <div className={styles.starPick} role="radiogroup" aria-label="Your rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => setRating(n)} className={n <= rating ? styles.starOn : undefined}>
                <Icon name="star" size={24} />
              </button>
            ))}
          </div>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
          <TextArea label="Review" value={text} onChange={(e) => setText(e.target.value)} placeholder="How has mining with this plan been?" rows={3} />
          {error && <p className={styles.formError}>{error}</p>}
          <div>
            <Button type="submit" variant="outline" size="sm">
              Post review
            </Button>
          </div>
        </form>
        {reviews.map((r, i) => (
          <article key={`${r.name}-${i}`} className={styles.review}>
            <header>
              <Avatar name={r.name} size={40} />
              <div>
                <strong>{r.name}</strong>
                <span className="muted">{r.date}</span>
              </div>
              <Stars value={r.rating} />
            </header>
            <p className="copy">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
