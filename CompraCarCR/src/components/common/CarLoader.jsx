import React from "react";

const CarLoader = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="animate-bounce flex items-center gap-2">
        <span className="text-2xl">🚗</span>
        <span className="text-gray-600 font-medium">Cargando...</span>
      </div>
    </div>
  );
};

export default CarLoader;
