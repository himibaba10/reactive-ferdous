import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

/** Map default-export pages to React Router's route.lazy shape */
const lazyPage = (importer) => async () => {
  const mod = await importer();
  return { Component: mod.default };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services/web-development",
        lazy: lazyPage(() => import("./pages/WebDevelopment.jsx")),
      },
      {
        path: "services/graphic-design",
        lazy: lazyPage(() => import("./pages/GraphicDesign.jsx")),
      },
      {
        path: "services/figma-design",
        lazy: lazyPage(() => import("./pages/FigmaDesign.jsx")),
      },
      {
        path: "services/logo-design",
        lazy: lazyPage(() => import("./pages/LogoDesign.jsx")),
      },
    ],
  },
  {
    path: "/dashboard/himibaba10",
    lazy: lazyPage(() => import("./pages/Dashboard.jsx")),
  },
  {
    path: "/admin/add-project",
    lazy: lazyPage(() => import("./components/Admin.jsx")),
  },
  {
    path: "/admin/add-reviews",
    lazy: lazyPage(() => import("./components/AdminReviews.jsx")),
  },
  {
    path: "/admin/add-logo",
    lazy: lazyPage(() => import("./components/AdminLogos.jsx")),
  },
  {
    path: "/admin/add-design",
    lazy: lazyPage(() => import("./components/AdminDesigns.jsx")),
  },
  {
    path: "/admin/add-logo-portfolio",
    lazy: lazyPage(() => import("./components/AdminLogoPortfolio.jsx")),
  },
  {
    path: "/admin/add-graphic-portfolio",
    lazy: lazyPage(() => import("./components/AdminGraphicPortfolio.jsx")),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
