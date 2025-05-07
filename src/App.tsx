import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import FloatingChatButton from './components/chat/FloatingChatButton';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
            <FloatingChatButton />
          </Layout>
        </Router>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;