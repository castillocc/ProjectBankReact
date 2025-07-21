import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCars, fetchCars } from "../../context/slice/CarSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaSearch, FaMoneyBillWave, FaHeadset, FaHeart } from "react-icons/fa";
import carImage from '../../images/car-bg-purple.png';

const LandingPage = () => {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const sortedCars = [...cars].sort((a, b) => (b.favorites || 0) - (a.favorites || 0));

    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative h-[55vh] bg-black text-white flex items-center justify-center overflow-hidden">
                <img
                    src={carImage}
                    alt="Auto Catálogo"
                    className="absolute inset-0 w-full h-full object-fill object-center opacity-50"
                />
                <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                        Encontrá tu próximo vehículo
                    </h1>
                    <p className="text-base md:text-lg mb-4">
                        Compará, descubrí y elegí con CompraCarCR
                    </p>
                    <Link
                        to="/vehiculos"
                        className="bg-purple-600 text-white py-2 px-5 rounded-full hover:bg-purple-700 transition text-sm md:text-base"
                    >
                        Ver catálogo
                    </Link>
                </div>
            </section>

            {/* Destacados Swiper */}
            <section className="bg-white py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Vehículos Populares</h2>
                {sortedCars.length === 0 ? (
                    <p className="text-center text-gray-500">No hay vehículos disponibles por el momento.</p>
                ) : (
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        navigation
                        pagination={{ clickable: true }}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[EffectCoverflow, Navigation, Pagination]}
                        className="w-full max-w-6xl mx-auto"
                    >
                        {sortedCars.map((car) => {
                            const imageSrc = car.images?.[0] || "/images/no-image.png";
                            return (
                                <SwiperSlide key={car.id} className="w-[240px] md:w-[300px] lg:w-[350px]">
                                    <Link
                                        to={`/vehiculo/${car.id}`}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <img
                                            src={imageSrc}
                                            className="w-full h-48 object-cover"
                                            alt={car.title}
                                            loading="lazy"
                                            onError={(e) => { e.target.src = "/images/fallback.jpg"; }}
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold truncate hover:underline flex justify-between items-center">
                                                {car.title}
                                                {car.favorites && (
                                                    <span className="text-red-500 text-sm flex items-center gap-1">
                                                        <FaHeart /> {car.favorites}
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-sm text-gray-500">{car.brand} • {car.year} • {car.vehicleType}</p>
                                            <p className="text-purple-600 font-bold text-lg mt-1">₡{parseInt(car.price).toLocaleString()}</p>
                                            <button className="mt-3 text-sm bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600">
                                                Ver detalles
                                            </button>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </section>

            {/* Beneficios */}
            <section className="bg-gray-100 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">¿Por qué elegirnos?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <FaSearch className="mx-auto mb-4 text-purple-600 text-4xl" />
                        <h3 className="font-bold text-xl">Comparación Inteligente</h3>
                        <p>Compará hasta 3 vehículos y recibí recomendaciones impulsadas por IA.</p>
                    </div>
                    <div className="text-center">
                        <FaMoneyBillWave className="mx-auto mb-4 text-purple-600 text-4xl" />
                        <h3 className="font-bold text-xl">Ahorro Garantizado</h3>
                        <p>Visualizá cuotas, tasas y ofertas para tomar la mejor decisión.</p>
                    </div>
                    <div className="text-center">
                        <FaHeadset className="mx-auto mb-4 text-purple-600 text-4xl" />
                        <h3 className="font-bold text-xl">Asesoría Personalizada</h3>
                        <p>Te guiamos desde la búsqueda hasta el cierre de tu compra.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
