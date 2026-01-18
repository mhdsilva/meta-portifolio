import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Minimize2, RotateCcw } from 'lucide-react'

export default function Chat({ messages, isTyping, isPaused, interactionOptions, onInteraction, isOpen, onToggle, onReset }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, isPaused, interactionOptions])

  const handleOptionClick = (option) => {
    onInteraction(option.label)
  }

  return (
    <>
      {/* Botão flutuante quando fechado */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
          >
            <Bot size={24} className="text-white" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {messages.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat flutuante */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-green-400 animate-pulse' : isPaused ? 'bg-yellow-400' : 'bg-green-500'}`} />
                    {isTyping ? 'Digitando...' : isPaused ? 'Aguardando escolha...' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onReset}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Reset"
                >
                  <RotateCcw size={18} className="text-gray-400 hover:text-white" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Minimizar"
                >
                  <Minimize2 size={18} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id || msg.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gray-300" />}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-700 text-gray-100 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-gray-300" />
                </div>
                <div className="bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {isPaused && interactionOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-2 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-gray-300" />
                </div>
                <div id="interaction-area" className="flex-1 space-y-2">
                  {interactionOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-blue-600 text-gray-100 rounded-lg transition-colors border border-gray-600 hover:border-blue-500"
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

            <div className="p-4 border-t border-gray-800 bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled={true}
                  placeholder={isPaused ? "Selecione uma opção acima..." : "Aguardando IA..."}
                  className="flex-1 bg-gray-800 text-gray-500 px-4 py-2 rounded-lg border border-gray-700 opacity-50 cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={true}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-500 cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
