export default function NosotrosPage() {
  return (
    <main className="py-14 md:py-20 bg-slate-50/70">
      <section className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Quiénes somos
          </span>
        </div>

        <div className="bg-white/95 border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          {/* Franja superior decorativa */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

          <div className="px-6 py-8 md:px-10 md:py-10 space-y-8">
            {/* Encabezado */}
            <header className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Sobre Joyería Zamir
              </h1>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl">
                Más de una década dedicados a crear joyas en plata nacional,
                925 y 950, con un enfoque artesanal y profesional desde Ovalle,
                Chile.
              </p>
            </header>

            {/* Contenido en dos columnas */}
            <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
              {/* Texto principal */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Joyería Zamir es una marca con más de{" "}
                  <strong>10 años de experiencia</strong> en el rubro de la
                  joyería artesanal. Ubicados en la ciudad de{" "}
                  <strong>Ovalle</strong>, nos especializamos en la creación y
                  venta de piezas en <strong>plata nacional</strong>,
                  <strong> plata 925</strong>, <strong>plata 950</strong> y
                  otros materiales de primera calidad.
                </p>

                <p>
                  Cada joya es elaborada pensando en resaltar tu estilo y
                  acompañarte en tus momentos más importantes. Trabajamos con
                  diseños únicos y terminaciones delicadas, manteniendo siempre
                  altos estándares de calidad para garantizar piezas duraderas,
                  elegantes y llenas de identidad.
                </p>

                <p>
                  En Joyería Zamir creemos en la dedicación, el detalle y el
                  valor de lo artesanal. Por eso cada colección refleja nuestra
                  pasión por la belleza, el brillo y el arte en plata.
                </p>

                <p>
                  Si buscas joyas auténticas y con diseño profesional, estás en
                  el lugar indicado. ¡Gracias por confiar en nosotros!
                </p>
              </div>

              {/* Recuadro lateral */}
              <aside className="space-y-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 md:p-5 space-y-3 text-sm">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Joyería Zamir en resumen
                  </h2>
                  <ul className="space-y-2 text-slate-700">
                    <li>
                      • Más de <strong>10 años</strong> de experiencia.
                    </li>
                    <li>
                      • Ubicados en <strong>Ovalle, Chile</strong>.
                    </li>
                    <li>
                      • Trabajo en <strong>plata nacional, 925 y 950</strong>.
                    </li>
                    <li>• Diseños y terminaciones profesionales.</li>
                    <li>• Atención cercana y personalizada.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-xs md:text-sm text-emerald-900">
                  <p className="font-semibold mb-1">
                    Compromiso con la calidad
                  </p>
                  <p>
                    Seleccionamos cuidadosamente cada material y revisamos cada
                    pieza para asegurarnos de que cumpla con el estándar de
                    calidad que representa a Joyería Zamir.
                  </p>
                </div>
              </aside>
            </div>

            {/* Stats / highlights */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-3 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-emerald-600">10+</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Años de experiencia
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-emerald-600">3</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Tipos de plata trabajados
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-emerald-600">100%</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Enfoque artesanal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
