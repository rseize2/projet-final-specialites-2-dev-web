import React from "react";
import { useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";
import "./ImageLibraryEditor.css";

export default function ImageLibraryEditor({ onInsertImage }) {
  const images = useSelector((state) => state.images.images);

  const handleInsertImage = (image) => {
    if (onInsertImage) {
      onInsertImage(image.base64, image.nom);
    }
  };

  return (
    <div className="image-library-editor">
      <div className="image-library-section">
        <h3>Importer une image</h3>
        <ImageUpload />
      </div>

      {images.length > 0 && (
        <div className="image-library-section">
          <h3>Images disponibles</h3>
          <div className="image-library-grid">
            {images.map((image) => (
              <div key={image.id} className="image-library-card">
                <img src={image.base64} alt={image.nom} className="image-library-thumbnail" />
                <p className="image-library-name">{image.nom}</p>
                <button
                  className="image-library-insert-btn"
                  onClick={() => handleInsertImage(image)}
                  title="Insérer cette image dans le markdown"
                >
                  Insérer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="image-library-empty">
          <p>Aucune image importée pour le moment</p>
        </div>
      )}
    </div>
  );
}
