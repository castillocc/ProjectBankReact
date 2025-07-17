
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const roles = ["admin", "cliente"];

const UserForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [user, setUser] = useState({ name: "", email: "", role: "cliente" });

  useEffect(() => {
    if (isEdit) {
      // Aquí podrías hacer un fetch real
      setUser({ name: "Juan Pérez", email: "juan@example.com", role: "admin" });
    }
  }, [id]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Guardar usuario:", user);
    // Aquí podés hacer POST o PUT a la API
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={user.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={user.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
