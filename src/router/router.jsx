import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Bibliotheque from "../components/bibliotheque/Bibliotheque";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "bibliotheque",
        element: <Bibliotheque />,
      },
    ],
  },
]);

export default router;
