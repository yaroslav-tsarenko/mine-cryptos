import { FunctionComponent } from "react";
import GroupComponent5 from "../components/GroupComponent5";
import FrameComponent19 from "../components/FrameComponent19";
import FrameComponent18 from "../components/FrameComponent18";
import FrameComponent12 from "../components/FrameComponent12";
import FrameComponent7 from "../components/FrameComponent7";
import FrameComponent15 from "../components/FrameComponent15";
import GroupComponent from "../components/GroupComponent";
import styles from "./PDP.module.css";

const PDP: FunctionComponent = () => {
  return (
    <div className={styles.pdp}>
      <GroupComponent5 />
      <FrameComponent19 />
      <FrameComponent18 />
      <FrameComponent12
        ourMission="Fortress of Security"
        empoweringDigitalMiners="Safeguarding Your Mining Assets"
        toEmpowerIndividualsAndBu="n the ever-evolving landscape of cryptocurrency mining, the 'Fortress of Security' at MineCryptos stands as a sentinel, dedicated to safeguarding your mining assets. Our commitment to security is unwavering, and our measures are comprehensive. We've designed our hosting facilities with state-of-the-art security systems, employ robust encryption, and constantly monitor for potential threats. With regular audits, compliance adherence, and the option for multi-factor authentication, we ensure your assets are protected within the walls of our fortress. Your trust and peace of mind are paramount, and we stand guard to preserve the integrity of your mining endeavors."
        rectangle9="/rectangle-91@2x.png"
        propDisplay="unset"
        propMinWidth="unset"
        propWidth="810px"
        propBorderRadius="unset"
      />
      <section className={styles.pdpInner}>
        <FrameComponent7 />
      </section>
      <FrameComponent15 />
      <GroupComponent />
    </div>
  );
};

export default PDP;
