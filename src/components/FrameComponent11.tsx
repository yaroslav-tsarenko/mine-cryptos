import { FunctionComponent } from "react";
import styles from "./FrameComponent11.module.css";

const FrameComponent11: FunctionComponent = () => {
  return (
    <section className={styles.frameWrapper}>
      <div className={styles.unionParent}>
        <img className={styles.unionIcon} alt="" src="/union@2x.png" />
        <div className={styles.rectangleParent}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/rectangle-9-1@2x.png"
          />
          <div className={styles.frameContainer}>
            <div className={styles.frameParent}>
              <div className={styles.ourVisionParent}>
                <div className={styles.ourVision}>Our Vision</div>
                <h1 className={styles.aWorldTransformed}>
                  A World Transformed by Blockchain
                </h1>
              </div>
              <div className={styles.ourVisionAt}>
                Our vision at MineCryptos is to witness a world where the
                benefits of blockchain technology are embraced by all. We strive
                for a future where the blockchain is the cornerstone of global
                financial systems, bringing transparency, security, and economic
                empowerment to millions around the globe.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent11;
