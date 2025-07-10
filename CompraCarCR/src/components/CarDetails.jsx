import React from 'react';

const CarDetails = ({ car }) => {
    return (
        <div classname="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-white-500 dark:text-white-400">
                <thead class="text-xs text-white-700 uppercase bg-purple-50 dark:bg-purple-700 white:text-white-400  text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3"><strong>Caracteristicas</strong></th>
                        <th scope="col" class="px-6 py-3"><strong>Datos</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b white:bg-purple-800 white:border-purple-700 border-purple-200 hover:bg-purple-50 white:hover:bg-gray-600">
                        <th>Motor:</th>
                        <td> {car.engine}</td>
                    </tr>
                    <tr class="bg-white border-b white:bg-purple-800 white:border-purple-700 border-purple-200 hover:bg-purple-50 white:hover:bg-gray-600">
                        <th><strong>Transmisión:</strong></th>
                        <td> {car.transmission}</td>
                    </tr>
                    <tr class="bg-white border-b white:bg-purple-800 white:border-purple-700 border-purple-200 hover:bg-purple-50 white:hover:bg-gray-600">
                        <th><strong>Consumo:</strong></th>
                        <td> {car.consumption}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CarDetails;
