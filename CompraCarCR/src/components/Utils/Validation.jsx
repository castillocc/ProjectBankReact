// Paso 1: Datos del vehículo
export const validateStepOne = (formData) => {
  const errors = {};

if (!formData.title?.trim()) errors.title = "El título es obligatorio";
if (!formData.brand?.trim()) errors.brand = "La marca es obligatoria";
if (!formData.model?.trim()) errors.model = "El modelo es obligatorio";
if (!formData.year || isNaN(formData.year)) errors.year = "Año inválido";
if (!formData.price || isNaN(formData.price)) errors.price = "Precio inválido";
if (!formData.fuelType) errors.fuelType = "Selecciona el tipo de combustible";
if (!formData.vehicleType) errors.vehicleType = "Selecciona el tipo de vehículo";
if (!formData.transmission) errors.transmission = "Selecciona la transmisión";       
if (!formData.drivetrain) errors.drivetrain = "Selecciona el tipo de tracción";        

  return errors;
};

// Paso 2: Multimedia
export const validateStepTwo = (formData) => {
  const errors = {};

  if (!formData.images || formData.images.length === 0) {
    errors.images = "Debe subir al menos una imagen.";
  }

  // Validación de formato de video
  if (formData.video) {
    const base64Header = formData.video.split(";")[0];
    if (
      !base64Header.includes("video/mp4") &&
      !base64Header.includes("video/webm") &&
      !base64Header.includes("video/ogg")
    ) {
      errors.video = "Formato de video no compatible. Usa mp4, webm u ogg.";
    }
  }

  return errors;
};

// Paso 3 (opcional): Confirmación antes de enviar
export const validateAllSteps = (formData) => {
  return {
    ...validateStepOne(formData),
    ...validateStepTwo(formData),
  };
};