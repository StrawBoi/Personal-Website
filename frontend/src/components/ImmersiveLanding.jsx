import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  Code, Users, TrendingUp, AlertTriangle, Bug, Zap, 
  Target, Puzzle, Coffee, Clock, DollarSign, BarChart,
  MessageSquare, Phone, Mail, Settings, Database, Globe,
  Smartphone, Monitor, Cpu, HardDrive, Wifi, Lock
} from 'lucide-react';

const ImmersiveLanding = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef(null);

  // Terminal commands that tell the story
  const terminalLines = [
    "user@localhost:~$ whoami",
    "Full-Stack Developer | Problem Solver | Business Strategist",
    "",
    "user@localhost:~$ cat journey.txt",
    "# My Journey: From Chaos to Solutions",
    "",
    "## Customer Success Era (2011-2015)",
    "→ Learned to understand business pain points",
    "→ Developed empathy-driven problem solving",
    "→ Achieved 40% improvement in customer satisfaction",
    "",
    "## Development Phase (2015-2023)", 
    "→ Translated business needs into technical solutions",
    "→ Built scalable systems serving 1M+ users",
    "→ Led cross-functional development teams",
    "",
    "## Strategic Evolution (2023-Present)",
    "→ Bridging technology and business strategy", 
    "→ Combining technical expertise with market insights",
    "→ Creating comprehensive solutions for complex challenges",
    "",
    "user@localhost:~$ npm run build-solutions",
    "",
    "Building comprehensive portfolio...",
    "Initializing problem-solving framework...",
    "Connecting customer insights with technical execution...",
    "Optimizing for business impact...",
    "",
  ];

  const loadingMessages = [
    "Analyzing market requirements...",
    "Compiling technical solutions...", 
    "Integrating customer feedback...",
    "Optimizing business outcomes...",
    "Connecting the dots...",
    "Bringing structure to disorder...",
    "Portfolio build complete ✓"
  ];

  // Terminal typing animation
  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        const currentLineText = terminalLines[currentLine];
        if (currentChar < currentLineText.length) {
          setCurrentChar(prev => prev + 1);
        } else {
          // Move to next line
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }, 300);
        }
      } else {
        // Start loading animation
        clearInterval(typeInterval);
        startLoadingAnimation();
      }
    }, 50); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentLine, currentChar]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(cursorInterval);
  }, []);

  const startLoadingAnimation = () => {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random increment 5-20
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(progress);
        clearInterval(loadingInterval);
        setTimeout(() => {
          setIsComplete(true);
        }, 1000);
      } else {
        setLoadingProgress(progress);
      }
    }, 400);
  };

  // Get current loading message
  const getCurrentLoadingMessage = () => {
    const messageIndex = Math.floor((loadingProgress / 100) * (loadingMessages.length - 1));
    return loadingMessages[messageIndex] || loadingMessages[0];
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-black text-green-400 font-mono"
      style={{
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Terminal Footer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <motion.svg
          width="300"
          height="400"
          viewBox="0 0 100 130"
          className="text-white/40"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Person sketch - more detailed */}
          <motion.path
            d="M 50 25 Q 45 20, 50 15 Q 55 20, 50 25 M 50 30 L 50 80 M 30 50 L 50 55 L 70 50 M 50 80 L 35 110 M 50 80 L 65 110"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          
          {/* Stressed face */}
          <motion.circle cx="46" cy="21" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: 0.5 }} />
          <motion.circle cx="54" cy="21" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, duration: 0.5 }} />
          <motion.path d="M 46 24 Q 50 27, 54 24" stroke="currentColor" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5, duration: 0.8 }} />
          
          {/* Stress lines around head */}
          <motion.path d="M 38 18 L 34 14" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3, duration: 0.5 }} />
          <motion.path d="M 38 22 L 32 22" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3.2, duration: 0.5 }} />
          <motion.path d="M 62 18 L 66 14" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3.1, duration: 0.5 }} />
          <motion.path d="M 62 22 L 68 22" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3.3, duration: 0.5 }} />
        </motion.svg>
      </div>

      {/* Dramatic Loading Screen Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {spreadingElements.map((element, index) => {
          const IconComponent = element.icon;
          
          return (
            <motion.div
              key={element.id}
              className="absolute"
              style={{
                width: '70px',
                height: '70px',
              }}
              animate={
                phase === 'chaos' ? {
                  x: Math.cos(element.angle * Math.PI / 180) * element.startRadius,
                  y: Math.sin(element.angle * Math.PI / 180) * element.startRadius,
                  rotate: [0, 360, 720],
                  scale: [0.5, 1, 0.8, 1.2],
                  opacity: [0.3, 1, 0.7, 1]
                } : phase === 'organizing' ? {
                  x: Math.cos(element.angle * Math.PI / 180) * element.targetRadius,
                  y: Math.sin(element.angle * Math.PI / 180) * element.targetRadius,
                  rotate: 0,
                  scale: 1,
                  opacity: 1
                } : {
                  x: Math.cos(element.angle * Math.PI / 180) * 30,
                  y: Math.sin(element.angle * Math.PI / 180) * 30,
                  rotate: 0,
                  scale: 0.8,
                  opacity: 0.9
                }
              }
              transition={{
                duration: phase === 'chaos' ? 6 : phase === 'organizing' ? 4 : 3,
                repeat: phase === 'chaos' ? Infinity : 0,
                delay: index * 0.15,
                ease: phase === 'chaos' ? "easeInOut" : "easeOut",
                type: phase === 'organizing' ? "spring" : "tween",
                stiffness: phase === 'organizing' ? 100 : undefined,
                damping: phase === 'organizing' ? 20 : undefined
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
              }}
            >
              <motion.div
                className={`w-full h-full rounded-2xl bg-gradient-to-br from-slate-700/90 to-slate-800/95 backdrop-blur-lg border-2 border-slate-600/50 ${element.color} shadow-2xl flex items-center justify-center relative overflow-hidden`}
                animate={{
                  borderColor: phase === 'complete' 
                    ? ['rgba(148, 163, 184, 0.5)', 'rgba(71, 85, 105, 0.8)', 'rgba(148, 163, 184, 0.5)']
                    : 'rgba(148, 163, 184, 0.5)',
                  boxShadow: phase === 'complete'
                    ? ['0 0 20px rgba(148, 163, 184, 0.3)', '0 0 40px rgba(71, 85, 105, 0.5)', '0 0 20px rgba(148, 163, 184, 0.3)']
                    : '0 0 15px rgba(0, 0, 0, 0.3)'
                }}
                transition={{
                  borderColor: { duration: 2, repeat: phase === 'complete' ? Infinity : 0 },
                  boxShadow: { duration: 2, repeat: phase === 'complete' ? Infinity : 0 }
                }}
              >
                {/* Professional glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent rounded-2xl"
                  animate={{
                    opacity: phase === 'chaos' ? [0.1, 0.4, 0.1] : 0.2
                  }}
                  transition={{
                    duration: 3,
                    repeat: phase === 'chaos' ? Infinity : 0
                  }}
                />
                
                {/* Icon with professional styling */}
                <IconComponent className="w-8 h-8 relative z-10 drop-shadow-lg" />
                
                {/* Loading pulse effect */}
                {phase === 'chaos' && (
                  <motion.div
                    className="absolute inset-0 bg-slate-400/20 rounded-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                )}
              </motion.div>

              {/* Professional connection lines */}
              {phase === 'complete' && (
                <svg 
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: '100vw',
                    height: '100vh',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1
                  }}
                >
                  <motion.line
                    x1="50%" y1="50%"
                    x2={`${50 + (Math.cos(element.angle * Math.PI / 180) * 30 / 10)}%`}
                    y2={`${50 + (Math.sin(element.angle * Math.PI / 180) * 30 / 10)}%`}
                    stroke="rgba(148, 163, 184, 0.6)"
                    strokeWidth="1.5"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                  />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Central loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-4 h-4 bg-slate-400 rounded-full"
          animate={phase === 'organizing' ? {
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5]
          } : {}}
          transition={{
            duration: 1,
            repeat: phase === 'organizing' ? Infinity : 0
          }}
        />
      </div>

      {/* Organized Solution Structure */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Solution Framework Visualization */}
            <div className="relative">
              {/* Customer Success Circle */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 backdrop-blur-sm flex items-center justify-center"
                style={{ left: '20%', top: '30%' }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              >
                <Users className="w-8 h-8 text-emerald-400" />
                <span className="absolute -bottom-8 text-emerald-400 font-semibold text-sm whitespace-nowrap">Customer Success</span>
              </motion.div>
              
              {/* Development Circle */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-400/50 backdrop-blur-sm flex items-center justify-center"
                style={{ left: '45%', top: '20%' }}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
              >
                <Code className="w-8 h-8 text-amber-400" />
                <span className="absolute -bottom-8 text-amber-400 font-semibold text-sm whitespace-nowrap">Development</span>
              </motion.div>
              
              {/* Business Strategy Circle */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-blue-400/50 backdrop-blur-sm flex items-center justify-center"
                style={{ left: '70%', top: '30%' }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
              >
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <span className="absolute -bottom-8 text-blue-400 font-semibold text-sm whitespace-nowrap">Business Strategy</span>
              </motion.div>
              
              {/* Central Solution Hub */}
              <motion.div
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-gray-300/10 border-2 border-white/30 backdrop-blur-sm flex items-center justify-center"
                style={{ left: '47.5%', top: '37.5%' }}
                initial={{ scale: 0, rotate: 360 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.1, duration: 1, type: "spring" }}
              >
                <Puzzle className="w-6 h-6 text-white" />
                <span className="absolute -bottom-6 text-white font-bold text-sm whitespace-nowrap">Solution</span>
              </motion.div>
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ width: '400px', height: '300px', left: '10%', top: '15%' }}>
                <motion.line
                  x1="25%" y1="45%" x2="50%" y2="52%"
                  stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                />
                <motion.line
                  x1="52.5%" y1="35%" x2="52.5%" y2="47%"
                  stroke="rgba(245, 158, 11, 0.4)" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
                <motion.line
                  x1="75%" y1="45%" x2="55%" y2="52%"
                  stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-sm">Terminal - developer@portfolio</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Terminal Output */}
          <div className="flex-1 overflow-auto space-y-1">
            {terminalLines.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className="flex">
                <span className="text-green-400">
                  {index === currentLine ? 
                    line.substring(0, currentChar) + 
                    (showCursor && index === currentLine ? '█' : '') 
                    : line
                  }
                </span>
              </div>
            ))}
          </div>

          {/* Loading Progress */}
          {currentLine >= terminalLines.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              <div className="text-cyan-400">
                {getCurrentLoadingMessage()}
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>Progress: {Math.floor(loadingProgress)}%</span>
                <span>Connecting the dots...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute bottom-6 right-6 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.button
              onClick={onComplete}
              className="group relative px-8 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-green-400 shadow-lg font-mono transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>ENTER PORTFOLIO</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  &gt;&gt;
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <motion.div 
          className="flex items-center space-x-4 text-gray-400 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'organizing' ? 1 : 0 }}
        >
          <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: phase === 'organizing' ? '100%' : '0%' }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          </div>
          <span className="text-emerald-400 font-bold">Bringing order...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImmersiveLanding;