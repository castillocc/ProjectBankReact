import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import UserDashboard from "../components/client/UserDashboard";
import MyVehicles from "../components/client/MyVehicles";
import UploadVehicle from "../components/client/UploadVehicle";
import Unauthorized from "../components/admin/Unauthorized";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "../components/admin/ProtectedRoute";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/panel-usuario"
        element={
          <ProtectedRoute role="cliente">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mis-vehiculos"
        element={
          <ProtectedRoute role="cliente">
            <MyVehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subir-vehiculo"
        element={
          <ProtectedRoute role="cliente">
            <UploadVehicle />
          </ProtectedRoute>
        }
      />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
