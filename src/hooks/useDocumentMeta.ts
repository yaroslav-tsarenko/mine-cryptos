import { useEffect } from "react";
import { useLocation } from "react-router";
import { SITE } from "../lib/site";

type Meta = { title: string; description: string };

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Per-page <title>, description, canonical and social tags. */
export function useDocumentMeta({ title, description }: Meta) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title === SITE.name ? `${SITE.name} — Cloud Crypto Mining Made Simple` : `${title} | ${SITE.name}`;
    const url = `${SITE.url}${pathname}`;
    document.title = full;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", full);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
  }, [title, description, pathname]);
}
