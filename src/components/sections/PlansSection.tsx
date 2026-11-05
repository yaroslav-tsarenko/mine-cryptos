import { PLANS, type Plan } from "../../data/plans";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PlanCard } from "./PlanCard";

type Props = { title?: string; plans?: Plan[]; excludeSlug?: string };

/** "Explore Our Crypto Mining Solutions" — four plan cards with a View All action. */
export function PlansSection({ title = "Explore Our Crypto Mining Solutions", plans, excludeSlug }: Props) {
  const list = (plans ?? PLANS.filter((p) => p.slug !== excludeSlug)).slice(0, 4);
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title={title}
          action={
            <Button to="/plans" variant="outline" size="md">
              View All
            </Button>
          }
        />
        <div className="grid-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <PlanCard plan={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
