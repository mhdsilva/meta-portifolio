import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone, Heart } from 'lucide-react'

export default function Footer({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-12 px-8 border-t ${isDark ? 'bg-slate-950 border-white/10' : 'bg-white border-gray-200'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contato */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:matheushenrique2773@gmail.com"
                className={`flex items-center gap-3 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
              >
                <Mail size={18} />
                <span>matheushenrique2773@gmail.com</span>
              </a>
              <a
                href="tel:+5534998147021"
                className={`flex items-center gap-3 ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
              >
                <Phone size={18} />
                <span>(34) 99814-7021</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Social
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="https://linkedin.com/in/matheushenrique2773"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 text-purple-400' : 'bg-gray-100 hover:bg-gray-200 text-purple-600'} transition-colors`}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>

          {/* Info */}
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
          <div className="flex items-center gap-2">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Feito com</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>e código</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
