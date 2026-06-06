import { useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export function ReciboCotizacion({ cotizacion, onVolver, formatearPrecio, monedaActual }) {
  const reciboRef = useRef(null);

  const descargarPDF = async () => {
    try {
      const elemento = reciboRef.current;
      
      if (!elemento) {
        alert("Error: No se encontró el contenido del recibo para exportar.");
        return;
      }

      // 1. Usamos toPng de html-to-image (soporta oklch y CSS moderno)
      const dataUrl = await toPng(elemento, { 
        backgroundColor: '#ffffff', 
        pixelRatio: 2 // Equivalente al scale: 2 para mantener alta calidad
      });
      
      // 2. Inicializamos el PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 3. Calculamos proporciones basándonos en el contenedor real
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (elemento.offsetHeight * pdfWidth) / elemento.offsetWidth;
      
      // 4. Agregamos la imagen y guardamos
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Cotizacion_MULTIMAK_${cotizacion.id_cotizacion}.pdf`);

    } catch (error) {
      console.error("Error al generar el archivo PDF:", error);
      alert("Hubo un problema al procesar el archivo. Revisa la consola del navegador.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      
      {/* ZONA DE CAPTURA */}
      <div 
        ref={reciboRef} 
        className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-catYellow mb-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-asfalto tracking-tight">COTIZACIÓN #{cotizacion.id_cotizacion}</h2>
          <p className="text-green-600 font-bold mt-2 text-sm uppercase tracking-wider">Documento Oficial de Reserva</p>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 uppercase font-bold text-xs">Datos del Cliente</p>
            <p className="font-semibold text-carbon mt-1">{cotizacion.cliente.nombre_Usuario}</p>
            <p className="text-gray-600">{cotizacion.cliente.rut}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-gray-500 uppercase font-bold text-xs">Detalles de Emisión</p>
            <p className="text-gray-700 mt-1"><strong>Fecha:</strong> {new Date(cotizacion.fecha_Creacion).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500 mt-1">Validez: 15 días corridos</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Ítems Solicitados</h3>
          {cotizacion.detalles.map(det => (
            <div key={det.id_detalle} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-asfalto uppercase">{det.maquina.marca} {det.maquina.modelo}</p>
                  <p className="text-xs text-gray-500 uppercase mt-0.5">{det.maquina.tipo}</p>
                </div>
                <p className="text-sm font-semibold text-carbon bg-white px-2.5 py-1 rounded border border-gray-200 shadow-sm">
                  {det.cantidad_Dias} día(s)
                </p>
              </div>
              
              {det.accesorios.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Configuración / Accesorios:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {det.accesorios.map(a => (
                      <span key={a.id_accesorio} className="bg-white border text-gray-700 text-xs px-2 py-0.5 rounded shadow-xs">
                        {a.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-asfalto text-white p-4 rounded-lg text-right shadow-inner">
          <p className="text-xs text-gray-400 uppercase font-bold mb-2">
            Resumen en Moneda: <span className="text-catYellow">{monedaActual}</span>
          </p>
          <div className="space-y-1 text-sm border-b border-gray-700 pb-2 mb-2">
            <p className="text-gray-300">Subtotal Neto: <span className="text-white font-medium">{formatearPrecio(cotizacion.subtotal)}</span></p>
            <p className="text-gray-300">IVA (19%): <span className="text-white font-medium">{formatearPrecio(cotizacion.iva)}</span></p>
          </div>
          <p className="text-2xl font-black text-catYellow">
            TOTAL: {formatearPrecio(cotizacion.total)}
          </p>
        </div>
      </div>
      {/* FIN ZONA DE CAPTURA */}

      {/* BOTONES DE INTERACCIÓN */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={descargarPDF}
          className="flex-1 bg-asfalto hover:bg-black text-white font-bold py-3.5 rounded-lg uppercase transition-colors shadow-md flex justify-center items-center text-sm tracking-wider"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar Cotización (PDF)
        </button>

        <button 
          onClick={onVolver}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-carbon font-bold py-3.5 rounded-lg uppercase transition-colors text-sm tracking-wider border border-gray-300"
        >
          Volver al Catálogo
        </button>
      </div>

    </div>
  );
}