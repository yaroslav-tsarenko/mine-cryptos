import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import styles from "./TriadSection.module.css";

const ITEMS = [
  { icon: "/images/icon-speed.webp", title: "Speed", text: "Our hosting services are optimized for high-speed mining, ensuring rapid transaction confirmations and maximum mining efficiency." },
  { icon: "/images/icon-security.webp", title: "Security", text: "Your data is encrypted and protected against cyber threats, ensuring the utmost security for your mining operations." },
  { icon: "/images/icon-scale.webp", title: "Scalability", text: "Our hosting plans are designed to accommodate miners of all sizes, from small-scale enthusiasts to large-scale mining operations." },
];

export function TriadSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeading
          align="center"
          title="The Triad of Excellence: Speed, Security, and Scalability"
          description="At MineCryptos, we're not just a service provider; we're your strategic partner in the world of cryptocurrency mining. Our commitment to excellence, customer-centric approach, and dedication to staying at the forefront of the industry set us apart."
        />
        <div className="grid-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className={`card-outline ${styles.card}`}>
              <img src={item.icon} alt="" width={80} height={80} loading="lazy" />
              <h3 className="h3">{item.title}</h3>
              <p className="copy">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
