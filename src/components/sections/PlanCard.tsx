import { Link } from "react-router";
import { hourlyRate, type Billing, type Plan } from "../../data/plans";
import { cx } from "../../lib/cx";
import { formatNumber, formatUsd } from "../../lib/format";
import { Icon } from "../ui/Icon";
import styles from "./PlanCard.module.css";

export function PlanCard({ plan, headingLevel = 3, billing = "monthly" }: { plan: Plan; headingLevel?: 2 | 3; billing?: Billing }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link to={`/plans/${plan.slug}`} className={styles.card}>
      <div className={cx(styles.media, plan.imageFit === "cover" && styles.cover)}>
        <img src={plan.image} alt="" loading="lazy" width={340} height={300} />
        {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
        <span className={styles.coin}>{plan.coin}</span>
      </div>
      <div className={styles.body}>
        <H className={styles.title}>{plan.name}</H>
        <p className={styles.specs}>
          {plan.algorithm} Algorithm Mining Server · {formatNumber(plan.hashrate)} {plan.unit} | {formatNumber(plan.powerW)} W | {plan.efficiency}
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>
            {billing === "monthly" ? formatUsd(plan.priceMonthly, { decimals: 2 }) : formatUsd(hourlyRate(plan), { decimals: 3 })}
            <small> / {billing === "monthly" ? "month" : "hour"}</small>
          </span>
          <span className={styles.go} aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
