import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import Layout from './ui/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Jobs from './pages/Jobs';
import UploadResume from './pages/UploadResume';
import Feedback from './pages/Feedback';
import Chatbot from './pages/chatbot';

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'admin', element: <AdminLogin /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: 'admin/chatbot', element: <Chatbot /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'upload', element: <UploadResume /> },
      { path: 'feedback', element: <Feedback /> },
  ]}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
