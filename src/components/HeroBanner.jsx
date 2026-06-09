export function HeroBanner({ titulo, subtitulo, imagenFondo = "Fondo.jpg" }) {
  return (
    <header 
      className="relative h-[300px] flex items-center justify-center border-b-4 border-catYellow bg-asfalto bg-cover bg-center"
      style={{ 

        backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url('/${imagenFondo}')` 
      }}
    >
      <div className="text-center px-4 relative z-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight shadow-sm">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="text-catYellow text-lg md:text-xl font-medium tracking-wide">
            {subtitulo}
          </p>
        )}
      </div>
    </header>
  );
}