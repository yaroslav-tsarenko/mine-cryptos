import { Link } from "react-router";
import { FOOTER_NAV, LEGAL_NAV, SITE, SOCIALS } from "../../lib/site";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import { NewsletterCard } from "./NewsletterCard";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <NewsletterCard />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p>
            At MineCryptos, we're committed to providing you with top-tier cryptocurrency mining solutions, exceptional service, and the
            resources you need to thrive in the ever-changing world of digital finance.
          </p>
          <ul className={styles.socials} aria-label="Social media">
            {SOCIALS.map((s) => (
              <li key={s.icon}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}>
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {FOOTER_NAV.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className={styles.col}>
          <h3>Contact</h3>
          <ul>
            <li>
              <Link to="/contact" className={styles.contactLink}>
                <Icon name="mail" size={16} /> {SITE.email}
              </Link>
            </li>
            <li>
              <Link to="/contact#office" className={styles.contactLink}>
                <Icon name="map-pin" size={16} /> London, UK
              </Link>
            </li>
            <li>
              <Link to="/contact#chat" className={styles.contactLink}>
                <Icon name="clock" size={16} /> Support 24/7
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <nav aria-label="Legal" className={styles.legal}>
          {LEGAL_NAV.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p>Copyright © {year} MineCryptos. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
