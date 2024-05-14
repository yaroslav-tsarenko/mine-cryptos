import { FunctionComponent } from "react";
import FrameComponent27 from "../components/FrameComponent27";
import FrameComponent26 from "../components/FrameComponent26";
import GroupComponent8 from "../components/GroupComponent8";
import styles from "./Products.module.css";

const Products: FunctionComponent = () => {
  return (
    <div className={styles.products}>
      <section className={styles.frameParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/group-852@2x.png"
        />
        <header className={styles.frameGroup}>
          <div className={styles.frameWrapper}>
            <div className={styles.rectangleParent}>
              <div className={styles.frameItem} />
              <div className={styles.minecryptosWrapper}>
                <h1 className={styles.minecryptos}>MineCryptos</h1>
              </div>
            </div>
          </div>
          <div className={styles.homeParent}>
            <b className={styles.home}>Home</b>
            <b className={styles.articles}>Articles</b>
            <b className={styles.aboutUs}>About Us</b>
            <div className={styles.instanceWrapper}>
              <div className={styles.startYourJourneyWrapper}>
                <div className={styles.startYourJourney}>
                  Start Your Journey
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.frameContainer}>
          <div className={styles.discoverYourMiningSolutionsParent}>
            <h1 className={styles.discoverYourMining}>
              {" "}
              Discover Your Mining Solutions
            </h1>
            <div className={styles.welcomeToMinecryptosProducWrapper}>
              <div className={styles.welcomeToMinecryptos}>
                Welcome to MineCryptos' product listing, where we unveil a
                treasure trove of cryptocurrency mining solutions. From hosting
                services to hardware sales, our diverse range of offerings
                caters to miners of all levels. Explore our meticulously curated
                selection to find the perfect tools and resources to enhance
                your mining operation. Unearth your potential with MineCryptos'
                premium products.
              </div>
            </div>
          </div>
        </div>
      </section>
      <FrameComponent27 />
      <section className={styles.productsInner}>
        <FrameComponent26 />
      </section>
      <GroupComponent8 />
    </div>
  );
};

export default Products;
