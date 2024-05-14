import { FunctionComponent } from "react";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  rectangle13?: string;
  masteringCryptocurrencyMi?: string;
  image?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  rectangle13,
  masteringCryptocurrencyMi,
  image,
}) => {
  return (
    <div className={styles.rectangleParent}>
      <img
        className={styles.componentChild}
        loading="lazy"
        alt=""
        src={rectangle13}
      />
      <div className={styles.frameParent}>
        <div className={styles.masteringCryptocurrencyMininParent}>
          <h3 className={styles.masteringCryptocurrencyMinin}>
            {masteringCryptocurrencyMi}
          </h3>
          <div className={styles.inTheJourney}>
            In the journey of personal growth and self-transformation, the way
            we speak to ourselves matters more than we often realize.
          </div>
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.imageParent}>
            <img
              className={styles.imageIcon}
              loading="lazy"
              alt=""
              src={image}
            />
            <div className={styles.authorWrapper}>
              <div className={styles.author}>Mark Thompson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
