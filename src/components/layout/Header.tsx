import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { COMPANY_NAV, PRIMARY_NAV } from "../../lib/site";
import { cx } from "../../lib/cx";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const { pathname } = useLocation();
  const companyRef = useRef<HTMLLIElement>(null);
  const companyActive = COMPANY_NAV.some((l) => pathname.startsWith(l.to));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!companyOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!companyRef.current?.contains(e.target as Node)) setCompanyOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCompanyOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [companyOpen]);

  const close = () => {
    setMenuOpen(false);
    setCompanyOpen(false);
  };
  const solid = scrolled || menuOpen;

  return (
    <>
    <header className={cx(styles.header, solid && styles.solid)}>
      <div className={cx("container", styles.bar)}>
        <Logo tone={solid ? "dark" : "light"} onClick={close} />

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.links}>
            {PRIMARY_NAV.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => cx(styles.link, isActive && styles.active)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className={styles.dropdown} ref={companyRef}>
              <button
                type="button"
                className={cx(styles.link, styles.dropBtn, companyActive && styles.active)}
                aria-expanded={companyOpen}
                aria-haspopup="true"
                onClick={() => setCompanyOpen((o) => !o)}
              >
                Company <Icon name="chevron-down" size={16} className={cx(styles.caret, companyOpen && styles.caretOpen)} />
              </button>
              <div className={cx(styles.menu, companyOpen && styles.menuOpen)}>
                {COMPANY_NAV.map((l) => (
                  <NavLink key={l.to} to={l.to} className={({ isActive }) => cx(styles.menuItem, isActive && styles.menuActive)} onClick={close} tabIndex={companyOpen ? 0 : -1}>
                    <strong>{l.label}</strong>
                    <span>{l.description}</span>
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/login" className={cx(styles.link, styles.login)}>
            Log in
          </Link>
          <Button to="/signup" size="sm" variant={solid ? "primary" : "white"} className={styles.cta}>
            Start Your Journey
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      <div id="mobile-menu" className={cx(styles.mobile, menuOpen && styles.mobileOpen)} inert={!menuOpen}>
        <nav aria-label="Mobile" className={styles.mobileNav}>
          <NavLink to="/" end className={({ isActive }) => cx(styles.mobileLink, isActive && styles.mobileActive)} onClick={close}>
            Home
          </NavLink>
          {[...PRIMARY_NAV, ...COMPANY_NAV].map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => cx(styles.mobileLink, isActive && styles.mobileActive)} onClick={close}>
              {l.label}
              <Icon name="chevron-right" size={18} />
            </NavLink>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Button to="/login" variant="outline" block onClick={close}>
            Log in
          </Button>
          <Button to="/signup" block onClick={close}>
            Start Your Journey
          </Button>
        </div>
      </div>
    </>
  );
}
