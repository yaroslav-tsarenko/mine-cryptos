import { useId } from "react";

type Props = { value: number; max: number; label: string; unit: string };

/** Semi-circular gauge (pure SVG) used for total hashrate. */
export function Gauge({ value, max, label, unit }: Props) {
  const id = useId();
  const pct = Math.max(0, Math.min(1, value / max));
  const r = 80;
  const c = Math.PI * r;
  return (
    <svg viewBox="0 0 200 118" width="100%" role="img" aria-label={`${label}: ${value.toFixed(1)} ${unit} of ${max} ${unit} capacity`}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0%" stopColor="#86d9f4" />
          <stop offset="50%" stopColor="#7f8ef0" />
          <stop offset="100%" stopColor="#3f28c6" />
        </linearGradient>
      </defs>
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--line)" strokeWidth="16" strokeLinecap="round" />
      <path
        d="M20 100 A80 80 0 0 1 180 100"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)" }}
      />
      <text x="20" y="116" fontSize="9" fill="var(--subtle)" textAnchor="middle">
        0
      </text>
      <text x="180" y="116" fontSize="9" fill="var(--subtle)" textAnchor="middle">
        {max}
      </text>
    </svg>
  );
}
