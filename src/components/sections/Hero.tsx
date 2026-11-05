import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import styles from "./Hero.module.css";

/** Landing hero — the original "Forge Your Crypto Destiny" block, with live-looking mining cards. */
export function Hero() {
  const reduced = useReducedMotion();
  const [mined, setMined] = useState(0.00031842);
  const [hash, setHash] = useState(200.4);
  useInterval(
    () => {
      setMined((m) => m + 0.00000011 + Math.random() * 0.00000006);
      setHash(() => +(198 + Math.random() * 5).toFixed(1));
    },
    reduced ? null : 1800,
  );

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <span className={styles.pill}>
            <span className={styles.live} aria-hidden="true" /> 48,000+ miners hashing right now
          </span>
          <h1 className={`h1 ${styles.title}`}>Forge Your Crypto Destiny</h1>
          <p className={styles.copy}>
            At MineCryptos, we're not just mining crypto; we're forging a new era of financial independence. Join us as we pave the
            path to prosperity, one blockchain at a time. Your destiny in the world of cryptocurrency begins here.
          </p>
          <div className={styles.actions}>
            <Button to="/signup" variant="primary" size="md">
              Start Your Journey
            </Button>
            <Button to="/plans" variant="link" icon="arrow-right" className={styles.secondary}>
              Discover Our Solutions
            </Button>
          </div>
          <ul className={styles.trust}>
            <li>
              <Icon name="check" size={16} /> Daily payouts
            </li>
            <li>
              <Icon name="check" size={16} /> 80% renewable power
            </li>
            <li>
              <Icon name="check" size={16} /> No hardware to manage
            </li>
          </ul>
        </div>

        <div className={styles.visual}>
          <img className={styles.art} src="/images/art-hand-phone.webp" alt="" width={880} height={1002} fetchPriority="high" />
          <div className={`${styles.float} ${styles.floatA}`} aria-hidden="true">
            <span className={styles.floatIcon}>
              <Icon name="trending-up" size={18} />
            </span>
            <div>
              <small>Mined today</small>
              <strong className="tabular">{mined.toFixed(8)} BTC</strong>
            </div>
          </div>
          <div className={`${styles.float} ${styles.floatB}`} aria-hidden="true">
            <span className={styles.floatIcon}>
              <Icon name="zap" size={18} />
            </span>
            <div>
              <small>Your hashrate</small>
              <strong className="tabular">{hash.toFixed(1)} TH/s</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
