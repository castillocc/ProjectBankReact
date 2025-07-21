import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get("http://localhost:3000/vehicles"); // cambia URL según tu backend
  return response.data;
});

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCars = (state) => state.cars.cars;

export default carSlice.reducer;
