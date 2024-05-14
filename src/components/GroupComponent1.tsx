import { FunctionComponent } from "react";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent9 from "./FrameComponent9";
import styles from "./GroupComponent1.module.css";

const GroupComponent1: FunctionComponent = () => {
  return (
    <section className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.getInTouchParent}>
            <h1 className={styles.getInTouch}>Get in Touch</h1>
            <div className={styles.haveQuestionsOr}>
              Have questions or need assistance? Reach out to us, and our
              dedicated team will respond promptly.
            </div>
          </div>
          <img
            className={styles.frameItem}
            loading="lazy"
            alt=""
            src="/rectangle-54@2x.png"
          />
        </div>
        <div className={styles.frameContainer}>
          <FrameComponent2 name1="Name *" typeNamePlaceholder="Type Name" />
          <FrameComponent2
            name1="Email *"
            typeNamePlaceholder="Type Email"
            propMinWidth="50px"
            propDisplay="inline-block"
            propWidth="78px"
          />
          <FrameComponent2
            name1="Phone"
            typeNamePlaceholder="Type Phone"
            propMinWidth="46px"
            propDisplay="inline-block"
            propWidth="84px"
          />
          <FrameComponent2
            name1="How can we help you? *"
            typeNamePlaceholder="Type Message"
            propMinWidth="unset"
            propDisplay="unset"
            propWidth="103px"
          />
          <div className={styles.servicesParent}>
            <div className={styles.services}>Services *</div>
            <div className={styles.frameDiv}>
              <div className={styles.rectangleGroup}>
                <div className={styles.frameInner} />
                <div className={styles.wHostingPlansWrapper}>
                  <div className={styles.wHosting}>100W + Hosting Plans</div>
                </div>
              </div>
              <div className={styles.rectangleContainer}>
                <div className={styles.rectangleDiv} />
                <div className={styles.wHostingPlansContainer}>
                  <div className={styles.wHostingPlans}>
                    200W+ Hosting Plans
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameParent1}>
              <div className={styles.rectangleParent1}>
                <div className={styles.frameChild1} />
                <div className={styles.wHostingPlansFrame}>
                  <div className={styles.wHostingPlans1}>
                    1000W+ Hosting Plans
                  </div>
                </div>
              </div>
              <div className={styles.rectangleParent2}>
                <div className={styles.frameChild2} />
                <div className={styles.notSureWrapper}>
                  <div className={styles.notSure}>Not Sure</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.instanceParent}>
            <FrameComponent9
              frame3="Submit"
              propHeight="56px"
              propFlex="1"
              propMinWidth="unset"
              propBorderRadius="unset"
              propBackgroundColor="unset"
              propDisplay="unset"
              propFlexDirection="unset"
              propPadding="unset"
              propWidth="unset"
            />
            <div className={styles.frameWrapper}>
              <div className={styles.viewFaqParent}>
                <b className={styles.viewFaq}>View FAQ</b>
                <div className={styles.vectorWrapper}>
                  <img
                    className={styles.arrowIcon}
                    loading="lazy"
                    alt=""
                    src="/arrow-1-1.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent1;
