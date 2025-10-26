// src/components/ProtectedRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ requiresProfile }) {
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  if (!user) return <Navigate to="/login" />;

  // Check if the user’s profile is marked as complete
  const isProfileComplete = user.profileComplete;

  if (requiresProfile && !isProfileComplete) {
    // trying to access /home without completing profile
    return <Navigate to="/profile-update" />;
  }

  if (!requiresProfile && isProfileComplete) {
    // trying to access /profile-update but already completed
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
