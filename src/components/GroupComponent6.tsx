import { FunctionComponent } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styles from "./GroupComponent6.module.css";

const GroupComponent6: FunctionComponent = () => {
  return (
    <section className={styles.frameParent}>
      <img className={styles.instanceChild} alt="" src="/group-79@2x.png" />
      <div className={styles.frameWrapper}>
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.subscribeAndSaveWithMinecrParent}>
              <h1 className={styles.subscribeAndSave}>
                Subscribe and Save with MineCryptos
              </h1>
              <div className={styles.subscribeAndSave1}>
                Subscribe and Save 10% on every purchase with MineCryptos
              </div>
            </div>
          </div>
          <TextField
            className={styles.frameChild}
            placeholder="Provide your Email"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <img width="15px" height="30px" src="/vector-17.svg" />
              ),
            }}
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiInputBase-root": {
                height: "79px",
                paddingRight: "32px",
                borderRadius: "0px 0px 0px 0px",
              },
              "& .MuiInputBase-input": { color: "rgba(63, 40, 198, 0.6)" },
              width: "665px",
            }}
          />
        </div>
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.frameDiv}>
          <div className={styles.frameParent1}>
            <div className={styles.rectangleWrapper}>
              <div className={styles.frameItem} />
            </div>
            <div className={styles.termsAndConditionsParent}>
              <b className={styles.termsAndConditions}>Terms and Conditions</b>
              <b className={styles.privacyPolicy}>{`Privacy Policy `}</b>
              <b className={styles.refundPolicy}>Refund Policy</b>
              <b
                className={styles.cancellationPolicy}
              >{`Cancellation Policy `}</b>
            </div>
          </div>
        </div>
        <div className={styles.atMinecryptosWereCommitteParent}>
          <div className={styles.atMinecryptosWere}>
            At MineCryptos, we're committed to providing you with top-tier
            cryptocurrency mining solutions, exceptional service, and the
            resources you need to thrive in the ever-changing world of digital
            finance. Our mission is to help you unlock the potential of
            blockchain technology and build a secure financial future. Join our
            community, stay informed with our educational content, and explore
            our diverse range of services. Start your crypto journey with
            MineCryptos today and take the first step towards mining success.
          </div>
          <div className={styles.copyright2023MinecryptoseWrapper}>
            <div className={styles.copyright2023Minecryptose}>
              {" "}
              Copyright ©2023 ‘MineCryptose’. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent6;
