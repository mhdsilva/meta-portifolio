import { useState, useEffect, useRef, useMemo } from 'react'
import { useCodeLens } from './CodeLensContext'

export { CodeLensProvider } from './CodeLensContext'

export default function CodeLensWrapper({ children, code, filename = 'Component.jsx' }) {
  const { isActive, mousePosition } = useCodeLens()
  const containerRef = useRef(null)
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const updateBounds = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setBounds({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      })
    }

    updateBounds()
    
    const resizeObserver = new ResizeObserver(updateBounds)
    resizeObserver.observe(containerRef.current)

    window.addEventListener('scroll', updateBounds, true)
    window.addEventListener('resize', updateBounds)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', updateBounds, true)
      window.removeEventListener('resize', updateBounds)
    }
  }, [])

  const { localMouse, isHovering } = useMemo(() => {
    if (!isActive || !bounds.width) {
      return { localMouse: { x: 0, y: 0 }, isHovering: false }
    }

    const x = mousePosition.x - bounds.left
    const y = mousePosition.y - bounds.top
    const isInside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height
    
    return {
      localMouse: { x, y },
      isHovering: isInside
    }
  }, [mousePosition, bounds, isActive])

  if (!isActive) {
    return <div ref={containerRef}>{children}</div>
  }

  const maskRadius = 40

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ isolation: 'isolate' }}
    >
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
          zIndex: 1
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="h-full w-full p-8 overflow-hidden flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span 
                className="text-sm font-mono font-medium"
                style={{ color: '#00ff88' }}
              >
                {filename}
              </span>
            </div>

            <div className="overflow-auto max-h-[60vh]">
              <pre 
                className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
                style={{ 
                  color: '#00ff88',
                  textShadow: '0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.3)',
                }}
              >
                <code>{code}</code>
              </pre>
            </div>
          </div>

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)',
              mixBlendMode: 'multiply'
            }}
          />

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
            }}
          />
        </div>
      </div>

      <div 
        className="relative"
        style={{ 
          zIndex: 2,
          WebkitMaskImage: isHovering 
            ? `radial-gradient(circle ${maskRadius}px at ${localMouse.x}px ${localMouse.y}px, transparent 0%, transparent ${maskRadius - 2}px, black ${maskRadius}px)`
            : 'none',
          maskImage: isHovering 
            ? `radial-gradient(circle ${maskRadius}px at ${localMouse.x}px ${localMouse.y}px, transparent 0%, transparent ${maskRadius - 2}px, black ${maskRadius}px)`
            : 'none'
        }}
      >
        {children}
      </div>

      {isHovering && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: localMouse.x - maskRadius,
            top: localMouse.y - maskRadius,
            width: maskRadius * 2,
            height: maskRadius * 2,
            borderRadius: '50%',
            border: '2px solid rgba(0, 255, 136, 0.7)',
            boxShadow: `
              0 0 20px rgba(0, 255, 136, 0.5),
              0 0 40px rgba(0, 255, 136, 0.3),
              inset 0 0 20px rgba(0, 255, 136, 0.2)
            `,
            zIndex: 10
          }}
        />
      )}
    </div>
  )
}
