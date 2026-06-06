// src/components/PerfilCliente.jsx
import { useState, useEffect } from 'react';

export function PerfilCliente({ usuarioActivo, actualizarUsuario }) {
  // --- ESTADOS DEL FORMULARIO DE PERFIL ---
  const [formData, setFormData] = useState({
    nombre: usuarioActivo.nombre_Usuario || '',
    correo: usuarioActivo.correo || '',
    rut: usuarioActivo.rut || '',
    // Dejamos la contraseña en blanco. Si escribe algo, se actualiza.
    nuevaContrasena: '' 
  });

  const [mensajeExito, setMensajeExito] = useState('');

  // --- ESTADO DEL HISTORIAL ---
  const [miHistorial, setMiHistorial] = useState([]);

  // Cargar historial al montar el componente
  useEffect(() => {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem('cotizacionesMultimak')) || [];
    // Filtramos solo las cotizaciones que coincidan con el RUT del usuario activo
    const misCotizaciones = cotizacionesGuardadas.filter(cot => cot.cliente.rut === usuarioActivo.rut);
    setMiHistorial(misCotizaciones);
  }, [usuarioActivo.rut]);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMensajeExito('');
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    
    // Creamos una copia del usuario con los datos actualizados
    const usuarioActualizado = {
      ...usuarioActivo,
      nombre_Usuario: formData.nombre,
      correo: formData.correo,
    };

    // Si escribió una nueva contraseña, actualizamos su método de inicio de sesión
    if (formData.nuevaContrasena.trim() !== '') {
      usuarioActualizado.inicia_Sesion = function(pass) { return pass === formData.nuevaContrasena; };
    }

    actualizarUsuario(usuarioActualizado);
    setMensajeExito('¡Datos actualizados correctamente!');
    setFormData({ ...formData, nuevaContrasena: '' }); // Limpiamos el campo de clave
  };

  return (
    <div className="flex flex-col flex-grow animate-fade-in bg-cemento">
      <header className="bg-asfalto py-10 text-center border-b-4 border-catYellow">
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Mi Perfil</h1>
        <p className="text-catYellow mt-2">Gestión de cuenta e historial de cotizaciones</p>
      </header>

      <main className="container mx-auto px-4 py-10 flex-grow max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECCIÓN 1: FORMULARIO DE DATOS (Columna Izquierda) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-asfalto">
              <h2 className="text-xl font-bold text-asfalto mb-4 border-b pb-2">Datos Personales</h2>
              
              {mensajeExito && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative text-sm mb-4">
                  {mensajeExito}
                </div>
              )}

              <form onSubmit={guardarCambios} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">RUT (No editable)</label>
                  <input 
                    type="text" 
                    id="rut"
                    value={formData.rut} 
                    disabled // Esto bloquea el campo
                    className="w-full bg-gray-200 border border-gray-300 rounded-lg p-2.5 text-sm text-gray-500 cursor-not-allowed" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">Nombre / Razón Social</label>
                  <input 
                    type="text" 
                    id="nombre"
                    required
                    value={formData.nombre} 
                    onChange={manejarCambio}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="correo"
                    required
                    value={formData.correo} 
                    onChange={manejarCambio}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-carbon mb-1">Nueva Contraseña</label>
                  <input 
                    type="password" 
                    id="nuevaContrasena"
                    value={formData.nuevaContrasena} 
                    onChange={manejarCambio}
                    placeholder="Dejar en blanco para mantener actual"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none" 
                  />
                </div>

                <button type="submit" className="w-full mt-4 bg-asfalto hover:bg-black text-white font-bold py-2 rounded-lg shadow uppercase transition-colors text-sm">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>

          {/* SECCIÓN 2: HISTORIAL DE COTIZACIONES (Columna Derecha) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-catYellow h-full">
              <h2 className="text-xl font-bold text-asfalto mb-4 border-b pb-2">Historial de Cotizaciones</h2>
              
              {miHistorial.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-carbon font-medium">Aún no has generado ninguna cotización.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-carbon text-sm">
                        <th className="p-3 font-bold rounded-tl-lg">N° Cotización</th>
                        <th className="p-3 font-bold">Fecha</th>
                        <th className="p-3 font-bold">Total</th>
                        <th className="p-3 font-bold">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {miHistorial.reverse().map((cot, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                          <td className="p-3 font-bold text-asfalto">#{cot.id_cotizacion}</td>
                          <td className="p-3 text-gray-600">{new Date(cot.fecha_Creacion).toLocaleDateString()}</td>
                          <td className="p-3 font-bold text-green-700">${cot.total.toLocaleString('es-CL')}</td>
                          <td className="p-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full uppercase">
                              {cot.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}