"use client";

import { useCart } from "../../components/cart/CartContext";

const WHATSAPP_NUMBER = "+56930273601";

function buildWhatsAppUrl(items: ReturnType<typeof useCart>["items"]) {
  if (!items.length) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const lineas: string[] = [
    "Hola, quiero comprar estas joyas de Joyería Zamir:",
    "",
    ...items.map(
      (item) =>
        `• ${item.quantity}x ${item.product.nombre} (${item.product.precio})`
    ),
    "",
    "Mis datos:",
    "- Nombre:",
    "- Ciudad / Comuna:",
    "- Método de pago:",
  ];

  const texto = encodeURIComponent(lineas.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
}

export default function CarritoPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();

  const whatsappUrl = buildWhatsAppUrl(items);

  const formatCurrency = (value: number | string) => {
    const num = typeof value === "string" ? parseFloat(value) || 0 : value || 0;
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const subtotal = items.reduce((s, it) => {
    const precio = typeof it.product.precio === "string" ? parseFloat(it.product.precio) || 0 : it.product.precio || 0;
    return s + precio * it.quantity;
  }, 0);

  return (
    <main className="py-10 md:py-14">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Tu carrito</h1>
          <p className="text-sm text-slate-600">
            Ajusta las cantidades y envía tu pedido por WhatsApp para coordinar
            el pago y el envío.
          </p>
        </header>

        {!items.length ? (
          <p className="text-sm text-slate-500">
            Tu carrito está vacío. Ve al catálogo para agregar joyas.
          </p>
        ) : (
          <>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border border-slate-100 rounded-2xl px-4 py-3 bg-white shadow-sm"
                >
                  {/* Imagen / placeholder */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                    {item.product.imagen ? (
                      // si tienes URL de imagen
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.imagen}
                        alt={item.product.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xs text-slate-400 text-center p-1">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold truncate">
                          {item.product.nombre}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatCurrency(item.product.precio)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Stock: {item.product.stock}
                        </p>
                      </div>

                      <button
                        className="text-xs text-red-500 hover:text-red-600 ml-2 self-start"
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                        aria-label={`Quitar ${item.product.nombre} del carrito`}
                      >
                        Quitar
                      </button>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-sm hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          aria-label={`Disminuir cantidad de ${item.product.nombre}`}
                        >
                          -
                        </button>

                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.min(item.product.stock, item.quantity + 1)
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          className={`h-8 w-8 rounded-full border flex items-center justify-center text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                            item.quantity >= item.product.stock
                              ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                              : "border-slate-200 hover:bg-slate-100"
                          }`}
                          aria-label={`Aumentar cantidad de ${item.product.nombre}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm text-slate-600">
                        {formatCurrency(
                          (Number(item.product.precio) || 0) * item.quantity
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-500">Subtotal</p>
                  <p className="text-lg font-semibold">{formatCurrency(subtotal)}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Envío</p>
                  <p className="text-sm text-slate-600">A coordinar</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-md ${
                    items.length === 0 ? "opacity-50 pointer-events-none" : ""
                  }`}
                  aria-disabled={items.length === 0}
                >
                  {/* Icono WhatsApp simple */}
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .05 5.32.05 11.95a11.9 11.9 0 001.66 6.09L0 24l6.21-1.6a11.95 11.95 0 006.79 2c6.63 0 12-5.32 12-11.95 0-3.2-1.25-6.2-3.48-8.93zM12 21.5a9.42 9.42 0 01-4.98-1.44l-.36-.22-3.69.95.99-3.6-.23-.37A9.44 9.44 0 012.5 11.95c0-5.18 4.2-9.4 9.5-9.4 2.53 0 4.9.99 6.68 2.78A9.4 9.4 0 0121.5 11.95c0 5.2-4.2 9.55-9.5 9.55z" />
                    <path d="M17.02 14.9c-.3-.15-1.76-.87-2.04-.98-.28-.12-.48-.15-.68.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.12.3-.3.45-.45.15-.15.2-.25.3-.42.1-.17.05-.32-.02-.46-.07-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.79.32-.27.26-1.03 1.01-1.03 2.45 0 1.44 1.06 2.83 1.21 3.02.15.2 2.08 3.18 5.04 4.46 2.96 1.28 2.96.85 3.49.8.52-.05 1.7-.69 1.94-1.36.24-.68.24-1.26.17-1.39-.07-.14-.27-.2-.57-.35z" />
                  </svg>

                  Enviar pedido por WhatsApp
                </a>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-slate-500 underline underline-offset-2 self-start"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CTA fijo en móvil */}
      <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
        <div className="max-w-3xl mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-lg ${
              items.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            aria-hidden={items.length === 0}
          >
            {items.length ? `Pedir (${formatCurrency(subtotal)})` : "Carrito vacío"}
          </a>
        </div>
      </div>
    </main>
  );
}