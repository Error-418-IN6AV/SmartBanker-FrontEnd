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

