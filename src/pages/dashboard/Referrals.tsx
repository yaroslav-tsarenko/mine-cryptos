import { Link } from "react-router";
import { CountUp } from "../../components/ui/CountUp";
import { ReferralLink } from "../../components/widgets/ReferralLink";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { cx } from "../../lib/cx";
import { formatUsd } from "../../lib/format";
import styles from "./Dashboard.module.css";
import r from "./Referrals.module.css";

const REFERRED = [
  { user: "j***@gmail.com", joined: "Oct 30, 2026", plan: "HashPower Hub", earned: 15.92, status: "Active" },
  { user: "m***@outlook.com", joined: "Oct 22, 2026", plan: "BitMine Nexus", earned: 23.12, status: "Active" },
  { user: "a***@proton.me", joined: "Oct 11, 2026", plan: "CryptoNest Miner", earned: 6.32, status: "Active" },
  { user: "t***@yahoo.com", joined: "Sep 29, 2026", plan: "—", earned: 0, status: "Signed up" },
  { user: "k***@icloud.com", joined: "Sep 14, 2026", plan: "KasPulse Node", earned: 17.52, status: "Active" },
];

export default function Referrals() {
  useDocumentMeta({ title: "Referrals", description: "Track your MineCryptos referrals and commission." });
  const active = REFERRED.filter((x) => x.status === "Active").length;
  const earned = REFERRED.reduce((s, x) => s + x.earned, 0);
  return (
    <div className={r.page}>
      <section className={cx(styles.panel, r.hero)}>
        <div>
          <h2>Share your link, earn commission</h2>
          <p>You're on the Bronze tier (3%). Get {5 - active} more active referrals to unlock Silver (5%).</p>
          <div className={r.tier}>
            <span style={{ width: `${(active / 5) * 100}%` }} />
          </div>
          <small>
            {active} / 5 active referrals · <Link to="/referral">How tiers work</Link>
          </small>
        </div>
        <ReferralLink />
      </section>
      <div className={r.kpis}>
        {[
          { label: "Link clicks", value: 312 },
          { label: "Sign-ups", value: REFERRED.length },
          { label: "Active miners", value: active },
          { label: "Commission earned", value: earned, money: true },
        ].map((k) => (
          <div key={k.label} className={styles.panel}>
            <span className={styles.kpiLabel}>{k.label}</span>
            <strong className={styles.kpiValue}>{k.money ? formatUsd(k.value) : <CountUp value={k.value} />}</strong>
          </div>
        ))}
      </div>
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Referred users</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Joined</th>
                <th scope="col">Plan</th>
                <th scope="col" className={styles.num}>
                  Your commission
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {REFERRED.map((x) => (
                <tr key={x.user}>
                  <th scope="row">{x.user}</th>
                  <td>{x.joined}</td>
                  <td>{x.plan}</td>
                  <td className={cx(styles.num, x.earned > 0 && styles.up)}>{formatUsd(x.earned)}</td>
                  <td>
                    <span className={cx(styles.status, x.status === "Active" ? styles.online : styles.pending)}>{x.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
