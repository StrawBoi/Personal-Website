import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#hero' },
    { label: 'My Journey', href: '#story' },
    { label: 'Featured Project', href: '#featured-project' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Toolkit & Expertise', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Transparent Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.3)' }} data-testid="navbar">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="text-white font-bold text-2xl" data-testid="navbar-brand">
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6, #0891b2)',
                  boxShadow: '0 0 20px rgba(20,184,166,0.5), 0 0 40px rgba(20,184,166,0.3)',
                }}
              >
                <span className="text-white font-bold text-xl tracking-tight">AM</span>
              </div>
            </a>

            {/* Hamburger Menu Button */}
            <button 
              onClick={toggleMenu}
              className="relative w-10 h-10 flex items-center justify-center z-50"
              aria-label="Toggle menu"
            >
              <motion.div
                className="flex flex-col items-end gap-1.5"
                animate={menuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="block h-0.5 bg-white rounded"
                  style={{ width: '24px' }}
                  variants={{
                    closed: { rotate: 0, y: 0, width: '24px' },
                    open: { rotate: 45, y: 8, width: '24px' }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-0.5 bg-white rounded"
                  style={{ width: '18px' }}
                  variants={{
                    closed: { opacity: 1, width: '18px' },
                    open: { opacity: 0, width: '18px' }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-0.5 bg-white rounded"
                  style={{ width: '24px' }}
                  variants={{
                    closed: { rotate: 0, y: 0, width: '24px' },
                    open: { rotate: -45, y: -8, width: '24px' }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Animated Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/90 z-40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Animated Menu Items */}
                <motion.ul className="space-y-6 text-center">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block text-white text-4xl md:text-5xl font-bold hover:text-teal-400 transition-colors duration-300"
                        style={{
                          textShadow: '0 0 20px rgba(20,184,166,0.3)',
                        }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0891b2)' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedNav;
