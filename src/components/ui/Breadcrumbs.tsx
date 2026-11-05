import { Link } from "react-router";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${styles[tone]}`}>
      <ol>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
