import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chargerArborescence, creerDossier, creerFichier, setDossierSelectionne, deplacer } from '../../store/slices/markdownSlice';
import { chargerArborescence as chargerDepuisStorage, sauvegarderArborescence } from '../../utils/localStorage';
import Dossier from './Dossier';
import Fichier from './Fichier';
import ModaleCreation from '../modales/ModaleCreation';
import ModaleImport from '../modales/ModaleImport';
import './Arborescence.css';
import { CiImport } from "react-icons/ci";
import { MdError } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Arborescence() {
    const dispatch                              = useDispatch();
    const arborescence                          = useSelector((store) => store.markdown.arborescence);
    const dossierSelectionne                    = useSelector((store) => store.markdown.dossierSelectionne);
    const [modaleOuverte, setModaleOuverte]     = useState(null);
    const [erreur, setErreur]                   = useState(null);
    const [dragOverRacine, setDragOverRacine]   = useState(false);

    useEffect(() => {
        const data = chargerDepuisStorage();
        dispatch(chargerArborescence(data));
    }, [dispatch]);

    useEffect(() => {
        const resultat = sauvegarderArborescence(arborescence);
        if (!resultat.success) {
            setErreur(resultat.error);
            setTimeout(() => setErreur(null), 5000);
        }
    }, [arborescence]);

    function gererCreation({ type, nom }) {
        const parentId = dossierSelectionne;
        if (type === 'dossier') {
            dispatch(creerDossier({ nom, parentId }));
        } else {
            dispatch(creerFichier({ nom, parentId }));
        }
        setModaleOuverte(null);
    }

    function gererDragOverRacine(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragOverRacine(true);
    }

    function gererDropRacine(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragOverRacine(false);

        const itemId = e.dataTransfer.getData('itemId');
        if (itemId) {
            try {
                dispatch(deplacer({ id: itemId, nouveauParentId: null }));
            } catch (error) {
                setErreur(error.message);
                setTimeout(() => setErreur(null), 3000);
            }
        }
    }

    function gererDragLeaveRacine() {
        setDragOverRacine(false);
    }

    function gererDragEndRacine() {
        setDragOverRacine(false);
    }

    function selectionnerDossier(dossierId) {
        dispatch(setDossierSelectionne(dossierId));
    }

    return (
        <div className="arborescence">
            <div className="arborescence-header">
                <h2>Fichiers</h2>
                <div className="arborescence-actions">
                    <button
                        className   = "btn-primary"
                        onClick     = {() => {
                            dispatch(setDossierSelectionne(null));
                            setModaleOuverte('creation');
                        }}
                        title       = "Nouveau fichier/dossier">
                        <IoCreateOutline /> Nouveau
                    </button>
                    <button
                        className   = "btn-primary"
                        onClick     = {() => setModaleOuverte('import')}
                        title       = "Importer un fichier">
                        <CiImport />
                    </button>
                </div>
            </div>

            {erreur && (
                <div className  ="arborescence-erreur">
                    <MdError /> {erreur}
                </div>
            )}

            {dossierSelectionne && (
                <div className="arborescence-selection">
                    <span>Dossier sélectionné</span>
                    <button
                        className   = "btn-deselect"
                        onClick     = {() => dispatch(setDossierSelectionne(null))}>
                        <IoClose />
                    </button>
                </div>
            )}

            <div
                className           = {`arborescence-zone-racine ${dragOverRacine ? 'drag-over-racine' : ''}`}
                onDragOver          = {gererDragOverRacine}
                onDragLeave         = {gererDragLeaveRacine}
                onDrop              = {gererDropRacine}
                onDragEnd           = {gererDragEndRacine}>
                <ul className="arborescence-liste">
                    {arborescence.map((item) =>
                        item.type === 'dossier' ? (
                            <Dossier
                                key             = {item.id}
                                dossier         = {item}
                                onSelectionner  = {selectionnerDossier}
                                estSelectionne  = {item.id === dossierSelectionne}/>
                        ) : (
                            <Fichier key={item.id} fichier={item} />
                        )
                    )}
                </ul>
            </div>

            {modaleOuverte === 'creation' && (
                <ModaleCreation
                    onValider       = {gererCreation}
                    onAnnuler       = {() => {
                        setModaleOuverte(null);
                        dispatch(setDossierSelectionne(null));
                }}/>
            )}

            {modaleOuverte === 'import' && (
                <ModaleImport onAnnuler={() => setModaleOuverte(null)} parentId={dossierSelectionne}/>
            )}
        </div>
    );
}

export default Arborescence;