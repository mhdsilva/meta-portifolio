import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './preview/Navbar'
import Hero from './preview/Hero'
import Footer from './preview/Footer'
import ThemeOptions from './preview/ThemeOptions'
import About from './preview/About'
import Experience from './preview/Experience'
import TechStack from './preview/TechStack'

export default function Preview({ action, payload, onSelect }) {
  const [currentView, setCurrentView] = useState('INITIAL')
  const [theme, setTheme] = useState('light')
  const [showError, setShowError] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isStyled, setIsStyled] = useState(false)
  const [hasAbout, setHasAbout] = useState(false)
  const [hasExperienceSkills, setHasExperienceSkills] = useState(false)
  const [isCrashed, setIsCrashed] = useState(false)

  // Sincroniza estado interno com props externas (action/payload)
  // Este padrão é necessário para reagir a mudanças de action
  useEffect(() => {
    if (!action) return
    
    switch (action) {
      case 'SHOW_HTML':
        setCurrentView('HTML_VIEW')
        setIsStyled(false)
        setHasAbout(false)
        setHasExperienceSkills(false)
        break
      case 'APPLY_STYLES':
        setIsStyled(true)
        setTheme('dark')
        // Transição suave de 1 segundo
        setTimeout(() => {
          setCurrentView('STYLED_SITE')
        }, 100)
        break
      case 'ADD_ABOUT':
        setHasAbout(true)
        break
      case 'ADD_EXPERIENCE_SKILLS':
        setHasExperienceSkills(true)
        break
      case 'TRIGGER_CRASH':
        setIsCrashed(true)
        setShowError(true)
        setIsFixed(false)
        break
      case 'FIX_CRASH':
        setIsFixed(true)
        setIsCrashed(false)
        setTimeout(() => {
          setShowError(false)
        }, 2000)
        break
      case 'SHOW_INTERACTION':
        setCurrentView('INTERACTION')
        break
      case 'FINAL_VIEW':
        // Garante que todos os componentes estejam visíveis na view final
        setCurrentView('FINAL')
        setIsStyled(true)
        setHasAbout(true)
        setHasExperienceSkills(true)
        break
      default:
        break
    }
  }, [action, payload])

  const getBackgroundColor = () => {
    if (theme === 'dark' || theme === 'cyber') {
      return 'bg-gray-900'
    }
    return 'bg-white'
  }

  // Estilo para crash com filtros CSS
  const crashStyle = isCrashed ? {
    filter: 'blur(10px) contrast(200%) grayscale(100%)',
    transition: 'filter 0.5s ease-in-out'
  } : {
    filter: 'none',
    transition: 'filter 1s ease-in-out'
  }

  return (
    <div 
      className={`flex flex-col h-screen w-screen overflow-y-auto transition-all duration-1000 ${getBackgroundColor()}`}
      style={crashStyle}
    >
      <AnimatePresence mode="wait">
        {currentView === 'INITIAL' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <p className="text-gray-500">Aguardando comandos...</p>
          </motion.div>
        )}

        {/* View HTML básico sem estilização - apenas estrutura inicial */}
        {currentView === 'HTML_VIEW' && (
          <motion.div
            key="html-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white"
            style={{ fontFamily: 'Times, "Times New Roman", serif' }}
          >
            <header style={{ padding: '20px', borderBottom: '2px solid #000' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', margin: 0 }}>Matheus Henrique da Silva</h1>
              <nav style={{ marginTop: '15px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px' }}>
                  <li><a href="#sobre" style={{ color: '#0000EE', textDecoration: 'underline' }}>Sobre</a></li>
                  <li><a href="#experiencia" style={{ color: '#0000EE', textDecoration: 'underline' }}>Experiência</a></li>
                  <li><a href="#tech-stack" style={{ color: '#0000EE', textDecoration: 'underline' }}>Tech Stack</a></li>
                  <li><a href="#projetos" style={{ color: '#0000EE', textDecoration: 'underline' }}>Projetos</a></li>
                  <li><a href="#contato" style={{ color: '#0000EE', textDecoration: 'underline' }}>Contato</a></li>
                </ul>
              </nav>
            </header>
            
            <main style={{ padding: '40px 20px', flex: 1 }}>
              {/* Hero Section - apenas esta seção na etapa HTML puro */}
              <section style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
                  Matheus Henrique da Silva
                </h1>
                <h2 style={{ fontSize: '20px', color: '#000', marginBottom: '15px' }}>
                  Tech Lead @ Humanizadas | Arquitetura de Soluções & Inovação
                </h2>
                <p style={{ fontSize: '16px', color: '#000', lineHeight: '1.6', marginBottom: '20px', maxWidth: '800px' }}>
                  Engenheiro de Software movido pelo desafio de conectar gestão de produtos e código de alta performance. 
                  Especialista em levar produtos da concepção ao lançamento.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <a href="#projetos" style={{ 
                    display: 'inline-block',
                    padding: '10px 20px', 
                    backgroundColor: '#C0C0C0', 
                    border: '2px solid #808080',
                    color: '#000',
                    textDecoration: 'none',
                    marginRight: '10px'
                  }}>
                    Ver Projetos
                  </a>
                  <a href="https://linkedin.com/in/matheushenrique2773" style={{ 
                    display: 'inline-block',
                    padding: '10px 20px', 
                    backgroundColor: '#E0E0E0', 
                    border: '2px solid #808080',
                    color: '#000',
                    textDecoration: 'none'
                  }}>
                    LinkedIn
                  </a>
                </div>
              </section>
            </main>
            
            <footer style={{ padding: '20px', borderTop: '2px solid #000', backgroundColor: '#FFF' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>© 2026 Matheus Henrique da Silva</p>
            </footer>
          </motion.div>
        )}

        {/* View com estilos aplicados */}
        {(currentView === 'STYLED_SITE' || (isStyled && currentView !== 'INTERACTION' && currentView !== 'FINAL')) && (
          <motion.div
            key="styled-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-full"
          >
            <Navbar key="navbar" theme={theme} />
            <Hero key="hero" theme={theme} />
            {hasAbout && <About key="about" theme={theme} />}
            {hasExperienceSkills && (
              <>
                <div id="experiencia">
                  <Experience key="experience" theme={theme} />
                </div>
                <div id="tech-stack">
                  <TechStack key="tech-stack" theme={theme} />
                </div>
              </>
            )}
            <Footer key="footer" theme={theme} />
          </motion.div>
        )}


        {showError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-6 max-w-2xl mx-4">
              <pre className="text-red-500 font-mono text-sm whitespace-pre-wrap">
{`Error: Memory overflow detected
at Three.js ParticleSystem.render()
  at WebGLRenderer.draw()
  at AnimationFrame.requestAnimationFrame()

Stack trace:
  → particle.js:42:12
  → renderer.js:156:8
  → main.js:89:3

FATAL: GPU context lost
Recovering...`}
              </pre>
              {isFixed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-400 font-mono text-sm"
                >
                  ✓ Memory leak fixed. Draw calls optimized.
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {currentView === 'INTERACTION' && (
          <motion.div
            key="interaction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <Navbar key="navbar" theme={theme} />
            <ThemeOptions key="themes" onSelect={onSelect} />
            <Footer key="footer" theme={theme} />
          </motion.div>
        )}

        {currentView === 'FINAL' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-full"
          >
            <Navbar key="navbar" theme={theme} />
            <Hero key="hero" theme={theme} />
            {hasAbout && (
              <div id="sobre">
                <About key="about" theme={theme} />
              </div>
            )}
            {hasExperienceSkills && (
              <>
                <div id="experiencia">
                  <Experience key="experience" theme={theme} />
                </div>
                <div id="tech-stack">
                  <TechStack key="tech-stack" theme={theme} />
                </div>
              </>
            )}
            <div id="contato">
              <Footer key="footer" theme={theme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
