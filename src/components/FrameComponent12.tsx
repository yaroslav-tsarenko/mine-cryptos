import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent12.module.css";

export type FrameComponent12Type = {
  ourMission?: string;
  empoweringDigitalMiners?: string;
  toEmpowerIndividualsAndBu?: string;
  rectangle9?: string;

  /** Style props */
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  propWidth?: CSSProperties["width"];
  propBorderRadius?: CSSProperties["borderRadius"];
};

const FrameComponent12: FunctionComponent<FrameComponent12Type> = ({
  ourMission,
  empoweringDigitalMiners,
  toEmpowerIndividualsAndBu,
  rectangle9,
  propDisplay,
  propMinWidth,
  propWidth,
  propBorderRadius,
}) => {
  const ourMissionStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  const rectangleIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      borderRadius: propBorderRadius,
    };
  }, [propWidth, propBorderRadius]);

  return (
    <section className={styles.frameWrapper}>
      <div className={styles.frameParent}>
        <div className={styles.frameContainer}>
          <div className={styles.frameGroup}>
            <div className={styles.ourMissionParent}>
              <div className={styles.ourMission} style={ourMissionStyle}>
                {ourMission}
              </div>
              <h1 className={styles.empoweringDigitalMiners}>
                {empoweringDigitalMiners}
              </h1>
            </div>
            <div className={styles.toEmpowerIndividuals}>
              {toEmpowerIndividualsAndBu}
            </div>
          </div>
        </div>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src={rectangle9}
          style={rectangleIconStyle}
        />
      </div>
    </section>
  );
};

export default FrameComponent12;
