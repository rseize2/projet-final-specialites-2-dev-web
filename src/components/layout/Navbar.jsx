import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import "./Navbar.css";

function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <>
      <button
        className="navbar-toggle"
        onClick={() => setMenuOuvert(!menuOuvert)}
        aria-label="Ouvrir/Fermer le menu"
      >
        <BsLayoutTextSidebarReverse />
      </button>

      {menuOuvert && (
        <div
          className="navbar-overlay"
          onClick={() => setMenuOuvert(false)}
        />
      )}

      <nav className={`navbar ${menuOuvert ? "ouvert" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={() => setMenuOuvert(false)}
        >
          Arborescence
        </NavLink>

        <NavLink
          to="/editeur"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={() => setMenuOuvert(false)}
        >
          Éditeur
        </NavLink>

        <NavLink
          to="/previsualisation"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={() => setMenuOuvert(false)}
        >
          Prévisualisation
        </NavLink>

        <NavLink
          to="/bibliotheque"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={() => setMenuOuvert(false)}
        >
          Bibliothèque d’images
        </NavLink>
      </nav>
    </>
  );
}

export default Navbar;
