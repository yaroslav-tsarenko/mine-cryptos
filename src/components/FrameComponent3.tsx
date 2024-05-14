import { FunctionComponent } from "react";
import styles from "./FrameComponent3.module.css";

const FrameComponent3: FunctionComponent = () => {
  return (
    <section className={styles.frameWrapper}>
      <div className={styles.unionParent}>
        <img className={styles.unionIcon} alt="" src="/union-2@2x.png" />
        <div className={styles.unionGroup}>
          <img
            className={styles.unionIcon1}
            loading="lazy"
            alt=""
            src="/union-6@2x.png"
          />
          <img className={styles.frameChild} alt="" src="/rectangle-9@2x.png" />
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.yourJourneyOurGuidanceParent}>
                <div className={styles.yourJourneyOur}>
                  Your Journey, Our Guidance
                </div>
                <h1 className={styles.miningWithConfidence}>
                  Mining with Confidence
                </h1>
              </div>
              <div className={styles.atMinecryptosWe}>
                At MineCryptos, we understand that the world of cryptocurrency
                mining can be complex and ever-evolving. That's why we're
                committed to providing you with the tools, knowledge, and
                support you need to mine with confidence. Our mission is to
                empower you to navigate the crypto mining landscape with ease
                and success.
              </div>
            </div>
            <div className={styles.loremIpsumWrapper}>
              <div className={styles.loremIpsum}>
                Your Journey, Our Guidance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent3;
