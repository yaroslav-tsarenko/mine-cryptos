import { FunctionComponent } from "react";
import styles from "./FrameComponent4.module.css";

const FrameComponent4: FunctionComponent = () => {
  return (
    <section className={styles.frameWrapper}>
      <div className={styles.frameParent}>
        <div className={styles.theTriadOfExcellenceSpeedParent}>
          <h1 className={styles.theTriadOf}>
            {" "}
            The Triad of Excellence: Speed, Security, and Scalability
          </h1>
          <div className={styles.atMinecryptosWereContainer}>
            <p className={styles.atMinecryptosWere}>
              At MineCryptos, we're not just a service provider; we're your
              strategic partner in the world of cryptocurrency mining. Our
              commitment to excellence, customer-centric approach, and
              dedication to staying at the forefront of the industry set us
              apart. Discover why we're the trusted choice for miners worldwide.
            </p>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.rectangleParent}>
            <img
              className={styles.frameChild}
              loading="lazy"
              alt=""
              src="/rectangle-8@2x.png"
            />
            <div className={styles.ourHostingServices}>
              Our hosting services are optimized for high-speed mining, ensuring
              rapid transaction confirmations and maximum mining efficiency.
            </div>
          </div>
          <div className={styles.rectangleGroup}>
            <img
              className={styles.frameItem}
              loading="lazy"
              alt=""
              src="/rectangle-8-1@2x.png"
            />
            <div className={styles.yourDataIs}>
              Your data is encrypted and protected against cyber threats,
              ensuring the utmost security for your mining operations.
            </div>
          </div>
          <div className={styles.rectangleContainer}>
            <img
              className={styles.frameInner}
              alt=""
              src="/rectangle-8-2@2x.png"
            />
            <div className={styles.ourHostingPlans}>
              Our hosting plans are designed to accommodate miners of all sizes,
              from small-scale enthusiasts to large-scale mining operations.
            </div>
            <img
              className={styles.unionIcon}
              loading="lazy"
              alt=""
              src="/union-2@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent4;
