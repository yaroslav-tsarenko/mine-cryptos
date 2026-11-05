import { useSyncExternalStore } from "react";
import { COINS } from "../data/coins";
import { hashString, randomWalk } from "../lib/random";

/**
 * Mock "live" market feed. Prices are seeded demo values that random-walk every
 * few seconds while at least one component is subscribed. No network calls.
 */
export type Quote = {
  symbol: string;
  price: number;
  change24h: number;
  history: number[];
  direction: "up" | "down" | null;
  tick: number;
};

export type MarketSnapshot = Record<string, Quote>;

const HISTORY = 40;
const TICK_MS = 2600;

function initial(): MarketSnapshot {
  const out: MarketSnapshot = {};
  for (const c of COINS) {
    const history = randomWalk(hashString(c.symbol), HISTORY, c.price * (1 - c.change24h / 100), 0.018);
    history[history.length - 1] = c.price;
    out[c.symbol] = { symbol: c.symbol, price: c.price, change24h: c.change24h, history, direction: null, tick: 0 };
  }
  return out;
}

let snapshot: MarketSnapshot = initial();
const listeners = new Set<() => void>();
let timer: number | undefined;

function step() {
  const next: MarketSnapshot = {};
  for (const [symbol, q] of Object.entries(snapshot)) {
    // only some coins move on each tick, so the table feels organic
    if (Math.random() < 0.45) {
      next[symbol] = { ...q, direction: null };
      continue;
    }
    const drift = (Math.random() - 0.5) * 0.006;
    const price = Math.max(q.price * (1 + drift), 0.000001);
    const open = q.price / (1 + q.change24h / 100);
    const change24h = ((price - open) / open) * 100;
    next[symbol] = {
      symbol,
      price,
      change24h,
      history: [...q.history.slice(1), price],
      direction: price >= q.price ? "up" : "down",
      tick: q.tick + 1,
    };
  }
  snapshot = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1 && timer === undefined) {
    timer = window.setInterval(step, TICK_MS);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

function getSnapshot() {
  return snapshot;
}

export function useMarket(): MarketSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useQuote(symbol: string): Quote | undefined {
  return useMarket()[symbol];
}
