import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import NotFound from "../components/common/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Fallback 404 para admin */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
