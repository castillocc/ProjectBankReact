import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCar, FaCalendarAlt, FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import InfoBlock from "./InfoBlock";
import VehicleGallerySwiper from "./VehicleGallerySwiper";
import { getVehicleById } from "../../../services/VehicleService";

const VehicleDetail = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await getVehicleById(id);
                setVehicle(data);
            } catch (error) {
                console.error("Error al obtener vehículo:", error);
            }
        };

        fetchVehicle();
    }, [id]);

    if (!vehicle) return <p className="text-center mt-10">Cargando vehículo...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">{vehicle.title}</h1>

            <VehicleGallerySwiper images={vehicle.images} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                <InfoBlock icon={FaCalendarAlt} label="Año" value={vehicle.year} />
                <InfoBlock icon={FaGasPump} label="Combustible" value={vehicle.fuelType} />
                <InfoBlock icon={FaCogs} label="Transmisión" value={vehicle.transmission} />
                <InfoBlock icon={FaRoad} label="Tracción" value={vehicle.drivetrain} />
                <InfoBlock icon={FaCar} label="Marca" value={vehicle.brand} />
                <InfoBlock icon={FaCar} label="Modelo" value={vehicle.model} />
                <InfoBlock icon={FaCar} label="Precio" value={`₡${parseInt(vehicle.price).toLocaleString()}`} />
            </div>
        </div>
    );
};

export default VehicleDetail;
