import React, { useEffect, useState } from "react";
import { getVehicleTypes } from "../../services/vehicleTypeService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VehicleStepOne({ data, onChange, errors = {} }) {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [sections, setSections] = useState({
        general: true,
        tech: false,
        category: false,
    });

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

    useEffect(() => {
        const { brand, model, year } = data;
        if (brand && model && year) {
            const autoTitle = `${brand} ${model} ${year}`;
            onChange({ target: { name: "title", value: autoTitle } });
        }
    }, [data.brand, data.model, data.year]);

    const toggleSection = (key) => {
        setSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const sectionBoxStyle = "border rounded-xl p-4 bg-white shadow-sm";

    return (
        <div className="space-y-6">
            {/* Información General */}
            <div className={sectionBoxStyle}>
                <button
                    onClick={() => toggleSection("general")}
                    className="w-full text-left text-lg font-semibold text-gray-700 mb-4"
                >
                    📝 Información general {sections.general ? "▲" : "▼"}
                </button>
                {sections.general && (
                    <div className="grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-4 items-center">
                        <label htmlFor="brand" className="label">Marca</label>
                        <input
                            id="brand"
                            name="brand"
                            value={data.brand || ""}
                            onChange={onChange}
                            placeholder="Ej. Toyota"
                            className="input"
                        />
                        {errors.brand && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.brand}</span>}

                        <label htmlFor="model" className="label">Modelo</label>
                        <input
                            id="model"
                            name="model"
                            value={data.model || ""}
                            onChange={onChange}
                            placeholder="Ej. Hilux"
                            className="input"
                        />
                        {errors.model && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.model}</span>}

                        <label htmlFor="year" className="label">Año</label>
                        <DatePicker
                            selected={data.year ? new Date(data.year, 0) : null}
                            onChange={(date) => onChange({ target: { name: "year", value: date.getFullYear() } })}
                            showYearPicker
                            dateFormat="yyyy"
                            placeholderText="Selecciona el año"
                            className="input w-full"
                            yearItemNumber={12}
                        />
                        {errors.year && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.year}</span>}

                        <label htmlFor="title" className="label">Título (auto)</label>
                        <input
                            id="title"
                            name="title"
                            value={data.title || ""}
                            onChange={onChange}
                            className="input"
                            readOnly
                        />
                        {errors.title && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.title}</span>}

                        <label htmlFor="price" className="label">Precio (USD)</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={data.price || ""}
                            onChange={onChange}
                            placeholder="Ej. 25000"
                            className="input"
                        />
                        {errors.price && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.price}</span>}
                    </div>
                )}
            </div>

            {/* Especificaciones Técnicas */}
            <div className={sectionBoxStyle}>
                <button
                    onClick={() => toggleSection("tech")}
                    className="w-full text-left text-lg font-semibold text-gray-700 mb-4"
                >
                    🛠️ Especificaciones técnicas {sections.tech ? "▲" : "▼"}
                </button>
                {sections.tech && (
                    <div className="grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-4 items-center">
                        <label className="label">Tipo de Combustible</label>
                        <div className="flex gap-4">
                            {[
                                "Gasolina",
                                "Diésel",
                                "Eléctrico",
                            ].map((type) => (
                                <label key={type} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="fuelType"
                                        value={type}
                                        checked={data.fuelType === type}
                                        onChange={onChange}
                                        className="accent-purple-600"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                        {errors.fuelType && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.fuelType}</span>}

                        <label className="label">Transmisión</label>
                        <div className="flex gap-4">
                            {["Automática", "Manual"].map((type) => (
                                <label key={type} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="transmission"
                                        value={type}
                                        checked={data.transmission === type}
                                        onChange={onChange}
                                        className="accent-purple-600"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                        {errors.transmission && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.transmission}</span>}

                        <label htmlFor="drivetrain" className="label">Tipo de Tracción</label>
                        <select
                            id="drivetrain"
                            name="drivetrain"
                            value={data.drivetrain || ""}
                            onChange={onChange}
                            className="input"
                        >
                            <option value="">Selecciona una opción</option>
                            {["4x2", "4x4", "AWD", "FWD", "RWD"].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.drivetrain && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.drivetrain}</span>}
                    </div>
                )}
            </div>

            {/* Clasificación del Vehículo */}
            <div className={sectionBoxStyle}>
                <button
                    onClick={() => toggleSection("category")}
                    className="w-full text-left text-lg font-semibold text-gray-700 mb-4"
                >
                    🚗 Clasificación del vehículo {sections.category ? "▲" : "▼"}
                </button>
                {sections.category && (
                    <div className="grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-4 items-center">
                        <label htmlFor="vehicleType" className="label">Tipo de Vehículo</label>
                        <select
                            id="vehicleType"
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
                        {errors.vehicleType && <span className="col-span-2 text-red-500 text-sm">⚠️ {errors.vehicleType}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
