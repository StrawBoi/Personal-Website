import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const ScrollAnimation = ({ children, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1, 
    once: true,
    margin: "-10% 0px -10% 0px"
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 75,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;