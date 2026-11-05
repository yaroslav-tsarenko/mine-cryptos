import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { PageLoader } from "../../components/layout/PageLoader";
import { Avatar } from "../../components/ui/Avatar";
import { Icon, type IconName } from "../../components/ui/Icon";
import { Logo } from "../../components/ui/Logo";
import { NOTIFICATIONS } from "../../data/dashboard";
import { cx } from "../../lib/cx";
import { formatUsd } from "../../lib/format";
import { useMarket } from "../../store/market";
import { useWallet } from "../../store/wallet";
import styles from "./Dashboard.module.css";

const NAV: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: "/dashboard", label: "Overview", icon: "grid", end: true },
  { to: "/dashboard/workers", label: "Workers", icon: "cpu" },
  { to: "/dashboard/payouts", label: "Payouts", icon: "wallet" },
  { to: "/dashboard/referrals", label: "Referrals", icon: "gift" },
  { to: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function DashboardLayout() {
  const [drawer, setDrawer] = useState(false);
  const [bell, setBell] = useState(false);
  const [unread, setUnread] = useState(NOTIFICATIONS.length);
  const bellRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const wallet = useWallet();
  const market = useMarket();
  const totalUsd = Object.entries(wallet.balance).reduce((s, [c, v]) => s + v * (market[c]?.price ?? 0), 0);
  const current = [...NAV].reverse().find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawer);
    return () => document.body.classList.remove("no-scroll");
  }, [drawer]);

  useEffect(() => {
    if (!bell) return;
    const onDown = (e: PointerEvent) => !bellRef.current?.contains(e.target as Node) && setBell(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBell(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [bell]);

  return (
    <div className={styles.shell}>
      <a href="#dash-main" className="skip-link">
        Skip to content
      </a>
      <aside className={cx(styles.sidebar, drawer && styles.sidebarOpen)} aria-label="Dashboard navigation">
        <div className={styles.sideTop}>
          <Logo tone="dark" onClick={() => setDrawer(false)} />
          <button type="button" className={styles.closeDrawer} onClick={() => setDrawer(false)} aria-label="Close navigation">
            <Icon name="close" size={22} />
          </button>
        </div>
        <nav className={styles.nav}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cx(styles.navLink, isActive && styles.navActive)} onClick={() => setDrawer(false)}>
              <Icon name={n.icon} size={20} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.upgrade}>
          <strong>Need more hashpower?</strong>
          <p>Upgrade any contract in one click — pro-rated to the day.</p>
          <Link to="/plans" onClick={() => setDrawer(false)}>
            Browse plans <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <div className={styles.sideBottom}>
          <Link to="/" className={styles.navLink} onClick={() => setDrawer(false)}>
            <Icon name="home" size={20} /> Back to website
          </Link>
          <Link to="/login" className={styles.navLink} onClick={() => setDrawer(false)}>
            <Icon name="logout" size={20} /> Log out
          </Link>
        </div>
      </aside>
      {drawer && <div className={styles.scrim} onClick={() => setDrawer(false)} aria-hidden="true" />}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button type="button" className={styles.burger} onClick={() => setDrawer(true)} aria-label="Open navigation" aria-expanded={drawer}>
            <Icon name="menu" size={24} />
          </button>
          <div className={styles.titleWrap}>
            <span className={styles.hello}>Good to see you, Alex</span>
            <h1 className={styles.pageTitle}>{current?.label ?? "Dashboard"}</h1>
          </div>
          <div className={styles.topActions}>
            <div className={styles.balance} title="Total balance (demo)">
              <small>Balance</small>
              <strong className="tabular">{formatUsd(totalUsd)}</strong>
            </div>
            <div className={styles.bellWrap} ref={bellRef}>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
                aria-expanded={bell}
                onClick={() => {
                  setBell((b) => !b);
                  setUnread(0);
                }}
              >
                <Icon name="bell" size={20} />
                {unread > 0 && <span className={styles.badge}>{unread}</span>}
              </button>
              {bell && (
                <div className={styles.dropdown}>
                  <strong className={styles.dropTitle}>Notifications</strong>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={styles.note}>
                      <span className={styles.noteDot} />
                      <div>
                        <strong>{n.title}</strong>
                        <p>{n.text}</p>
                        <small>{n.time}</small>
                      </div>
                    </div>
                  ))}
                  <Link to="/dashboard/settings#notifications" className={styles.dropLink} onClick={() => setBell(false)}>
                    Notification settings
                  </Link>
                </div>
              )}
            </div>
            <Link to="/dashboard/settings" className={styles.me} aria-label="Account settings">
              <Avatar name="Alex Morgan" size={40} />
            </Link>
          </div>
        </header>
        <p className={styles.demoBar}>
          <Icon name="info" size={16} /> Demo dashboard — all figures are illustrative mock data and update in your browser only.
        </p>
        <main id="dash-main" className={styles.content} tabIndex={-1}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
