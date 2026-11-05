import { createRng, hashString } from "../../lib/random";

/** Decorative QR-style pattern for mock deposit addresses (not a scannable code). */
export function FakeQr({ value, size = 140 }: { value: string; size?: number }) {
  const n = 25;
  const rng = createRng(hashString(value));
  const cells: string[] = [];
  const finder = (x: number, y: number) => x < 7 && y < 7;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y) || finder(n - 1 - x, y) || finder(x, n - 1 - y)) continue;
      if (rng() > 0.52) cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  const eye = (x: number, y: number) => `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="Deposit address QR code (demo)" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="#fff" />
      <path d={cells.join("")} fill="#212121" />
      <path d={`${eye(0, 0)}${eye(n - 7, 0)}${eye(0, n - 7)}`} fill="#3f28c6" fillRule="evenodd" />
    </svg>
  );
}
