import { createSlice } from "@reduxjs/toolkit";

// Permet de charger depus le localstorage
const chargerDepuisStockage = () => {
  try {
    const donnees = localStorage.getItem("bibliotheque_images");
    return donnees ? JSON.parse(donnees) : [];
  } catch (e) {
    console.error("Erreur de lecture du stockage local :", e);
    return [];
  }
};

// Sauvegarder dans le localstorage
const sauvegarderDansStockage = (images) => {
  try {
    localStorage.setItem("bibliotheque_images", JSON.stringify(images));
  } catch (e) {
    console.error("Erreur de sauvegarde du stockage local :", e);
  }
};

const etatInitial = {
  images: chargerDepuisStockage(),
};

const imageSlice = createSlice({
  name: "images",
  initialState: etatInitial,
  reducers: {
    ajouterImage: (state, action) => {
      state.images.push(action.payload);
      sauvegarderDansStockage(state.images);
    },
    supprimerImage: (state, action) => {
      state.images = state.images.filter(img => img.id !== action.payload);
      sauvegarderDansStockage(state.images);
    },
    renommerImage: (state, action) => {
      const { id, nouveauNom } = action.payload;
      const image = state.images.find(img => img.id === id);
      if (image) image.nom = nouveauNom;
      sauvegarderDansStockage(state.images);
    },
    importerImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
      sauvegarderDansStockage(state.images);
    },
    viderBibliotheque: (state) => {
      state.images = [];
      sauvegarderDansStockage(state.images);
    },
  },
});

export const {
  ajouterImage,
  supprimerImage,
  renommerImage,
  importerImages,
  viderBibliotheque,
} = imageSlice.actions;

export default imageSlice.reducer;
