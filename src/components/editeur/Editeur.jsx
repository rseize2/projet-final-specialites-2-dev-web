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

function Editeur() {
    const dispatch                          = useDispatch();
    const fichierOuvert                     = useSelector((store) => store.markdown.fichierOuvert);
    const contenu                           = useSelector((store) => store.markdown.contenuFichierOuvert);
    const arborescence                      = useSelector((store) => store.markdown.arborescence);
    const sauvegardeEnCours                 = useSelector((store) => store.markdown.sauvegardeEnCours);
    const [ongletActif, setOngletActif]     = useState('markdown');
    const [cheminFichier, setCheminFichier] = useState('');
    const [timeoutId, setTimeoutId]         = useState(null);

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
                    onClick     = {() => setOngletActif('markdown')}>
                    <RiMarkdownLine /> Markdown
                </button>
                <button
                    className   = {`editeur-tab ${ongletActif === 'preview' ? 'tab-actif' : ''}`}
                    onClick     = {() => setOngletActif('preview')}>
                    <MdOutlinePreview /> Prévisualisation
                </button>
            </div>

            <div className="editeur-content">
                {ongletActif === 'markdown' ? (
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
