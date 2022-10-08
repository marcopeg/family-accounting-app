import { useAuthenticationStatus } from "@nhost/react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  fallbackUrl = "/login",
  Loading = () => "loading..."
}) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackUrl} state={{ from: location }} replace />;
  }

  return children;
};
