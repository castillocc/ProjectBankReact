
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../context/UserContext";
import CarLoader from "../common/CarLoader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const schema = yup.object().shape({
  email: yup.string().email("Correo inválido").required("Correo requerido"),
  password: yup.string().min(4, "Mínimo 4 caracteres").required("Contraseña requerida"),
});

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const success = await login(data.email, data.password);
    setLoading(false);
    if (success) {
      navigate("/panel-usuario");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
      style={{marginTop: "200px"}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      {loading && <CarLoader />}
      {!loading && (
        <>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Correo"
              {...register("email")}
              className="w-full border p-2 rounded"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>

            <input
              type="password"
              placeholder="Contraseña"
              {...register("password")}
              className="w-full border p-2 rounded"
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
            >
              Ingresar
            </button>
          </form>
          <p className="text-sm mt-4">
            ¿No tenés cuenta?{" "}
            <Link to="/registro" className="text-purple-600 hover:underline">
                Registrarse
            </Link>
          </p>
        </>
      )}
    </motion.div>
  );
};

export default Login;
