import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';

<<<<<<< HEAD
=======
// Formateo de rut
>>>>>>> b26dbbe5adcf7915b678ade59686ae1028310495
const formatearRUT = (rut) => {
  let valor = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  
  if (valor.length === 0) return '';
  if (valor.length === 1) return valor;
  
  let cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1);
  
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `${cuerpo}-${dv}`;
};

export function Login({ listaUsuarios, setUsuarioActivo, setVistaActual }) {
  const [correo, setCorreo] = useState('');
  const [rut, setRut] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Cambio de rut auto
  const manejarCambioRut = (e) => {
    const rutFormateado = formatearRUT(e.target.value);
    setRut(rutFormateado);
  };

const manejarSubmit = (e) => {
  e.preventDefault();
  
  // 1. Buscamos al usuario por su correo
  const usuarioEncontrado = listaUsuarios.find(u => u.correo === correo);
  
  if (usuarioEncontrado) {
    // 2. Transformamos la contraseña escrita al formato seguro
    const intentoPassword = SHA256(contrasena).toString();

<<<<<<< HEAD
    // 3. Verificamos si la contraseña coincide
    if (usuarioEncontrado.contrasena === intentoPassword) {
      
      // --- VALIDACIÓN 1: CUENTA DESACTIVADA ---
      // Si la propiedad 'activo' es exactamente false, bloqueamos el paso
      if (usuarioEncontrado.activo === false) {
        alert("⚠️ ACCESO DENEGADO: Su cuenta ha sido desactivada por administración.");
        return; // El 'return' corta la función aquí mismo y no lo deja entrar
=======
      // 3. Comparamos los Hashes directamente
      if (usuarioEncontrado.contrasena === intentoPassword) {
        
        // 4. Verificación de seguridad secundaria (RUT)
        if (usuarioEncontrado.rol === 'CLIENTE' && usuarioEncontrado.rut !== rut) {
          alert("Acceso denegado: El RUT no coincide con los registros del sistema.");
          return;
        }
        
        setUsuarioActivo(usuarioEncontrado);
        setVistaActual('inicio');
      } else { 
        alert("Acceso denegado: Contraseña incorrecta."); 
>>>>>>> b26dbbe5adcf7915b678ade59686ae1028310495
      }

      // --- VALIDACIÓN 2: COINCIDENCIA DE RUT ---
      if (usuarioEncontrado.rol === 'CLIENTE' && usuarioEncontrado.rut !== rut) {
        alert("Acceso denegado: El RUT no coincide con los registros del sistema.");
        return;
      }
      
      // --- ÉXITO: Si pasó las barreras de arriba, entra al sistema ---
      setUsuarioActivo(usuarioEncontrado);
      setVistaActual('inicio');

    } else { 
      alert("Acceso denegado: Contraseña incorrecta."); 
    }
  } else { 
    alert("Acceso denegado: Usuario no encontrado."); 
  }
};

  return (
    <div className="flex-grow flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-catYellow max-w-md w-full">
        <h2 className="text-2xl font-black text-asfalto text-center uppercase tracking-tight mb-6">
          Acceso a Clientes
        </h2>
        
        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-carbon mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-catYellow focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-carbon mb-1">RUT Empresa / Persona</label>
            <input 
              type="text" 
              required 
              value={rut} 
              onChange={manejarCambioRut} 
              maxLength={12} 
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-catYellow focus:outline-none" 
              placeholder="Ej: 76.123.456-7"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-carbon mb-1">Contraseña</label>
            <input 
              type="password" 
              required 
              value={contrasena} 
              onChange={(e) => setContrasena(e.target.value)} 
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-catYellow focus:outline-none" 
            />
          </div>
          <button type="submit" className="w-full mt-6 bg-catYellow hover:bg-catYellowHover text-asfalto font-bold py-3 rounded-lg shadow uppercase transition-colors">
            Ingresar
          </button>
        </form>

        <div className="text-center mt-4">
          <button 
            type="button"
            onClick={() => setVistaActual('registro')} 
            className="text-xs text-asfalto font-semibold hover:underline"
          >
            ¿No tiene cuenta de empresa? Regístrese aquí
          </button>
        </div>
      </div>
    </div>
  );
}