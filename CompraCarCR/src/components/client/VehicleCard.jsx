import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  const images = vehicle.images || [];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-xs hover:shadow-lg transition-all duration-200 relative">
      {/* Carrusel con Swiper */}
      <div className="relative w-full object-cover overflow-hidden rounded-t-xl">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {images.length > 0 ? (
            images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`vehicle-${vehicle.id}-img-${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src="https://via.placeholder.com/400x300?text=Sin+imagen"
                alt="placeholder"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Información del vehículo */}
      <div className="p-4 text-gray-700">
        <h3 className="text-lg font-semibold text-purple-700 mb-1">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          Año {vehicle.year} • {vehicle.fuelType} • {vehicle.vehicleType}
        </p>
        <div className="text-indigo-600 font-bold mb-3">${vehicle.price}</div>

        {/* Métricas: vistas y favoritos */}
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>👁 {vehicle.views || 0} vistas</span>
          <span>⭐ {vehicle.favorites || 0} favoritos</span>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit?.(vehicle)}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete?.(vehicle)}
            className="flex items-center gap-1 bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-3 py-1 rounded text-sm"
          >
            🗑️ Eliminar
          </button>
        </div>


      </div>
    </div>
  );
};

export default VehicleCard;
