import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar" role="navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Arborescence
      </NavLink>

      <NavLink
        to="/editeur"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Éditeur
      </NavLink>

      <NavLink
        to="/previsualisation"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Prévisualisation
      </NavLink>

      <NavLink
        to="/bibliotheque"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Bibliothèque d'images
      </NavLink>

      <NavLink
        to="/blocs"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Gestionnaire de Blocs
      </NavLink>
    </nav>
  );
}

export default Navbar;
