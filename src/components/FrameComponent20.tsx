import { FunctionComponent } from "react";
import styles from "./FrameComponent20.module.css";

export type FrameComponent20Type = {
  rectangle11?: string;
  bitForgeProMiner?: string;
};

const FrameComponent20: FunctionComponent<FrameComponent20Type> = ({
  rectangle11,
  bitForgeProMiner,
}) => {
  return (
    <div className={styles.rectangleParent}>
      <img
        className={styles.instanceChild}
        loading="lazy"
        alt=""
        src={rectangle11}
      />
      <div className={styles.frameParent}>
        <div className={styles.bitforgeProMinerParent}>
          <h3 className={styles.bitforgeProMiner}>{bitForgeProMiner}</h3>
          <div className={styles.sha256AlgorithmMining}>
            SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
          </div>
        </div>
        <b className={styles.credit20000}>Credit: 200.00</b>
      </div>
    </div>
  );
};

export default FrameComponent20;
