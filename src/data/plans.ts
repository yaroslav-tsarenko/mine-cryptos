export type Billing = "monthly" | "hourly";

export type Plan = {
  slug: string;
  name: string;
  tagline: string;
  coin: "BTC" | "LTC" | "KAS";
  algorithm: string;
  hashrate: number;
  unit: string;
  powerW: number;
  efficiency: string;
  /** USD per month for one unit of the plan. */
  priceMonthly: number;
  image: string;
  /** "cover" for illustrations with their own background, "contain" for cut-outs. */
  imageFit: "cover" | "contain";
  badge?: string;
  description: string;
  features: { title: string; text: string }[];
  uptime: string;
  locations: string[];
  rating: number;
  reviews: number;
};

export const PLANS: Plan[] = [
  {
    slug: "cryptonest-miner",
    name: "CryptoNest Miner",
    tagline: "A cozy, secure home for your first rig",
    coin: "BTC",
    algorithm: "SHA-256",
    hashrate: 75,
    unit: "TH/s",
    powerW: 1250,
    efficiency: "16.7 J/TH",
    priceMonthly: 79,
    image: "/images/art-server-rack.webp",
    imageFit: "cover",
    badge: "Starter",
    description:
      "CryptoNest, our entry hosting server, provides the perfect environment for your mining rigs to thrive. Nestled in the heart of secure facilities, CryptoNest offers a technologically advanced home for your valuable mining equipment, with 24/7 monitoring and state-of-the-art security.",
    features: [
      { title: "Exclusive Hardware", text: "Your own dedicated server with top-tier hardware for maximum performance." },
      { title: "Customization", text: "Tailor your hosting environment to meet your specific crypto requirements." },
      { title: "Enhanced Security", text: "Multi-layered security measures, including advanced encryption and regular security audits." },
      { title: "24/7 Monitoring", text: "Continuous server monitoring to ensure uptime and rapid issue resolution." },
      { title: "Scalability", text: "Easily scale your resources up or down based on your crypto projects and demands." },
      { title: "High-Speed Connectivity", text: "Lightning-fast network connectivity for seamless crypto transactions." },
    ],
    uptime: "99.95%",
    locations: ["reykjavik", "quebec"],
    rating: 4.7,
    reviews: 312,
  },
  {
    slug: "cryptovault-hosting",
    name: "CryptoVault Hosting",
    tagline: "Vault-grade hosting for serious hashpower",
    coin: "BTC",
    algorithm: "SHA-256",
    hashrate: 110,
    unit: "TH/s",
    powerW: 3450,
    efficiency: "31.4 W/TH",
    priceMonthly: 119,
    image: "/images/art-secure-server.webp",
    imageFit: "contain",
    description:
      "CryptoVault pairs proven SHA-256 hardware with our Fortress of Security: biometric access, isolated network segments and insured equipment. Ideal for miners who value predictability over everything else.",
    features: [
      { title: "Insured Equipment", text: "Hardware insured against fire, theft and power surges at every facility." },
      { title: "Isolated Networks", text: "Each customer rack lives on its own VLAN with DDoS-filtered uplinks." },
      { title: "Daily Payouts", text: "Rewards settle to your wallet every 24 hours with no minimum threshold." },
      { title: "24/7 Monitoring", text: "On-site engineers and automated alerts keep your rigs hashing." },
      { title: "Flexible Terms", text: "Switch between monthly and hourly billing whenever you like." },
      { title: "Transparent Fees", text: "One all-inclusive price covering power, cooling and maintenance." },
    ],
    uptime: "99.97%",
    locations: ["texas", "norway"],
    rating: 4.8,
    reviews: 541,
  },
  {
    slug: "hashpower-hub",
    name: "HashPower Hub",
    tagline: "Our most popular balance of price and power",
    coin: "BTC",
    algorithm: "SHA-256",
    hashrate: 200,
    unit: "TH/s",
    powerW: 3500,
    efficiency: "17.5 J/TH",
    priceMonthly: 199,
    image: "/images/art-analytics.webp",
    imageFit: "cover",
    badge: "Most popular",
    description:
      "HashPower Hub runs latest-generation ASICs at 17.5 J/TH, so more of every dollar becomes hashrate. Real-time analytics in your dashboard show exactly what your machines are doing.",
    features: [
      { title: "Latest-gen ASICs", text: "Top-efficiency SHA-256 miners refreshed every hardware cycle." },
      { title: "Live Analytics", text: "Per-worker hashrate, temperature and reject-rate charts." },
      { title: "Auto Pool Failover", text: "Hashpower automatically switches pools if one goes down." },
      { title: "Renewable Power", text: "Over 80% of energy comes from hydro, wind and geothermal." },
      { title: "Scalability", text: "Add terahashes in one click without new paperwork." },
      { title: "Priority Support", text: "A dedicated success manager reachable around the clock." },
    ],
    uptime: "99.98%",
    locations: ["reykjavik", "texas", "quebec"],
    rating: 4.9,
    reviews: 1204,
  },
  {
    slug: "bitmine-nexus",
    name: "BitMine Nexus",
    tagline: "Merge-mine Litecoin and Dogecoin together",
    coin: "LTC",
    algorithm: "Scrypt",
    hashrate: 16,
    unit: "GH/s",
    powerW: 3360,
    efficiency: "0.21 J/MH",
    priceMonthly: 289,
    image: "/images/art-mining-cart.webp",
    imageFit: "cover",
    description:
      "BitMine Nexus merge-mines LTC and DOGE on the Scrypt algorithm, so a single contract earns two coins. A great way to diversify away from pure Bitcoin exposure.",
    features: [
      { title: "Dual Rewards", text: "Earn Litecoin and Dogecoin simultaneously from one machine." },
      { title: "Scrypt Specialists", text: "Hardware tuned by engineers who have run Scrypt farms since 2017." },
      { title: "Daily Payouts", text: "Both coins pay out daily to the wallets of your choice." },
      { title: "24/7 Monitoring", text: "Continuous server monitoring to ensure uptime and rapid issue resolution." },
      { title: "Cooling Optimised", text: "Immersion-ready racks keep chips cool and efficient." },
      { title: "Flexible Terms", text: "Monthly or hourly billing with no lock-in." },
    ],
    uptime: "99.93%",
    locations: ["paraguay", "quebec"],
    rating: 4.6,
    reviews: 388,
  },
  {
    slug: "securehash-haven",
    name: "SecureHash Haven",
    tagline: "Dedicated enterprise racks with an SLA",
    coin: "BTC",
    algorithm: "SHA-256",
    hashrate: 400,
    unit: "TH/s",
    powerW: 6800,
    efficiency: "17 J/TH",
    priceMonthly: 389,
    image: "/images/art-server-stack.webp",
    imageFit: "contain",
    badge: "Enterprise",
    description:
      "SecureHash Haven gives funds and businesses dedicated racks, a contractual uptime SLA and custom payout schedules. Your hardware, our fortress.",
    features: [
      { title: "Dedicated Racks", text: "Physically separated racks reserved only for your organisation." },
      { title: "Uptime SLA", text: "99.98% uptime guarantee with service credits if we miss it." },
      { title: "Custom Payouts", text: "Weekly, daily or threshold payouts to multi-sig wallets." },
      { title: "Audit Reports", text: "Monthly hashrate and power audit reports for your accountants." },
      { title: "On-site Visits", text: "Schedule visits to inspect your equipment in person." },
      { title: "Account Manager", text: "A named engineer and account manager for your fleet." },
    ],
    uptime: "99.98%",
    locations: ["norway", "abu-dhabi", "texas"],
    rating: 4.9,
    reviews: 96,
  },
  {
    slug: "kaspulse-node",
    name: "KasPulse Node",
    tagline: "Fast blocks, fast rewards on Kaspa",
    coin: "KAS",
    algorithm: "kHeavyHash",
    hashrate: 21,
    unit: "TH/s",
    powerW: 3150,
    efficiency: "150 W/TH",
    priceMonthly: 219,
    image: "/images/art-eth-wallet.webp",
    imageFit: "contain",
    badge: "New",
    description:
      "KasPulse Node mines Kaspa, a proof-of-work network with one-second blocks. Rewards arrive in a steady stream, which makes it a favourite for miners who like watching their balance grow.",
    features: [
      { title: "One-second Blocks", text: "Kaspa's blockDAG produces rewards continuously throughout the day." },
      { title: "Efficient ASICs", text: "Purpose-built kHeavyHash hardware at 150 W/TH." },
      { title: "Daily Payouts", text: "Rewards settle to your KAS wallet every day." },
      { title: "24/7 Monitoring", text: "Continuous monitoring with automatic restarts for stuck workers." },
      { title: "Scalability", text: "Grow your Kaspa hashrate without changing contracts." },
      { title: "Green Energy", text: "Hosted in hydro-powered facilities in Paraguay and Quebec." },
    ],
    uptime: "99.94%",
    locations: ["paraguay", "quebec"],
    rating: 4.5,
    reviews: 142,
  },
];

export const PLAN_BY_SLUG: Record<string, Plan> = Object.fromEntries(PLANS.map((p) => [p.slug, p]));

export const MONTHLY_DURATIONS = [
  { months: 1, label: "1 month", discount: 0 },
  { months: 3, label: "3 months", discount: 0.05 },
  { months: 6, label: "6 months", discount: 0.1 },
  { months: 12, label: "12 months", discount: 0.18 },
] as const;

export const HOURLY_DURATIONS = [
  { hours: 6, label: "6 hours" },
  { hours: 12, label: "12 hours" },
  { hours: 24, label: "24 hours" },
  { hours: 72, label: "72 hours" },
] as const;

/** Hourly billing carries a 15% flexibility premium over the monthly rate. */
export function hourlyRate(plan: Plan): number {
  return (plan.priceMonthly / 720) * 1.15;
}
