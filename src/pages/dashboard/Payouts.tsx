import { useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { SelectField } from "../../components/ui/Field";
import { Icon } from "../../components/ui/Icon";
import { useToast } from "../../components/ui/useToast";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { cx } from "../../lib/cx";
import { formatDate, formatUsd } from "../../lib/format";
import { useWallet } from "../../store/wallet";
import styles from "./Dashboard.module.css";
import p from "./Payouts.module.css";
import { WithdrawModal } from "./WithdrawModal";

const PAGE = 10;
const DEC: Record<string, number> = { BTC: 8, LTC: 4, KAS: 2 };

export default function Payouts() {
  useDocumentMeta({ title: "Payouts", description: "Your MineCryptos payout history." });
  const wallet = useWallet();
  const { notify } = useToast();
  const [coin, setCoin] = useState("all");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("30");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [now] = useState(() => Date.now());

  const filtered = useMemo(() => {
    const cutoff = range === "all" ? 0 : now - Number(range) * 86_400_000;
    return wallet.payouts.filter(
      (x) =>
        (coin === "all" || x.coin === coin) &&
        (status === "all" || x.status === status) &&
        new Date(x.date).getTime() >= cutoff &&
        (!query || x.txid.includes(query) || x.id.toLowerCase().includes(query.toLowerCase())),
    );
  }, [wallet.payouts, coin, status, range, query, now]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE, safePage * PAGE);
  const totalUsd = filtered.filter((x) => x.amount > 0).reduce((s, x) => s + x.usd, 0);
  const pending = filtered.filter((x) => x.status !== "Paid").length;

  const resetPage = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setPage(1);
  };

  const exportCsv = () => {
    const head = "id,date,coin,amount,usd,status,txid";
    const body = filtered.map((x) => [x.id, x.date, x.coin, x.amount, x.usd.toFixed(2), x.status, x.txid].join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`${head}\n${body}`], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "minecryptos-payouts-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
    notify({ title: "Export ready", description: `${filtered.length} payouts exported to CSV.` });
  };

  return (
    <div className={p.page}>
      <div className={p.kpis}>
        <div className={styles.panel}>
          <span className={styles.kpiLabel}>Paid out in period</span>
          <strong className={styles.kpiValue}>{formatUsd(totalUsd)}</strong>
          <span className={styles.kpiSub}>{filtered.length} transactions</span>
        </div>
        <div className={styles.panel}>
          <span className={styles.kpiLabel}>Pending / processing</span>
          <strong className={styles.kpiValue}>{pending}</strong>
          <span className={styles.kpiSub}>Settles within 24 hours</span>
        </div>
        <div className={cx(styles.panel, p.cta)}>
          <span className={styles.kpiLabel}>Next payout</span>
          <strong className={styles.kpiValue}>00:00 UTC</strong>
          <Button size="sm" onClick={() => setWithdrawOpen(true)} iconLeft="download">
            Withdraw now
          </Button>
        </div>
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Payout history</h2>
          <Button size="sm" variant="outline" iconLeft="download" onClick={exportCsv} disabled={!filtered.length}>
            Export CSV
          </Button>
        </div>
        <div className={styles.filters}>
          <label className={styles.search}>
            <Icon name="search" size={18} />
            <span className="visually-hidden">Search by ID or transaction</span>
            <input type="search" placeholder="Search ID or tx hash" value={query} onChange={(e) => resetPage(setQuery)(e.target.value)} />
          </label>
          <SelectField label="Coin" hideLabel value={coin} onChange={(e) => resetPage(setCoin)(e.target.value)}>
            <option value="all">All coins</option>
            <option value="BTC">BTC</option>
            <option value="LTC">LTC</option>
            <option value="KAS">KAS</option>
          </SelectField>
          <SelectField label="Status" hideLabel value={status} onChange={(e) => resetPage(setStatus)(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </SelectField>
          <SelectField label="Date range" hideLabel value={range} onChange={(e) => resetPage(setRange)(e.target.value)}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="all">All time</option>
          </SelectField>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Coin</th>
                <th scope="col" className={styles.num}>
                  Amount
                </th>
                <th scope="col" className={styles.num}>
                  Value (USD)
                </th>
                <th scope="col">Status</th>
                <th scope="col">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x) => (
                <tr key={x.id}>
                  <th scope="row" className="mono">
                    {x.id}
                  </th>
                  <td>{formatDate(x.date)}</td>
                  <td>{x.coin}</td>
                  <td className={cx(styles.num, x.amount < 0 ? styles.down : styles.up)}>
                    {x.amount > 0 ? "+" : ""}
                    {x.amount.toFixed(DEC[x.coin] ?? 6)}
                  </td>
                  <td className={styles.num}>{formatUsd(x.usd)}</td>
                  <td>
                    <span className={cx(styles.status, styles[x.status.toLowerCase()])}>{x.status}</span>
                  </td>
                  <td className="mono">{x.txid}</td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={7} className={styles.empty}>
                    No payouts match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav className={p.pager} aria-label="Pagination">
          <span>
            Page {safePage} of {pages}
          </span>
          <div>
            <button type="button" onClick={() => setPage(safePage - 1)} disabled={safePage <= 1} aria-label="Previous page">
              <Icon name="chevron-left" size={18} />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" onClick={() => setPage(n)} className={cx(n === safePage && p.current)} aria-current={n === safePage ? "page" : undefined}>
                {n}
              </button>
            ))}
            <button type="button" onClick={() => setPage(safePage + 1)} disabled={safePage >= pages} aria-label="Next page">
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </nav>
      </section>
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  );
}
