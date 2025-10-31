import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store/store';
import router from './router/router';
import './index.css';

createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);