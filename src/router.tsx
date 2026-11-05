import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouteError } from "./components/layout/RouteError";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SiteLayout } from "./components/layout/SiteLayout";

const Home = lazy(() => import("./pages/Home"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Plans = lazy(() => import("./pages/Plans"));
const PlanDetail = lazy(() => import("./pages/PlanDetail"));
const Calculator = lazy(() => import("./pages/Calculator"));
const DataCenters = lazy(() => import("./pages/DataCenters"));
const Markets = lazy(() => import("./pages/Markets"));
const Referral = lazy(() => import("./pages/Referral"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Workers = lazy(() => import("./pages/dashboard/Workers"));
const Payouts = lazy(() => import("./pages/dashboard/Payouts"));
const DashboardReferrals = lazy(() => import("./pages/dashboard/Referrals"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));

function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <RouteError />,
    children: [
      {
        element: <SiteLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "how-it-works", element: <HowItWorks /> },
          { path: "plans", element: <Plans /> },
          { path: "plans/:slug", element: <PlanDetail /> },
          { path: "calculator", element: <Calculator /> },
          { path: "data-centers", element: <DataCenters /> },
          { path: "markets", element: <Markets /> },
          { path: "referral", element: <Referral /> },
          { path: "about", element: <About /> },
          { path: "blog", element: <Blog /> },
          { path: "blog/:slug", element: <BlogPost /> },
          { path: "faq", element: <Faq /> },
          { path: "contact", element: <Contact /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "privacy", element: <Privacy /> },
          { path: "terms", element: <Terms /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Overview /> },
          { path: "workers", element: <Workers /> },
          { path: "payouts", element: <Payouts /> },
          { path: "referrals", element: <DashboardReferrals /> },
          { path: "settings", element: <Settings /> },
          { path: "*", element: <NotFound inDashboard /> },
        ],
      },
    ],
  },
]);
