import { useState } from 'react';
import './Modale.css';
import { MdError } from "react-icons/md";

function ModaleRenommer({ nomActuel, onValider, onAnnuler }) {
    const [nom, setNom]             = useState(nomActuel);
    const [erreur, setErreur]       = useState(null);

    function gererSubmit(e) {
        e.preventDefault();
        if (nom.trim() && nom !== nomActuel) {
            try {
                onValider(nom.trim());
            } catch (error) {
                setErreur(error.message);
            }
        }
    }

    function gererChangementNom(e) {
        setNom(e.target.value);
        if (erreur) {
            setErreur(null);
        }
    }

    return (
        <div className="modale-overlay" onClick={onAnnuler}>
            <div className="modale" onClick={(e) => e.stopPropagation()}>
                <h2>Renommer</h2>
                {erreur && (
                    <div className="modale-erreur">
                        <MdError /> {erreur}
                    </div>
                )}
                <form className="modale-form" onSubmit={gererSubmit}>
                    <input
                        className       = "modale-input"
                        type            = "text"
                        placeholder     = "Nouveau nom..."
                        value           = {nom}
                        onChange        = {gererChangementNom}
                        autoFocus
                        required
                    />
                    <div className="modale-boutons">
                        <button type="button" className="modale-btn modale-btn-secondary" onClick={onAnnuler}>
                            Annuler
                        </button>
                        <button type="submit" className="modale-btn modale-btn-primary">
                            Renommer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModaleRenommer;