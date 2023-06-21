import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { DepositPage } from './pages/Deposit/DepositPage'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/deposit',
        element: <DepositPage></DepositPage>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>,
)
