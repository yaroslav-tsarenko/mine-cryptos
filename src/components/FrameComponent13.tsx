import { FunctionComponent } from "react";
import FrameComponent14 from "./FrameComponent14";
import styles from "./FrameComponent13.module.css";

const FrameComponent13: FunctionComponent = () => {
  return (
    <section className={styles.frameWrapper}>
      <div className={styles.frameParent}>
        <div className={styles.storyOfMinecryptoFromPassParent}>
          <h1 className={styles.storyOfMinecrypto}>
            Story of MineCrypto: From Passion to Pioneers
          </h1>
          <div className={styles.atMinecryptosOur}>
            At MineCryptos, our mission is clear - to empower individuals and
            businesses to harness the full potential of cryptocurrency mining.
            We're dedicated to providing the tools, knowledge, and resources
            needed to enable you to prosper in the world of decentralized
            finance, all while fostering a sense of community and sustainability
          </div>
        </div>
        <div className={styles.frameGroup}>
          <FrameComponent14
            rectangle8="/rectangle-8@2x.png"
            innovation="Innovation"
            weAreDedicatedToStayingAt="We are dedicated to staying at the forefront of the cryptocurrency mining industry, continuously seeking innovative solutions to help our customers succeed."
          />
          <FrameComponent14
            rectangle8="/rectangle-8-11@2x.png"
            innovation="Integrity"
            weAreDedicatedToStayingAt="We operate with the highest ethical standards, ensuring transparency, trust, and accountability in all our interactions."
          />
          <FrameComponent14
            rectangle8="/rectangle-8-21@2x.png"
            innovation="Community"
            weAreDedicatedToStayingAt="At the heart of MineCryptos is a thriving community of miners. We believe in the power of collaboration and support to create a stronger and more sustainable crypto mining ecosystem."
          />
        </div>
      </div>
    </section>
  );
};

export default FrameComponent13;
