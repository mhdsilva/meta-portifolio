import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 border-t ${
        isDark 
          ? 'bg-gray-900 border-gray-800 text-gray-300' 
          : 'bg-white border-gray-200 text-gray-600'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>© 2026 DevPortfolio</span>
        </div>
        <div className="flex gap-4">
          <Github size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
          <Linkedin size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
          <Mail size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          <span>Feito com</span>
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span>e código</span>
        </div>
      </div>
    </motion.footer>
  )
}
