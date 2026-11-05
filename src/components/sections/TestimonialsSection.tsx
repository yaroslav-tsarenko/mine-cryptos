import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../../data/testimonials";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cx } from "../../lib/cx";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stars } from "../ui/Stars";
import styles from "./TestimonialsSection.module.css";

/** Scroll-snap carousel with arrows, dots and gentle autoplay (paused on hover/focus or reduced motion). */
export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = TESTIMONIALS.length;
    const i = ((index % n) + n) % n;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft;
      let best = 0;
      children.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - track.offsetLeft - left) < Math.abs(children[best].offsetLeft - track.offsetLeft - left)) best = i;
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      goTo(atEnd ? 0 : active + 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [active, paused, reduced, goTo]);

  return (
    <section className="section" aria-roledescription="carousel" aria-label="Customer testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by miners worldwide"
          action={
            <div className={styles.arrows}>
              <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous testimonial">
                <Icon name="arrow-left" />
              </button>
              <button type="button" onClick={() => goTo(active + 1)} aria-label="Next testimonial">
                <Icon name="arrow-right" />
              </button>
            </div>
          }
        />
        <div
          ref={trackRef}
          className={styles.track}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={styles.card} aria-roledescription="slide" aria-label={`${i + 1} of ${TESTIMONIALS.length}`}>
              <Stars value={t.rating} />
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <Avatar name={t.name} size={48} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
                <span className={styles.plan}>{t.plan}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.dots}>
          {TESTIMONIALS.map((t, i) => (
            <button key={t.name} type="button" className={cx(styles.dot, i === active && styles.dotActive)} onClick={() => goTo(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === active || undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
