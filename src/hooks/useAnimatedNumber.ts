import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./useReducedMotion";

/** Smoothly tweens to `target` whenever it changes (respects reduced motion). */
export function useAnimatedNumber(target: number, duration = 700, enabled = true): number {
  const [value, setValue] = useState(enabled ? 0 : target);
  const fromRef = useRef(enabled ? 0 : target);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (!enabled) return;
    const from = valueRef.current;
    fromRef.current = from;
    if (prefersReducedMotion() || from === target) {
      const id = window.setTimeout(() => setValue(target), 0);
      return () => window.clearTimeout(id);
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // Safety net: if rAF is throttled (background tab), still land on the final value.
    const done = window.setTimeout(() => setValue(target), duration + 150);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [target, duration, enabled]);

  return value;
}
