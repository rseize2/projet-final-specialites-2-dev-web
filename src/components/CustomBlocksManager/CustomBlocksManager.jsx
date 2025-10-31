import { useState, useEffect, useCallback } from 'react';
import BlockLibrary from './BlockLibrary';
import BlockEditor from './BlockEditor';
import BlockImporterExporter from './BlockImporterExporter';
import './CustomBlocksManager.css';

/**
 * CustomBlocksManager - Composant principal de gestion des blocs personnalisés
 *
 * Props:
 * - onInsertBlock: Callback appelé avec le markdown du bloc à insérer
 *
 * État:
 * - blocks: Tableau des blocs personnalisés
 * - selectedBlock: Bloc actuellement sélectionné (null si aucun)
 * - isEditorOpen: Booléen pour afficher/masquer l'éditeur
 * - editingBlockId: ID du bloc en cours d'édition (null si création)
 */
function CustomBlocksManager({ onInsertBlock = () => {} }) {
  // État principal
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les blocs depuis localStorage au montage
  useEffect(() => {
    const loadBlocks = () => {
      try {
        const saved = localStorage.getItem('customBlocks');
        if (saved) {
          setBlocks(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des blocs:', error);
      }
    };
    loadBlocks();
  }, []);

  // Sauvegarder les blocs dans localStorage chaque fois qu'ils changent
  useEffect(() => {
    try {
      localStorage.setItem('customBlocks', JSON.stringify(blocks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des blocs:', error);
    }
  }, [blocks]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Alt+B pour ouvrir la création rapide
      if (e.ctrlKey && e.altKey && e.key === 'b') {
        e.preventDefault();
        setEditingBlockId(null);
        setIsEditorOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Ajoute un nouveau bloc
   */
  const handleAddBlock = useCallback((newBlock) => {
    const blockWithId = {
      ...newBlock,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, blockWithId]);
    setIsEditorOpen(false);
    setEditingBlockId(null);
  }, []);

  /**
   * Met à jour un bloc existant
   */
  const handleUpdateBlock = useCallback((updatedBlock) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === editingBlockId
          ? { ...updatedBlock, id: block.id, createdAt: block.createdAt }
          : block
      )
    );
    setIsEditorOpen(false);
    setEditingBlockId(null);
    setSelectedBlock(null);
  }, [editingBlockId]);

  /**
   * Supprime un bloc
   */
  const handleDeleteBlock = useCallback((blockId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
      setBlocks((prev) => prev.filter((block) => block.id !== blockId));
      if (selectedBlock?.id === blockId) {
        setSelectedBlock(null);
      }
    }
  }, [selectedBlock]);

  /**
   * Ouvre l'éditeur en mode édition
   */
  const handleEditBlock = useCallback((block) => {
    setSelectedBlock(block);
    setEditingBlockId(block.id);
    setIsEditorOpen(true);
  }, []);

  /**
   * Ferme l'éditeur
   */
  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
    setEditingBlockId(null);
    setSelectedBlock(null);
  }, []);

  /**
   * Ouvre l'éditeur pour créer un nouveau bloc
   */
  const handleOpenNewBlockEditor = useCallback(() => {
    setEditingBlockId(null);
    setSelectedBlock(null);
    setIsEditorOpen(true);
  }, []);

  /**
   * Filtre les blocs par terme de recherche
   */
  const filteredBlocks = blocks.filter((block) =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cbm-container">
      {/* En-tête avec boutons d'action */}
      <div className="cbm-header">
        <h1 className="cbm-title">Gestionnaire de Blocs</h1>
        <div className="cbm-actions">
          <button
            className="cbm-btn cbm-btn-primary"
            onClick={handleOpenNewBlockEditor}
            title="Ctrl+Alt+B"
          >
            Nouveau Bloc
          </button>
          <BlockImporterExporter blocks={blocks} setBlocks={setBlocks} />
        </div>
      </div>

      <div className="cbm-content">
        {/* Éditeur de bloc (modal/collapsible) */}
        {isEditorOpen && (
          <div className="cbm-editor-wrapper">
            <BlockEditor
              block={editingBlockId ? selectedBlock : null}
              onSave={editingBlockId ? handleUpdateBlock : handleAddBlock}
              onCancel={handleCloseEditor}
              isEditing={editingBlockId !== null}
            />
          </div>
        )}

        {/* Barre de recherche */}
        <div className="cbm-search-container">
          <input
            type="text"
            className="cbm-search-input"
            placeholder="Rechercher un bloc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="cbm-count">{filteredBlocks.length} bloc(s)</span>
        </div>

        {/* Bibliothèque de blocs */}
        <BlockLibrary
          blocks={filteredBlocks}
          selectedBlock={selectedBlock}
          onSelectBlock={setSelectedBlock}
          onEditBlock={handleEditBlock}
          onDeleteBlock={handleDeleteBlock}
          onInsertBlock={onInsertBlock}
        />

        {/* Message si aucun bloc */}
        {blocks.length === 0 && (
          <div className="cbm-empty-state">
            <div className="cbm-empty-icon">-</div>
            <h3>Aucun bloc personnalisé</h3>
            <p>Créez votre premier bloc en cliquant sur "Nouveau Bloc"</p>
            <button
              className="cbm-btn cbm-btn-secondary"
              onClick={handleOpenNewBlockEditor}
            >
              Créer un bloc
            </button>
          </div>
        )}
      </div>

      {/* Indication de raccourci clavier */}
      <div className="cbm-footer">
        <small>Raccourci clavier: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> pour créer rapidement</small>
      </div>
    </div>
  );
}

export default CustomBlocksManager;
