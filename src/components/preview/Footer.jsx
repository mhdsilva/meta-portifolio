// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { Linkedin, Mail, Phone, Heart } from 'lucide-react'
import { useRef } from 'react'

export default function Footer({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`py-12 px-8 border-t ${isDark ? 'bg-slate-950 border-white/10' : 'bg-white border-gray-200'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Contato
            </h3>
            <div className="space-y-3">
              <motion.a
                href="mailto:matheushenrique2773@gmail.com"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className={`flex items-center gap-3 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
              >
                <Mail size={18} />
                <span>matheushenrique2773@gmail.com</span>
              </motion.a>
              <motion.a
                href="tel:+5534998147021"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className={`flex items-center gap-3 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
              >
                <Phone size={18} />
                <span>(34) 99814-7021</span>
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Social
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="https://linkedin.com/in/matheushenrique2773"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 text-purple-400' : 'bg-gray-100 hover:bg-gray-200 text-purple-600'} transition-colors`}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Matheus Henrique
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Tech Lead & Software Engineer
            </p>
          </div>
        </div>

        <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>© 2026 Matheus Henrique</span>
          </div>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Feito com</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart size={16} className="text-red-500 fill-red-500" />
            </motion.div>
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>e código</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
