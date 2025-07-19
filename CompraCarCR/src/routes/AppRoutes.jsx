import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/auth/Login";
import UserDashboard from "../components/client/UserDashboard";
import Unauthorized from "../components/admin/Unauthorized";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminDashboard from "../components/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Navigate to="/panel-usuario" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Cliente */}
      <Route
        path="/panel-usuario"
        element={
            <UserDashboard />
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
