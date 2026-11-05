import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Chevron } from "../components/ui/Chevron";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./NotFound.module.css";

const SUGGESTIONS = [
  { to: "/plans", label: "Mining plans" },
  { to: "/calculator", label: "Profit calculator" },
  { to: "/markets", label: "Live markets" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

type Props = { inDashboard?: boolean; title?: string; message?: string };

export default function NotFound({ inDashboard, title = "This block hasn't been mined yet", message }: Props) {
  useDocumentMeta({ title: "Page not found", description: "The page you are looking for does not exist." });
  // Inside the dashboard the top bar already renders the page <h1>.
  const Title = inDashboard ? "h2" : "h1";
  return (
    <section className={inDashboard ? `${styles.wrap} ${styles.dash}` : styles.wrap}>
      <Chevron size={360} style={{ left: "-80px", top: "20%" }} rotate={180} opacity={0.8} />
      <Chevron size={260} style={{ right: "-60px", bottom: "10%" }} opacity={0.8} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <Title className={styles.title}>{title}</Title>
        <p className={styles.text}>
          {message ?? "The page you're looking for doesn't exist or has moved. Let's get you back to hashing."}
        </p>
        <div className={styles.actions}>
          <Button to={inDashboard ? "/dashboard" : "/"} variant="white" iconLeft="home">
            {inDashboard ? "Back to dashboard" : "Back to home"}
          </Button>
          <Button to="/contact" variant="ghost">
            Contact support
          </Button>
        </div>
        {!inDashboard && (
          <nav aria-label="Popular pages" className={styles.links}>
            {SUGGESTIONS.map((s) => (
              <Link key={s.to} to={s.to}>
                {s.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
