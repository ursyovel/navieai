import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useChat, Message } from '../../contexts/ChatContext';
import { motion } from 'framer-motion';

const ChatInterface: React.FC = () => {
  const { currentSession, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Here you would implement actual voice recognition
    // For now, we'll just simulate it with a timeout
    if (!isListening) {
      setTimeout(() => {
        setInput(prev => prev + "Voice input would appear here... ");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {currentSession?.messages && currentSession.messages.length > 0 ? (
            currentSession.messages.map((message: Message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">N</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Welcome to Navie AI
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  A simple chatbot designed to help with a wide range of topics. Start a conversation below!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"
              >
                {["What can you help me with?", "Tell me about yourself", "How does this work?", "What's the weather today?"].map((suggestion, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      setInput(suggestion);
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-3 bg-transparent text-gray-700 dark:text-gray-200 resize-none focus:outline-none"
              placeholder="Type your message..."
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="flex items-center p-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleVoiceInput}
                className={`p-2 rounded-full ${isListening ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-700 dark:hover:text-gray-200`}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className={`p-2 rounded-full ${input.trim() ? 'text-purple-600 hover:text-purple-700' : 'text-gray-400'}`}
                aria-label="Send message"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
          <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            Navie AI • a simple chatbot
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;