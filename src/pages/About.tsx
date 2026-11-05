import { CtaBand } from "../components/sections/CtaBand";
import { PlansSection } from "../components/sections/PlansSection";
import { StatsStrip } from "../components/sections/StatsStrip";
import { WhyUsSection } from "../components/sections/WhyUsSection";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./About.module.css";

const VALUES = [
  { icon: "/images/icon-innovation.webp", title: "Innovation", text: "We are dedicated to staying at the forefront of the cryptocurrency mining industry, continuously seeking innovative solutions to help our customers succeed." },
  { icon: "/images/icon-security.webp", title: "Integrity", text: "We operate with the highest ethical standards, ensuring transparency, trust, and accountability in all our interactions." },
  { icon: "/images/icon-community.webp", title: "Community", text: "At the heart of MineCryptos is a thriving community of miners. We believe in the power of collaboration to create a stronger, more sustainable ecosystem." },
];

const TIMELINE = [
  { year: "2018", title: "MineCryptos is founded", text: "Three engineers start hosting rigs for friends in a London basement." },
  { year: "2019", title: "First data center", text: "Our geothermal-powered Reykjavík facility goes live with 10 MW." },
  { year: "2021", title: "Texas campus", text: "A 120 MW campus in Abilene makes us one of the larger hosting providers." },
  { year: "2023", title: "Hydro in Paraguay", text: "We open next to the Itaipú dam and launch Scrypt merge-mining plans." },
  { year: "2024", title: "Immersion cooling", text: "Abu Dhabi halls bring immersion cooling to the desert." },
  { year: "2026", title: "1.4 EH/s and growing", text: "48,000+ miners trust us with more than 1.4 exahashes of hashpower." },
];

const TEAM = [
  { name: "Alexandra Reid", role: "Co-founder & CEO" },
  { name: "Mark Thompson", role: "Head of Mining Engineering", photo: "/images/avatar-mark.webp" },
  { name: "Sarah Lawson", role: "Head of Research" },
  { name: "Daniel Okafor", role: "Blockchain Analyst" },
];

export default function About() {
  useDocumentMeta({ title: "About Us", description: "MineCryptos was born out of a shared passion for cryptocurrencies. Meet the team, our mission, vision and values." });
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
        title="Where Innovation Meets Opportunity"
        description="MineCryptos was born out of a shared passion for cryptocurrencies and a vision to make blockchain technology accessible to all. Founded by a team of seasoned experts, our story is one of transformation, innovation, and an unwavering commitment to revolutionize crypto mining."
      >
        <Button to="/plans" variant="white">
          Explore our plans
        </Button>
        <Button to="/contact" variant="ghost">
          Talk to the team
        </Button>
      </PageHero>

      <StatsStrip />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            title="Story of MineCryptos: From Passion to Pioneers"
            description="At MineCryptos, our mission is clear — to empower individuals and businesses to harness the full potential of cryptocurrency mining, while fostering a sense of community and sustainability."
          />
          <div className="grid-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className={`card-outline ${styles.value}`}>
                  <img src={v.icon} alt="" width={80} height={80} loading="lazy" />
                  <h3 className="h3">{v.title}</h3>
                  <p className="copy">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container grid-2">
          <Reveal className={styles.text}>
            <span className="eyebrow">Our mission</span>
            <h2 className="h2">Empowering Digital Miners</h2>
            <p className="lead">
              To empower individuals and businesses to harness the full potential of cryptocurrency mining. We're dedicated to providing the tools,
              knowledge, and resources needed to enable you to prosper in the world of decentralized finance, all while fostering a sense of community
              and sustainability.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <img className={styles.img} src="/images/art-mining-cart.webp" alt="" loading="lazy" width={900} height={659} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <Reveal className={styles.imgFirst}>
            <img className={styles.img} src="/images/art-analytics.webp" alt="" loading="lazy" width={900} height={648} />
          </Reveal>
          <Reveal delay={120} className={styles.text}>
            <span className="eyebrow">Our vision</span>
            <h2 className="h2">A World Transformed by Blockchain</h2>
            <p className="lead">
              Our vision at MineCryptos is to witness a world where the benefits of blockchain technology are embraced by all. We strive for a future
              where the blockchain is the cornerstone of global financial systems, bringing transparency, security, and economic empowerment to millions
              around the globe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container">
          <SectionHeading title="Our journey so far" />
          <ol className={styles.timeline}>
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.year} delay={(i % 3) * 90} className={styles.milestone}>
                <span className={styles.year}>{t.year}</span>
                <h3>{t.title}</h3>
                <p className="copy">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <WhyUsSection image="/images/art-eth-wallet.webp" />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeading title="Meet the leadership" description="Engineers, researchers and operators who have been mining since the early days." />
          <div className="grid-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className={styles.member}>
                  <Avatar name={m.name} size={96} src={m.photo} />
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PlansSection />
      <CtaBand />
    </>
  );
}
