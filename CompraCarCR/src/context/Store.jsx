import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slice/carSlice.jsx";

export const CarContext = configureStore({
  reducer: {
    cars: carReducer,
  },
});