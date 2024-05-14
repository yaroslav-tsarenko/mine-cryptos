import { FunctionComponent } from "react";
import FrameComponent10 from "./FrameComponent10";
import styles from "./GroupComponent4.module.css";

const GroupComponent4: FunctionComponent = () => {
  return (
    <section className={styles.frameParent}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src="/group-85@2x.png"
      />
      <FrameComponent10
        mineCryptosAlignSelf="stretch"
        mineCryptosFlex="unset"
        frameDivMargin="unset"
      />
      <div className={styles.frameWrapper}>
        <div className={styles.frameGroup}>
          <div className={styles.whereInnovationMeetsOpportuWrapper}>
            <h1 className={styles.whereInnovationMeets}>
              Where Innovation Meets Opportunity
            </h1>
          </div>
          <div className={styles.minecryptosWasBorn}>
            MineCryptos was born out of a shared passion for cryptocurrencies
            and a vision to make blockchain technology accessible to all.
            Founded by a team of seasoned experts in the field, our story is one
            of transformation, innovation, and an unwavering commitment to
            revolutionize the world of crypto mining.
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent4;
