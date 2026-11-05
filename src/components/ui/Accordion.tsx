import { useId, useState, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import styles from "./Accordion.module.css";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

type Props = { items: AccordionItem[]; defaultOpen?: string | null; className?: string };

/** FAQ-style accordion; one panel open at a time, animated with CSS grid rows. */
export function Accordion({ items, defaultOpen = null, className }: Props) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const base = useId();
  return (
    <div className={cx(styles.list, className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-${item.id}-b`;
        const panelId = `${base}-${item.id}-p`;
        return (
          <div key={item.id} className={cx(styles.item, isOpen && styles.open)}>
            <h3 className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className={styles.sign} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel} inert={!isOpen}>
              <div className={styles.inner}>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
