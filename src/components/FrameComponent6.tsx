import { FunctionComponent } from "react";
import styles from "./FrameComponent6.module.css";

export type FrameComponent6Type = {
  rectangle5?: string;
  ensuringOptimalPerformanc?: string;
  rectangle51?: string;
  wideArrayOfOptionsToMeetY?: string;
};

const FrameComponent6: FunctionComponent<FrameComponent6Type> = ({
  rectangle5,
  ensuringOptimalPerformanc,
  rectangle51,
  wideArrayOfOptionsToMeetY,
}) => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src={rectangle5}
        />
        <div className={styles.ensuringOptimalPerformance}>
          {ensuringOptimalPerformanc}
        </div>
      </div>
      <div className={styles.rectangleGroup}>
        <img
          className={styles.frameItem}
          loading="lazy"
          alt=""
          src={rectangle51}
        />
        <div className={styles.wideArrayOf}>{wideArrayOfOptionsToMeetY}</div>
      </div>
    </div>
  );
};

export default FrameComponent6;
