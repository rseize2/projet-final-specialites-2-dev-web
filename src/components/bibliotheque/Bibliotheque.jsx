import React, { useState } from "react";
import "./Bibliotheque.css";
import ImageUpload from "./ImageUpload";
import ImageItem from "./ImageItem";
import ImagePreview from "./ImagePreview";
import { useSelector, useDispatch } from "react-redux";
import { importerImages } from "../../store/slices/imageSlice";

export default function Bibliotheque() {
  const images = useSelector((state) => state.images.images);
  const dispatch = useDispatch();
  const [imageSelectionnee, setImageSelectionnee] = useState(null);

  const exporterImage = (image) => {
    const contenu = JSON.stringify(image);
    const blob = new Blob([contenu], { type: "application/json" });
    const lien = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    lien.download = `${image.nom.split(".")[0]}.img.mdl`;
    lien.click();
  };

  const exporterToutes = () => {
    const contenu = JSON.stringify(images);
    const blob = new Blob([contenu], { type: "application/json" });
    const lien = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    lien.download = "bibliotheque.imgs.mdlc";
    lien.click();
  };

  const importerDepuisFichier = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (event) => {
      try {
        const contenu = JSON.parse(event.target.result);
        if (Array.isArray(contenu)) {
          dispatch(importerImages(contenu));
        } else {
          dispatch(importerImages([contenu]));
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier importé !");
        console.error(err);
      }
    };
    lecteur.readAsText(fichier);
  };

  const ouvrirImage = (img) => setImageSelectionnee(img);
  const fermerImage = () => setImageSelectionnee(null);

  return (
    <div className="bibliotheque-conteneur">
      <div className="entete-bibliotheque">
        <h2>Bibliothèque d'images</h2>
        <div className="actions-bibliotheque">
          <button onClick={exporterToutes}>Exporter tout</button>

          <label className="bouton-import">
            Importer
            <input
              type="file"
              accept=".img.mdl,.imgs.mdlc"
              onChange={importerDepuisFichier}
              style={{ display: "none" }}
            />
          </label>

          <button
            className="bouton-vider"
            onClick={() => {
              if (confirm("Voulez-vous vraiment vider la bibliothèque ?")) {
                dispatch({ type: "images/viderBibliotheque" });
              }
            }}>
            Vider la bibliothèque
          </button>
        </div>
      </div>

      <ImageUpload />

      <div className="grille-images">
        {images.length === 0 ? (
          <p className="texte-vide">Aucune image importée</p>
        ) : (
          images.map((img) => (
            <div
              key={img.id}
              className="bloc-image"
              onClick={() => ouvrirImage(img)}>
              <ImageItem image={img} />
              <button
                className="bouton-export"
                onClick={(e) => {
                  e.stopPropagation();
                  exporterImage(img);
                }}>
                Exporter
              </button>
            </div>
          ))
        )}
      </div>

      <ImagePreview image={imageSelectionnee} onFermer={fermerImage} />
    </div>
  );
}
