import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import {
  addFavorite,
  removeFavorite,
  getFavoriteCount,
} from "../../services/FavoriteService";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VehicleCard = ({
  vehicle,
  onEdit,
  onDelete,
  showActions = false,
  enableFavorites = false,
  compact = false,
}) => {
  const images = vehicle.images || [];
  const { user } = useUser();
  const [favorited, setFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(vehicle.favorites?.length || 0);

  useEffect(() => {
    let isMounted = true;
    const checkFavorite = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(
          `http://localhost:3000/favorites?userId=${user.id}&vehicleId=${vehicle.id}`
        );
        if (!isMounted) return;
        if (data.length > 0) {
          setFavorited(true);
          setFavoriteId(data[0].id);
        }
      } catch (error) {
        console.error("Error al verificar favorito:", error);
      }
    };

    const fetchFavoriteCount = async () => {
      try {
        const count = await getFavoriteCount(vehicle.id);
        if (isMounted) setFavoriteCount(count);
      } catch (error) {
        console.error("Error al obtener el conteo de favoritos:", error);
      }
    };

    checkFavorite();
    fetchFavoriteCount();

    return () => {
      isMounted = false;
    };
  }, [user, vehicle.id]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      if (favorited) {
        await removeFavorite(favoriteId);
        setFavorited(false);
        setFavoriteId(null);
      } else {
        const res = await addFavorite(user.id, vehicle.id);
        setFavorited(true);
        setFavoriteId(res.data.id);
      }
      const count = await getFavoriteCount(vehicle.id);
      setFavoriteCount(count);
    } catch (error) {
      console.error("Error al cambiar estado de favorito:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 relative ${
        compact ? "max-w-sm" : "max-w-xs"
      }`}
    >
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
                  className="w-full h-48 object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src="https://via.placeholder.com/400x300?text=Sin+imagen"
                alt="placeholder"
                className="w-full h-48 object-cover"
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
        <div className="text-indigo-600 font-bold mb-3">
          ${parseInt(vehicle.price).toLocaleString()}
        </div>

        {/* Métricas: vistas y favoritos */}
        <div className="flex justify-between text-sm text-gray-500 mb-2 items-center">
          <span className="flex items-center gap-1 text-lg">
            <FaEye className="text-gray-400" /> {vehicle.views || 0} vistas
          </span>
          {enableFavorites && (
            <span
              onClick={handleFavorite}
              title={favorited ? "Eliminar de favoritos" : "Agregar a favoritos"}
              className={`flex items-center gap-1 text-lg cursor-pointer transition-transform duration-300 group ${
                favorited ? "scale-110 text-pink-500" : "hover:text-pink-600"
              }`}
            >
              <span className="group-hover:animate-pulse">
                {favorited ? <FaHeart /> : <FaRegHeart />}
              </span>
              {favoriteCount}
            </span>
          )}
        </div>

        {/* Botones de acción */}
        {showActions && (
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
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
