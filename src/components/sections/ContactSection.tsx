import { Reveal } from "../ui/Reveal";
import { ContactForm } from "./ContactForm";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section className={`section section-lavender ${styles.section}`} id="get-in-touch">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <h2 className="h2">Get in Touch</h2>
          <p className="lead">Have questions or need assistance? Reach out to us, and our dedicated team will respond promptly.</p>
          <img src="/images/art-phone.webp" alt="" loading="lazy" width={640} height={537} />
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
