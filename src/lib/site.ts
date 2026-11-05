export const SITE = {
  name: "MineCryptos",
  tagline: "Forge Your Crypto Destiny",
  url: "https://minecryptos.example",
  email: "support@minecryptos.example",
  phone: "+44 20 7946 0958",
  address: "21 Hashrate Lane, London EC2A 4NE, United Kingdom",
} as const;

export type NavLink = { label: string; to: string; description?: string };

export const PRIMARY_NAV: NavLink[] = [
  { label: "Plans", to: "/plans" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Calculator", to: "/calculator" },
  { label: "Markets", to: "/markets" },
  { label: "Blog", to: "/blog" },
];

export const COMPANY_NAV: NavLink[] = [
  { label: "About Us", to: "/about", description: "Our story, mission and team" },
  { label: "Data Centers", to: "/data-centers", description: "Six renewable-first mining farms" },
  { label: "Referral Program", to: "/referral", description: "Earn up to 8% commission" },
  { label: "FAQ", to: "/faq", description: "Answers to common questions" },
  { label: "Contact", to: "/contact", description: "Talk to our mining experts" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Mining",
    links: [
      { label: "Mining Plans", to: "/plans" },
      { label: "Profit Calculator", to: "/calculator" },
      { label: "Live Markets", to: "/markets" },
      { label: "Data Centers", to: "/data-centers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Referral Program", to: "/referral" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "FAQ", to: "/faq" },
      { label: "Miner Dashboard", to: "/dashboard" },
      { label: "Log In", to: "/login" },
    ],
  },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Terms and Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Refund Policy", to: "/terms#refunds" },
  { label: "Cancellation Policy", to: "/terms#cancellation" },
];

export type SocialLink = { label: string; href: string; icon: "x" | "telegram" | "discord" | "youtube" | "linkedin" };

/** Placeholder profiles — replace with the real handles before launch. */
export const SOCIALS: SocialLink[] = [
  { label: "MineCryptos on X", href: "https://x.com/", icon: "x" },
  { label: "MineCryptos on Telegram", href: "https://t.me/", icon: "telegram" },
  { label: "MineCryptos on Discord", href: "https://discord.com/", icon: "discord" },
  { label: "MineCryptos on YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  { label: "MineCryptos on LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
];

export const DEMO_REFERRAL = "https://minecryptos.example/r/MINER-7Q2X";
