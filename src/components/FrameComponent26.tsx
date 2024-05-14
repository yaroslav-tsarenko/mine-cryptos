import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import FrameComponent17 from "./FrameComponent17";
import FrameComponent16 from "./FrameComponent16";
import styles from "./FrameComponent26.module.css";

const FrameComponent26: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.frequentlyAskedQuestionsWrapper}>
          <h1 className={styles.frequentlyAskedQuestions}>
            Frequently Asked Questions
          </h1>
        </div>
        <Button
          className={styles.frameChild}
          disableElevation={true}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#3f28c6",
            fontSize: "16",
            borderColor: "#3f28c6",
            borderRadius: "100px",
            "&:hover": { borderColor: "#3f28c6" },
            width: 172,
            height: 56,
          }}
        >
          Go to FAQ
        </Button>
      </div>
      <div className={styles.frameContainer}>
        <div className={styles.frameDiv}>
          <div className={styles.frameParent1}>
            <div className={styles.howDoIGetStartedWithCrypParent}>
              <h3 className={styles.howDoI}>
                How Do I Get Started with Cryptocurrency Mining at MineCryptos?
              </h3>
              <div className={styles.vectorWrapper}>
                <img className={styles.frameItem} alt="" src="/vector-17.svg" />
              </div>
            </div>
            <div className={styles.toGetStarted}>
              To get started, simply sign up for an account, choose your
              preferred hosting service or mining package, and follow our setup
              instructions. Our user-friendly platform makes it easy to
              kick-start your mining journey.
            </div>
          </div>
          <img
            className={styles.frameInner}
            loading="lazy"
            alt=""
            src="/vector-10.svg"
          />
        </div>
        <FrameComponent17 />
        <FrameComponent16 />
        <div className={styles.frameParent2}>
          <div className={styles.canIUpgradeOrScaleMyMiniWrapper}>
            <h3 className={styles.canIUpgrade}>
              {" "}
              Can I Upgrade or Scale My Mining Services with MineCryptos?
            </h3>
          </div>
          <div className={styles.vectorContainer}>
            <img className={styles.vectorIcon} alt="" src="/vector-17.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent26;
