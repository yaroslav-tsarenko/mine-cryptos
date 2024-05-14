import { FunctionComponent } from "react";
import FrameComponent22 from "./FrameComponent22";
import styles from "./FrameComponent21.module.css";

const FrameComponent21: FunctionComponent = () => {
  return (
    <div className={styles.titleParent}>
      <h1 className={styles.title}>
        <span>{`More `}</span>
        <span className={styles.blogPosts}>Blog Posts</span>
      </h1>
      <div className={styles.componentParent}>
        <FrameComponent22
          rectangle55="/rectangle-55-1@2x.png"
          title="The Environmental Debate: Cryptocurrency's Carbon Footprint"
        />
        <FrameComponent22
          rectangle55="/rectangle-55-2@2x.png"
          title="Cross-Chain Compatibility: Mining Beyond a Single Blockchain"
        />
        <FrameComponent22
          rectangle55="/rectangle-55-3@2x.png"
          title="Exploring the Evolution of Cryptocurrency Wallets"
        />
        <FrameComponent22
          rectangle55="/rectangle-55-4@2x.png"
          title="Smart Contracts: The Driving Force Behind Blockchain Innovation"
        />
        <FrameComponent22
          rectangle55="/rectangle-55-5@2x.png"
          title="NFTs: Unlocking Digital Ownership and Collectibles in the Blockchain Era"
        />
        <FrameComponent22
          rectangle55="/rectangle-55-6@2x.png"
          title="The Environmental Debate: Cryptocurrency's Carbon Footprint"
        />
      </div>
    </div>
  );
};

export default FrameComponent21;
