import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { cx } from "../../lib/cx";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

/** Fades/slides content in when it scrolls into view. Disabled by prefers-reduced-motion (CSS). */
export function Reveal({ children, as: Tag = "div", delay = 0, className, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref} id={id} className={cx("reveal", visible && "is-visible", className)} style={style}>
      {children}
    </Tag>
  );
}
