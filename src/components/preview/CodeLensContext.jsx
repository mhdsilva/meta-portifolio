import { useState, useEffect, createContext, useContext } from 'react'

// Context para compartilhar estado do CodeLens entre componentes
const CodeLensContext = createContext({
  isActive: false,
  mousePosition: { x: 0, y: 0 }
})

export function CodeLensProvider({ children, isActive }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isActive])

  return (
    <CodeLensContext.Provider value={{ isActive, mousePosition }}>
      {children}
    </CodeLensContext.Provider>
  )
}

export function useCodeLens() {
  return useContext(CodeLensContext)
}
