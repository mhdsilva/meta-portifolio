import { motion } from 'framer-motion'
import { Code, Database, Cloud, Users } from 'lucide-react'

export default function TechStack({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  const categories = [
    {
      icon: Code,
      title: 'Frontend',
      skills: ['ReactJS', 'NextJS', 'TypeScript'],
      color: 'blue'
    },
    {
      icon: Code,
      title: 'Backend',
      skills: ['NestJS', 'NodeJS', 'Python'],
      color: 'green'
    },
    {
      icon: Database,
      title: 'Banco de Dados',
      skills: ['PostgreSQL', 'MongoDB', 'SQL'],
      color: 'purple'
    },
    {
      icon: Cloud,
      title: 'DevOps/Cloud',
      skills: ['Docker', 'AWS', 'Oracle Cloud'],
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Soft Skills',
      skills: ['Liderança', 'Comunicação', 'Oratória'],
      color: 'pink'
    }
  ]

  const colorClasses = {
    blue: {
      bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      border: isDark ? 'border-blue-500/30' : 'border-blue-300'
    },
    green: {
      bg: isDark ? 'bg-green-500/20' : 'bg-green-100',
      text: isDark ? 'text-green-400' : 'text-green-600',
      border: isDark ? 'border-green-500/30' : 'border-green-300'
    },
    purple: {
      bg: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      text: isDark ? 'text-purple-400' : 'text-purple-600',
      border: isDark ? 'border-purple-500/30' : 'border-purple-300'
    },
    orange: {
      bg: isDark ? 'bg-orange-500/20' : 'bg-orange-100',
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      border: isDark ? 'border-orange-500/30' : 'border-orange-300'
    },
    pink: {
      bg: isDark ? 'bg-pink-500/20' : 'bg-pink-100',
      text: isDark ? 'text-pink-400' : 'text-pink-600',
      border: isDark ? 'border-pink-500/30' : 'border-pink-300'
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      className={`py-20 px-8 ${isDark ? 'bg-slate-950' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Tech Stack
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            const colors = colorClasses[category.color]
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${isDark ? 'bg-white/5 backdrop-blur-lg border border-white/10' : 'bg-gray-50 border border-gray-200'} rounded-2xl p-6 hover:border-purple-500/50 transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon size={24} className={colors.text} />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 + skillIndex * 0.05 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
