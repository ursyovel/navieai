import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Sparkles, MessageSquare } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  onExternalLinkClick: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExternalLinkClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                  Navie AI
                </span>
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Beta
                </span>
              </motion.div>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => (window.location.href = 'https://navieai.vercel.app/')}
  className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
>
  Home
</motion.button>

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => (window.location.href = 'https://navieai.vercel.app/#features')}
  className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
>
  Features
</motion.button>


            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">


              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onExternalLinkClick("https://yovel.vercel.app")}
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Sparkles size={16} className="mr-1" />
                From the Creator
              </motion.button>
            </div>
          </div>
          
          {/* Desktop right items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
            <Link
              to="/chat"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <MessageSquare size={16} className="mr-2" />
              Chat Now
            </Link>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
      >
        <div className="pt-2 pb-3 space-y-1">
          <button
            onClick={() => {
              onExternalLinkClick("https://navieai.vercel.app/");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection('features');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Features
          </button>
          <Link
            to="/chat"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Chat Now
          </Link>
          <button 
            onClick={() => {
              onExternalLinkClick("https://yovel.vercel.app");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex items-center">
              <Sparkles size={16} className="mr-2" />
              From the Creator
            </div>
          </button>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Theme</p>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
