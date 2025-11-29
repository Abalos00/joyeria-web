"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./cart/CartContext";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo / Marca */}
        <Link href="/" className="flex flex-col">
          <span className="font-semibold text-xl tracking-tight">
            Joyería Zamir
          </span>
          <span className="text-[11px] text-slate-500">
            Plata nacional · 925 · 950 · Ovalle
          </span>
        </Link>

        {/* Navegación */}
        <div className="flex items-center gap-3 md:gap-5 text-sm">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hidden sm:inline-block transition-colors ${
                  active
                    ? "text-emerald-700 font-medium"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Carrito */}
          <Link href="/carrito" className="relative">
            <motion.div
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs md:text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700 bg-white shadow-sm"
              // Animar cuando cambia la cantidad
              animate={
                totalItems > 0
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.25 }}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Carrito</span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="ml-1 inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] h-5 min-w-[1.25rem] px-1"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
