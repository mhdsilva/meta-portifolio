import { useState, useRef, useCallback } from 'react'
import storyTimeline from '../data/story'

export default function useStorytelling() {
  const [messages, setMessages] = useState([])
  const [currentAction, setCurrentAction] = useState(null)
  const [currentPayload, setCurrentPayload] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  const currentIndexRef = useRef(-1)
  const timeoutsRef = useRef([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const processStep = useCallback((step) => {
    setMessages(prev => [...prev, step])
    setCurrentAction(step.action || null)
    setCurrentPayload(step.payload || null)

    if (step.action === 'SHOW_INTERACTION') {
      setIsPaused(true)
    }

    const timeout = setTimeout(() => {
      nextStep()
    }, step.delay)
    timeoutsRef.current.push(timeout)
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
      setTimeout(() => {
        setIsTyping(false)
        processStep(step)
      }, 1000)
    } else {
      processStep(step)
    }
  }, [processStep])

  const startStory = useCallback(() => {
    clearTimeouts()
    currentIndexRef.current = -1
    setMessages([])
    setCurrentAction(null)
    setCurrentPayload(null)
    setIsPaused(false)
    setIsTyping(false)
    nextStep()
  }, [nextStep])

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
    nextStep()
  }, [isPaused, nextStep])

  const resetStory = useCallback(() => {
    clearTimeouts()
    currentIndexRef.current = -1
    setMessages([])
    setCurrentAction(null)
    setCurrentPayload(null)
    setIsPaused(false)
    setIsTyping(false)
  }, [])

  return {
    messages,
    currentAction,
    currentPayload,
    isTyping,
    isPaused,
    startStory,
    handleInteraction,
    resetStory,
    totalSteps: storyTimeline.length
  }
}
