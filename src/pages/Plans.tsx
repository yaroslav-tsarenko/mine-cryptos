import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { CtaBand } from "../components/sections/CtaBand";
import { PlanCard } from "../components/sections/PlanCard";
import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { SelectField } from "../components/ui/Field";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Tabs } from "../components/ui/Tabs";
import { DATA_CENTER_BY_ID } from "../data/dataCenters";
import { FAQS } from "../data/faqs";
import { PLANS, hourlyRate, type Billing } from "../data/plans";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatNumber, formatUsd } from "../lib/format";
import styles from "./Plans.module.css";

const COINS = ["All", "BTC", "LTC", "KAS"] as const;
type CoinFilter = (typeof COINS)[number];
type Sort = "popular" | "price-asc" | "price-desc" | "rating";

export default function Plans() {
  useDocumentMeta({
    title: "Mining Plans",
    description: "Compare MineCryptos cloud mining plans for Bitcoin, Litecoin + Dogecoin and Kaspa. Monthly or hourly billing, daily payouts.",
  });
  const [params, setParams] = useSearchParams();
  const coinParam = params.get("coin")?.toUpperCase();
  const coin: CoinFilter = (COINS as readonly string[]).includes(coinParam ?? "") ? (coinParam as CoinFilter) : "All";
  const [billing, setBilling] = useState<Billing>("monthly");
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const filtered = PLANS.filter((p) => coin === "All" || p.coin === coin);
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.priceMonthly - b.priceMonthly);
    if (sort === "price-desc") sorted.sort((a, b) => b.priceMonthly - a.priceMonthly);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [coin, sort]);

  const setCoin = (c: CoinFilter) => {
    const next = new URLSearchParams(params);
    if (c === "All") next.delete("coin");
    else next.set("coin", c);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Mining Plans" }]}
        title="Discover Your Mining Solutions"
        description="Welcome to MineCryptos' plan listing, where we unveil a treasure trove of cryptocurrency mining solutions. From hosting services to dedicated racks, our range caters to miners of all levels. Unearth your potential with MineCryptos' premium plans."
      >
        <Button to="/calculator" variant="white" iconLeft="calculator">
          Estimate profit first
        </Button>
        <Button to="#compare" variant="ghost">
          Compare plans
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.chips} role="group" aria-label="Filter by coin">
              {COINS.map((c) => (
                <button key={c} type="button" className={cx(styles.chip, coin === c && styles.chipActive)} aria-pressed={coin === c} onClick={() => setCoin(c)}>
                  {c === "All" ? "All coins" : c}
                </button>
              ))}
            </div>
            <div className={styles.controls}>
              <Tabs
                label="Billing period"
                variant="pill"
                value={billing}
                onChange={setBilling}
                tabs={[
                  { id: "monthly", label: "Monthly" },
                  { id: "hourly", label: "Hourly" },
                ]}
              />
              <SelectField label="Sort plans" hideLabel value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={styles.sort}>
                <option value="popular">Most popular</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Best rated</option>
              </SelectField>
            </div>
          </div>
          <p className={styles.count} aria-live="polite">
            Showing {list.length} {list.length === 1 ? "plan" : "plans"}
            {billing === "hourly" && " · hourly billing includes a 15% flexibility premium"}
          </p>
          <div className={styles.grid}>
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <PlanCard plan={p} billing={billing} headingLevel={2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lavender" id="compare">
        <div className="container">
          <SectionHeading eyebrow="Side by side" title="Compare every plan" description="All plans include power, cooling, maintenance and pool fees. No hidden costs." />
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Plan comparison table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Hashrate</th>
                  <th scope="col">Power</th>
                  <th scope="col">Efficiency</th>
                  <th scope="col">Uptime</th>
                  <th scope="col">Locations</th>
                  <th scope="col">Price</th>
                  <th scope="col">
                    <span className="visually-hidden">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row">
                      {p.name}
                      {p.badge && <span className={styles.badge}>{p.badge}</span>}
                    </th>
                    <td>{p.coin}</td>
                    <td className="tabular">
                      {formatNumber(p.hashrate)} {p.unit}
                    </td>
                    <td className="tabular">{formatNumber(p.powerW)} W</td>
                    <td>{p.efficiency}</td>
                    <td>{p.uptime}</td>
                    <td className={styles.wrapCell}>{p.locations.map((l) => DATA_CENTER_BY_ID[l]?.country).join(", ")}</td>
                    <td className="tabular">
                      <strong>{billing === "monthly" ? `${formatUsd(p.priceMonthly)}/mo` : `${formatUsd(hourlyRate(p), { decimals: 3 })}/h`}</strong>
                    </td>
                    <td>
                      <Button to={`/plans/${p.slug}`} size="sm" variant="outline">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={styles.included}>
            {["Daily payouts, no minimum", "Free pool fees", "24/7 on-site engineers", "Cancel within 14 days"].map((t) => (
              <li key={t}>
                <Icon name="check-circle" size={18} /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.faq}`}>
          <SectionHeading
            title="Frequently Asked Questions"
            action={
              <Button to="/faq" variant="outline">
                Go to FAQ
              </Button>
            }
          />
          <Accordion
            defaultOpen="0"
            items={FAQS.filter((f) => f.category === "Plans & Billing" || f.category === "Getting Started")
              .slice(0, 5)
              .map((f, i) => ({ id: String(i), title: f.q, content: f.a }))}
          />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
