// app/layout.tsx
import "./globals.css";
import { CartProvider } from "../components/cart/CartContext";
import SiteHeader from "../components/SiteHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
        <CartProvider>
          <SiteHeader />

          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4">{children}</div>
          </main>

          <footer className="border-t mt-10 bg-white/70">
            <div className="max-w-6xl mx-auto px-4 py-4 text-[12px] md:text-sm text-slate-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <p>
                © {new Date().getFullYear()} Joyería Zamir · Ovalle, Chile.
                Todos los derechos reservados.
              </p>
              <p className="text-[11px] md:text-[12px]">
                Joyas de plata nacional, 925 y 950 · Más de 10 años
                de experiencia.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
