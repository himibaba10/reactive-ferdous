import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Admin from "./components/Admin.jsx";
import AdminReviews from "./components/AdminReviews.jsx";
import AdminLogos from "./components/AdminLogos.jsx";
import AdminDesigns from "./components/AdminDesigns.jsx";
import "./index.css";

import Home from "./pages/Home.jsx";
import WebDevelopment from "./pages/WebDevelopment.jsx";
import GraphicDesign from "./pages/GraphicDesign.jsx";
import FigmaDesign from "./pages/FigmaDesign.jsx";
import LogoDesign from "./pages/LogoDesign.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services/web-development",
        element: <WebDevelopment />,
      },
      {
        path: "/services/graphic-design",
        element: <GraphicDesign />,
      },
      {
        path: "/services/figma-design",
        element: <FigmaDesign />,
      },
      {
        path: "/services/logo-design",
        element: <LogoDesign />,
      },
    ]
  },
  {
    path: "/admin/add-project",
    element: <Admin />,
  },
  {
    path: "/admin/add-reviews",
    element: <AdminReviews />,
  },
  {
    path: "/admin/add-logo",
    element: <AdminLogos />,
  },
  {
    path: "/admin/add-design",
    element: <AdminDesigns />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
