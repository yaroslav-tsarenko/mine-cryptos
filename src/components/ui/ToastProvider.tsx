import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { ToastContext, type ToastInput, type ToastKind } from "./toastContext";
import styles from "./Toast.module.css";

type Toast = ToastInput & { id: number; kind: ToastKind; leaving?: boolean };

const ICON = { success: "check-circle", error: "alert", info: "info" } as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const regionRef = useRef<HTMLDivElement>(null);

  // Re-open the region as a manual popover whenever toasts change, so it is promoted
  // to the top layer and stays visible above open <dialog> modals.
  useEffect(() => {
    const el = regionRef.current;
    if (!el || typeof el.showPopover !== "function") return;
    try {
      if (el.matches(":popover-open")) el.hidePopover();
      if (toasts.length) el.showPopover();
    } catch {
      /* popover unsupported — region still renders as a fixed element */
    }
  }, [toasts]);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 250);
  }, []);

  const notify = useCallback(
    (input: ToastInput) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((list) => [...list.slice(-3), { ...input, kind: input.kind ?? "success", id }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const api = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div ref={regionRef} popover="manual" className={styles.region} role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${styles[t.kind]} ${t.leaving ? styles.leaving : ""}`}>
            <span className={styles.icon}>
              <Icon name={ICON[t.kind]} size={20} />
            </span>
            <div className={styles.body}>
              <strong>{t.title}</strong>
              {t.description && <p>{t.description}</p>}
            </div>
            <button type="button" className={styles.close} onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
