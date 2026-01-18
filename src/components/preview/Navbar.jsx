import { motion } from 'framer-motion'
import { Code2, Menu } from 'lucide-react'

export default function Navbar({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between p-4 ${
        isDark 
          ? 'bg-gray-900/80 backdrop-blur-md text-white border-b border-gray-800' 
          : 'bg-white/80 backdrop-blur-md text-gray-900 border-b border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Code2 size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
        <span className="text-xl font-bold">DevPortfolio</span>
      </div>
      <div className="hidden md:flex gap-6">
        <a href="#" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Início</a>
        <a href="#" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Projetos</a>
        <a href="#" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sobre</a>
        <a href="#" className={`hover:text-blue-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Contato</a>
      </div>
      <Menu className="md:hidden" size={24} />
    </motion.nav>
  )
}
