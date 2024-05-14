import { FunctionComponent } from "react";
import FrameComponent6 from "./FrameComponent6";
import styles from "./FrameComponent5.module.css";

const FrameComponent5: FunctionComponent = () => {
  return (
    <section className={styles.frameParent}>
      <div className={styles.unionParent}>
        <img className={styles.unionIcon} alt="" src="/union-2@2x.png" />
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-6@2x.png"
        />
      </div>
      <div className={styles.frameWrapper}>
        <div className={styles.unionGroup}>
          <img
            className={styles.unionIcon1}
            loading="lazy"
            alt=""
            src="/union-3@2x.png"
          />
          <div className={styles.frameGroup}>
            <div className={styles.whyMinecryptosIsYourCryptoParent}>
              <h1 className={styles.whyMinecryptosIs}>
                Why MineCryptos is Your Crypto Mining Partner
              </h1>
              <div className={styles.atMinecryptosWere}>
                At MineCryptos, we're committed to delivering the best-in-class
                cryptocurrency mining experience. Our passion for innovation,
                unwavering dedication, and cutting-edge technology set us apart
                in the crypto mining industry. Discover why we're your ideal
                partner in this exciting journey.
              </div>
            </div>
            <div className={styles.frameContainer}>
              <FrameComponent6
                rectangle5="/rectangle-5@2x.png"
                ensuringOptimalPerformanc="ensuring optimal performance and uptime."
                rectangle51="/rectangle-5@2x.png"
                wideArrayOfOptionsToMeetY="wide array of options to meet your specific mining needs"
              />
              <FrameComponent6
                rectangle5="/rectangle-5@2x.png"
                ensuringOptimalPerformanc="offering you valuable insights and support"
                rectangle51="/rectangle-5@2x.png"
                wideArrayOfOptionsToMeetY={`vibrant community of miners & access educational resources`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent5;
