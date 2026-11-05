import { POSTS } from "../../data/posts";
import { Button } from "../ui/Button";
import { Chevron } from "../ui/Chevron";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PostCard } from "./PostCard";

export function InsightsSection({ title = "Discover Our Latest Insights", excludeSlug }: { title?: string; excludeSlug?: string }) {
  const posts = POSTS.filter((p) => p.slug !== excludeSlug).slice(0, 3);
  return (
    <section className="section" style={{ position: "relative", overflow: "hidden" }}>
      <Chevron size={280} style={{ right: "-90px", top: "-40px" }} rotate={-30} />
      <div className="container">
        <SectionHeading
          title={title}
          action={
            <Button to="/blog" variant="outline">
              Go to blogs
            </Button>
          }
        />
        <div className="grid-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
