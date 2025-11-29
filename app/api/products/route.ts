import { NextResponse } from "next/server";
import { productos as baseProductos } from "../../../data/productos";
import fs from "fs";
import path from "path";

type SubmittedProduct = {
  id?: number;
  createdAt?: string;
  nombre: string;
  descripcion: string;
  precio?: string;
  precioAntes?: string | undefined;
  etiqueta?: string | null;
  stock?: number;
  activo?: boolean;
  imagenes: string[];
};

const DATA_FILE = path.join(process.cwd(), "data", "submitted_products.json");

export async function GET() {
  try {
    let submitted: SubmittedProduct[] = [];
    try {
      const raw = await fs.promises.readFile(DATA_FILE, "utf-8");
      submitted = JSON.parse(raw || "[]") as SubmittedProduct[];
    } catch {
      submitted = [];
    }

    // Map submitted products to same shape as baseProductos
    const mapped = submitted.map((p: SubmittedProduct) => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio ?? "$0",
      precioAntes: p.precioAntes ?? undefined,
      imagen: (p.imagenes && p.imagenes[0]) || "/productos/pulsera.png",
      etiqueta: p.etiqueta ?? undefined,
      stock: p.stock ?? 1,
      activo: p.activo ?? true,
      isRecent: true,
    }));

    const combined = [...mapped, ...baseProductos];
    return NextResponse.json(combined);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
