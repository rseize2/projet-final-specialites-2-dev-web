import { useState } from 'react';
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import Arborescence from '../arborescence/Arborescence';
import Editeur from '../editeur/Editeur';
import './Layout.css';

function Layout() {
    const [sidebarOuverte, setSidebarOuverte] = useState(false);

    return (
        <div className="layout">
            <header className="header-mobile">
                <button
                    className   = "sidebar-toggle"
                    onClick     = {() => setSidebarOuverte(!sidebarOuverte)}
                    aria-label  = "Ouvrir/Fermer la sidebar">
                    <BsLayoutTextSidebarReverse />
                </button>
            </header>

            {sidebarOuverte && (
                <div
                    className   = "sidebar-overlay"
                    onClick     = {() => setSidebarOuverte(false)}
                />
            )}

            <aside className={`sidebar ${sidebarOuverte ? 'ouverte' : ''}`}>
                <Arborescence />
            </aside>

            <main className="main-content">
                <Editeur />
            </main>
        </div>
    );
}

export default Layout;