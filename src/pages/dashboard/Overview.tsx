import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { Sparkline } from "../../components/ui/Sparkline";
import { Gauge } from "../../components/widgets/Gauge";
import { ReferralLink } from "../../components/widgets/ReferralLink";
import { CONTRACTS, WORKERS } from "../../data/dashboard";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useInterval } from "../../hooks/useInterval";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cx } from "../../lib/cx";
import { formatDate, formatUsd } from "../../lib/format";
import { randomWalk } from "../../lib/random";
import { useMarket } from "../../store/market";
import { useWallet } from "../../store/wallet";
import styles from "./Dashboard.module.css";
import o from "./Overview.module.css";
import { WithdrawModal } from "./WithdrawModal";

const BASE_HASH = 400;
const HISTORY = randomWalk(42, 48, 392, 0.02);
const DEC: Record<string, number> = { BTC: 8, LTC: 4, KAS: 2 };

export default function Overview() {
  useDocumentMeta({ title: "Dashboard", description: "Your MineCryptos mining dashboard." });
  const reduced = useReducedMotion();
  const wallet = useWallet();
  const market = useMarket();
  const [hash, setHash] = useState(BASE_HASH * 0.985);
  const [series, setSeries] = useState(HISTORY);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  useInterval(
    () => {
      const next = BASE_HASH * (0.96 + Math.random() * 0.05);
      setHash(next);
      setSeries((s) => [...s.slice(1), next]);
    },
    reduced ? null : 3000,
  );

  const online = WORKERS.filter((w) => w.status !== "offline").length;
  const btcPrice = market.BTC.price;
  const recent = wallet.payouts.slice(0, 5);

  return (
    <>
      <div className={styles.grid}>
        <section className={cx(styles.panel, styles.span4, o.gaugeCard)} aria-label="Total hashrate">
          <div className={styles.panelHead}>
            <h2>Total hashrate</h2>
            <span className={cx(styles.status, styles.online)}>Live</span>
          </div>
          <div className={o.gauge}>
            <Gauge value={hash} max={500} label="Total hashrate" unit="TH/s" />
            <div className={o.gaugeValue}>
              <strong className="tabular">{hash.toFixed(1)}</strong>
              <span>TH/s · BTC</span>
            </div>
          </div>
          <p className={styles.kpiSub}>
            {((hash / BASE_HASH) * 100).toFixed(1)}% of contracted 400 TH/s · {online}/{WORKERS.length} workers online
          </p>
        </section>

        <section className={cx(styles.panel, styles.span4, o.mined)} aria-label="Mined today">
          <div className={styles.panelHead}>
            <h2>Mined today</h2>
            <Icon name="activity" size={20} />
          </div>
          <strong className={o.minedValue}>{wallet.minedToday.toFixed(8)}</strong>
          <span className={o.minedUnit}>BTC ≈ {formatUsd(wallet.minedToday * btcPrice)}</span>
          <div className={o.ticker} aria-hidden="true">
            <span className={o.pulse} /> Counting up in real time
          </div>
        </section>

        <section className={cx(styles.panel, styles.span4)} aria-label="Balances">
          <div className={styles.panelHead}>
            <h2>Wallet balance</h2>
            <Link to="/dashboard/payouts">History</Link>
          </div>
          <ul className={o.balances}>
            {Object.entries(wallet.balance).map(([coin, v]) => (
              <li key={coin}>
                <span className={o.coin}>{coin}</span>
                <span className="tabular">{v.toFixed(DEC[coin])}</span>
                <small className="tabular">{formatUsd(v * (market[coin]?.price ?? 0))}</small>
              </li>
            ))}
          </ul>
          <Button onClick={() => setWithdrawOpen(true)} iconLeft="download" block>
            Withdraw
          </Button>
        </section>

        <section className={cx(styles.panel, styles.span8)} aria-label="Hashrate last 24 hours">
          <div className={styles.panelHead}>
            <h2>Hashrate · last 24 hours</h2>
            <span className={styles.kpiSub}>
              Avg {(series.reduce((a, b) => a + b, 0) / series.length).toFixed(1)} TH/s
            </span>
          </div>
          <div className={o.chart}>
            <Sparkline data={series} width={720} height={180} color="var(--primary)" className={o.chartSvg} />
            <div className={o.chartAxis} aria-hidden="true">
              <span>24h ago</span>
              <span>12h ago</span>
              <span>Now</span>
            </div>
          </div>
        </section>

        <section className={cx(styles.panel, styles.span4)} aria-label="Active contracts">
          <div className={styles.panelHead}>
            <h2>Active contracts</h2>
            <Link to="/plans">Add hashpower</Link>
          </div>
          <ul className={o.contracts}>
            {CONTRACTS.map((c) => (
              <li key={c.slug}>
                <div className={o.contractTop}>
                  <Link to={`/plans/${c.slug}`}>{c.plan}</Link>
                  <span>{c.hashrate}</span>
                </div>
                <div className={o.bar}>
                  <span style={{ width: `${c.progress * 100}%` }} />
                </div>
                <small>
                  {Math.round(c.progress * 100)}% complete · {c.daysLeft} days left
                </small>
              </li>
            ))}
          </ul>
        </section>

        <section className={cx(styles.panel, styles.span7)} aria-label="Recent payouts">
          <div className={styles.panelHead}>
            <h2>Recent payouts</h2>
            <Link to="/dashboard/payouts">View all</Link>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Coin</th>
                  <th scope="col" className={styles.num}>
                    Amount
                  </th>
                  <th scope="col" className={styles.num}>
                    USD
                  </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id}>
                    <td>{formatDate(p.date)}</td>
                    <td>{p.coin}</td>
                    <td className={cx(styles.num, p.amount < 0 && styles.down)}>{p.amount.toFixed(DEC[p.coin] ?? 6)}</td>
                    <td className={styles.num}>{formatUsd(p.usd)}</td>
                    <td>
                      <span className={cx(styles.status, styles[p.status.toLowerCase()])}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={cx(styles.panel, styles.span5)} aria-label="Workers">
          <div className={styles.panelHead}>
            <h2>Workers</h2>
            <Link to="/dashboard/workers">Manage</Link>
          </div>
          <ul className={o.workers}>
            {WORKERS.slice(0, 5).map((w) => (
              <li key={w.id}>
                <span className={cx(o.dot, styles[w.status])} />
                <span className="mono">{w.name}</span>
                <span className={o.wHash}>{w.status === "offline" ? "—" : `${w.hashrate} ${w.unit}`}</span>
              </li>
            ))}
          </ul>
          <div className={o.refer}>
            <strong>
              <Icon name="gift" size={18} /> Invite friends, earn 3–8%
            </strong>
            <ReferralLink compact />
          </div>
        </section>
      </div>
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </>
  );
}
