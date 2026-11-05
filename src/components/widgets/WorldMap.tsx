import { LAND, MAP_BOUNDS } from "../../data/worldShapes";
import type { DataCenter } from "../../data/dataCenters";
import { cx } from "../../lib/cx";
import styles from "./WorldMap.module.css";

const W = 1000;
const H = Math.round((W * (MAP_BOUNDS.north - MAP_BOUNDS.south)) / 360);
const STEP = 2.2;

function inside([px, py]: [number, number], ring: [number, number][]) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * H,
});

// Computed once at module load: a single path of round-capped zero-length segments = dots.
const DOTS = (() => {
  let d = "";
  for (let lat = MAP_BOUNDS.north - STEP / 2; lat > MAP_BOUNDS.south; lat -= STEP) {
    for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
      if (LAND.some((ring) => inside([lon, lat], ring))) {
        const { x, y } = project(lon, lat);
        d += `M${x.toFixed(1)} ${y.toFixed(1)}h0`;
      }
    }
  }
  return d;
})();

type Props = { sites: DataCenter[]; selected: string; onSelect: (id: string) => void };

/** Stylised dotted world map with selectable, pulsing data-center markers (pure SVG + HTML buttons). */
export function WorldMap({ sites, selected, onSelect }: Props) {
  return (
    <div className={styles.map}>
      <div className={styles.canvas}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
        <path d={DOTS} className={styles.dots} />
        {sites.map((s) => {
          const a = project(s.lon, s.lat);
          const sel = sites.find((x) => x.id === selected);
          if (!sel || sel.id === s.id) return null;
          const b = project(sel.lon, sel.lat);
          const mx = (a.x + b.x) / 2;
          const my = Math.min(a.y, b.y) - Math.abs(a.x - b.x) * 0.18;
          return <path key={s.id} d={`M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}`} className={styles.arc} />;
        })}
      </svg>
      {sites.map((s) => {
        const { x, y } = project(s.lon, s.lat);
        const active = s.id === selected;
        return (
          <button
            key={s.id}
            type="button"
            className={cx(styles.marker, active && styles.active)}
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            onClick={() => onSelect(s.id)}
            aria-pressed={active}
            aria-label={`${s.city}, ${s.country} — ${s.capacityMW} MW, ${s.status}`}
          >
            <span className={styles.pin} />
            <span className={styles.label}>{s.city}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
