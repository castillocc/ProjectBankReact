import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoCloseCircleSharp, IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";

const VehicleGallerySwiper = ({ images = [] }) => {
    const [fullscreenIndex, setFullscreenIndex] = useState(null);

    const openFullscreen = (index) => setFullscreenIndex(index);
    const closeFullscreen = () => setFullscreenIndex(null);

    const prevImage = () => {
        if (fullscreenIndex > 0) setFullscreenIndex(fullscreenIndex - 1);
    };

    const nextImage = () => {
        if (fullscreenIndex < images.length - 1) setFullscreenIndex(fullscreenIndex + 1);
    };

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="rounded-xl overflow-hidden shadow-lg bg-gray-100"
            >
                {images.length > 0 ? (
                    images.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex justify-center items-center p-4 cursor-pointer"
                            onClick={() => openFullscreen(index)}
                        >
                            <img
                                src={img}
                                alt={`Imagen ${index + 1}`}
                                className="max-h-[300px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide className="flex justify-center items-center p-4">
                        <img
                            src="/images/no-image.png"
                            alt="No disponible"
                            className="max-h-[300px] w-auto object-contain opacity-70"
                        />
                    </SwiperSlide>
                )}
            </Swiper>

            {/* Fullscreen modal */}
            {fullscreenIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeFullscreen}
                >
                    {/* Cerrar */}
                    <button
                        onClick={closeFullscreen}
                        className="absolute top-5 right-5 text-white text-3xl hover:text-red-400"
                    >
                        <IoCloseCircleSharp />
                    </button>

                    {/* Imagen ampliada */}
                    <img
                        src={images[fullscreenIndex]}
                        alt={`Imagen ${fullscreenIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Flecha izquierda */}
                    {fullscreenIndex > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-4 text-white text-5xl hover:text-purple-400"
                        >
                            <IoChevronBackCircle />
                        </button>
                    )}

                    {/* Flecha derecha */}
                    {fullscreenIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-4 text-white text-5xl hover:text-purple-400"
                        >
                            <IoChevronForwardCircle />
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default VehicleGallerySwiper;
