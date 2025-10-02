import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Code, TrendingUp, Award, Lightbulb, Target, Zap, Star, ChevronRight } from 'lucide-react';
import LazyVideo from './LazyVideo';

const InteractiveJourney = () => {
  const [activePhase, setActivePhase] = useState(null);
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const isInView = useInView(containerRef, { threshold: 0.1, once: true });
  
  const journeyPhases = [
    {
      id: 1,
      title: "Customer Champion",
      period: "2011 - 2015",
      role: "Support • Experience • Retention • Sales",
      description: "Started my journey understanding the heartbeat of business - customers. Every interaction became a masterclass in empathy, every problem an opportunity to innovate.",
      achievements: [
        { text: "Improved customer satisfaction by 40%", impact: "High", icon: Star },
        { text: "Reduced churn rate by 25%", impact: "High", icon: Target },
        { text: "Developed customer success frameworks", impact: "Medium", icon: Lightbulb },
        { text: "Built lasting client relationships", impact: "Medium", icon: Award }
      ],
      icon: Users,
      color: "emerald",
      bgGradient: "from-emerald-500/30 to-teal-500/30",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-400",
      glowColor: "shadow-emerald-500/20",
      metrics: { clients: "200+", satisfaction: "95%", retention: "85%" }
    },
    {
      id: 2,
      title: "Code Craftsman",
      period: "2015 - 2023",
      role: "Junior → Senior → Lead Developer",
      description: "Transitioned into development with customer-first mindset intact. Built solutions that don't just work, but solve real problems with elegance and efficiency.",
      achievements: [
        { text: "Mastered full-stack development", impact: "High", icon: Code },
        { text: "Led development teams of 8+ engineers", impact: "High", icon: Users },
        { text: "Architected systems serving 1M+ users", impact: "High", icon: Zap },
        { text: "Delivered 50+ successful projects", impact: "Medium", icon: Target }
      ],
      icon: Code,
      color: "amber",
      bgGradient: "from-amber-500/30 to-orange-500/30",
      borderColor: "border-amber-500/50",
      textColor: "text-amber-400",
      glowColor: "shadow-amber-500/20",
      metrics: { projects: "50+", users: "1M+", uptime: "99.9%" }
    },
    {
      id: 3,
      title: "Business Strategist",
      period: "2023 - Present",
      role: "Marketing • Management • Strategy",
      description: "Currently expanding into marketing and business strategy. Combining technical expertise with business acumen to solve complex organizational challenges.",
      achievements: [
        { text: "Studying advanced marketing strategies", impact: "Medium", icon: Lightbulb },
        { text: "Developing business frameworks", impact: "High", icon: Target },
        { text: "Leading digital transformation", impact: "High", icon: Zap },
        { text: "Building comprehensive skill matrix", impact: "Medium", icon: Award }
      ],
      icon: TrendingUp,
      color: "blue",
      bgGradient: "from-blue-500/30 to-indigo-500/30",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-400",
      glowColor: "shadow-blue-500/20",
      metrics: { roi: "150%", initiatives: "5", teams: "3" }
    }
  ];

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const phaseVariants = {
    hidden: { 
      opacity: 0, 
      x: -100, 
      scale: 0.8,
      rotateY: -90 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  return (
    <section id="journey" className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const colors = ['emerald', 'amber', 'blue'];
            const color = colors[i % 3];
            return (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 bg-${color}-500/20 rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.6, 0.2],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        {/* Interactive Gradient Meshes */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400 mb-8"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            My Journey
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A unique path that combines{' '}
            <span className="text-emerald-400 font-semibold">customer empathy</span>,{' '}
            <span className="text-amber-400 font-semibold">technical excellence</span>, and{' '}
            <span className="text-blue-400 font-semibold">business strategy</span>.
            Each phase has shaped my perspective on solving complex problems.
          </motion.p>
        </motion.div>

        {/* Interactive Journey Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-7xl mx-auto"
        >
          {/* Central Timeline Line with Progress */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-emerald-500 via-amber-500 to-blue-500 rounded-full relative overflow-hidden"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              style={{ transformOrigin: 'top' }}
            >
              {/* Animated energy pulse */}
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{ y: ['100%', '-100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Journey Phases */}
          <div className="space-y-32">
            {journeyPhases.map((phase, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activePhase === phase.id;
              
              return (
                <motion.div
                  key={phase.id}
                  variants={phaseVariants}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActivePhase(phase.id)}
                  onMouseLeave={() => setActivePhase(null)}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-4 z-30">
                    <motion.div
                      className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${phase.bgGradient} border-4 ${phase.borderColor} backdrop-blur-sm flex items-center justify-center ${phase.glowColor} shadow-2xl`}
                      whileHover={{ 
                        scale: 1.3, 
                        rotateY: 180,
                        boxShadow: `0 0 40px rgba(16, 185, 129, 0.6)`
                      }}
                      animate={isActive ? {
                        scale: 1.2,
                        boxShadow: `0 0 30px ${phase.color === 'emerald' ? 'rgba(16, 185, 129, 0.5)' : phase.color === 'amber' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`
                      } : {}}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <phase.icon className={`w-8 h-8 ${phase.textColor} z-10`} />
                      
                      {/* Pulsing Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 ${phase.borderColor}`}
                        animate={isActive ? {
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0.2, 0.8]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-24 md:ml-0 ${isLeft ? 'md:mr-16' : 'md:ml-16'} md:w-1/2 relative`}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                    }}
                    animate={isActive ? { scale: 1.05 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <motion.div
                      className={`relative p-8 rounded-3xl bg-gradient-to-br ${phase.bgGradient} backdrop-blur-xl border ${phase.borderColor} ${phase.glowColor} shadow-2xl overflow-hidden`}
                      style={{
                        background: `linear-gradient(135deg, 
                          ${phase.color === 'emerald' ? 'rgba(16, 185, 129, 0.1)' : 
                            phase.color === 'amber' ? 'rgba(245, 158, 11, 0.1)' : 
                            'rgba(59, 130, 246, 0.1)'} 0%, 
                          rgba(0, 0, 0, 0.3) 100%)`
                      }}
                    >
                      {/* Animated Background Pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                          backgroundImage: `radial-gradient(circle, ${phase.color === 'emerald' ? '#10b981' : phase.color === 'amber' ? '#f59e0b' : '#3b82f6'} 1px, transparent 1px)`,
                          backgroundSize: '50px 50px'
                        }}
                      />

                      {/* Ambient Video for Business Strategist phase */}
                      {phase.id === 3 && (
                        <div className="absolute top-4 right-4 w-32 h-20 rounded-lg overflow-hidden opacity-30">
                          <LazyVideo
                            videoSrc="https://customer-assets.emergentagent.com/job_cinema-folio/artifacts/m92381dt_A_closeup_macro_202510012232_k40bb.mp4"
                            posterSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iODAiIGZpbGw9IiMyNTI5M0EiLz48L3N2Zz4="
                            className="w-full h-full"
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      )}

                      {/* Header */}
                      <div className="relative z-10 mb-6">
                        <motion.div
                          className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${phase.bgGradient} border ${phase.borderColor} mb-4`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className={`text-sm font-mono ${phase.textColor} font-bold tracking-wider`}>
                            {phase.period}
                          </span>
                        </motion.div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {phase.title}
                        </h3>
                        
                        <p className={`text-lg ${phase.textColor} font-semibold mb-4`}>
                          {phase.role}
                        </p>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {phase.description}
                        </p>
                      </div>

                      {/* Metrics */}
                      <motion.div 
                        className="grid grid-cols-3 gap-4 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                      >
                        {Object.entries(phase.metrics).map(([key, value], metricIndex) => (
                          <motion.div
                            key={key}
                            className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              y: -2
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.7 + index * 0.2 + metricIndex * 0.1 }}
                          >
                            <div className={`text-2xl font-bold ${phase.textColor}`}>{value}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">{key}</div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Achievements */}
                      <div className="relative z-10">
                        <h4 className="text-white font-semibold mb-4 flex items-center">
                          <Award className={`w-5 h-5 mr-2 ${phase.textColor}`} />
                          Key Achievements
                        </h4>
                        
                        <div className="space-y-3">
                          {phase.achievements.map((achievement, achievementIndex) => {
                            const AchievementIcon = achievement.icon;
                            const isHovered = hoveredAchievement === `${phase.id}-${achievementIndex}`;
                            
                            return (
                              <motion.div
                                key={achievementIndex}
                                className="group flex items-start p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.02, x: 5 }}
                                onMouseEnter={() => setHoveredAchievement(`${phase.id}-${achievementIndex}`)}
                                onMouseLeave={() => setHoveredAchievement(null)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.8 + index * 0.2 + achievementIndex * 0.1 }}
                              >
                                <motion.div
                                  className={`p-2 rounded-lg bg-gradient-to-r ${phase.bgGradient} mr-3 flex-shrink-0`}
                                  animate={isHovered ? { 
                                    rotate: 360,
                                    scale: 1.1
                                  } : {}}
                                  transition={{ duration: 0.5 }}
                                >
                                  <AchievementIcon className={`w-4 h-4 ${phase.textColor}`} />
                                </motion.div>
                                
                                <div className="flex-1">
                                  <span className="text-gray-300 group-hover:text-white transition-colors">
                                    {achievement.text}
                                  </span>
                                  <motion.div
                                    className={`mt-1 text-xs font-semibold ${
                                      achievement.impact === 'High' ? 'text-green-400' : 
                                      achievement.impact === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                                    }`}
                                    initial={{ opacity: 0 }}
                                    animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
                                  >
                                    {achievement.impact} Impact
                                  </motion.div>
                                </div>
                                
                                <ChevronRight className={`w-4 h-4 ${phase.textColor} opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300`} />
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Conclusion */}
          <motion.div
            className="mt-32 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-blue-500/20 border border-white/20 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-white font-semibold text-lg">
                The combination of customer empathy + technical skills + business strategy = 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400 ml-2">
                  Unique problem-solving approach
                </span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveJourney;