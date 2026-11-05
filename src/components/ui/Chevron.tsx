import { useId, type CSSProperties } from "react";

/** Soft gradient chevron used as background decoration (echoes the original design's shapes). */
export function Chevron({ size = 240, rotate = 0, style, className, opacity = 1 }: { size?: number; rotate?: number; style?: CSSProperties; className?: string; opacity?: number }) {
  const id = useId();
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ position: "absolute", pointerEvents: "none", transform: `rotate(${rotate}deg)`, opacity, ...style }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b7cf6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c7b8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M30 8 L74 50 L30 92" fill="none" stroke={`url(#${id})`} strokeWidth="14" strokeLinejoin="miter" />
    </svg>
  );
}
