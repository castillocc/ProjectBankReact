import React from "react";
import Header from '../components/layout/header.jsx';

function About(){
    return (
        <div> 
            <Header />
            <section className="bg-gray-100 text-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-6">Qué es CompraCarCR?</h1>
                <p className="text-lg mb-8 max-w-xl mx-auto">
                CompraCarCR nació en enero de 2025 con la idea de servir como una plataforma web para poder facilitar, en el mercado nacional, la publicación de anuncios para la venta de vehiculos, ya sean estos nuevos o usados. Nuestros registrados tendrán a su disposición una herramienta con la cual editar su anuncio y que esta sirva como intermediaria para el interesado para su venta final, ya que CompraCarCR solo se dedica a mostrar las publicaciones, no a gestionar las ventas como plataforma E-Commerce.
                </p>
            </section>
            <footer className="bg-gray-800 text-white text-center py-6 mt-10">
                <p>&copy; {new Date().getFullYear()} CompraCarCR. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default About;