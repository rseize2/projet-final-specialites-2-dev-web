// src/components/arborescence/Fichier.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renommer, supprimer, ouvrirFichier } from '../../store/slices/markdownSlice';
import { exporterFichier } from '../../utils/fileOperation';
import ModaleRenommer from '../modales/ModaleRenommer';
import './Fichier.css';
import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { BiRename } from "react-icons/bi";
import { IoLogoMarkdown } from "react-icons/io5";

function Fichier({ fichier }) {
    const dispatch                          = useDispatch();
    const [modaleOuverte, setModaleOuverte] = useState(false);
    const fichierOuvert                     = useSelector((store) => store.markdown.fichierOuvert);

    function gererOuverture() {
        dispatch(ouvrirFichier(fichier.id));
    }

    function gererRenommer(nouveauNom) {
        dispatch(renommer({ id: fichier.id, nouveauNom }));
        setModaleOuverte(false);
    }

    function gererSuppression() {
        if (confirm(`Supprimer le fichier "${fichier.nom}" ?`)) {
            dispatch(supprimer(fichier.id));
        }
    }

    function gererExport() {
        exporterFichier(fichier.nom, fichier.contenu || '');
    }

    function gererDragStart(e) {
        e.dataTransfer.setData('itemId', fichier.id);
        e.dataTransfer.setData('itemType', 'fichier');
    }

    const estOuvert = fichierOuvert === fichier.id;

    return (
        <li className={`fichier ${estOuvert ? 'fichier-actif' : ''}`} draggable onDragStart={gererDragStart}>
            <div className="fichier-content">
                <span className="fichier-icone"><IoLogoMarkdown /></span>
                <span className="fichier-nom" onClick={gererOuverture} title={fichier.nom}>
                    {fichier.nom}
                </span>
                <div className="fichier-actions">
                    <button className="btn-icon" onClick={() => setModaleOuverte(true)} title="Renommer"><FaPen /></button>
                    <button className="btn-icon" onClick={gererExport} title="Exporter"><CiExport /></button>
                    <button className="btn-icon" onClick={gererSuppression} title="Supprimer"><RiDeleteBin6Line /></button>
                </div>
            </div>

            {modaleOuverte && (
                <ModaleRenommer nomActuel={fichier.nom} onValider={gererRenommer} onAnnuler={() => setModaleOuverte(false)}/>
            )}
        </li>
    );
}

export default Fichier;