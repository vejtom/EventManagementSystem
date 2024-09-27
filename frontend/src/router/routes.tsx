import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Events } from '../pages/events/Events';

const mainLayoutRoutes: RouteObject[] = [
  { path: '/', element: <Events /> },
];

const routes: RouteObject[] = [
  {
    path: '/',
    Component: MainLayout,
    children: mainLayoutRoutes,
  },
];

export default routes;