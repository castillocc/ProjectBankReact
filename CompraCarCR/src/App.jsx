import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CarDetails from "./components/CarDetails";
import Acerca from "./components/Acerca";
import Usados from "./components/Usados";
import Seminuevos from "./components/Seminuevos";
import Login from "./components/Login";
import Registro from "./components/Registro";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto: redirige a login */}
        <Route path="/" element={<Login />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/vehiculos/usados" element={<Usados />} />
        <Route path="/vehiculos/seminuevos" element={<Seminuevos />} />
        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
         {/* Ruta protegida: Landing solo si está logueado */}
        <Route
          path="/inicio"
          element={user ? <Landing /> : <Login />}
        />
        <Route path="/vehiculo/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
