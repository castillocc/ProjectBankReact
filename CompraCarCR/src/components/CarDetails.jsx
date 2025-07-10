import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCarById } from "../context/slice/CarSlice.jsx";

const CarDetails = () => {
    const { id } = useParams();
    const car = useSelector(selectCarById(id));

    if (!car) return <div className="p-8 text-center">Vehículo no encontrado</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
        <img src={car.image} alt={car.name} className="w-full rounded-xl mb-6" />
        <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
        <p className="text-blue-600 text-xl font-semibold mb-4">{car.price}</p>
        <p className="text-gray-700">{car.description}</p>
        </div>
    );
};

export default CarDetails;
