import { motion, useInView } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useRef } from 'react'
import ScrambleText from './ScrambleText'

export default function Experience({ theme = 'light', hasCodeLens = false }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const experiences = [
    {
      company: 'Kairoo Tech',
      role: 'Co-Founder',
      period: 'Nov 2025 - Presente',
      description: 'Consultoria em automações e desenvolvimento web estratégico.',
      logo: '🏢'
    },
    {
      company: 'Humanizadas',
      role: 'Tech Lead',
      period: 'Jun 2025 - Presente',
      description: 'Foco em IA e Inovação.',
      logo: '🚀'
    },
    {
      company: 'BeUni',
      role: 'Software Engineer',
      period: 'Fev 2024 - Jun 2025',
      description: 'Plataforma de brindes corporativos.',
      logo: '🎁'
    },
    {
      company: 'Videomatik',
      role: 'Software Engineer',
      period: 'Nov 2023 - Fev 2024',
      description: 'Engenharia de software completa, análise de requisitos e gestão de projetos.',
      logo: '🎬'
    },
    {
      company: 'The Brooklyn Brothers',
      role: 'Webmaster',
      period: 'Ago 2022 - Out 2023',
      description: 'Desenvolvimento e manutenção de websites.',
      logo: '🌆'
    }
  ]

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`py-20 px-8 ${isDark ? 'bg-slate-950' : 'bg-white'}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {hasCodeLens ? <ScrambleText text="EXPERIÊNCIA" duration={1500} /> : 'Experiência'}
        </h2>
        
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`absolute left-8 top-0 bottom-0 w-0.5 origin-top ${isDark ? 'bg-purple-500/30' : 'bg-purple-200'}`}
          />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -15 }}
                transition={{ 
                  delay: 0.5 + index * 0.15,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100
                }}
                style={{ perspective: 1000 }}
                className="relative pl-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.6 + index * 0.15, type: 'spring', stiffness: 200 }}
                  className={`absolute left-6 top-2 w-4 h-4 rounded-full ${isDark ? 'bg-purple-500' : 'bg-purple-600'} border-4 ${isDark ? 'border-slate-950' : 'border-white'}`}
                />
                
                <motion.div
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`${isDark ? 'bg-white/5 backdrop-blur-lg border border-white/10' : 'bg-gray-50 border border-gray-200'} rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`text-3xl ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-lg p-3`}>
                      {exp.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {exp.role}
                      </h3>
                      <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <Calendar size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          {exp.period}
                        </span>
                      </div>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
