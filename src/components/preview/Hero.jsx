import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Linkedin, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

export default function Hero({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={`min-h-[100dvh] flex items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: isDark
            ? [
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)'
              ]
            : [
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
              ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            className={`text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Matheus Henrique da Silva
          </motion.h1>
          <motion.p
            className={`text-base sm:text-xl md:text-2xl mb-3 sm:mb-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Tech Lead @ Humanizadas | Arquitetura de Soluções & Inovação
          </motion.p>
          <motion.p
            className={`text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Engenheiro de Software movido pelo desafio de conectar gestão de produtos e código de alta performance. 
            Especialista em levar produtos da concepção ao lançamento.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projetos"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ perspective: 1000 }}
            className={`flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all relative overflow-hidden ${
              isDark
                ? 'bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:border-purple-500/50 hover:bg-white/15'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Ver Projetos
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </span>
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/matheushenrique2773"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              isDark
                ? 'bg-white/5 backdrop-blur-lg text-white border border-white/10 hover:border-blue-500/50 hover:bg-white/10'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            <Linkedin size={18} className="sm:w-5 sm:h-5" />
            LinkedIn
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
