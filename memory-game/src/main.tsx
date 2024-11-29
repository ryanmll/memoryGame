import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './templates/App/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/index.tsx'
import ErrorPage from './components/Error/ErrorPage.tsx'
import  {Grid}  from './components/Grid/index.tsx'
import { cards } from './data/cards.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/Grid',
        element: <Grid cards={cards} />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
