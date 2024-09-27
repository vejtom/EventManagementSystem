import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Events } from '../pages/events/Events';
import CreateEvent from '../pages/events/CreateEvent';
import EditEvent from '../pages/events/EditEvent';
import DeleteEvent from '../pages/events/DeleteEvent';
import ViewEvent from '../pages/events/ViewEvents';

const mainLayoutRoutes: RouteObject[] = [
  { path: '/', element: <Events /> },
  { path: 'create-event', element: <CreateEvent /> },
  { path: 'events/:id/edit', element: <EditEvent /> },
  { path: 'events/:id/view', element: <ViewEvent /> },
  { path: 'events/:id/delete', element: <DeleteEvent /> },
];

const routes: RouteObject[] = [
  {
    path: '/',
    Component: MainLayout,
    children: mainLayoutRoutes,
  },
];

export default routes;