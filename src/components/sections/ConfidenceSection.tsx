import { useState } from "react";
import { MINING_COINS } from "../../data/coins";
import { formatUsd } from "../../lib/format";
import { computeProfit } from "../../lib/mining";
import { useMarket } from "../../store/market";
import { AnimatedValue } from "../ui/AnimatedValue";
import { Button } from "../ui/Button";
import { RangeField } from "../ui/Field";
import { Reveal } from "../ui/Reveal";
import { Tabs } from "../ui/Tabs";
import styles from "./ConfidenceSection.module.css";

type Sym = (typeof MINING_COINS)[number]["symbol"];

/** "Mining with Confidence" + a quick profit estimate that deep-links into the full calculator. */
export function ConfidenceSection() {
  const [symbol, setSymbol] = useState<Sym>("BTC");
  const coin = MINING_COINS.find((c) => c.symbol === symbol)!;
  const [hashrates, setHashrates] = useState<Record<string, number>>({});
  const hashrate = hashrates[symbol] ?? coin.defaultHashrate;
  const market = useMarket();
  const price = market[symbol].price;
  const r = computeProfit({ coin, price, hashrate, electricity: 0, poolFee: 1, days: 30, difficultyGrowth: 0, contract: true });

  return (
    <section className={`section ${styles.section}`}>
      <div className="container grid-2">
        <Reveal className={styles.media}>
          <img src="/images/art-mining-cart.webp" alt="" loading="lazy" width={900} height={659} />
        </Reveal>
        <Reveal delay={120} className={styles.text}>
          <span className="eyebrow">Your Journey, Our Guidance</span>
          <h2 className="h2">Mining with Confidence</h2>
          <p className="lead">
            At MineCryptos, we understand that the world of cryptocurrency mining can be complex and ever-evolving. That's why we're
            committed to providing you with the tools, knowledge, and support you need to mine with confidence.
          </p>
          <div className={styles.calc}>
            <div className={styles.calcHead}>
              <strong>Quick estimate</strong>
              <Tabs label="Coin" variant="pill" tabs={MINING_COINS.map((c) => ({ id: c.symbol, label: c.symbol }))} value={symbol} onChange={setSymbol} />
            </div>
            <RangeField
              label="Hashrate"
              value={hashrate}
              min={coin.min}
              max={coin.max}
              step={coin.step}
              onChange={(v) => setHashrates((h) => ({ ...h, [symbol]: v }))}
              display={`${hashrate} ${coin.unit}`}
            />
            <div className={styles.results}>
              <div>
                <small>Est. daily revenue</small>
                <AnimatedValue value={r.dailyRevenue} format={(n) => formatUsd(n, { decimals: 2 })} className={styles.big} />
              </div>
              <div>
                <small>Est. monthly net</small>
                <AnimatedValue value={r.monthlyProfit} format={(n) => formatUsd(n, { decimals: 2 })} className={r.monthlyProfit >= 0 ? styles.pos : styles.neg} />
              </div>
            </div>
            <p className={styles.note}>Illustrative demo figures using mock prices. Not a guarantee of future returns.</p>
            <Button to={`/calculator?coin=${symbol}&hashrate=${hashrate}`} icon="arrow-right" block>
              Open full calculator
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
