import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isEditorActive = ["/", "/editeur", "/previsualisation"].includes(location.pathname);

  const editorMenuItems = [
    { path: "/", label: "Arborescence" },
    { path: "/editeur", label: "Éditeur" },
    { path: "/previsualisation", label: "Prévisualisation" },
  ];

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-dropdown">
        <button
          className={`navbar-link dropdown-toggle ${isEditorActive ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Éditeur
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            {editorMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

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
