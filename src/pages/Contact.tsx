import { FunctionComponent } from "react";
import GroupComponent7 from "../components/GroupComponent7";
import FrameComponent7 from "../components/FrameComponent7";
import GroupComponent6 from "../components/GroupComponent6";
import styles from "./Contact.module.css";

const Contact: FunctionComponent = () => {
  return (
    <div className={styles.contact}>
      <section className={styles.frameParent}>
        <GroupComponent7 />
        <FrameComponent7 />
      </section>
      <GroupComponent6 />
    </div>
  );
};

export default Contact;
