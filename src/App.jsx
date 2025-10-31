import { useState } from 'react'
import CustomBlocksManager from './components/CustomBlocksManager/CustomBlocksManager'
import './App.css'

function App() {
  const [insertedBlocks, setInsertedBlocks] = useState([])

  /**
   * Callback appelé quand un bloc est inséré
   */
  const handleInsertBlock = (markdown) => {
    const newBlock = {
      id: Date.now(),
      markdown,
      insertedAt: new Date().toLocaleString('fr-FR'),
    }
    setInsertedBlocks((prev) => [newBlock, ...prev])
    alert('Bloc inséré ! (Vérifiez la section "Blocs insérés" ci-dessous)')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Éditeur de Blocs Personnalisés</h1>
        <p>Gérez vos blocs markdown réutilisables facilement</p>
      </header>

      <main className="app-main">
        {/* Gestionnaire de blocs */}
        <section className="app-section">
          <CustomBlocksManager onInsertBlock={handleInsertBlock} />
        </section>

        {/* Affichage des blocs insérés */}
        {insertedBlocks.length > 0 && (
          <section className="app-section inserted-blocks">
            <h2>Blocs Insérés ({insertedBlocks.length})</h2>
            <div className="blocks-list">
              {insertedBlocks.map((block) => (
                <div key={block.id} className="inserted-block">
                  <small>{block.insertedAt}</small>
                  <pre>
                    <code>{block.markdown}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Astuce: Utilisez <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> pour créer rapidement un bloc</p>
      </footer>
    </div>
  )
}

export default App
