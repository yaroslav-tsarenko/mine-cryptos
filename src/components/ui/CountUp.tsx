import { useRef } from "react";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";
import { useInView } from "../../hooks/useInView";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `value` once visible. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", duration = 1600, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const current = useAnimatedNumber(visible ? value : 0, duration);
  const formatted = current.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
