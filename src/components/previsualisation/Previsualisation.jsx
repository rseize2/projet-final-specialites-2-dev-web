import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import './Previsualisation.css';
import { FaPen } from "react-icons/fa";

function Previsualisation() {
    const navigate          = useNavigate();
    const fichierOuvert     = useSelector((store) => store.markdown.fichierOuvert);
    const contenu           = useSelector((store) => store.markdown.contenuFichierOuvert);

    if (!fichierOuvert) {
        return (
            <div className="centered">
                <p>Aucun fichier ouvert</p>
                <button onClick={() => navigate('/')}>Retour à l'arborescence</button>
            </div>
        );
    }

    const htmlContent = marked(contenu || '');

    return (
        <div className="container">
            <div className="header">
                <h1>Prévisualisation</h1>
                <button className="bouton" onClick={() => navigate('/editeur')}>
                    <FaPen /> Retour à l'éditeur
                </button>
            </div>

            <div
                className               ="preview"
                dangerouslySetInnerHTML ={{ __html: htmlContent }}
            />
        </div>
    );
}

export default Previsualisation;
