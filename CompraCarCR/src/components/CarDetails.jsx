import React from "react";
import { useParams } from "react-router-dom";

const carData = {
    1: {
        name: "Toyota Corolla 2023",
        price: "$22,500",
        image: "https://via.placeholder.com/600x350?text=Toyota+Corolla",
        description: "Auto confiable, ideal para ciudad y carretera. Gran rendimiento de combustible.",
    },
    2: {
        name: "Hyundai Venue 2022",
        price: "$19,800",
        image: "https://via.placeholder.com/600x350?text=Hyundai+Venue",
        description: "SUV compacto, excelente para familias y aventuras urbanas.",
    },
    3: {
        name: "Kia Sportage 2024",
        price: "$28,700",
        image: "https://via.placeholder.com/600x350?text=Kia+Sportage",
        description: "Diseño moderno, gran espacio interior y tecnología de punta.",
    },
};

const CarDetails = () => {
    const { id } = useParams();
    const car = carData[id];

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
