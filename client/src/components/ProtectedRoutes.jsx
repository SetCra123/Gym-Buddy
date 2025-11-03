// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
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

  // Pull key fields for checking profile progress
  const { height, weight, goal, fitness_level, profileComplete } = user;

  // ✅ Determine where they should go next
  if (!height || !weight) {
    return <Navigate to="/profile-update" />;
  }

  if (!goal) {
    return <Navigate to="/goals" />;
  }

  if (!fitness_level) {
    return <Navigate to="/fitness-level" />;
  }

  if (profileComplete) {
    return <Outlet />; // profile complete → continue to home or whatever route
  }

  // ✅ Default fallback if none of the above triggered
  return <Navigate to="/profile-update" />;
}
