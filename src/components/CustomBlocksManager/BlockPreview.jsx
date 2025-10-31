import { useMemo } from 'react';
import { Converter } from 'showdown';

/**
 * BlockPreview - Composant pour afficher l'aperçu en direct du markdown
 *
 * Props:
 * - markdown: Contenu markdown à convertir
 * - icon: Icône du bloc
 * - isMini: Si true, affiche une version réduite (pour la bibliothèque)
 */
function BlockPreview({ markdown = '', icon = '📌', isMini = false }) {
  // Créer et mémoriser le convertisseur Showdown
  const converter = useMemo(() => {
    return new Converter({
      tables: true,
      strikethrough: true,
      emoji: true,
      parseImgDimensions: true,
      simpleLineBreaks: true,
    });
  }, []);

  // Convertir le markdown en HTML
  const htmlContent = useMemo(() => {
    if (!markdown.trim()) {
      return '<p><em>Aperçu vide</em></p>';
    }
    try {
      return converter.makeHtml(markdown);
    } catch (error) {
      console.error('Erreur lors de la conversion markdown:', error);
      return '<p><em>Erreur de conversion</em></p>';
    }
  }, [markdown, converter]);

  if (isMini) {
    // Aperçu miniature pour la bibliothèque
    return (
      <div className="bp-mini">
        <div className="bp-mini-icon">{icon}</div>
        <div
          className="bp-mini-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }

  // Aperçu complet pour l'éditeur
  return (
    <div className="bp-container">
      <div className="bp-header">
        <h3 className="bp-title">
          {icon} Aperçu du bloc
        </h3>
      </div>
      <div className="bp-content">
        <div
          className="bp-html"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}

export default BlockPreview;
