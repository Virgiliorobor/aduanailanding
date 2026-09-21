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
    
    const chars = 'IMMEX§IVA§SAT§8471§CTN§MX§CERTIF'
    const fontSize = 11
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(245, 242, 236, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = `${fontSize}px 'DM Mono', monospace`
      ctx.fillStyle = '#a8a49d'
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.3
      }
    }
    
    const interval = setInterval(draw, 50)
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
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]" />
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const containerScale = useTransform(scrollYProgress, [0, 0.15], [1, 2.8])
  const containerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 0.6, 0])
  const containerY = useTransform(scrollYProgress, [0, 0.15], [0, -180])
  
  const doorsOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1])
  const doorsScale = useTransform(scrollYProgress, [0.15, 0.25], [0.9, 1.1])
  
  const interiorOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const interiorScale = useTransform(scrollYProgress, [0.25, 0.35], [1.3, 1])
  
  const smoothScale = useSpring(containerScale, { stiffness: 80, damping: 30 })
  const smoothY = useSpring(containerY, { stiffness: 80, damping: 30 })
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-paper text-ink-mid overflow-x-hidden relative">
      <CharacterRain />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-ink-faint/30">
        <div className="max-w-content mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-xl font-bold font-serif text-ink">AduanIA</div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('problema')} className="text-xs font-medium text-ink-muted hover:text-ink transition-colors font-mono uppercase tracking-wider">
                Common Problems
              </button>
              <button onClick={() => scrollToSection('fundador')} className="text-xs font-medium text-ink-muted hover:text-ink transition-colors font-mono uppercase tracking-wider">
                Founder
              </button>
              <button onClick={() => scrollToSection('stages')} className="text-xs font-medium text-ink-muted hover:text-ink transition-colors font-mono uppercase tracking-wider">
                Stages
              </button>
              <a href="/en" className="text-xs font-medium text-ink-muted hover:text-ink transition-colors font-mono uppercase tracking-wider">
                EN
              </a>
              <button onClick={() => scrollToSection('contacto')} className="px-5 py-2.5 bg-gold text-ink text-sm font-medium hover:bg-gold-light transition-colors font-sans rounded-sm">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-paper">
          
          <motion.div
            style={{
              scale: smoothScale,
              opacity: containerOpacity,
              y: smoothY,
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="max-w-content mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-6"
                >
                  01 · Hero
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight mb-8 font-serif text-ink"
                >
                  Most IMMEX companies don't know their real exposure.
                  <br />
                  <span className="text-ink-muted">Until a VAT audit arrives.</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl font-semibold text-ink mb-6 font-serif"
                >
                  AduanIA is the firm that closes that gap — before SAT does.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base leading-relaxed mb-8 text-ink-mid font-sans max-w-xl"
                >
                  VAT certification defense for manufacturing operations in Mexico.
                  Legal expertise, operational understanding, and custom technology.
                  One firm. No handoff.
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  onClick={() => scrollToSection('contacto')}
                  className="px-8 py-4 bg-gold text-ink text-sm font-medium hover:bg-gold-light transition-all font-sans rounded-sm inline-flex items-center gap-2"
                >
                  Find out what stage your operation is in <span className="font-mono">→</span>
                </motion.button>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <img
                  src="/assets/mx-containers-port_23e8.png"
                  alt="Container exterior"
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
            <img
              src="/assets/mx-container-doors-open-port_f406.png"
              alt="Container doors opening"
              className="max-w-5xl w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
          
          <motion.div
            style={{
              opacity: interiorOpacity,
              scale: interiorScale,
            }}
            className="absolute inset-0 flex items-center justify-center z-15"
          >
            <img
              src="/assets/mx-container-interior-dock-warm_c676.png"
              alt="Container interior"
              className="max-w-6xl w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-8 bg-gold-faint"
      >
        <div className="max-w-reading mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="text-8xl md:text-9xl font-semibold font-serif text-ink mb-4">16%</div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-ink-muted">
              Applied to every temporary import in Mexico if the certification is cancelled.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-32 px-8">
        <div className="max-w-reading mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            02 · The Stake
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-8 font-serif text-ink"
          >
            The certification that carries 16% of everything.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-base leading-relaxed font-sans text-ink-mid"
          >
            <p>
              Mexico's IMMEX program grants manufacturing companies a critical benefit: the right to import machinery, raw materials, and components without paying the 16% VAT at the border. That benefit is conditional — it depends on a certification issued by SAT, and SAT audits it.
            </p>
            <p>
              If the certification is cancelled, the 16% applies immediately. To every future import. To every unit of temporary inventory currently held in Mexico. For a mid-size manufacturing operation, that exposure is not a line item. It is a material financial event.
            </p>
            <p>
              Most IMMEX companies assume their inventory control systems are in order. Most have never had that assumption tested under real audit conditions. The gap between what a company believes about its compliance posture and what an auditor actually finds — that is where a certification is lost.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="problema"
        className="py-32 px-8 bg-paper-warm"
      >
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            03 · What's Actually Wrong
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6 font-serif text-ink"
          >
            What we find in most IMMEX operations.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-12 font-sans text-ink-mid"
          >
            These are not edge cases. They are the patterns that appear, in some combination, in almost every manufacturing plant we have worked with — regardless of how well the operation is run.
          </motion.p>
          
          <div className="space-y-8">
            {[
              {
                title: "Expired balances that nobody wants to touch.",
                body: "The inventory control system is showing balances from temporary imports that should have been discharged years ago. Everyone in the customs department knows they're there. Nobody knows how to correct them without triggering a full system reconstruction. So they stay."
              },
              {
                title: "The inventory control system and the ERP don't agree.",
                body: "The customs system shows one balance. The ERP shows another. Both reports are run regularly. Nobody knows which one is right, and nobody wants to be the one to find out officially."
              },
              {
                title: "The customs department is carrying problems they haven't disclosed.",
                body: "Deviations that accumulated over time, individual operations that didn't discharge correctly, part numbers that have been generating imbalances for months. The team is managing them informally because they don't know how to explain them to finance without losing credibility."
              },
              {
                title: "The physical inventory can't be located to a specific entry.",
                body: "SAT asks during a verification visit: show me where the materials from this pedimento are on your floor. The company cannot answer with confidence. The mapping between what was imported and where it physically is has never been formally maintained."
              },
              {
                title: "Production bypassed customs to meet a shipping deadline.",
                body: "It happens in every plant. A material arrived without the correct entry. An export went out before the balance was properly discharged. The production team didn't think about the compliance consequence. The customs team found out later, or didn't find out at all."
              },
              {
                title: "The inventory control system was set up by someone who no longer works there.",
                body: "The person who understood the original configuration — how the system was structured, why certain decisions were made, what the logic was behind the reports — left two years ago. What remains is a system that runs, but that nobody fully understands."
              },
              {
                title: "The vendor handles everything through tickets.",
                body: "A system deviation appears. The customs team opens a ticket with the provider. Three weeks later, a training document arrives. The deviation is still there. The provider's consulting department, account team, and development team operate independently of each other, and none of them are responsible for fixing the specific problem in front of the customs manager right now."
              },
              {
                title: "The team doesn't know how to handle the SAT visit.",
                body: "The notification arrives and the immediate response is anxiety. Who speaks? What gets shown? What doesn't? How are the auditor's questions answered without opening new exposure? The team has never been formally prepared for what the visit actually involves — because nobody prepared them."
              },
              {
                title: "Finance doesn't trust customs. Customs can't explain themselves to finance.",
                body: "The finance team has oversight responsibility but no customs knowledge. The customs team has operational knowledge but can't produce the reports finance needs to verify it. The gap between them — and the friction it generates — is often where the biggest risks hide."
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-ink/10 pt-6"
              >
                <h3 className="text-lg font-medium text-ink mb-3 font-sans">{problem.title}</h3>
                <p className="text-base leading-relaxed text-ink-muted font-sans">{problem.body}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t-2 border-gold/30"
          >
            <p className="text-lg font-medium text-ink mb-6 font-sans">
              If more than two of these apply to your operation, the diagnostic call exists for exactly that reason.
            </p>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-gold-deep hover:text-ink transition-colors font-mono text-sm"
            >
              Find out what stage your operation is in →
            </button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-32 px-8">
        <div className="max-w-reading mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            04 · The Position
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-12 font-serif text-ink"
          >
            Not a law firm. Not a software vendor. Not a generalist.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-base leading-relaxed font-sans text-ink-mid mb-12"
          >
            <p>
              The compliance industry addresses VAT certification risk in fragments. Legal firms respond to formal requirements but cannot read a SQL table or reconstruct a system balance. Software vendors install inventory control systems but do not understand what the underlying regulation actually demands. Generalist consulting firms offer broad coverage — which in practice means they have no specific depth in the one area that carries the most risk.
            </p>
            <p>
              AduanIA is built on a different logic. The practitioner who walks your plant floor on day one — understanding how your operation works, how your inventory system is structured, where the exposure actually lives — is the same one who builds the visibility tools, prepares the team for the SAT visit, and responds to the requirement when it arrives.
            </p>
            <p>
              There is no briefing. No handoff to a developer who wasn't in the room. No junior associate who attended the audit and summarized it for the partner. The understanding and the execution remain in the same place — because the moment they separate, something that matters gets lost in the translation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-paper-warm border-l-4 border-gold p-8 italic"
          >
            <p className="text-xl leading-relaxed font-serif text-ink">
              The technology is not the product. It is what happens after two days on the floor — after understanding how the plant operates, what gets manufactured, how materials move, and where the system breaks down. The code is an output of understanding, not a replacement for it.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-32 px-8 bg-paper-warm">
        <div className="max-w-content mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/mx-maquila-warm_b4c9.png"
              alt="Manufacturing floor"
              className="w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-base leading-relaxed font-sans text-ink-mid"
          >
            <p>
              Where most compliance engagements depend entirely on what the inventory control system vendor is willing to produce, AduanIA builds independent data infrastructure directly on the client's raw tables and SQL layer.
            </p>
            <p>
              That independence changes what is possible. It means a $10M deviation can be traced line by line against the actual SAT platform — not against a vendor report that may not reflect it. It means a partial reconstruction can be modeled and its outcome projected before a single change is made to a live system.
            </p>
            <p className="text-ink font-medium">
              The inventory control system is, at its core, a set of tables and queries. The complexity vendors have built on top of that layer serves their interests more than it serves the company's. AduanIA works beneath that layer — and that is where the real picture lives.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="fundador"
        className="py-32 px-8"
      >
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            05 · Who Is Behind It
          </motion.div>
          
          <div className="grid lg:grid-cols-[2fr_1fr] gap-16 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-semibold mb-4 font-serif text-ink"
              >
                Jaime Robinson
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg font-medium text-ink-muted mb-8 font-sans"
              >
                Founder, AduanIA
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-base leading-relaxed font-sans text-ink-mid"
              >
                <p>
                  Jaime Robinson has spent more than twenty years inside Mexico's IMMEX compliance ecosystem — not observing it from a legal desk, but embedded in it. He has prepared manufacturing plants for SAT audits across every major industrial corridor in Mexico, responded to formal requirements under active time pressure, and built the custom tools that made the difference when a $10M VAT deviation needed to be located line by line rather than rebuilt from scratch.
                </p>
                <p>
                  His background is unusual in a field that rewards narrow specialization: trained in customs law, fluent in manufacturing operations, and capable of writing the code that extracts, analyzes, and surfaces the data that legal strategy depends on. That combination — legal depth, operational fluency, technical execution — is not a team. It is how one practitioner works, and it is what AduanIA is built on.
                </p>
                <p>
                  Jaime is Partner at Boutique Legal Internacional and International Trade Analyst at Yormick Law, where he continues to advise multinational manufacturers across automotive, electronics, textiles, and industrial components on IMMEX compliance, VAT certification, inventory control systems, and audit defense.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="justify-self-end"
            >
              <img
                src="/assets/mx-border-trucks-cool_5f16.png"
                alt="Border operations"
                className="w-full max-w-sm h-auto"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-32 px-8 bg-paper-warm">
        <div className="max-w-reading mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            06 · How It Works
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6 font-serif text-ink"
          >
            How an engagement works.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-12 font-sans text-ink-mid"
          >
            Every engagement begins the same way, regardless of which stage a company is in.
          </motion.p>
          
          <div className="space-y-12">
            {[
              {
                num: "01",
                title: "The Diagnostic Call",
                body: "A focused conversation about the company's current situation — the operation, the inventory control system, any recent SAT interactions, and what is known about the exposure. No templates. No questionnaires. This call determines whether there is a real fit and what the right intervention looks like. It takes less than an hour."
              },
              {
                num: "02",
                title: "Two Days On-Site",
                body: "Every engagement requires physical presence at the facility. Not a software installation — an operational audit. We walk the floor, understand the manufacturing process, map how the inventory system integrates with the physical operation, review the reports the customs team actually runs, and meet the people who carry the compliance function. This is how the work gets done correctly."
              },
              {
                num: "03",
                title: "Diagnosis and Proposal",
                body: "A clear picture of the current compliance posture: where the real risks are, what the exposure looks like against the certification, and what needs to happen. Followed by a specific proposal — not a service menu, but a defined intervention with a defined outcome."
              },
              {
                num: "04",
                title: "Execution",
                body: "Custom visibility tools, surgical system analysis, team preparation for a SAT visit, formal requirement response, or ongoing audit-readiness infrastructure — depending on where the company sits in the intervention cycle. Delivered by the same practitioner who conducted the diagnosis."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-ink/10 pt-6"
              >
                <div className="flex gap-6">
                  <div className="text-2xl font-mono font-medium text-gold">{step.num}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-ink mb-3 font-sans">{step.title}</h3>
                    <p className="text-base leading-relaxed text-ink-mid font-sans">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="stages"
        className="py-32 px-8"
      >
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            07 · The Intervention Ladder
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6 font-serif text-ink"
          >
            Where does your operation stand right now?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-16 font-sans text-ink-mid"
          >
            Most companies that contact AduanIA arrive at one of five points in the audit cycle. Each requires a different kind of intervention. Find yours.
          </motion.p>
          
          <div className="space-y-8">
            {[
              {
                stage: "Stage 0",
                color: "bg-safe text-paper",
                title: "Preventive — Before the notification arrives",
                body: "Your system is running. You haven't faced a serious SAT audit. But the question of what an auditor would actually find has never been answered with confidence. Stage 0 is the foundational work: custom visibility tools, self-auditing dashboards, and the infrastructure that makes a company permanently audit-ready. This is the most effective and least expensive point to engage. It is also the hardest to prioritize — until the notification arrives."
              },
              {
                stage: "Stage 1",
                color: "bg-ink text-paper",
                title: "Audit Notification Received",
                body: "SAT has notified you of a verification visit. The team is anxious. You have days, not weeks. This is where preparation determines the outcome — mapping the physical inventory to specific entries, ensuring the inventory control system matches the floor, and making sure the team knows exactly what the visit involves and how to conduct themselves through it."
              },
              {
                stage: "Stage 2",
                color: "bg-ink text-paper",
                title: "Post-Visit — Before the Requirement",
                body: "The audit happened. The verification act identified findings. No formal requirement has arrived yet — but the clock is running. This is the most effective window for surgical correction: identifying the specific operations generating the deviation, modeling a targeted reconstruction, and resolving the problem before it becomes an official legal document that must be answered."
              },
              {
                stage: "Stage 3",
                color: "bg-ink text-paper",
                title: "Formal Requirement Received",
                body: "The document has arrived. Fifteen working days to respond, extendable to twenty-five upon request. The response must be technically precise and legally strategic — exactly what SAT asked for, nothing less, nothing that inadvertently opens new exposure. This is not the moment for a firm that handles everything. The margin for error is narrow and the stakes are explicit."
              },
              {
                stage: "Stage 4",
                color: "bg-risk text-paper",
                title: "Cancellation Process — Selective Only",
                body: "The certification is at risk. The time window is ten days. The system may be fundamentally compromised. AduanIA engages at this stage only in cases where a real path to a good outcome exists. Taking a case that cannot be won helps no one — and a track record built on honest assessment of what is achievable is worth more than a full calendar."
              }
            ].map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-paper-warm p-8 rounded-sm"
              >
                <div className="flex items-start gap-6">
                  <div className={`px-3 py-1.5 ${stage.color} text-xs font-mono font-medium rounded-sm shrink-0`}>
                    {stage.stage}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-ink mb-3 font-sans">{stage.title}</h3>
                    <p className="text-base leading-relaxed text-ink-mid font-sans">{stage.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t-2 border-gold/30"
          >
            <p className="text-lg font-medium text-ink mb-4 font-sans">
              Not sure which stage applies? That is exactly what the diagnostic call is for.
            </p>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-gold-deep hover:text-ink transition-colors font-mono text-sm font-medium"
            >
              Find out what stage your operation is in →
            </button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-32 px-8 bg-paper-warm">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            08 · Who This Is For
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-12 font-serif text-ink"
          >
            This firm is not for everyone.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-base leading-relaxed font-sans text-ink-mid mb-12"
          >
            <p>
              AduanIA works with established IMMEX manufacturing operations — automotive, electronics, textiles, industrial components — where the VAT certification is a material financial asset and the executive team understands what its loss would mean for the operation.
            </p>
            <p>
              Engagements are selective. The diagnostic call is the first filter — it determines whether there is a genuine fit between the company's situation and what AduanIA can actually deliver. Not all inquiries result in a proposal.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-ink mb-4 font-sans">AduanIA is not the right fit for:</h3>
              <ul className="space-y-3 text-base text-ink-muted font-sans">
                <li className="flex gap-3">
                  <span className="text-gold mt-1">×</span>
                  <span>Companies looking for a broad customs compliance retainer</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold mt-1">×</span>
                  <span>Operations seeking a standard inventory control system implementation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold mt-1">×</span>
                  <span>Companies that need a large team across multiple simultaneous engagements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold mt-1">×</span>
                  <span>Situations where the decision to engage has not reached the executive level</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-ink mb-4 font-sans">AduanIA is the right fit for:</h3>
              <ul className="space-y-3 text-base text-ink-mid font-sans">
                <li className="flex gap-3">
                  <span className="text-safe mt-1">✓</span>
                  <span>Holding companies with IMMEX manufacturing operations that need an honest assessment of their VAT certification exposure</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-safe mt-1">✓</span>
                  <span>Operations that have received an audit notification and need immediate, technically grounded support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-safe mt-1">✓</span>
                  <span>Companies that have identified system deviations and want surgical correction rather than full reconstruction</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-safe mt-1">✓</span>
                  <span>Operations that want to be permanently audit-ready without changing how they manufacture</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contacto"
        className="py-32 px-8"
      >
        <div className="max-w-reading mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gold-deep uppercase tracking-[0.25em] mb-8"
          >
            09 · Contact
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-semibold leading-tight mb-8 font-serif text-ink"
          >
            The gap closes on SAT's schedule, not yours.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-base leading-relaxed font-sans text-ink-mid mb-12"
          >
            <p>
              Most companies that contact AduanIA do so after the audit notification arrives. A smaller number engage before — and those engagements are consistently cleaner, faster, and less expensive than the ones that begin in crisis.
            </p>
            <p>
              The diagnostic call is free. It takes less than an hour. It will give you a clear picture of where your operation actually stands — and what, if anything, needs to happen before SAT arrives.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <a
              href="mailto:contacto@aduania.com.mx?subject=Diagnostic%20Call%20Request"
              className="inline-block px-12 py-5 bg-gold text-ink text-base font-medium hover:bg-gold-light transition-all font-sans rounded-sm"
            >
              Find out what stage your operation is in →
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-ink-muted font-mono"
          >
            Engagements are selective. Not all inquiries will result in a proposal.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-ink/10"
          >
            <a href="/en" className="text-sm text-gold-deep hover:text-ink transition-colors font-mono">
              English version → aduania.com.mx/en
            </a>
          </motion.div>
        </div>
      </motion.section>

      <footer className="py-16 px-8 border-t border-ink/10 bg-paper-warm">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-semibold font-serif text-ink">AduanIA</div>
            <p className="text-sm text-ink-muted font-sans">
              VAT certification defense for IMMEX manufacturing operations.
            </p>
            <div className="flex gap-6 text-xs font-mono text-ink-muted">
              <span>México</span>
              <a href="https://aduania.com.mx" className="hover:text-ink transition-colors">aduania.com.mx</a>
              <a href="/en" className="hover:text-ink transition-colors">EN</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
