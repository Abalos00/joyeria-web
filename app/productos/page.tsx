"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type Producto } from "../../data/productos";
import { useCart } from "../../components/cart/CartContext";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "56930273601";

function getWhatsAppUrl(producto: Producto) {
  const mensaje = encodeURIComponent(
    `Hola, vi el producto "${producto.nombre}" en tu web y me interesa. ¿Me puedes dar más información?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
}

export default function ProductosPage() {
  const { items, addToCart, updateQuantity } = useCart();
  type ProductoWithMeta = Producto & { isRecent?: boolean };
  const [productos, setProductos] = useState<ProductoWithMeta[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setProductos(data as Producto[]);
      })
      .catch(() => {
        // fallback to empty
        if (mounted) setProductos([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.main
      className="bg-slate-50/70"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto py-8 md:py-12">
        {/* Header */}
        <header className="mb-6 md:mb-8 px-4">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 mb-3">
            Colección
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Catálogo de joyas
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl">
            Descubre nuestras piezas hechas a mano. Elige la cantidad que
            necesitas, añádela al carrito y finaliza la compra por WhatsApp.
          </p>
        </header>

        {/* Grid de productos */}
        <section className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 px-2 sm:px-0">
          {productos.map((p, index) => {
            const cartItem = items.find((item) => item.product.id === p.id);
            const qtyInCart = cartItem?.quantity ?? 0;
            const isMax = qtyInCart >= p.stock;

            return (
              <motion.article
                key={p.id}
                className="group border border-slate-100 rounded-2xl bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
              >
                {/* Imagen */}
                <div className="relative aspect-[4/5] bg-slate-100">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  />
                  {p.etiqueta && (
                      <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                        {p.etiqueta}
                      </span>
                    )}

                  {p.isRecent && (
                    <span className="absolute top-2 right-2 bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                      Ingreso
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h2 className="text-xs sm:text-sm font-semibold mb-1 line-clamp-2">
                    {p.nombre}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-600 mb-2 line-clamp-2">
                    {p.descripcion}
                  </p>

                  <p className="text-[10px] text-slate-500 mb-2">
                    Stock disponible:{" "}
                    <span className="font-semibold">{p.stock}</span>
                  </p>

                  <div className="mt-auto space-y-2">
                    {/* Precio */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-base sm:text-lg font-bold text-emerald-600">
                        {p.precio}
                      </span>
                      {p.precioAntes && (
                        <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                          {p.precioAntes}
                        </span>
                      )}
                    </div>

                    {/* Controles de cantidad cuando ya hay algo en carrito */}
                    {qtyInCart > 0 && (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 flex items-center justify-between text-[11px] sm:text-xs">
                        <span>
                          En carrito:{" "}
                          <strong>
                            {qtyInCart} unidad
                            {qtyInCart > 1 ? "es" : ""}
                          </strong>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(p.id, qtyInCart - 1)
                            }
                            className="h-6 w-6 rounded-full border border-emerald-200 flex items-center justify-center text-xs text-emerald-700 hover:bg-emerald-100"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {qtyInCart}
                          </span>
                          <button
                            type="button"
                            disabled={isMax}
                            onClick={() => addToCart(p.id)}
                            className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs ${
                              isMax
                                ? "border-slate-200 text-slate-300 cursor-not-allowed"
                                : "border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Botón principal */}
                    <button
                      type="button"
                      disabled={isMax}
                      onClick={() => addToCart(p.id)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                        isMax
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                    >
                      {isMax
                        ? "Sin stock adicional"
                        : qtyInCart > 0
                        ? "Añadir otra unidad"
                        : "Añadir al carrito"}
                    </button>

                    {/* Link de consulta individual */}
                    <a
                      href={getWhatsAppUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      Consultar solo este producto
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>
      </div>
    </motion.main>
  );
}
