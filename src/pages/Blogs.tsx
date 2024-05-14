import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import GroupComponent7 from "../components/GroupComponent7";
import FrameComponent23 from "../components/FrameComponent23";
import FrameComponent21 from "../components/FrameComponent21";
import FrameComponent20 from "../components/FrameComponent20";
import GroupComponent6 from "../components/GroupComponent6";
import styles from "./Blogs.module.css";

const Blogs: FunctionComponent = () => {
  return (
    <div className={styles.blogs}>
      <GroupComponent7 />
      <section className={styles.blogsInner}>
        <div className={styles.frameParent}>
          <FrameComponent23 />
          <FrameComponent21 />
        </div>
      </section>
      <section className={styles.blogsChild}>
        <div className={styles.frameGroup}>
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
            <FrameComponent20
              rectangle11="/rectangle-11@2x.png"
              bitForgeProMiner="CryptoVault Hosting"
            />
            <FrameComponent20
              rectangle11="/rectangle-11-1@2x.png"
              bitForgeProMiner="HashPower Hub"
            />
            <FrameComponent20
              rectangle11="/rectangle-11-2@2x.png"
              bitForgeProMiner="BitMine Nexus"
            />
            <FrameComponent20
              rectangle11="/rectangle-11-3@2x.png"
              bitForgeProMiner="SecureHash Haven"
            />
          </div>
        </div>
      </section>
      <GroupComponent6 />
    </div>
  );
};

export default Blogs;
