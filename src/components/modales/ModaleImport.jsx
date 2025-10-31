import { useDispatch } from 'react-redux';
import { importerFichier } from '../../store/slices/markdownSlice';
import { lireFichier } from '../../utils/fileOperation';
import { useState } from 'react';
import './Modale.css';
import { MdError } from "react-icons/md";

function ModaleImport({ onAnnuler, parentId }) {
    const dispatch              = useDispatch();
    const [erreur, setErreur]   = useState(null);

    async function gererImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const contenu = await lireFichier(file);
            dispatch(importerFichier({
                nom: file.name,
                contenu,
                parentId: parentId || null,
            }));
            alert('Fichier importé avec succès !');
            onAnnuler();
        } catch (error) {
            setErreur(error.message || "Erreur lors de l'import du fichier");
            setTimeout(() => setErreur(null), 3000);
        }
    }

    return (
        <div className="modale-overlay" onClick={onAnnuler}>
            <div className="modale" onClick={(e) => e.stopPropagation()}>
                <h2>Importer un fichier Markdown</h2>
                {erreur && (
                    <div className="modale-erreur">
                        <MdError /> {erreur}
                    </div>
                )}
                <div className="modale-form">
                    <input
                        className           = "modale-input"
                        type                = "file"
                        accept              = ".md"
                        onChange            = {gererImport}
                    />
                    <div className="modale-boutons">
                        <button
                        type                = "button"
                        className           = "modale-btn modale-btn-secondary"
                        onClick             = {onAnnuler}>
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModaleImport;