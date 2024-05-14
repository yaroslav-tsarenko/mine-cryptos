import { FunctionComponent } from "react";
import styles from "./FrameComponent25.module.css";

const FrameComponent25: FunctionComponent = () => {
  return (
    <header className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.minecryptosWrapper}>
            <h1 className={styles.minecryptos}>MineCryptos</h1>
          </div>
        </div>
      </div>
      <div className={styles.homeParent}>
        <b className={styles.home}>Home</b>
        <b className={styles.articles}>Articles</b>
        <b className={styles.aboutUs}>About Us</b>
        <div className={styles.instanceWrapper}>
          <div className={styles.startYourJourneyWrapper}>
            <div className={styles.startYourJourney}>Start Your Journey</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrameComponent25;
