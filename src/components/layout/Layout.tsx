import React, { useState } from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [showExternalLinkDialog, setShowExternalLinkDialog] = useState(false);
  const [externalLink, setExternalLink] = useState('');

  const handleExternalLinkClick = (url: string) => {
    setExternalLink(url);
    setShowExternalLinkDialog(true);
  };

  const handleOpenLink = () => {
    window.open(externalLink, '_blank');
    setShowExternalLinkDialog(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen flex flex-col">
        <Navbar onExternalLinkClick={handleExternalLinkClick} />
        <main className="flex-grow">
          {children}
        </main>
        <AnimatePresence>
          {showExternalLinkDialog && (
            <motion.div 
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-11/12 max-w-md shadow-lg"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Going to external link</h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 break-all font-mono text-sm">{externalLink}</p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowExternalLinkDialog(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleOpenLink}
                    className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Open Link
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;