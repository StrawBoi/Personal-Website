import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, BarChart3, Database, Cloud, 
  Globe, TrendingUp, Settings, Zap
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  const skillCategories = [
    {
      id: 1,
      title: "Web Development",
      icon: Code2,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress", "Git"]
    },
    {
      id: 2,
      title: "Sales & Marketing", 
      icon: TrendingUp,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/30",
      skills: ["SEMrush", "Google Analytics", "Hootsuite", "Canva"]
    },
    {
      id: 3,
      title: "CRM & ERP Systems",
      icon: Database,
      color: "amber",
      gradient: "from-amber-500 to-amber-600", 
      bgGradient: "from-amber-500/10 to-amber-600/10",
      borderColor: "border-amber-500/30",
      skills: ["HubSpot", "Salesforce", "Microsoft Dynamics", "SAP", "Oracle ERP", "Odoo"]
    },
    {
      id: 4,
      title: "Business Analysis & Cloud",
      icon: Cloud,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/10", 
      borderColor: "border-purple-500/30",
      skills: ["Power BI", "Excel", "Microsoft Azure", "AWS"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Toolkit & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit spanning development, marketing, business systems, and cloud technologies.
          </p>
        </motion.div>

        {/* Skills Grid - Four Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                variants={columnVariants}
                className="relative p-6 rounded-2xl transition-all duration-300 group hover:border-white/40"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Category Header */}
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.gradient} shadow-lg mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl font-bold text-white mb-2">
                    {category.title}
                  </h4>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1 + skillIndex * 0.05,
                        duration: 0.5
                      }}
                      className="flex items-center p-3 rounded-lg border transition-all duration-300 group/skill cursor-pointer hover:bg-blue-500 hover:border-blue-400"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      style={{
                        transition: 'all 0.3s ease-out'
                      }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mr-3 flex-shrink-0`}
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      />
                      <span className="text-gray-300 group-hover/skill:text-white transition-colors font-medium">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Skill Count Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                >
                  {category.skills.length}
                </motion.div>

                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute -inset-px bg-gradient-to-r ${category.gradient} rounded-2xl blur-sm -z-10`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-emerald-400 mr-3" />
            <span className="text-white font-medium text-lg">
              Bridging technical expertise with business strategy for measurable results
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;