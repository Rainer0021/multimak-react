// src/components/Navbar.jsx

export function Navbar({ vistaActual, setVistaActual, usuarioActivo, cerrarSesion }) {
  return (
    <nav className="bg-asfalto text-white shadow-lg sticky top-0 z-50 border-b-4 border-catYellow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo clickeable que lleva al inicio */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setVistaActual('inicio')}
          >
            <span className="text-2xl font-black tracking-tighter">
              MULTIMAK <span className="text-catYellow">SPA</span>
            </span>
          </div>

          {/* Menú de navegación y controles de usuario */}
          <div className="flex items-center space-x-6">
            
            {/* Enlaces principales (ocultos en celulares, visibles en PC) */}
            <div className="hidden md:flex space-x-6 font-semibold text-sm uppercase">
              <button onClick={() => setVistaActual('inicio')} className={`transition ${vistaActual === 'inicio' ? 'text-catYellow' : 'hover:text-catYellow'}`}>
                Inicio
              </button>
              <button onClick={() => setVistaActual('nosotros')} className={`transition ${vistaActual === 'nosotros' ? 'text-catYellow' : 'hover:text-catYellow'}`}>
                Quiénes Somos
              </button>
              <button onClick={() => setVistaActual('requerimientos')} className={`transition ${vistaActual === 'requerimientos' ? 'text-catYellow' : 'hover:text-catYellow'}`}>
                Requerimientos
              </button>
              <button onClick={() => setVistaActual('contacto')} className={`transition ${vistaActual === 'contacto' ? 'text-catYellow' : 'hover:text-catYellow'}`}>
                Contacto
              </button>
            </div>

            {/* Lógica condicional: Si NO hay usuario, botón de Login. Si lo hay, perfil y Salir. */}
            {!usuarioActivo ? (
              <button 
                onClick={() => setVistaActual('login')} 
                className="bg-catYellow hover:bg-catYellowHover text-asfalto font-bold py-2 px-4 rounded transition-colors ml-4 shadow text-sm uppercase"
              >
                Iniciar Sesión
              </button>
            ) : (
              <div className="flex items-center pl-4 border-l border-gray-600 ml-4">
                <div className="text-right mr-4">
                  {/* AHORA EL NOMBRE ES UN BOTÓN CLICKEABLE */}
                  <button 
                    onClick={() => setVistaActual('perfil')}
                    className="text-sm font-bold text-catYellow hover:text-white hover:underline transition-colors block w-full text-right uppercase"
                    title="Ver mi perfil e historial"
                  >
                    {usuarioActivo.nombre_Usuario}
                  </button>
                  <p className="text-xs text-gray-400 uppercase">{usuarioActivo.rol}</p>
                </div>
                <button 
                  onClick={() => { cerrarSesion(); setVistaActual('inicio'); }} 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded transition-colors uppercase"
                >
                  Salir
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}