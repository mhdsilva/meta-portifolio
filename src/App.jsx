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

  const isFullscreen = messages.length === 0
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileChatExpanded, setIsMobileChatExpanded] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    startStory()
  }, [startStory])

  if (isMobile && !isFullscreen) {
    return (
      <div className="relative h-[100dvh] w-screen overflow-hidden flex flex-col">
        <motion.div
          className="w-full overflow-hidden"
          animate={{ 
            height: isMobileChatExpanded ? '45%' : '85%' 
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <Preview 
            action={currentAction} 
            payload={currentPayload}
          />
        </motion.div>

        <Chat
          messages={messages}
          isTyping={isTyping}
          onInteraction={handleInteraction}
          isPaused={isPaused}
          interactionOptions={null}
          isOpen={true}
          onToggle={() => setIsMobileChatExpanded(!isMobileChatExpanded)}
          onReset={resetStory}
          isUserTypingInInput={isUserTypingInInput}
          userInputText={userInputText}
          isFullscreen={false}
          isMobile={true}
          isMobileExpanded={isMobileChatExpanded}
        />
      </div>
    )
  }

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
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

      <Chat
        messages={messages}
        isTyping={isTyping}
        onInteraction={handleInteraction}
        isPaused={isPaused}
        interactionOptions={null}
        isOpen={isFullscreen ? true : isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onReset={resetStory}
        isUserTypingInInput={isUserTypingInInput}
        userInputText={userInputText}
        isFullscreen={isFullscreen}
        isMobile={false}
        isMobileExpanded={true}
      />
    </div>
  )
}

export default App
