import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import ProfileSetup from "./pages/ProfileSetup";
import GoalSelection from "./pages/GoalSelection";
import ProtectedRoute from "./components/ProtectedRoutes"; // ✅ renamed to match component name
import FitnessLevelSelection from "./pages/FitnessSelection";

// You can later add an Error component if you have one
// import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      // Public routes
      {
        index: true,
        element: <Login />, // Landing page shows Login by default
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },

      // Protected routes (user must be logged in)
      {
        element: <ProtectedRoute requiresProfile={true} />,
        children: [
          { path: "home", element: <Home /> },
          { path: "goals", element: <GoalSelection /> }, // ✅ user must have profile to access
          { path: "fitness-level", element: <FitnessLevelSelection /> }, // ✅ user must have profile to access
        ],
      },

      // Route for profile setup (incomplete profile)
      {
        element: <ProtectedRoute requiresProfile={false} />,
        children: [
          { path: "profile-update", element: <ProfileSetup /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
