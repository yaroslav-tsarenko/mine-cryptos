import { createRng } from "../lib/random";

export type WorkerStatus = "online" | "offline" | "warning";
export type Worker = {
  id: string;
  name: string;
  model: string;
  coin: string;
  hashrate: number;
  unit: string;
  status: WorkerStatus;
  temp: number;
  uptime: string;
  location: string;
  rejected: number;
};

const rng = createRng(20261105);

const MODELS = [
  { model: "Antminer S21", coin: "BTC", unit: "TH/s", base: 200 },
  { model: "Whatsminer M60S", coin: "BTC", unit: "TH/s", base: 172 },
  { model: "Antminer L9", coin: "LTC", unit: "GH/s", base: 16 },
  { model: "IceRiver KS5L", coin: "KAS", unit: "TH/s", base: 12 },
];
const LOCATIONS = ["Reykjavík", "Québec", "Abilene", "Mo i Rana", "Hernandarias"];

export const WORKERS: Worker[] = Array.from({ length: 14 }, (_, i) => {
  const m = MODELS[i % MODELS.length];
  const roll = rng();
  const status: WorkerStatus = roll > 0.88 ? "offline" : roll > 0.78 ? "warning" : "online";
  const hashrate = status === "offline" ? 0 : +(m.base * (0.92 + rng() * 0.12)).toFixed(1);
  return {
    id: `w-${i + 1}`,
    name: `nest-${m.coin.toLowerCase()}-${String(i + 1).padStart(2, "0")}`,
    model: m.model,
    coin: m.coin,
    hashrate,
    unit: m.unit,
    status,
    temp: status === "offline" ? 0 : Math.round(58 + rng() * 18 + (status === "warning" ? 10 : 0)),
    uptime: status === "offline" ? "—" : `${Math.round(3 + rng() * 60)}d ${Math.round(rng() * 23)}h`,
    location: LOCATIONS[Math.floor(rng() * LOCATIONS.length)],
    rejected: +(rng() * (status === "warning" ? 3.5 : 0.8)).toFixed(2),
  };
});

export type PayoutStatus = "Paid" | "Pending" | "Processing";
export type Payout = { id: string; date: string; coin: string; amount: number; usd: number; status: PayoutStatus; txid: string };

const PAYOUT_COINS = [
  { coin: "BTC", amt: 0.00041, price: 96420 },
  { coin: "LTC", amt: 0.152, price: 104.3 },
  { coin: "KAS", amt: 41.2, price: 0.118 },
];

const DAY = 86_400_000;
const today = new Date();
today.setHours(0, 0, 0, 0);

export const PAYOUTS: Payout[] = Array.from({ length: 42 }, (_, i) => {
  const c = PAYOUT_COINS[i % PAYOUT_COINS.length];
  const day = Math.floor(i / PAYOUT_COINS.length);
  const amount = +(c.amt * (0.85 + rng() * 0.3)).toFixed(c.coin === "KAS" ? 2 : 6);
  const status: PayoutStatus = day === 0 ? (i % 2 ? "Processing" : "Pending") : "Paid";
  const hex = Array.from({ length: 8 }, () => Math.floor(rng() * 16).toString(16)).join("");
  return {
    id: `PO-${(98231 - i).toString()}`,
    date: new Date(today.getTime() - day * DAY).toISOString(),
    coin: c.coin,
    amount,
    usd: amount * c.price,
    status,
    txid: `0x${hex}…${hex.slice(0, 4)}`,
  };
});

export type Contract = { plan: string; slug: string; hashrate: string; progress: number; daysLeft: number; coin: string };

export const CONTRACTS: Contract[] = [
  { plan: "HashPower Hub", slug: "hashpower-hub", hashrate: "400 TH/s", progress: 0.42, daysLeft: 104, coin: "BTC" },
  { plan: "BitMine Nexus", slug: "bitmine-nexus", hashrate: "32 GH/s", progress: 0.71, daysLeft: 26, coin: "LTC" },
  { plan: "KasPulse Node", slug: "kaspulse-node", hashrate: "21 TH/s", progress: 0.15, daysLeft: 153, coin: "KAS" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Payout sent", text: "0.000412 BTC was sent to bc1q…7k2d", time: "2h ago" },
  { id: 2, title: "Worker warning", text: "nest-btc-05 temperature above 80 °C", time: "5h ago" },
  { id: 3, title: "New referral", text: "A friend joined using your link", time: "1d ago" },
];
