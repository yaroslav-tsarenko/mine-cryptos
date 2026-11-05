import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import styles from "./PageHero.module.css";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  art?: { src: string; width: number; height: number };
  align?: "center" | "left";
  compact?: boolean;
};

/** Gradient page banner shared by every inner page (continues the original "Insights and Updates" header). */
export function PageHero({ title, description, eyebrow, crumbs, children, art, align = art ? "left" : "center", compact }: Props) {
  return (
    <section className={cx(styles.hero, compact && styles.compact)}>
      <div className={cx("container", styles.inner, styles[align], art && styles.withArt)}>
        <div className={styles.text}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {children && <div className={styles.actions}>{children}</div>}
        </div>
        {art && (
          <div className={styles.art}>
            <img src={art.src} width={art.width} height={art.height} alt="" fetchPriority="high" />
          </div>
        )}
      </div>
    </section>
  );
}
