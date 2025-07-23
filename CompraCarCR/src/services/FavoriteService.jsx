import axios from "axios";
const API = "http://localhost:3000/favorites";

export const getFavoritesByUser = async (userId) => {
  const { data } = await axios.get(`${API}?userId=${userId}`);
  return data;
};

export const isFavorite = async (userId, vehicleId) => {
  const { data } = await axios.get(`${API}?userId=${userId}&vehicleId=${vehicleId}`);
  return data.length > 0;
};

export const addFavorite = async (userId, vehicleId) => {
  return axios.post(API, { userId, vehicleId });
};

export const removeFavorite = async (favoriteId) => {
  return axios.delete(`${API}/${favoriteId}`);
};

export const getFavoriteCount = async (vehicleId) => {
  const { data } = await axios.get(`${API}?vehicleId=${vehicleId}`);
  return data.length;
};
