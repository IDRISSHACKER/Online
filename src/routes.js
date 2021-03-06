import { Navigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Store from './pages/Store';
import DashboardApp from './pages/admin/DashboardApp';
import UploadArticle from "./pages/admin/UploadArticle.js"
import Users from './pages/admin/Users'
import Cards from './pages/Cards'

import NavbarLayout from './layouts/store/navbar';
import AdminNavbarLayout from './layouts/admin/AdminNavbarLayout';
import Post from './pages/Post';
import NotFound from './pages/Page404';
import CreateCategory from './pages/admin/createCategory';

// axios
import "./css/master.css";
import CreateSlide from './pages/admin/crateSlide';
import DashboardLayout from './layouts/dashboard';
import PostList from './pages/admin/PostList';
import EditArticle from './pages/admin/EditArticle';
import Posts from './pages/Posts';
import PostsCtg from './pages/PostsCtg';

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
      element: status ? <Navigate to="/store" />  : <Cards />,  
    },
    {

      path: '/store',
      element: <NavbarLayout />,
      children: [
        {path:'/', element: <Store />},
        {
          path: '/card',
          element: status ? <Cards />  : <Navigate to="/store" />,  
        },
        {
          path: '/products',
          element: <Posts />,  
          children: [
            {
              path: "/:id",
              element: <Posts />
            },
          ]
        },
        {path: ':id', element: <Post />,
         children: [
          {path: "*", element: <Post />},
         ]},
      ] 
    },
    {
      path: 'admin',
      element: status && admin_online ? <DashboardLayout /> : <Navigate to="/store" />,
      children: [
        { path: "/",
          element: <Navigate to="/admin/dashboard" />
        },
        {
          path: "/dashboard",
          element: <DashboardApp />
        },
        {
          path: "/post-list/upload",
          element: <UploadArticle />
        },
        {
          path: "/post-list/edit/:id",
          element: <EditArticle />
        },
        {
          path: "/post-list",
          element: <PostList />
        },
        {
          path: "/create-category",
          element: <CreateCategory />
        },
        {
          path: "/build-slide",
          element: <CreateSlide />
        },
        {
          path: "/users",
          element: <Users />
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
