import { useState, useEffect } from 'react';

//Data
import { usuariosDemo, Cotizacion, Detalle_Cotizacion } from './data/modelos';
import { catalogoMaquinaria } from './data/maquinaria';

// Componentes
import { Navbar } from './components/barranav';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { Nosotros } from './components/Nosotros';
import { Contacto } from './components/Contacto';
import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { Requerimientos } from './components/Requerimientos';
import { ReciboCotizacion } from './components/ReciboCotizacion';
import { PerfilCliente } from './components/PerfilCliente';
import { PanelAdmin } from './components/PanelAdmin';
import { FormularioCotizacion } from './components/FormularioCotizacion';
import { Catalogo } from './components/Catalogo';

function App() {
  // Estados Usuario y navegacion
  const [vistaActual, setVistaActual] = useState('inicio'); 
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // 1. MODIFICACIÓN: Leer desde Local Storage al iniciar la app
  const [listaUsuarios, setListaUsuarios] = useState(() => {
    const usuariosGuardados = localStorage.getItem('usuarios_multimak');
    // Si hay datos guardados, los usamos. Si no, cargamos los de prueba (usuariosDemo)
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : usuariosDemo;
  });

  // 2. MODIFICACIÓN: Guardar automáticamente en Local Storage cada vez que la lista cambie
  useEffect(() => {
    localStorage.setItem('usuarios_multimak', JSON.stringify(listaUsuarios));
  }, [listaUsuarios]);

  // Estados Mi indicador
  const [indicadores, setIndicadores] = useState(null);
  const [monedaActual, setMonedaActual] = useState('CLP');

  // Estados de formulario
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const [accesoriosSeleccionados, setAccesoriosSeleccionados] = useState([]);
  const [diasArriendo, setDiasArriendo] = useState('');
  const [cotizacionGenerada, setCotizacionGenerada] = useState(null);


  // Cargar API
  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setIndicadores({
          dolar: datos.dolar.valor,
          euro: datos.euro.valor,
          uf: datos.uf.valor,
          utm: datos.utm.valor
        });
      })
      .catch(error => console.error("Error al obtener indicadores:", error));
  }, []);

  // Funciones
  const agregarNuevoUsuario = (nuevoUsuario) => {
    setListaUsuarios([...listaUsuarios, nuevoUsuario]);
  };

  const actualizarUsuarioEnLista = (usuarioActualizado) => {
    const nuevaLista = listaUsuarios.map(u => 
      u.rut === usuarioActualizado.rut ? usuarioActualizado : u
    );
    setListaUsuarios(nuevaLista);
    setUsuarioActivo(usuarioActualizado);
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    setEquipoSeleccionado('');
    setAccesoriosSeleccionados([]);
    setCotizacionGenerada(null);
    setVistaActual('inicio');
  };

  const manejarSeleccionAccesorios = (e) => {
    const opciones = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setAccesoriosSeleccionados(opciones);
  };

  const formatearPrecio = (precioCLP) => {
    if (monedaActual === 'CLP' || !indicadores) return `$${precioCLP.toLocaleString('es-CL')}`;
    if (monedaActual === 'USD') return `$${(precioCLP / indicadores.dolar).toFixed(2)} USD`;
    if (monedaActual === 'EUR') return `€${(precioCLP / indicadores.euro).toFixed(2)}`;
    if (monedaActual === 'UF') return `${(precioCLP / indicadores.uf).toFixed(4)} UF`;
    if (monedaActual === 'UTM') return `${(precioCLP / indicadores.utm).toFixed(4)} UTM`;
  };

  const generarCotizacion = (e) => {
    e.preventDefault();
    if (!equipoSeleccionado || !diasArriendo || diasArriendo <= 0) return;

    const maquina = catalogoMaquinaria.find(m => m.id_maquina === parseInt(equipoSeleccionado));
    const detalle = new Detalle_Cotizacion(Math.floor(Math.random() * 10000), maquina, parseInt(diasArriendo));

    accesoriosSeleccionados.forEach(idAcc => {
      const accEncontrado = maquina.accesoriosCompatibles.find(a => a.id_accesorio === idAcc);
      if (accEncontrado) detalle.agregar_Accesorio(accEncontrado);
    });

    const nuevaCotizacion = new Cotizacion(Math.floor(Math.random() * 100000), usuarioActivo);
    nuevaCotizacion.agregar_Detalle(detalle);
    nuevaCotizacion.calcular_Total();

    const cotizacionesGuardadas = JSON.parse(localStorage.getItem('cotizacionesMultimak')) || [];
    cotizacionesGuardadas.push(nuevaCotizacion);
    localStorage.setItem('cotizacionesMultimak', JSON.stringify(cotizacionesGuardadas));

    setCotizacionGenerada(nuevaCotizacion);
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="min-h-screen flex flex-col bg-cemento font-sans">
      <Navbar 
        vistaActual={vistaActual} 
        setVistaActual={setVistaActual} 
        usuarioActivo={usuarioActivo} 
        cerrarSesion={cerrarSesion} 
      />

      {/* RUTEO DE VISTAS INDEPENDIENTES */}
      {vistaActual === 'login' && !usuarioActivo && (
        <Login listaUsuarios={listaUsuarios} setUsuarioActivo={setUsuarioActivo} setVistaActual={setVistaActual} />
      )}

      {vistaActual === 'registro' && !usuarioActivo && (
        <Registro alRegistrarUsuario={agregarNuevoUsuario} setVistaActual={setVistaActual} />
      )}

      {vistaActual === 'nosotros' && <Nosotros />}
      {vistaActual === 'contacto' && <Contacto />}
      {vistaActual === 'requerimientos' && <Requerimientos />}
      
      {vistaActual === 'perfil' && usuarioActivo && (
        <PerfilCliente 
          usuarioActivo={usuarioActivo} 
          actualizarUsuario={actualizarUsuarioEnLista} 
        />
      )}

      {/* VISTA PRINCIPAL (INICIO) */}
      {vistaActual === 'inicio' && (
        <div className="flex-grow flex flex-col animate-fade-in">
          <HeroBanner titulo="Catálogo MULTIMAK" subtitulo="La mejor maquinaria pesada para tu proyecto." />

          <main className="container mx-auto px-4 py-10 flex-grow">
            {usuarioActivo?.rol === 'ADMIN' ? (
              
              /* PANEL DE ADMINISTRADOR */
              <PanelAdmin />

            ) : (
              
              /* VISTA DE CATÁLOGO (PÚBLICA O CLIENTE) */
              <>
                {cotizacionGenerada ? (
                  <ReciboCotizacion 
                    cotizacion={cotizacionGenerada} 
                    onVolver={() => setCotizacionGenerada(null)} 
                    formatearPrecio={formatearPrecio}
                    monedaActual={monedaActual}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* COLUMNA IZQUIERDA: CATÁLOGO MODULAR */}
                    <div className="lg:col-span-7">
                      <Catalogo 
                        catalogoMaquinaria={catalogoMaquinaria}
                        monedaActual={monedaActual}
                        setMonedaActual={setMonedaActual}
                        indicadores={indicadores}
                        formatearPrecio={formatearPrecio}
                        usuarioActivo={usuarioActivo}
                        setVistaActual={setVistaActual}
                        setEquipoSeleccionado={setEquipoSeleccionado}
                        setAccesoriosSeleccionados={setAccesoriosSeleccionados}
                      />
                    </div>

                    {/* COLUMNA DERECHA: FORMULARIO O AVISO DE LOGIN */}
                    <div className="lg:col-span-5">
                      {!usuarioActivo ? (
                        <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-asfalto text-center sticky top-24">
                          <h4 className="text-lg font-bold text-asfalto mb-2">¿Necesitas cotizar?</h4>
                          <p className="text-carbon text-sm mb-6">Para generar una cotización oficial de nuestros equipos debes tener una cuenta registrada.</p>
                          <button onClick={() => setVistaActual('login')} className="w-full bg-catYellow hover:bg-catYellowHover text-asfalto font-bold py-3 rounded-lg uppercase transition-colors">
                            Iniciar Sesión
                          </button>
                        </div>
                      ) : (
                        <FormularioCotizacion 
                          catalogoMaquinaria={catalogoMaquinaria}
                          formatearPrecio={formatearPrecio}
                          equipoSeleccionado={equipoSeleccionado}
                          setEquipoSeleccionado={setEquipoSeleccionado}
                          diasArriendo={diasArriendo}
                          setDiasArriendo={setDiasArriendo}
                          accesoriosSeleccionados={accesoriosSeleccionados}
                          manejarSeleccionAccesorios={manejarSeleccionAccesorios}
                          generarCotizacion={generarCotizacion}
                        />
                      )}
                    </div>

                  </div>
                )}
              </>
            )}
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;