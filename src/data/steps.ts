import type { IconName } from "../components/ui/Icon";

export const STEPS: { icon: IconName; title: string; text: string; detail: string }[] = [
  {
    icon: "user",
    title: "Create your account",
    text: "Sign up in under a minute and secure it with two-factor authentication.",
    detail: "All you need is an email address. Enable 2FA and a withdrawal allow-list in settings to lock your account down from day one.",
  },
  {
    icon: "cpu",
    title: "Choose a mining plan",
    text: "Pick a coin, hashrate and duration — or model it first in the calculator.",
    detail: "Plans cover Bitcoin, Litecoin + Dogecoin and Kaspa. Monthly billing unlocks discounts of up to 18%; hourly billing is perfect for testing.",
  },
  {
    icon: "zap",
    title: "We start hashing",
    text: "Your hashpower is allocated in one of our renewable-first data centers.",
    detail: "Machines are assigned within minutes and pointed at top-tier pools with automatic failover. You can watch every worker come online in the dashboard.",
  },
  {
    icon: "wallet",
    title: "Get daily payouts",
    text: "Rewards land in your wallet every 24 hours. Track everything live.",
    detail: "Payouts settle daily with no minimum threshold. Withdraw to any wallet you control, or let rewards accumulate and compound into more hashpower.",
  },
];
