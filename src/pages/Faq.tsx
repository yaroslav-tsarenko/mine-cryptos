import { useMemo, useState } from "react";
import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { openSupportChat } from "../components/widgets/chatBus";
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from "../data/faqs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import styles from "./Faq.module.css";

export default function Faq() {
  useDocumentMeta({ title: "FAQ", description: "Answers to common questions about MineCryptos mining plans, billing, payouts, security and accounts." });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "All">("All");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.map((f, i) => ({ ...f, id: String(i) })).filter(
      (f) => (category === "All" || f.category === category) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [query, category]);

  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]} title="Frequently Asked Questions" description="Everything you need to know about mining with MineCryptos. Can't find an answer? Our team is available 24/7.">
        <label className={styles.search}>
          <Icon name="search" size={20} />
          <span className="visually-hidden">Search questions</span>
          <input type="search" placeholder="Search questions, e.g. payouts" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <nav className={styles.cats} aria-label="FAQ categories">
            {(["All", ...FAQ_CATEGORIES] as const).map((c) => {
              const count = c === "All" ? FAQS.length : FAQS.filter((f) => f.category === c).length;
              return (
                <button key={c} type="button" className={cx(styles.cat, category === c && styles.catActive)} aria-pressed={category === c} onClick={() => setCategory(c)}>
                  {c}
                  <span>{count}</span>
                </button>
              );
            })}
          </nav>
          <div>
            <p className={styles.count} aria-live="polite">
              {items.length} {items.length === 1 ? "question" : "questions"}
              {query && ` matching “${query}”`}
            </p>
            {items.length ? (
              <Accordion key={category + query} defaultOpen={items[0]?.id} items={items.map((f) => ({ id: f.id, title: f.q, content: f.a }))} />
            ) : (
              <div className={styles.empty}>
                <p>No questions match your search. Try another keyword or ask our team directly.</p>
                <Button variant="outline" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
            <div className={styles.help}>
              <div>
                <h2>Still have questions?</h2>
                <p className="copy">Our mining experts are available around the clock by chat or email.</p>
              </div>
              <div className={styles.helpActions}>
                <Button onClick={openSupportChat} iconLeft="chat">
                  Start live chat
                </Button>
                <Button to="/contact" variant="outline">
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
