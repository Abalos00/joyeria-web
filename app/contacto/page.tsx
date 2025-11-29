// ...existing code...
"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "+56930273601"; // cambia aquí si quieres usar otro número
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, quiero hacer una consulta sobre las joyas de Joyería Zamir."
);

const ADDRESS = "galeria zivcovick - Independencia 422, local 3, 1840000 Ovalle, Coquimbo";
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export default function ContactoPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.main
      className="bg-slate-50/60"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* ENCABEZADO CON NOMBRE PERSONALIZADO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <motion.hgroup
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Encabezado de contacto"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                <span className="inline-block mr-2 text-slate-900">Joyería</span>
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Zamir</span>
              </h1>

              <p className="text-sm text-slate-600 mt-1">
                Plata nacional · 925 · 950 · Ovalle
              </p>

              <motion.div
                className="mt-3 h-0.5 w-28 rounded-full bg-emerald-100"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                aria-hidden
              />
            </motion.hgroup>
          </div>

          <motion.div
            className="sm:ml-auto"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <p className="text-sm text-slate-600">Contacto · Ovalle, Chile</p>
          </motion.div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {/* Tarjeta principal de contacto */}
          <motion.section
            className="bg-white/90 border border-slate-100 rounded-3xl shadow-sm px-6 py-7 md:px-8 md:py-8 space-y-5 md:col-span-1"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-slate-900">Hablemos sobre tu próxima joya</h2>
            <p className="text-sm text-slate-700">
              Escríbenos por WhatsApp para cotizar, pedir piezas personalizadas o consultar stock.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <span>Escríbenos por WhatsApp</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .05 5.32.05 11.95a11.9 11.9 0 001.66 6.09L0 24l6.21-1.6a11.95 11.95 0 006.79 2c6.63 0 12-5.32 12-11.95 0-3.2-1.25-6.2-3.48-8.93zM12 21.5a9.42 9.42 0 01-4.98-1.44l-.36-.22-3.69.95.99-3.6-.23-.37A9.44 9.44 0 012.5 11.95c0-5.18 4.2-9.4 9.5-9.4 2.53 0 4.9.99 6.68 2.78A9.4 9.4 0 0121.5 11.95c0 5.2-4.2 9.55-9.5 9.55z" />
                <path d="M17.02 14.9c-.3-.15-1.76-.87-2.04-.98-.28-.12-.48-.15-.68.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.12.3-.3.45-.45.15-.15.2-.25.3-.42.1-.17.05-.32-.02-.46-.07-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.79.32-.27.26-1.03 1.01-1.03 2.45 0 1.44 1.06 2.83 1.21 3.02.15.2 2.08 3.18 5.04 4.46 2.96 1.28 2.96.85 3.49.8.52-.05 1.7-.69 1.94-1.36.24-.68.24-1.26.17-1.39-.07-.14-.27-.2-.57-.35z" />
              </svg>
            </a>

            <div className="text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-2">
                <strong className="whitespace-nowrap">Horario de atención:</strong>
              </p>

              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Lun a Vie: <strong>10:30 – 18:00</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M8 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Sáb: <strong>10:30 – 14:00</strong></span>
                </div>
              </div>

              <p>Responderemos tu mensaje dentro del horario de atención.</p>
            </div>
          </motion.section>

          {/* Información adicional + mapa */}
          <aside className="space-y-5 text-sm text-slate-700 md:col-span-2">
            <motion.div
              className="bg-white/80 border border-slate-100 rounded-2xl px-5 py-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Otros medios de contacto</h3>
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
                <li>Dirección: <strong>{ADDRESS}</strong></li>
                <li>Teléfono: <strong>{WHATSAPP_NUMBER}</strong></li>
              </ul>
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <div className="px-4 py-3 bg-white/90">
                <h4 className="text-sm font-semibold mb-1">Encuéntranos</h4>
                <p className="text-xs text-slate-600 mb-2">{ADDRESS}</p>
              </div>

              <motion.div
                className="h-56 sm:h-44 md:h-72 lg:h-80 bg-slate-100"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Joyería Zamir, Ovalle"
                  className="w-full h-full border-0"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-xs text-emerald-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <p className="font-semibold mb-1">Joyas de plata</p>
              <p>
                Trabajamos con plata nacional, 925 y 950 — piezas hechas a mano con
                terminaciones profesionales.
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </motion.main>
  );
}