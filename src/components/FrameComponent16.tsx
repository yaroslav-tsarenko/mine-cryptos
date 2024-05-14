import { FunctionComponent } from "react";
import styles from "./FrameComponent16.module.css";

const FrameComponent16: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.areMyAssetsAndDataSecureWrapper}>
          <h3 className={styles.areMyAssets}>
            Are My Assets and Data Secure with MineCryptos?
          </h3>
        </div>
        <div className={styles.vectorWrapper}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/vector-17.svg"
          />
        </div>
      </div>
      <img
        className={styles.frameItem}
        loading="lazy"
        alt=""
        src="/vector-10.svg"
      />
    </div>
  );
};

export default FrameComponent16;
