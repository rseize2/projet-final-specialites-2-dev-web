import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Bibliotheque from "../components/bibliotheque/Bibliotheque";
import Editeur from "../components/editeur/Editeur";
import Previsualisation from "../components/previsualisation/Previsualisation";
import CustomBlocksManager from "../components/CustomBlocksManager/CustomBlocksManager";

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
        path: "editeur",
        element: <Editeur />,
      },
      {
        path: "previsualisation",
        element: <Previsualisation />,
      },
      {
        path: "bibliotheque",
        element: <Bibliotheque />,
      },
      {
        path: "blocs",
        element: <CustomBlocksManager />,
      },
    ],
  },
]);

export default router;
