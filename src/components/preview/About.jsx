import { motion } from 'framer-motion'

export default function About({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`py-16 px-8 ${
        isDark 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Sobre Mim
        </h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Cultivando soluções digitais com a resiliência de quem entende o valor do plantio.
          </p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Vim da roça, mas domino o código. Cada linha que escrevo é como uma semente plantada com cuidado, 
            esperando florescer em experiências que fazem diferença.
          </p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Acredito que a tecnologia deve ser acessível e útil, assim como a terra que nos alimenta. 
            Transformo problemas complexos em soluções simples e elegantes.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
