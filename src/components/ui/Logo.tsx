import { Link } from "react-router";
import { cx } from "../../lib/cx";
import styles from "./Logo.module.css";

export function Logo({ tone = "light", className, onClick }: { tone?: "light" | "dark"; className?: string; onClick?: () => void }) {
  return (
    <Link to="/" className={cx(styles.logo, styles[tone], className)} aria-label="MineCryptos home" onClick={onClick}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.word}>MineCryptos</span>
    </Link>
  );
}
