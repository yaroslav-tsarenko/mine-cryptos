import { CountUp } from "../ui/CountUp";
import { Icon, type IconName } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import styles from "./StatsStrip.module.css";

const STATS: { value: number; decimals?: number; suffix?: string; prefix?: string; label: string; icon: IconName }[] = [
  { value: 48210, label: "Active miners", icon: "users" },
  { value: 1.42, decimals: 2, suffix: " EH/s", label: "Hashpower under management", icon: "zap" },
  { value: 6, label: "Renewable-first data centers", icon: "globe" },
  { value: 99.98, decimals: 2, suffix: "%", label: "Average uptime in 2026", icon: "activity" },
];

export function StatsStrip() {
  return (
    <section className={`container ${styles.wrap}`} aria-label="MineCryptos in numbers">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 80}>
          <div className={styles.stat}>
          <span className={styles.icon}>
            <Icon name={s.icon} size={22} />
          </span>
          <strong className="tabular">
            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} prefix={s.prefix} />
          </strong>
          <span className={styles.label}>{s.label}</span>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
