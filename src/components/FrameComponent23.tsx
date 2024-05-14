import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import FrameComponent24 from "./FrameComponent24";
import styles from "./FrameComponent23.module.css";

const FrameComponent23: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-55@2x.png"
        />
        <div className={styles.frameWrapper}>
          <div className={styles.titleParent}>
            <div className={styles.title}>
              Goal Setting: Turning Dreams into Achievable Reality
            </div>
            <h1 className={styles.title1}>
              Decentralized Finance (DeFi): A Game-Changer for Crypto Miners
            </h1>
            <div className={styles.title2}>
              Lorem ipsum dolor sit amet consectetur. Vestibulum aenean libero
              mauris vivamus tincidunt. Dignissim nam tellus id placerat vitae
              risus et porttitor. Orci lorem mauris arcu pellentesque mi tellus
              mauris quam enim. Convallis condimentum ut dui ornare. In augue
              aliquam lectus amet massa. Nisl id vivamus donec sit viverra elit
              commodo purus enim. Aliquet hendrerit nullam platea elementum
              mattis quam bibendum mi. Id amet dignissim fames mattis sagittis
              eget elit faucibus. Vestibulum urna duis odio nec rhoncus urna nam
              in viverra.
            </div>
            <Button
              className={styles.frameItem}
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                background: "#3f28c6",
                borderRadius: "100px",
                "&:hover": { background: "#3f28c6" },
                width: 175,
                height: 56,
              }}
            >
              Read more
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.componentParent}>
        <FrameComponent24
          rectangle4="/rectangle-4@2x.png"
          theFutureOfFinanceExplori="The Future of Finance: Exploring DeFi and Its Potential"
        />
        <FrameComponent24
          rectangle4="/rectangle-4-1@2x.png"
          theFutureOfFinanceExplori="Understanding Proof-of-Stake vs. Proof-of-Work in Cryptocurrency"
        />
        <FrameComponent24
          rectangle4="/rectangle-4-2@2x.png"
          theFutureOfFinanceExplori="Specialized Hardware: The Backbone of Efficient Cryptocurrency Mining"
        />
      </div>
    </div>
  );
};

export default FrameComponent23;
