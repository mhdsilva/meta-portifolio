import { motion } from 'framer-motion'
import { Code2, Menu } from 'lucide-react'

export default function Navbar({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 ${
        isDark 
          ? 'bg-slate-950/80 backdrop-blur-lg text-white border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-lg text-gray-900 border-b border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Code2 size={24} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
        <span className="text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Matheus Henrique</span>
      </div>
      <div className="hidden md:flex gap-8">
        <a href="#sobre" className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Sobre</a>
        <a href="#experiencia" className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Experiência</a>
        <a href="#tech-stack" className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Tech Stack</a>
        <a href="#projetos" className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Projetos</a>
        <a href="#contato" className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Contato</a>
      </div>
      <Menu className="md:hidden" size={24} />
    </motion.nav>
  )
}
