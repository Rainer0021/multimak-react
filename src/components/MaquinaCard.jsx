// src/components/MaquinaCard.jsx

export function MaquinaCard({ maquina, onSeleccionar, formatearPrecio }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
      {/* AQUÍ ESTÁ EL CAMBIO: Apuntamos a la carpeta public */}
      <div className="h-48 overflow-hidden bg-gray-100 border-b-4 border-catYellow">
        <img 
          src={`/${maquina.img}`} 
          alt={`${maquina.marca} ${maquina.modelo}`} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/placeholder.jpg'; }} // Imagen de respaldo por si falta el archivo
        />
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h4 className="text-lg font-black text-asfalto uppercase">{maquina.marca} {maquina.modelo}</h4>
        <p className="text-sm text-gray-500 mb-4 flex-grow">{maquina.tipo}</p>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 text-center">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tarifa Diaria</p>
          <p className="text-xl font-black text-green-700">
            {formatearPrecio ? formatearPrecio(maquina.tarifa_base_dia) : `$${maquina.tarifa_base_dia.toLocaleString('es-CL')}`}
          </p>
        </div>

        <button 
          onClick={() => onSeleccionar(maquina.id_maquina)}
          className="w-full bg-asfalto hover:bg-black text-white font-bold py-2 rounded transition-colors text-sm uppercase"
        >
          Cotizar este equipo
        </button>
      </div>
    </div>
  );
}