import { ConfidenceSection } from "../components/sections/ConfidenceSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Hero } from "../components/sections/Hero";
import { InsightsSection } from "../components/sections/InsightsSection";
import { PlansSection } from "../components/sections/PlansSection";
import { StatsStrip } from "../components/sections/StatsStrip";
import { StepsSection } from "../components/sections/StepsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { TickerBar } from "../components/sections/TickerBar";
import { TriadSection } from "../components/sections/TriadSection";
import { WhyUsSection } from "../components/sections/WhyUsSection";
import { PLAN_BY_SLUG } from "../data/plans";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { SITE } from "../lib/site";

const FEATURED = ["hashpower-hub", "cryptovault-hosting", "bitmine-nexus", "securehash-haven"].map((s) => PLAN_BY_SLUG[s]);

export default function Home() {
  useDocumentMeta({
    title: SITE.name,
    description:
      "MineCryptos offers hosted crypto mining plans, a profit calculator, live market data and a miner dashboard. Forge your crypto destiny.",
  });
  return (
    <>
      <Hero />
      <TickerBar />
      <StatsStrip />
      <PlansSection plans={FEATURED} />
      <WhyUsSection />
      <TriadSection />
      <StepsSection />
      <ConfidenceSection />
      <TestimonialsSection />
      <ContactSection />
      <InsightsSection />
    </>
  );
}
