// src/components/PanelAdmin.jsx
import { useState, useEffect } from 'react';

export function PanelAdmin() {
  const [listaCotizaciones, setListaCotizaciones] = useState([]);

  // Al montar el componente, cargamos las cotizaciones
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('cotizacionesMultimak')) || [];
    setListaCotizaciones(guardadas);
  }, []);

  // Función para modificar el estado y guardar
  const cambiarEstadoCotizacion = (idCotizacion, nuevoEstado) => {
    const guardadas = JSON.parse(localStorage.getItem('cotizacionesMultimak')) || [];
    const actualizadas = guardadas.map(cot => {
      if (cot.id_cotizacion === idCotizacion) {
        return { ...cot, estado: nuevoEstado };
      }
      return cot;
    });

    localStorage.setItem('cotizacionesMultimak', JSON.stringify(actualizadas));
    setListaCotizaciones(actualizadas);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow border-t-4 border-asfalto animate-fade-in">
      <h2 className="text-2xl font-bold text-asfalto mb-6 border-b pb-2">Panel de Control: Cotizaciones</h2>
      
      {listaCotizaciones.length === 0 ? (
        <p className="text-center py-10 text-carbon font-medium">No hay cotizaciones registradas en el sistema.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-asfalto text-white">
                <th className="p-4 rounded-tl-lg">ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">RUT</th>
                <th className="p-4">Total Neto</th>
                <th className="p-4">Estado actual</th>
                <th className="p-4 rounded-tr-lg text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaCotizaciones.reverse().map((cot, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-700">#{cot.id_cotizacion}</td>
                  <td className="p-4 text-sm font-semibold">{cot.cliente.nombre_Usuario}</td>
                  <td className="p-4 text-xs text-gray-500">{cot.cliente.rut}</td>
                  <td className="p-4 font-black text-green-700">${cot.total.toLocaleString('es-CL')}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase
                      ${cot.estado === 'Validada' ? 'bg-green-100 text-green-800' : 
                        cot.estado === 'Rechazada' ? 'bg-red-100 text-red-800' : 
                        cot.estado === 'Completada' ? 'bg-gray-200 text-gray-800' : 
                        'bg-blue-100 text-blue-800'}`}
                    >
                      {cot.estado}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select 
                      onChange={(e) => {
                        if(e.target.value) cambiarEstadoCotizacion(cot.id_cotizacion, e.target.value);
                        e.target.value = ""; 
                      }}
                      className="bg-white border border-gray-300 text-xs rounded shadow-sm focus:ring-catYellow focus:border-catYellow px-2 py-1 cursor-pointer"
                    >
                      <option value="">Cambiar a...</option>
                      <option value="Validada">Aprobar (Validar)</option>
                      <option value="Rechazada">Rechazar</option>
                      <option value="Completada">Marcar Completada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}