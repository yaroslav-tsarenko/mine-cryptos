export type Testimonial = { name: string; role: string; quote: string; rating: number; plan: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Olivia Bennett", role: "Software engineer, Manchester", quote: "I had zero hardware experience. Two days after signing up my dashboard was already showing daily BTC payouts. The live worker stats are addictive.", rating: 5, plan: "HashPower Hub" },
  { name: "Rafael Mendes", role: "Founder, Lumen Capital", quote: "SecureHash Haven gave our fund dedicated racks and audit-ready reports. Support answered every question within minutes, even at 3am.", rating: 5, plan: "SecureHash Haven" },
  { name: "Aiko Tanaka", role: "Designer, Osaka", quote: "Hourly billing let me test the waters before committing. The profit calculator was honest about the risks, which built a lot of trust.", rating: 5, plan: "CryptoNest Miner" },
  { name: "Lukas Weber", role: "Crypto hobbyist, Berlin", quote: "Merge-mining LTC and DOGE with BitMine Nexus is a fun way to diversify. Payouts have been on time every single day.", rating: 4, plan: "BitMine Nexus" },
  { name: "Priya Nair", role: "Product manager, Bengaluru", quote: "Knowing exactly which data center my hashpower runs in — and that it is hydro-powered — matters to me. Great transparency.", rating: 5, plan: "CryptoVault Hosting" },
];
