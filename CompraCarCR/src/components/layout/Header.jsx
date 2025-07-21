import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/compracarcr.svg"; // importar imagen
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
const [mobileOpen, setMobileOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState(null);
const menuRef = useRef(null);
const { user, logout } = useUser();
const navigate = useNavigate();

const toggleDropdown = (menu) => {
setOpenDropdown((prev) => (prev === menu ? null : menu));
};

const handleLogout = () => {
logout();
setMobileOpen(false);
navigate("/");
};

useEffect(() => {
const closeOnClickOutside = (e) => {
if (menuRef.current && !menuRef.current.contains(e.target)) {
setOpenDropdown(null);
setMobileOpen(false);
}

};
document.addEventListener("mousedown", closeOnClickOutside);
return () => document.removeEventListener("mousedown", closeOnClickOutside);
}, []);

return (
<header className="bg-purple-800 text-white px-6 py-4 shadow-md" ref={menuRef}>
<div className="max-w-7xl mx-auto flex items-center justify-between p-4">
{/* Logo y Marca a la izquierda */}
<Link to="/" className="flex items-center space-x-2">
<img src={logo} alt="Logo" className="w-10 h-10" />
<span className="text-xl font-bold text-white">CompraCarCR</span>
</Link>
{/* Botón hamburguesa visible solo en móvil */}
    <button
      className="md:hidden text-white focus:outline-none"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {mobileOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>

    {/* Menú desktop a la derecha */}
    <nav className="hidden md:flex space-x-6 items-center">
      <Link to="/" className="hover:text-purple-600 font-medium">
        Inicio
      </Link>
      <Link to="/acerca" className="hover:text-purple-600 font-medium">
        Acerca de
      </Link>

      {/* Submenú Vehículos */}

      {(() => {
        if (user != null && user.role == "admin") {
          return <div className="relative">
                  <button
                    onClick={() => toggleDropdown("vehiculos")}
                    className="hover:text-purple-600 font-medium"
                  >
                    Vehículos
                  </button>
                  {openDropdown === "vehiculos" && (
                    <div className="absolute bg-purple-600 shadow rounded mt-2 z-10">
                      <Link
                        to="/vehiculos/usados"
                        className="block px-4 py-2 hover:bg-purple-700"
                      >
                        Usados
                      </Link>
                      <Link
                        to="/vehiculos/seminuevos"
                        className="block px-4 py-2 hover:bg-purple-700"
                      >
                        Seminuevos
                      </Link>
                    </div>
                  )}
                </div>;
        }
      })()}

      {/* Submenú Login */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("login")}
          className="flex items-center gap-4 hover:text-purple-600 font-medium"
        >          
          <span>{user ? user.email : "Login"}</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="rounded-full w-10 h-10"
          />
        </button>
        {openDropdown === "login" && (
          <div className="absolute bg-purple-600 shadow rounded mt-2 z-10">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-purple-700"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="block px-4 py-2 hover:bg-purple-700"
                >
                  Crear Usuario
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-purple-700"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  </div>

  {/* Menú móvil debajo (colapsable) */}
  {mobileOpen && (
    <div className="md:hidden bg-purple-700 border-t px-4 py-4 space-y-3">
      <Link
        to="/"
        className="block text-white font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Inicio
      </Link>
      <Link
        to="/acerca"
        className="block text-white font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Acerca de
      </Link>

      <div>
        <button
          onClick={() => toggleDropdown("vehiculos")}
          className="font-medium text-white"
        >
          Vehículos
        </button>
        {openDropdown === "vehiculos" && (
          <div className="pl-4 mt-2 space-y-2">
            <Link
              to="/vehiculos/usados"
              onClick={() => setMobileOpen(false)}
              className="block text-white"
            >
              Usados
            </Link>
            <Link
              to="/vehiculos/seminuevos"
              onClick={() => setMobileOpen(false)}
              className="block text-white"
            >
              Seminuevos
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleDropdown("login")}
          className="font-medium text-white"
        >
          {user ? user.email : "Login"}
        </button>
        {openDropdown === "login" && (
          <div className="pl-4 mt-2 space-y-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-white"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setMobileOpen(false)}
                  className="block text-white"
                >
                  Crear Usuario
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block text-left text-white"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )}
</header>
);
};

export default Header;