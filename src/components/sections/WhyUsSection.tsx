import { Chevron } from "../ui/Chevron";
import { Reveal } from "../ui/Reveal";
import styles from "./WhyUsSection.module.css";

const POINTS = [
  { title: "24/7 monitoring", text: "Ensuring optimal performance and uptime." },
  { title: "Flexible plans", text: "A wide array of options to meet your specific mining needs." },
  { title: "Expert guidance", text: "Offering you valuable insights and support." },
  { title: "Thriving community", text: "A vibrant community of miners & access to educational resources." },
];

export function WhyUsSection({ image = "/images/art-server-stack.webp" }: { image?: string }) {
  return (
    <section className={`section ${styles.section}`}>
      <Chevron size={320} style={{ left: "-120px", top: "10%" }} rotate={180} />
      <div className="container grid-2">
        <Reveal className={styles.media}>
          <img src={image} alt="" loading="lazy" width={760} height={699} />
        </Reveal>
        <Reveal delay={120} className={styles.text}>
          <h2 className="h2">Why MineCryptos is Your Crypto Mining Partner</h2>
          <p className="lead">
            At MineCryptos, we're committed to delivering the best-in-class cryptocurrency mining experience. Our passion for
            innovation, unwavering dedication, and cutting-edge technology set us apart in the crypto mining industry. Discover why
            we're your ideal partner in this exciting journey.
          </p>
          <ul className={styles.points}>
            {POINTS.map((p) => (
              <li key={p.title}>
                <img src="/images/icon-check.webp" alt="" width={48} height={48} loading="lazy" />
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
