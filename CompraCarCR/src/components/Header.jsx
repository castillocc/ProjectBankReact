import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [showVehiculos, setShowVehiculos] = useState(false);
const [showLogin, setShowLogin] = useState(false);

const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

const closeMenus = () => {
setShowVehiculos(false);
setShowLogin(false);
setMobileMenuOpen(false);
};

return (
  <header className="bg-purple-800 text-white px-6 py-4 shadow-md">
  <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
<Link to="/" className="text-2xl font-bold">
CompraCarCR
</Link>
  {/* Desktop menu */}
    <nav className="hidden md:flex gap-6 relative">
      <Link to="/" className="hover:text-gray-200">Inicio</Link>
      <Link to="/acerca" className="hover:text-gray-200">Acerca de</Link>

      <div
        className="relative"
        onMouseEnter={() => setShowVehiculos(true)}
        onMouseLeave={() => setShowVehiculos(false)}
      >
        <button className="hover:text-gray-200">Vehículos ▾</button>
        {showVehiculos && (
          <div className="absolute bg-white text-black mt-2 shadow-md rounded w-52 z-10">
            <Link to="/vehiculos/usados" className="block px-4 py-2 hover:bg-gray-100">Vehículos Usados</Link>
            <Link to="/vehiculos/seminuevos" className="block px-4 py-2 hover:bg-gray-100">Vehículos Seminuevos</Link>
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowLogin(true)}
        onMouseLeave={() => setShowLogin(false)}
      >
        <button className="hover:text-gray-200">Login ▾</button>
        {showLogin && (
          <div className="absolute bg-white text-black mt-2 shadow-md rounded w-48 z-10">
            <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Iniciar Sesión</Link>
            <Link to="/registro" className="block px-4 py-2 hover:bg-gray-100">Crear Usuario</Link>
          </div>
        )}
      </div>
    </nav>

    {/* Mobile menu button */}
    <button
      className="md:hidden text-2xl focus:outline-none"
      onClick={toggleMobileMenu}
    >
      ☰
    </button>
  </div>

  {/* Mobile menu */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-purple-700 text-white px-6 pb-4 space-y-2">
      <Link to="/" onClick={closeMenus} className="block py-2 hover:text-gray-200">Inicio</Link>
      <Link to="/acerca" onClick={closeMenus} className="block py-2 hover:text-gray-200">Acerca de</Link>

      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-gray-200">Vehículos</summary>
        <div className="pl-4">
          <Link to="/vehiculos/usados" onClick={closeMenus} className="block py-1 hover:text-gray-200">Usados</Link>
          <Link to="/vehiculos/seminuevos" onClick={closeMenus} className="block py-1 hover:text-gray-200">Seminuevos</Link>
        </div>
      </details>

      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-gray-200">Login</summary>
        <div className="pl-4">
          <Link to="/login" onClick={closeMenus} className="block py-1 hover:text-gray-200">Iniciar Sesión</Link>
          <Link to="/registro" onClick={closeMenus} className="block py-1 hover:text-gray-200">Crear Usuario</Link>
        </div>
      </details>
    </div>
  )}
</header>
  );
};

export default Header;