import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import styles from "./CtaBand.module.css";

type Props = {
  title?: ReactNode;
  text?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
};

export function CtaBand({
  title = "Ready to forge your crypto destiny?",
  text = "Start mining in minutes. No hardware, no noise, no surprise fees — just hashpower and daily payouts.",
  primary = { label: "Start Your Journey", to: "/signup" },
  secondary = { label: "Compare plans", to: "/plans" },
}: Props) {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className={styles.band}>
          <div className={styles.text}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.actions}>
            <Button to={primary.to} variant="white">
              {primary.label}
            </Button>
            <Button to={secondary.to} variant="ghost">
              {secondary.label}
            </Button>
          </div>
          <img src="/images/art-hand-phone.webp" alt="" className={styles.art} loading="lazy" width={880} height={1002} />
        </Reveal>
      </div>
    </section>
  );
}
