import axios from "axios";

const API_URL = "http://localhost:3000/vehicles";

// Obtener todos los vehículos
export const getAllVehicles = () => {
  return axios.get(API_URL).then((res) => res.data);
};

// Obtener vehículos por usuario
export const getVehiclesByUserId = (userId) => {
  return axios.get(`${API_URL}?userId=${userId}`).then((res) => res.data);
};

// Crear nuevo vehículo
export const createVehicle = (vehicleData) => {
  return axios.post(API_URL, vehicleData).then((res) => res.data);
};

// Eliminar un vehículo (opcional)
export const deleteVehicle = (id) => {
  return axios.delete(`${API_URL}/${id}`).then((res) => res.data);
};

// Actualizar un vehículo (opcional)
export const updateVehicle = (id, updatedData) => {
  return axios.put(`${API_URL}/${id}`, updatedData).then((res) => res.data);
};
