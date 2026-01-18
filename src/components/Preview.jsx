import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import SkeletonView from './preview/SkeletonView'
import Navbar from './preview/Navbar'
import Hero from './preview/Hero'
import ErrorView from './preview/ErrorView'
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
  const [projects, setProjects] = useState([])
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
      case 'SHOW_PROJECTS':
        if (Array.isArray(payload)) {
          setProjects(payload)
        }
        setCurrentView('PROJECTS')
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
      case 'SET_VIEW':
        if (payload === 'BASIC_SITE') {
          setCurrentView('BASIC_SITE')
        } else if (payload === 'SKELETON') {
          setCurrentView('SKELETON')
        }
        break
      case 'UPDATE_STYLE':
        if (payload?.theme) {
          setTheme(payload.theme)
        }
        if (payload?.navbar === 'glass') {
          setCurrentView('FULL_SITE')
        }
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

        {currentView === 'SKELETON' && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-gray-100"
          >
            <SkeletonView />
          </motion.div>
        )}

        {/* View HTML básico sem estilização */}
        {currentView === 'HTML_VIEW' && (
          <motion.div
            key="html-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white"
            style={{ fontFamily: 'Times, "Times New Roman", serif' }}
          >
            <header className="p-4 border-b border-gray-400">
              <h1 className="text-2xl font-bold text-black">DevPortfolio</h1>
              <nav>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px', marginTop: '10px' }}>
                  <li><a href="#" style={{ color: '#0000EE', textDecoration: 'underline' }}>Início</a></li>
                  <li><a href="#" style={{ color: '#0000EE', textDecoration: 'underline' }}>Projetos</a></li>
                  <li><a href="#" style={{ color: '#0000EE', textDecoration: 'underline' }}>Sobre</a></li>
                  <li><a href="#" style={{ color: '#0000EE', textDecoration: 'underline' }}>Contato</a></li>
                </ul>
              </nav>
            </header>
            
            <main className="flex-1 p-8 bg-white">
              <h1 className="text-4xl font-bold mb-4 text-black">Meta-Developer</h1>
              <p className="text-lg mb-4 text-black">
                Construindo experiências digitais inovadoras com código e criatividade
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '30px', marginBottom: '20px' }}>
                <li>GitHub</li>
                <li>LinkedIn</li>
                <li>Email</li>
              </ul>
              <button style={{ 
                padding: '10px 20px', 
                backgroundColor: '#C0C0C0', 
                border: '2px solid #808080',
                cursor: 'pointer'
              }}>
                Ver Projetos
              </button>
            </main>
            
            <footer className="p-4 border-t border-gray-400 bg-white">
              <p className="text-black">© 2026 DevPortfolio</p>
            </footer>
          </motion.div>
        )}

        {/* View com estilos aplicados */}
        {(currentView === 'STYLED_SITE' || (isStyled && currentView !== 'PROJECTS' && currentView !== 'INTERACTION' && currentView !== 'FINAL')) && (
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

        {currentView === 'BASIC_SITE' && (
          <motion.div
            key="basic-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white"
          >
            {/* Navbar básico sem estilização */}
            <nav className="flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black">DevPortfolio</span>
              </div>
              <div className="hidden md:flex gap-6">
                <a href="#" className="text-gray-700">Início</a>
                <a href="#" className="text-gray-700">Projetos</a>
                <a href="#" className="text-gray-700">Sobre</a>
                <a href="#" className="text-gray-700">Contato</a>
              </div>
            </nav>
            
            {/* Hero básico sem estilização */}
            <section className="flex-1 flex items-center justify-center p-8 bg-white">
              <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-bold mb-6 text-black">
                  Meta-Developer
                </h1>
                <p className="text-lg mb-8 text-gray-700">
                  Construindo experiências digitais inovadoras com código e criatividade
                </p>
                <div className="flex gap-4 justify-center mb-8">
                  <span className="text-gray-600">GitHub</span>
                  <span className="text-gray-600">LinkedIn</span>
                  <span className="text-gray-600">Email</span>
                </div>
                <button className="px-6 py-3 bg-gray-300 text-black rounded border border-gray-400">
                  Ver Projetos
                </button>
              </div>
            </section>
            
            {/* Footer básico */}
            <footer className="p-6 border-t border-gray-300 bg-white">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-gray-600">© 2026 DevPortfolio</span>
                <div className="flex gap-4">
                  <span className="text-gray-600">GitHub</span>
                  <span className="text-gray-600">LinkedIn</span>
                  <span className="text-gray-600">Email</span>
                </div>
                <span className="text-gray-600">Feito com código</span>
              </div>
            </footer>
          </motion.div>
        )}

        {currentView === 'FULL_SITE' && (
          <>
            <Navbar key="navbar" theme={theme} />
            <Hero key="hero" theme={theme} />
            <Footer key="footer" theme={theme} />
          </>
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

        {currentView === 'PROJECTS' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            <Navbar key="navbar" theme={theme} />
            <div className="flex-1 p-8">
              <div className="max-w-6xl mx-auto mt-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Projetos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.length > 0 ? projects.map((project, index) => (
                    <motion.div
                      key={project}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 hover:scale-105 transition-transform`}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {project}
                      </h3>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Descrição do projeto em desenvolvimento...
                      </p>
                    </motion.div>
                  )) : (
                    <div className="col-span-3 text-center py-12">
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Carregando projetos...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Footer key="footer" theme={theme} />
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
            {projects.length > 0 && (
              <div id="projetos" className={`py-16 px-8 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="max-w-6xl mx-auto">
                  <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Projetos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 hover:scale-105 transition-transform`}
                      >
                        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {project}
                        </h3>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          Descrição do projeto em desenvolvimento...
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
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
