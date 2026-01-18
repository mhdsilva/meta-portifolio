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

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    intervalsRef.current.forEach(clearInterval)
    intervalsRef.current = []
  }

  const processStep = useCallback((step) => {
    setMessages(prev => [...prev, step])
    setCurrentAction(step.action || null)
    setCurrentPayload(step.payload || null)

    if (step.action === 'SHOW_INTERACTION') {
      setIsPaused(true)
    }

    if (step.delay > 0) {
      const timeout = setTimeout(() => {
        if (nextStepRef.current) {
          nextStepRef.current()
        }
      }, step.delay)
      timeoutsRef.current.push(timeout)
    }
  }, [])

  const nextStep = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1
    
    if (nextIndex >= storyTimeline.length) {
      return
    }

    currentIndexRef.current = nextIndex
    const step = storyTimeline[nextIndex]

    if (step.sender === 'ai') {
      setIsTyping(true)
      // Simula tempo de digitação baseado no tamanho da mensagem (mais natural)
      const typingTime = Math.max(1500, step.text.length * 30)
      const timeout = setTimeout(() => {
        setIsTyping(false)
        processStep(step)
      }, typingTime)
      timeoutsRef.current.push(timeout)
    } else {
      // Para mensagens do usuário, simula digitação no input primeiro
      setIsUserTypingInInput(true)
      setUserInputText('')
      
      // Simula digitação letra por letra no input
      let currentText = ''
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex < step.text.length) {
          currentText += step.text[charIndex]
          setUserInputText(currentText)
          charIndex++
        } else {
          clearInterval(typingInterval)
          // Remove o intervalo da lista
          intervalsRef.current = intervalsRef.current.filter(i => i !== typingInterval)
          // Aguarda um pouco antes de "enviar"
          const timeout = setTimeout(() => {
            setIsUserTypingInInput(false)
            setUserInputText('')
            processStep(step)
          }, 500) // Pequeno delay antes de enviar
          timeoutsRef.current.push(timeout)
        }
      }, 30) // Velocidade de digitação (30ms por caractere)
      intervalsRef.current.push(typingInterval)
    }
  }, [processStep])

  // Atualiza o ref quando nextStep muda
  useEffect(() => {
    nextStepRef.current = nextStep
  }, [nextStep])

  const startStory = useCallback(() => {
    clearTimeouts()
    currentIndexRef.current = -1
    setMessages([])
    setCurrentAction(null)
    setCurrentPayload(null)
    setIsPaused(false)
    setIsTyping(false)
    setIsUserTypingInInput(false)
    setUserInputText('')
    if (nextStepRef.current) {
      nextStepRef.current()
    }
  }, [])

  const handleInteraction = useCallback((value) => {
    if (!isPaused) return

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: `Escolhi: ${value}`,
        delay: 0
      }
    ])
    
    setIsPaused(false)
    if (nextStepRef.current) {
      nextStepRef.current()
    }
  }, [isPaused])

  const resetStory = useCallback(() => {
    clearTimeouts()
    currentIndexRef.current = -1
    setMessages([])
    setCurrentAction(null)
    setCurrentPayload(null)
    setIsPaused(false)
    setIsTyping(false)
    setIsUserTypingInInput(false)
    setUserInputText('')
  }, [])

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
    resetStory,
    totalSteps: storyTimeline.length
  }
}
