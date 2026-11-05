export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guides" | "Industry" | "Sustainability" | "DeFi" | "Technology";
  author: string;
  authorRole: string;
  date: string;
  readMinutes: number;
  cover: string;
  featured?: boolean;
  body: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "defi-game-changer-for-crypto-miners",
    title: "Decentralized Finance (DeFi): A Game-Changer for Crypto Miners",
    excerpt:
      "Mining rewards no longer have to sit idle. Here is how miners are using DeFi protocols to put their coins to work — and the risks worth understanding first.",
    category: "DeFi",
    author: "Sarah Lawson",
    authorRole: "Head of Research",
    date: "2026-10-28",
    readMinutes: 7,
    cover: "/images/blog-defi.webp",
    featured: true,
    body: [
      { type: "p", text: "For most of mining's history, the playbook was simple: mine, hold, and occasionally sell to cover power bills. Decentralized finance has added a new chapter. Mined coins can now be lent, used as collateral or supplied to liquidity pools — turning a static treasury into a productive one." },
      { type: "h2", text: "Why DeFi matters to miners" },
      { type: "p", text: "Miners have a natural, recurring inflow of coins. That steady stream makes them ideal participants in lending markets, where predictable deposits are valuable. Instead of selling rewards at an unfavourable moment, miners can borrow stablecoins against them to cover operating costs." },
      { type: "list", items: ["Borrow against mined BTC instead of selling during dips", "Earn yield on idle balances between payouts", "Hedge price exposure with on-chain derivatives", "Automate treasury rules with smart contracts"] },
      { type: "quote", text: "The best miners in the next cycle will be treasury managers as much as hardware operators.", cite: "Sarah Lawson" },
      { type: "h2", text: "Know the risks" },
      { type: "p", text: "Smart-contract bugs, liquidation cascades and wrapped-asset bridges all carry real risk. Start small, prefer audited protocols, and never borrow so much that a sharp price move could liquidate your position." },
      { type: "p", text: "MineCryptos payouts can be sent to any wallet you control, so you remain free to combine mining with the DeFi strategies that suit your risk appetite." },
    ],
  },
  {
    slug: "mastering-cryptocurrency-mining-beginners-guide",
    title: "Mastering Cryptocurrency Mining: A Beginner's Guide",
    excerpt:
      "Hashrate, difficulty, pools and payouts — the core concepts every new miner should understand before buying their first contract.",
    category: "Guides",
    author: "Mark Thompson",
    authorRole: "Mining Engineer",
    date: "2026-10-14",
    readMinutes: 9,
    cover: "/images/blog-beginners-guide.webp",
    body: [
      { type: "p", text: "Mining is the process that secures proof-of-work blockchains. Miners compete to find a valid block by performing trillions of hash calculations per second. The winner earns newly issued coins plus transaction fees." },
      { type: "h2", text: "Hashrate and difficulty" },
      { type: "p", text: "Hashrate measures how many guesses your hardware makes per second. Network difficulty adjusts so blocks arrive at a steady pace no matter how much hashrate joins. Your share of rewards is roughly your hashrate divided by the network's." },
      { type: "h2", text: "Why pools exist" },
      { type: "p", text: "A single miner might wait years to find a block alone. Pools combine hashrate from thousands of miners and split rewards proportionally, smoothing income into predictable daily payouts." },
      { type: "list", items: ["Pick a coin and algorithm that matches your goals", "Estimate profit with realistic power costs", "Choose hosted or self-run hardware", "Set a payout wallet you fully control"] },
      { type: "p", text: "Cloud mining removes the hardest parts — buying hardware, finding cheap power and keeping machines cool — so you can focus on strategy. Try our profit calculator to see how the numbers work." },
    ],
  },
  {
    slug: "future-of-blockchain-technology",
    title: "The Future of Blockchain Technology: What to Watch For",
    excerpt:
      "From layer-two networks to tokenised real-world assets, these are the developments most likely to shape the next five years of blockchain.",
    category: "Technology",
    author: "Daniel Okafor",
    authorRole: "Blockchain Analyst",
    date: "2026-09-30",
    readMinutes: 6,
    cover: "/images/blog-future-blockchain.webp",
    body: [
      { type: "p", text: "Blockchains have moved from experiment to infrastructure. The next phase is about scale, usability and connection to the traditional economy." },
      { type: "h2", text: "Layer twos go mainstream" },
      { type: "p", text: "Payment channels and rollups let users transact cheaply while settling to secure base layers. For Bitcoin miners, more activity on layer twos can ultimately mean more settlement fees on layer one." },
      { type: "h2", text: "Tokenised real-world assets" },
      { type: "p", text: "Bonds, invoices and even energy credits are being issued on-chain. Mining companies are experimenting with tokenised hashrate, letting investors buy future production directly." },
      { type: "list", items: ["Rollups and payment channels", "Tokenised hashrate and energy", "Better wallets with social recovery", "Clearer regulation in major markets"] },
      { type: "p", text: "None of these trends happen overnight, but each one strengthens the case for secure, decentralised settlement — the job that miners do every ten minutes." },
    ],
  },
  {
    slug: "crypto-mining-trends-whats-on-the-horizon",
    title: "Crypto Mining Trends: What's on the Horizon",
    excerpt:
      "Post-halving economics, immersion cooling and grid partnerships — the trends separating efficient miners from the rest.",
    category: "Industry",
    author: "Mark Thompson",
    authorRole: "Mining Engineer",
    date: "2026-09-12",
    readMinutes: 5,
    cover: "/images/blog-mining-trends.webp",
    body: [
      { type: "p", text: "Every halving squeezes margins and rewards efficiency. The miners who thrive are the ones who treat joules per terahash as their most important metric." },
      { type: "h2", text: "Efficiency is everything" },
      { type: "p", text: "New ASIC generations have pushed efficiency below 17 J/TH. Upgrading older fleets is often the single biggest lever on profitability." },
      { type: "h2", text: "Cooling gets wet" },
      { type: "p", text: "Immersion cooling lets chips run cooler and quieter, extending hardware life and enabling safe overclocking. Our Abu Dhabi halls are fully immersion-cooled." },
      { type: "list", items: ["Sub-17 J/TH hardware becomes standard", "Immersion cooling in hot climates", "Demand-response deals with grid operators", "Heat reuse for greenhouses and district heating"] },
      { type: "p", text: "Expect consolidation too: large operators with cheap power and modern fleets are best placed to absorb lower block rewards." },
    ],
  },
  {
    slug: "sustainable-mining-balancing-profit-and-environment",
    title: "Sustainable Mining: Balancing Profit and the Environment",
    excerpt:
      "Renewable power is no longer just good PR — it is often the cheapest electricity available. Here is how we choose green sites.",
    category: "Sustainability",
    author: "Elena Varga",
    authorRole: "Sustainability Lead",
    date: "2026-08-25",
    readMinutes: 6,
    cover: "/images/blog-sustainable.webp",
    body: [
      { type: "p", text: "Mining is energy-intensive by design. The question is not whether it uses energy, but which energy — and whether it can help grids rather than strain them." },
      { type: "h2", text: "Stranded energy is cheap energy" },
      { type: "p", text: "Hydro dams, geothermal fields and wind farms often produce more power than local grids can absorb. Miners are flexible buyers who can soak up that surplus, improving the economics of renewable projects." },
      { type: "quote", text: "Over 80% of the power behind MineCryptos hashrate comes from renewable sources.", cite: "MineCryptos Sustainability Report" },
      { type: "h2", text: "Heat is a resource" },
      { type: "p", text: "In Norway, waste heat from our facility warms greenhouses that grow vegetables year-round. Projects like this turn a by-product into community value." },
      { type: "list", items: ["Site selection prioritises surplus renewables", "Demand response during grid peaks", "Heat recovery partnerships", "Transparent energy-mix reporting per site"] },
    ],
  },
  {
    slug: "proof-of-stake-vs-proof-of-work",
    title: "Understanding Proof-of-Stake vs. Proof-of-Work",
    excerpt:
      "Two very different ways to secure a blockchain. We compare security, decentralisation and what each model means for miners and holders.",
    category: "Guides",
    author: "Daniel Okafor",
    authorRole: "Blockchain Analyst",
    date: "2026-08-08",
    readMinutes: 8,
    cover: "/images/blog-pos-vs-pow.webp",
    body: [
      { type: "p", text: "Every blockchain needs a way to agree on which transactions are valid. Proof-of-work and proof-of-stake are the two dominant answers, each with real trade-offs." },
      { type: "h2", text: "Proof-of-work" },
      { type: "p", text: "Miners spend real-world energy to propose blocks. Attacking the chain would require acquiring enormous amounts of hardware and power, which makes history very expensive to rewrite." },
      { type: "h2", text: "Proof-of-stake" },
      { type: "p", text: "Validators lock up coins as collateral and are chosen to propose blocks. Misbehaviour is punished by slashing. It uses far less energy, but ties security to the distribution of coins." },
      { type: "list", items: ["PoW: security anchored in physical energy", "PoS: security anchored in staked capital", "PoW coins can be mined with hashrate contracts", "PoS coins are earned through staking, not mining"] },
      { type: "p", text: "This is why our plans focus on proof-of-work networks such as Bitcoin, Litecoin, Dogecoin and Kaspa — coins that can genuinely be mined." },
    ],
  },
];

export const POST_BY_SLUG: Record<string, Post> = Object.fromEntries(POSTS.map((p) => [p.slug, p]));
export const POST_CATEGORIES = ["All", "Guides", "Industry", "Technology", "DeFi", "Sustainability"] as const;
