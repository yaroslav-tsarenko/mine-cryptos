import { FunctionComponent } from "react";
import GroupComponent4 from "../components/GroupComponent4";
import FrameComponent13 from "../components/FrameComponent13";
import FrameComponent12 from "../components/FrameComponent12";
import FrameComponent11 from "../components/FrameComponent11";
import GroupComponent3 from "../components/GroupComponent3";
import FrameComponent7 from "../components/FrameComponent7";
import GroupComponent from "../components/GroupComponent";
import styles from "./Frame1.module.css";

const Frame1: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <GroupComponent4 />
      <FrameComponent13 />
      <FrameComponent12
        ourMission="Our mission"
        empoweringDigitalMiners="Empowering Digital Miners"
        toEmpowerIndividualsAndBu="To empower individuals and businesses to harness the full potential of cryptocurrency mining. We're dedicated to providing the tools, knowledge, and resources needed to enable you to prosper in the world of decentralized finance, all while fostering a sense of community and sustainability."
        rectangle9="/rectangle-9@2x.png"
      />
      <FrameComponent11 />
      <GroupComponent3 />
      <section className={styles.instanceWrapper}>
        <FrameComponent7 />
      </section>
      <GroupComponent />
      <img className={styles.unionIcon} alt="" src="/union-21@2x.png" />
    </div>
  );
};

export default Frame1;
