import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const CharacterRain = ({ intensity = 0.15 }: { intensity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    
    const glyphs = '01アイウエオカキクケコΣΔΩ░▒▓█┼╬╗╝'
    const cols = Math.floor(canvas.width / 24)
    const drops = Array.from({ length: cols }, () => Math.random() * canvas.height)
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(31,111,120,0.25)'
      ctx.font = '11px monospace'
      
      drops.forEach((y, i) => {
        if (Math.random() > 0.97) {
          const ch = glyphs[Math.floor(Math.random() * glyphs.length)]
          ctx.fillText(ch, i * 24, y)
        }
        drops[i] = y > canvas.height + Math.random() * 300 ? 0 : y + 12 + Math.random() * 6
      })
      
      requestAnimationFrame(draw)
    }
    
    draw()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[5]" style={{ opacity: intensity }} />
}

const Scanlines = () => (
  <div className="scanlines-overlay" />
)

interface BeatLayer {
  type: 'standard' | 'plant' | 'void'
  id: string
  label: string
  camera: 'orbit' | 'dive' | 'hold' | 'portal' | 'pullup' | 'plant' | 'pan' | 'morph' | 'void'
  whisper?: string
  copyText?: string
  images?: string[]
  plantImages?: { a: string[], b: string[], c: string[] }
  height?: string
  content?: JSX.Element
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const smooth = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const StoryBeat = ({ beat }: { beat: BeatLayer, index: number }) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const [layerOpacities, setLayerOpacities] = useState([1, 0, 0, 0])
  const [cameraTransform, setCameraTransform] = useState('none')
  const [copyOpacity, setCopyOpacity] = useState(0)
  
  useEffect(() => {
    return scrollYProgress.on('change', () => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      
      const vh = window.innerHeight
      const total = rect.height - vh
      const progress = clamp(-rect.top / Math.max(1, total))
      
      const ops = layerOpacity(progress, beat.camera === 'morph' || beat.camera === 'dive')
      setLayerOpacities(ops)
      
      const transform = getCameraTransform(beat.camera, progress)
      setCameraTransform(transform)
      
      // Fade in copy overlay when glitch intensifies (45-85% progress)
      if (progress < 0.45) {
        setCopyOpacity(0)
      } else if (progress < 0.55) {
        setCopyOpacity(smooth((progress - 0.45) / 0.1))
      } else if (progress < 0.85) {
        setCopyOpacity(1)
      } else {
        setCopyOpacity(1 - smooth((progress - 0.85) / 0.07))
      }
    })
  }, [scrollYProgress, beat.camera])
  
  const layerOpacity = (p: number, aggressive = false): number[] => {
    const adj = aggressive ? Math.min(1, p * 1.1) : p
    const o0 = clamp(1 - adj * 1.8)
    const o1 = clamp(1 - Math.abs(adj - 0.35) * 2.5)
    const o2 = clamp(1 - Math.abs(adj - 0.7) * 2.2)
    const o3 = clamp((adj - 0.75) / 0.35) * 0.5
    return [o0, o1, o2, o3]
  }
  
  const getCameraTransform = (type: string, p: number): string => {
    const s = smooth(p)
    switch (type) {
      case 'orbit': {
        const scale = lerp(1.08, 1.0, s)
        const rot = lerp(-1, 1.5, s)
        const tx = lerp(1, -1, s)
        return `translate(${tx}%, 0) scale(${scale}) rotate(${rot}deg)`
      }
      case 'dive': {
        const scale = lerp(1.0, 1.35, s)
        const rot = lerp(0, -3, s)
        const ty = lerp(0, 3, s)
        return `translate(0, ${ty}%) scale(${scale}) rotate(${rot}deg)`
      }
      case 'hold': {
        const hold = p < 0.2 ? 0 : smooth((p - 0.2) / 0.8)
        const scale = lerp(1.0, 1.08, hold)
        return `scale(${scale})`
      }
      case 'portal': {
        const scale = lerp(1.0, 1.6, s)
        const ty = lerp(0, -2, s)
        return `translate(0, ${ty}%) scale(${scale})`
      }
      case 'pullup': {
        const scale = lerp(1.2, 1.0, s)
        const ty = lerp(4, -1, s)
        return `translate(0, ${ty}%) scale(${scale})`
      }
      case 'plant': {
        const scale = lerp(1.03, 1.12, s)
        const ty = lerp(1, -2, s)
        return `translate(0, ${ty}%) scale(${scale})`
      }
      case 'pan': {
        const tx = lerp(6, -6, s)
        const scale = 1.08
        return `translate(${tx}%, 0) scale(${scale})`
      }
      case 'morph': {
        const scale = lerp(1.0, 1.3, s)
        const rot = lerp(0, 2, s)
        const tx = Math.sin(s * Math.PI * 2) * 0.8
        return `translate(${tx}%, 0) scale(${scale}) rotate(${rot}deg)`
      }
      default:
        return 'none'
    }
  }
  
  const renderCopyOverlay = () => {
    if (!beat.copyText) return null
    
    return (
      <div 
        className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
        style={{ opacity: copyOpacity }}
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
          }}
        />
        <div className="relative z-10 max-w-4xl px-8 md:px-16">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-chrome font-mono text-center"
             style={{
               textShadow: '0 0 60px rgba(0,0,0,1), 0 4px 12px rgba(0,0,0,0.9), 0 0 3px #000, 0 0 6px #000',
               WebkitTextStroke: '0.5px rgba(0,0,0,0.5)'
             }}>
            {beat.copyText}
          </p>
        </div>
      </div>
    )
  }
  
  if (beat.type === 'void') {
    return (
      <section ref={ref} className="relative" style={{ height: beat.height || '140vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          {beat.content}
        </div>
      </section>
    )
  }
  
  if (beat.type === 'plant' && beat.plantImages) {
    const [plantOpacities, setPlantOpacities] = useState({ a: 1, b: 0, c: 0 })
    
    useEffect(() => {
      return scrollYProgress.on('change', () => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        
        const vh = window.innerHeight
        const total = rect.height - vh
        const progress = clamp(-rect.top / Math.max(1, total))
        
        const pa = clamp(1 - Math.abs(progress - 0.15) / 0.35)
        const pb = clamp(1 - Math.abs(progress - 0.5) / 0.35)
        const pc = clamp(1 - Math.abs(progress - 0.85) / 0.35)
        
        setPlantOpacities({ a: pa, b: pb, c: pc })
      })
    }, [scrollYProgress])
    
    return (
      <section ref={ref} className="relative" style={{ height: beat.height || '220vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <div className="absolute inset-[-8%] will-change-transform origin-center" style={{ transform: cameraTransform }}>
            {(['a', 'b', 'c'] as const).map((key) => {
              const images = beat.plantImages![key]
              const stackOpacity = plantOpacities[key]
              return (
                <div key={key} className="absolute inset-0" style={{ opacity: stackOpacity }}>
                  {images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: layerOpacities[i],
                        zIndex: i + 1,
                        imageRendering: 'pixelated'
                      }}
                    />
                  ))}
                </div>
              )
            })}
          </div>
          {renderCopyOverlay()}
        </div>
      </section>
    )
  }
  
  return (
    <section ref={ref} className="relative" style={{ height: beat.height || '160vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-[-8%] will-change-transform origin-center" style={{ transform: cameraTransform }}>
          <div className="absolute inset-0">
            {beat.images?.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover will-change-opacity"
                style={{
                  opacity: layerOpacities[i],
                  zIndex: i + 1,
                  imageRendering: 'pixelated'
                }}
              />
            ))}
          </div>
        </div>
        {renderCopyOverlay()}
        {beat.content && beat.content}
      </div>
    </section>
  )
}

function App() {
  const [activeBeat] = useState('SB-01')
  
  const beats: BeatLayer[] = [
    {
      type: 'standard',
      id: 'SB-01',
      label: 'SB-01 // AERIAL',
      camera: 'orbit',
      copyText: 'Tecnología aplicada al comercio exterior mexicano.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-01-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-01-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-01-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-01-glitch-03-heavy.png'
      ]
    },
    {
      type: 'standard',
      id: 'SB-02',
      label: 'SB-02 // CORRIDOR',
      camera: 'dive',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-02-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-02-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-02-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-02-glitch-03-heavy.png'
      ]
    },
    {
      type: 'standard',
      id: 'SB-03',
      label: 'SB-03 // DOOR',
      camera: 'hold',
      copyText: 'Los sistemas de control de inventario de las operaciones IMMEX generan reportes.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-03-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-03-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-03-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-03-glitch-03-heavy.png'
      ]
    },
    {
      type: 'standard',
      id: 'SB-05',
      label: 'SB-05 // PORTAL',
      camera: 'portal',
      copyText: 'Lo que no generan es visibilidad real: dónde está la exposición, qué balance está por vencer, qué diferencia existe entre lo que el sistema dice y lo que el SAT va a encontrar.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-05-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-05-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-05-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-05-glitch-03-heavy.png'
      ]
    },
    {
      type: 'standard',
      id: 'SB-07',
      label: 'SB-07 // DOCK',
      camera: 'pullup',
      copyText: 'AduanIA construye la capa de datos independiente que muestra eso, directamente sobre las tablas del cliente.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-07-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-07-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-07-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-07-glitch-03-heavy.png'
      ]
    },
    {
      type: 'plant',
      id: 'SB-08',
      label: 'SB-08 // PLANT',
      camera: 'plant',
      copyText: 'Construimos infraestructura específica para cada operación, basada en entender cómo funciona la planta antes de escribir una sola línea de código.',
      height: '220vh',
      plantImages: {
        a: [
          '/assets/storyboard/glitch-seq/SB-08b-glitch-00-FULL.png',
          '/assets/storyboard/glitch-seq/SB-08b-glitch-01-mid.png',
          '/assets/storyboard/glitch-seq/SB-08b-glitch-02-port.png',
          '/assets/storyboard/glitch-seq/SB-08b-glitch-03-heavy.png'
        ],
        b: [
          '/assets/storyboard/glitch-seq/SB-08c-glitch-00-FULL.png',
          '/assets/storyboard/glitch-seq/SB-08c-glitch-01-mid.png',
          '/assets/storyboard/glitch-seq/SB-08c-glitch-02-port.png',
          '/assets/storyboard/glitch-seq/SB-08c-glitch-03-heavy.png'
        ],
        c: [
          '/assets/storyboard/glitch-seq/SB-08d-glitch-00-FULL.png',
          '/assets/storyboard/glitch-seq/SB-08d-glitch-01-mid.png',
          '/assets/storyboard/glitch-seq/SB-08d-glitch-02-port.png',
          '/assets/storyboard/glitch-seq/SB-08d-glitch-03-heavy.png'
        ]
      }
    },
    {
      type: 'standard',
      id: 'SB-09',
      label: 'SB-09 // TRUCKS',
      camera: 'pan',
      copyText: 'Operaciones IMMEX manufactureras en México, donde la certificación IVA es un activo financiero material.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-09-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-09-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-09-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-09-glitch-03-heavy.png'
      ]
    },
    {
      type: 'standard',
      id: 'SB-10',
      label: 'SB-10 // DATA',
      camera: 'morph',
      copyText: 'Herramientas propias para entregar consultoría IMMEX con visibilidad en tiempo real. Correcciones modeladas antes de ejecutarse.',
      height: '160vh',
      images: [
        '/assets/storyboard/glitch-seq/SB-10-glitch-00-FULL.png',
        '/assets/storyboard/glitch-seq/SB-10-glitch-01-mid.png',
        '/assets/storyboard/glitch-seq/SB-10-glitch-02-port.png',
        '/assets/storyboard/glitch-seq/SB-10-glitch-03-heavy.png'
      ]
    },
    {
      type: 'void',
      id: 'VOID',
      label: 'ADUANIA // VOID',
      camera: 'void',
      height: '140vh',
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[0.28em] uppercase mb-6 text-chrome">
            AduanIA
          </h1>
          <p className="text-xs tracking-[0.08em] text-chrome/55 max-w-[36ch] mx-auto leading-relaxed">
            Tecnología aplicada al comercio exterior mexicano.
          </p>
        </motion.div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-black text-chrome overflow-x-hidden relative">
      <CharacterRain intensity={0.06} />
      <Scanlines />

      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-between px-[18px] py-[14px] text-[11px] tracking-[0.12em] uppercase text-chrome/55 pointer-events-none mix-blend-difference font-mono">
        <span>{activeBeat}</span>
        <span>100%</span>
      </div>

      {beats.map((beat, i) => (
        <StoryBeat key={beat.id} beat={beat} index={i} />
      ))}

      <section id="problema" className="relative bg-black py-32 md:py-48 px-6 lg:px-8 z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-12 text-chrome font-mono">
              Los sistemas de control de inventario de las operaciones IMMEX generan reportes. Lo que no generan es visibilidad real: dónde está la exposición, qué balance está por vencer, qué diferencia existe entre lo que el sistema dice y lo que el SAT va a encontrar.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl font-medium text-violet-bright leading-relaxed font-mono">
              AduanIA construye la capa de datos independiente que muestra eso, directamente sobre las tablas del cliente, sin depender del proveedor del sistema ni de sus tiempos de respuesta.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-black py-32 md:py-48 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 text-chrome font-mono">
              AduanIA es una firma de tecnología especializada en comercio exterior mexicano.
            </h2>
            <p className="text-base md:text-lg text-chrome/80 leading-relaxed font-mono mb-6 max-w-4xl">
              Combinamos experiencia legal y operativa con desarrollo de herramientas propias para entregar consultoría IMMEX de una forma que las firmas tradicionales no pueden: con visibilidad en tiempo real, correcciones modeladas antes de ejecutarse, y equipos preparados antes de que llegue el requerimiento.
            </p>
            <p className="text-base md:text-lg text-chrome/60 leading-relaxed font-mono border-l-2 border-violet pl-6 max-w-4xl">
              No vendemos software genérico. Construimos infraestructura específica para cada operación, basada en entender cómo funciona la planta antes de escribir una sola línea de código.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-black py-32 md:py-48 px-6 lg:px-8 border-t border-chrome/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-mono text-peach uppercase tracking-[0.3em] mb-4">Para quién</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 text-chrome font-mono">
              Operaciones IMMEX manufactureras en México
            </h2>
            <p className="text-base md:text-lg text-chrome/80 leading-relaxed font-mono mb-6 max-w-4xl">
              Automotriz, electrónica, textil, componentes industriales — donde la certificación IVA es un activo financiero material y su defensa se toma en serio a nivel directivo.
            </p>
            <p className="text-base md:text-lg text-chrome/60 leading-relaxed font-mono max-w-4xl">
              Trabajamos con equipos de cumplimiento, finanzas y dirección de planta que necesitan más que una opinión legal: necesitan saber exactamente dónde están parados antes de que el SAT lo determine por ellos.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="fundador" className="relative bg-black py-32 md:py-48 px-6 lg:px-8 border-t border-chrome/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-mono text-peach uppercase tracking-[0.3em] mb-4">Fundador</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-chrome font-mono tracking-tight">
              Jaime Virgilio Robinson
            </h2>
            <p className="text-base md:text-lg text-chrome/80 leading-relaxed font-mono mb-6 max-w-4xl">
              Más de 20 años dentro del ecosistema de cumplimiento aduanero en México. Socio en Boutique Legal Internacional y analista de comercio exterior en Yormick Law, dos firmas con operaciones en México y Estados Unidos.
            </p>
            <p className="text-base md:text-lg text-chrome/60 leading-relaxed font-mono mb-8 max-w-4xl">
              AduanIA es la expresión tecnológica de esa experiencia: las mismas capacidades, entregadas a través de herramientas construidas para cada operación.
            </p>
            <a href="/en" className="text-sm text-chrome/50 hover:text-violet-bright transition-colors font-mono">
              English version → aduania.com.mx/en
            </a>
          </motion.div>
        </div>
      </section>

      <section id="contacto" className="relative bg-black py-32 md:py-48 px-6 lg:px-8 border-t border-chrome/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-chrome font-mono">
              ¿Por dónde empezamos?
            </h2>
            <p className="text-base md:text-lg text-chrome/80 leading-relaxed font-mono mb-6 max-w-3xl">
              Una llamada de diagnóstico, menos de una hora, para entender dónde está parada tu operación y qué necesita antes del siguiente ciclo de verificación del SAT.
            </p>
            <p className="text-base md:text-lg text-chrome/60 leading-relaxed font-mono mb-12 max-w-3xl">
              También podemos arrancar con una sesión de desarrollo de ideas si estás explorando cómo la tecnología puede fortalecer tu área de comercio exterior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="mailto:contacto@aduania.com.mx?subject=Llamada%20de%20diagnóstico"
                className="px-8 py-4 bg-violet text-white text-base font-bold hover:bg-violet-bright transition-colors font-mono text-center"
              >
                Agendar llamada de diagnóstico →
              </a>
              <a
                href="mailto:contacto@aduania.com.mx?subject=Sesión%20de%20desarrollo%20de%20ideas"
                className="px-8 py-4 border-2 border-peach text-peach-bright text-base font-bold hover:bg-peach/10 transition-colors font-mono text-center"
              >
                Sesión de desarrollo de ideas →
              </a>
            </div>
            <p className="text-xs text-chrome/50 font-mono">
              Los compromisos son selectivos. No toda consulta derivará en una propuesta.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="relative bg-black py-16 px-6 lg:px-8 border-t border-chrome/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-chrome font-mono">AduanIA · México</div>
            <p className="text-xs text-chrome/60 font-mono">Tecnología aplicada al comercio exterior mexicano.</p>
            <div className="flex gap-6 text-xs font-mono text-chrome/50">
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
