import { MaquinaCard } from './MaquinaCard';

export function Catalogo({ 
  catalogoMaquinaria, 
  monedaActual, 
  setMonedaActual, 
  indicadores, 
  formatearPrecio, 
  usuarioActivo, 
  setVistaActual, 
  setEquipoSeleccionado, 
  setAccesoriosSeleccionados 
}) {
  return (
    <>
      {/* Encabezado y Selector de Moneda */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 pb-2 border-b-2 border-gray-200">
        <h3 className="text-xl font-bold text-asfalto mb-2 md:mb-0">Equipos Disponibles</h3>
        <div className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm border border-gray-200">
          <label className="text-xs font-bold text-gray-500 uppercase">Moneda:</label>
          <select 
            value={monedaActual} 
            onChange={(e) => setMonedaActual(e.target.value)}
            disabled={!indicadores}
            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-catYellow focus:border-catYellow px-2 py-1"
          >
            <option value="CLP">Pesos (CLP)</option>
            <option value="USD">Dólar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="UF">UF</option>
            <option value="UTM">UTM</option>
          </select>
        </div>
      </div>

      {/* Grilla de Equipos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {catalogoMaquinaria.map((maquina) => (
          <MaquinaCard 
            key={maquina.id_maquina} 
            maquina={maquina} 
            formatearPrecio={formatearPrecio}
            onSeleccionar={(id) => {
              if(!usuarioActivo) {
                setVistaActual('login');
              } else { 
                setEquipoSeleccionado(id); 
                setAccesoriosSeleccionados([]); 
              }
            }} 
          />
        ))}
      </div>
    </>
  );
}