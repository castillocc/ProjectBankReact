import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, selectCars } from "../../../context/slice/CarSlice";
import VehicleCard from "./VehicleCard";
import { Link } from "react-router-dom";

const VehicleCatalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Vehículos</h1>
      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No hay vehículos disponibles en este momento.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {cars.map((car) => (
            <Link key={car.id} to={`/vehiculo/${car.id}`}>
              <VehicleCard car={car} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleCatalog;
