# Projet Final - Cours de spécialité Dev Web

## Membres du groupe
- Mika Greuzard
- Enzo Febbraro
- Riyesan Amalathas

## Fonctionnalités faites

### Gestion de l'arborescence
- Création de dossier à la racine ou dans un autre dossier
- Renommer les dossier
- Suppréssion de dossiers avec confirmation
- Déplacement des dossier en drag et drop (dans un autre dossier ou racine)
- Affichage de l'arborescense en mode hiérarchie
- Tri automatique : dossiers d'abord puis ordre alphabétique
- Indication du dossier selectioné
- Gestion des erreurs avec messages clair

### Gestion des fichiers Markdown
- Création de fichier .md à la racine ou dans un dossier
- Renommage de fichiers possible
- Suppression de fichier après confirmation
- Ouverture de fichier pour l'édité
- Déplacement des fichier en drag et drop
- L'extension .md s'ajoute auto si on le met pas
- Indication du fichier ouvert

### Rédaction Markdown
- Editeur de text avec la syntaxe markdown
- Sauvegarde auto
- Affiche le statut de sauvegarde (en cours / sauvegardé)
- Chemin complet du fichier affiché en haut de l'éditeur

### Prévisualisation
- Onglet de preview direct dans l'appli
- Conversion Markdown
- Styles pour tous les éléments markdown :
  - Titres
  - Paragraphes
  - Listes
  - Citations
  - Code inline et blocs
  - Liens
  - Images
  - Tableaux
- Switch entre mode édition et preview

### Import / Export
- Export de fichier en .md
- Import de fichier .md depuis l'ordi
- Possible importer à la racine ou dans un dossier choisi
- Contenue gardé correctement lors d'import (pas de mauvaise conversion)

### Stockage
- Sauvegarde auto dans LocalStorage
- Chargement auto au démarrage
- Gestion limite stockage (4MB)
- Message erreur si trop plein

### Validation et Sécurité
- Nom max 100 caractère
- Pas de caractère spéciau, c'est interdit
- Détection doublon de nom
- Empêche déplacement circulaire

### Interface
- Interface responsive (mobile, tablette, pc)
- React Icons
- Animations fluides
- Drag et drop visuel clair
- Modales pour créer/modifier

### Expérience utilisateur
- Navigation simple dans l'arborescence
- Dossiers ouvrable et fermable
- Actions rapide au survol (rename, delete, export)

## Techno utilisées
- React
- Redux
- React Router
- Marked (conversion Markdown)
- React Icons

## Structure du projet et répartition des responsabilités
```
src/
├── components/
│   ├── arborescence/    # Gestion de l'arborescence
│   ├── editeur/         # Éditeur Markdown
│   ├── layout/          # Composants de layout
│   └── modales/         # Modales de création/modification
├── store/
│   └── slices/          # Redux slices
├── utils/               # Utilitaires (localStorage, fichiers)
└── router/              # Configuration React Router
```