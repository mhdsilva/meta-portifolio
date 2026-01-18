import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
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
    isUserTypingInInput,
    userInputText,
    startStory,
    handleInteraction,
    resetStory
  } = useStorytelling()

  // Inicia em fullscreen e muda para flutuante quando a primeira mensagem aparece
  const isFullscreen = messages.length === 0
  const [isChatOpen, setIsChatOpen] = useState(true)

  useEffect(() => {
    startStory()
  }, [startStory])

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Preview ocupa toda a tela - só aparece após primeira mensagem com fade-in suave */}
      <AnimatePresence mode="wait">
        {!isFullscreen && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Preview 
              action={currentAction} 
              payload={currentPayload}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat - fullscreen no início, flutuante depois */}
      <Chat
        messages={messages}
        isTyping={isTyping}
        onInteraction={handleInteraction}
        isPaused={isPaused}
        interactionOptions={null}
        isOpen={isFullscreen ? true : isChatOpen} // Sempre aberto em fullscreen
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onReset={resetStory}
        isUserTypingInInput={isUserTypingInInput}
        userInputText={userInputText}
        isFullscreen={isFullscreen}
      />
    </div>
  )
}

export default App
