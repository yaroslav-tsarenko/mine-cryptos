import { useState } from "react";
import { useSearchParams } from "react-router";
import { PlanCard } from "../components/sections/PlanCard";
import { AnimatedValue } from "../components/ui/AnimatedValue";
import { Button } from "../components/ui/Button";
import { RangeField } from "../components/ui/Field";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Tabs } from "../components/ui/Tabs";
import { ProfitChart } from "../components/widgets/ProfitChart";
import { COIN_BY_SYMBOL, MINING_COINS, type MiningCoin } from "../data/coins";
import { PLANS } from "../data/plans";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatNumber, formatPercent, formatUsd } from "../lib/format";
import { computeProfit } from "../lib/mining";
import { useMarket } from "../store/market";
import styles from "./Calculator.module.css";

type Sym = MiningCoin["symbol"];
const DURATIONS = [30, 90, 180, 365] as const;

function initialCoin(raw: string | null): Sym {
  const s = raw?.toUpperCase();
  return (MINING_COINS.find((c) => c.symbol === s)?.symbol ?? "BTC") as Sym;
}

export default function Calculator() {
  useDocumentMeta({
    title: "Mining Profit Calculator",
    description: "Estimate daily, monthly and yearly crypto mining profit for BTC, LTC, DOGE, KAS and ETC with adjustable hashrate, power cost and difficulty.",
  });
  const [params] = useSearchParams();
  const [symbol, setSymbol] = useState<Sym>(() => initialCoin(params.get("coin")));
  const coin = MINING_COINS.find((c) => c.symbol === symbol)!;
  const [hashrateBy, setHashrateBy] = useState<Partial<Record<Sym, number>>>(() => {
    const h = Number(params.get("hashrate"));
    return Number.isFinite(h) && h > 0 ? { [initialCoin(params.get("coin"))]: h } : {};
  });
  const hashrate = Math.min(coin.max, Math.max(coin.min, hashrateBy[symbol] ?? coin.defaultHashrate));
  const [mode, setMode] = useState<"contract" | "own">("contract");
  const [days, setDays] = useState<(typeof DURATIONS)[number]>(180);
  const [electricity, setElectricity] = useState(0.07);
  const [poolFee, setPoolFee] = useState(1);
  const [growth, setGrowth] = useState(2);
  const [priceShift, setPriceShift] = useState(0);
  const market = useMarket();
  const livePrice = market[symbol].price;
  const price = livePrice * (1 + priceShift / 100);

  const r = computeProfit({ coin, price, hashrate, electricity, poolFee, days, difficultyGrowth: growth, contract: mode === "contract" });
  const plan = PLANS.find((p) => p.coin === (symbol === "DOGE" ? "LTC" : symbol));
  const money = (n: number) => formatUsd(n, { decimals: 2 });
  const tone = (n: number) => (n >= 0 ? styles.pos : styles.neg);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Profit Calculator" }]}
        title="Mining Profit Calculator"
        description="Model your mining returns before you commit. Pick a coin, dial in hashrate and costs, and see how profit evolves over the life of your contract."
        art={{ src: "/images/art-analytics.webp", width: 900, height: 648 }}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <form className={styles.inputs} onSubmit={(e) => e.preventDefault()} aria-label="Calculator inputs">
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>1. Choose a coin</h2>
              <div className={styles.coins} role="radiogroup" aria-label="Coin">
                {MINING_COINS.map((c) => {
                  const meta = COIN_BY_SYMBOL[c.symbol];
                  const q = market[c.symbol];
                  return (
                    <button
                      key={c.symbol}
                      type="button"
                      role="radio"
                      aria-checked={symbol === c.symbol}
                      className={cx(styles.coin, symbol === c.symbol && styles.coinActive)}
                      onClick={() => setSymbol(c.symbol)}
                    >
                      <span className={styles.coinDot} style={{ background: meta.color }} />
                      <strong>{c.symbol}</strong>
                      <small>{c.algorithm}</small>
                      <span className={cx("tabular", styles.coinPrice)}>{formatUsd(q.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>2. Set up your mining</h2>
              <Tabs
                label="Cost model"
                variant="pill"
                value={mode}
                onChange={setMode}
                tabs={[
                  { id: "contract", label: "MineCryptos hosted plan" },
                  { id: "own", label: "Own hardware" },
                ]}
              />
              <RangeField
                label="Hashrate"
                value={hashrate}
                min={coin.min}
                max={coin.max}
                step={coin.step}
                onChange={(v) => setHashrateBy((h) => ({ ...h, [symbol]: v }))}
                display={`${formatNumber(hashrate)} ${coin.unit}`}
                minLabel={`${coin.min} ${coin.unit}`}
                maxLabel={`${formatNumber(coin.max)} ${coin.unit}`}
              />
              <div className={styles.field}>
                <span className={styles.label}>Contract duration</span>
                <Tabs label="Contract duration" variant="pill" value={String(days)} onChange={(v) => setDays(Number(v) as (typeof DURATIONS)[number])} tabs={DURATIONS.map((d) => ({ id: String(d), label: `${d} days` }))} />
              </div>
              {mode === "own" ? (
                <RangeField label="Electricity cost" value={electricity} min={0.02} max={0.25} step={0.005} onChange={setElectricity} display={`$${electricity.toFixed(3)} / kWh`} minLabel="$0.02" maxLabel="$0.25" />
              ) : (
                <p className={styles.hint}>
                  <Icon name="info" size={16} /> Hosted plans include power, cooling and maintenance at{" "}
                  <strong>
                    {formatUsd(coin.pricePerUnitMonth)} per {coin.unit} / month
                  </strong>
                  .
                </p>
              )}
            </div>

            <details className={styles.block} open>
              <summary className={styles.blockTitle}>3. Advanced assumptions</summary>
              <div className={styles.advanced}>
                <RangeField label="Pool fee" value={poolFee} min={0} max={4} step={0.25} onChange={setPoolFee} display={`${poolFee.toFixed(2)}%`} />
                <RangeField label="Difficulty growth per month" value={growth} min={0} max={8} step={0.5} onChange={setGrowth} display={`${growth.toFixed(1)}%`} />
                <RangeField
                  label="Coin price scenario"
                  value={priceShift}
                  min={-50}
                  max={100}
                  step={5}
                  onChange={setPriceShift}
                  display={`${formatPercent(priceShift, 0)} · ${formatUsd(price)}`}
                  minLabel="−50%"
                  maxLabel="+100%"
                />
              </div>
            </details>
          </form>

          <div className={styles.results} aria-live="polite">
            <p className="demo-note">
              <Icon name="info" size={16} /> Illustrative demo data — mock prices, simplified model, not financial advice.
            </p>
            <div className={styles.kpis}>
              {[
                ["Daily profit", r.dailyProfit],
                ["Monthly profit", r.monthlyProfit],
                ["Yearly profit", r.yearlyProfit],
              ].map(([label, value]) => (
                <div key={label as string} className={styles.kpi}>
                  <small>{label}</small>
                  <AnimatedValue value={value as number} format={money} className={tone(value as number)} />
                </div>
              ))}
            </div>
            <div className={styles.chartCard}>
              <div className={styles.chartHead}>
                <h2>Profit over {days} days</h2>
                <span className={tone(r.totalProfit)}>
                  Net <AnimatedValue value={r.totalProfit} format={money} />
                </span>
              </div>
              <ProfitChart series={r.series} breakEvenDay={r.breakEvenDay} />
            </div>
            <dl className={styles.breakdown}>
              <div>
                <dt>Coins mined per day</dt>
                <dd>
                  {r.dailyCoins.toFixed(symbol === "BTC" ? 8 : 4)} {symbol}
                </dd>
              </div>
              <div>
                <dt>Revenue per day</dt>
                <dd>{money(r.dailyRevenue)}</dd>
              </div>
              <div>
                <dt>{mode === "contract" ? "Plan cost per day" : "Electricity per day"}</dt>
                <dd>{money(mode === "contract" ? r.dailyContract : r.dailyPower)}</dd>
              </div>
              <div>
                <dt>Power draw</dt>
                <dd>{r.powerKw.toFixed(2)} kW</dd>
              </div>
              <div>
                <dt>Total revenue</dt>
                <dd>{money(r.totalRevenue)}</dd>
              </div>
              <div>
                <dt>Total cost</dt>
                <dd>{money(r.totalCost)}</dd>
              </div>
              <div>
                <dt>Return on cost</dt>
                <dd className={tone(r.roi)}>{r.totalCost > 0 ? formatPercent(r.roi, 1) : "—"}</dd>
              </div>
              <div>
                <dt>Break-even</dt>
                <dd>{mode === "own" ? "Hardware cost not included" : r.breakEvenDay ? `Day ${r.breakEvenDay}` : `Not within ${days} days`}</dd>
              </div>
            </dl>
            {plan && (
              <div className={styles.recommend}>
                <div>
                  <span className="eyebrow">Recommended plan</span>
                  <p className="copy">
                    Mining {symbol}? {plan.name} delivers {plan.hashrate} {plan.unit} per unit from {formatUsd(plan.priceMonthly)} per month.
                  </p>
                  <Button to={`/plans/${plan.slug}`} icon="arrow-right">
                    View {plan.name}
                  </Button>
                </div>
                <div className={styles.recommendCard}>
                  <PlanCard plan={plan} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
