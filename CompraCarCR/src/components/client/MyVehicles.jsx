
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const MyVehicles = () => {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vehicles?userId=" + user.id)
      .then(res => res.json())
      .then(setVehicles)
      .catch(console.error);
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Vehículos Subidos</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {vehicles.map((v) => (
          <li key={v.id} className="border p-4 rounded">
            <h3 className="font-semibold">{v.modelo} ({v.marca})</h3>
            <p className="text-sm text-gray-600">{v.descripcion}</p>
            <p className="text-blue-600 font-bold mt-2">${v.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyVehicles;
