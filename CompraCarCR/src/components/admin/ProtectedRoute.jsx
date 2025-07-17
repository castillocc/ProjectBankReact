import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useUser();

  // Verifica que el usuario exista y tenga el rol correcto
  if (!user || !user.role || user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
