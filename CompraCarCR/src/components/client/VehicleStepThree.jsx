import InfoBlock from "../common/InfoBlock";
import {
  FaCalendarAlt,
  FaGasPump,
  FaCogs,
  FaRoad,
  FaCar,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function VehicleStepThree({ error }) {
  const formData = useSelector((state) => state.vehicleForm);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Revisión Final</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBlock icon={FaCalendarAlt} label="Año" value={formData.year} />
        <InfoBlock icon={FaGasPump} label="Combustible" value={formData.fuelType} />
        <InfoBlock icon={FaCogs} label="Transmisión" value={formData.transmission} />
        <InfoBlock icon={FaRoad} label="Tracción" value={formData.drivetrain} />
        <InfoBlock icon={FaCar} label="Marca" value={formData.brand} />
        <InfoBlock icon={FaCar} label="Modelo" value={formData.model} />
        <InfoBlock icon={FaCar} label="Precio" value={`₡${parseInt(formData.price).toLocaleString()}`} />
        <InfoBlock icon={FaCar} label="Tipo Vehículo" value={formData.vehicleType} />
      </div>

      {/* Imágenes */}
      <div>
        <label className="block font-medium mb-2">Imágenes:</label>
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`preview-${index}`}
              className="w-24 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* Video */}
      {formData.video && (
        <div>
          <label className="block font-medium mb-2">Video:</label>
          <p className="text-green-600">🎥 Video cargado correctamente</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
