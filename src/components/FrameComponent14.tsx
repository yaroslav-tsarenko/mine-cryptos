import { FunctionComponent } from "react";
import styles from "./FrameComponent14.module.css";

export type FrameComponent14Type = {
  rectangle8?: string;
  innovation?: string;
  weAreDedicatedToStayingAt?: string;
};

const FrameComponent14: FunctionComponent<FrameComponent14Type> = ({
  rectangle8,
  innovation,
  weAreDedicatedToStayingAt,
}) => {
  return (
    <div className={styles.rectangleParent}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src={rectangle8}
      />
      <div className={styles.innovationParent}>
        <h3 className={styles.innovation}>{innovation}</h3>
        <div className={styles.weAreDedicated}>{weAreDedicatedToStayingAt}</div>
      </div>
    </div>
  );
};

export default FrameComponent14;
