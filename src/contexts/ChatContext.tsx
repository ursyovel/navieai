import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  currentSession: ChatSession | null;
  chatHistory: ChatSession[];
  sendMessage: (content: string) => void;
  startNewChat: () => void;
  selectChatSession: (sessionId: string) => void;
  clearHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentSession && chatHistory.length === 0) {
      startNewChat();
    } else if (!currentSession && chatHistory.length > 0) {
      setCurrentSession(chatHistory[0]);
    }
  }, [currentSession, chatHistory]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const generateResponse = (userMessage: string): string => {
    const responses = [
      "I'm Navie AI, a simple chatbot. How can I help you today?",
      "That's an interesting question. Let me think about that...",
      "I'm here to assist with any information you need.",
      "Thanks for sharing! Is there anything specific you'd like to know?",
      "I'm still learning, but I'll do my best to help you with that.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = (content: string) => {
    if (!currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date(),
    };

    setCurrentSession(updatedSession);

    setChatHistory(prev =>
      prev.map(session =>
        session.id === updatedSession.id ? updatedSession : session
      )
    );

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };

      const sessionWithResponse: ChatSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiResponse],
        updatedAt: new Date(),
      };

      setCurrentSession(sessionWithResponse);
      setChatHistory(prev =>
        prev.map(session =>
          session.id === sessionWithResponse.id ? sessionWithResponse : session
        )
      );
    }, 1000);
  };

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${chatHistory.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCurrentSession(newSession);
    setChatHistory(prev => [newSession, ...prev]);
  };

  const selectChatSession = (sessionId: string) => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const confirmClearHistory = () => {
    setChatHistory([]);
    setCurrentSession(null);
    localStorage.removeItem('chatHistory');
    setShowModal(false);
    setTimeout(() => {
      startNewChat();
    }, 0);
  };

  const clearHistory = () => {
    setShowModal(true);
  };

  return (
    <ChatContext.Provider
      value={{
        currentSession,
        chatHistory,
        sendMessage,
        startNewChat,
        selectChatSession,
        clearHistory,
      }}
    >
      {children}

      {/* Confirmation Modal */}
      {showModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Clear Chat History?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete all chat history? This cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1 text-sm bg-gray-300 hover:bg-gray-400 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearHistory}
                  className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
