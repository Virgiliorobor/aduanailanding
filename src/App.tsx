import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Character rain with customs terms (Memorable style)
const CharacterRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = 'IMMEX§IVA§ORIGEN§PEDIMENTO§8471§CTN§A1§MX§◢◣'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    const speeds: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
      speeds[i] = 0.3 + Math.random() * 0.7
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = `${fontSize}px 'Geist Mono', monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const brightness = Math.random()
        ctx.fillStyle = brightness > 0.98 ? '#f3ecd8' : '#4a5680'
        
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i] += speeds[i]
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

// Scanlines
const Scanlines = () => (
  <div className="scanlines-overlay fixed inset-0 pointer-events-none z-40 opacity-[0.03]" />
)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()
  const [showRGBSplit, setShowRGBSplit] = useState(false)
  
  // Memorable-style zoom-out pin scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 3])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 0.6, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -300])
  
  const smoothScale = useSpring(heroScale, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const smoothY = useSpring(heroY, { stiffness: 100, damping: 30, restDelta: 0.001 })
  
  // Section parallax
  const filosofiaY = useTransform(scrollYProgress, [0.25, 0.4], [100, 0])
  const filosofiaScale = useTransform(scrollYProgress, [0.25, 0.4], [0.9, 1])
  
  const medidaY = useTransform(scrollYProgress, [0.45, 0.6], [80, 0])
  const medidaScale = useTransform(scrollYProgress, [0.45, 0.6], [1.1, 1])
  
  // RGB split on fast scroll
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const previous = scrollY.getPrevious()
      if (previous !== undefined && Math.abs(latest - previous) > 40) {
        setShowRGBSplit(true)
        setTimeout(() => setShowRGBSplit(false), 100)
      }
    })
    return unsubscribe
  }, [scrollY])
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-[#f3ecd8] overflow-x-hidden relative">
      <CharacterRain />
      <Scanlines />
      
      {/* RGB split overlay */}
      {showRGBSplit && (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen">
          <div className="absolute inset-0 bg-red-600 opacity-20 translate-x-[2px]" />
          <div className="absolute inset-0 bg-cyan-400 opacity-20 -translate-x-[2px]" />
        </div>
      )}
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#4a5680]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-xl font-bold tracking-tight font-sans">AduanAI</div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('filosofia')} className="text-sm font-medium text-[#4a5680] hover:text-[#f3ecd8] transition-colors font-mono">
                Filosofía
              </button>
              <button onClick={() => scrollToSection('fundador')} className="text-sm font-medium text-[#4a5680] hover:text-[#f3ecd8] transition-colors font-mono">
                Fundador
              </button>
              <button onClick={() => scrollToSection('contacto')} className="px-5 py-2.5 bg-[#f3ecd8] text-black text-sm font-bold hover:bg-white transition-colors font-sans">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO - Zoom out pin */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{
            scale: smoothScale,
            opacity: heroOpacity,
            y: smoothY,
          }}
          className="relative z-10 w-full"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy left */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter mb-8 font-sans"
              >
                AduanAI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl font-semibold text-[#4a5680] mb-6 tracking-tight font-sans"
              >
                Herramientas de IA para aduanas
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl md:text-2xl font-medium mb-12 font-sans"
              >
                Procesos acelerados. La decisión es tuya.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="px-10 py-4 bg-[#f3ecd8] text-black text-lg font-bold hover:bg-white transition-colors font-sans"
                >
                  Hablar con nosotros
                </button>
                <button
                  onClick={() => scrollToSection('filosofia')}
                  className="px-10 py-4 border-2 border-[#4a5680] text-[#f3ecd8] text-lg font-bold hover:border-[#f3ecd8] hover:bg-[#4a5680]/10 transition-colors font-sans"
                >
                  Filosofía
                </button>
              </motion.div>
            </div>
            
            {/* Dithered containers - right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <img
                src="/assets/mx-containers-port.png"
                alt="Containers"
                className="w-full h-auto pixel-perfect"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FILOSOFÍA - Heavy glitch morph */}
      <motion.section
        id="filosofia"
        style={{
          y: filosofiaY,
          scale: filosofiaScale,
        }}
        className="relative py-40 px-6 lg:px-8 border-t-2 border-[#4a5680]/50"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Heavy container glitch */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/mx-containers-heavy.png"
              alt="Heavy containers"
              className="w-full h-auto pixel-perfect"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
          
          {/* Copy right */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 font-sans"
            >
              Automatizar la aduana de punta a punta no es innovación. Es riesgo.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-medium text-[#4a5680] leading-relaxed font-sans"
            >
              Damos más herramientas a quien ya opera. El juicio se queda en la planta.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* A MEDIDA - Maquila */}
      <motion.section
        style={{
          y: medidaY,
          scale: medidaScale,
        }}
        className="relative py-40 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-10 font-sans"
            >
              ¿Problema real de compliance o de piso?
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-[#4a5680] leading-relaxed font-sans"
            >
              Lo construimos. Sin plantilla genérica.
            </motion.p>
          </div>
          
          {/* Maquila image right */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/mx-maquila-warm.png"
              alt="Maquila"
              className="w-full h-auto pixel-perfect"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* FUNDADOR */}
      <motion.section
        id="fundador"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-40 px-6 lg:px-8 border-t-2 border-[#4a5680]/50"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-black mb-8 font-sans"
            >
              Jaime Robinson
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-[#4a5680] leading-relaxed font-sans"
            >
              20 años dentro de la planta y de los datos — IMMEX, IVA, origen. Guadalajara.
            </motion.p>
          </div>
          
          {/* Pedimento image small/side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="justify-self-end"
          >
            <img
              src="/assets/mx-pedimento-cool.png"
              alt="Pedimento"
              className="w-full max-w-sm h-auto pixel-perfect"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACTO */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-40 px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 font-sans"
          >
            Hablemos.
          </motion.h2>
          <motion.a
            href="mailto:contacto@aduanai.com.mx"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-16 py-6 bg-[#f3ecd8] text-black text-xl font-black hover:bg-white transition-colors font-sans"
          >
            Contáctanos
          </motion.a>
          <p className="text-lg text-[#4a5680] font-mono mt-10">aduanai.com.mx</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-[#4a5680]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold font-sans">AduanAI</div>
          <div className="flex gap-8 text-sm font-mono text-[#4a5680]">
            <a href="https://aduanai.com.mx" className="hover:text-[#f3ecd8] transition-colors">aduanai.com.mx</a>
            <span>MX · US</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
