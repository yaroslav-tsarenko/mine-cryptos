import { FunctionComponent } from "react";
import styles from "./FrameComponent22.module.css";

export type FrameComponent22Type = {
  rectangle55?: string;
  title?: string;
};

const FrameComponent22: FunctionComponent<FrameComponent22Type> = ({
  rectangle55,
  title,
}) => {
  return (
    <div className={styles.rectangleParent}>
      <img
        className={styles.componentChild}
        loading="lazy"
        alt=""
        src={rectangle55}
      />
      <div className={styles.frameParent}>
        <div className={styles.titleParent}>
          <div className={styles.title}>Missey Cooper</div>
          <h3 className={styles.title1}>{title}</h3>
        </div>
        <div className={styles.title2}>Read More</div>
      </div>
    </div>
  );
};

export default FrameComponent22;
