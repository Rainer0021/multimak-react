import { HeroBanner } from './HeroBanner';

export function ManualUsuario() {
  const secciones = [
    {
      titulo: "1. Primeros Pasos y Navegación",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      contenido: "La plataforma MULTIMAK es una aplicación SPA (Single Page Application). Utilice la barra de navegación superior para moverse fluidamente entre el Inicio, Catálogo, Requerimientos Técnicos y este Manual. Su sesión se mantendrá activa de forma segura hasta que decida 'Cerrar Sesión'."
    },
    {
      titulo: "2. Registro y Acceso Seguro",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      contenido: "Para cotizar, debe registrarse validando su RUT chileno (el sistema bloquea RUTs inválidos mediante el algoritmo Módulo 11). Las contraseñas están cifradas bajo altos estándares de seguridad (SHA256). Si un administrador desactiva su cuenta, el sistema le denegará el acceso automáticamente."
    },
    {
      titulo: "3. Catálogo y Cotizaciones (API Integrada)",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      contenido: "En la sección Catálogo podrá visualizar la flota disponible. Los precios de arriendo base se calculan dinámicamente conectándose en tiempo real a la API del Banco Central (mindicador.cl) para reflejar las variaciones económicas diarias."
    },
    {
      titulo: "4. Consola de Administración (CRUD)",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      contenido: "El usuario con rol ADMIN tiene acceso a un panel exclusivo. Aquí puede crear y registrar nueva maquinaria en la base de datos (Create), leer el inventario (Read), desactivar el acceso de clientes morosos (Update) y retirar maquinaria dada de baja (Delete)."
    }
  ];

  return (
    <div className="flex flex-col flex-grow animate-fade-in">
      <HeroBanner 
        titulo="Manual de Usuario" 
        subtitulo="Guía oficial de operación del sistema MULTIMAK SPA." 
      />

      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl border-t-8 border-asfalto mb-8">
          <h2 className="text-3xl font-black text-asfalto uppercase tracking-tight mb-2">
            Bienvenido al Sistema
          </h2>
          <p className="text-gray-600 font-medium mb-8">
            Esta documentación le guiará a través de las funcionalidades desarrolladas para la gestión de flota y cotizaciones. 
            El sistema ha sido diseñado pensando en la eficiencia y la seguridad de sus datos.
          </p>

          <div className="space-y-6">
            {secciones.map((seccion, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-5 bg-gray-50 border-l-4 border-catYellow rounded-r-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 mt-1">
                  {seccion.icono}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-asfalto mb-2">{seccion.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {seccion.contenido}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota informativa inferior */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3 text-blue-800 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p><strong>Nota Técnica:</strong> Este portal está optimizado para funcionar en resoluciones de escritorio y dispositivos móviles garantizando una homogeneidad visual en todos los enlaces.</p>
        </div>

      </main>
    </div>
  );
}