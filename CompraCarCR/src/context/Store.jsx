import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slice/CarSlice";
import vehicleFormReducer from "./slice/VehicleFormSlice";

export const Store = configureStore({
  reducer: {
    cars: carReducer,
    vehicleForm: vehicleFormReducer,
  },
});