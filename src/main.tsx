import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { PageLoader } from "./components/layout/PageLoader";
import { ToastProvider } from "./components/ui/ToastProvider";
import { router } from "./router";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <Suspense fallback={<PageLoader full />}>
        <RouterProvider router={router} />
      </Suspense>
    </ToastProvider>
  </StrictMode>,
);
