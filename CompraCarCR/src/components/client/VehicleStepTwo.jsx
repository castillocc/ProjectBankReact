import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
    addImage,
    removeImage,
    setVideo,
} from "../../context/slice/VehicleFormSlice";

export default function VehicleStepTwo({ errors = {} }) {
    const dispatch = useDispatch();
    const { images, video } = useSelector((state) => state.vehicleForm);
    const [videoError, setVideoError] = useState("");

    // Imagenes
    const onDropImages = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (images.length >= 5 || !file.type.startsWith("image/")) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(addImage(reader.result));
            };
            reader.readAsDataURL(file);
        });
    };

    const {
        getRootProps: getImageRootProps,
        getInputProps: getImageInputProps,
        isDragActive: isImageDragActive,
    } = useDropzone({
        onDrop: onDropImages,
        accept: { "image/*": [] },
        multiple: true,
        maxFiles: 5 - images.length,
    });

    const handleRemoveImage = (index) => {
        dispatch(removeImage(index));
    };

    // Video
    const onDropVideo = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (!file) {
            setVideoError("Archivo inválido.");
            return;
        }

        const validTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (!validTypes.includes(file.type)) {
            setVideoError("Formato no compatible. Usa mp4, webm u ogg.");
            return;
        }

        setVideoError("");

        const reader = new FileReader();
        reader.onloadend = () => {
            dispatch(setVideo(reader.result));
        };
        reader.readAsDataURL(file);
    };

    const {
        getRootProps: getVideoRootProps,
        getInputProps: getVideoInputProps,
        isDragActive: isVideoDragActive,
    } = useDropzone({
        onDrop: onDropVideo,
        accept: { "video/*": [] },
        multiple: false,
    });

    return (
        <div className="space-y-8">
            {/* Imágenes */}
            <div>
                <label className="block font-medium mb-2">Fotos del vehículo (máx 5)</label>

                <div className="grid grid-cols-5 gap-2 mb-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={img}
                                alt={`preview-${index}`}
                                className="w-full h-24 object-cover rounded"
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-white bg-opacity-75 text-red-500 rounded-full p-1 hover:bg-red-100"
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>

                {images.length < 5 && (
                    <div
                        {...getImageRootProps()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${isImageDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                            }`}
                    >
                        <input {...getImageInputProps()} />
                        <p className="text-gray-500">
                            {isImageDragActive
                                ? "Suelta las imágenes aquí..."
                                : "Arrastra o haz clic para subir imágenes"}
                        </p>
                    </div>
                )}

                {errors.images && (
                    <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                )}
            </div>

            {/* Video */}
            <div>
                <label className="block font-medium mb-2">Video (opcional)</label>
                <div
                    {...getVideoRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${isVideoDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                        }`}
                >
                    <input {...getVideoInputProps()} />
                    <p className="text-gray-500">
                        {video
                            ? "🎥 Video cargado correctamente"
                            : isVideoDragActive
                                ? "Suelta el video aquí..."
                                : "Arrastra o haz clic para subir video"}
                    </p>
                </div>

                {(errors.video || videoError) && (
                    <p className="text-red-500 text-sm mt-2">
                        {errors.video || videoError}
                    </p>
                )}
            </div>
        </div>
    );
}
