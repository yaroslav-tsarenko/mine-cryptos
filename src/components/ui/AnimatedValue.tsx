import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

type Props = { value: number; format: (n: number) => string; duration?: number; className?: string };

/** Renders a number that tweens whenever it changes (calculator, dashboard). */
export function AnimatedValue({ value, format, duration = 600, className }: Props) {
  const current = useAnimatedNumber(value, duration);
  return (
    <span className={className}>
      {format(current)}
    </span>
  );
}
