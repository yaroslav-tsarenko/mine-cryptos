import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import FrameComponent8 from "./FrameComponent8";
import styles from "./FrameComponent7.module.css";

const FrameComponent7: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.exploreOurCryptoMiningSoluParent}>
        <h1 className={styles.exploreOurCrypto}>
          Explore Our Crypto Mining Solutions
        </h1>
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
            width: 152,
            height: 56,
          }}
        >
          View All
        </Button>
      </div>
      <div className={styles.instanceParent}>
        <FrameComponent8
          rectangle11="/rectangle-11@2x.png"
          bitForgeProMiner="CryptoVault Hosting"
        />
        <FrameComponent8
          rectangle11="/rectangle-11-1@2x.png"
          bitForgeProMiner="HashPower Hub"
        />
        <FrameComponent8
          rectangle11="/rectangle-11-2@2x.png"
          bitForgeProMiner="BitMine Nexus"
        />
        <FrameComponent8
          rectangle11="/rectangle-11-3@2x.png"
          bitForgeProMiner="SecureHash Haven"
        />
      </div>
    </div>
  );
};

export default FrameComponent7;
