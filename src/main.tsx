import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { FluentProvider} from '@fluentui/react-components';
import { lightTheme, darkTheme } from './theming/uwiThemes.ts';
import ErrorPage from './routes/ErrorPage/ErrorPage.tsx'
import WelcomeScreen from './routes/WelcomeScreen/WelcomeScreen.tsx'

import App from './App.tsx'
import CoursePlan from './routes/CoursePlan/CoursePlan.tsx';
import CompletedCourses from './routes/CoursePage/CompletedCourses.tsx';
import AnalyzerPage from './routes/AnalyzerPage/AnalyzerPage.tsx';
import Header from './common/Header/Header.tsx';
import { action } from './routes/WelcomeScreen/WelcomeScreen.tsx';

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
        action: action
      },
      {
        path: ":degree/plan-hub",
        element: (<>
          <Header />
          <Outlet />
        </>),
        children: [
          {
            path: "completed-courses",
            element:  <CompletedCourses />
          },
          {
            path: "make-plan",
            element: <CoursePlan />
          },
          {
            index: true,
            element: <h1>Placeholder</h1>
          }
        ]
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
