import { useReducer, useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './preview/Navbar'
import Hero from './preview/Hero'
import Footer from './preview/Footer'
import About from './preview/About'
import Experience from './preview/Experience'
import TechStack from './preview/TechStack'

const initialState = {
  currentView: 'INITIAL',
  theme: 'light',
  showError: false,
  isFixed: false,
  isStyled: false,
  hasAbout: false,
  hasExperienceSkills: false,
  isCrashed: false
}

function previewReducer(state, { type }) {
  switch (type) {
    case 'SHOW_HTML':
      return {
        ...state,
        currentView: 'HTML_VIEW',
        isStyled: false,
        hasAbout: false,
        hasExperienceSkills: false
      }
    case 'APPLY_STYLES':
      return {
        ...state,
        isStyled: true,
        theme: 'dark'
      }
    case 'SET_VIEW':
      return {
        ...state,
        currentView: 'STYLED_SITE'
      }
    case 'ADD_ABOUT':
      return {
        ...state,
        hasAbout: true
      }
    case 'ADD_EXPERIENCE_SKILLS':
      return {
        ...state,
        hasExperienceSkills: true
      }
    case 'TRIGGER_CRASH':
      return {
        ...state,
        isCrashed: true,
        showError: true,
        isFixed: false
      }
    case 'FIX_CRASH':
      return {
        ...state,
        isFixed: true,
        isCrashed: false
      }
    case 'HIDE_ERROR':
      return {
        ...state,
        showError: false
      }
    case 'FINAL_VIEW':
      return {
        ...state,
        currentView: 'FINAL',
        isStyled: true,
        hasAbout: true,
        hasExperienceSkills: true
      }
    default:
      return state
  }
}

export default function Preview({ action, payload }) {
  const [state, dispatch] = useReducer(previewReducer, initialState)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!action) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    switch (action) {
      case 'SHOW_HTML':
        dispatch({ type: 'SHOW_HTML' })
        break
      case 'APPLY_STYLES':
        dispatch({ type: 'APPLY_STYLES' })
        timeoutRef.current = setTimeout(() => {
          dispatch({ type: 'SET_VIEW' })
        }, 100)
        break
      case 'ADD_ABOUT':
        dispatch({ type: 'ADD_ABOUT' })
        break
      case 'ADD_EXPERIENCE_SKILLS':
        dispatch({ type: 'ADD_EXPERIENCE_SKILLS' })
        break
      case 'TRIGGER_CRASH':
        dispatch({ type: 'TRIGGER_CRASH' })
        break
      case 'FIX_CRASH':
        dispatch({ type: 'FIX_CRASH' })
        timeoutRef.current = setTimeout(() => {
          dispatch({ type: 'HIDE_ERROR' })
        }, 2000)
        break
      case 'SHOW_INTERACTION':
        // Não muda o preview, apenas pausa o storytelling para escolha no chat
        break
      case 'FINAL_VIEW':
        dispatch({ type: 'FINAL_VIEW' })
        break
      default:
        break
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [action, payload])

  const { currentView, theme, showError, isFixed, isStyled, hasAbout, hasExperienceSkills, isCrashed } = state

  const getBackgroundColor = () => {
    if (theme === 'dark' || theme === 'cyber') {
      return 'bg-gray-900'
    }
    return 'bg-white'
  }

  const crashStyle = isCrashed ? {
    filter: 'blur(10px) contrast(200%) grayscale(100%)',
    transition: 'filter 0.5s ease-in-out'
  } : {
    filter: 'none',
    transition: 'filter 1s ease-in-out'
  }

  return (
    <>
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

          {(currentView === 'STYLED_SITE' || (isStyled && currentView !== 'FINAL')) && (
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

      {/* Erro renderizado fora do AnimatePresence para garantir que fique sempre visível */}
      <AnimatePresence>
        {showError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border-2 border-red-500 rounded-lg p-6 max-w-2xl mx-4 shadow-2xl"
            >
              <pre className="text-red-500 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
