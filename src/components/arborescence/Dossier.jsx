import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { creerDossier, creerFichier, renommer, supprimer, deplacer } from '../../store/slices/markdownSlice';
import Fichier from './Fichier';
import ModaleCreation from '../modales/ModaleCreation';
import ModaleRenommer from '../modales/ModaleRenommer';
import './Dossier.css';
import { FaFolderClosed } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdError } from "react-icons/md";

function Dossier({ dossier, onSelectionner, estSelectionne }) {
    const dispatch                          = useDispatch();
    const [deplie, setDeplie]               = useState(false);
    const [modaleOuverte, setModaleOuverte] = useState(null);
    const [survolDrop, setSurvolDrop]       = useState(false);
    const [erreur, setErreur]               = useState(null);

    function gererCreation({ type, nom }) {
        try {
            if (type === 'dossier') {
                dispatch(creerDossier({ nom, parentId: dossier.id }));
            } else {
                dispatch(creerFichier({ nom, parentId: dossier.id }));
            }
            setModaleOuverte(null);
            setErreur(null);
        } catch (error) {
            setErreur(error.message);
            setTimeout(() => setErreur(null), 3000);
        }
    }

    function gererRenommer(nouveauNom) {
        try {
            dispatch(renommer({ id: dossier.id, nouveauNom }));
            setModaleOuverte(null);
            setErreur(null);
        } catch (error) {
            setErreur(error.message);
            setTimeout(() => setErreur(null), 3000);
        }
    }

    function gererSuppression() {
        if (confirm(`Supprimer le dossier "${dossier.nom}" et tout son contenu ?`)) {
            dispatch(supprimer(dossier.id));
        }
    }

    function gererDragStart(e) {
        e.dataTransfer.setData('itemId', dossier.id);
        e.dataTransfer.setData('itemType', 'dossier');
    }

    function gererDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        setSurvolDrop(true);
    }

    function gererDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setSurvolDrop(false);

        const itemId = e.dataTransfer.getData('itemId');
        if (itemId && itemId !== dossier.id) {
            try {
                dispatch(deplacer({ id: itemId, nouveauParentId: dossier.id }));
                setErreur(null);
            } catch (error) {
                setErreur(error.message);
                setTimeout(() => setErreur(null), 3000);
            }
        }
    }

    function gererClicDossier(e) {
        if (e.target.closest('.dossier-actions')) {
            return;
        }
        setDeplie(!deplie);
    }

    return (
        <li className="dossier">
            <div
                className           = {`dossier-header ${survolDrop ? 'drag-over' : ''} ${estSelectionne ? 'dossier-selectionne' : ''}`}
                draggable
                onDragStart         = {gererDragStart}
                onDragOver          = {gererDragOver}
                onDragLeave         = {() => setSurvolDrop(false)}
                onDrop              = {gererDrop}
                onClick             = {gererClicDossier}>
                <span className="dossier-icone">
                    {deplie ? <FaFolderOpen /> : <FaFolderClosed />}
                </span>
                <span className="dossier-nom">
                    {dossier.nom}
                </span>
                <div className="dossier-actions">
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setModaleOuverte('creation'); }} title="Nouveau"><IoMdAdd /></button>
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setModaleOuverte('renommer'); }} title="Renommer"><FaPen /></button>
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); gererSuppression(); }} title="Supprimer"><RiDeleteBin6Line /></button>
                </div>
            </div>

            {erreur && (
                <div className="dossier-erreur">
                    <MdError /> {erreur}
                </div>
            )}

            {deplie && dossier.enfants && dossier.enfants.length > 0 && (
                <ul className="dossier-enfants">
                    {dossier.enfants.map((item) =>
                        item.type === 'dossier' ? (
                            <Dossier
                                key             = {item.id}
                                dossier         = {item}
                                onSelectionner  = {onSelectionner}
                                estSelectionne  = {item.id === estSelectionne}
                            />
                        ) : (
                            <Fichier key={item.id} fichier={item} />
                        )
                    )}
                </ul>
            )}

            {modaleOuverte === 'creation' && (
                <ModaleCreation onValider={gererCreation} onAnnuler={() => setModaleOuverte(null)}/>
            )}

            {modaleOuverte === 'renommer' && (
                <ModaleRenommer nomActuel={dossier.nom} onValider={gererRenommer} onAnnuler={() => setModaleOuverte(null)}/>
            )}
        </li>
    );
}

export default Dossier;