import { FunctionComponent } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import FrameComponent9 from "./FrameComponent9";
import styles from "./FrameComponent19.module.css";

const FrameComponent19: FunctionComponent = () => {
  return (
    <section className={styles.pdpInner}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-111@2x.png"
        />
        <div className={styles.frameWrapper}>
          <div className={styles.frameParent}>
            <div className={styles.cryptonestMinerParent}>
              <h1 className={styles.cryptonestMiner}>CryptoNest Miner</h1>
              <h3 className={styles.tha256AlgorithmMining}>
                THA-256 Algorithm Mining Server 75 TH/s | 1250 W | 32 J/TH
              </h3>
            </div>
            <div className={styles.cryptonestOurCuttingEdge}>
              CryptoNest, our cutting-edge hosting server, provides the perfect
              environment for your mining rigs to thrive. Nestled in the heart
              of secure facilities, CryptoNest offers a cozy and technologically
              advanced home for your valuable mining equipment. With 24/7
              monitoring and state-of-the-art security, it ensures your rigs are
              always in safe and efficient hands. Join CryptoNest to experience
              the pinnacle of cryptocurrency mining hosting.
            </div>
            <div className={styles.frameGroup}>
              <div className={styles.frameContainer}>
                <div className={styles.frameDiv}>
                  <div className={styles.monthlyParent}>
                    <div className={styles.monthly}>Monthly</div>
                    <div className={styles.hourly}>Hourly</div>
                  </div>
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.rectangleWrapper}>
                    <div className={styles.frameItem} />
                  </div>
                  <img
                    className={styles.frameInner}
                    loading="lazy"
                    alt=""
                    src="/vector-25.svg"
                  />
                </div>
              </div>
              <div className={styles.rectangleDiv} />
              <div className={styles.frameWrapper1}>
                <div className={styles.frameParent2}>
                  <div className={styles.durationWrapper}>
                    <div className={styles.duration}>Duration:</div>
                  </div>
                  <FormControl
                    className={styles.parent}
                    variant="standard"
                    sx={{
                      borderColor: "#212121",
                      borderStyle: "SOLID",
                      borderTopWidth: "1px",
                      borderRightWidth: "1px",
                      borderBottomWidth: "1px",
                      borderLeftWidth: "1px",
                      borderRadius: "0px 0px 0px 0px",
                      width: "69.6078431372549%",
                      height: "41px",
                      m: 0,
                      p: 0,
                      "& .MuiInputBase-root": {
                        m: 0,
                        p: 0,
                        minHeight: "41px",
                        justifyContent: "center",
                        display: "inline-flex",
                      },
                      "& .MuiInputLabel-root": {
                        m: 0,
                        p: 0,
                        minHeight: "41px",
                        display: "inline-flex",
                      },
                      "& .MuiMenuItem-root": {
                        m: 0,
                        p: 0,
                        height: "41px",
                        display: "inline-flex",
                      },
                      "& .MuiSelect-select": {
                        m: 0,
                        p: 0,
                        height: "41px",
                        alignItems: "center",
                        display: "inline-flex",
                      },
                      "& .MuiInput-input": { m: 0, p: 0 },
                      "& .MuiInputBase-input": {
                        color: "#212121",
                        fontSize: 16,
                        fontWeight: "Regular",
                        fontFamily: "Euclid Flex",
                        textAlign: "left",
                        p: "0 !important",
                        marginLeft: "13px",
                      },
                    }}
                  >
                    <InputLabel color="primary" />
                    <Select
                      color="primary"
                      disableUnderline
                      displayEmpty
                      IconComponent={() => (
                        <img
                          width="22px"
                          height="11px"
                          src="/frame-198.png"
                          style={{ marginRight: "15px" }}
                        />
                      )}
                    >
                      <MenuItem>7 Hours</MenuItem>
                    </Select>
                    <FormHelperText />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={styles.quantityParent}>
              <div className={styles.quantity}>Quantity:</div>
              <div className={styles.frameParent3}>
                <div className={styles.wrapper}>
                  <div className={styles.div}>-</div>
                </div>
                <div className={styles.container}>
                  <div className={styles.div1}>1</div>
                </div>
                <div className={styles.frame}>
                  <div className={styles.div2}>+</div>
                </div>
              </div>
            </div>
            <FrameComponent9
              frame3="Start Your Journey"
              propHeight="56px"
              propFlex="unset"
              propMinWidth="unset"
              propBorderRadius="unset"
              propBackgroundColor="unset"
              propDisplay="unset"
              propFlexDirection="unset"
              propPadding="unset"
              propWidth="229px"
            />
            <div className={styles.vatApplicableOn}>
              20% VAT Applicable on UK based Products.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent19;
