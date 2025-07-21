import React from "react";
import { FaBullhorn, FaUserEdit, FaHandshake } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-gray-50 text-gray-800">
            <section className="text-center py-20 px-4 max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
                    ¿Qué es CompraCarCR?
                </h1>
                <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
                    CompraCarCR nació en enero de 2025 como una plataforma innovadora para facilitar la publicación de anuncios de vehículos nuevos y usados en el mercado costarricense. Nuestro objetivo es brindarte una herramienta moderna y eficiente para que puedas mostrar tus vehículos sin complicaciones.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
                        <FaBullhorn className="text-purple-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold mb-2">Publicá tu anuncio</h3>
                        <p>
                            Subí tu vehículo fácilmente con fotos, videos y detalles clave que llamen la atención de los compradores.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
                        <FaUserEdit className="text-purple-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold mb-2">Gestioná tu perfil</h3>
                        <p>
                            Editá tus publicaciones y mantené tu inventario actualizado desde tu panel de usuario.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
                        <FaHandshake className="text-purple-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold mb-2">Somos el puente</h3>
                        <p>
                            CompraCarCR actúa como intermediario informativo: no gestionamos pagos ni cobros, solo conectamos personas.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
