import { Suspense } from "react";
import { Outlet } from "react-router";
import { SupportChat } from "../widgets/SupportChat";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageLoader } from "./PageLoader";

export function SiteLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <SupportChat />
    </>
  );
}
