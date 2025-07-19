import axios from "axios";

const CLOUD_NAME = "dutabvlxt";
const UPLOAD_PRESET = "CompraCarCR";

// Subir una imagen
export const uploadImageToCloudinary = async (base64) => {
  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return res.data.secure_url;
};

// Subir un video
export const uploadVideoToCloudinary = async (base64) => {
  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    formData
  );

  return res.data.secure_url;
};

// Subir varias imágenes a la vez
export const uploadMultipleImagesToCloudinary = async (base64Array) => {
  const uploadPromises = base64Array.map((img) =>
    uploadImageToCloudinary(img)
  );
  return Promise.all(uploadPromises);
};
