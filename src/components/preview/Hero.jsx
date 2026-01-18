import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`flex-1 flex items-center justify-center p-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-950' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Meta-Developer
        </motion.h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Construindo experiências digitais inovadoras com código e criatividade
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <Github size={24} className={`cursor-pointer transition-colors hover:text-blue-400 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <Linkedin size={24} className={`cursor-pointer transition-colors hover:text-blue-400 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <Mail size={24} className={`cursor-pointer transition-colors hover:text-blue-400 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Projetos
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.section>
  )
}
