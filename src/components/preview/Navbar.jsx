import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Menu } from 'lucide-react'
import { useRef } from 'react'

export default function Navbar({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    [isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)', isDark ? 'rgba(2, 6, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)']
  )
  
  return (
    <motion.nav
      ref={ref}
      style={{ backgroundColor }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-6 backdrop-blur-lg text-white border-b ${
        isDark 
          ? 'border-white/10' 
          : 'border-gray-200'
      }`}
    >
      <motion.div 
        className="flex items-center gap-1.5 sm:gap-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Code2 size={20} className={`sm:w-6 sm:h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        </motion.div>
        <span className={`text-sm sm:text-xl font-bold truncate max-w-[150px] sm:max-w-none ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Matheus Henrique</span>
      </motion.div>
      <div className="hidden md:flex gap-8">
        {['Sobre', 'Experiência', 'Tech Stack', 'Projetos', 'Contato'].map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ 
              y: -2,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className={`hover:text-purple-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {item}
          </motion.a>
        ))}
      </div>
      <Menu className={`md:hidden ${isDark ? 'text-white' : 'text-gray-900'}`} size={20} />
    </motion.nav>
  )
}
