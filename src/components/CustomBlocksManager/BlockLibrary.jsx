import BlockPreview from './BlockPreview';

function BlockLibrary({
  blocks = [],
  selectedBlock = null,
  onSelectBlock = () => {},
  onEditBlock = () => {},
  onDeleteBlock = () => {},
  onInsertBlock = () => {},
}) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="bl-container">
      <div className="bl-grid">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`bl-card ${
              selectedBlock?.id === block.id ? 'bl-card-selected' : ''
            }`}
            style={{
              borderLeftColor: block.color,
              backgroundColor: `${block.color}08`,
            }}
            onClick={() => onSelectBlock(block)}
          >
            <div className="bl-card-header">
              <div className="bl-card-title">
                <span className="bl-card-icon">{block.icon}</span>
                <h3 className="bl-card-name">{block.name}</h3>
              </div>
              <div className="bl-card-badge" style={{ backgroundColor: block.color }}>
                {block.markdown.length}
              </div>
            </div>

            <div className="bl-card-preview">
              <BlockPreview
                markdown={block.markdown.substring(0, 150)}
                icon={block.icon}
                isMini={true}
              />
            </div>

            <div className="bl-card-meta">
              <small>
                {new Date(block.createdAt).toLocaleDateString('fr-FR', {
                  month: 'short',
                  day: 'numeric',
                })}
              </small>
            </div>

            <div className="bl-card-actions">
              <button
                className="bl-action-btn bl-action-insert"
                onClick={(e) => {
                  e.stopPropagation();
                  onInsertBlock(block.markdown);
                }}
                title="Insérer le bloc"
              >
                Insérer
              </button>
              <button
                className="bl-action-btn bl-action-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditBlock(block);
                }}
                title="Modifier le bloc"
              >
                Modifier
              </button>
              <button
                className="bl-action-btn bl-action-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBlock(block.id);
                }}
                title="Supprimer le bloc"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockLibrary;
