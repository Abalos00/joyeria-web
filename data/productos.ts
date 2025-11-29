// data/productos.ts
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  precioAntes?: string;
  imagen: string;
  etiqueta?: string;
  stock: number;
  activo: boolean;
};

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Anillo Luna Plata 925",
    descripcion: "Anillo ajustable en plata 925 con circonia cúbica.",
    precio: "$29.990",
    precioAntes: "$34.990",
    imagen: "/productos/anillo.jpg",
    etiqueta: "Más vendido",
    stock: 5,
    activo: true,
  },
  {
    id: 2,
    nombre: "Collar Estrella Dorada",
    descripcion: "Collar bañado en oro 18k con dije de estrella minimalista.",
    precio: "$24.990",
    imagen: "/productos/collar.jpg",
    etiqueta: "Nuevo",
    stock: 3,
    activo: true,
  },
  {
    id: 3,
    nombre: "Aros Corazón",
    descripcion: "Aros de corazón en plata 925, diseño delicado.",
    precio: "$19.990",
    precioAntes: "$22.990",
    imagen: "/productos/aros.jpg",
    stock: 8,
    activo: true,
  },
  {
    id: 4,
    nombre: "Pulsera Perlas Naturales",
    descripcion: "Pulsera elástica con perlas naturales y detalles de acero.",
    precio: "$27.990",
    imagen: "/productos/pulsera.png",
    etiqueta: "Edición limitada",
    stock: 4,
    activo: true,
  },
  {
    id: 5,
    nombre: "Anillo Sol Dorado",
    descripcion: "Anillo ajustable bañado en oro con diseño de sol.",
    precio: "$32.990",
    imagen: "/productos/anillo_2.jpg",
    stock: 2,
    activo: true,
  },
  {
    id: 6,
    nombre: "Collar Inicial Personalizado",
    descripcion: "Collar con inicial personalizada, bañado en oro 18k.",
    precio: "$15.990",
    imagen: "/productos/medallon.jpg",
    etiqueta: "Personalizable",
    stock: 10,
    activo: true,
  },
];

export function getProductosActivos() {
  return productos.filter((p) => p.activo && p.stock > 0);
}
