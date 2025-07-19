import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slice/carSlice";
import vehicleFormReducer from "./slice/VehicleFormSlice";

export const Store = configureStore({
  reducer: {
    cars: carReducer,
    vehicleForm: vehicleFormReducer,
  },
});