import { Link } from "react-router";
import type { Post } from "../../data/posts";
import { formatDate } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import styles from "./PostCard.module.css";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.media}>
        <img src={post.cover} alt="" loading="lazy" width={710} height={382} />
        <span className={styles.cat}>{post.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <Avatar name={post.author} size={40} src={post.author === "Mark Thompson" ? "/images/avatar-mark.webp" : undefined} />
          <div>
            <strong>{post.author}</strong>
            <span>
              {formatDate(post.date)} · {post.readMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
