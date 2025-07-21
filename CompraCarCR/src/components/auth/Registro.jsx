import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Registro = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    direction: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      name: form.name,
      birthdate: form.birthdate,
      direction: form.direction,
      email: form.email,
      password: form.password,
      role: "cliente",
    };

    const res = await register(newUser);
    if (res.success) {
      navigate("/panel-usuario");
    } else {
      setError(res.message);
    }
  };

  return (
    <motion.div className="max-w-md mx-auto p-6 bg-white shadow rounded" 
      style={{marginTop: "150px"}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Nombre Completo" className="w-full border px-4 py-2 rounded" value={form.name} onChange={handleChange} required />
        <input type="date" name="birthdate" className="w-full border px-4 py-2 rounded" value={form.birthdate} onChange={handleChange} required />
        <input type="text" name="direction" placeholder="Dirección" className="w-full border px-4 py-2 rounded" value={form.direction} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" className="w-full border px-4 py-2 rounded" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="w-full border px-4 py-2 rounded" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Verificar Contraseña" className="w-full border px-4 py-2 rounded" value={form.confirmPassword} onChange={handleChange} required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Registrarse
        </button>
      </form>
      <p className="text-sm mt-4">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
                Iniciá sesión
            </Link>
        </p>      
    </motion.div>
  );
};

export default Registro;