import { useState, useRef, useCallback } from 'react'

export default function TiltCard({ 
  children, 
  className = '', 
  isActive = false,
  maxTilt = 15,
  glareOpacity = 0.3,
  scale = 1.02,
  ...props 
}) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1
  })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !isActive) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    const rotateY = mouseX * maxTilt
    const rotateX = -mouseY * maxTilt

    setTransform({
      rotateX,
      rotateY,
      scale
    })

    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }, [isActive, maxTilt, scale])

  const handleMouseEnter = useCallback(() => {
    if (!isActive) return
    setIsHovering(true)
  }, [isActive])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
    setGlarePosition({ x: 50, y: 50 })
  }, [])

  if (!isActive) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `
          perspective(1000px) 
          rotateX(${transform.rotateX}deg) 
          rotateY(${transform.rotateY}deg)
          scale(${transform.scale})
        `,
        transformStyle: 'preserve-3d',
        transition: isHovering 
          ? 'transform 0.1s ease-out' 
          : 'transform 0.5s ease-out',
        willChange: 'transform'
      }}
      {...props}
    >
      {children}

      <div
        className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 20
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at ${glarePosition.x}% ${glarePosition.y}%,
                rgba(255, 255, 255, ${glareOpacity}) 0%,
                rgba(255, 255, 255, ${glareOpacity * 0.5}) 20%,
                transparent 60%
              )
            `,
            mixBlendMode: 'overlay'
          }}
        />
        
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                ${45 + (glarePosition.x - 50) * 2}deg,
                rgba(255, 0, 128, 0.1) 0%,
                rgba(0, 255, 255, 0.1) 25%,
                rgba(255, 255, 0, 0.1) 50%,
                rgba(128, 0, 255, 0.1) 75%,
                rgba(255, 0, 128, 0.1) 100%
              )
            `,
            opacity: isHovering ? 0.6 : 0,
            mixBlendMode: 'color-dodge',
            transition: 'opacity 0.3s ease'
          }}
        />

        <div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: isHovering 
              ? `
                  inset 0 0 20px rgba(255, 255, 255, 0.1),
                  0 0 30px rgba(139, 92, 246, 0.3),
                  0 10px 40px rgba(0, 0, 0, 0.3)
                `
              : 'none',
            transition: 'box-shadow 0.3s ease'
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 21
        }}
      />
    </div>
  )
}
