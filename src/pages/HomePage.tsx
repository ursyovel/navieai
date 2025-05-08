import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Volume2,
  Zap,
  History,
  Users,
  Brain,
  Shield,
  Star,
  Bot,
  Lock,
  Sparkles,
  Clock,
  Key,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const features = [
    {
      icon: <Key className="mb-3 h-8 w-8 text-purple-600" />,
      title: 'No login required',
      description: 'Start using Navie instantly without the need for an account or login.',
    },
    {
      icon: <Volume2 className="mb-3 h-8 w-8 text-purple-600" />,
      title: 'Voice Capability',
      description: 'Speak naturally and receive spoken responses for a hands-free experience.',
    },
    {
      icon: <History className="mb-3 h-8 w-8 text-purple-600" />,
      title: 'Chat History',
      description: 'Your conversations are saved locally, ensuring privacy while maintaining easy access to past discussions.',
    },
    {
      icon: <Zap className="mb-3 h-8 w-8 text-purple-600" />,
      title: 'Fast Responses',
      description: 'Powered by advanced AI, Navie provides quick and accurate information on a wide range of topics.',
    },
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "Device Support", label: "All Devices Friendly" },
    { icon: <Brain className="h-6 w-6" />, value: "AI", label: "Creative & Smart" },
    { icon: <Shield className="h-6 w-6" />, value: "Secure", label: "Saves Data in Browser" },
    { icon: <Star className="h-6 w-6" />, value: "Layout", label: "Simple & Clean Interface" },
  ];

  const aiCapabilities = [
    {
      icon: <Bot className="h-8 w-8 text-purple-600" />,
      title: "Advanced AI Understanding",
      description: "Powered by sophisticated natural language processing to understand context and nuance in conversations.",
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-600" />,
      title: "Private & Secure",
      description: "Your chat history is stored locally on your device, ensuring complete privacy and data security.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Continuous Learning",
      description: "Navie AI evolves and improves with each interaction, providing better responses over time.",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "24/7 Availability",
      description: "Always ready to help, whether it's day or night, weekday or weekend.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Meet Navie AI</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              A simple chatbot designed to help with everything from everyday tasks to complex questions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/chat')}
              className="px-8 py-4 bg-white text-purple-700 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Chatting
            </motion.button>
          </motion.div>

          {/* Chat preview */}
          <motion.div
            className="mt-16 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={`rounded-xl shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="p-4 border-b dark:border-gray-800">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Navie AI</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online • A Simple Chatbot</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-gray-800 dark:text-gray-200">Hi there! How can I help you today?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-purple-600 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                    <p className="text-white">Can you tell me about yourself?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-gray-800 dark:text-gray-200">
                      I'm Navie AI, a simple chatbot designed to assist you with information, tasks, and conversations.
                      I can help answer questions, remember context, and even support voice interactions.
                      What would you like to know?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center text-purple-600 mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Designed with simplicity and functionality in mind, Navie AI offers everything you need in a modern chatbot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Navie AI Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powered by advanced technology, designed for simplicity and privacy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl"
              >
                <div className="mb-4">{capability.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{capability.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-700 dark:text-gray-300">
          <p>
            Navie AI · Made by{' '}
            <button
              onClick={() => window.open('https://yovel.vercel.app', '_blank')}
              className="text-purple-600 hover:underline transition"
            >
              Yovel
            </button>
          </p>
          <p className="mt-2">
            <button
              onClick={() => window.open('https://instagram.com/__yovel', '_blank')}
              className="text-purple-600 hover:underline transition"
            >
              Support
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
