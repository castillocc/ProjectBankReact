
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Acceso no autorizado</h1>
      <p className="mb-4">No tenés permiso para ver esta sección.</p>
      <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
    </div>
  );
};

export default Unauthorized;
