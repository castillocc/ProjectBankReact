import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/auth/Login";
import UserDashboard from "../components/client/UserDashboard";
import Unauthorized from "../components/admin/Unauthorized";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminDashboard from "../components/admin/AdminDashboard";
import Landing from '../components/home/LandingPage.jsx';
import About from '../components/home/About.jsx';
import VehicleCatalog from "../components/vehicles/Catalog/VehicleCatalog.jsx";
import VehicleDetail from "../components/vehicles/Detail/VehicleDetail.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas con Layout */}
      <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
      <Route path="/acerca" element={<MainLayout><About /></MainLayout>} />
      <Route path="/vehiculos" element={<MainLayout><VehicleCatalog /></MainLayout>} />
      <Route path="/vehiculo/:id" element={<MainLayout><VehicleDetail /></MainLayout>} /> 

      {/* Públicas sin layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Cliente */}
      <Route path="/panel-usuario" element={<UserDashboard />} />

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
