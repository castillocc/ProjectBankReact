import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelopeOpenText,
  FaMapMarkedAlt,
  FaFacebook,
  FaInstagram,
  FaHome,
  FaCarSide,
  FaInfoCircle,
  FaCar,
  FaShieldAlt,
  FaWhatsapp
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaCar className="text-purple-400 text-2xl" />
            <h4 className="text-2xl font-bold text-white">CompraCarCR</h4>
          </div>
          <p className="text-sm text-gray-400">
            Tu plataforma para comparar, elegir y encontrar tu próximo vehículo en Costa Rica.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-purple-300">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="flex items-center gap-2 hover:text-purple-400"><FaHome /> Inicio</Link></li>
            <li><Link to="/vehiculos" className="flex items-center gap-2 hover:text-purple-400"><FaCarSide /> Catálogo</Link></li>
            <li><Link to="/acerca" className="flex items-center gap-2 hover:text-purple-400"><FaInfoCircle /> Acerca</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-purple-300">Contacto</h4>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <FaEnvelopeOpenText /> info@compracarcr.com
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <FaPhone /> +506 8888-0000
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaMapMarkedAlt /> San José, Costa Rica
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} CompraCarCR. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="bg-purple-600 hover:scale-110 p-2 rounded-full text-white transition"><FaFacebook /></a>
          <a href="#" className="bg-purple-600 hover:scale-110 p-2 rounded-full text-white transition"><FaInstagram /></a>
          <a href="#" className="bg-purple-600 hover:scale-110 p-2 rounded-full text-white transition"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Trust Info */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        <FaShieldAlt className="inline mr-1 text-purple-500" />
        CompraCarCR protege tu privacidad y no intermedia ventas.
      </div>
    </footer>
  );
};

export default Footer;
