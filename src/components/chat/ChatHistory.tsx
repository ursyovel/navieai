import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useChat, ChatSession } from '../../contexts/ChatContext';
import { motion } from 'framer-motion';

const ChatHistory: React.FC = () => {
  const { chatHistory, currentSession, startNewChat, selectChatSession, clearHistory } = useChat();

  const getSessionTitle = (session: ChatSession) => {
    if (session.messages.length === 0) {
      return 'New Chat';
    }
    
    // Use the first user message as the title, if available
    const firstUserMessage = session.messages.find(m => m.sender === 'user');
    if (firstUserMessage) {
      // Truncate long messages
      const title = firstUserMessage.content;
      return title.length > 25 ? title.substring(0, 25) + '...' : title;
    }
    
    // Fallback to default title
    return `Chat ${session.id.substring(0, 5)}`;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="p-4 border-b dark:border-gray-800">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startNewChat}
          className="w-full flex items-center justify-center p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus size={18} className="mr-2" />
          New Chat
        </motion.button>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {chatHistory.length > 0 ? (
          <ul className="p-2 space-y-1">
            {chatHistory.map((session) => (
              <motion.li 
                key={session.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={() => selectChatSession(session.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSession?.id === session.id
                      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="text-sm font-medium truncate">{getSessionTitle(session)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(session.updatedAt).toLocaleDateString()} • {session.messages.length} messages
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No chat history yet
          </div>
        )}
      </div>
      
      {chatHistory.length > 0 && (
        <div className="p-3 border-t dark:border-gray-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearHistory}
            className="w-full flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="mr-2" />
            Clear History
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
