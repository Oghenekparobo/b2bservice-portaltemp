import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import MerchantPage from './pages/MerchantPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Onboard from './pages/Onboard';
import Update from './pages/Update';
import Logout from './Logout';
import Balance from './sections/@dashboard/app/Balance';
import SubMerchant from './sections/@dashboard/app/SubMerchant';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard/app" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,

      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'merchants', element: <MerchantPage /> },
        { path: 'sub-merchants', element: <SubMerchant /> },
        { path: 'onboard', element: <Onboard /> },
        { path: 'balance/:service', element: <Balance /> },
        { path: 'update/:username', element: <Update /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'super-admin/login',
      element: <LoginPage />,
    },
    {
      path: 'logout',
      element: <Logout />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
