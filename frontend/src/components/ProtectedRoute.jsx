import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps private routes; redirects to /login when there is no logged-in user
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
