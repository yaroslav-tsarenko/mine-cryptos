import { FunctionComponent, useMemo, type CSSProperties } from "react";
import FrameComponent9 from "./FrameComponent9";
import styles from "./FrameComponent10.module.css";

export type FrameComponent10Type = {
  /** Style props */
  mineCryptosAlignSelf?: CSSProperties["alignSelf"];
  mineCryptosFlex?: CSSProperties["flex"];
  frameDivMargin?: CSSProperties["margin"];
};

const FrameComponent10: FunctionComponent<FrameComponent10Type> = ({
  mineCryptosAlignSelf,
  mineCryptosFlex,
  frameDivMargin,
}) => {
  const frameHeaderStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: mineCryptosAlignSelf,
      flex: mineCryptosFlex,
    };
  }, [mineCryptosAlignSelf, mineCryptosFlex]);

  const frameNavStyle: CSSProperties = useMemo(() => {
    return {
      margin: frameDivMargin,
    };
  }, [frameDivMargin]);

  return (
    <header className={styles.frameParent} style={frameHeaderStyle}>
      <div className={styles.frameWrapper}>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.minecryptosWrapper}>
            <h1 className={styles.minecryptos}>MineCryptos</h1>
          </div>
        </div>
      </div>
      <nav className={styles.homeParent} style={frameNavStyle}>
        <b className={styles.home}>Home</b>
        <b className={styles.articles}>Articles</b>
        <b className={styles.aboutUs}>About Us</b>
        <div className={styles.instanceWrapper}>
          <FrameComponent9
            propHeight="unset"
            propFlex="unset"
            propMinWidth="unset"
            propBorderRadius="100px"
            propBackgroundColor="#3f28c6"
            propDisplay="flex"
            propFlexDirection="row"
            propPadding="16px 48px"
            propWidth="unset"
          />
        </div>
      </nav>
    </header>
  );
};

export default FrameComponent10;
