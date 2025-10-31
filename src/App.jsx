// Ce fichier peut être supprimé car on utilise RouterProvider
// Mais si vous voulez l'utiliser comme conteneur principal:

import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './App.css';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;