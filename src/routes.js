import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Socities from './pages/Socities';
import Team from './pages/Team';
import NotFound from './pages/Page404';
import Induction from './pages/Induction';
import EventRequest from './pages/Teacher/EventRequest';
import InductionRequest from './pages/Teacher/InductionRequest';
import AllEvents from './pages/Director/AllEvents';
import Applications from './pages/Applications';

// import DashboardApp from './pages/Extra/DashboardApp';
// import User from './pages/Extra/User';
// import Products from './pages/Extra/Products';
// import Blog from './pages/Extra/Blog';
// ----------------------------------------------------------------------

export default function Router({ setLoading }) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/events" replace /> },
        // Director Only
        { path: 'all-events', element: <AllEvents /> },
        { path: 'socities', element: <Socities /> },
        // Teacher Only
        { path: 'event-request', element: <EventRequest /> },
        { path: 'induction-request', element: <InductionRequest /> },

        // General
        { path: 'events', element: <Events /> },
        { path: 'induction', element: <Induction /> },
        { path: 'applications', element: <Applications /> },
        { path: 'team', element: <Team /> }

        // extra
        // { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
