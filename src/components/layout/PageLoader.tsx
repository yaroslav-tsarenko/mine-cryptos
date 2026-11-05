import styles from "./PageLoader.module.css";

export function PageLoader({ full }: { full?: boolean }) {
  return (
    <div className={full ? `${styles.loader} ${styles.full}` : styles.loader} role="status" aria-label="Loading page">
      <span className={styles.mark} />
    </div>
  );
}
