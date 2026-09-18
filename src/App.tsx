function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-aduanai-dark text-aduanai-ice">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-aduanai-dark/80 backdrop-blur-md border-b border-aduanai-steel/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold tracking-tight">AduanAI</div>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('filosofia')}
                className="text-sm font-medium text-aduanai-silver hover:text-aduanai-ice transition-colors"
              >
                Filosofía
              </button>
              <button 
                onClick={() => scrollToSection('fundador')}
                className="text-sm font-medium text-aduanai-silver hover:text-aduanai-ice transition-colors"
              >
                Fundador
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="px-5 py-2.5 bg-aduanai-ice text-aduanai-dark text-sm font-semibold rounded hover:bg-white transition-colors"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black tracking-tighter leading-none mb-8">
            AduanAI
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-aduanai-silver mb-4 tracking-tight">
            Herramientas de IA para aduanas
          </p>
          <p className="text-xl md:text-2xl font-normal text-aduanai-silver/80 mb-12 max-w-2xl">
            La que no te pide que dejes de decidir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('contacto')}
              className="px-8 py-4 bg-aduanai-ice text-aduanai-dark text-base font-bold rounded hover:bg-white transition-all transform hover:scale-105"
            >
              Hablar con nosotros
            </button>
            <button 
              onClick={() => scrollToSection('filosofia')}
              className="px-8 py-4 border-2 border-aduanai-silver/30 text-aduanai-ice text-base font-bold rounded hover:border-aduanai-ice transition-all"
            >
              Filosofía
            </button>
          </div>
        </div>
      </section>

      {/* Filosofía Section */}
      <section id="filosofia" className="py-32 px-6 lg:px-8 bg-aduanai-charcoal/50">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Automatizar la aduana de punta a punta no es innovación. Es riesgo.
            </p>
            <p className="text-2xl md:text-3xl font-medium text-aduanai-silver/90 leading-relaxed max-w-3xl">
              Damos más herramientas a quien ya opera. El juicio se queda en la planta.
            </p>
          </div>
        </div>
      </section>

      {/* A Medida Section */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              ¿Problema real de compliance o de piso?
            </p>
            <p className="text-2xl md:text-3xl font-medium text-aduanai-silver/90 leading-relaxed">
              Lo construimos. Sin plantilla genérica.
            </p>
          </div>
        </div>
      </section>

      {/* Fundador Section */}
      <section id="fundador" className="py-32 px-6 lg:px-8 bg-aduanai-charcoal/50">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Jaime Robinson
            </h2>
            <p className="text-xl md:text-2xl font-medium text-aduanai-silver/90 leading-relaxed max-w-3xl">
              20 años dentro de la planta y de los datos — IMMEX, IVA, origen. Guadalajara.
            </p>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contacto" className="py-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
              Hablemos.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:contacto@aduanai.com.mx"
                className="inline-block px-8 py-4 bg-aduanai-ice text-aduanai-dark text-base font-bold rounded hover:bg-white transition-all transform hover:scale-105"
              >
                Contáctanos
              </a>
            </div>
            <p className="text-lg text-aduanai-silver/70 font-medium">
              aduanai.com.mx
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-aduanai-steel/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-2xl font-bold tracking-tight">AduanAI</div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-aduanai-silver">
              <a href="https://aduanai.com.mx" className="hover:text-aduanai-ice transition-colors">
                aduanai.com.mx
              </a>
              <span className="text-aduanai-silver/50">MX · US</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
