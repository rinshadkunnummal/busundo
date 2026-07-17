// app/router.tsx

import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Departures from "../pages/Departures";
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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);