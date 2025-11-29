"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "+56930273601"; // cambia aquí si quieres usar otro número
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, quiero hacer una consulta sobre las joyas de Joyería Zamir."
);

export default function ContactoPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.main
      className="bg-slate-50/60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* ENCABEZADO CON JOYA ANIMADA */}
        <div className="flex items-center gap-4 mb-8">
          {/* “Joya” animada */}
          <motion.div
            className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-400/40"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.9, 1.05, 1],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="h-full w-full rounded-2xl border border-white/40 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(16,185,129,0.0)",
                  "0 0 0 10px rgba(16,185,129,0.15)",
                  "0 0 0 0 rgba(16,185,129,0.0)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <span className="text-xs font-semibold text-white tracking-widest">
                Z
              </span>
            </motion.div>
          </motion.div>

          {/* Nombre + subtítulo */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Contacto
            </h1>
            <p className="text-sm text-slate-600">
              Joyería Zamir · Ovalle, Chile
            </p>
          </motion.div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Tarjeta principal de contacto */}
          <section className="bg-white/90 border border-slate-100 rounded-3xl shadow-sm px-6 py-7 md:px-8 md:py-8 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Hablemos sobre tu próxima joya
            </h2>
            <p className="text-sm text-slate-700">
              Puedes escribirnos directo por WhatsApp para cotizar, realizar
              pedidos personalizados o resolver cualquier duda.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <span>Escríbenos por WhatsApp</span>
              <span aria-hidden>💬</span>
            </a>

            <div className="text-xs text-slate-500">
              <p>
                Horario de atención: <strong>lun a sáb · 10:00 a 19:00 hrs</strong>
              </p>
              <p>Responderemos tu mensaje lo antes posible.</p>
            </div>
          </section>

          {/* Información adicional */}
          <aside className="space-y-5 text-sm text-slate-700">
            <div className="bg-white/80 border border-slate-100 rounded-2xl px-5 py-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Otros medios de contacto
              </h3>
              <ul className="space-y-1.5">
                <li>
                  Correo:{" "}
                  <a
                    href="mailto:contacto@joyeriazamir.cl"
                    className="underline underline-offset-2 text-emerald-700 hover:text-emerald-800"
                  >
                    contacto@joyeriazamir.cl
                  </a>
                </li>
                <li>Ubicación: Ovalle, Región de Coquimbo, Chile.</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-xs text-emerald-900">
              <p className="font-semibold mb-1">Joyas de plata</p>
              <p>
                Trabajamos con plata nacional, 925 y 950, creando piezas únicas
                con terminaciones profesionales y dedicación en cada detalle.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </motion.main>
  );
}
