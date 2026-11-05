import type { MiningCoin } from "../data/coins";

export type ProfitInput = {
  coin: MiningCoin;
  price: number;
  hashrate: number;
  /** USD per kWh */
  electricity: number;
  /** percent, e.g. 1.5 */
  poolFee: number;
  days: number;
  /** monthly network difficulty growth in percent */
  difficultyGrowth: number;
  /** include hosted contract price (MineCryptos plan) instead of only power */
  contract: boolean;
};

export type ProfitResult = {
  dailyCoins: number;
  dailyRevenue: number;
  dailyPower: number;
  dailyContract: number;
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  totalProfit: number;
  totalRevenue: number;
  totalCost: number;
  breakEvenDay: number | null;
  roi: number;
  series: { day: number; revenue: number; cost: number; profit: number }[];
  powerKw: number;
};

/** Illustrative mining economics — not financial advice and not a prediction. */
export function computeProfit(i: ProfitInput): ProfitResult {
  const powerKw = (i.hashrate * i.coin.wattsPerUnit) / 1000;
  const dailyCoins = i.hashrate * i.coin.rewardPerUnitDay * (1 - i.poolFee / 100);
  const dailyRevenue = dailyCoins * i.price;
  const dailyPower = i.contract ? 0 : powerKw * 24 * i.electricity;
  const dailyContract = i.contract ? (i.hashrate * i.coin.pricePerUnitMonth) / 30 : 0;
  const dailyProfit = dailyRevenue - dailyPower - dailyContract;

  const decay = Math.pow(1 + i.difficultyGrowth / 100, -1 / 30);
  const series: ProfitResult["series"] = [];
  let revenue = 0;
  let breakEvenDay: number | null = null;
  const sampleEvery = Math.max(1, Math.round(i.days / 60));
  // Hosted contracts are paid upfront; own hardware pays for power day by day.
  const upfront = i.contract ? dailyContract * i.days : 0;
  let cost = upfront;
  for (let d = 1; d <= i.days; d++) {
    revenue += dailyRevenue * Math.pow(decay, d - 1);
    cost += dailyPower;
    if (breakEvenDay === null && revenue - cost >= 0 && i.contract) breakEvenDay = d;
    if (d === 1 || d % sampleEvery === 0 || d === i.days) series.push({ day: d, revenue, cost, profit: revenue - cost });
  }
  return {
    dailyCoins,
    dailyRevenue,
    dailyPower,
    dailyContract,
    dailyProfit,
    monthlyProfit: dailyProfit * 30,
    yearlyProfit: dailyProfit * 365,
    totalProfit: revenue - cost,
    totalRevenue: revenue,
    totalCost: cost,
    breakEvenDay,
    roi: cost > 0 ? ((revenue - cost) / cost) * 100 : 0,
    series,
    powerKw,
  };
}
