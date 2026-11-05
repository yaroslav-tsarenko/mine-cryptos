import { Link } from "react-router";
import { COINS } from "../../data/coins";
import { formatPercent, formatUsd } from "../../lib/format";
import { useMarket } from "../../store/market";
import { cx } from "../../lib/cx";
import styles from "./TickerBar.module.css";

/** Scrolling mock price ticker (pauses on hover, static when reduced motion is on). */
export function TickerBar() {
  const market = useMarket();
  const items = COINS.slice(0, 10);
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((c) => {
        const q = market[c.symbol];
        return (
          <li key={c.symbol} className={styles.item}>
            <span className={styles.dot} style={{ background: c.color }} />
            <strong>{c.symbol}</strong>
            <span key={q.tick} className={cx("tabular", q.direction === "up" && styles.up, q.direction === "down" && styles.down)}>
              {formatUsd(q.price)}
            </span>
            <span className={q.change24h >= 0 ? styles.pos : styles.neg}>{formatPercent(q.change24h)}</span>
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className={styles.bar} aria-label="Demo market prices">
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
      <Link to="/markets" className={styles.more}>
        All markets
      </Link>
    </section>
  );
}
