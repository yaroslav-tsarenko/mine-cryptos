export type Coin = {
  symbol: string;
  name: string;
  /** Illustrative demo price in USD — not live data. */
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  color: string;
  mineable: boolean;
  algorithm?: string;
};

export const COINS: Coin[] = [
  { symbol: "BTC", name: "Bitcoin", price: 96420, change24h: 1.84, marketCap: 1.91e12, volume24h: 38.2e9, color: "#f7931a", mineable: true, algorithm: "SHA-256" },
  { symbol: "ETH", name: "Ethereum", price: 3481.2, change24h: -0.62, marketCap: 419e9, volume24h: 17.4e9, color: "#627eea", mineable: false },
  { symbol: "SOL", name: "Solana", price: 182.4, change24h: 3.12, marketCap: 86e9, volume24h: 4.1e9, color: "#14f195", mineable: false },
  { symbol: "XRP", name: "XRP", price: 2.31, change24h: -1.4, marketCap: 132e9, volume24h: 6.3e9, color: "#23292f", mineable: false },
  { symbol: "LTC", name: "Litecoin", price: 104.3, change24h: 0.94, marketCap: 7.8e9, volume24h: 612e6, color: "#345d9d", mineable: true, algorithm: "Scrypt" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.184, change24h: 2.45, marketCap: 27e9, volume24h: 1.9e9, color: "#c2a633", mineable: true, algorithm: "Scrypt" },
  { symbol: "BCH", name: "Bitcoin Cash", price: 468.1, change24h: -0.21, marketCap: 9.2e9, volume24h: 402e6, color: "#8dc351", mineable: true, algorithm: "SHA-256" },
  { symbol: "KAS", name: "Kaspa", price: 0.118, change24h: 4.87, marketCap: 3.0e9, volume24h: 98e6, color: "#49eacb", mineable: true, algorithm: "kHeavyHash" },
  { symbol: "ETC", name: "Ethereum Classic", price: 27.4, change24h: -2.08, marketCap: 4.1e9, volume24h: 210e6, color: "#3ab83a", mineable: true, algorithm: "Etchash" },
  { symbol: "XMR", name: "Monero", price: 214.6, change24h: 0.37, marketCap: 3.95e9, volume24h: 88e6, color: "#ff6600", mineable: true, algorithm: "RandomX" },
  { symbol: "ADA", name: "Cardano", price: 0.74, change24h: -0.95, marketCap: 26e9, volume24h: 710e6, color: "#0033ad", mineable: false },
  { symbol: "TON", name: "Toncoin", price: 5.12, change24h: 1.06, marketCap: 13e9, volume24h: 290e6, color: "#0098ea", mineable: false },
  { symbol: "ZEC", name: "Zcash", price: 52.6, change24h: 6.3, marketCap: 860e6, volume24h: 140e6, color: "#ecb244", mineable: true, algorithm: "Equihash" },
  { symbol: "DASH", name: "Dash", price: 31.2, change24h: -3.1, marketCap: 380e6, volume24h: 64e6, color: "#008ce7", mineable: true, algorithm: "X11" },
  { symbol: "RVN", name: "Ravencoin", price: 0.0213, change24h: 1.7, marketCap: 310e6, volume24h: 18e6, color: "#384182", mineable: true, algorithm: "KawPow" },
];

export const COIN_BY_SYMBOL: Record<string, Coin> = Object.fromEntries(COINS.map((c) => [c.symbol, c]));

/** Economics used by the profit calculator (illustrative demo values). */
export type MiningCoin = {
  symbol: "BTC" | "LTC" | "DOGE" | "KAS" | "ETC";
  algorithm: string;
  unit: string;
  /** Coins earned per unit of hashrate per day at today's difficulty. */
  rewardPerUnitDay: number;
  /** Typical hardware efficiency in watts per unit. */
  wattsPerUnit: number;
  min: number;
  max: number;
  step: number;
  defaultHashrate: number;
  /** Contract price per unit per month (USD). */
  pricePerUnitMonth: number;
};

export const MINING_COINS: MiningCoin[] = [
  { symbol: "BTC", algorithm: "SHA-256", unit: "TH/s", rewardPerUnitDay: 0.00000052, wattsPerUnit: 17.5, min: 10, max: 1000, step: 5, defaultHashrate: 200, pricePerUnitMonth: 1.0 },
  { symbol: "LTC", algorithm: "Scrypt", unit: "GH/s", rewardPerUnitDay: 0.0098, wattsPerUnit: 210, min: 1, max: 100, step: 1, defaultHashrate: 16, pricePerUnitMonth: 17.5 },
  { symbol: "DOGE", algorithm: "Scrypt", unit: "GH/s", rewardPerUnitDay: 5.6, wattsPerUnit: 210, min: 1, max: 100, step: 1, defaultHashrate: 16, pricePerUnitMonth: 17.5 },
  { symbol: "KAS", algorithm: "kHeavyHash", unit: "TH/s", rewardPerUnitDay: 3.4, wattsPerUnit: 150, min: 1, max: 200, step: 1, defaultHashrate: 21, pricePerUnitMonth: 10.4 },
  { symbol: "ETC", algorithm: "Etchash", unit: "GH/s", rewardPerUnitDay: 0.046, wattsPerUnit: 600, min: 1, max: 50, step: 1, defaultHashrate: 4, pricePerUnitMonth: 21 },
];
