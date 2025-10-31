import { useState, useEffect } from 'react';
import BlockPreview from './BlockPreview';

/**
 * BlockEditor - Composant pour créer ou modifier un bloc personnalisé
 *
 * Props:
 * - block: Bloc à éditer (null si création)
 * - onSave: Callback(blockData) appelé quand on sauvegarde
 * - onCancel: Callback() appelé quand on annule
 * - isEditing: Booléen indiquant si on est en mode édition
 */
function BlockEditor({ block = null, onSave = () => {}, onCancel = () => {}, isEditing = false }) {
  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    icon: 'icon',
    color: '#3b82f6',
    markdown: '',
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Initialiser le formulaire avec le bloc existant
  useEffect(() => {
    if (block) {
      setFormData({
        name: block.name || '',
        icon: block.icon || 'icon',
        color: block.color || '#3b82f6',
        markdown: block.markdown || '',
      });
    } else {
      setFormData({
        name: '',
        icon: 'icon',
        color: '#3b82f6',
        markdown: '',
      });
    }
    setErrors({});
  }, [block]);

  /**
   * Gère les changements des champs du formulaire
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ quand on tape
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Valide le formulaire
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du bloc est requis';
    }

    if (!formData.markdown.trim()) {
      newErrors.markdown = 'Le contenu markdown est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumet le formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  /**
   * Insère un snippet de markdown courant
   */
  const insertSnippet = (snippet) => {
    setFormData((prev) => ({
      ...prev,
      markdown: prev.markdown + snippet,
    }));
  };

  // Snippets de templates courantes
  const snippets = [
    { label: 'Titre H1', value: '# ' },
    { label: 'Titre H2', value: '## ' },
    { label: 'Titre H3', value: '### ' },
    { label: 'Gras', value: '**texte**' },
    { label: 'Italique', value: '*texte*' },
    { label: 'Code', value: '`code`' },
    { label: 'Liste', value: '- Item\n- Item\n- Item\n' },
    { label: 'Lien', value: '[texte](url)' },
    { label: 'Image', value: '![alt](image-url)' },
    { label: 'Citation', value: '> Citation\n' },
  ];

  return (
    <div className="be-container">
      <div className="be-header">
        <h2 className="be-title">
          {isEditing ? 'Modifier le bloc' : 'Créer un nouveau bloc'}
        </h2>
        <button className="be-close-btn" onClick={onCancel}>
          X
        </button>
      </div>

      <div className="be-content">
        <form onSubmit={handleSubmit} className="be-form">
          {/* Champ nom */}
          <div className="be-form-group">
            <label htmlFor="name" className="be-label">
              Nom du bloc *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Code Python"
              className={`be-input ${errors.name ? 'be-input-error' : ''}`}
              maxLength={50}
            />
            {errors.name && <span className="be-error">{errors.name}</span>}
            <small className="be-count">{formData.name.length}/50</small>
          </div>

          {/* Champ icône et couleur (côte à côte) */}
          <div className="be-row">
            {/* Champ icône */}
            <div className="be-form-group be-half">
              <label htmlFor="icon" className="be-label">
                Icône
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="😀"
                className="be-input be-input-emoji"
                maxLength={4}
              />
              <small>Un ou plusieurs émojis (4 caractères max)</small>
            </div>

            {/* Champ couleur */}
            <div className="be-form-group be-half">
              <label htmlFor="color" className="be-label">
                Couleur
              </label>
              <div className="be-color-input-wrapper">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="be-color-input"
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="#3b82f6"
                  className="be-input"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Champ markdown */}
          <div className="be-form-group">
            <label htmlFor="markdown" className="be-label">
              Contenu Markdown *
              <button
                type="button"
                className="be-preview-toggle"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Masquer' : 'Aperçu'}
              </button>
            </label>

            {/* Snippets rapides */}
            <div className="be-snippets">
              {snippets.map((snippet) => (
                <button
                  key={snippet.label}
                  type="button"
                  className="be-snippet-btn"
                  onClick={() => insertSnippet(snippet.value)}
                  title={snippet.label}
                >
                  {snippet.label}
                </button>
              ))}
            </div>

            <textarea
              id="markdown"
              name="markdown"
              value={formData.markdown}
              onChange={handleInputChange}
              placeholder="Entrez votre contenu markdown..."
              className={`be-textarea ${errors.markdown ? 'be-input-error' : ''}`}
              rows={10}
            />
            {errors.markdown && (
              <span className="be-error">{errors.markdown}</span>
            )}
          </div>

          {/* Aperçu en direct */}
          {showPreview && (
            <BlockPreview markdown={formData.markdown} icon={formData.icon} />
          )}

          {/* Boutons d'action */}
          <div className="be-actions">
            <button
              type="button"
              className="be-btn be-btn-secondary"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button type="submit" className="be-btn be-btn-primary">
              {isEditing ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlockEditor;
