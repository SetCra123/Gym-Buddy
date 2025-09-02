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
      // Default (landing page) -> maybe Home if logged in, or Login if not
      {
        index: true,
        element: <Home />   // 👈 Home at `/`
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        element: <ProtectedRoutes requiresProfile={true} />,
        children: [
          { path: 'home', element: <Home /> },   // 👈 `/home` also works
        ]
      },
      {
        element: <ProtectedRoutes requiresProfile={false} />,
        children: [
          { path: 'profile-update', element: <ProfileSetup /> }, // 👈 only accessible if profile incomplete
        ]
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
