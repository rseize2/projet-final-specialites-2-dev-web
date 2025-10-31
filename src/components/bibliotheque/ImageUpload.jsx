import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ajouterImage } from "../../store/slices/imageSlice";

export default function ImageUpload() {
  const dispatch = useDispatch();
  const zoneImport = useRef();
  const inputFichier = useRef();

  const lireFichier = (fichier) => {
    const lecteur = new FileReader();
    lecteur.onload = (e) => {
      const base64 = e.target.result;
      const nouvelleImage = {
        id: Date.now(),
        nom: fichier.name,
        base64: base64,
      };
      dispatch(ajouterImage(nouvelleImage));
    };
    lecteur.readAsDataURL(fichier);
  };

  const gererSelection = (e) => {
    const fichiers = Array.from(e.target.files);
    fichiers.forEach((f) => lireFichier(f));
  };

  const gererDepot = (e) => {
    e.preventDefault();
    const fichiers = Array.from(e.dataTransfer.files);
    fichiers.forEach((f) => lireFichier(f));
    zoneImport.current.classList.remove("survol");
  };

  const gererSurvol = (e) => {
    e.preventDefault();
    zoneImport.current.classList.add("survol");
  };

  const quitterSurvol = (e) => {
    e.preventDefault();
    zoneImport.current.classList.remove("survol");
  };

  const ouvrirExplorateur = () => {
    inputFichier.current.click();
  };

  return (
    <div
      ref={zoneImport}
      className="zone-import"
      onClick={ouvrirExplorateur}
      onDrop={gererDepot}
      onDragOver={gererSurvol}
      onDragLeave={quitterSurvol}
    >
      <p>Glissez-déposez vos images ici ou cliquez pour importer</p>
      <input
        ref={inputFichier}
        type="file"
        accept="image/*"
        multiple
        onChange={gererSelection}
        className="input-fichier"
      />
    </div>
  );
}
