import { useState } from 'react';
import './Modale.css';
import { MdError } from "react-icons/md";

function ModaleCreation({ onValider, onAnnuler }) {
    const [type, setType]       = useState('fichier');
    const [nom, setNom]         = useState('');
    const [erreur, setErreur]   = useState(null);

    function gererSubmit(e) {
        e.preventDefault();
        if (nom.trim()) {
            try {
                onValider({ type, nom: nom.trim() });
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
                <h2>Créer un nouvel élément</h2>
                {erreur && (
                    <div className="modale-erreur">
                        <MdError /> {erreur}
                    </div>
                )}
                <form className="modale-form" onSubmit={gererSubmit}>
                    <div className="modale-radio-group">
                        <label className="modale-radio">
                            <input
                                type        = "radio"
                                value       = "fichier"
                                checked     = {type === 'fichier'}
                                onChange    = {(e) => setType(e.target.value)}
                            />
                            Fichier
                        </label>
                        <label className="modale-radio">
                            <input
                                type        = "radio"
                                value       = "dossier"
                                checked     = {type === 'dossier'}
                                onChange    = {(e) => setType(e.target.value)}/>
                            Dossier
                        </label>
                    </div>
                    <input
                        className           = "modale-input"
                        type                = "text"
                        placeholder         = "Nom..."
                        value               = {nom}
                        onChange            = {gererChangementNom}
                        autoFocus
                        required
                    />
                    <div className="modale-boutons">
                        <button 
                        type                = "button"
                        className           = "modale-btn modale-btn-secondary"
                        onClick             = {onAnnuler}>
                            Annuler
                        </button>
                        <button
                        type                = "submit"
                        className           = "modale-btn modale-btn-primary">
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModaleCreation;