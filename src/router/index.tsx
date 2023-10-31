import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import Error403 from '@/views/403'
import NotFound from '@/views/404'
import Layout from '@/layout'
import DashBoard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/userList',
        element: <User />,
      },
      {
        path: '/deptList',
        element: <Dept />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <Error403 />,
  },
]

export default function Router() {
  return useRoutes(router)
}

// export default createBrowserRouter(router)
