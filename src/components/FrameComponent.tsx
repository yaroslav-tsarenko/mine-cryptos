import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import FrameComponent1 from "./FrameComponent1";
import styles from "./FrameComponent.module.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <section className={styles.frameWrapper}>
      <div className={styles.frameParent}>
        <div className={styles.unionParent}>
          <img className={styles.unionIcon} alt="" src="/union-3@2x.png" />
          <div className={styles.discoverOurLatestInsightsParent}>
            <h1 className={styles.discoverOurLatest}>
              Discover Our Latest Insights
            </h1>
            <div className={styles.instanceWrapper}>
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
                  height: 56,
                }}
              >
                Go to blogs
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.componentParent}>
          <FrameComponent1
            rectangle13="/rectangle-13@2x.png"
            masteringCryptocurrencyMi="Mastering Cryptocurrency Mining: A Beginner's Guide"
            image="/image@2x.png"
          />
          <FrameComponent1
            rectangle13="/rectangle-13-1@2x.png"
            masteringCryptocurrencyMi="The Future of Blockchain Technology: What to Watch For"
            image="/image-1@2x.png"
          />
          <FrameComponent1
            rectangle13="/rectangle-13-2@2x.png"
            masteringCryptocurrencyMi="Crypto Mining Trends 2023: What's on the Horizon"
            image="/image-2@2x.png"
          />
          <FrameComponent1
            rectangle13="/rectangle-13-3@2x.png"
            masteringCryptocurrencyMi="Sustainable Mining: Balancing Profit and the Environment"
            image="/image@2x.png"
          />
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
