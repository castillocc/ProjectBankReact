import React from "react";
import { useSelector } from "react-redux";

export default function VehicleStepThree({ error }) {
  const formData = useSelector((state) => state.vehicleForm);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Revisión Final</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Título:</strong> {formData.title}</p>
        <p><strong>Marca:</strong> {formData.brand}</p>
        <p><strong>Modelo:</strong> {formData.model}</p>
        <p><strong>Año:</strong> {formData.year}</p>
        <p><strong>Precio:</strong> ${formData.price}</p>
        <p><strong>Combustible:</strong> {formData.fuelType}</p>
        <p><strong>Tipo de Vehículo:</strong> {formData.vehicleType}</p>
      </div>

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

      {formData.video && (
        <div>
          <label className="block font-medium mb-2">Video:</label>
          <p className="text-green-600">🎥 Video cargado correctamente</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
