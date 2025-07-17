
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/users" className="bg-blue-600 text-white p-6 rounded-xl text-center hover:bg-blue-700">
          Gestión de Usuarios
        </Link>
        <Link to="/admin/roles" className="bg-green-600 text-white p-6 rounded-xl text-center hover:bg-green-700">
          Gestión de Roles
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
