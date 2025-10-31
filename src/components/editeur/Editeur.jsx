import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mettreAJourContenu, setSauvegardeEnCours } from '../../store/slices/markdownSlice';
import { sauvegarderArborescence } from '../../utils/localStorage';
import { marked } from 'marked';
import './Editeur.css';
import { FaRegFolderOpen } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { RiMarkdownLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { MdImage } from "react-icons/md";
import CustomBlocksManager from '../CustomBlocksManager/CustomBlocksManager';
import ImageLibraryEditor from '../bibliotheque/ImageLibraryEditor';
import { useRef } from 'react';

function Editeur() {
    const dispatch                          = useDispatch();
    const fichierOuvert                     = useSelector((store) => store.markdown.fichierOuvert);
    const contenu                           = useSelector((store) => store.markdown.contenuFichierOuvert);
    const arborescence                      = useSelector((store) => store.markdown.arborescence);
    const sauvegardeEnCours                 = useSelector((store) => store.markdown.sauvegardeEnCours);
    const [ongletActif, setOngletActif]     = useState('markdown');
    const [cheminFichier, setCheminFichier] = useState('');
    const [timeoutId, setTimeoutId]         = useState(null);
    const [afficherBlocsPanel, setAfficherBlocsPanel] = useState(false);
    const [afficherImagesPanel, setAfficherImagesPanel] = useState(false);

    const obtenirCheminComplet = useCallback((fichierOuvert, arborescence) => {
        if (!fichierOuvert) return '';

        const chemin    = [];
        let trouve      = false;

        const rechercherChemin = (items, path = []) => {
            for (let item of items) {
                if (item.id === fichierOuvert) {
                    chemin.push(...path, item.nom);
                    trouve = true;
                    return;
                }
                if (item.type === 'dossier' && item.enfants) {
                    rechercherChemin(item.enfants, [...path, item.nom]);
                    if (trouve) return;
                }
            }
        };

        rechercherChemin(arborescence);
        return chemin.join(' > ');
    }, []);

    useEffect(() => {
        if (fichierOuvert) {
            const chemin = obtenirCheminComplet(fichierOuvert, arborescence);
            setCheminFichier(chemin);
        }
    }, [fichierOuvert, arborescence, obtenirCheminComplet]);

    function gererChangement(e) {
        dispatch(mettreAJourContenu(e.target.value));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        dispatch(setSauvegardeEnCours(true));

        const newTimeoutId = setTimeout(() => {
            sauvegarderArborescence(arborescence);
            dispatch(setSauvegardeEnCours(false));
        }, 500);

        setTimeoutId(newTimeoutId);
    }

    const insererBloc = (markdownBloc) => {
        const contenuActuel = contenu || '';
        const nouveauContenu = contenuActuel + '\n\n' + markdownBloc;
        dispatch(mettreAJourContenu(nouveauContenu));
        setAfficherBlocsPanel(false);
    }

    const insererImage = (imageBase64, nomImage) => {
        const contenuActuel = contenu || '';
        const markdownImage = `![${nomImage}](${imageBase64})`;
        const nouveauContenu = contenuActuel + '\n\n' + markdownImage;
        dispatch(mettreAJourContenu(nouveauContenu));
    }

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    if (!fichierOuvert) {
        return (
            <div className="editeur-vide">
                <p>Aucun fichier ouvert</p>
                <p className="editeur-vide-sub">Sélectionnez un fichier dans la barre latérale</p>
            </div>
        );
    }

    const htmlContent = marked(contenu || '');

    return (
        <div className="editeur">
            <div className="editeur-header">
                <div className="editeur-chemin" title={cheminFichier}>
                    <FaRegFolderOpen /> {cheminFichier}
                </div>
                <div className="editeur-sauvegarde">
                    {sauvegardeEnCours ? (
                        <span className="sauvegarde-en-cours">Sauvegarde...</span>
                    ) : (
                        <span className="sauvegarde-ok"><GrValidate /> Sauvegardé</span>
                    )}
                </div>
            </div>

            <div className="editeur-tabs">
                <button
                    className   = {`editeur-tab ${ongletActif === 'markdown' ? 'tab-actif' : ''}`}
                    onClick     = {() => {setOngletActif('markdown'); setAfficherBlocsPanel(false); setAfficherImagesPanel(false);}}>
                    <RiMarkdownLine /> Markdown
                </button>
                <button
                    className   = {`editeur-tab ${ongletActif === 'preview' ? 'tab-actif' : ''}`}
                    onClick     = {() => {setOngletActif('preview'); setAfficherBlocsPanel(false); setAfficherImagesPanel(false);}}>
                    <MdOutlinePreview /> Prévisualisation
                </button>
                <button
                    className   = "editeur-tab"
                    onClick     = {() => {setAfficherImagesPanel(!afficherImagesPanel); setAfficherBlocsPanel(false);}}
                    title       = "Ajouter des images">
                    <MdImage /> Images
                </button>
                <button
                    className   = "editeur-tab"
                    onClick     = {() => {setAfficherBlocsPanel(!afficherBlocsPanel); setAfficherImagesPanel(false);}}
                    title       = "Insérer des blocs prédéfinis">
                    <FiBook /> Blocs
                </button>
            </div>

            <div className="editeur-content">
                {afficherImagesPanel ? (
                    <ImageLibraryEditor onInsertImage={insererImage} />
                ) : afficherBlocsPanel ? (
                    <div className="editeur-blocs-panel">
                        <CustomBlocksManager onInsertBlock={insererBloc} />
                    </div>
                ) : ongletActif === 'markdown' ? (
                    <textarea
                        className       = "editeur-textarea"
                        value           = {contenu}
                        onChange        = {gererChangement}
                        placeholder     = "Écrivez votre contenu Markdown ici..."/>
                ) : (
                    <div className="editeur-preview" dangerouslySetInnerHTML={{ __html: htmlContent }}/>
                )}
            </div>
        </div>
    );
}

export default Editeur;
