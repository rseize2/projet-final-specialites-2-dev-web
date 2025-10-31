# CustomBlocksManager - Éditeur de Blocs Personnalisés

> Un composant React complet et modulaire pour gérer des blocs personnalisés Markdown réutilisables.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## Vue d'ensemble

Bienvenue dans le projet **CustomBlocksManager** ! Ce projet contient un composant React avancé qui permet de :

- Créer des blocs personnalisés avec Markdown
- Gérer une bibliothèque de blocs avec recherche et filtrage
- Éditer et supprimer des blocs facilement
- Importer/Exporter au format `.parts.mdlc`
- Aperçu en direct via Showdown.js
- Raccourcis clavier (`Ctrl+Alt+B`)
- Design responsive et moderne
- Persistance via localStorage

---

## Démarrage rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### 3. Commencer à utiliser

- **Créer un bloc** : Cliquez sur "Nouveau Bloc" ou appuyez sur `Ctrl+Alt+B`
- **Insérer un bloc** : Cliquez sur "Insérer" sur un bloc existant
- **Exporter** : Cliquez "Exporter" pour télécharger vos blocs
- **Importer** : Cliquez "Importer" pour ajouter des blocs

---

## Structure du projet

```
src/
├── components/
│   └── CustomBlocksManager/        # Composant principal
│       ├── CustomBlocksManager.jsx
│       ├── BlockEditor.jsx
│       ├── BlockPreview.jsx
│       ├── BlockLibrary.jsx
│       ├── BlockImporterExporter.jsx
│       ├── CustomBlocksManager.css
│       ├── README.md              # Doc complète
│       ├── EXAMPLES.md            # Exemples
│       ├── CHANGELOG.md           # Historique
│       └── STARTER_BLOCKS.json    # Blocs démarrage
├── App.jsx
├── App.css
└── main.jsx
```

Pour plus de détails, consultez [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## Documentation complète

### Guides principaux

1. **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Guide complet d'intégration
   - Installation étape par étape
   - Exemples avancés
   - Dépannage
   - Bonnes pratiques

2. **[src/components/CustomBlocksManager/README.md](src/components/CustomBlocksManager/README.md)** - Doc du composant
   - Fonctionnalités détaillées
   - API complète
   - Structure de données
   - Composants enfants

3. **[src/components/CustomBlocksManager/EXAMPLES.md](src/components/CustomBlocksManager/EXAMPLES.md)** - 20+ exemples
   - Code snippets
   - Alertes et notifications
   - Tableaux et listes
   - Templates

4. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Architecture du projet
   - Structure complète
   - Détail des fichiers
   - Conventions de code
   - Points d'entrée

---

## Commandes utiles

```bash
# Développement
npm run dev              # Démarrer le serveur Vite

# Production
npm run build            # Builder pour production
npm run preview          # Prévisualiser le build

# Linting
npm run lint             # Vérifier le code
```

---

## Fonctionnalités principales

### Gestion des blocs

- Créer, modifier, supprimer des blocs
- Recherche/filtrage en temps réel
- Aperçu miniature dans la grille
- Sélection visuelle

### Stockage et persistance

- Sauvegarde automatique en localStorage
- Export au format `.parts.mdlc` (JSON structuré)
- Import avec validation
- Backup simple en JSON

### Interface utilisateur

- Design moderne avec CSS personnalisé
- Grille responsive (desktop/tablet/mobile)
- Cartes avec couleurs personnalisées
- Icônes emoji
- Aperçu Markdown en direct

### Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+Alt+B` | Créer rapidement un bloc |

### Intégration

- Callback `onInsertBlock(markdown)` pour le parent
- Architecture modulaire
- Séparation des responsabilités

---

## Exemples de blocs

Voici quelques exemples de blocs que vous pouvez créer :

### Code Python

```python
def hello():
    print("Hello, World!")
```

### Alerte

> **Attention!** Ceci est important

### Tableau

| Colonne 1 | Colonne 2 |
|-----------|-----------|
| A | B |
| C | D |

### Checklist

- [ ] Tâche 1
- [x] Tâche 2
- [ ] Tâche 3

Pour plus d'exemples, consultez [EXAMPLES.md](src/components/CustomBlocksManager/EXAMPLES.md)

---

## Configuration personnalisée

### Modifier les couleurs

Éditez `src/components/CustomBlocksManager/CustomBlocksManager.css` :

```css
:root {
  --cbm-primary: #3b82f6;        /* Couleur principale */
  --cbm-secondary: #8b5cf6;      /* Couleur secondaire */
  --cbm-danger: #ef4444;         /* Couleur danger */
}
```

### Personnaliser localStorage

Les blocs sont sauvegardés dans `localStorage.customBlocks`.
Vous pouvez modifier la clé dans `CustomBlocksManager.jsx`.

---

## Responsive design

Le composant s'adapte automatiquement à tous les écrans :

- **Desktop** (> 768px) : Grille 3+ colonnes
- **Tablette** (480-768px) : Grille 2 colonnes
- **Mobile** (< 480px) : Grille 1 colonne

---

## Test et validation

Le projet a été testé pour :

- Build sans erreurs (`npm run build`)
- localStorage fonctionnel
- Import/export `.parts.mdlc`
- Responsive sur tous les écrans
- Raccourcis clavier
- Conversion Markdown via Showdown

---

## Dépendances

### Production

- **react** (19.1.1) - Framework UI
- **react-dom** (19.1.1) - Rendu DOM
- **showdown** (2.0.0) - Markdown → HTML

### Développement

- **vite** (7.1.7) - Build tool
- **@vitejs/plugin-react** (5.0.4) - Plugin React
- **eslint** (9.36.0) - Linting
- **tailwindcss** - CSS framework

```bash
npm install showdown tailwindcss
```

---

## Dépannage

### Les blocs ne se sauvegardent pas
→ Vérifiez que localStorage est activé

### L'aperçu Markdown ne s'affiche pas
→ Assurez-vous que `showdown` est installé

### Les raccourcis clavier ne fonctionnent pas
→ Vérifiez qu'aucun autre plugin n'interfère

Pour plus d'aide, consultez [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md#-dépannage)

---

## Aperçu du design

### Composant principal

- En-tête avec gradient
- Barre de recherche
- Grille responsive de cartes
- Éditeur modal
- Section import/export
- Footer avec info raccourcis

### Cartes de bloc

- Icône et nom
- Couleur personnalisée
- Badge avec taille
- Aperçu miniature
- Actions: Insérer, Modifier, Supprimer
- Date de création

---

## Statistiques

| Métrique | Valeur |
|----------|--------|
| Composants | 5 |
| Lignes de code | 580+ |
| Lignes de CSS | 935+ |
| Documentation | 1000+ |
| Fichiers | 14 |
| Build size | 290KB (JS), 15KB (CSS) |

---

## Déploiement

### Build pour production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

### Déployer sur Vercel

```bash
# 1. Créer un repo Git
git init && git add . && git commit -m "initial"

# 2. Pousser sur GitHub
git push origin main

# 3. Connecter sur Vercel et déployer
# Vercel détecte React automatiquement
```

---

## Licence

MIT - Libre d'utilisation et de modification

Consultez [LICENSE](LICENSE) pour plus de détails.

---

## Contribution

Les contributions sont bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## Feedback et support

- Documentation - Consultez les fichiers `.md`
- Bug report - Créez une issue
- Suggestions - Proposez des améliorations
- Questions - Vérifiez la FAQ dans [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

---

## Ressources supplémentaires

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Showdown.js](https://showdownjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## Roadmap

### Court terme
- [ ] Tests unitaires
- [ ] Optimisation performance
- [ ] Meilleure gestion erreurs

### Moyen terme
- [ ] Sync avec backend
- [ ] Gestion d'équipe
- [ ] Marketplace de blocs

### Long terme
- [ ] Plateforme web
- [ ] API publique
- [ ] SDK multi-frameworks

---

## Auteur

Créé avec passion pour les développeurs React

---

**Version:** 1.0.0 | **Dernière mise à jour:** 2024-10-30 | **Status:** Production Ready
