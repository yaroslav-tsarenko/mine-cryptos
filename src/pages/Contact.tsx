import { ContactForm } from "../components/sections/ContactForm";
import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import type { ReactNode } from "react";
import { Icon, type IconName } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { openSupportChat } from "../components/widgets/chatBus";
import { FAQS } from "../data/faqs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { SITE } from "../lib/site";
import styles from "./Contact.module.css";

const HOURS = [
  ["Live chat & email", "24/7, every day"],
  ["Phone support", "Mon–Fri, 08:00–20:00 GMT"],
  ["Enterprise desk", "Mon–Fri, 09:00–18:00 GMT"],
];

export default function Contact() {
  useDocumentMeta({ title: "Contact Us", description: "Get in touch with the MineCryptos team by live chat, email or phone. We reply within one business hour." });
  const cards: { id: string; icon: IconName; title: string; text: string; action: ReactNode }[] = [
    { id: "email", icon: "mail", title: "Email us", text: "We reply within one business hour.", action: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> },
    { id: "phone", icon: "phone", title: "Call us", text: "Mon–Fri, 08:00–20:00 GMT.", action: <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> },
    {
      id: "chat",
      icon: "chat",
      title: "Live chat",
      text: "Instant answers from our assistant, 24/7.",
      action: (
        <button type="button" onClick={openSupportChat}>
          Start a conversation
        </button>
      ),
    },
    { id: "office", icon: "map-pin", title: "Head office", text: SITE.address, action: <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">Open map</a> },
  ];

  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} title="Get in Touch" description="Have questions or need assistance? Reach out to us, and our dedicated team will respond promptly." />

      <section className="section">
        <div className="container">
          <div className={styles.cards}>
            {cards.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <div className={styles.card} id={c.id}>
                  <span className={styles.icon}>
                    <Icon name={c.icon} size={22} />
                  </span>
                  <h2>{c.title}</h2>
                  <p>{c.text}</p>
                  <div className={styles.action}>{c.action}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.main}>
            <Reveal className={styles.formCard}>
              <h2 className="h3">Send us a message</h2>
              <p className="copy">Tell us a little about your mining goals and we'll recommend the right setup.</p>
              <ContactForm showFaqLink={false} />
            </Reveal>
            <aside className={styles.side}>
              <div className={styles.hours}>
                <h2>
                  <Icon name="clock" size={18} /> Support hours
                </h2>
                <dl>
                  {HOURS.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={styles.quick}>
                <h2>Quick answers</h2>
                <Accordion items={FAQS.slice(8, 12).map((f, i) => ({ id: String(i), title: f.q, content: f.a }))} />
                <Button to="/faq" variant="link" icon="arrow-right">
                  See all FAQs
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
