import { FunctionComponent } from "react";
import FrameComponent10 from "./FrameComponent10";
import FrameComponent9 from "./FrameComponent9";
import styles from "./GroupComponent2.module.css";

const GroupComponent2: FunctionComponent = () => {
  return (
    <section className={styles.unionParent}>
      <img
        className={styles.unionIcon}
        loading="lazy"
        alt=""
        src="/union-1@2x.png"
      />
      <img className={styles.frameChild} alt="" src="/group-78@2x.png" />
      <FrameComponent10 />
      <div className={styles.frameWrapper}>
        <div className={styles.rectangleParent}>
          <img className={styles.frameItem} alt="" src="/rectangle-4@2x.svg" />
          <div className={styles.frameParent}>
            <div className={styles.forgeYourCryptoDestinyParent}>
              <h1 className={styles.forgeYourCrypto}>
                Forge Your Crypto Destiny
              </h1>
              <div className={styles.atMinecryptosWere}>
                At MineCryptos, we're not just mining crypto; we're forging a
                new era of financial independence. Join us as we pave the path
                to prosperity, one blockchain at a time. Your destiny in the
                world of cryptocurrency begins here.
              </div>
            </div>
            <div className={styles.componentParent}>
              <FrameComponent9 frame3="Start Your Journey" />
              <div className={styles.discoverOurSolutionsParent}>
                <b className={styles.discoverOurSolutions}>
                  Discover Our Solutions
                </b>
                <img
                  className={styles.frameInner}
                  loading="lazy"
                  alt=""
                  src="/arrow-1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent2;
