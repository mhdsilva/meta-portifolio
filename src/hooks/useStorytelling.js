import { useState, useRef, useCallback, useEffect } from 'react'
import storyTimeline from '../data/story'

export default function useStorytelling() {
  const [messages, setMessages] = useState([])
  const [currentAction, setCurrentAction] = useState(null)
  const [currentPayload, setCurrentPayload] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isUserTypingInInput, setIsUserTypingInInput] = useState(false)
  const [userInputText, setUserInputText] = useState('')
  
  const currentIndexRef = useRef(-1)
  const timeoutsRef = useRef([])
  const intervalsRef = useRef([])
  const nextStepRef = useRef(null)

  const clearAllTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    intervalsRef.current.forEach(clearInterval)
    intervalsRef.current = []
  }, [])

  const resetState = useCallback(() => {
    clearAllTimers()
    currentIndexRef.current = -1
    setMessages([])
    setCurrentAction(null)
    setCurrentPayload(null)
    setIsPaused(false)
    setIsTyping(false)
    setIsUserTypingInInput(false)
    setUserInputText('')
  }, [clearAllTimers])

  const processStep = useCallback((step) => {
    setMessages(prev => [...prev, step])
    setCurrentAction(step.action || null)
    setCurrentPayload(step.payload || null)

    if (step.delay > 0) {
      const timeout = setTimeout(() => {
        nextStepRef.current?.()
      }, step.delay)
      timeoutsRef.current.push(timeout)
    }
  }, [])

  const nextStep = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1
    
    if (nextIndex >= storyTimeline.length) return

    currentIndexRef.current = nextIndex
    const step = storyTimeline[nextIndex]

    if (step.sender === 'ai') {
      setIsTyping(true)
      const typingTime = Math.max(1500, step.text.length * 30)
      const timeout = setTimeout(() => {
        setIsTyping(false)
        processStep(step)
      }, typingTime)
      timeoutsRef.current.push(timeout)
    } else {
      // Simula digitação do usuário
      setIsUserTypingInInput(true)
      setUserInputText('')
      
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex < step.text.length) {
          setUserInputText(step.text.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          intervalsRef.current = intervalsRef.current.filter(i => i !== typingInterval)
          
          const timeout = setTimeout(() => {
            setIsUserTypingInInput(false)
            setUserInputText('')
            processStep(step)
          }, 500)
          timeoutsRef.current.push(timeout)
        }
      }, 30)
      intervalsRef.current.push(typingInterval)
    }
  }, [processStep])

  useEffect(() => {
    nextStepRef.current = nextStep
  }, [nextStep])

  const startStory = useCallback(() => {
    resetState()
    // Pequeno delay para garantir que o estado foi resetado
    setTimeout(() => nextStepRef.current?.(), 0)
  }, [resetState])

  const handleInteraction = useCallback((value) => {
    if (!isPaused) return

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: `Escolhi: ${value}`, delay: 0 }
    ])
    
    setIsPaused(false)
    nextStepRef.current?.()
  }, [isPaused])

  return {
    messages,
    currentAction,
    currentPayload,
    isTyping,
    isPaused,
    isUserTypingInInput,
    userInputText,
    startStory,
    handleInteraction,
    resetStory: resetState,
    totalSteps: storyTimeline.length
  }
}
