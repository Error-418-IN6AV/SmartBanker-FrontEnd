import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListClient } from './pages/Client/ListClient';
import { ClientPage } from './pages/Client/ClientPage';
import { UpdateClient } from './pages/Client/UpdateClient';
import { WorkerPage } from './pages/Worker/WorkerPage';
import { ListWorker } from './pages/Worker/ListWorker';
import { UpdateWorker } from './pages/Worker/UpdateWorker';
import { TransferPage } from './pages/Transfer/TransferPage';
import { ListTransfer } from './pages/Transfer/ListTransfer';
import { UpdateTransfer } from './pages/Transfer/UpdateTransfer';
import { ProductPage } from './pages/Products/ProductPage';
import { ProductsTable } from './pages/Products/ProductsTable';
import { UpdateProducts } from './pages/Products/UpdateProducts';
import { Favorite } from './pages/Favorites/Favorite';
import { FavoritesPage } from './pages/Favorites/FavoritesPage';
import { UpdateFavorites } from './pages/Favorites/UpdateFavorites';
import { ProductAndServices } from './pages/ProductsCompra/ProductAndServices';
import { Bill } from './pages/Bill/Bill';
import { BillPage } from './pages/Bill/BillPage';
import { ComprasPage } from './pages/compra/ComprasPage';
import { DepositPage } from './pages/Deposit/DepositPage';
import { Images } from './pages/Products/Images';

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

    //Token abierto
    let user = JSON.parse(localStorage.getItem('ClaveSuperSecreta'))
    if (user) {
      setDataUser(user)
    }
  }, [])


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
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
              path: 'updateProduct/:id',
              element: <UpdateProducts />
            },
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
                  element: <UpdateWorker />
                },
              ]
            },
            {
              path: 'transfer',
              element: <TransferPage></TransferPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ListTransfer></ListTransfer>
                },
                {
                  path: 'updateTransfer/:id',
                  element: <UpdateTransfer />
                }
              ]
            },
            {
              path: 'product',
              element: <ProductPage />,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ProductsTable></ProductsTable>
                }
              ]
            },
            {
              path: 'favorite',
              element: <Favorite />,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <FavoritesPage></FavoritesPage>
                },
                {
                  path: 'updateFavorites/:id',
                  element: <UpdateFavorites />
                }
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
              element: <Bill></Bill>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <Bill></Bill>
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
            },
            {
              path: 'compr/:id',
              element: <ComprasPage></ComprasPage>
            },
            {
              path: 'deposito',
              element: <DepositPage></DepositPage>
            },
            {
              path: 'images/:id',
              element: <Images></Images>
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
