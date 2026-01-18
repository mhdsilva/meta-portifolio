import { useState, useEffect } from 'react'
import storyTimeline from '../data/story'

function useStoryEngine() {
  const [messages, setMessages] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const nextStep = () => {
    if (currentStep < storyTimeline.length) {
      const step = storyTimeline[currentStep]
      setMessages(prev => [...prev, step])
      if (step.action) {
        return step.action
      }
      setCurrentStep(prev => prev + 1)
    }
    return null
  }

  const processStep = (step) => {
    if (step.sender === 'ai') {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setCurrentStep(prev => prev + 1)
      }, 1500)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const addMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      action: null
    }
    setMessages(prev => [...prev, newMessage])
    setCurrentStep(prev => prev + 1)
  }

  const getAction = () => {
    return storyTimeline[currentStep]?.action || null
  }

  const resetStory = () => {
    setMessages([])
    setCurrentStep(0)
    setIsTyping(false)
  }

  return {
    messages,
    currentStep,
    isTyping,
    nextStep,
    processStep,
    addMessage,
    getAction,
    resetStory,
    totalSteps: storyTimeline.length
  }
}

export default useStoryEngine
