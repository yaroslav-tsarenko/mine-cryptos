import { FunctionComponent } from "react";
import GroupComponent1 from "../components/GroupComponent1";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent from "../components/FrameComponent";
import GroupComponent from "../components/GroupComponent";
import styles from "./Blog.module.css";

const Blog: FunctionComponent = () => {
  return (
    <div className={styles.blog}>
      <GroupComponent1 />
      <section className={styles.blogInner}>
        <FrameComponent2 />
      </section>
      <FrameComponent />
      <GroupComponent />
    </div>
  );
};

export default Blog;
