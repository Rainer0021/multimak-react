import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';

// Validacion de rut
const validarRUT = (rut) => {
  const valorLimpio = rut.replace(/\./g, '').replace(/-/g, '');
  const cuerpo = valorLimpio.slice(0, -1);
  const dv = valorLimpio.slice(-1).toUpperCase();

  if (cuerpo.length < 7) return false;

  if (/^(\d)\1+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;

  for (let i = 1; i <= cuerpo.length; i++) {
    const multiplicacion = multiplo * parseInt(valorLimpio.charAt(cuerpo.length - i));
    suma += multiplicacion;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dvCalculado === dv;
};

const formatearRUT = (rut) => {
  let valor = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (valor.length === 0) return '';
  if (valor.length === 1) return valor;
  
  let cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${cuerpo}-${dv}`;
};

const esMayorDeEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();

  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad >= 18;
};

const validarContrasenaFuerte = (contrasena) => {
  const regex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
  return regex.test(contrasena);
};

const validarCorreo = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

export function Registro({ alRegistrarUsuario, setVistaActual }) {
  const [tipoRegistro, setTipoRegistro] = useState('natural');

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rut: '',
    fechaNacimiento: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [errorRut, setErrorRut] = useState('');
  const [errorEdad, setErrorEdad] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const [errorCorreo, setErrorCorreo] = useState(''); 

  const hoyTexto = new Date().toISOString().split('T')[0];

  const manejarCambio = (e) => {
    const { id, value } = e.target;
    let valorFinal = value;

    if (id === 'rut') {
      valorFinal = formatearRUT(value);
      setErrorRut(''); 
    }

    if (id === 'fechaNacimiento') setErrorEdad(''); 
    if (id === 'correo') setErrorCorreo(''); 
    if (id === 'contrasena' || id === 'confirmarContrasena') setErrorContrasena(''); 

    setFormData({ ...formData, [id]: valorFinal });
  };

  const manejarRegistro = (e) => {
    e.preventDefault();

    if (!validarRUT(formData.rut)) {
      setErrorRut('El RUT ingresado no es válido.');
      return;
    }

    if (!validarCorreo(formData.correo)) {
      setErrorCorreo('Debe ingresar un correo electrónico válido (ejemplo: usuario@dominio.com).');
      return;
    }

    if (tipoRegistro === 'natural') {
      if (!esMayorDeEdad(formData.fechaNacimiento)) {
        setErrorEdad('Debe ser mayor de 18 años para registrarse como persona natural.');
        return;
      }
    } else {
      if (formData.fechaNacimiento > hoyTexto) {
        setErrorEdad('La fecha de constitución no puede ser una fecha futura.');
        return;
      }
    }

    if (!validarContrasenaFuerte(formData.contrasena)) {
      setErrorContrasena('La contraseña no cumple con los requisitos mínimos de seguridad.');
      return;
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      setErrorContrasena('Las contraseñas no coinciden.');
      return;
    }

    // APLICACIÓN DEL CIFRADO DE UNA VÍA
    const passwordSegura = SHA256(formData.contrasena).toString();

    // Creación del usuario con la contraseña transformada
    const nuevoUsuario = {
      nombre_Usuario: formData.nombre,
      correo: formData.correo,
      rut: formData.rut, 
      fecha_nacimiento: formData.fechaNacimiento,
      tipo_cliente: tipoRegistro,
      rol: 'CLIENTE',
      contrasena: passwordSegura
    };

    alRegistrarUsuario(nuevoUsuario);
    alert("¡Registro exitoso! Ya puede iniciar sesión.");
    setVistaActual('login');
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 animate-fade-in my-10">
      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-catYellow max-w-md w-full">
        <h2 className="text-2xl font-black text-asfalto text-center uppercase tracking-tight mb-2">
          Crear Cuenta
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Seleccione su perfil para acceder al cotizador.
        </p>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6 border border-gray-200">
          <button
            type="button"
            onClick={() => { setTipoRegistro('natural'); setErrorEdad(''); }}
            className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors ${
              tipoRegistro === 'natural' ? 'bg-white shadow text-asfalto border border-gray-200' : 'text-gray-400 hover:text-carbon'
            }`}
          >
            Persona Natural
          </button>
          <button
            type="button"
            onClick={() => { setTipoRegistro('empresa'); setErrorEdad(''); }}
            className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors ${
              tipoRegistro === 'empresa' ? 'bg-white shadow text-asfalto border border-gray-200' : 'text-gray-400 hover:text-carbon'
            }`}
          >
            Empresa
          </button>
        </div>

        <form onSubmit={manejarRegistro} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-carbon mb-1">
              {tipoRegistro === 'natural' ? 'Nombre Completo' : 'Razón Social'}
            </label>
            <input type="text" id="nombre" required value={formData.nombre} onChange={manejarCambio} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-catYellow focus:outline-none" placeholder={tipoRegistro === 'natural' ? 'Ej: Juan Pérez' : 'Ej: Constructora Natales SpA'} />
          </div>

          <div>
            <label className="block text-sm font-bold text-carbon mb-1">
              {tipoRegistro === 'natural' ? 'RUT Personal' : 'RUT Empresa'}
            </label>
            <input type="text" id="rut" required value={formData.rut} onChange={manejarCambio} maxLength={12} className={`w-full bg-gray-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errorRut ? 'border-red-500' : 'border-gray-300'}`} placeholder="Ej: 76.123.456-7" />
            {errorRut && <p className="text-red-500 text-xs mt-1 font-semibold">{errorRut}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-carbon mb-1">
              {tipoRegistro === 'natural' ? 'Fecha de Nacimiento' : 'Fecha de Constitución'}
            </label>
            <input 
              type="date" 
              id="fechaNacimiento" 
              required 
              max={hoyTexto} 
              value={formData.fechaNacimiento} 
              onChange={manejarCambio} 
              className={`w-full bg-gray-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errorEdad ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errorEdad && <p className="text-red-500 text-xs mt-1 font-semibold">{errorEdad}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-carbon mb-1">Correo Electrónico</label>
            <input type="email" id="correo" required value={formData.correo} onChange={manejarCambio} className={`w-full bg-gray-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errorCorreo ? 'border-red-500' : 'border-gray-300'}`} placeholder="ejemplo@correo.com" />
            {errorCorreo && <p className="text-red-500 text-xs mt-1 font-semibold">{errorCorreo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-carbon mb-1">Contraseña</label>
              <input 
                type="password" 
                id="contrasena" 
                required 
                value={formData.contrasena} 
                onChange={manejarCambio} 
                className={`w-full bg-gray-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errorContrasena ? 'border-red-500' : 'border-gray-300'}`} 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-carbon mb-1">Confirmar</label>
              <input 
                type="password" 
                id="confirmarContrasena" 
                required 
                value={formData.confirmarContrasena} 
                onChange={manejarCambio} 
                className={`w-full bg-gray-50 border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-catYellow ${errorContrasena ? 'border-red-500' : 'border-gray-300'}`} 
              />
            </div>
          </div>
          
          <div className="mt-1">
            {errorContrasena ? (
              <p className="text-red-500 text-xs font-semibold">{errorContrasena}</p>
            ) : (
              <p className="text-gray-500 text-xs">Debe contener mín. 8 caracteres, 1 número y 1 símbolo (ej: @, #, -).</p>
            )}
          </div>

          <button type="submit" className="w-full mt-4 bg-catYellow hover:bg-catYellowHover text-asfalto font-bold py-3 rounded-lg shadow uppercase transition-colors">
            Crear Cuenta
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => setVistaActual('login')} className="text-xs text-asfalto font-semibold hover:underline">
            ¿Ya tiene una cuenta? Inicie sesión
          </button>
        </div>
      </div>
    </div>
  );
}