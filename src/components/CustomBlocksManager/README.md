# CustomBlocksManager

Un composant React complet et modulaire pour gérer des blocs personnalisés Markdown réutilisables dans un éditeur.

## Fonctionnalités principales

### Gestion des blocs
- Afficher une liste de blocs avec aperçu miniature
- Créer de nouveaux blocs (nom, icône, couleur, markdown)
- Modifier des blocs existants
- Supprimer des blocs
- Rechercher/filtrer les blocs

### Stockage et persistance
- Sauvegarde automatique en localStorage
- Récupération des blocs au chargement
- Export/import au format `.parts.mdlc` (JSON)
- Fonction de backup JSON

### Interface utilisateur
- Aperçu en direct via Showdown.js
- Grille responsive avec cartes arrondies
- Couleurs personnalisables par bloc
- Icônes emoji pour chaque bloc
- Design moderne avec Tailwind CSS

### Raccourcis clavier
- `Ctrl+Alt+B` : Créer rapidement un nouveau bloc

### Intégration parent
- Callback `onInsertBlock(markdown)` pour insérer un bloc
- Structure modulaire et réutilisable

---

## Structure des fichiers

```
CustomBlocksManager/
├── CustomBlocksManager.jsx           # Composant principal
├── BlockEditor.jsx                   # Éditeur de bloc
├── BlockPreview.jsx                  # Aperçu Markdown
├── BlockLibrary.jsx                  # Grille des blocs
├── BlockImporterExporter.jsx         # Import/Export
├── CustomBlocksManager.css           # Styles (responsive)
├── index.js                          # Export barrel
└── README.md                         # Cette documentation
```

---

## Installation et utilisation

### 1. Importer le composant

```jsx
import CustomBlocksManager from '@/components/CustomBlocksManager';
// ou
import { CustomBlocksManager } from '@/components/CustomBlocksManager';
```

### 2. Utiliser dans votre App

```jsx
import { useState } from 'react';
import CustomBlocksManager from './components/CustomBlocksManager/CustomBlocksManager';

function App() {
  const handleInsertBlock = (markdown) => {
    console.log('Bloc inséré:', markdown);
    // Insérer le markdown dans votre éditeur
  };

  return (
    <CustomBlocksManager onInsertBlock={handleInsertBlock} />
  );
}

export default App;
```

### 3. Props disponibles

```jsx
<CustomBlocksManager
  onInsertBlock={(markdown) => {
    // Appelé quand l'utilisateur clique sur "Insérer"
    // markdown: string - Contenu markdown du bloc
  }}
/>
```

---

## Structure de données des blocs

### Dans localStorage

Les blocs sont stockés en JSON dans `localStorage` sous la clé `customBlocks` :

```json
[
  {
    "id": "1730000000000",
    "name": "Code Python",
    "icon": "python",
    "color": "#3b82f6",
    "markdown": "```python\nprint('Hello World')\n```",
    "createdAt": "2024-10-30T12:00:00Z"
  },
  {
    "id": "1730000001000",
    "name": "Alertes Bootstrap",
    "icon": "warning",
    "color": "#ef4444",
    "markdown": "**Attention:** Ceci est important\n\n> Note importante",
    "createdAt": "2024-10-30T12:30:00Z"
  }
]
```

### Format .parts.mdlc (Export)

Le format d'export `.parts.mdlc` est un fichier JSON avec la structure suivante :

```json
{
  "version": "1.0",
  "exportedAt": "2024-10-30T12:00:00Z",
  "blocksCount": 2,
  "blocks": [
    {
      "id": "...",
      "name": "...",
      "icon": "...",
      "color": "...",
      "markdown": "...",
      "createdAt": "..."
    }
  ]
}
```

---

## Composants enfants

### BlockEditor

Composant pour créer ou modifier un bloc.

**Props:**
```jsx
<BlockEditor
  block={null}                    // Bloc à éditer ou null
  onSave={(blockData) => {}}     // Callback sauvegarde
  onCancel={() => {}}             // Callback annulation
  isEditing={false}               // Mode édition ou création
/>
```

**Features:**
- Validation du formulaire
- Aperçu en direct via toggle
- Snippets rapides (H1, Gras, Code, etc.)
- Counter pour le nom (max 50 caractères)

---

### BlockPreview

Composant d'aperçu Markdown en direct.

**Props:**
```jsx
<BlockPreview
  markdown="# Mon titre"         // Markdown à convertir
  icon="icon"                    // Icône du bloc
  isMini={false}                 // Mode miniature (bibliothèque)
/>
```

**Features:**
- Conversion Markdown → HTML via Showdown.js
- Gestion des erreurs de conversion
- Support des tables, emojis, strikethrough
- Mode complet et miniature

---

### BlockLibrary

Grille des blocs personnalisés.

**Props:**
```jsx
<BlockLibrary
  blocks={[]}                           // Array de blocs
  selectedBlock={null}                  // Bloc sélectionné
  onSelectBlock={(block) => {}}         // Callback sélection
  onEditBlock={(block) => {}}           // Callback édition
  onDeleteBlock={(blockId) => {}}       // Callback suppression
  onInsertBlock={(markdown) => {}}      // Callback insertion
/>
```

**Features:**
- Grille responsive (minmax 280px)
- Sélection visuelle des blocs
- Actions: Insérer, Modifier, Supprimer
- Badge avec taille du contenu
- Meta: Date de création

---

### BlockImporterExporter

Gestion import/export des blocs.

**Props:**
```jsx
<BlockImporterExporter
  blocks={[]}                    // Blocs actuels
  setBlocks={(blocks) => {}}     // Setter des blocs
/>
```

**Features:**
- Exporter en `.parts.mdlc`
- Importer depuis `.parts.mdlc`
- Backup en JSON simple
- Validation des fichiers importés
- Statut d'import/export
- Aide intégrée

---

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+Alt+B` | Ouvrir l'éditeur pour créer rapidement un bloc |

---

## Personnalisation du style

Tous les styles sont définis dans `CustomBlocksManager.css` avec des variables CSS pour faciliter la personnalisation :

```css
:root {
  --cbm-primary: #3b82f6;
  --cbm-secondary: #8b5cf6;
  --cbm-danger: #ef4444;
  --cbm-success: #10b981;
  --cbm-bg-light: #f9fafb;
  --cbm-bg-white: #ffffff;
  --cbm-text-dark: #111827;
  --cbm-text-gray: #6b7280;
  --cbm-border-color: #e5e7eb;
}
```

### Modifier les couleurs

```css
/* Dans votre fichier CSS */
:root {
  --cbm-primary: #ff6b6b;        /* Rouge */
  --cbm-secondary: #4ecdc4;      /* Turquoise */
}
```

---

## Responsive design

Le composant est entièrement responsive :

- **Desktop** (> 768px) : Grille 3+ colonnes
- **Tablette** (480-768px) : Grille 2 colonnes
- **Mobile** (< 480px) : Grille 1 colonne

---

## Exemples d'utilisation

### Exemple 1: Bloc de code

```jsx
{
  name: "Code JavaScript",
  icon: "js",
  color: "#f59e0b",
  markdown: "```javascript\nconst hello = () => console.log('Hello!');\n```"
}
```

### Exemple 2: Bloc d'alerte

```jsx
{
  name: "Note importante",
  icon: "warning",
  color: "#ef4444",
  markdown: "> **Important:** N'oubliez pas de faire ceci\n\n- Item 1\n- Item 2"
}
```

### Exemple 3: Bloc de tableau

```jsx
{
  name: "Tableau exemple",
  icon: "table",
  color: "#06b6d4",
  markdown: "| Colonne 1 | Colonne 2 |\n|-----------|----------|\n| A | B |\n| C | D |"
}
```

---

## Dépannage

### Les blocs ne se sauvegardent pas
- Vérifiez que localStorage est activé
- Vérifiez la console pour les erreurs

### L'aperçu Markdown ne s'affiche pas correctement
- Assurez-vous que `showdown` est bien installé
- Vérifiez la syntaxe Markdown

### Les raccourcis clavier ne fonctionnent pas
- Vérifiez qu'aucun autre plugin n'interfère
- Testez avec `Ctrl+Alt+B`

---

## Dépendances

- `react` >= 19.1.1
- `react-dom` >= 19.1.1
- `showdown` >= 2.0.0

```bash
npm install showdown
```

---

## Licence

MIT - Libre d'utilisation et de modification

---

## Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Envoyer des pull requests

---

## Support

Pour toute question ou problème, veuillez vérifier :
1. La structure des données des blocs
2. Les dépendances installées
3. Les logs de la console

---

**Créé avec passion pour les développeurs React**
