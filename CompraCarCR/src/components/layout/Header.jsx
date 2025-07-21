import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/compracarcr.svg";
import { useUser } from "../../context/UserContext";
import { FaBars, FaTimes, FaUserCircle, FaCarSide, FaInfoCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

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
    <header className="bg-purple-800 text-white shadow-md sticky top-0 z-50" ref={menuRef}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}>
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">CompraCarCR</span>
        </Link>

        {/* Hamburger icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className="hover:underline" onClick={() => setOpenDropdown(null)}>
            <FaCarSide className="inline mr-1" /> Inicio
          </Link>
          <Link to="/acerca" className="hover:underline" onClick={() => setOpenDropdown(null)}>
            <FaInfoCircle className="inline mr-1" /> Acerca de
          </Link>

          {/* Vehículos Admin */}
          {user?.role === "admin" && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("vehiculos")}
                className="hover:underline"
              >
                Vehículos
              </button>
              {openDropdown === "vehiculos" && (
                <div className="absolute bg-purple-600 shadow rounded mt-2 z-10">
                  <Link to="/vehiculos/usados" className="block px-4 py-2 hover:bg-purple-700">Usados</Link>
                  <Link to="/vehiculos/seminuevos" className="block px-4 py-2 hover:bg-purple-700">Seminuevos</Link>
                </div>
              )}
            </div>
          )}

          {/* Login Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("login")}
              className="flex items-center gap-2 hover:underline"
            >
              <FaUserCircle className="text-xl" />
              <span>{user ? user.email : "Login"}</span>
            </button>
            {openDropdown === "login" && (
              <div className="absolute bg-purple-600 shadow rounded mt-2 z-10">
                {!user ? (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-purple-700">
                      <FaSignInAlt className="inline mr-2" /> Iniciar Sesión
                    </Link>
                    <Link to="/registro" className="block px-4 py-2 hover:bg-purple-700">
                      Crear Usuario
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-700"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Cerrar sesión
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-purple-700 border-t px-4 py-4 space-y-3 text-sm font-medium">
          <Link
            to="/"
            className="block text-white"
            onClick={() => {
              setMobileOpen(false);
              setOpenDropdown(null);
            }}
          >
            <FaCarSide className="inline mr-2" /> Inicio
          </Link>
          <Link
            to="/acerca"
            className="block text-white"
            onClick={() => {
              setMobileOpen(false);
              setOpenDropdown(null);
            }}
          >
            <FaInfoCircle className="inline mr-2" /> Acerca de
          </Link>

          {user?.role === "admin" && (
            <div>
              <button
                onClick={() => toggleDropdown("vehiculos")}
                className="font-medium text-white"
              >
                Vehículos
              </button>
              {openDropdown === "vehiculos" && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link to="/vehiculos/usados" onClick={() => setMobileOpen(false)} className="block text-white">Usados</Link>
                  <Link to="/vehiculos/seminuevos" onClick={() => setMobileOpen(false)} className="block text-white">Seminuevos</Link>
                </div>
              )}
            </div>
          )}

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
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-white">
                      Iniciar Sesión
                    </Link>
                    <Link to="/registro" onClick={() => setMobileOpen(false)} className="block text-white">
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
