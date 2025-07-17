
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

const UploadVehicle = () => {
  const { user } = useUser();
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    descripcion: "",
    precio: "",
    imagenes: [],
    video: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "imagenes") {
      setForm({ ...form, imagenes: Array.from(e.target.files).slice(0, 5) });
    } else if (e.target.name === "video") {
      setForm({ ...form, video: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("marca", form.marca);
    data.append("modelo", form.modelo);
    data.append("descripcion", form.descripcion);
    data.append("precio", form.precio);
    data.append("userId", user.id);
    form.imagenes.forEach((img, idx) => data.append("imagenes", img));
    if (form.video) data.append("video", form.video);

    await fetch("http://localhost:3000/vehicles", {
      method: "POST",
      body: data
    });

    alert("Vehículo subido exitosamente");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Subir Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" name="marca" placeholder="Marca" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="modelo" placeholder="Modelo" onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="precio" placeholder="Precio" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="file" name="imagenes" multiple accept="image/*" onChange={handleFileChange} className="w-full" required />
        <input type="file" name="video" accept="video/*" onChange={handleFileChange} className="w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Subir Vehículo
        </button>
      </form>
    </div>
  );
};

export default UploadVehicle;
