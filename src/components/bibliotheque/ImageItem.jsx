import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { supprimerImage, renommerImage } from "../../store/slices/imageSlice";

export default function ImageItem({ image }) {
  const dispatch = useDispatch();

  const [enEdition, setEnEdition] = useState(false);
  const [nouveauNom, setNouveauNom] = useState(image.nom);

  const validerRenommage = (e) => {
    e.stopPropagation();
    if (nouveauNom.trim() === "") return;
    dispatch(renommerImage({ id: image.id, nouveauNom }));
    setEnEdition(false);
  };

  return (
    <div className="carte-image">
      <img src={image.base64} alt={image.nom} className="miniature" />

      {enEdition ? (
        <div
          className="zone-renommage"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={nouveauNom}
            onChange={(e) => setNouveauNom(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Enter" && validerRenommage(e)}
            className="champ-renommage"
          />
          <button onClick={validerRenommage} className="bouton-valider">
            Valider
          </button>
        </div>
      ) : (
        <>
          <p className="nom-image">{image.nom}</p>
          <button
            className="bouton-renommer"
            onClick={(e) => {
              e.stopPropagation();
              setEnEdition(true);
            }}
          >
            Renommer
          </button>
          <button
            className="bouton-supprimer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(supprimerImage(image.id));
            }}
          >
            Supprimer
          </button>
        </>
      )}
    </div>
  );
}
