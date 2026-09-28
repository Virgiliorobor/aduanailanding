import { motion } from 'framer-motion'

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-sm border-b border-canvas-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <a href="/" className="text-xl font-semibold tracking-tight">
            AduanIA
          </a>
          <a 
            href="#contacto" 
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1]">
              Capa de datos propia sobre tus tablas IMMEX
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl leading-relaxed">
              Correcciones antes de ejecutar. El juicio se queda en la planta.
            </p>
            <a 
              href="#contacto"
              className="inline-block px-8 py-4 bg-accent text-white text-base font-semibold hover:bg-accent-hover transition-colors"
            >
              Agendar llamada
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problema */}
      <section className="py-32 px-6 lg:px-12 bg-canvas-light">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-xs uppercase tracking-wider text-text-tertiary mb-6 font-medium">
              Problema
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 max-w-5xl leading-tight">
              Los sistemas de control de inventario de las operaciones IMMEX generan reportes. Lo que no generan es visibilidad real.
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
              Dónde está la exposición, qué balance está por vencer, qué diferencia existe entre lo que el sistema dice y lo que el SAT va a encontrar.
            </p>
            <p className="text-lg md:text-xl text-text-primary max-w-3xl leading-relaxed font-medium">
              AduanIA construye la capa de datos independiente que muestra eso, directamente sobre las tablas del cliente, sin depender del proveedor del sistema ni de sus tiempos de respuesta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Qué es AduanIA */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-xs uppercase tracking-wider text-text-tertiary mb-6 font-medium">
              Qué es AduanIA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 max-w-4xl leading-tight">
              Una firma de tecnología especializada en comercio exterior mexicano
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div>
                <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                  Combinamos experiencia legal y operativa con desarrollo de herramientas propias para entregar consultoría IMMEX de una forma que las firmas tradicionales no pueden: con visibilidad en tiempo real, correcciones modeladas antes de ejecutarse, y equipos preparados antes de que llegue el requerimiento.
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                  No vendemos software genérico. Construimos infraestructura específica para cada operación, basada en entender cómo funciona la planta antes de escribir una sola línea de código.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-32 px-6 lg:px-12 bg-canvas-light">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-xs uppercase tracking-wider text-text-tertiary mb-6 font-medium">
              Cómo funciona
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-4xl leading-tight">
              De tus datos a decisiones verificadas
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-sm font-bold text-accent mb-3">01</div>
                <h3 className="text-lg font-semibold mb-3">Extracción</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Conectamos directamente con tus tablas IMMEX para obtener el estado real de tus operaciones.
                </p>
              </div>
              <div>
                <div className="text-sm font-bold text-accent mb-3">02</div>
                <h3 className="text-lg font-semibold mb-3">Mapeo</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Construimos la capa de datos independiente que cruza inventarios, balances y obligaciones.
                </p>
              </div>
              <div>
                <div className="text-sm font-bold text-accent mb-3">03</div>
                <h3 className="text-lg font-semibold mb-3">Auditoría</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Identificamos exposiciones, diferencias y riesgos antes de que el SAT los encuentre.
                </p>
              </div>
              <div>
                <div className="text-sm font-bold text-accent mb-3">04</div>
                <h3 className="text-lg font-semibold mb-3">Corrección</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Modelamos las correcciones necesarias para que tu equipo ejecute con confianza.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-xs uppercase tracking-wider text-text-tertiary mb-6 font-medium">
              Para quién
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 max-w-4xl leading-tight">
              Operaciones IMMEX manufactureras en México
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
              Automotriz, electrónica, textil, componentes industriales — donde la certificación IVA es un activo financiero material y su defensa se toma en serio a nivel directivo.
            </p>
            <p className="text-base md:text-lg text-text-secondary max-w-3xl leading-relaxed">
              Trabajamos con equipos de cumplimiento, finanzas y dirección de planta que necesitan más que una opinión legal: necesitan saber exactamente dónde están parados antes de que el SAT lo determine por ellos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fundador */}
      <section className="py-32 px-6 lg:px-12 bg-canvas-light">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-xs uppercase tracking-wider text-text-tertiary mb-6 font-medium">
              Fundador
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Jaime Virgilio Robinson
            </h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                Más de 20 años dentro del ecosistema de cumplimiento aduanero en México. Socio en Boutique Legal Internacional y analista de comercio exterior en Yormick Law, dos firmas con operaciones en México y Estados Unidos.
              </p>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                AduanIA es la expresión tecnológica de esa experiencia: las mismas capacidades, entregadas a través de herramientas construidas para cada operación.
              </p>
              <a href="/en" className="inline-block text-sm text-text-tertiary hover:text-accent transition-colors">
                English version → aduania.com.mx/en
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-3xl leading-tight">
              ¿Por dónde empezamos?
            </h2>
            <div className="max-w-3xl space-y-8 mb-12">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                Una llamada de diagnóstico, menos de una hora, para entender dónde está parada tu operación y qué necesita antes del siguiente ciclo de verificación del SAT.
              </p>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                También podemos arrancar con una sesión de desarrollo de ideas si estás explorando cómo la tecnología puede fortalecer tu área de comercio exterior.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="mailto:contacto@aduania.com.mx?subject=Llamada%20de%20diagnóstico"
                className="inline-block px-8 py-4 bg-accent text-white text-base font-semibold hover:bg-accent-hover transition-colors text-center"
              >
                Agendar llamada de diagnóstico →
              </a>
              <a
                href="mailto:contacto@aduania.com.mx?subject=Sesión%20de%20desarrollo%20de%20ideas"
                className="inline-block px-8 py-4 border-2 border-text-primary text-text-primary text-base font-semibold hover:bg-text-primary hover:text-canvas transition-colors text-center"
              >
                Sesión de desarrollo de ideas →
              </a>
            </div>
            <p className="text-sm text-text-tertiary">
              Los compromisos son selectivos. No toda consulta derivará en una propuesta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12 border-t border-canvas-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="text-xl font-semibold mb-2">AduanIA</div>
              <p className="text-sm text-text-secondary">
                Tecnología aplicada al comercio exterior mexicano
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-text-secondary">
              <a href="https://aduania.com.mx" className="hover:text-accent transition-colors">
                aduania.com.mx
              </a>
              <a href="/en" className="hover:text-accent transition-colors">
                EN → aduania.com.mx/en
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-canvas-dark text-xs text-text-tertiary">
            © {new Date().getFullYear()} AduanIA · México
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
