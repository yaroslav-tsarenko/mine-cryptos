import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent2.module.css";

export type FrameComponent2Type = {
  name1?: string;
  typeNamePlaceholder?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
  propWidth?: CSSProperties["width"];
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  name1,
  typeNamePlaceholder,
  propMinWidth,
  propDisplay,
  propWidth,
}) => {
  const nameStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      display: propDisplay,
    };
  }, [propMinWidth, propDisplay]);

  const typeNameStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className={styles.nameParent}>
      <div className={styles.name} style={nameStyle}>
        {name1}
      </div>
      <input
        className={styles.typeName}
        placeholder={typeNamePlaceholder}
        type="text"
        style={typeNameStyle}
      />
      <img className={styles.frameChild} alt="" src="/vector-18.svg" />
    </div>
  );
};

export default FrameComponent2;
