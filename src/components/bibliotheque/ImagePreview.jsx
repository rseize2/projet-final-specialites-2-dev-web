import React from "react";
import "./ImagePreview.css";

export default function ImagePreview({ image, onFermer }) {
  if (!image) return null;

  return (
    <div className="modale-fond" onClick={onFermer}>
      <div className="modale-contenu" onClick={(e) => e.stopPropagation()}>
        <img src={image.base64} alt={image.nom} />
        <p>{image.nom}</p>
        <button onClick={onFermer} className="bouton-fermer">Fermer</button>
      </div>
    </div>
  );
}
