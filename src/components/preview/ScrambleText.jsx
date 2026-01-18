import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}=/\\|~^'

export default function ScrambleText({ 
  text, 
  className = '', 
  duration = 1500,
  scrambleSpeed = 30,
  delay = 0,
  onComplete,
  ...props 
}) {
  const [displayText, setDisplayText] = useState('')
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }, [])

  const scramble = useCallback(() => {
    if (hasAnimated) return

    setIsAnimating(true)
    const textLength = text.length
    const iterations = Math.ceil(duration / scrambleSpeed)
    let currentIteration = 0

    setDisplayText(
      Array(textLength)
        .fill(0)
        .map(() => getRandomChar())
        .join('')
    )

    intervalRef.current = setInterval(() => {
      currentIteration++
      const progress = currentIteration / iterations

      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            const charProgress = index / textLength
            const revealThreshold = progress * 1.2
            
            if (charProgress < revealThreshold - 0.1) {
              return char
            } else {
              return getRandomChar()
            }
          })
          .join('')
      })

      if (currentIteration >= iterations) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setHasAnimated(true)
        setIsAnimating(false)
        onComplete?.()
      }
    }, scrambleSpeed)
  }, [text, duration, scrambleSpeed, getRandomChar, hasAnimated, onComplete])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(scramble, delay)
      } else {
        scramble()
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isInView, scramble, delay, hasAnimated])

  useEffect(() => {
    if (!isInView && !hasAnimated) {
      setDisplayText(text)
    }
  }, [text, isInView, hasAnimated])

  return (
    <span 
      ref={ref} 
      className={`font-mono ${className}`}
      style={{ 
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em',
        color: isAnimating ? '#00ff88' : 'inherit',
        textShadow: isAnimating ? '0 0 10px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 255, 136, 0.3)' : 'none',
        transition: 'color 0.3s ease, text-shadow 0.3s ease'
      }}
      {...props}
    >
      {displayText || text}
    </span>
  )
}
