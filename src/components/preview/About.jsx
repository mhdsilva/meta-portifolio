import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, Languages, BookOpen } from 'lucide-react'
import { useRef } from 'react'
import ScrambleText from './ScrambleText'
import TiltCard from './TiltCard'

export default function About({ theme = 'light', hasCodeLens = false }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const cards = [
    {
      icon: BookOpen,
      title: 'Bio',
      content: 'Experiência completa no ciclo de produtos, alinhando estratégia de negócios e engenharia.',
      span: 'col-span-2'
    },
    {
      icon: GraduationCap,
      title: 'Formação',
      content: 'USP - Sistemas de Informação | CEFET-MG - Técnico em Eletrônica',
      span: 'col-span-1'
    },
    {
      icon: Award,
      title: 'Destaque',
      content: 'Medalhista na Olimpíada Brasileira de Matemática',
      span: 'col-span-1'
    },
    {
      icon: Languages,
      title: 'Idiomas',
      content: 'Português (Nativo) | Inglês (Profissional)',
      span: 'col-span-2'
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
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {hasCodeLens ? <ScrambleText text="SOBRE MIM" duration={1500} /> : 'Sobre Mim'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100
                }}
                className={card.span}
              >
                <TiltCard
                  isActive={hasCodeLens}
                  maxTilt={12}
                  glareOpacity={0.25}
                  className={`${isDark ? 'bg-white/5 backdrop-blur-lg border border-white/10' : 'bg-gray-50 border border-gray-200'} rounded-2xl p-6 hover:border-purple-500/50 transition-colors cursor-pointer h-full`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {card.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {card.content}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
