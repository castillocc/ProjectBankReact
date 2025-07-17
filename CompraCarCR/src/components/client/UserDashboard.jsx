
import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const UserDashboard = () => {
  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-6">Panel del Usuario</h1>
      <div className="flex flex-col gap-4">
        <Link to="/mis-vehiculos" className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-center">
          Mis Vehículos
        </Link>
        <Link to="/subir-vehiculo" className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-center">
          Subir Nuevo Vehículo
        </Link>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
