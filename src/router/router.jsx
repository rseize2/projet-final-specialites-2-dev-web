import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Bibliotheque from "../components/bibliotheque/Bibliotheque";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "bibliotheque",
        element: <Bibliotheque />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
