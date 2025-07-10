import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [
    {
      id: 1,
      name: "Toyota Corolla 2023",
      price: "$22,500",
      image: "https://www.hyundaicr.com/images/modelos/nuevotucson/360/Teal/Teal_6.webp",//"https://via.placeholder.com/600x350?text=Toyota+Corolla",
      description: "Auto confiable, ideal para ciudad y carretera.",
    },
    {
      id: 2,
      name: "Hyundai Venue 2022",
      price: "$19,800",
      image: "https://www.hyundaicr.com/images/modelos/venue/elementos/blue-07.webp",//"https://via.placeholder.com/600x350?text=Hyundai+Venue",
      description: "SUV compacto, excelente para familias.",
    },
    {
      id: 3,
      name: "Kia Sportage 2024",
      price: "$28,700",
      image: "https://www.hyundaicr.com/images/modelos/venue/elementos/blue-07.webp",//"https://via.placeholder.com/600x350?text=Kia+Sportage",
      description: "Moderno, espacioso y con tecnología avanzada.",
    },
  ],
};

const CarSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    // Podés agregar más reducers como favoritos, búsqueda, etc.
  },
});

export const selectCars = (state) => state.cars.cars;
export const selectCarById = (id) => (state) =>
  state.cars.cars.find((car) => car.id === Number(id));

export default CarSlice.reducer;