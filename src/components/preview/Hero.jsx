import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, ExternalLink } from 'lucide-react'

export default function Hero({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`min-h-screen flex items-center justify-center p-8 pt-24 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className={`text-6xl md:text-7xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Matheus Henrique da Silva
          </h1>
          <p className={`text-xl md:text-2xl mb-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Tech Lead @ Humanizadas | Arquitetura de Soluções & Inovação
          </p>
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Engenheiro de Software movido pelo desafio de conectar gestão de produtos e código de alta performance. 
            Especialista em levar produtos da concepção ao lançamento.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projetos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
              isDark
                ? 'bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:border-purple-500/50 hover:bg-white/15'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Ver Projetos
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/matheushenrique2773"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
              isDark
                ? 'bg-white/5 backdrop-blur-lg text-white border border-white/10 hover:border-blue-500/50 hover:bg-white/10'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            <Linkedin size={20} />
            LinkedIn
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
