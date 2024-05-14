import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Button } from "@mui/material";
import styles from "./FrameComponent9.module.css";

export type FrameComponent9Type = {
  frame3?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propDisplay?: CSSProperties["display"];
  propFlexDirection?: CSSProperties["flexDirection"];
  propPadding?: CSSProperties["padding"];
  propWidth?: CSSProperties["width"];
};

const FrameComponent9: FunctionComponent<FrameComponent9Type> = ({
  frame3,
  propHeight,
  propFlex,
  propMinWidth,
  propBorderRadius,
  propBackgroundColor,
  propDisplay,
  propFlexDirection,
  propPadding,
  propWidth,
}) => {
  const frameButtonStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      flex: propFlex,
      minWidth: propMinWidth,
      borderRadius: propBorderRadius,
      backgroundColor: propBackgroundColor,
      display: propDisplay,
      flexDirection: propFlexDirection,
      padding: propPadding,
      width: propWidth,
    };
  }, [
    propHeight,
    propFlex,
    propMinWidth,
    propBorderRadius,
    propBackgroundColor,
    propDisplay,
    propFlexDirection,
    propPadding,
    propWidth,
  ]);

  return (
    <Button
      className={styles.frameChild}
      disableElevation={true}
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fff",
        fontSize: "16",
        background: "#3f28c6",
        borderRadius: "100px",
        "&:hover": { background: "#3f28c6" },
        height: 56,
      }}
      style={frameButtonStyle}
    >
      {frame3}
    </Button>
  );
};

export default FrameComponent9;
