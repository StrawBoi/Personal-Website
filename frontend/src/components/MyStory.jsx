import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MyStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  return (
    <section 
      id="story" 
      className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center">
          <div className="col-md-8 max-w-4xl w-full">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-white mb-6"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                }}
              >
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400">Journey</span>
              </motion.h2>
            </motion.div>

            {/* Story Content */}
            <div className="space-y-8">
              {/* Paragraph 1 - Client Support Foundation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 p-6 rounded-2xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                  }}
                >
                  My career began with a foundation in client support and customer service, where I developed exceptional communication and problem-solving skills at companies like Vodafone UK and Sirius XM. This experience taught me the critical importance of understanding the end-user and building lasting relationships.
                </motion.p>
                
                {/* Timeline indicator */}
                <motion.div
                  className="absolute -left-4 top-8 w-3 h-3 bg-emerald-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                />
              </motion.div>

              {/* Paragraph 2 - Technology Transition */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 p-6 rounded-2xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                  }}
                >
                  I then transitioned into technology, gaining hands-on experience in full-stack web and software development. This path saw me grow from a Junior Web Developer at GB Arena to leading the entire IT Department at Ammosshipping LTD, sharpening my technical expertise and passion for building dynamic digital solutions that address user needs.
                </motion.p>
                
                {/* Timeline indicator */}
                <motion.div
                  className="absolute -left-4 top-8 w-3 h-3 bg-amber-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                />
              </motion.div>

              {/* Paragraph 3 - Strategic Business Focus */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 p-6 rounded-2xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                  }}
                >
                  Today, I am focused on combining my technical background with a strategic business mindset to drive growth in sales and marketing. My experience as a Technical Sales Specialist at Dell EMC and in recent consultant roles is further supported by my ongoing business management studies. I now lead marketing initiatives that fuel brand growth and optimize sales pipelines through data-driven strategies.
                </motion.p>
                
                {/* Timeline indicator */}
                <motion.div
                  className="absolute -left-4 top-8 w-3 h-3 bg-blue-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                />
              </motion.div>
            </div>

            {/* Connecting Line */}
            <motion.div
              className="absolute left-0 top-32 bottom-32 w-px bg-gradient-to-b from-emerald-400 via-amber-400 to-blue-400 ml-2"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;