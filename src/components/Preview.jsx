import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkeletonView from './preview/SkeletonView'
import Navbar from './preview/Navbar'
import Hero from './preview/Hero'
import ErrorView from './preview/ErrorView'
import Footer from './preview/Footer'
import ThemeOptions from './preview/ThemeOptions'

export default function Preview({ action, payload, isPaused, onSelect }) {
  const [currentView, setCurrentView] = useState('INITIAL')
  const [theme, setTheme] = useState('light')
  const [showError, setShowError] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    switch (action) {
      case 'SET_VIEW':
        if (payload === 'SKELETON') {
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
      case 'TRIGGER_CRASH':
        setShowError(true)
        setIsFixed(false)
        break
      case 'FIX_CRASH':
        setIsFixed(true)
        setTimeout(() => {
          setShowError(false)
          setCurrentView('FULL_SITE')
        }, 2000)
        break
      case 'SHOW_PROJECTS':
        if (Array.isArray(payload)) {
          setProjects(payload)
          setCurrentView('PROJECTS')
        }
        break
      case 'SHOW_INTERACTION':
        setCurrentView('INTERACTION')
        break
      case 'FINAL_VIEW':
        setCurrentView('FINAL')
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

  return (
    <div className={`flex flex-col h-full transition-colors duration-500 ${getBackgroundColor()}`}>
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
            className="flex-1"
          >
            <ErrorView message="Erro crítico: Biblioteca de partículas causou overflow de memória" isFixed={isFixed} />
          </motion.div>
        )}

        {currentView === 'PROJECTS' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-8"
          >
            <Navbar key="navbar" theme={theme} />
            <div className="max-w-6xl mx-auto mt-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projetos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 dark:bg-gray-700 rounded-lg p-6 hover:scale-105 transition-transform"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{project}</h3>
                    <p className="text-gray-400">Descrição do projeto em desenvolvimento...</p>
                  </motion.div>
                ))}
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
            className="flex-1"
          >
            <Navbar key="navbar" theme={theme} />
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center p-12"
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                  🎉 Portfólio Completo!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  O site está pronto para navegação. Gostou da build?
                </p>
              </motion.div>
            </div>
            <Footer key="footer" theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
