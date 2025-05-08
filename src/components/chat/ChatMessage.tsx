import React from 'react';
import { Message } from '../../contexts/ChatContext';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  // Format timestamp
  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isAi ? 'mr-3' : 'ml-3'}`}>
          {isAi ? (
            <img 
              src="/navie-icon.png" 
              alt="Navie AI" 
              className="h-8 w-8 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-black dark:text-white text-xs font-semibold">
                You
              </span>
            </div>
          )}
        </div>
        
        {/* Message content */}
        <div>
          <div 
            className={`px-4 py-3 rounded-xl break-words ${
              isAi 
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm' 
                : 'bg-purple-600 text-white rounded-tr-sm'
            }`}
          >
            {message.content}
          </div>
          <div className={`text-xs text-gray-500 mt-1 ${isAi ? 'text-left' : 'text-right'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
