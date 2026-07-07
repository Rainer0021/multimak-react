// 1. Clase Base
export class Usuario {
  constructor(id_usuario, nombre_Usuario, correo, contrasena, activo = true) {
    this.id_usuario = id_usuario;
    this.nombre_Usuario = nombre_Usuario;
    this.correo = correo;
    this.contrasena = contrasena;
    this.ultimo_login = null;
    this.activo = activo;
  }

  inicia_Sesion(password_intento) {
    if (this.contrasena === password_intento && this.activo) {
      this.ultimo_login = new Date();
      return true;
    }
    return false;
  }
}

// 2. Herencia: Administrador
export class Administrador extends Usuario {
  constructor(id_usuario, nombre_Usuario, correo, contrasena, codigo_Empleado, nivel_Permiso) {
    super(id_usuario, nombre_Usuario, correo, contrasena);
    this.codigo_Empleado = codigo_Empleado;
    this.nivel_Permiso = nivel_Permiso;
    this.rol = 'ADMIN'; 
  }
}

// 3. Herencia: Cliente
export class Cliente extends Usuario {
  constructor(id_usuario, nombre_Usuario, correo, contrasena, rut, telefono) {
    super(id_usuario, nombre_Usuario, correo, contrasena);
    this.rut = rut;
    this.telefono = telefono;
    this.rol = 'CLIENTE'; 
  }
}


// BASE DE DATOS SIMULADA

// src/data/modelos.js

export const usuariosDemo = [
  {
    rut: "11.111.111-1",
    nombre_Usuario: "Carlos Mendoza (Admin General)",
    correo: "admin@multimak.cl",
    rol: "ADMIN",
    tipo_cliente: "natural",
    activo: true,
    // Hash SHA256 exacto para la contraseña: admin123
    contrasena: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
  },
  {
    rut: "76.543.210-K",
    nombre_Usuario: "Constructora Torres del Paine SpA",
    correo: "contacto@constructoratdp.cl",
    rol: "CLIENTE",
    tipo_cliente: "empresa",
    activo: true,
    // Hash SHA256 exacto para la contraseña: cliente123
    contrasena: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
  },
  {
    rut: "15.234.567-8",
    nombre_Usuario: "Mateo Soto Alarcón",
    correo: "mateo.soto@gmail.com",
    rol: "CLIENTE",
    tipo_cliente: "natural",
    activo: true,
    contrasena: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
  },
  {
    rut: "77.888.999-0",
    nombre_Usuario: "Transportes Australes Ltda",
    correo: "operaciones@transaustral.cl",
    rol: "CLIENTE",
    tipo_cliente: "empresa",
    activo: false, // <-- CUENTA DESACTIVADA POR DEFECTO PARA PRUEBAS
    contrasena: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
  },
  {
    rut: "18.765.432-1",
    nombre_Usuario: "Valentina Morales",
    correo: "v.morales@faenas.cl",
    rol: "CLIENTE",
    tipo_cliente: "natural",
    activo: true,
    contrasena: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
  }
];

// 4. Clase Detalle_Cotizacion
export class Detalle_Cotizacion {
  constructor(id_detalle, maquina, cantidad_Dias) {
    this.id_detalle = id_detalle;
    this.maquina = maquina;
    this.cantidad_Dias = cantidad_Dias;
    this.accesorios = []; 
  }

  agregar_Accesorio(accesorio) {
    this.accesorios.push(accesorio);
  }

  calcular_Subtotal() {
    let costoDiario = this.maquina.tarifa_base_dia;
    // Sumar tarifa extra por cada accesorio
    this.accesorios.forEach(acc => {
      costoDiario += acc.tarifa_extra_dia;
    });
    // Multiplicar por los días de arriendo
    return costoDiario * this.cantidad_Dias;
  }
}

// 5. Clase Cotización
export class Cotizacion {
  constructor(id_cotizacion, cliente) {
    this.id_cotizacion = id_cotizacion;
    this.cliente = cliente;
    this.fecha_Creacion = new Date();
    
    // Fecha de validez: 15 días desde la creación
    this.fecha_Validez = new Date();
    this.fecha_Validez.setDate(this.fecha_Creacion.getDate() + 15);
    
    this.detalles = [];
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.estado = "Generada";
  }

  agregar_Detalle(detalle) {
    this.detalles.push(detalle);
  }

  calcular_Total() {
    // Sumar los subtotales de todos los detalles
    this.subtotal = this.detalles.reduce((acc, det) => acc + det.calcular_Subtotal(), 0);
    // Calcular IVA (19%)
    this.iva = Math.round(this.subtotal * 0.19);
    // Total final
    this.total = this.subtotal + this.iva;
  }
}