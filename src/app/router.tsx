// app/router.tsx

import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Departures from "../pages/Departures";
import Community from "../pages/Community";
import Contribute from "../pages/Contribute";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "departures",
        element: <Departures />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "add",
        element: <Contribute />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);