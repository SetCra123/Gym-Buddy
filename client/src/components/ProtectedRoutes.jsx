// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const location = useLocation();
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const { age, height, weight, goal, fitness_level, profileComplete } = user;

  // ✅ If profile complete, allow normal access to app
  if (profileComplete) return <Outlet />;

  // ✅ If missing basic info and not already on /profile-update → redirect there
  if ((!age || !height || !weight) && location.pathname !== "/profile-update") {
    return <Navigate to="/profile-update" />;
  }

  // ✅ If missing goal and not already on /goals → redirect there
  if (!goal && location.pathname !== "/goals") {
    return <Navigate to="/goals" />;
  }

  // ✅ If missing fitness level and not already on /fitness-level → redirect there
  if (!fitness_level && location.pathname !== "/fitness-level") {
    return <Navigate to="/fitness-level" />;
  }

  // ✅ Otherwise render the intended route
  return <Outlet />;
}
