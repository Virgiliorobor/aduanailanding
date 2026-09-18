import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Aggressive Matrix Rain with customs terms
const AggressiveMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = '§IMMEX§8471§IVA§PEDIMENTO§A1§C3§ORIGEN§MX§US§◢◣◤◥⬢⬡▓▒░█'
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []
    const speeds: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height / fontSize
      speeds[i] = 0.5 + Math.random() * 1.5
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < drops.length; i++) {
        const brightness = Math.random()
        if (brightness > 0.95) {
          ctx.fillStyle = '#00ffff'
        } else if (brightness > 0.9) {
          ctx.fillStyle = '#ff00ff'
        } else {
          ctx.fillStyle = '#00ff9d'
        }
        
        ctx.font = `${fontSize}px monospace`
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i] += speeds[i]
      }
    }
    
    const interval = setInterval(draw, 33)
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
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />
}

// Glitch text effect component
const GlitchText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="glitch-text" data-text={children}>
        {children}
      </div>
    </div>
  )
}

// Container visualization with glitch
const ContainerGrid = () => {
  const [glitchActive, setGlitchActive] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${glitchActive ? 'animate-glitch' : ''}`}>
      <svg className="w-full h-full opacity-20" viewBox="0 0 1200 800">
        {/* Container blocks */}
        {[...Array(12)].map((_, i) => {
          const x = (i % 4) * 300 + 50
          const y = Math.floor(i / 4) * 250 + 50
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="250"
                height="180"
                fill="none"
                stroke={i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#00ff9d'}
                strokeWidth="3"
                className="animate-pulse"
                style={{ 
                  animationDuration: `${2 + Math.random()}s`,
                  filter: glitchActive ? 'url(#glitch)' : 'none'
                }}
              />
              <text
                x={x + 10}
                y={y + 30}
                fill={i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#00ff9d'}
                fontSize="12"
                fontFamily="monospace"
                className="opacity-60"
              >
                {`CTN-${8471 + i * 23}`}
              </text>
              {/* Internal grid */}
              {[...Array(3)].map((_, j) => (
                <line
                  key={`h-${j}`}
                  x1={x}
                  y1={y + 60 + j * 40}
                  x2={x + 250}
                  y2={y + 60 + j * 40}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="opacity-30"
                />
              ))}
            </g>
          )
        })}
        
        {/* Trade routes */}
        <path
          d="M 100 150 L 300 250 L 600 100 L 900 300 L 1100 200"
          stroke="#ff00ff"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
          className="animate-pulse"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite" />
        </path>
        
        <defs>
          <filter id="glitch">
            <feTurbulence baseFrequency="0.05" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

// Scanline effect
const Scanlines = () => (
  <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-10" />
)

// RGB Split effect on scroll
const RGBSplit = ({ active }: { active: boolean }) => (
  <div className={`fixed inset-0 pointer-events-none z-40 mix-blend-screen transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
    <div className="absolute inset-0 bg-red-500 opacity-5 transform translate-x-1"></div>
    <div className="absolute inset-0 bg-cyan-500 opacity-5 transform -translate-x-1"></div>
  </div>
)

function App() {
  const [rgbActive, setRgbActive] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Aggressive zoom and distortion
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 2.5])
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -5])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 0.5, 0])
  
  // Section morphing effects
  const filosofiaX = useTransform(scrollYProgress, [0.2, 0.35], [-100, 0])
  const filosofiaScale = useTransform(scrollYProgress, [0.2, 0.35], [0.8, 1])
  const filosofiaRotate = useTransform(scrollYProgress, [0.2, 0.35], [3, 0])
  
  const medidaScale = useTransform(scrollYProgress, [0.4, 0.55], [1.2, 1])
  const medidaY = useTransform(scrollYProgress, [0.4, 0.55], [100, 0])
  
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const previous = scrollY.getPrevious()
      // Trigger RGB split on fast scroll
      if (previous !== undefined && Math.abs(latest - previous) > 50) {
        setRgbActive(true)
        setTimeout(() => setRgbActive(false), 150)
      }
    })
    return unsubscribe
  }, [scrollY])
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#000000] text-aduanai-ice overflow-x-hidden relative">
      <AggressiveMatrix />
      <Scanlines />
      <RGBSplit active={rgbActive} />
      
      {/* Chromatic aberration overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 mix-blend-screen opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-transparent to-cyan-500"></div>
      </div>
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[#00ff9d]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <GlitchText className="text-2xl font-black tracking-tighter">AduanAI</GlitchText>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('filosofia')} className="text-sm font-bold text-[#00ff9d] hover:text-[#00ffff] transition-colors">
                Filosofía
              </button>
              <button onClick={() => scrollToSection('fundador')} className="text-sm font-bold text-[#00ff9d] hover:text-[#00ffff] transition-colors">
                Fundador
              </button>
              <button onClick={() => scrollToSection('contacto')} className="px-6 py-3 bg-[#00ff9d] text-black text-sm font-black rounded hover:bg-[#00ffff] transition-all hover:scale-105">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO - Aggressive zoom out */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ContainerGrid />
        
        <motion.div
          style={{
            scale: heroScale,
            rotate: heroRotate,
            opacity: heroOpacity,
          }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-black tracking-[-0.05em] leading-none mb-12 relative"
          >
            <span className="glitch-hero block" data-text="AduanAI">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00ffff] via-[#00ff9d] to-[#00ffff] drop-shadow-[0_0_30px_rgba(0,255,157,0.5)]">
                AduanAI
              </span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl font-black text-[#00ff9d] mb-8 tracking-tight uppercase"
          >
            Herramientas de IA para aduanas
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-20 tracking-tight"
          >
            Procesos acelerados. La decisión es tuya.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              onClick={() => scrollToSection('contacto')}
              className="group px-12 py-6 bg-[#00ff9d] text-black text-xl font-black uppercase rounded-none hover:bg-[#00ffff] transition-all transform hover:scale-110 relative overflow-hidden border-2 border-[#00ff9d] hover:border-[#00ffff]"
            >
              <span className="relative z-10">Hablar con nosotros</span>
              <div className="absolute inset-0 bg-black/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('filosofia')}
              className="px-12 py-6 border-4 border-[#00ff9d] text-[#00ff9d] text-xl font-black uppercase rounded-none hover:bg-[#00ff9d]/10 hover:border-[#00ffff] hover:text-[#00ffff] transition-all transform hover:scale-110"
            >
              Filosofía
            </button>
          </motion.div>
        </motion.div>
        
        {/* Digital noise particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff9d]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* FILOSOFÍA - Layer peel effect */}
      <motion.section
        id="filosofia"
        style={{
          x: filosofiaX,
          scale: filosofiaScale,
          rotateY: filosofiaRotate,
        }}
        className="relative py-48 px-6 lg:px-8 border-y-4 border-[#ff00ff]/30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a001a] to-black opacity-80"></div>
        
        {/* Pixel grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #00ff9d 0px, transparent 1px, transparent 10px),
              repeating-linear-gradient(90deg, #00ff9d 0px, transparent 1px, transparent 10px)
            `,
            backgroundSize: '10px 10px'
          }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-16 text-[#ff00ff] drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]"
          >
            Automatizar la aduana de punta a punta no es innovación. Es riesgo.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 50 }}
            className="text-3xl md:text-4xl font-bold text-white leading-relaxed"
          >
            Damos más herramientas a quien ya opera. El juicio se queda en la planta.
          </motion.p>
        </div>
        
        {/* Code snippet decoration */}
        <div className="absolute right-10 top-20 font-mono text-sm text-[#00ffff] opacity-30 hidden lg:block glitch-text" data-text='{"origen":"MX"}'>
          <pre>{`{
  "clasificacion": "8471.30.01",
  "origen": "MX",
  "iva": 16,
  "pedimento": "validado",
  "immex": true
}`}</pre>
        </div>
      </motion.section>

      {/* A MEDIDA - Scale punch */}
      <motion.section
        style={{
          scale: medidaScale,
          y: medidaY,
        }}
        className="relative py-48 px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Distorted grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ff9d" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-12 text-[#00ffff] drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
          >
            ¿Problema real de compliance o de piso?
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="text-3xl md:text-5xl font-black text-white leading-tight"
          >
            Lo construimos. Sin plantilla genérica.
          </motion.p>
        </div>
        
        {/* Animated pixel blocks */}
        <div className="absolute right-10 bottom-10 w-48 h-48 opacity-30">
          {[...Array(64)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border border-[#00ff9d]"
              style={{
                left: `${(i % 8) * 12.5}%`,
                top: `${Math.floor(i / 8) * 12.5}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.02,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* FUNDADOR */}
      <motion.section
        id="fundador"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-48 px-6 lg:px-8 border-t-4 border-[#00ff9d]/30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a1a] to-black"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-10 text-[#00ff9d] drop-shadow-[0_0_40px_rgba(0,255,157,0.6)]"
          >
            Jaime Robinson
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed"
          >
            20 años dentro de la planta y de los datos — IMMEX, IVA, origen. Guadalajara.
          </motion.p>
        </div>
      </motion.section>

      {/* CONTACTO */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-48 px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-16 text-white drop-shadow-[0_0_50px_rgba(0,255,255,0.8)]"
          >
            Hablemos.
          </motion.h2>
          <motion.a
            href="mailto:contacto@aduanai.com.mx"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: -1 }}
            className="inline-block px-16 py-8 bg-[#00ff9d] text-black text-2xl font-black uppercase rounded-none hover:bg-[#00ffff] transition-all border-4 border-[#00ff9d] hover:border-[#00ffff] shadow-[0_0_40px_rgba(0,255,157,0.5)]"
          >
            Contáctanos
          </motion.a>
          <p className="text-xl text-[#00ff9d]/70 font-mono mt-12">aduanai.com.mx</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t-2 border-[#00ff9d]/50 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tight text-[#00ff9d]">AduanAI</div>
          <div className="flex gap-8 text-sm font-mono text-[#00ff9d]/70">
            <a href="https://aduanai.com.mx" className="hover:text-[#00ffff] transition-colors">aduanai.com.mx</a>
            <span>MX · US</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
