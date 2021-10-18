import { Navigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Store from './pages/Store';
import Admin from './pages/admin/Admin';
import UploadArticle from "./pages/admin/UploadArticle.js"
import NavbarLayout from './layouts/store/navbar';
import AdminNavbarLayout from './layouts/admin/AdminNavbarLayout';
import Post from './pages/Post';
import NotFound from './pages/Page404';
import CreateCategory from './pages/admin/createCategory';
// axios
import axios from 'axios';
import "./css/master.css";

// ----------------------------------------------------------------------

export default function Router() {
  const status = localStorage.getItem("connected") ? parseInt(localStorage.getItem("connected")) : 0
  const admin_online = localStorage.getItem("admin") ? parseInt(localStorage.getItem("admin")) : 0
  const [current, setCurrent] = useState(Object)

  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {
          path: '/',
          element:<Navigate to="/store" />,  
        },
        {
          path: 'login',
          element: status ? <Navigate to="/store" />  : <Login />,  
        },
        {
          path: 'register',
          element: status && admin_online ? <Navigate to="/store" />  : <Register />,  
        },
        { 
          path: '404', 
          element: <NotFound /> 
        },

        { 
          path: '*', 
          element: <Navigate to="/404" replace /> 
        }
      ]  
    },
    {

      path: '/store',
      element: <NavbarLayout />,
      children: [
        {path:'/', element: <Store />},
        {path: ':id', element: <Post />,
         children: [
          {path: "*", element: <Post />},
         ]},
      ] 
    },
    {
      path: 'admin',
      element: status && admin_online ? <AdminNavbarLayout /> : <Navigate to="/store" />,
      children: [
        { path: "/",
          element: <Admin />
        },
        {
          path: "/upload",
          element: <UploadArticle />
        },
        {
          path: "/create-category",
          element: <CreateCategory />
        }
      ]
    },
  ]);
}
/*children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register />},
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
*/