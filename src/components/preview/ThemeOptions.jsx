import { motion } from 'framer-motion'
import { Palette, Sparkles, Zap } from 'lucide-react'

export default function ThemeOptions({ onSelect }) {
  const themes = [
    {
      id: 'MINIMAL',
      name: 'Minimalista (Clean)',
      icon: Zap,
      colors: 'from-gray-100 to-white'
    },
    {
      id: 'CYBER',
      name: 'Cyberpunk (Neon)',
      icon: Sparkles,
      colors: 'from-gray-900 to-purple-900'
    },
    {
      id: 'RUSTIC',
      name: 'Vibe Roça (Rústico)',
      icon: Palette,
      colors: 'from-amber-100 to-orange-100'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-full p-8 bg-gray-100"
    >
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Escolha o seu tema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(theme.name)}
              className="relative group"
            >
              <div className={`h-48 rounded-lg bg-gradient-to-br ${theme.colors} p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:shadow-2xl`}>
                <theme.icon size={48} className="text-gray-700" />
                <h3 className="text-xl font-bold text-center text-gray-800">{theme.name}</h3>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-semibold">Selecionar</span>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
