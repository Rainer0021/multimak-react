import { HeroBanner } from './HeroBanner';

export function Requerimientos() {
  return (
    <div className="flex flex-col flex-grow animate-fade-in">
      
      {/* Banner Principal */}
      <HeroBanner 
        titulo="Requerimientos Técnicos" 
        subtitulo="Arquitectura del Sistema y Modelamiento UML" 
      />

      <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl">
        
        {/* 1. Propósito del Sistema */}
        <section className="bg-white p-6 md:p-8 rounded-r-xl shadow-lg border-l-4 border-catYellow mb-8">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-asfalto">Propósito del Sistema</h2>
          </div>
          <p className="text-carbon leading-relaxed">
            Esta documentación detalla la arquitectura técnica diseñada para la gestión de flota y logística de <strong>MULTIMAK SPA</strong>. El enfoque principal es la optimización de procesos de arriendo y transporte de maquinaria pesada en la zona austral.
          </p>
        </section>

        {/* 2. Diagrama de Casos de Uso */}
        <section className="bg-white p-6 md:p-8 rounded-r-xl shadow-lg border-l-4 border-catYellow mb-8">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <h2 className="text-2xl font-bold text-asfalto">Diagrama de Casos de Uso</h2>
          </div>
          <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-xl mt-4 flex justify-center items-center">
            {/* Asegúrate de colocar CasoUso.jpg en la carpeta public */}
            <img src="/CasoUso.jpg" alt="Diagrama de Casos de Uso" className="max-w-full h-auto rounded shadow-sm" />
          </div>
        </section>

        {/* 3. Diagrama de Clases */}
        <section className="bg-white p-6 md:p-8 rounded-r-xl shadow-lg border-l-4 border-catYellow mb-8">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <h2 className="text-2xl font-bold text-asfalto">Diagrama de Clases</h2>
          </div>
          <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-xl mt-4 flex justify-center items-center">
            {/* Asegúrate de colocar DiagramaClase.jpg en la carpeta public */}
            <img src="/DiagramaClase.png" alt="Diagrama de Clases" className="max-w-full h-auto rounded shadow-sm" />
          </div>
        </section>

        {/* 4. Especificaciones del Sistema */}
        <section className="bg-white p-6 md:p-8 rounded-r-xl shadow-lg border-l-4 border-catYellow mb-8">
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-asfalto">Especificaciones del Sistema</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requerimientos Funcionales */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 h-full">
              <h4 className="text-lg font-bold text-asfalto border-b border-gray-300 pb-2 mb-4">Requerimientos Funcionales</h4>
              <ul className="space-y-3 text-sm text-carbon">
                <li className="flex items-start">
                  <span className="text-catYellow font-bold mr-2">✓</span>
                  <span><strong>Gestión de Catálogo:</strong> Visualización detallada de equipos y maquinaria pesada disponible.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-catYellow font-bold mr-2">✓</span>
                  <span><strong>Configuración de Accesorios:</strong> Selección múltiple de herramientas basada en compatibilidad técnica.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-catYellow font-bold mr-2">✓</span>
                  <span><strong>Cálculo Logístico:</strong> Procesamiento de solicitudes de transporte a faena.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-catYellow font-bold mr-2">✓</span>
                  <span><strong>Comunicación:</strong> Generación automática de cotizaciones calculadas y validadas.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-catYellow font-bold mr-2">✓</span>
                  <span><strong>Validación:</strong> Control de campos obligatorios para asegurar solicitudes técnicas completas.</span>
                </li>
              </ul>
            </div>

            {/* Requerimientos No Funcionales */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 h-full">
              <h4 className="text-lg font-bold text-asfalto border-b border-gray-300 pb-2 mb-4">Requerimientos No Funcionales</h4>
              <ul className="space-y-3 text-sm text-carbon">
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-2">⚙</span>
                  <span><strong>Identidad Visual:</strong> Coherencia con la paleta de colores corporativa de MULTIMAK SPA.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-2">⚙</span>
                  <span><strong>Portabilidad:</strong> Diseño responsivo compatible con navegadores de escritorio y dispositivos móviles.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-2">⚙</span>
                  <span><strong>Interoperabilidad:</strong> Capacidad de almacenar información localmente mediante <em>localStorage</em>.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Términos y Condiciones */}
        <section className="bg-white p-6 md:p-8 rounded-r-xl shadow-lg border-l-4 border-catYellow">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-catYellow mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-asfalto">Términos y Condiciones</h2>
          </div>
          <div className="text-sm text-gray-500 space-y-3">
            <p><strong>1. Uso del Sitio:</strong> Este portal es meramente informativo y técnico para la gestión de flota de MULTIMAK SPA.</p>
            <p><strong>2. Solicitudes:</strong> La generación de una cotización digital no garantiza la reserva inmediata; está sujeta a validación técnica y disponibilidad de maquinaria en Puerto Natales.</p>
            <p><strong>3. Privacidad:</strong> Los datos de contacto se tratan bajo la Ley 19.628, exclusivamente para fines comerciales entre el cliente y MULTIMAK. Su información es resguardada y no será distribuida a terceros.</p>
            <p><strong>4. Jurisdicción:</strong> Cualquier controversia será resuelta bajo las leyes chilenas en los tribunales de Puerto Natales y/o Punta Arenas.</p>
          </div>
        </section>

      </main>
    </div>
  );
}