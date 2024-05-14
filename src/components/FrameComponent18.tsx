import { FunctionComponent } from "react";
import styles from "./FrameComponent18.module.css";

const FrameComponent18: FunctionComponent = () => {
  return (
    <section className={styles.pdpInner}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.specificationParent}>
            <h3 className={styles.specification}>Specification</h3>
            <h3 className={styles.enquiries}>Enquiries</h3>
            <h3 className={styles.reviews}>Reviews</h3>
          </div>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/vector-19.svg"
          />
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameItem} />
          <div className={styles.vectorParent}>
            <img className={styles.frameInner} alt="" src="/vector-19-1.svg" />
            <img
              className={styles.vectorIcon}
              loading="lazy"
              alt=""
              src="/vector-24.svg"
            />
            <img className={styles.frameChild1} alt="" src="/vector-19-1.svg" />
            <img className={styles.frameChild2} alt="" src="/vector-19-1.svg" />
            <img className={styles.frameChild3} alt="" src="/vector-19-1.svg" />
            <img className={styles.frameChild4} alt="" src="/vector-19-1.svg" />
          </div>
          <div className={styles.exclusiveHardwareParent}>
            <b className={styles.exclusiveHardware}>Exclusive Hardware</b>
            <b className={styles.customization}>Customization</b>
            <b className={styles.enhancedSecurity}>Enhanced Security</b>
            <b className={styles.monitoring}>24/7 Monitoring</b>
            <b className={styles.scalability}>Scalability</b>
            <b className={styles.highSpeedConnectivity}>
              High-Speed Connectivity
            </b>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.yourOwnDedicatedServerWithParent}>
              <div className={styles.yourOwnDedicated}>
                Your own dedicated server with top-tier hardware for maximum
                performance.
              </div>
              <div className={styles.tailorYourHosting}>
                Tailor your hosting environment to meet your specific crypto
                requirements.
              </div>
              <div className={styles.multiLayeredSecurityMeasure}>
                Multi-layered security measures, including advanced encryption
                and regular security audits.
              </div>
              <div className={styles.continuousServerMonitoring}>
                Continuous server monitoring to ensure uptime and rapid issue
                resolution.
              </div>
              <div className={styles.easilyScaleYour}>
                Easily scale your resources up or down based on your crypto
                projects and demands.
              </div>
              <div className={styles.lightningFastNetworkConnect}>
                Lightning-fast network connectivity for seamless crypto
                transactions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent18;
