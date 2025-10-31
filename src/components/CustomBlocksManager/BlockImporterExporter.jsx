import { useRef, useState } from 'react';

function BlockImporterExporter({ blocks = [], setBlocks = () => {} }) {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    if (blocks.length === 0) {
      alert('Aucun bloc à exporter');
      return;
    }

    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      blocksCount: blocks.length,
      blocks: blocks,
    };

    try {
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `custom-blocks-${Date.now()}.parts.mdlc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setImportStatus('Export réussi !');
      setTimeout(() => setImportStatus(''), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      setImportStatus('Erreur lors de l\'export');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('');

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data.blocks || !Array.isArray(data.blocks)) {
        throw new Error('Format de fichier invalide: propriété "blocks" manquante ou invalide');
      }

      const validBlocks = data.blocks.filter((block) => {
        return block.name && block.markdown !== undefined;
      });

      if (validBlocks.length === 0) {
        throw new Error('Aucun bloc valide trouvé dans le fichier');
      }
      const newBlocks = validBlocks.map((block) => ({
        ...block,
        id: Date.now().toString() + Math.random(),
        createdAt: block.createdAt || new Date().toISOString(),
      }));

      setBlocks((prev) => [...prev, ...newBlocks]);
      setImportStatus(
        `${validBlocks.length} bloc(s) importé(s) avec succès !`
      );
      setTimeout(() => setImportStatus(''), 4000);
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      setImportStatus(`Erreur: ${error.message}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleBackup = () => {
    const backupData = JSON.stringify({ blocks, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blocks-backup-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bie-container">
      <div className="bie-button-group">
        <button
          className="bie-btn bie-btn-export"
          onClick={handleExport}
          title="Exporter les blocs en .parts.mdlc"
        >
          Exporter
        </button>
        <button
          className="bie-btn bie-btn-import"
          onClick={handleImportClick}
          disabled={isImporting}
          title="Importer des blocs depuis .parts.mdlc"
        >
          {isImporting ? '...' : 'Importer'}
        </button>
        <button
          className="bie-btn bie-btn-backup"
          onClick={handleBackup}
          title="Faire une sauvegarde JSON"
        >
          Backup
        </button>
      </div>

      {importStatus && (
        <div className="bie-status">
          {importStatus}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".parts.mdlc,.json"
        onChange={handleImportFile}
        style={{ display: 'none' }}
        aria-label="Importer un fichier de blocs"
      />

      <div className="bie-help">
        <details>
          <summary>Aide: Import/Export</summary>
          <div className="bie-help-content">
            <h4>Format .parts.mdlc</h4>
            <p>
              Fichier JSON contenant vos blocs personnalisés. Peut être partagé et
              importé dans d'autres projets.
            </p>
            <h4>Actions disponibles:</h4>
            <ul>
              <li><strong>Exporter:</strong> Crée un fichier .parts.mdlc avec tous vos blocs</li>
              <li><strong>Importer:</strong> Ajoute des blocs depuis un fichier .parts.mdlc existant</li>
              <li><strong>Backup:</strong> Crée une sauvegarde JSON simple</li>
            </ul>
            <h4>Exemple de structure:</h4>
            <pre className="bie-code-example">{`{
  "version": "1.0",
  "exportedAt": "2024-01-01T12:00:00Z",
  "blocks": [
    {
      "id": "123456",
      "name": "Mon Bloc",
      "icon": "icon",
      "color": "#3b82f6",
      "markdown": "# Contenu..."
    }
  ]
}`}</pre>
          </div>
        </details>
      </div>
    </div>
  );
}

export default BlockImporterExporter;
