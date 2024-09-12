import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { FluentProvider} from '@fluentui/react-components';
import { lightTheme, darkTheme } from './theming/uwiThemes.ts';
import ErrorPage from './routes/ErrorPage/ErrorPage.tsx'
import WelcomeScreen, { action as getStartedAction, loader as getStartedLoader } from './routes/WelcomeScreen/WelcomeScreen.tsx'

import App from './App.tsx'
import PlanHub, { subRoutes as PlanHubSubRoutes, loader as planHubLoader} from './routes/PlanHub/PlanHub.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/get-started" />
      },
      {
        path: "get-started",
        element: <WelcomeScreen />,
        action: getStartedAction,
        loader: getStartedLoader
      },
      {
        path: ":degree/:academicYear/plan-hub",
        element: <PlanHub />,
        loader: planHubLoader,
        children: PlanHubSubRoutes
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FluentProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </StrictMode>,
)
