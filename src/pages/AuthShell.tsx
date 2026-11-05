import type { ReactNode } from "react";
import { Icon } from "../components/ui/Icon";
import styles from "./Auth.module.css";

const PERKS = ["Daily payouts straight to your wallet", "Live hashrate & worker monitoring", "80% renewable-powered data centers", "Cancel monthly plans within 14 days"];

/** Shared split layout for the login and sign-up pages. */
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <aside className={styles.side} aria-hidden="true">
          <h2>Forge your crypto destiny</h2>
          <ul>
            {PERKS.map((p) => (
              <li key={p}>
                <Icon name="check-circle" size={18} /> {p}
              </li>
            ))}
          </ul>
          <img src="/images/art-hand-phone.webp" alt="" width={880} height={1002} />
        </aside>
        <div className={styles.formSide}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
