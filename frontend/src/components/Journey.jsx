import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Users, Code, TrendingUp, Award, Lightbulb, Target } from 'lucide-react';

const Journey = () => {
  const [activePhase, setActivePhase] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  const journeyPhases = [
    {
      id: 1,
      title: "Customer Champion",
      period: "2011 - 2015",
      role: "Support • Experience • Retention • Sales",
      description: "Started my journey understanding the heartbeat of business - customers. Learned that every interaction matters, every problem is an opportunity, and retention is the key to sustainable growth.",
      achievements: [
        "Improved customer satisfaction by 40%",
        "Reduced churn rate by 25%",
        "Developed customer success frameworks",
        "Built lasting client relationships"
      ],
      icon: Users,
      color: "emerald",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      id: 2,
      title: "Code Craftsman",
      period: "2015 - 2023",
      role: "Junior → Senior → Software Developer",
      description: "Transitioned into development with customer-first mindset intact. Built solutions that don't just work, but solve real problems. Learned that great code is written for humans, not just machines.",
      achievements: [
        "Mastered full-stack development",
        "Led development teams",
        "Architected scalable systems",
        "Delivered 50+ successful projects"
      ],
      icon: Code,
      color: "amber",
      bgGradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      id: 3,
      title: "Business Strategist",
      period: "2023 - Present",
      role: "Marketing • Management • Strategy",
      description: "Currently expanding into marketing and business strategy. Combining technical expertise with business acumen to solve complex challenges. The goal: bridge the gap between technology and business value.",
      achievements: [
        "Studying advanced marketing strategies",
        "Developing business frameworks",
        "Consulting on tech-business alignment",
        "Building comprehensive skill matrix"
      ],
      icon: TrendingUp,
      color: "blue",
      bgGradient: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400"
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

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

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="journey" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A unique path that combines customer empathy, technical excellence, and business strategy.
            Each phase has shaped my perspective on solving complex problems.
          </p>
        </motion.div>

        {/* Journey timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative max-w-6xl mx-auto"
        >
          {/* Central timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-amber-500 to-blue-500 rounded-full">
            <motion.div
              variants={timelineVariants}
              className="w-full h-full bg-gradient-to-b from-emerald-400 via-amber-400 to-blue-400 rounded-full origin-top"
            />
          </div>

          {/* Journey phases */}
          <div className="space-y-16">
            {journeyPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                onMouseEnter={() => setActivePhase(index)}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.bgGradient} border-4 ${phase.borderColor} backdrop-blur-sm flex items-center justify-center`}
                  >
                    <phase.icon className={`w-8 h-8 ${phase.textColor}`} />
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-1/2`}
                >
                  <div className={`p-8 rounded-2xl bg-gradient-to-br ${phase.bgGradient} backdrop-blur-sm border ${phase.borderColor} hover:border-opacity-60 transition-all duration-300`}>
                    <div className="mb-6">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${phase.bgGradient} border ${phase.borderColor} mb-4`}>
                        <span className={`text-sm font-mono ${phase.textColor} font-semibold`}>
                          {phase.period}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {phase.title}
                      </h3>
                      <p className={`text-lg ${phase.textColor} font-medium mb-4`}>
                        {phase.role}
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {phase.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-400" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {phase.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start text-gray-300"
                          >
                            <Target className={`w-4 h-4 mt-1 mr-3 ${phase.textColor} flex-shrink-0`} />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom insight */}
          <motion.div
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-white font-medium">
                The combination of customer empathy + technical skills + business strategy = Unique problem-solving approach
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;