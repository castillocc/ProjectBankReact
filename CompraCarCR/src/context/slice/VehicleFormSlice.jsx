import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  fuelType: "",
  vehicleType: "",
  description: "",
  images: [],
  video: null,
};

const vehicleFormSlice = createSlice({
  name: "vehicleForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    addImage: (state, action) => {
      const newImage = action.payload;
      if (
        state.images.length < 5 &&
        !state.images.includes(newImage)
      ) {
        state.images.push(newImage);
      }
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((_, index) => index !== action.payload);
    },
    replaceImage: (state, action) => {
      const { index, newImage } = action.payload;
      if (index >= 0 && index < state.images.length) {
        state.images[index] = newImage;
      }
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    resetForm: () => initialState,
    loadFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    loadVehicle: (state, action) => {
      const vehicle = action.payload;
      return {
        title: vehicle.title || "",
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        price: vehicle.price || "",
        fuelType: vehicle.fuelType || "",
        vehicleType: vehicle.vehicleType || "",
        description: vehicle.description || "",
        images: vehicle.images || [],
        video: vehicle.video || "",
      };
    },
  },
});

export const {
  updateField,
  addImage,
  removeImage,
  replaceImage,
  setVideo,
  resetForm,
  loadFormData,
  loadVehicle,
} = vehicleFormSlice.actions;

export default vehicleFormSlice.reducer;
