/** Deterministic PRNG (mulberry32) so mock data is stable between renders and reloads. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Random walk series used for sparklines and charts. */
export function randomWalk(seed: number, length: number, start: number, volatility: number): number[] {
  const rng = createRng(seed);
  const out: number[] = [start];
  for (let i = 1; i < length; i++) {
    const prev = out[i - 1];
    out.push(Math.max(prev * 0.2, prev * (1 + (rng() - 0.5) * volatility)));
  }
  return out;
}
