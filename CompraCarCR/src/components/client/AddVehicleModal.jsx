import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, loadVehicle } from "../../context/slice/VehicleFormSlice";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "../common/Stepper";
import VehicleStepOne from "./VehicleStepOne";
import VehicleStepTwo from "./VehicleStepTwo";
import VehicleStepThree from "./VehicleStepThree";
import { validateStepOne, validateStepTwo } from "../Utils/Validation";
import { uploadMultipleImagesToCloudinary, uploadVideoToCloudinary, } from "../../services/CloudinaryService";
import { createVehicle, updateVehicle } from "../../services/VehicleService";
import { isCloudinaryUrl } from "../utils/cloudinaryUtils";
import CarLoader from "../common/CarLoader";


export default function AddVehicleModal({ onClose, editVehicle = null }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formData = useSelector((state) => state.vehicleForm);
  const dispatch = useDispatch();
  const totalSteps = 3;

  useEffect(() => {
    if (editVehicle) {
      dispatch(loadVehicle(editVehicle));
    }
  }, [editVehicle, dispatch]);
  // Actualizar valores
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  // Validaciones por paso
  const handleNext = () => {
    let validationErrors = {};
    if (step === 1) validationErrors = validateStepOne(formData);
    if (step === 2) validationErrors = validateStepTwo(formData);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSubmitError("");

      // Separar imágenes nuevas de las ya subidas
      const alreadyUploadedImages = (formData.images || []).filter(isCloudinaryUrl);
      const newImages = (formData.images || []).filter((img) => !isCloudinaryUrl(img));

      const uploadedImageUrls = await uploadMultipleImagesToCloudinary(newImages);
      const finalImageUrls = [...alreadyUploadedImages, ...uploadedImageUrls];

      // Subir video solo si no es Cloudinary
      let videoUrl = "";
      if (formData.video) {
        videoUrl = isCloudinaryUrl(formData.video)
          ? formData.video
          : await uploadVideoToCloudinary(formData.video);
      }

      const payload = {
        title: formData.title,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        fuelType: formData.fuelType,
        vehicleType: formData.vehicleType,
        images: finalImageUrls,
        video: videoUrl,
        userId: 2, // Fijo por ahora
      };

      if (editVehicle) {
        await updateVehicle(editVehicle.id, payload);
      } else {
        await createVehicle(payload);
      }

      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error al subir vehículo:", error);
      setSubmitError("Hubo un problema al guardar el vehículo.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative"
        >
          {/* Cerrar modal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-red-500"
          >
            &times;
          </button>

          {/* Paso actual */}
          <Stepper currentStep={step} steps={["Datos", "Multimedia", "Confirmar"]} />

          <div className="mt-8">
            {step === 1 && (
              <VehicleStepOne data={formData} onChange={handleChange} errors={errors} />
            )}
            {step === 2 && <VehicleStepTwo errors={errors} />}
            {step === 3 && <VehicleStepThree />}
          </div>

          {/* Navegación */}
          <div className="mt-10 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="px-4 py-2 rounded-lg border text-sm disabled:opacity-30"
            >
              Atrás
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
              >
                Siguiente
              </button>
            ) : loading ? (
              <CarLoader message={editVehicle ? "Actualizando..." : "Subiendo tu vehículo..."} />
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
              >
                {editVehicle ? "Actualizar Vehículo" : "Subir Vehículo"}
              </button>
            )}
          </div>

          {submitError && (
            <p className="text-red-500 text-sm mt-4 text-center">{submitError}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}