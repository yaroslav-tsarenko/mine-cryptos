import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { PostCard } from "../components/sections/PostCard";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { POSTS, POST_CATEGORIES } from "../data/posts";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatDate } from "../lib/format";
import styles from "./Blog.module.css";

type Category = (typeof POST_CATEGORIES)[number];

export default function Blog() {
  useDocumentMeta({ title: "Blog — Insights and Updates", description: "Guides, industry analysis and news about cryptocurrency mining and blockchain technology from the MineCryptos team." });
  const [params, setParams] = useSearchParams();
  const raw = params.get("category");
  const category: Category = (POST_CATEGORIES as readonly string[]).includes(raw ?? "") ? (raw as Category) : "All";
  const [query, setQuery] = useState("");
  const featured = POSTS.find((p) => p.featured)!;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => !p.featured || category !== "All" || q).filter(
      (p) => (category === "All" || p.category === category) && (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const setCategory = (c: Category) => setParams(c === "All" ? {} : { category: c }, { replace: true, preventScrollReset: true });
  const showFeatured = category === "All" && !query.trim();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        title="Insights and Updates"
        description="Welcome to our 'Insights and Updates' section, where we delve into the fascinating world of cryptocurrency mining and blockchain technology. Find informative articles, expert analysis, and the latest industry news to keep you at the forefront of the crypto mining landscape."
      />

      {showFeatured && (
        <section className="section-tight">
          <div className="container">
            <Reveal className={styles.featured}>
              <Link to={`/blog/${featured.slug}`} className={styles.featuredMedia} tabIndex={-1} aria-hidden="true">
                <img src={featured.cover} alt="" width={1400} height={431} fetchPriority="high" />
              </Link>
              <div className={styles.featuredBody}>
                <span className={styles.kicker}>Featured · {featured.category}</span>
                <h2 className={styles.featuredTitle}>
                  <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="lead">{featured.excerpt}</p>
                <div className={styles.featuredMeta}>
                  <Avatar name={featured.author} size={44} />
                  <div>
                    <strong>{featured.author}</strong>
                    <span>
                      {formatDate(featured.date)} · {featured.readMinutes} min read
                    </span>
                  </div>
                  <Button to={`/blog/${featured.slug}`} className={styles.readMore}>
                    Read more
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: showFeatured ? 24 : undefined }}>
        <div className="container">
          <div className={styles.toolbar}>
            <h2 className={styles.more}>
              More <span>Blog Posts</span>
            </h2>
            <label className={styles.search}>
              <Icon name="search" size={18} />
              <span className="visually-hidden">Search articles</span>
              <input type="search" placeholder="Search articles" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
          <div className={styles.chips} role="group" aria-label="Filter by category">
            {POST_CATEGORIES.map((c) => (
              <button key={c} type="button" className={cx(styles.chip, category === c && styles.chipActive)} aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
          {list.length ? (
            <div className="grid-3">
              {list.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No articles match your search.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
