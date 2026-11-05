import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { InsightsSection } from "../components/sections/InsightsSection";
import { Avatar } from "../components/ui/Avatar";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useToast } from "../components/ui/useToast";
import { POST_BY_SLUG, type Post } from "../data/posts";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { formatDate } from "../lib/format";
import { SITE } from "../lib/site";
import NotFound from "./NotFound";
import styles from "./BlogPost.module.css";
import { copyText } from "../lib/clipboard";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = POST_BY_SLUG[slug];
  if (!post) return <NotFound title="We couldn't find that article" message="It may have been moved or unpublished. Browse the latest insights on our blog." />;
  return <Article key={post.slug} post={post} />;
}

function Article({ post }: { post: Post }) {
  useDocumentMeta({ title: post.title, description: post.excerpt });
  const [progress, setProgress] = useState(0);
  const { notify } = useToast();
  const url = `${SITE.url}/blog/${post.slug}`;
  const toc = post.body.filter((b) => b.type === "h2");

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = async () => {
    try {
      await copyText(url);
      notify({ title: "Link copied", description: "Share this article with your friends." });
    } catch {
      notify({ kind: "error", title: "Couldn't copy the link" });
    }
  };
  const share = encodeURIComponent(url);
  const text = encodeURIComponent(post.title);

  return (
    <>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.category, to: `/blog?category=${post.category}` }, { label: post.title }]} />
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <Avatar name={post.author} size={48} src={post.author === "Mark Thompson" ? "/images/avatar-mark.webp" : undefined} />
            <div>
              <strong>{post.author}</strong>
              <span>
                {post.authorRole} · {formatDate(post.date)} · {post.readMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.coverWrap}`}>
        <img className={styles.cover} src={post.cover} alt="" width={1400} height={600} fetchPriority="high" />
      </div>

      <div className={`container ${styles.layout}`}>
        <article className={styles.body} id="article-body">
          <p className={styles.excerpt}>{post.excerpt}</p>
          {post.body.map((b, i) => {
            switch (b.type) {
              case "h2":
                return (
                  <h2 key={i} id={slugify(b.text)}>
                    {b.text}
                  </h2>
                );
              case "list":
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              case "quote":
                return (
                  <blockquote key={i}>
                    <p>“{b.text}”</p>
                    {b.cite && <cite>— {b.cite}</cite>}
                  </blockquote>
                );
              default:
                return <p key={i}>{b.text}</p>;
            }
          })}
          <div className={styles.disclaimer}>
            <Icon name="info" size={18} />
            This article is for educational purposes only and is not financial advice. Mining returns depend on market conditions.
          </div>
          <div className={styles.tags}>
            <Link to={`/blog?category=${post.category}`}>#{post.category}</Link>
            <Link to="/calculator">#ProfitCalculator</Link>
            <Link to="/plans">#MiningPlans</Link>
          </div>
        </article>

        <aside className={styles.aside}>
          {toc.length > 0 && (
            <nav className={styles.toc} aria-label="In this article">
              <strong>In this article</strong>
              <ol>
                {toc.map((h) => (
                  <li key={h.text}>
                    <a href={`#${slugify(h.text)}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className={styles.share}>
            <strong>Share</strong>
            <div>
              <button type="button" onClick={copy} aria-label="Copy link to this article">
                <Icon name="copy" size={18} />
              </button>
              <a href={`https://x.com/intent/post?url=${share}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens in a new tab)">
                <Icon name="x" size={18} />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in a new tab)">
                <Icon name="linkedin" size={18} />
              </a>
              <a href={`https://t.me/share/url?url=${share}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram (opens in a new tab)">
                <Icon name="telegram" size={18} />
              </a>
            </div>
          </div>
          <div className={styles.promo}>
            <img src="/images/art-hand-phone.webp" alt="" width={880} height={1002} loading="lazy" />
            <strong>Curious what you could mine?</strong>
            <p>Model returns for BTC, LTC, KAS and more in seconds.</p>
            <Button to="/calculator" variant="white" size="sm" block>
              Try the calculator
            </Button>
          </div>
        </aside>
      </div>

      <InsightsSection title="More Blog Posts" excludeSlug={post.slug} />
    </>
  );
}
