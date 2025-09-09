import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ requiresProfile }) {
  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  if (!user) return <Navigate to="/login" />;

  // check if user has completed profile
  if (requiresProfile && !user.profileComplete) {
    return <Navigate to="/profile-update" />;
  }

  return <Outlet />;
}
