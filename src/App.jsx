import { useEffect, useState } from 'react'
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

  const [isChatOpen, setIsChatOpen] = useState(true)

  useEffect(() => {
    startStory()
  }, [startStory])

  useEffect(() => {
    if (currentAction === 'SHOW_INTERACTION') {
      const interactionDiv = document.getElementById('interaction-area')
      if (interactionDiv) {
        interactionDiv.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [currentAction])

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Preview ocupa toda a tela */}
      <div className="w-full h-full">
        <Preview 
          action={currentAction} 
          payload={currentPayload}
        />
      </div>

      {/* Chat flutuante */}
          <Chat
            messages={messages}
            isTyping={isTyping}
            onInteraction={handleInteraction}
            isPaused={isPaused}
            interactionOptions={currentAction === 'SHOW_INTERACTION' ? currentPayload?.options : null}
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
            onReset={resetStory}
            isUserTypingInInput={isUserTypingInInput}
            userInputText={userInputText}
          />
    </div>
  )
}

export default App
