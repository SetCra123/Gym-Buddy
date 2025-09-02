import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ requiresProfile }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  const isProfileComplete = user.age && user.height && user.goal && user.weight && user.fitness_type; 

  if (requiresProfile && !isProfileComplete) {
    return <Navigate to="/profile-update" replace />;
  }

  
  return <Outlet />;
}
