import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Admin from "./components/Admin.jsx";
import AdminReviews from "./components/AdminReviews.jsx";
import AdminLogos from "./components/AdminLogos.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
