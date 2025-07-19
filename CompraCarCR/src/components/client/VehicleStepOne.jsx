import React, { useEffect, useState } from "react";
import { getVehicleTypes } from "../../services/vehicleTypeService";

export default function VehicleStepOne({ data, onChange, errors = {} }) {
    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const types = await getVehicleTypes();
                setVehicleTypes(types);
            } catch (error) {
                console.error("Error al cargar tipos de vehículo:", error);
            }
        };
        fetchTypes();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Título */}
            <div>
                <input
                    name="title"
                    value={data.title || ""}
                    onChange={onChange}
                    placeholder="Título del anuncio"
                    className="input"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Marca */}
            <div>
                <input
                    name="brand"
                    value={data.brand || ""}
                    onChange={onChange}
                    placeholder="Marca"
                    className="input"
                />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
            </div>

            {/* Modelo */}
            <div>
                <input
                    name="model"
                    value={data.model || ""}
                    onChange={onChange}
                    placeholder="Modelo"
                    className="input"
                />
                {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>

            {/* Año */}
            <div>
                <input
                    name="year"
                    value={data.year || ""}
                    onChange={onChange}
                    placeholder="Año"
                    type="number"
                    className="input"
                />
                {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            {/* Precio */}
            <div>
                <input
                    name="price"
                    value={data.price || ""}
                    onChange={onChange}
                    placeholder="Precio USD"
                    type="number"
                    className="input"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            {/* Tipo de Combustible */}
            <div className="col-span-2">
                <label className="block text-sm mb-1">Tipo de Combustible</label>
                <div className="flex gap-4">
                    {["Gasolina", "Diésel", "Eléctrico"].map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="fuelType"
                                value={type}
                                checked={data.fuelType === type}
                                onChange={onChange}
                            />
                            {type}
                        </label>
                    ))}
                </div>
                {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType}</p>}
            </div>

            {/* Tipo de Vehículo */}
            <div className="col-span-2">
                <label className="block text-sm mb-1">Tipo de Vehículo</label>
                <select
                    name="vehicleType"
                    value={data.vehicleType || ""}
                    onChange={onChange}
                    className="input"
                >
                    <option value="">Selecciona una opción</option>
                    {vehicleTypes.map((vt) => (
                        <option key={vt.id} value={vt.name}>{vt.name}</option>
                    ))}
                </select>
                {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
            </div>
        </div>
    );
}
