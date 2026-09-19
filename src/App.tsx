import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Character rain with customs terms
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
  
  // STORY ARC: Container exterior → zoom out → dissolve to interior
  
  // Phase 1: Container zoom-out (0 → 0.15)
  const containerScale = useTransform(scrollYProgress, [0, 0.15], [1, 3])
  const containerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 0.8, 0])
  const containerY = useTransform(scrollYProgress, [0, 0.15], [0, -200])
  
  // Phase 2: Dissolve transition (0.15 → 0.25)
  const transitionGlitch = useTransform(scrollYProgress, [0.15, 0.18, 0.2, 0.25], [0, 1, 1, 0])
  
  // Phase 3: Interior reveal - maquila (0.2 → 0.35)
  const maquilaOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  const maquilaScale = useTransform(scrollYProgress, [0.2, 0.35], [1.2, 1])
  const maquilaY = useTransform(scrollYProgress, [0.2, 0.35], [100, 0])
  
  // Phase 4: Bodega/trucks (0.5 → 0.65)
  const bodegaY = useTransform(scrollYProgress, [0.5, 0.65], [100, 0])
  const bodegaScale = useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1])
  
  const smoothContainerScale = useSpring(containerScale, { stiffness: 100, damping: 30 })
  const smoothContainerY = useSpring(containerY, { stiffness: 100, damping: 30 })
  
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

      {/* STORY: Container exterior → zoom → dissolve → interior */}
      <section className="relative min-h-[300vh]">
        {/* Sticky viewport for the narrative sequence */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Phase 1: Container exterior (zoom out) */}
          <motion.div
            style={{
              scale: smoothContainerScale,
              opacity: containerOpacity,
              y: smoothContainerY,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
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
              
              {/* Container image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
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
          
          {/* Phase 2: Glitch transition layer */}
          <motion.div
            style={{ opacity: transitionGlitch }}
            className="absolute inset-0 pointer-events-none z-30"
          >
            <motion.div
              style={{ 
                x: useTransform(transitionGlitch, [0, 1], [0, -3]),
                opacity: transitionGlitch 
              }}
              className="absolute inset-0"
            >
              <img
                src="/assets/mx-containers-heavy.png"
                alt="Container glitch"
                className="w-full h-full object-cover pixel-perfect opacity-60"
                style={{ imageRendering: 'pixelated', mixBlendMode: 'screen' }}
              />
            </motion.div>
          </motion.div>
          
          {/* Phase 3: Interior reveal - maquila */}
          <motion.div
            style={{
              opacity: maquilaOpacity,
              scale: maquilaScale,
              y: maquilaY,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-6xl mx-auto px-6">
              <img
                src="/assets/mx-maquila-warm.png"
                alt="Interior maquila"
                className="w-full h-auto pixel-perfect"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <motion.section
        id="filosofia"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative py-40 px-6 lg:px-8 bg-black"
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 font-sans"
          >
            Automatizar la aduana de punta a punta no es innovación. Es riesgo.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-[#4a5680] leading-relaxed font-sans"
          >
            Damos más herramientas a quien ya opera. El juicio se queda en la planta.
          </motion.p>
        </div>
      </motion.section>

      {/* A MEDIDA - Bodega */}
      <motion.section
        style={{
          y: bodegaY,
          scale: bodegaScale,
        }}
        className="relative py-40 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
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
          
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/mx-bodega-trucks-warm.png"
              alt="Bodega trucks"
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="justify-self-end"
          >
            <img
              src="/assets/mx-border-trucks-cool.png"
              alt="Border trucks"
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
