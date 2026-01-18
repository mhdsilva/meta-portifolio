import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Chat from './components/Chat'
import Preview from './components/Preview'
import useStorytelling from './hooks/useStorytelling'

function App() {
  const {
    messages,
    currentAction,
    currentPayload,
    isTyping,
    isPaused,
    startStory,
    handleInteraction,
    resetStory
  } = useStorytelling()

  useEffect(() => {
    startStory()
  }, [])

  useEffect(() => {
    if (currentAction === 'SHOW_INTERACTION') {
      const interactionDiv = document.getElementById('interaction-area')
      if (interactionDiv) {
        interactionDiv.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [currentAction])

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Chat
        messages={messages}
        isTyping={isTyping}
        onInteraction={handleInteraction}
        isPaused={isPaused}
        interactionOptions={currentAction === 'SHOW_INTERACTION' ? currentPayload?.options : null}
      />
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        className="flex-1 bg-gray-800 flex flex-col"
      >
        <div className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm font-mono">localhost:3000</span>
          <div className="flex items-center gap-2">
            <button
              onClick={resetStory}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <Preview 
            action={currentAction} 
            payload={currentPayload}
            isPaused={isPaused}
            onSelect={handleInteraction}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default App
