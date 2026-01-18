export const codeSnippets = {
  navbar: `import { motion } from 'framer-motion'
import { Code2, Menu } from 'lucide-react'

export default function Navbar({ theme }) {
  const isDark = theme === 'dark'
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 z-50 backdrop-blur-lg"
    >
      <Logo icon={<Code2 />} />
      <NavLinks items={[
        'Sobre', 'Experiência',
        'Tech Stack', 'Projetos'
      ]} />
    </motion.nav>
  )
}`,

  hero: `import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Linkedin } from 'lucide-react'

export default function Hero({ theme }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  return (
    <motion.section style={{ y }} className="min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-bold"
      >
        Matheus Henrique da Silva
      </motion.h1>
      <Badge role="Tech Lead @ Humanizadas" />
      <CTAButton href="#projetos">Ver Projetos</CTAButton>
    </motion.section>
  )
}`,

  about: `import { motion } from 'framer-motion'
import { GraduationCap, Medal, Globe } from 'lucide-react'

export default function About({ theme }) {
  return (
    <section className="py-20 px-8">
      <BentoGrid cols={3}>
        <Card type="bio" className="col-span-2">
          <p>Engenheiro de Software movido pelo desafio...</p>
        </Card>
        <Card type="education">
          <GraduationCap />
          <span>USP • CEFET-MG</span>
        </Card>
        <Card type="achievement">
          <Medal className="text-yellow-400" />
          <span>🏅 Medalha OBM</span>
        </Card>
        <Card type="languages">
          <Globe />
          <span>PT-BR • EN • ES</span>
        </Card>
      </BentoGrid>
    </section>
  )
}`,

  experience: `import { motion } from 'framer-motion'

const jobs = [
  { company: 'Humanizadas', role: 'Tech Lead', period: '2024-atual' },
  { company: 'Kairoo Tech', role: 'Full Stack Developer', period: '2023' },
  { company: 'BeUni', role: 'Frontend Developer', period: '2022' },
  // ...
]

export default function Experience({ theme }) {
  return (
    <section className="py-20">
      <h2>Experiência Profissional</h2>
      <Timeline>
        {jobs.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TimelineCard {...job} />
          </motion.div>
        ))}
      </Timeline>
    </section>
  )
}`,

  techstack: `import { motion } from 'framer-motion'
import { 
  SiReact, SiTypescript, SiNodedotjs,
  SiPython, SiPostgresql, SiDocker
} from 'react-icons/si'

const skills = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  backend: ['Node.js', 'Python', 'FastAPI', 'GraphQL'],
  database: ['PostgreSQL', 'MongoDB', 'Redis'],
  devops: ['Docker', 'AWS', 'CI/CD', 'Kubernetes']
}

export default function TechStack({ theme }) {
  return (
    <section className="py-20">
      <h2>Tech Stack</h2>
      <SkillGrid>
        {Object.entries(skills).map(([category, items]) => (
          <CategorySection key={category} title={category}>
            {items.map(skill => (
              <SkillBadge key={skill} name={skill} />
            ))}
          </CategorySection>
        ))}
      </SkillGrid>
    </section>
  )
}`,

  footer: `import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'

export default function Footer({ theme }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendEmail(formData)
  }

  return (
    <footer className="py-16 bg-gradient-to-t from-black">
      <ContactForm onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="seu@email.com" />
        <TextArea name="message" placeholder="Sua mensagem..." />
        <Button type="submit">
          <Send /> Enviar
        </Button>
      </ContactForm>
      <SocialLinks>
        <a href="https://github.com/..."><Github /></a>
        <a href="https://linkedin.com/in/..."><Linkedin /></a>
      </SocialLinks>
    </footer>
  )
}`
}

export default codeSnippets
