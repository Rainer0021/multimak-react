export const catalogoMaquinaria = [
  {
    id_maquina: 1,
    marca: "Caterpillar",
    modelo: "232B",
    tipo: "Minicargador",
    esMini: true,
    img: "CATERPILLAR 232B.jfif",
    tarifa_base_dia: 120000,
    accesoriosCompatibles: [
      { id_accesorio: 1, nombre: "Aguilón", tarifa_extra_dia: 50000 },
      { id_accesorio: 2, nombre: "Horquillas", tarifa_extra_dia: 25000 },
      { id_accesorio: 3, nombre: "Barrenador", tarifa_extra_dia: 25000 },
      { id_accesorio: 4, nombre: "Pala Estándar", tarifa_extra_dia: 5000 },
      { id_accesorio: 5, nombre: "Martillo Demoledor", tarifa_extra_dia: 70000 }
    ]
  },
  {
    id_maquina: 2,
    marca: "Caterpillar",
    modelo: "246C",
    tipo: "Minicargador",
    esMini: true,
    img: "CATERPILLAR 246C.jfif",
    tarifa_base_dia: 150000,
    accesoriosCompatibles: [
      { id_accesorio: 1, nombre: "Aguilón", tarifa_extra_dia: 15000 },
      { id_accesorio: 2, nombre: "Horquillas", tarifa_extra_dia: 10000 },
      { id_accesorio: 3, nombre: "Barrenador", tarifa_extra_dia: 25000 },
      { id_accesorio: 4, nombre: "Pala Estándar", tarifa_extra_dia: 5000 },
      { id_accesorio: 5, nombre: "Martillo Demoledor", tarifa_extra_dia: 40000 }
    ]
  },
  {
    id_maquina: 3,
    marca: "Caterpillar",
    modelo: "416E",
    tipo: "Retroexcavadora",
    esMini: false,
    img: "CATERPILLAR 416E.jpg",
    tarifa_base_dia: 210000,
    accesoriosCompatibles: []
  }
];