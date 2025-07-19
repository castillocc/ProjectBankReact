
const API_URL = "http://localhost:3000";

export const getVehicleTypes = async () => {
  try {
    const res = await fetch(`${API_URL}/vehiclesType`);
    if (!res.ok) throw new Error("Failed to fetch vehicle types");
    return await res.json();
  } catch (error) {
    console.error("Vehicle type fetch error:", error);
    return [];
  }
};
