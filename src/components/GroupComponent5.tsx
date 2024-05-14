import { FunctionComponent } from "react";
import FrameComponent10 from "./FrameComponent10";
import styles from "./GroupComponent5.module.css";

const GroupComponent5: FunctionComponent = () => {
  return (
    <header className={styles.frameParent}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src="/group-851@2x.png"
      />
      <FrameComponent10
        mineCryptosAlignSelf="unset"
        mineCryptosFlex="1"
        frameDivMargin="unset"
      />
    </header>
  );
};

export default GroupComponent5;
