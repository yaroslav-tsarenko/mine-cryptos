import { useEffect, useId, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md";
};

/** Accessible modal built on <dialog> (native focus trap, Esc to close). */
export function Modal({ open, onClose, title, children, size = "md" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("no-scroll");
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`${styles.dialog} ${styles[size]}`}
      aria-labelledby={titleId}
      onClose={() => {
        document.body.classList.remove("no-scroll");
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close dialog">
              <Icon name="close" size={20} />
            </button>
          </header>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </dialog>
  );
}
