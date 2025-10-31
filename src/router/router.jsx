import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const routes = [
    {
        path: '/',
        Component: Layout,
    },
];

const router = createBrowserRouter(routes);

export default router;