"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "+56930273601";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, me gustaría hacer una consulta sobre las joyas de Joyería Zamir."
);

const destacados = [
  {
    id: 1,
    nombre: "Anillo Luna Plata 925",
    descripcion: "Diseño clásico con brillo intenso, ideal para ocasiones especiales.",
    precio: "$29.990",
    imagen: "/productos/anillo.jpg",
  },
  {
    id: 2,
    nombre: "Collar Estrella Dorada",
    descripcion: "Collar bañado en oro 18k con un estilo delicado y elegante.",
    precio: "$24.990",
    imagen: "/productos/collar.jpg",
  },
  {
    id: 3,
    nombre: "Aros Corazón",
    descripcion: "Aros de plata 925 con forma de corazón, perfectos para uso diario.",
    precio: "$19.990",
    imagen: "/productos/aros.jpg",
  },
];

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* POPUP PROMO */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-sm w-full rounded-2xl bg-white shadow-xl border border-slate-100 p-5 space-y-3"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                <h2 className="text-sm font-semibold text-slate-900">
                  Bienvenido a Joyería Zamir
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Descubre nuestras joyas en plata nacional, 925 y 950. 
                Consulta por piezas personalizadas o stock disponible directamente por WhatsApp.
              </p>
              <div className="flex gap-2 mt-2">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white text-xs font-medium px-4 py-2 hover:bg-emerald-700 transition-colors"
                  onClick={() => setShowPopup(false)}
                >
                  Ver productos
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO PRINCIPAL */}
      <motion.main
        className="py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 grid gap-12 md:gap-16 md:grid-cols-2 items-center">
          {/* TEXTO PRINCIPAL */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 mb-4">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Joyas de plata · Ovalle
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Joyería Zamir · elegancia en plata para cada momento
            </h1>

            <p className="text-lg text-slate-700 mb-8">
              Más de 10 años de experiencia creando joyas de plata
              nacional, 925 y 950. Ubicados en Ovalle, ofrecemos piezas únicas
              diseñadas con dedicación y terminaciones profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Escríbenos por WhatsApp</span>
              </Link>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors text-sm bg-white"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.section>

          {/* IMAGEN PRINCIPAL */}
          <motion.section
            className="relative aspect-square rounded-3xl overflow-hidden shadow bg-slate-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/productos/image.png"
              alt="Joyería Zamir - joyas de plata"
              fill
              className="object-cover"
            />
          </motion.section>
        </div>

        {/* PRODUCTOS DESTACADOS */}
        <section className="max-w-6xl mx-auto px-4 mt-16 md:mt-20">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Productos destacados
              </h2>
              <p className="text-sm text-slate-600">
                Una selección de piezas que representan el estilo de Joyería Zamir.
              </p>
            </div>
            <Link
              href="/productos"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-3">
            {destacados.map((prod, index) => (
              <motion.article
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={prod.imagen}
                    alt={prod.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                    {prod.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                    {prod.descripcion}
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">
                    {prod.precio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Botón ver productos en móvil */}
          <div className="mt-6 sm:hidden">
            <Link
              href="/productos"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-emerald-600 text-emerald-700 text-sm font-medium bg-white"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </motion.main>
    </>
  );
}
