// src/components/HeroBanner.jsx
import { useState, useEffect } from 'react';

export function HeroBanner({ titulo, subtitulo }) {
  // 1. Matriz de datos para el Carrusel
  const slides = [
    {
      imagen: '/CATERPILLAR 416E.jpg', // Tu imagen local
      tituloAlterno: titulo || "Catálogo MULTIMAK",
      subAlterno: subtitulo || "La mejor maquinaria pesada para tu proyecto."
    },
    {
      imagen: '/Fondo.jpg', // Imagen externa de faena
      tituloAlterno: "Potencia y Confiabilidad",
      subAlterno: "Equipos certificados para las condiciones extremas de la zona austral."
    },
    {
      imagen: '/Retro.jfif',
      tituloAlterno: "Soporte en Terreno",
      subAlterno: "Logística y mantenimiento preventivo garantizado en Puerto Natales."
    }
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  // 2. Lógica de programación: Avance automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((indiceAnterior) => 
        indiceAnterior === slides.length - 1 ? 0 : indiceAnterior + 1
      );
    }, 5000); // Cambia cada 5 segundos

    // Limpiamos el intervalo si el componente se desmonta
    return () => clearInterval(intervalo);
  }, [slides.length]);

  // 3. Controles Manuales
  const diapositivaAnterior = () => {
    setIndiceActual(indiceActual === 0 ? slides.length - 1 : indiceActual - 1);
  };

  const diapositivaSiguiente = () => {
    setIndiceActual(indiceActual === slides.length - 1 ? 0 : indiceActual + 1);
  };

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden bg-asfalto shadow-inner">
      
      {/* Contenedor del Slider (Se mueve en el Eje X según el índice) */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
        style={{ transform: `translateX(-${indiceActual * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="min-w-full h-full relative flex items-center justify-center"
          >
            {/* Imagen de fondo con opacidad */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" 
              style={{ backgroundImage: `url('${slide.imagen}')` }}
            ></div>
            
            {/* Gradiente oscuro inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-asfalto/90 via-transparent to-transparent"></div>
            
            {/* Texto Central */}
            <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in mt-10">
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl border-b-4 border-catYellow inline-block pb-2">
                {slide.tituloAlterno}
              </h1>
              <p className="text-base md:text-xl text-catYellow font-bold drop-shadow-md">
                {slide.subAlterno}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha Izquierda */}
      <button 
        onClick={diapositivaAnterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-catYellow text-white hover:text-asfalto rounded-full p-3 transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flecha Derecha */}
      <button 
        onClick={diapositivaSiguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-catYellow text-white hover:text-asfalto rounded-full p-3 transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navegación por puntos inferiores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setIndiceActual(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              indiceActual === index 
                ? 'bg-catYellow w-10 shadow-lg' 
                : 'bg-white/50 w-3 hover:bg-white'
            }`}
          ></button>
        ))}
      </div>
      
    </div>
  );
}