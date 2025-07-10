import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CarDetails from "./components/CarDetails";
import Acerca from "./components/Acerca";
import Usados from "./components/Usados";
import Seminuevos from "./components/Seminuevos";
import Login from "./components/Login";
import Registro from "./components/Registro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/vehiculos/usados" element={<Usados />} />
        <Route path="/vehiculos/seminuevos" element={<Seminuevos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vehiculo/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
