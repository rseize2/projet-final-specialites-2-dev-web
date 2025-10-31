import { useState } from "react";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import Arborescence from "../arborescence/Arborescence";
import Navbar from "../layout/Navbar";
import "./Layout.css";

function Layout() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false);

  return (
    <div className="layout">
      <Navbar />

      <div className="layout-body">
        <header className="header-mobile">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOuverte(!sidebarOuverte)}
            aria-label="Ouvrir/Fermer la sidebar"
          >
            <BsLayoutTextSidebarReverse />
          </button>
        </header>

        {sidebarOuverte && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOuverte(false)}
          />
        )}

        <aside className={`sidebar ${sidebarOuverte ? "ouverte" : ""}`}>
          <Arborescence />
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
