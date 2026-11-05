import { Icon } from "./Icon";
import styles from "./QuantityStepper.module.css";

type Props = { value: number; min?: number; max?: number; onChange: (v: number) => void; label: string };

export function QuantityStepper({ value, min = 1, max = 50, onChange, label }: Props) {
  return (
    <div className={styles.wrap} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Icon name="minus" size={16} />
      </button>
      <output aria-live="polite" className={styles.value}>
        {value}
      </output>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
