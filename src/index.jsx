import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListClient } from './pages/Client/ListClient';
import { ClientPage } from './pages/Client/ClientPage';
import { UpdateClient } from './pages/Client/UpdateClient';
import { WorkerPage } from './pages/Worker/WorkerPage';
import { ListWorker } from './pages/Worker/ListWorker';
import { UpdateWorker } from './pages/Worker/UpdateWorker';
import { FavoritesPage } from './pages/Favorites/FavoritesPage'
import { UpdateFavorites } from './pages/Favorites/UpdateFavorites'
import { ProductAndServices } from './pages/ProductsCompra/ProductAndServices';
import { ComprasPage } from './pages/Bill/ComprasPage';
import {BillPage} from './pages/Bill/BillPage';
export const AuthContext = createContext();

export const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    role: ''
  })
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) setLoggedIn(true)
  }, [])

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/login',
          element: <LoginPage></LoginPage>
        },
        {
          path: '/dashboard',
          element: loggedIn ? <DashboardPage /> : <LoginPage />,
          children: [
            {
              path: 'client',
              element: <ClientPage></ClientPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ListClient></ListClient>
                },
                {
                  path: 'updateClient/:id',
                  element: <UpdateClient />
                },
              ]
            },
            {
              path: 'worker',
              element: <WorkerPage></WorkerPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ListWorker></ListWorker>
                },
                {
                  path: 'updateWorker/:id',
                  element: <UpdateWorker/>
                },
              ]
            },
            {
              path: 'updateFavorites/:id',
              element: <UpdateFavorites/>
            },
            {
              path: 'favorites',
              element: <FavoritesPage></FavoritesPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <FavoritesPage></FavoritesPage>
                },
              ]
            },
            {
              path: 'products',
              element: <ProductAndServices></ProductAndServices>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ProductAndServices></ProductAndServices>
                },
              ]
            },
            {
              path: 'compras/:id',
              element: <ComprasPage></ComprasPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ComprasPage></ComprasPage>
                },
              ]
            },
            {
              path: 'compra',
              element: <BillPage></BillPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <BillPage></BillPage>
                },
              ]
            }
          ]
        }
      ]
    }
  ])
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
      <RouterProvider router={routes} />
    </AuthContext.Provider>
  )
}

