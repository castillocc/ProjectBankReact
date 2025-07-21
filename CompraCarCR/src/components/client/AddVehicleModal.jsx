import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, loadVehicle } from "../../context/slice/VehicleFormSlice";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { showToastRequest } from "../utils/toastUtils";
import Stepper from "../common/Stepper";
import VehicleStepOne from "./VehicleStepOne";
import VehicleStepTwo from "./VehicleStepTwo";
import VehicleStepThree from "./VehicleStepThree";
import { validateStepOne, validateStepTwo } from "../Utils/Validation";
import { uploadMultipleImagesToCloudinary, uploadVideoToCloudinary } from "../../services/CloudinaryService";
import { createVehicle, updateVehicle } from "../../services/VehicleService";
import { isCloudinaryUrl } from "../utils/cloudinaryUtils";
import CarLoader from "../common/CarLoader";
import { useUser } from "../../context/UserContext";

export default function AddVehicleModal({ onClose, editVehicle = null }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formData = useSelector((state) => state.vehicleForm);
  const dispatch = useDispatch();
  const totalSteps = 3;

  const { user } = useUser();

  useEffect(() => {
    if (editVehicle) {
      dispatch(loadVehicle(editVehicle));
    }
  }, [editVehicle, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

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
    setLoading(true);
    setSubmitError("");

    try {
      // Procesar imágenes
      const alreadyUploadedImages = (formData.images || []).filter(isCloudinaryUrl);
      const newImages = (formData.images || []).filter((img) => !isCloudinaryUrl(img));
      const uploadedImageUrls = await uploadMultipleImagesToCloudinary(newImages);
      const finalImageUrls = [...alreadyUploadedImages, ...uploadedImageUrls];

      // Procesar video
      let videoUrl = "";
      if (formData.video) {
        videoUrl = isCloudinaryUrl(formData.video)
          ? formData.video
          : await uploadVideoToCloudinary(formData.video);
      }

      // Payload
      const payload = {
        ...formData,
        images: finalImageUrls,
        video: videoUrl,
        userId: user?.id,
      };

      // API call
      const action = editVehicle
        ? () => updateVehicle(editVehicle.id, payload)
        : () => createVehicle(payload);

      // Ejecutar con validación
      await showToastRequest(action, {
        loading: editVehicle ? "Actualizando vehículo..." : "Subiendo vehículo...",
        success: editVehicle ? "Vehículo actualizado ✅" : "Vehículo creado 🚗",
        error: "Error al guardar vehículo ❌",
        invalid: "Debe iniciar sesión para subir vehículos 🚫", // se mostrará si falla validate()
      }, {
        validate: () => !!user,
        iconos: {
          loading: "🔄",
          success: editVehicle ? "✅" : "🚗",
          error: "❌",
        },
        onSuccess: onClose,
        onError: (err) =>
          setSubmitError(err?.message || "Hubo un problema al guardar el vehículo."),
      });

    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-6 text-center max-w-md w-full">
          <p className="text-red-500 mb-4">Debe iniciar sesión para subir un vehículo.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

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
          {/* Botón cerrar con z-index alto */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-red-500 z-50"
          >
            &times;
          </button>

          {/* Paso actual con z-index controlado */}
          <div className="relative z-10">
            <Stepper currentStep={step} steps={["Datos", "Multimedia", "Confirmar"]} />
          </div>

          <div className="mt-8">
            {step === 1 && (
              <VehicleStepOne data={formData} onChange={handleChange} errors={errors} />
            )}
            {step === 2 && <VehicleStepTwo errors={errors} />}
            {step === 3 && <VehicleStepThree />}
          </div>

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
