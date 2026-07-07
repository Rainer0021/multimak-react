<<<<<<< HEAD
// src/components/PanelAdmin.jsx
import { useState } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> b26dbbe5adcf7915b678ade59686ae1028310495

export function PanelAdmin({ listaUsuarios, setListaUsuarios, maquinaria, setMaquinaria }) {
  const [pestaña, setPestaña] = useState('maquinaria');

  // Estado para el formulario de CREAR MAQUINARIA
  const [nuevaMaquina, setNuevaMaquina] = useState({
    nombre: '',
    marca: 'Caterpillar',
    modelo: '',
    precio_arriendo_dia: '',
    categoria: 'Excavación',
    stock: 1,
    imagen: '/CATERPILLAR 416E.jpg' // Imagen por defecto
  });

  // ==========================================
  // LÓGICA CRUD 1: MAQUINARIA (Create & Delete)
  // ==========================================
  const manejarCrearMaquina = (e) => {
    e.preventDefault();
    if (!nuevaMaquina.nombre || !nuevaMaquina.precio_arriendo_dia) return;

    // Transacción JS: Crear nuevo documento estructurado JSON
    const maquinaLista = {
      id_maquina: Date.now(), // ID único basado en timestamp
      nombre: nuevaMaquina.nombre,
      marca: nuevaMaquina.marca,
      modelo: nuevaMaquina.modelo,
      precio_arriendo_dia: parseInt(nuevaMaquina.precio_arriendo_dia),
      categoria: nuevaMaquina.categoria,
      stock: parseInt(nuevaMaquina.stock),
      imagen: nuevaMaquina.imagen,
      accesoriosCompatibles: [] // Arreglo vacío por defecto
    };

    // Actualizamos el estado (el useEffect de App.jsx lo guardará en localStorage)
    setMaquinaria([...maquinaria, maquinaLista]);
    alert("✅ Maquinaria agregada exitosamente al catálogo.");
    
    // Limpiar formulario
    setNuevaMaquina({ nombre: '', marca: 'Caterpillar', modelo: '', precio_arriendo_dia: '', categoria: 'Excavación', stock: 1, imagen: '/CATERPILLAR 416E.jpg' });
  };

  const manejarEliminarMaquina = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este equipo del catálogo?");
    if (confirmacion) {
      // Transacción JS: Filtrar el arreglo para remover el ID seleccionado
      const catalogoActualizado = maquinaria.filter(m => m.id_maquina !== id);
      setMaquinaria(catalogoActualizado);
    }
  };

  // ==========================================
  // LÓGICA CRUD 2: USUARIOS (Update / Soft Delete)
  // ==========================================
  const alternarEstadoUsuario = (rutUsuario) => {
    // Transacción JS: Mapeamos la lista y alternamos la propiedad 'activo'
    const listaActualizada = listaUsuarios.map(u => {
      if (u.rut === rutUsuario) {
        // Si no tiene la propiedad 'activo', asumimos que era true y la pasamos a false
        const estadoActual = u.activo !== undefined ? u.activo : true;
        return { ...u, activo: !estadoActual };
      }
      return u;
    });

    setListaUsuarios(listaActualizada);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border-t-8 border-asfalto overflow-hidden animate-fade-in my-6">
      
      {/* Cabecera del Panel */}
      <div className="bg-asfalto p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="bg-catYellow text-asfalto text-[10px] font-black px-2 py-0.5 rounded uppercase">Consola de Control</span>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mt-1">Administración MULTIMAK</h2>
        </div>
        
        {/* Selector de Pestañas */}
        <div className="flex bg-white/10 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setPestaña('maquinaria')}
            className={`px-4 py-2 rounded text-xs font-black uppercase transition-all ${pestaña === 'maquinaria' ? 'bg-catYellow text-asfalto shadow' : 'text-gray-300 hover:text-white'}`}
          >
            Flota ({maquinaria?.length || 0})
          </button>
          <button 
            onClick={() => setPestaña('usuarios')}
            className={`px-4 py-2 rounded text-xs font-black uppercase transition-all ${pestaña === 'usuarios' ? 'bg-catYellow text-asfalto shadow' : 'text-gray-300 hover:text-white'}`}
          >
            Clientes ({listaUsuarios?.length || 0})
          </button>
        </div>
      </div>

      <div className="p-6">
        
        {/* PESTAÑA 1: GESTIÓN DE FLOTA (CRUD MAQUINARIA) */}
        {pestaña === 'maquinaria' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Formulario de Creación (5 Columnas) */}
            <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-black text-asfalto uppercase tracking-tight mb-4 pb-2 border-b border-gray-300">
                + Ingresar Nueva Maquinaria
              </h3>
              <form onSubmit={manejarCrearMaquina} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nombre Equipo / Modelo</label>
                  <input 
                    type="text" required placeholder="Ej: Excavadora 320D"
                    value={nuevaMaquina.nombre} onChange={e => setNuevaMaquina({...nuevaMaquina, nombre: e.target.value})}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-sm font-semibold focus:border-catYellow outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Categoría</label>
                    <select 
                      value={nuevaMaquina.categoria} onChange={e => setNuevaMaquina({...nuevaMaquina, categoria: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded p-2 text-sm font-semibold focus:border-catYellow outline-none"
                    >
                      <option value="Excavación">Excavación</option>
                      <option value="Carga">Carga</option>
                      <option value="Compactación">Compactación</option>
                      <option value="Generación">Generación</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Stock disponible</label>
                    <input 
                      type="number" min="1" required
                      value={nuevaMaquina.stock} onChange={e => setNuevaMaquina({...nuevaMaquina, stock: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded p-2 text-sm font-semibold focus:border-catYellow outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Precio Arriendo Diario (CLP)</label>
                  <input 
                    type="number" required placeholder="Ej: 150000"
                    value={nuevaMaquina.precio_arriendo_dia} onChange={e => setNuevaMaquina({...nuevaMaquina, precio_arriendo_dia: e.target.value})}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-sm font-semibold focus:border-catYellow outline-none"
                  />
                </div>
                <button type="submit" className="w-full bg-catYellow hover:bg-catYellowHover text-asfalto font-black py-3 rounded shadow uppercase text-xs tracking-wider transition-transform active:scale-95">
                  Registrar en Catálogo
                </button>
              </form>
            </div>

            {/* Lista de Maquinaria Existente con botón Eliminar (7 Columnas) */}
            <div className="lg:col-span-7">
              <h3 className="text-lg font-black text-asfalto uppercase tracking-tight mb-4">
                Inventario Activo en Sistema
              </h3>
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                {maquinaria?.map(m => (
                  <div key={m.id_maquina} className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-xs hover:border-catYellow transition-colors">
                    <div>
                      <span className="text-[10px] font-black bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase">{m.categoria}</span>
                      <h4 className="font-bold text-asfalto text-sm mt-1">{m.nombre}</h4>
                      <p className="text-xs text-gray-500 font-semibold">${m.precio_arriendo_dia?.toLocaleString('es-CL')} / día | Stock: {m.stock}</p>
                    </div>
                    <button 
                      onClick={() => manejarEliminarMaquina(m.id_maquina)}
                      className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white font-black px-3 py-2 rounded text-xs uppercase transition-colors"
                      title="Eliminar del catálogo"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* PESTAÑA 2: GESTIÓN DE USUARIOS (CRUD DESACTIVACIÓN) */}
        {pestaña === 'usuarios' && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-black text-asfalto uppercase tracking-tight mb-4">
              Control de Accesos y Estado de Cuentas
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300 text-[11px] font-black uppercase text-gray-600">
                    <th className="p-3">RUT</th>
                    <th className="p-3">Nombre / Razón Social</th>
                    <th className="p-3">Correo</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3 text-center">Estado</th>
                    <th className="p-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {listaUsuarios?.map(u => {
                    // Si no está definido, por defecto es true
                    const estaActivo = u.activo !== undefined ? u.activo : true;
                    
                    return (
                      <tr key={u.rut || u.correo} className={!estaActivo ? 'bg-red-50/50 opacity-60' : ''}>
                        <td className="p-3 font-mono font-bold text-xs">{u.rut || 'N/A'}</td>
                        <td className="p-3 font-bold text-asfalto">{u.nombre_Usuario}</td>
                        <td className="p-3 text-gray-600 text-xs">{u.correo}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${u.rol === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {u.rol}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`text-xs font-black px-2.5 py-1 rounded-full uppercase ${estaActivo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {estaActivo ? '🟢 Activo' : '🔴 Desactivado'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {/* No permitimos que un ADMIN se desactive a sí mismo por seguridad */}
                          {u.rol !== 'ADMIN' && (
                            <button 
                              onClick={() => alternarEstadoUsuario(u.rut)}
                              className={`text-xs font-black px-3 py-1.5 rounded uppercase transition-colors ${
                                estaActivo 
                                  ? 'bg-red-500 hover:bg-red-700 text-white shadow-xs' 
                                  : 'bg-green-500 hover:bg-green-700 text-white shadow-xs'
                              }`}
                            >
                              {estaActivo ? 'Bloquear' : 'Reactivar'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}  