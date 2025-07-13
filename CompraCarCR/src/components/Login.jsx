import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/compracarcr.svg";

const API_URL = "http://localhost:3000/users";

const Login = () => {
const { login } = useUser();
const navigate = useNavigate();

const [isRegister, setIsRegister] = useState(false);
const [form, setForm] = useState({ email: "", password: "" });
const [error, setError] = useState("");

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
setError("");
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!form.email || !form.password) {
  setError("Todos los campos son obligatorios");
  return;
}

try {
  if (isRegister) {
    // Verificar si ya existe el usuario
    const existing = await axios.get(`${API_URL}?email=${form.email}`);
    if (existing.data.length > 0) {
      setError("Este correo ya está registrado");
      return;
    }

    // Crear usuario
    const res = await axios.post(API_URL, form);
    login(res.data);
    navigate("/");
  } else {
    // Login
    const res = await axios.get(
      `${API_URL}?email=${form.email}&password=${form.password}`
    );
    if (res.data.length === 0) {
      setError("Usuario o contraseña incorrectos");
    } else {
      login(res.data[0]);
      navigate("/");
    }
  }
} catch (err) {
  console.error(err);
  setError("Ocurrió un error al conectarse con el servidor");
}

};

return (
<div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded text-center"> 
    <img src={logo} alt="Logo CompraCarCR" className="mx-auto w-16 h-16 mb-2" /> 
    <h1 className="text-xl font-bold text-blue-600 mb-4">CompraCarCR</h1>
<h2 className="text-2xl font-bold mb-4">
{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
</h2>
<form onSubmit={handleSubmit} className="space-y-4 text-left">
    <input
      name="email"
      type="email"
      placeholder="Correo electrónico"
      value={form.email}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
    />
    <input
      name="password"
      type="password"
      placeholder="Contraseña"
      value={form.password}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
    />

    {error && <p className="text-red-600">{error}</p>}

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      {isRegister ? "Registrarse" : "Iniciar Sesión"}
    </button>
  </form>

  <div className="mt-4 text-sm text-center">
    {isRegister ? (
      <p>
        ¿Ya tienes una cuenta?{" "}
        <button
          onClick={() => setIsRegister(false)}
          className="text-blue-600 underline"
        >
          Iniciar sesión
        </button>
      </p>
    ) : (
      <p>
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => setIsRegister(true)}
          className="text-blue-600 underline"
        >
          Crear cuenta
        </button>
      </p>
    )}
  </div>
</div>
);
};

export default Login;