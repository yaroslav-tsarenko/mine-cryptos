import { FunctionComponent } from "react";
import styles from "./FrameComponent24.module.css";

export type FrameComponent24Type = {
  rectangle4?: string;
  theFutureOfFinanceExplori?: string;
};

const FrameComponent24: FunctionComponent<FrameComponent24Type> = ({
  rectangle4,
  theFutureOfFinanceExplori,
}) => {
  return (
    <div className={styles.frameWrapper}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src={rectangle4}
        />
        <div className={styles.frameParent}>
          <div className={styles.sarahLawsonParent}>
            <div className={styles.sarahLawson}>Sarah Lawson</div>
            <h3 className={styles.theFutureOf}>{theFutureOfFinanceExplori}</h3>
          </div>
          <div className={styles.readMore}>{`Read More>`}</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent24;
