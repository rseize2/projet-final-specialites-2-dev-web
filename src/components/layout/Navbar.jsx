import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import "./Navbar.css";

function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOuvert(false);
      }
    };

    if (menuOuvert) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [menuOuvert]);

  const handleNavLinkClick = () => {
    setMenuOuvert(false);
  };

  return (
    <>
      <button
        className="navbar-toggle"
        onClick={() => setMenuOuvert(!menuOuvert)}
        aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOuvert}
      >
        {menuOuvert ? <MdClose /> : <GiHamburgerMenu />}
      </button>

      {menuOuvert && (
        <div
          className="navbar-overlay"
          onClick={() => setMenuOuvert(false)}
          role="presentation"
        />
      )}

      <nav className={`navbar ${menuOuvert ? "ouvert" : ""}`} role="navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={handleNavLinkClick}
        >
          Arborescence
        </NavLink>

        <NavLink
          to="/editeur"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={handleNavLinkClick}
        >
          Éditeur
        </NavLink>

        <NavLink
          to="/previsualisation"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={handleNavLinkClick}
        >
          Prévisualisation
        </NavLink>

        <NavLink
          to="/bibliotheque"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
          onClick={handleNavLinkClick}
        >
          Bibliothèque d'images
        </NavLink>
      </nav>
    </>
  );
}

export default Navbar;
