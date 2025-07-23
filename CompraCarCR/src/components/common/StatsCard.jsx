// components/common/StatsCard.jsx
import { FaEye, FaStar, FaCalendarAlt } from "react-icons/fa";

export default function StatsCard({ views = 0, favorites = 0, date }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600 grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <FaEye className="text-indigo-500" />
        <span>{views} vistas</span>
      </div>
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        <span>{favorites} favoritos</span>
      </div>
      {date && (
        <div className="flex items-center gap-2 col-span-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>Publicado: {new Date(date).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
}
