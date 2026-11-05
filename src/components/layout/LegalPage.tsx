import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { LegalSection } from "../../data/legal";
import { LEGAL_UPDATED } from "../../data/legal";
import { cx } from "../../lib/cx";
import { PageHero } from "../ui/PageHero";
import styles from "./LegalPage.module.css";

type Props = { title: string; intro: string; sections: LegalSection[]; crumb: string };

/** Long-form legal document with sticky table of contents and scroll-spy. */
export function LegalPage({ title, intro, sections, crumb }: Props) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: crumb }]} title={title} description={intro} compact />
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <nav className={styles.toc} aria-label="Contents">
            <strong>Contents</strong>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <Link to={`#${s.id}`} className={cx(active === s.id && styles.active)} preventScrollReset>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <article className={styles.doc}>
            <p className={styles.updated}>Last updated: {LEGAL_UPDATED}</p>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className={styles.block}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className={styles.contact}>
              Questions about this document? <Link to="/contact">Contact our team</Link> — we're happy to help.
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
