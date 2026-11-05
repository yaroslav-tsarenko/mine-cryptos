import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import styles from "./Tabs.module.css";

type Tab<T extends string> = { id: T; label: ReactNode };

type Props<T extends string> = {
  tabs: Tab<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  variant?: "underline" | "pill";
  className?: string;
};

/** Accessible tablist (arrow-key navigation). Render panels yourself using `tabPanelProps`. */
export function Tabs<T extends string>({ tabs, value, onChange, label, variant = "underline", className }: Props<T>) {
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={cx(styles.list, styles[variant], className)}>
      {tabs.map((tab, i) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${base}-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={cx(styles.tab, selected && styles.active)}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
