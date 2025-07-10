import React from 'react';
import CarCard from '../components/CarCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
const Home = () => {
  const mockCars = [
    { 
      _id: '1',
      name: 'Hyundai Venue',
      price: 24000,
      brand: 'Hyundai',
      year: 2024,
      engine: '1.8L 4-cil.',
      transmission: 'Automática',
      consumption: '30 mpg',
      image: 'https://www.hyundaicr.com/images/modelos/venue/elementos/blue-07.webp' 
    },
    { 
      _id: '2',
      name: 'Hyundai Tucson',
      price: 25000,
      brand: 'Hyundai',
      year: 2024,
      engine: '1.5L 4-cil.',
      transmission: 'Automática',
      consumption: '30 mpg',
       image: 'https://www.hyundaicr.com/images/modelos/nuevotucson/360/Teal/Teal_6.webp'
       },
  ];

  return (
    <div>
      <Header />
      <main className="p-6 text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">Bienvenido a AutoComparador</h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Explora y compara vehículos nuevos disponibles en el mercado nacional. Usa nuestras herramientas para seleccionar tus favoritos, comparar hasta 3 modelos y tomar una mejor decisión de compra.
        </p>
      </main>

      <div className="p-4">
        <SearchBar />
        <h1 className="text-2xl font-bold my-4">Vehículos destacados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;