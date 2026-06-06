import { useState } from 'react';
import { HeroBanner } from './HeroBanner';

export function Contacto() {
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Estado para manejar los errores visuales
  const [errores, setErrores] = useState({});

  // Manejar cambios en los inputs en tiempo real
  const manejarCambio = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Limpiar el error del campo específico cuando el usuario vuelve a escribir
    if (errores[id]) {
      setErrores({ ...errores, [id]: null });
    }
  };

  // Lógica de validación traducida a React
  const validarFormulario = () => {
    let nuevosErrores = {};
    let esValido = true;

    // Validación Nombre (al menos 2 palabras y 4 caracteres)
    const nombreVal = formData.nombre.trim();
    if (nombreVal.split(' ').length < 2 || nombreVal.length < 4) {
      nuevosErrores.nombre = 'Por favor, ingrese al menos un nombre y un apellido.';
      esValido = false;
    }

    // Validación Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.';
      esValido = false;
    }

    // Validación Asunto
    if (formData.asunto === '') {
      nuevosErrores.asunto = 'Seleccione un asunto.';
      esValido = false;
    }

    // Validación Mensaje
    if (formData.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje es demasiado corto (mínimo 10 caracteres).';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      alert('Solicitud enviada correctamente. El equipo técnico de MULTIMAK SPA lo contactará a la brevedad.');
      
      // Resetear el formulario tras el envío exitoso
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      setErrores({});
    }
  };

  return (
    <div className="flex flex-col flex-grow animate-fade-in">
      <HeroBanner 
        titulo="Contacto" 
        subtitulo="Estamos aquí para ayudarle con sus requerimientos" 
      />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Columna del Formulario (7 columnas) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 shadow-lg rounded-xl border-l-4 border-catYellow h-full">
              <h2 className="text-2xl font-bold text-asfalto mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={enviarFormulario} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-bold text-carbon mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      id="nombre"
                      value={formData.nombre}
                      onChange={manejarCambio}
                      className={`w-full bg-gray-50 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ej: Juan Pérez" 
                    />
                    {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-sm font-bold text-carbon mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={manejarCambio}
                      className={`w-full bg-gray-50 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errores.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="nombre@empresa.cl" 
                    />
                    {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">Asunto</label>
                  <select 
                    id="asunto"
                    value={formData.asunto}
                    onChange={manejarCambio}
                    className={`w-full bg-gray-50 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errores.asunto ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Seleccione una opción...</option>
                    <option value="Cotización">Cotización de Arriendo, más de una maquina</option>
                    <option value="Consulta">Consulta General</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errores.asunto && <p className="text-red-500 text-xs mt-1">{errores.asunto}</p>}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">Mensaje</label>
                  <textarea 
                    id="mensaje"
                    rows="5"
                    value={formData.mensaje}
                    onChange={manejarCambio}
                    className={`w-full bg-gray-50 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errores.mensaje ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Describa su requerimiento o faena..."
                  ></textarea>
                  {errores.mensaje && <p className="text-red-500 text-xs mt-1">{errores.mensaje}</p>}
                </div>

                {/* Botón Envío */}
                <div className="text-right pt-2">
                  <button 
                    type="submit" 
                    className="bg-catYellow hover:bg-catYellowHover text-asfalto font-bold px-8 py-3 rounded-lg shadow-md uppercase transition-colors"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Columna de la Imagen (5 columnas) */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[400px]">
              <img 
                src="/CATERPILLAR 416E.jpg" 
                alt="Retroexcavadora Caterpillar 416E" 
                className="object-cover w-full h-full rounded-xl shadow-lg border border-gray-200"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}