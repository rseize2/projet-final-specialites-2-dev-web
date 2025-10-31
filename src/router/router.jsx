import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Bibliotheque from "../components/bibliotheque/Bibliotheque";
import Editeur from "../components/editeur/Editeur";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Editeur />,
      },
      {
        path: "bibliotheque",
        element: <Bibliotheque />,
      },
    ],
  },
]);

export default router;
