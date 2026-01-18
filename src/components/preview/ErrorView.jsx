import { motion } from 'framer-motion'
import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react'

export default function ErrorView({ message, isFixed }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center h-full bg-red-900/20 p-8"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-lg p-6 border-2 border-red-500"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={32} />
            <div className="flex-1">
              <h3 className="text-red-400 font-bold text-xl mb-2">Erro Crítico</h3>
              <p className="text-gray-300 mb-4">{message || 'CSS Grid não está carregando corretamente no Safari'}</p>
              <div className="bg-gray-900 rounded p-4 font-mono text-sm">
                <p className="text-red-400">Error: grid-template-columns</p>
                <p className="text-gray-500">at grid.css:42:12</p>
              </div>
            </div>
          </div>
          
          {isFixed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center gap-2 text-green-400 bg-green-900/30 p-3 rounded"
            >
              <CheckCircle size={20} />
              <span>Erro corrigido! O site agora funciona em todos os browsers.</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
