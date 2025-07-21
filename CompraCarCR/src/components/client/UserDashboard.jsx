import React, { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import AddVehicleModal from "./AddVehicleModal";
import { getVehiclesByUserId, deleteVehicle } from "../../services/VehicleService";
import CarLoader from "../common/CarLoader";
import toast from "react-hot-toast";
import ConfirmDialog from "../common/ConfirmDialog";
import Header from '../layout/header.jsx';

const VehicleDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const userId = 2; // Simulado por ahora

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await getVehiclesByUserId(userId);
      setVehicles(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
      toast.error("Error al cargar vehículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    fetchVehicles(); // Refrescar después de agregar/editar
  };

  const handleEdit = (vehicle) => {
            console.log(vehicle);
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleDeleteRequest = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowConfirm(true);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      console.log(vehicleId)
      await deleteVehicle(vehicleId);
      toast.success("Vehículo eliminado correctamente 🚗");
      fetchVehicles();
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      toast.error("Error al eliminar el vehículo");
    } finally {
      setShowConfirm(false);
      setVehicleToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header 
      <header className="bg-purple-700 text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">CompraCar</h1>
        <div className="flex items-center gap-4">
          <span>Bienvenido</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="rounded-full w-10 h-10"
          />
        </div>
      </header>
      */}
      <Header />
      {/* Content */}
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

      {/* Modal Agregar/Editar */}
      {showModal && (
        <AddVehicleModal onClose={handleCloseModal} editVehicle={selectedVehicle} />
      )}

      {/* Modal Confirmación de eliminación */}
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

export default VehicleDashboard;
