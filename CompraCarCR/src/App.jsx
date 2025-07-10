import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CarDetails from "./components/CarDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/vehiculo/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
