import React from "react";
import Header from "../../components/layout/Header.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCars } from "../../context/slice/CarSlice.jsx";


const Landing = () => {
  const cars = useSelector(selectCars);
  return (
    <div>
      <Header />

      <section className="bg-gray-100 text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">¡Encontrá tu próximo auto!</h1>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Explora nuestros modelos destacados y descubrí el vehículo ideal para vos.
        </p>
      </section>

      <section className="bg-white py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Vehículos Destacados</h2>
        <div className="flex overflow-x-auto gap-6 px-4 pb-4 snap-x snap-mandatory">
          {cars.map((car) => (
            <Link
              to={`/vehiculo/${car.id}`}
              key={car.id}
              className="min-w-[300px] max-w-[90%] snap-center bg-gray-100 rounded-xl shadow hover:shadow-xl transition"
            >
              <img src={car.image} alt={car.name} className="w-full rounded-t-xl" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-blue-600 font-bold">{car.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>&copy; {new Date().getFullYear()} CompraCarCR. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;
