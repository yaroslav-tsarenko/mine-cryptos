import { FunctionComponent } from "react";
import GroupComponent2 from "../components/GroupComponent2";
import FrameComponent7 from "../components/FrameComponent7";
import FrameComponent5 from "../components/FrameComponent5";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent3 from "../components/FrameComponent3";
import GroupComponent1 from "../components/GroupComponent1";
import FrameComponent from "../components/FrameComponent";
import GroupComponent from "../components/GroupComponent";
import styles from "./Frame.module.css";

const Frame: FunctionComponent = () => {
  return (
    <div className={styles.unionParent}>
      <img className={styles.unionIcon} alt="" src="/union@2x.png" />
      <GroupComponent2 />
      <section className={styles.componentWrapper}>
        <FrameComponent7 />
      </section>
      <FrameComponent5 />
      <FrameComponent4 />
      <FrameComponent3 />
      <GroupComponent1 />
      <FrameComponent />
      <GroupComponent />
    </div>
  );
};

export default Frame;
