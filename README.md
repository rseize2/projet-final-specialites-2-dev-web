# Éditeur Markdown avec Blocs Personnalisés

## Auteurs

Ce projet a été réalisé par :
- Enzo FEBBRARO
- Mika GREUZARD
- Riyesan AMALATHAS

---

## Description du Projet

Application web complète permettant de gérer la rédaction de documents internes au format Markdown avec trois fonctionnalités principales :

1. **Gestion des fichiers Markdown** - Organisation hiérarchique en arborescence, création, modification, suppression et renommage de fichiers et dossiers

2. **Blocs personnalisés réutilisables** - Création de blocs HTML/Markdown qui peuvent être insérés automatiquement dans les fichiers, avec gestion d'une bibliothèque centralisée

3. **Bibliothèque d'images** - Import d'images stockées en base64, gestion complète et insertion facile dans les documents

---

## Fonctionnalités

### Fichiers Markdown
- Organisation en arborescence (dossiers et fichiers)
- Création, suppression et renommage de dossiers
- Création, suppression et renommage de fichiers
- Déplacement par drag and drop
- Rédaction de contenu Markdown
- Prévisualisation en temps réel (conversion HTML)
- Export et import de fichiers (.md)
- Sauvegarde automatique toutes les 500ms

### Blocs Personnalisés
- Création de blocs en HTML/Markdown
- Modification, suppression et renommage de blocs
- Bibliothèque centralisée et consultable
- Insertion automatique des blocs dans l'éditeur
- Export et import de blocs (.part.mdlc et .parts.mdlc)

### Bibliothèque d'Images
- Import d'images (bouton ou drag and drop)
- Conversion automatique en base64
- Prévisualisation des images
- Renommage et suppression d'images
- Insertion facile dans l'éditeur
- Export et import d'images (.img.mdlc et .imgs.mdlc)

---

## Stack Technique

- React 18+
- React Router v7 (routage et navigation)
- Redux et Redux Toolkit (gestion d'état global)
- Marked.js (conversion Markdown en HTML)
- localStorage (persistance des données)
- CSS personnalisé (styling responsive)

---

## Installation et Démarrage

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrage en mode développement
```bash
npm run dev
```

Ouvrez http://localhost:5173 dans votre navigateur.

### 3. Build pour production
```bash
npm run build
```

---

## Structure du Projet

```
src/
├── components/
│   ├── arborescence/
│   ├── editeur/
│   ├── layout/
│   ├── bibliotheque/
│   └── CustomBlocksManager/
├── redux/
├── router/
├── App.jsx
└── main.jsx
```

---

## Navigation

- Accueil - Arborescence et gestion des fichiers
- Éditeur - Rédaction de contenu Markdown
- Prévisualisation - Aperçu HTML du contenu
- Bibliothèque - Gestion des images
- Gestionnaire de Blocs - Création et gestion des blocs

---

## Persistance des Données

Toutes les données sont sauvegardées dans le localStorage du navigateur :
- Arborescence des fichiers
- Contenu des fichiers Markdown
- Images stockées en base64
- Blocs personnalisés

L'application ne nécessite aucun serveur pour fonctionner.

