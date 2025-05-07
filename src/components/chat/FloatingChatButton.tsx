import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const FloatingChatButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnChatPage = location.pathname === '/chat';

  const handleClick = () => {
    if (!isOnChatPage) {
      navigate('/chat');
    }
  };

  if (isOnChatPage) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        onClick={handleClick}
        className="flex justify-center items-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl focus:outline-none"
        aria-label="Open Chat"
      >
        <MessageSquare size={24} />
      </button>
    </motion.div>
  );
};

export default FloatingChatButton;