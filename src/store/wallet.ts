import { useSyncExternalStore } from "react";
import { PAYOUTS, type Payout } from "../data/dashboard";

/** Demo wallet state shared by dashboard pages (in-memory only, resets on reload). */
export type WalletState = {
  balance: Record<string, number>;
  minedToday: number;
  payouts: Payout[];
};

let state: WalletState = {
  balance: { BTC: 0.04821377, LTC: 3.1842, KAS: 1840.5 },
  minedToday: 0.00031842,
  payouts: PAYOUTS,
};

const listeners = new Set<() => void>();
let timer: number | undefined;

function emit(next: WalletState) {
  state = next;
  listeners.forEach((l) => l());
}

function tick() {
  const inc = 0.00000009 + Math.random() * 0.00000008;
  emit({ ...state, minedToday: state.minedToday + inc, balance: { ...state.balance, BTC: state.balance.BTC + inc } });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (timer === undefined && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timer = window.setInterval(tick, 1500);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

export function useWallet(): WalletState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function withdraw(coin: string, amount: number, usd: number, address: string): Payout {
  const hex = Math.random().toString(16).slice(2, 10);
  const payout: Payout = {
    id: `WD-${Math.floor(Math.random() * 90000 + 10000)}`,
    date: new Date().toISOString(),
    coin,
    amount: -amount,
    usd: -usd,
    status: "Processing",
    txid: `0x${hex}…${address.slice(-4)}`,
  };
  emit({ ...state, balance: { ...state.balance, [coin]: Math.max(0, state.balance[coin] - amount) }, payouts: [payout, ...state.payouts] });
  return payout;
}
