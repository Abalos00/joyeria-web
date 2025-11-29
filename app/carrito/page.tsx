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
                  className="flex flex-col gap-2 border border-slate-100 rounded-2xl px-4 py-3 bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {item.product.nombre}
                      </p>
                      <p className="text-xs text-slate-500">
                        Precio: {item.product.precio}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Stock disponible: {item.product.stock}
                      </p>
                    </div>
                    <button
                      className="text-xs text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      Quitar
                    </button>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center text-sm hover:bg-slate-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className={`h-7 w-7 rounded-full border flex items-center justify-center text-sm ${
                          item.quantity >= item.product.stock
                            ? "border-slate-200 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
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
          </>
        )}
      </div>
    </main>
  );
}
