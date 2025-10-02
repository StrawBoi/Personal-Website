import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalLanding = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const terminalLines = [
    "user@localhost:~$ whoami",
    "Full-Stack Developer | Problem Solver | Business Strategist",
    "",
    "user@localhost:~$ cat career-journey.txt",
    "# My Journey: From Chaos to Solutions",
    "",
    "## Customer Success Era (2011-2015)",
    "-> Mastered the art of understanding business pain points",
    "-> Developed empathy-driven problem solving approach",
    "-> Achieved 40% improvement in customer satisfaction",
    "",
    "## Development Phase (2015-2023)", 
    "-> Translated business needs into technical solutions",
    "-> Built scalable systems serving 1M+ users",
    "-> Led cross-functional development teams",
    "",
    "## Strategic Evolution (2023-Present)",
    "-> Bridging technology and business strategy", 
    "-> Combining technical expertise with market insights",
    "-> Creating comprehensive solutions for complex challenges",
    "",
    "user@localhost:~$ npm run build-portfolio",
    "",
    "Building comprehensive solution framework...",
    "Initializing problem-solving algorithms...",
    "Connecting customer insights with technical execution...",
    "Optimizing for maximum business impact...",
  ];

  const loadingMessages = [
    "Analyzing market requirements...",
    "Compiling technical solutions...", 
    "Integrating customer feedback loops...",
    "Optimizing business outcomes...",
    "Connecting the dots...",
    "Bringing structure to disorder...",
    "Portfolio build complete!"
  ];

  // Terminal typing animation
  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const typeInterval = setInterval(() => {
      const currentLineText = terminalLines[currentLine];
      if (currentChar < currentLineText.length) {
        setCurrentChar(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, 200);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentLine, currentChar, terminalLines]);

  // Start loading after typing completes
  useEffect(() => {
    if (currentLine >= terminalLines.length && loadingProgress === 0) {
      setTimeout(() => {
        startLoadingAnimation();
      }, 1000);
    }
  }, [currentLine, loadingProgress]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const startLoadingAnimation = () => {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(progress);
        clearInterval(loadingInterval);
        setTimeout(() => {
          setIsComplete(true);
        }, 1500);
      } else {
        setLoadingProgress(progress);
      }
    }, 300);
  };

  const getCurrentLoadingMessage = () => {
    const messageIndex = Math.floor((loadingProgress / 100) * (loadingMessages.length - 1));
    return loadingMessages[messageIndex] || loadingMessages[0];
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-green-400 font-mono overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm">Terminal - developer@portfolio-system</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-full flex flex-col" style={{fontFamily: '"Fira Code", "Courier New", monospace'}}>
        {/* Terminal Output */}
        <div className="flex-1 space-y-1 text-sm leading-relaxed">
          {terminalLines.slice(0, currentLine + 1).map((line, index) => {
            const isCurrentLine = index === currentLine;
            const displayText = isCurrentLine ? line.substring(0, currentChar) : line;
            const showCursorHere = isCurrentLine && showCursor && currentChar <= line.length;
            
            return (
              <div key={index} className="flex items-start">
                <span className={`${line.startsWith('user@') ? 'text-cyan-400' : 
                  line.startsWith('#') ? 'text-yellow-300 font-bold' : 
                  line.startsWith('##') ? 'text-blue-300 font-semibold' : 
                  line.startsWith('->') ? 'text-green-300' : 
                  line.includes('npm run') ? 'text-purple-300' : 
                  'text-green-400'}`}>
                  {displayText}
                  {showCursorHere && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="bg-green-400 text-black"
                    >
                      █
                    </motion.span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Loading Section */}
        {currentLine >= terminalLines.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4 border-t border-gray-700 pt-4"
          >
            <div className="text-cyan-300 text-sm">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {getCurrentLoadingMessage()}
              </motion.span>
            </div>
            
            <div className="space-y-2">
              <div className="w-full bg-gray-800 rounded-sm h-4 overflow-hidden border border-gray-600">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>[{Math.floor(loadingProgress)}%] Progress</span>
                <span>Connecting the dots • Bringing structure to disorder</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Ready Message */}
        {loadingProgress === 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-green-300 text-sm"
          >
            <div>✓ System optimization complete</div>
            <div>✓ Portfolio framework initialized</div>
            <div>✓ Ready for deployment</div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute bottom-6 right-6 space-y-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            {/* Enter Portfolio Button */}
            <motion.button
              onClick={onComplete}
              className="block w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-green-400 shadow-lg font-mono text-sm transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <span>ENTER PORTFOLIO</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  &gt;&gt;
                </motion.span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TerminalLanding;