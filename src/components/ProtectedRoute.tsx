import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/signup" replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
