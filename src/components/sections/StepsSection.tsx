import { Button } from "../ui/Button";
import { STEPS } from "../../data/steps";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import styles from "./StepsSection.module.css";

export function StepsSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="section section-lavender">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="From sign-up to first payout in four steps"
          action={
            showCta && (
              <Button to="/how-it-works" variant="outline">
                See how it works
              </Button>
            )
          }
        />
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className={styles.step}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.icon}>
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="h3">{s.title}</h3>
              <p className="copy">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
