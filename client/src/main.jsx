import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App'
// import './index.css'
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import ProfileSetup from './pages/ProfileSetup';
import ProtectedRoutes from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        path: '/signup',
        element: <Signup />
      },     
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile-update',
        element: <ProfileSetup />
      },
      {
        element: <ProtectedRoutes requiresProfile={true} />,
        children: [
          { path: '/home', element: <Home /> },
        ]
      },
      {
        element: <ProtectedRoutes requiresProfile={false} />, // wrapper for "profile may be incomplete"
        children: [
          { path: '/profile-update', element: <ProfileSetup /> },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
