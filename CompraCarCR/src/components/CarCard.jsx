import React, { useState } from 'react';
import CarDetails from './CarDetails';

const CarCard = ({ car }) => {
  const [showMore, setShowMore] = useState(false);
  const [buttonText, setButtonText] = useState('Ver más');


  const ShowOrHide = () => {
    if (showMore == false) {
      setShowMore(true)
      setButtonText('Ver menos');
    }
    else {
      setShowMore(false)
      setButtonText('Ver más');
    }
  }

  return (
    <div className="bg-purple shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <img src={car.image} alt={car.name} className="w-full h-48 object-contain rounded object-" />
      <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
      <p className="text-gray-600">Desde: ${car.price}</p>
      <button id='' className="mt-3 bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700" onClick={ShowOrHide}
      >
        {buttonText}
      </button>
      <br /><br />
      {showMore ? <CarDetails car={car} /> : null}
    </div>
  );
};

export default CarCard;
