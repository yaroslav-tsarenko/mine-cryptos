import { useId, useState, type PointerEvent } from "react";
import { formatUsd } from "../../lib/format";
import styles from "./ProfitChart.module.css";

type Point = { day: number; revenue: number; cost: number; profit: number };

const W = 640;
const H = 280;
const PAD = { l: 64, r: 16, t: 16, b: 32 };

/** Cumulative revenue vs. cost chart with hover tooltip and break-even marker (pure SVG). */
export function ProfitChart({ series, breakEvenDay }: { series: Point[]; breakEvenDay: number | null }) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  if (series.length < 2) return null;
  const maxDay = series[series.length - 1].day;
  const values = series.flatMap((p) => [p.revenue, p.cost, p.profit]);
  const maxV = Math.max(...values, 1);
  const minV = Math.min(...values, 0);
  const x = (d: number) => PAD.l + ((d - 1) / Math.max(1, maxDay - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - minV) / (maxV - minV || 1)) * (H - PAD.t - PAD.b);
  const path = (key: keyof Point) => series.map((p, i) => `${i ? "L" : "M"}${x(p.day).toFixed(1)} ${y(p[key]).toFixed(1)}`).join("");
  const profitArea = `${path("profit")}L${x(maxDay)} ${y(0)}L${x(1)} ${y(0)}Z`;
  const ticks = Array.from({ length: 5 }, (_, i) => minV + ((maxV - minV) * i) / 4);
  const dayTicks = [1, Math.round(maxDay / 3), Math.round((2 * maxDay) / 3), maxDay];

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    series.forEach((p, i) => {
      if (Math.abs(x(p.day) - px) < Math.abs(x(series[best].day) - px)) best = i;
    });
    setHover(best);
  };
  const hp = hover !== null ? series[hover] : null;

  return (
    <div className={styles.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        role="img"
        aria-label={`Cumulative profit chart over ${maxDay} days. Final net result ${formatUsd(series[series.length - 1].profit)}.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`${id}-p`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f28c6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3f28c6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} className={styles.grid} />
            <text x={PAD.l - 10} y={y(t) + 4} textAnchor="end" className={styles.axis}>
              {formatUsd(t, { compact: true })}
            </text>
          </g>
        ))}
        {dayTicks.map((d) => (
          <text key={d} x={x(d)} y={H - 8} textAnchor="middle" className={styles.axis}>
            Day {d}
          </text>
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} className={styles.zero} />
        <path d={profitArea} fill={`url(#${id}-p)`} />
        <path d={path("cost")} className={styles.cost} />
        <path d={path("revenue")} className={styles.revenue} />
        <path d={path("profit")} className={styles.profit} />
        {breakEvenDay && breakEvenDay <= maxDay && (
          <g>
            <line x1={x(breakEvenDay)} x2={x(breakEvenDay)} y1={PAD.t} y2={H - PAD.b} className={styles.be} />
            <text x={x(breakEvenDay) + 6} y={PAD.t + 12} className={styles.beLabel}>
              Break-even · day {breakEvenDay}
            </text>
          </g>
        )}
        {hp && (
          <g>
            <line x1={x(hp.day)} x2={x(hp.day)} y1={PAD.t} y2={H - PAD.b} className={styles.cursor} />
            <circle cx={x(hp.day)} cy={y(hp.revenue)} r="5" className={styles.dotRev} />
            <circle cx={x(hp.day)} cy={y(hp.cost)} r="5" className={styles.dotCost} />
            <circle cx={x(hp.day)} cy={y(hp.profit)} r="5" className={styles.dotProfit} />
          </g>
        )}
      </svg>
      {hp && (
        <div className={styles.tip} style={{ left: `${Math.min(82, Math.max(18, (x(hp.day) / W) * 100))}%` }}>
          <strong>Day {hp.day}</strong>
          <span className={styles.tRev}>Revenue {formatUsd(hp.revenue)}</span>
          <span className={styles.tCost}>Cost {formatUsd(hp.cost)}</span>
          <span className={styles.tProfit}>Net {formatUsd(hp.profit)}</span>
        </div>
      )}
      <div className={styles.legend} aria-hidden="true">
        <span className={styles.lRev}>Cumulative revenue</span>
        <span className={styles.lCost}>Cumulative cost</span>
        <span className={styles.lProfit}>Net profit</span>
      </div>
    </div>
  );
}
