export type Faq = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "Getting Started" | "Plans & Billing" | "Payouts" | "Security" | "Account";

export const FAQ_CATEGORIES: FaqCategory[] = ["Getting Started", "Plans & Billing", "Payouts", "Security", "Account"];

export const FAQS: Faq[] = [
  { category: "Getting Started", q: "How do I get started with cryptocurrency mining at MineCryptos?", a: "Simply sign up for an account, choose your preferred hosting service or mining package, and follow our setup instructions. Our user-friendly platform makes it easy to kick-start your mining journey — most customers are hashing within 24 hours." },
  { category: "Getting Started", q: "What sets MineCryptos apart from other mining service providers?", a: "We own and operate our data centers, publish the energy mix of every site and show per-worker statistics in real time. You always know where your hashpower lives and how it performs." },
  { category: "Getting Started", q: "Do I need my own mining hardware?", a: "No. Our plans include hardware, power, cooling and maintenance. If you already own ASICs, our SecureHash Haven plan can host your machines in dedicated racks." },
  { category: "Getting Started", q: "Which coins can I mine?", a: "We currently support proof-of-work networks: Bitcoin (SHA-256), Litecoin and Dogecoin (Scrypt, merge-mined) and Kaspa (kHeavyHash). Proof-of-stake coins such as Ethereum cannot be mined." },
  { category: "Plans & Billing", q: "Can I upgrade or scale my mining services with MineCryptos?", a: "Yes. You can add hashpower to an active contract at any time from your dashboard, or switch to a larger plan. Upgrades are pro-rated to the day." },
  { category: "Plans & Billing", q: "What is the difference between monthly and hourly billing?", a: "Monthly billing offers the best price and duration discounts of up to 18%. Hourly billing costs a little more but lets you mine for as little as six hours — perfect for testing." },
  { category: "Plans & Billing", q: "Are there any hidden maintenance fees?", a: "No. The plan price covers power, cooling, maintenance and pool fees. The only extra is VAT where applicable (20% for UK-based customers)." },
  { category: "Plans & Billing", q: "Which payment methods do you accept?", a: "We accept BTC, USDT and USDC. Card payments are available in selected regions through our payment partner." },
  { category: "Payouts", q: "How often are mining rewards paid out?", a: "Rewards are calculated continuously and settled to your wallet every 24 hours with no minimum threshold for BTC, LTC, DOGE and KAS." },
  { category: "Payouts", q: "Are mining profits guaranteed?", a: "No. Mining revenue depends on coin prices, network difficulty and block rewards, all of which change over time. Our calculator shows estimates only, not guarantees." },
  { category: "Payouts", q: "Can I change my payout wallet?", a: "Yes. You can update your payout address in dashboard settings. For your security, changes take effect after a 24-hour confirmation window." },
  { category: "Security", q: "Are my assets and data secure with MineCryptos?", a: "Our facilities use biometric access, 24/7 guards and CCTV. Accounts support two-factor authentication and withdrawal address allow-lists, and our infrastructure undergoes regular third-party audits." },
  { category: "Security", q: "What happens if a machine fails?", a: "Faulty hardware is swapped by on-site engineers, usually within hours. If downtime exceeds your plan's SLA, you receive service credits automatically." },
  { category: "Account", q: "Can I cancel my contract?", a: "Hourly contracts can be stopped at any time. Monthly contracts can be cancelled within 14 days of purchase for a pro-rated refund — see our Cancellation Policy for details." },
  { category: "Account", q: "How does the referral program work?", a: "Share your personal link. When friends buy hashpower you earn 3–8% commission depending on your tier, paid in the coin they mine." },
];
