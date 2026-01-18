import { motion } from 'framer-motion'

export default function ExperienceSkills({ theme = 'light' }) {
  const isDark = theme === 'dark' || theme === 'cyber'
  
  const experiences = [
    {
      period: '2022 - Presente',
      role: 'Desenvolvedor Full Stack',
      company: 'Tech Solutions',
      description: 'Desenvolvimento de aplicações web e mobile com foco em performance e UX.'
    },
    {
      period: '2020 - 2022',
      role: 'Desenvolvedor Frontend',
      company: 'StartupXYZ',
      description: 'Criação de interfaces modernas e responsivas usando React e TypeScript.'
    }
  ]

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 
    'MongoDB', 'Docker', 'AWS', 'Git', 'Tailwind CSS'
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={`py-16 px-8 ${
        isDark 
          ? 'bg-gray-800 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Experiência */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Trajetória Profissional
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-lg border-l-4 ${
                  isDark 
                    ? 'bg-gray-900 border-blue-500' 
                    : 'bg-white border-blue-600'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {exp.role}
                  </h3>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {exp.period}
                  </span>
                </div>
                <p className={`font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {exp.company}
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Celeiro de Habilidades
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDark 
                    ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                    : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
