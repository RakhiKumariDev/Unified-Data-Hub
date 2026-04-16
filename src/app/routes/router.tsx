import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/app/routes/ProtectedRoute'
import { AppLayout } from '@/presentation/layouts/AppLayout'
import { AuthLayout } from '@/presentation/layouts/AuthLayout'
import { CryptoPage } from '@/presentation/pages/CryptoPage'
import { DashboardPage } from '@/presentation/pages/DashboardPage'
import { LoginPage } from '@/presentation/pages/LoginPage'
import { NotFoundPage } from '@/presentation/pages/NotFoundPage'
import { UsersPage } from '@/presentation/pages/UsersPage'
import { WeatherPage } from '@/presentation/pages/WeatherPage'
import { routePaths } from '@/shared/constants/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={routePaths.dashboard} replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: routePaths.login,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: routePaths.dashboard,
        element: <DashboardPage />,
      },
      {
        path: routePaths.users,
        element: <UsersPage />,
      },
      {
        path: routePaths.crypto,
        element: <CryptoPage />,
      },
      {
        path: routePaths.weather,
        element: <WeatherPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}