import { useId, type CSSProperties, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./Field.module.css";

type Base = { label: string; error?: string; hint?: string; className?: string; hideLabel?: boolean };

export function TextField({
  label,
  error,
  hint,
  className,
  hideLabel,
  trailing,
  ...input
}: Base & InputHTMLAttributes<HTMLInputElement> & { trailing?: ReactNode }) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={cx(styles.label, hideLabel && "visually-hidden")}>
        {label}
        {input.required && <span className={styles.req}> *</span>}
      </label>
      <div className={styles.control}>
        <input id={id} className={styles.input} aria-invalid={!!error || undefined} aria-describedby={describedBy} {...input} />
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>
      {error ? (
        <p id={`${id}-err`} className={styles.error}>
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function TextArea({ label, error, hint, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {rest.required && <span className={styles.req}> *</span>}
      </label>
      <textarea id={id} className={cx(styles.input, styles.textarea)} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {error ? (
        <p id={`${id}-err`} className={styles.error}>
          {error}
        </p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  error,
  className,
  hideLabel,
  children,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = useId();
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={cx(styles.label, hideLabel && "visually-hidden")}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select id={id} className={cx(styles.input, styles.select)} {...rest}>
          {children}
        </select>
        <svg className={styles.caret} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className, ...rest }: { label: ReactNode; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx(styles.check, className)}>
      <input type="checkbox" {...rest} />
      <span className={styles.box} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.checkLabel}>{label}</span>
    </label>
  );
}

export function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className={styles.toggleRow}>
      <div>
        <label htmlFor={id} className={styles.toggleLabel}>
          {label}
        </label>
        {description && <p className={styles.hint}>{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={cx(styles.switch, checked && styles.switchOn)}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.knob} />
      </button>
    </div>
  );
}

export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
  minLabel?: string;
  maxLabel?: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.field}>
      <div className={styles.rangeHead}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <output htmlFor={id} className={styles.rangeValue}>
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--pct": `${pct}%` } as CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {(minLabel || maxLabel) && (
        <div className={styles.rangeScale} aria-hidden="true">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
