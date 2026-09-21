import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const CharacterRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = 'IMMEX§IVA§SAT§CERTIF§8471§CTN§MX§PEDIMENTO'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = `${fontSize}px 'Geist Mono', monospace`
      ctx.fillStyle = '#6e7681'
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }
    
    const interval = setInterval(draw, 40)
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-15" />
}

const Scanlines = () => (
  <div className="scanlines-overlay" />
)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const containerScale = useTransform(scrollYProgress, [0, 0.15], [1, 3])
  const containerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 0.7, 0])
  const containerY = useTransform(scrollYProgress, [0, 0.15], [0, -200])
  
  const doorsOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1])
  const doorsScale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1.1])
  const doorsGlitch = useTransform(scrollYProgress, [0.15, 0.18, 0.2, 0.25], [0, 1, 1, 0])
  
  const interiorOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const interiorScale = useTransform(scrollYProgress, [0.25, 0.35], [1.2, 1])
  
  const smoothScale = useSpring(containerScale, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(containerY, { stiffness: 100, damping: 30 })
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-chrome overflow-x-hidden relative">
      <CharacterRain />
      <Scanlines />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-chrome-dim/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-xl font-bold font-sans text-chrome-bright">AduanIA</div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('problema')} className="text-sm font-medium text-chrome-muted hover:text-chrome-bright transition-colors font-mono">
                Problema
              </button>
              <button onClick={() => scrollToSection('fundador')} className="text-sm font-medium text-chrome-muted hover:text-chrome-bright transition-colors font-mono">
                Fundador
              </button>
              <a href="/en" className="text-sm font-medium text-chrome-muted hover:text-chrome-bright transition-colors font-mono">
                EN
              </a>
              <button onClick={() => scrollToSection('contacto')} className="px-5 py-2.5 bg-violet text-white text-sm font-bold hover:bg-violet-bright transition-colors font-sans">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          <motion.div
            style={{
              scale: smoothScale,
              opacity: containerOpacity,
              y: smoothY,
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8 font-sans text-chrome-bright"
                  data-text="AduanIA"
                >
                  AduanIA
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-semibold text-violet-bright mb-6 font-sans"
                >
                  Tecnología aplicada al comercio exterior mexicano.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg md:text-xl font-medium mb-8 text-chrome leading-relaxed font-sans max-w-xl"
                >
                  Consultoría IMMEX, certificación IVA y cumplimiento aduanero entregados a través de infraestructura de datos propia, no de reportes genéricos.
                </motion.p>
                
                <motion.a
                  href="/en"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-sm text-chrome-muted hover:text-violet-bright transition-colors font-mono block mb-8"
                >
                  For a detailed approach in English → aduania.com.mx/en
                </motion.a>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <img
                  src="/assets/mx-containers-port_7985.png"
                  alt="Containers"
                  className="w-full h-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            style={{
              opacity: doorsOpacity,
              scale: doorsScale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <motion.div
              style={{ x: useTransform(doorsGlitch, [0, 1], [0, -3]) }}
              className="relative"
            >
              <img
                src="/assets/mx-container-doors-open-port_380c.png"
                alt="Container opening"
                className="max-w-4xl w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
              />
              <motion.img
                src="/assets/mx-container-doors-open-heavy_b2e8.png"
                alt="Container opening glitch"
                style={{
                  imageRendering: 'pixelated',
                  mixBlendMode: 'screen',
                  opacity: useTransform(doorsGlitch, [0, 1], [0, 0.6]),
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{
              opacity: interiorOpacity,
              scale: interiorScale,
            }}
            className="absolute inset-0 flex items-center justify-center z-15"
          >
            <img
              src="/assets/mx-container-interior-dock-warm_8680.png"
              alt="Interior"
              className="max-w-5xl w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </section>

      <motion.section
        id="problema"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-40 px-6 lg:px-8 bg-black relative z-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 font-sans text-chrome-bright"
          >
            Los sistemas de control de inventario de las operaciones IMMEX generan reportes. Lo que no generan es visibilidad real: dónde está la exposición, qué balance está por vencer, qué diferencia existe entre lo que el sistema dice y lo que el SAT va a encontrar.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-violet-bright leading-relaxed font-sans"
          >
            AduanIA construye la capa de datos independiente que muestra eso, directamente sobre las tablas del cliente, sin depender del proveedor del sistema ni de sus tiempos de respuesta.
          </motion.p>
        </div>
      </motion.section>

      <motion.section className="py-40 px-6 lg:px-8 bg-black/50 backdrop-blur-sm border-y border-chrome-dim/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/mx-maquila-warm_83f5.png"
              alt="Maquila"
              className="w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
          
          <div>
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold leading-tight mb-8 font-sans text-chrome-bright"
            >
              AduanIA es una firma de tecnología especializada en comercio exterior mexicano.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-chrome leading-relaxed font-sans mb-6"
            >
              Combinamos experiencia legal y operativa con desarrollo de herramientas propias para entregar consultoría IMMEX de una forma que las firmas tradicionales no pueden: con visibilidad en tiempo real, correcciones modeladas antes de ejecutarse, y equipos preparados antes de que llegue el requerimiento.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-chrome-muted leading-relaxed font-sans italic border-l-4 border-violet pl-6"
            >
              No vendemos software genérico. Construimos infraestructura específica para cada operación, basada en entender cómo funciona la planta antes de escribir una sola línea de código.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-40 px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold leading-tight mb-8 font-sans text-chrome-bright"
            >
              Operaciones IMMEX manufactureras en México
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-chrome leading-relaxed font-sans mb-6"
            >
              Automotriz, electrónica, textil, componentes industriales — donde la certificación IVA es un activo financiero material y su defensa se toma en serio a nivel directivo.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-chrome-muted leading-relaxed font-sans"
            >
              Trabajamos con equipos de cumplimiento, finanzas y dirección de planta que necesitan más que una opinión legal: necesitan saber exactamente dónde están parados antes de que el SAT lo determine por ellos.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/mx-bodega-trucks-warm_5fe4.png"
              alt="Bodega"
              className="w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="fundador"
        className="py-40 px-6 lg:px-8 bg-black/50 backdrop-blur-sm border-y border-chrome-dim/20"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-peach uppercase tracking-[0.3em] mb-4"
            >
              Fundador
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 font-sans text-chrome-bright"
            >
              Jaime Virgilio Robinson
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-chrome leading-relaxed mb-6 font-sans"
            >
              Más de 20 años dentro del ecosistema de cumplimiento aduanero en México. Socio en Boutique Legal Internacional y analista de comercio exterior en Yormick Law, dos firmas con operaciones en México y Estados Unidos.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-chrome-muted leading-relaxed font-sans mb-6"
            >
              AduanIA es la expresión tecnológica de esa experiencia: las mismas capacidades, entregadas a través de herramientas construidas para cada operación.
            </motion.p>
            <motion.a
              href="/en"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-chrome-muted hover:text-violet-bright transition-colors font-mono"
            >
              English version → aduania.com.mx/en
            </motion.a>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="justify-self-end"
          >
            <img
              src="/assets/mx-border-trucks-cool_f9ba.png"
              alt="Border"
              className="w-full max-w-sm h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contacto"
        className="py-40 px-6 lg:px-8 bg-black"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-12 font-sans text-chrome-bright"
          >
            ¿Por dónde empezamos?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-medium mb-8 text-chrome leading-relaxed font-sans max-w-3xl"
          >
            Una llamada de diagnóstico, menos de una hora, para entender dónde está parada tu operación y qué necesita antes del siguiente ciclo de verificación del SAT.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-chrome-muted mb-12 leading-relaxed font-sans max-w-3xl"
          >
            También podemos arrancar con una sesión de desarrollo de ideas si estás explorando cómo la tecnología puede fortalecer tu área de comercio exterior.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a
              href="mailto:contacto@aduania.com.mx?subject=Llamada%20de%20diagnóstico"
              className="px-12 py-6 bg-violet text-white text-xl font-black hover:bg-violet-bright transition-colors font-sans text-center"
            >
              Agendar llamada de diagnóstico →
            </a>
            <a
              href="mailto:contacto@aduania.com.mx?subject=Sesión%20de%20desarrollo%20de%20ideas"
              className="px-12 py-6 border-2 border-peach text-peach-bright text-xl font-bold hover:bg-peach/10 transition-colors font-sans text-center"
            >
              Sesión de desarrollo de ideas →
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-chrome-muted font-mono"
          >
            Los compromisos son selectivos. No toda consulta derivará en una propuesta.
          </motion.p>
        </div>
      </motion.section>

      <footer className="py-16 px-6 lg:px-8 border-t border-chrome-dim/30 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-bold font-sans text-chrome-bright">AduanIA · México</div>
            <p className="text-sm text-chrome-muted font-sans">Tecnología aplicada al comercio exterior mexicano.</p>
            <div className="flex gap-6 text-sm font-mono text-chrome-muted">
              <a href="https://aduania.com.mx" className="hover:text-violet-bright transition-colors">aduania.com.mx</a>
              <a href="/en" className="hover:text-violet-bright transition-colors">EN → aduania.com.mx/en</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
