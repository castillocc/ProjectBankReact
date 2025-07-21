import React from "react";
import { FaHeart } from "react-icons/fa";

const VehicleCard = ({ car }) => {
  const imageSrc = car.images?.[0] || "/images/no-image.png";
  const priceFormatted = `₡${parseInt(car.price).toLocaleString()}`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={imageSrc}
        alt={car.title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = "/images/fallback.jpg"; }}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold flex items-center justify-between mb-1">
          {car.title}
          {car.favorites && (
            <span className="text-red-500 text-sm flex items-center gap-1">
              <FaHeart /> {car.favorites}
            </span>
          )}
        </h3>
        <p className="text-blue-600 font-bold mb-1">{priceFormatted}</p>
        <p className="text-gray-600 text-sm">
          {car.year} • {car.brand} • {car.fuelType}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
