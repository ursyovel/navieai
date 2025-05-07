import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatInterface from '../components/chat/ChatInterface';
import ChatHistory from '../components/chat/ChatHistory';
import { motion } from 'framer-motion';

const ChatPage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar - Chat History */}
      <motion.div 
        className="hidden md:block w-80 flex-shrink-0"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: showSidebar ? 0 : -80, opacity: showSidebar ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChatHistory />
      </motion.div>
      
      {/* Mobile sidebar */}
      {showSidebar && (
        <motion.div 
          className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowSidebar(false)}
        >
          <motion.div 
            className="absolute top-0 left-0 h-full w-72 bg-white dark:bg-gray-900"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ChatHistory />
          </motion.div>
        </motion.div>
      )}
      
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col relative">
        {/* Toggle sidebar button for mobile */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden absolute top-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
          aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
        >
          {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {/* Toggle sidebar button for desktop */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="hidden md:block absolute top-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
          aria-label={showSidebar ? "Hide history" : "Show history"}
        >
          {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;