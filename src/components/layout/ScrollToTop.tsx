import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";
import { prefersReducedMotion } from "../../hooks/useReducedMotion";

/** Scrolls to top on navigation, or to `#hash` targets once lazily-loaded content has rendered. */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const timer = window.setInterval(() => {
        const el = document.getElementById(id);
        tries += 1;
        if (el) {
          window.clearInterval(timer);
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 84;
          const top = el.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: prefersReducedMotion() ? "instant" : "smooth" });
          if (!el.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
            el.setAttribute("tabindex", "-1");
          }
          el.focus({ preventScroll: true });
        } else if (tries > 60) {
          window.clearInterval(timer);
        }
      }, 50);
      return () => window.clearInterval(timer);
    }
    if (navType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, key, navType]);

  return null;
}
