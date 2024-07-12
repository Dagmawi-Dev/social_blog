import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Logout from './pages/Logout';
// import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import Posts from './components/Posts';
import EditPost from './pages/EditPost';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from "./pages/Dashboard";
import DeletePost from "./pages/DeletePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'posts/:id', element: <PostDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile/:id', element: <UserProfile /> },
      // { path: 'authors', element: <Authors /> },
      { path: 'create', element: <CreatePost /> },
      { path: 'posts/categories/:category', element: <Posts /> },
      // { path: 'posts/users/:id', element: <AuthorPosts /> },
      { path: 'myposts/:id', element: <Dashboard /> },
      { path: 'posts/:id/edit', element: <EditPost /> },
      { path: 'posts/:id/delete', element: <DeletePost /> },
      { path: 'logout', element: <Logout /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <Layout onSearch={handleSearch} />
      </RouterProvider>
    </React.StrictMode>
  );
};

root.render(<Index />);
