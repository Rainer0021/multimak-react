export function FormularioCotizacion({ 
  catalogoMaquinaria, 
  formatearPrecio, 
  equipoSeleccionado, 
  setEquipoSeleccionado, 
  diasArriendo, 
  setDiasArriendo, 
  accesoriosSeleccionados, 
  manejarSeleccionAccesorios, 
  generarCotizacion 
}) {
  
  // Revisamos si el equipo actual permite accesorios
  const equipoActual = catalogoMaquinaria.find(m => m.id_maquina === parseInt(equipoSeleccionado));
  const tieneAccesorios = equipoActual && equipoActual.accesoriosCompatibles.length > 0;

  return (
    <form onSubmit={generarCotizacion} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-catYellow sticky top-24">
      <h4 className="text-lg font-bold text-asfalto text-center mb-4 uppercase">Requerimiento Técnico</h4>
      
      <div className="space-y-4">
        {/* 1. Selector de Equipo */}
        <div>
          <label className="block text-sm font-bold text-carbon mb-1">1. Equipo:</label>
          <select 
            required 
            value={equipoSeleccionado} 
            onChange={(e) => setEquipoSeleccionado(e.target.value)} 
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none"
          >
            <option value="">-- Seleccionar --</option>
            {catalogoMaquinaria.map(m => (
              <option key={m.id_maquina} value={m.id_maquina}>
                {m.marca} {m.modelo} - {formatearPrecio(m.tarifa_base_dia)} /día
              </option>
            ))}
          </select>
        </div>

        {/* 2. Selector de Días (Límite aplicado) */}
        <div>
          <label className="block text-sm font-bold text-carbon mb-1">2. Días de Arriendo (Máx. 29):</label>
          <input 
            type="number" 
            min="1" 
            max="29"
            required 
            value={diasArriendo} 
            onChange={(e) => {
              // Validación extra de seguridad por si el cliente escribe manual
              const valor = parseInt(e.target.value);
              if (valor > 29) setDiasArriendo(29);
              else setDiasArriendo(e.target.value);
            }} 
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none" 
          />
        </div>

        {/* 3. Selector de Accesorios */}
        <div>
          <label className="block text-sm font-bold text-carbon mb-1">3. Accesorios (Opcional):</label>
          <select 
            multiple 
            size={3} 
            disabled={!tieneAccesorios} 
            value={accesoriosSeleccionados} 
            onChange={manejarSeleccionAccesorios} 
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm disabled:bg-gray-100 focus:ring-catYellow focus:outline-none"
          >
            {tieneAccesorios ? equipoActual.accesoriosCompatibles.map(acc => (
              <option key={acc.id_accesorio} value={acc.id_accesorio}>
                {acc.nombre} (+{formatearPrecio(acc.tarifa_extra_dia)}/día)
              </option>
            )) : (
              <option disabled>No aplica para este equipo</option>
            )}
          </select>
          <p className="text-xs text-gray-500 mt-1">Mantenga presionada la tecla Ctrl para seleccionar varios.</p>
        </div>

        {/* Disclaimer Corregido para trabajos superiores a un mes */}
        <div className="bg-gray-50 border-l-4 border-gray-400 p-3 mt-4 rounded shadow-sm">
          <p className="text-xs text-gray-600">
            <strong>Nota importante:</strong> Para trabajos con duración superior a 1 mes (30 días o más), la cotización se realiza por hora (horómetro). Por favor, realice su solicitud directamente en la sección de Contacto.
          </p>
        </div>

        <button type="submit" className="w-full mt-2 bg-catYellow hover:bg-catYellowHover text-asfalto font-bold py-3 rounded-lg shadow-md uppercase transition-colors">
          Generar Cotización
        </button>
      </div>
    </form>
  );
}