import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import GroupComponent3 from "../components/GroupComponent3";
import FrameComponent5 from "../components/FrameComponent5";
import FrameComponent4 from "../components/FrameComponent4";
import GroupComponent5 from "../components/GroupComponent5";
import styles from "./Faq.module.css";

const Faq: FunctionComponent = () => {
  return (
    <div className={styles.faq}>

      <FrameComponent5 />
      <FrameComponent4 />
      <section className={styles.faqInner}>
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
            <div className={styles.rectangleParent}>
              <img
                className={styles.instanceChild}
                loading="lazy"
                alt=""
                src="/rectangle-11@2x.png"
              />
              <div className={styles.frameGroup}>
                <div className={styles.bitforgeProMinerParent}>
                  <h3 className={styles.bitforgeProMiner}>
                    CryptoVault Hosting
                  </h3>
                  <div className={styles.sha256AlgorithmMining}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit20000}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleGroup}>
              <img
                className={styles.instanceItem}
                loading="lazy"
                alt=""
                src="/rectangle-11-1@2x.png"
              />
              <div className={styles.frameContainer}>
                <div className={styles.bitforgeProMinerGroup}>
                  <h3 className={styles.bitforgeProMiner1}>HashPower Hub</h3>
                  <div className={styles.sha256AlgorithmMining1}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200001}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleContainer}>
              <img
                className={styles.instanceInner}
                loading="lazy"
                alt=""
                src="/rectangle-11-2@2x.png"
              />
              <div className={styles.frameDiv}>
                <div className={styles.bitforgeProMinerContainer}>
                  <h3 className={styles.bitforgeProMiner2}>BitMine Nexus</h3>
                  <div className={styles.sha256AlgorithmMining2}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200002}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleParent1}>
              <img
                className={styles.rectangleIcon}
                loading="lazy"
                alt=""
                src="/rectangle-11-3@2x.png"
              />
              <div className={styles.frameParent1}>
                <div className={styles.bitforgeProMinerParent1}>
                  <h3 className={styles.bitforgeProMiner3}>SecureHash Haven</h3>
                  <div className={styles.sha256AlgorithmMining3}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200003}>Credit: 200.00</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GroupComponent5 />
    </div>
  );
};

export default Faq;
