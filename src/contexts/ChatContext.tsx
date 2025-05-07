import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Initialize a session if none exists
  useEffect(() => {
    if (!currentSession && chatHistory.length === 0) {
      startNewChat();
    } else if (!currentSession && chatHistory.length > 0) {
      setCurrentSession(chatHistory[0]);
    }
  }, [currentSession, chatHistory]);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const generateResponse = (userMessage: string): string => {
    // In a real implementation, this would call an AI API
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

    // Update current session with user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date(),
    };
    setCurrentSession(updatedSession);

    // Update chat history
    const updatedHistory = chatHistory.map(session => 
      session.id === currentSession.id ? updatedSession : session
    );
    setChatHistory(updatedHistory);

    // Generate AI response (with a small delay to simulate thinking)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };

      const sessionWithResponse = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiResponse],
        updatedAt: new Date(),
      };

      setCurrentSession(sessionWithResponse);
      setChatHistory(updatedHistory.map(session => 
        session.id === currentSession.id ? sessionWithResponse : session
      ));
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
    setChatHistory([newSession, ...chatHistory]);
  };

  const selectChatSession = (sessionId: string) => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    startNewChat();
  };

  return (
    <ChatContext.Provider 
      value={{ 
        currentSession, 
        chatHistory, 
        sendMessage, 
        startNewChat,
        selectChatSession,
        clearHistory 
      }}
    >
      {children}
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