import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import styles from "./SectionHeading.module.css";

type Props = {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

/** Section title row: heading + optional copy on the left, optional action (e.g. "View All") on the right. */
export function SectionHeading({ title, eyebrow, description, action, align = "left", id }: Props) {
  return (
    <div className={cx(styles.row, styles[align])}>
      <div className={styles.text}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h2" id={id}>
          {title}
        </h2>
        {description && <p className={cx("lead", styles.description)}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
