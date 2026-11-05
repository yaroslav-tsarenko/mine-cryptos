import { useMemo, useState } from "react";
import { Link } from "react-router";
import { CtaBand } from "../components/sections/CtaBand";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Sparkline } from "../components/ui/Sparkline";
import { Tabs } from "../components/ui/Tabs";
import { COINS, MINING_COINS, type Coin } from "../data/coins";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { cx } from "../lib/cx";
import { formatPercent, formatUsd } from "../lib/format";
import { useMarket, type Quote } from "../store/market";
import styles from "./Markets.module.css";

type SortKey = "rank" | "name" | "price" | "change" | "cap" | "volume";
type View = "all" | "mineable" | "watchlist";

const CALC = new Set<string>(MINING_COINS.map((c) => c.symbol));

export default function Markets() {
  useDocumentMeta({ title: "Live Crypto Markets", description: "Track demo prices for Bitcoin, Litecoin, Kaspa and more — with sparklines, sorting, search and a personal watchlist." });
  const market = useMarket();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "rank", dir: 1 });
  const [watch, setWatch] = useLocalStorage<string[]>("mc-watchlist", ["BTC", "KAS"]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = COINS.map((c, i) => ({ coin: c, quote: market[c.symbol], rank: i + 1 })).filter(
      ({ coin }) =>
        (!q || coin.name.toLowerCase().includes(q) || coin.symbol.toLowerCase().includes(q)) &&
        (view === "all" || (view === "mineable" ? coin.mineable : watch.includes(coin.symbol))),
    );
    const val = (r: (typeof list)[number]): number | string => {
      switch (sort.key) {
        case "name":
          return r.coin.name;
        case "price":
          return r.quote.price;
        case "change":
          return r.quote.change24h;
        case "cap":
          return r.coin.marketCap * (r.quote.price / r.coin.price);
        case "volume":
          return r.coin.volume24h;
        default:
          return r.rank;
      }
    };
    return list.sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      return (typeof va === "string" ? va.localeCompare(vb as string) : va - (vb as number)) * sort.dir;
    });
  }, [market, query, view, sort, watch]);

  const movers = useMemo(
    () =>
      COINS.map((c) => ({ coin: c, quote: market[c.symbol] }))
        .sort((a, b) => Math.abs(b.quote.change24h) - Math.abs(a.quote.change24h))
        .slice(0, 4),
    [market],
  );

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === "name" || key === "rank" ? 1 : -1 }));
  const toggleWatch = (sym: string) => setWatch((w) => (w.includes(sym) ? w.filter((s) => s !== sym) : [...w, sym]));

  const header = (key: SortKey, label: string, align: "left" | "right" = "right") => (
    <th scope="col" aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={align === "left" ? styles.left : undefined}>
      <button type="button" onClick={() => toggleSort(key)} className={cx(styles.sortBtn, sort.key === key && styles.sorted)}>
        {label}
        <Icon name="chevron-down" size={14} className={cx(styles.sortIcon, sort.key === key && sort.dir === 1 && styles.flip)} />
      </button>
    </th>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Markets" }]}
        eyebrow="Demo market feed"
        title="Live Crypto Markets"
        description="Follow the coins you mine. Prices below are simulated and refresh every few seconds so you can explore the experience — they are not real market data."
      />

      <section className="section">
        <div className="container">
          <div className={styles.movers}>
            {movers.map(({ coin, quote }) => (
              <MoverCard key={coin.symbol} coin={coin} quote={quote} />
            ))}
          </div>

          <div className={styles.toolbar}>
            <Tabs
              label="Market view"
              variant="pill"
              value={view}
              onChange={setView}
              tabs={[
                { id: "all", label: "All coins" },
                { id: "mineable", label: "Mineable" },
                { id: "watchlist", label: `Watchlist (${watch.length})` },
              ]}
            />
            <label className={styles.search}>
              <Icon name="search" size={18} />
              <span className="visually-hidden">Search coins</span>
              <input type="search" placeholder="Search by name or symbol" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>

          <div className={styles.tableWrap} role="region" aria-label="Crypto prices table" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Watchlist</span>
                  </th>
                  {header("rank", "#", "left")}
                  {header("name", "Name", "left")}
                  {header("price", "Price")}
                  {header("change", "24h")}
                  {header("cap", "Market cap")}
                  {header("volume", "Volume (24h)")}
                  <th scope="col" className={styles.right}>
                    Trend
                  </th>
                  <th scope="col">
                    <span className="visually-hidden">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ coin, quote, rank }) => (
                  <tr key={coin.symbol}>
                    <td>
                      <button
                        type="button"
                        className={cx(styles.star, watch.includes(coin.symbol) && styles.starOn)}
                        onClick={() => toggleWatch(coin.symbol)}
                        aria-pressed={watch.includes(coin.symbol)}
                        aria-label={`${watch.includes(coin.symbol) ? "Remove" : "Add"} ${coin.name} ${watch.includes(coin.symbol) ? "from" : "to"} watchlist`}
                      >
                        <Icon name="star" size={18} />
                      </button>
                    </td>
                    <td className={cx(styles.left, styles.rank)}>{rank}</td>
                    <th scope="row" className={styles.left}>
                      <span className={styles.name}>
                        <span className={styles.logo} style={{ background: coin.color }} aria-hidden="true">
                          {coin.symbol[0]}
                        </span>
                        <span>
                          <strong>{coin.name}</strong>
                          <small>
                            {coin.symbol}
                            {coin.algorithm && ` · ${coin.algorithm}`}
                          </small>
                        </span>
                      </span>
                    </th>
                    <td className={styles.right}>
                      <span key={quote.tick} className={cx("tabular", styles.price, quote.direction === "up" && "flash-up", quote.direction === "down" && "flash-down")}>
                        {formatUsd(quote.price)}
                      </span>
                    </td>
                    <td className={cx(styles.right, "tabular", quote.change24h >= 0 ? styles.pos : styles.neg)}>{formatPercent(quote.change24h)}</td>
                    <td className={cx(styles.right, "tabular")}>{formatUsd(coin.marketCap * (quote.price / coin.price), { compact: true })}</td>
                    <td className={cx(styles.right, "tabular")}>{formatUsd(coin.volume24h, { compact: true })}</td>
                    <td className={styles.right}>
                      <Sparkline data={quote.history} width={110} height={34} className={styles.spark} />
                    </td>
                    <td className={styles.right}>
                      {coin.mineable && CALC.has(coin.symbol) ? (
                        <Link to={`/calculator?coin=${coin.symbol}`} className={styles.mine}>
                          Mine
                        </Link>
                      ) : coin.mineable ? (
                        <Link to="/contact" className={styles.ghost}>
                          Ask us
                        </Link>
                      ) : (
                        <span className={styles.na} title="Proof-of-stake or non-mineable">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr>
                    <td colSpan={9} className={styles.empty}>
                      {view === "watchlist" ? "Your watchlist is empty — tap the star next to a coin to add it." : `No coins match “${query}”.`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className={styles.footnote}>
            <Icon name="info" size={14} /> Simulated prices for demonstration only. MineCryptos does not provide investment advice.
          </p>
        </div>
      </section>
      <CtaBand title="Turn market moves into mined coins" text="Mineable coins can be earned with hashpower instead of bought. Model your returns in seconds." primary={{ label: "Open calculator", to: "/calculator" }} secondary={{ label: "Browse plans", to: "/plans" }} />
    </>
  );
}

function MoverCard({ coin, quote }: { coin: Coin; quote: Quote }) {
  const up = quote.change24h >= 0;
  return (
    <div className={styles.mover}>
      <div className={styles.moverHead}>
        <span className={styles.logo} style={{ background: coin.color }} aria-hidden="true">
          {coin.symbol[0]}
        </span>
        <div>
          <strong>{coin.symbol}</strong>
          <small>{coin.name}</small>
        </div>
        <span className={cx(styles.badge, up ? styles.badgeUp : styles.badgeDown)}>
          <Icon name={up ? "trending-up" : "trending-down"} size={14} /> {formatPercent(quote.change24h)}
        </span>
      </div>
      <span key={quote.tick} className={cx(styles.moverPrice, "tabular", quote.direction === "up" && "flash-up", quote.direction === "down" && "flash-down")}>
        {formatUsd(quote.price)}
      </span>
      <Sparkline data={quote.history} width={240} height={56} className={styles.moverSpark} />
    </div>
  );
}
