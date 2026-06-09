export function Nosotros() {
  return (
    <div className="flex flex-col flex-grow animate-fade-in">
      {/* Header de la página */}
      <header className="bg-asfalto py-16 text-center border-b-4 border-catYellow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-catYellow uppercase tracking-tight">
            Nosotros
          </h1>
          <p className="text-white mt-4 text-lg">////.</p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border-t-8 border-catYellow text-center">
          
          {/* Ícono de Ojo (Reemplaza a Bootstrap Icons) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-catYellow mb-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>

          {/* Texto de Visión */}
          <p className="text-lg md:text-xl text-carbon leading-relaxed font-medium">
            Somos una empresa dedicada al arriendo de maquinarias, con más de 10 años de trayectoria 
            al servicio de la comunidad de Puerto Natales. A lo largo de este tiempo, nos hemos 
            distinguido por ofrecer soluciones confiables, garantizando siempre altos estándares 
            de calidad en cada uno de nuestros servicios.
          </p>

        </div>
      </main>
    </div>
  );
}