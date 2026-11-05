import { useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { SelectField } from "../../components/ui/Field";
import { Icon } from "../../components/ui/Icon";
import { Tabs } from "../../components/ui/Tabs";
import { useToast } from "../../components/ui/useToast";
import { WORKERS, type Worker, type WorkerStatus } from "../../data/dashboard";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useInterval } from "../../hooks/useInterval";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cx } from "../../lib/cx";
import styles from "./Dashboard.module.css";
import w from "./Workers.module.css";

type Filter = "all" | WorkerStatus;

export default function Workers() {
  useDocumentMeta({ title: "Workers", description: "Monitor your mining workers." });
  const reduced = useReducedMotion();
  const { notify } = useToast();
  const [workers, setWorkers] = useState<Worker[]>(WORKERS);
  const [jitter, setJitter] = useState<Record<string, number>>({});
  const [restarting, setRestarting] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [coin, setCoin] = useState("all");
  const [query, setQuery] = useState("");

  useInterval(
    () => setJitter(Object.fromEntries(workers.map((x) => [x.id, 0.97 + Math.random() * 0.06]))),
    reduced ? null : 2500,
  );

  const counts = useMemo(
    () => ({
      all: workers.length,
      online: workers.filter((x) => x.status === "online").length,
      warning: workers.filter((x) => x.status === "warning").length,
      offline: workers.filter((x) => x.status === "offline").length,
    }),
    [workers],
  );

  const list = workers.filter(
    (x) => (filter === "all" || x.status === filter) && (coin === "all" || x.coin === coin) && (!query || x.name.includes(query.toLowerCase()) || x.model.toLowerCase().includes(query.toLowerCase())),
  );

  const restart = (id: string) => {
    setRestarting((r) => [...r, id]);
    window.setTimeout(() => {
      setWorkers((ws) =>
        ws.map((x) => {
          if (x.id !== id) return x;
          const base = x.unit === "GH/s" ? 16 : x.coin === "KAS" ? 12 : 190;
          return { ...x, status: "online", hashrate: x.hashrate || base, temp: x.temp || 64, uptime: "0d 0h", rejected: 0.1 };
        }),
      );
      setRestarting((r) => r.filter((x) => x !== id));
      notify({ title: "Worker restarted", description: `${workers.find((x) => x.id === id)?.name} is back online.` });
    }, 1800);
  };

  return (
    <div className={w.page}>
      <div className={w.summary}>
        {(["online", "warning", "offline"] as const).map((s) => (
          <div key={s} className={cx(styles.panel, w.sumCard)}>
            <span className={cx(styles.status, styles[s])}>{s[0].toUpperCase() + s.slice(1)}</span>
            <strong className={styles.kpiValue}>{counts[s]}</strong>
            <span className={styles.kpiSub}>{s === "online" ? "Hashing normally" : s === "warning" ? "High temp or rejects" : "Needs attention"}</span>
          </div>
        ))}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <Tabs
            label="Worker status"
            variant="pill"
            value={filter}
            onChange={setFilter}
            tabs={[
              { id: "all", label: `All (${counts.all})` },
              { id: "online", label: `Online (${counts.online})` },
              { id: "warning", label: `Warning (${counts.warning})` },
              { id: "offline", label: `Offline (${counts.offline})` },
            ]}
          />
        </div>
        <div className={styles.filters}>
          <label className={styles.search}>
            <Icon name="search" size={18} />
            <span className="visually-hidden">Search workers</span>
            <input type="search" placeholder="Search by name or model" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <SelectField label="Coin" hideLabel value={coin} onChange={(e) => setCoin(e.target.value)}>
            <option value="all">All coins</option>
            <option value="BTC">BTC</option>
            <option value="LTC">LTC</option>
            <option value="KAS">KAS</option>
          </SelectField>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Worker</th>
                <th scope="col">Status</th>
                <th scope="col" className={styles.num}>
                  Hashrate
                </th>
                <th scope="col" className={styles.num}>
                  Temp
                </th>
                <th scope="col" className={styles.num}>
                  Rejected
                </th>
                <th scope="col">Uptime</th>
                <th scope="col">Location</th>
                <th scope="col">
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((x) => {
                const busy = restarting.includes(x.id);
                const rate = x.status === "offline" ? 0 : x.hashrate * (jitter[x.id] ?? 1);
                return (
                  <tr key={x.id}>
                    <th scope="row">
                      <span className="mono">{x.name}</span>
                      <small className={w.model}>{x.model}</small>
                    </th>
                    <td>
                      <span className={cx(styles.status, styles[busy ? "processing" : x.status])}>{busy ? "Restarting" : x.status[0].toUpperCase() + x.status.slice(1)}</span>
                    </td>
                    <td className={styles.num}>{x.status === "offline" ? "—" : `${rate.toFixed(1)} ${x.unit}`}</td>
                    <td className={cx(styles.num, x.temp > 78 && styles.down)}>{x.temp ? `${x.temp} °C` : "—"}</td>
                    <td className={cx(styles.num, x.rejected > 2 && styles.down)}>{x.status === "offline" ? "—" : `${x.rejected}%`}</td>
                    <td>{x.uptime}</td>
                    <td>{x.location}</td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => restart(x.id)} loading={busy} iconLeft="refresh">
                        Restart
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {!list.length && (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    No workers match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
