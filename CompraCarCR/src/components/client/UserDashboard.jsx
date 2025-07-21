import React, { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import AddVehicleModal from "./AddVehicleModal";
import { getVehiclesByUserId, deleteVehicle } from "../../services/VehicleService";
import CarLoader from "../common/CarLoader";
import { showToastRequest } from "../utils/toastUtils";
import ConfirmDialog from "../common/ConfirmDialog";
import Header from "../layout/header.jsx";
import { useUser } from "../../context/UserContext";

const UserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const { user } = useUser(); // obtener usuario logueado

  const fetchVehicles = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const data = await showToastRequest(
        getVehiclesByUserId(user.id),
        {
          loading: "Cargando vehículos...",
          success: "Vehículos cargados ✅",
          error: "Error al cargar vehículos ❌",
        }
      );
      setVehicles(data);
    } catch (err) {
      console.error("Error al cargar vehículos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    fetchVehicles(); // Refrescar después de agregar/editar
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleDeleteRequest = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowConfirm(true);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    setShowConfirm(false);
    setVehicleToDelete(null);

    try {
      await showToastRequest(
        deleteVehicle(vehicleId),
        {
          loading: "Eliminando vehículo...",
          success: "Vehículo eliminado correctamente 🚗",
          error: "No se pudo eliminar el vehículo ❌",
        }
      );
      fetchVehicles();
    } catch (err) {
      console.error("Error al eliminar vehículo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setSelectedVehicle(null);
              setShowModal(true);
            }}
            className="bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-800 transition"
          >
            + Agregar Vehículo
          </button>
        </div>

        {loading ? (
          <CarLoader message="Cargando tus vehículos..." />
        ) : vehicles.length === 0 ? (
          <p className="text-center text-gray-500">No tienes vehículos registrados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddVehicleModal onClose={handleCloseModal} editVehicle={selectedVehicle} />
      )}

      {showConfirm && vehicleToDelete && (
        <ConfirmDialog
          title="Confirmar eliminación"
          message={
            <>
              <p className="mb-2">
                ¿Seguro que deseas eliminar el vehículo <strong>{vehicleToDelete.title}</strong>?
              </p>
            </>
          }
          onConfirm={() => handleDeleteVehicle(vehicleToDelete.id)}
          onCancel={() => {
            setShowConfirm(false);
            setVehicleToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
