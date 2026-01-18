import { useReducer, useEffect, useRef, useCallback } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './preview/Navbar'
import Hero from './preview/Hero'
import Footer from './preview/Footer'
import About from './preview/About'
import Experience from './preview/Experience'
import TechStack from './preview/TechStack'
import CodeLensWrapper, { CodeLensProvider } from './preview/CodeLensWrapper'
import { codeSnippets } from '../data/codeSnippets'

const initialState = {
  currentView: 'INITIAL',
  theme: 'light',
  showError: false,
  isFixed: false,
  isStyled: false,
  hasAbout: false,
  hasExperienceSkills: false,
  isCrashed: false,
  hasCodeLens: false
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
      return { ...state, isStyled: true, theme: 'dark' }
    case 'SET_VIEW':
      return { ...state, currentView: 'STYLED_SITE' }
    case 'ADD_ABOUT':
      return { ...state, hasAbout: true }
    case 'ADD_EXPERIENCE_SKILLS':
      return { ...state, hasExperienceSkills: true }
    case 'TRIGGER_CRASH':
      return { ...state, isCrashed: true, showError: true, isFixed: false }
    case 'FIX_CRASH':
      return { ...state, isFixed: true, isCrashed: false, hasCodeLens: true }
    case 'HIDE_ERROR':
      return { ...state, showError: false }
    case 'FINAL_VIEW':
      return {
        ...state,
        currentView: 'FINAL',
        isStyled: true,
        hasAbout: true,
        hasExperienceSkills: true,
        hasCodeLens: true
      }
    default:
      return state
  }
}

export default function Preview({ action, payload }) {
  const [state, dispatch] = useReducer(previewReducer, initialState)
  const timeoutRef = useRef(null)
  const containerRef = useRef(null)
  const scrolledSectionsRef = useRef({ about: false, experience: false })

  const { currentView, theme, showError, isFixed, isStyled, hasAbout, hasExperienceSkills, isCrashed, hasCodeLens } = state

  // Scroll automático unificado para novas seções
  const scrollToSection = useCallback((sectionId, sectionKey) => {
    if (scrolledSectionsRef.current[sectionKey] || !containerRef.current) return
    
    scrolledSectionsRef.current[sectionKey] = true
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element && containerRef.current) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + containerRef.current.scrollTop
        containerRef.current.scrollTo({
          top: elementPosition - navbarHeight - 20,
          behavior: 'smooth'
        })
      }
    }, 500)
  }, [])

  // Reset scroll refs quando seções são removidas
  useEffect(() => {
    if (!hasAbout) scrolledSectionsRef.current.about = false
    if (!hasExperienceSkills) scrolledSectionsRef.current.experience = false
  }, [hasAbout, hasExperienceSkills])

  // Scroll automático ao adicionar seções
  useEffect(() => {
    if (hasAbout) scrollToSection('sobre', 'about')
  }, [hasAbout, scrollToSection])

  useEffect(() => {
    if (hasExperienceSkills) scrollToSection('experiencia', 'experience')
  }, [hasExperienceSkills, scrollToSection])

  // Processar ações
  useEffect(() => {
    if (!action) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    dispatch({ type: action })

    if (action === 'APPLY_STYLES') {
      timeoutRef.current = setTimeout(() => dispatch({ type: 'SET_VIEW' }), 100)
    } else if (action === 'FIX_CRASH') {
      timeoutRef.current = setTimeout(() => dispatch({ type: 'HIDE_ERROR' }), 2000)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [action, payload])

  const getBackgroundColor = () => 
    (theme === 'dark' || theme === 'cyber') ? 'bg-gray-900' : 'bg-white'

  const crashStyle = isCrashed 
    ? { filter: 'blur(10px) contrast(200%) grayscale(100%)', transition: 'filter 0.5s ease-in-out' }
    : { filter: 'none', transition: 'filter 1s ease-in-out' }

  // Função unificada para renderizar o site estilizado
  const renderSite = (isFinal = false) => (
    <motion.div
      key={isFinal ? 'final' : 'styled-site'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={isFinal ? undefined : { duration: 1 }}
      className="flex flex-col min-h-full"
    >
      <CodeLensWrapper code={codeSnippets.navbar} filename="Navbar.jsx">
        <Navbar theme={theme} />
      </CodeLensWrapper>
      
      <CodeLensWrapper code={codeSnippets.hero} filename="Hero.jsx">
        <Hero theme={theme} />
      </CodeLensWrapper>
      
      {hasAbout && (
        <div id="sobre">
          <CodeLensWrapper code={codeSnippets.about} filename="About.jsx">
            <About theme={theme} />
          </CodeLensWrapper>
        </div>
      )}
      
      {hasExperienceSkills && (
        <>
          <div id="experiencia">
            <CodeLensWrapper code={codeSnippets.experience} filename="Experience.jsx">
              <Experience theme={theme} />
            </CodeLensWrapper>
          </div>
          <div id="tech-stack">
            <CodeLensWrapper code={codeSnippets.techstack} filename="TechStack.jsx">
              <TechStack theme={theme} />
            </CodeLensWrapper>
          </div>
        </>
      )}
      
      <div id={isFinal ? 'contato' : undefined}>
        <CodeLensWrapper code={codeSnippets.footer} filename="Footer.jsx">
          <Footer theme={theme} />
        </CodeLensWrapper>
      </div>
    </motion.div>
  )

  return (
    <>
      <CodeLensProvider isActive={hasCodeLens && !showError}>
        <div 
          ref={containerRef}
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

            {(currentView === 'STYLED_SITE' || (isStyled && currentView !== 'FINAL')) && renderSite(false)}

            {currentView === 'FINAL' && renderSite(true)}
          </AnimatePresence>
        </div>
      </CodeLensProvider>

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
                  <br />
                  ✓ Code Lens feature enabled - hover to see the source!
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
