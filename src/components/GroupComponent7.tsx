import { FunctionComponent } from "react";
import FrameComponent25 from "./FrameComponent25";
import styles from "./GroupComponent7.module.css";

const GroupComponent7: FunctionComponent = () => {
  return (
    <section className={styles.frameParent}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src="/group-852@2x.png"
      />
      <FrameComponent25 />
      <div className={styles.frameWrapper}>
        <div className={styles.insightsAndUpdatesParent}>
          <h1 className={styles.insightsAndUpdates}>Insights and Updates</h1>
          <div className={styles.welcomeToOurInsightsAndUWrapper}>
            <div className={styles.welcomeToOur}>
              Welcome to our 'Insights and Updates' section, where we delve into
              the fascinating world of cryptocurrency mining and blockchain
              technology. Here, you'll find informative articles, expert
              analysis, and the latest industry news to help you stay informed
              and make the most of your mining journey. Explore our blog for
              valuable insights and updates that will keep you at the forefront
              of the crypto mining landscape.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent7;
