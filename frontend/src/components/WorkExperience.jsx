import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Building2, TrendingUp, Database, 
  Target, Users, Zap, Award, ChevronRight, 
  BarChart3, Brain, Settings, Code2
} from 'lucide-react';

const WorkExperience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  const experiences = [
    {
      id: 1,
      company: "Ammosshipping LTD",
      role: "Information Technology Head Officer",
      period: "2018 - 2020",
      location: "Cyprus",
      type: "Leadership",
      icon: Settings,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      challenge: "To enhance the company's software solutions and manage the technical operations of a growing IT department.",
      solution: "I was promoted from Software Engineer to this leadership role where I coordinated a cross-functional team. I contributed to the design and development of key software solutions and helped manage IT infrastructure, including cloud services (Azure, AWS) and ServiceNow for process management.",
      outcome: "This role was a crucial step in my leadership journey, teaching me to align technical projects with business goals and mentor a team of developers and support staff.",
      technologies: ["Azure", "AWS", "ServiceNow", "Team Leadership"],
      metrics: { role: "Leadership", team: "Cross-functional", growth: "Promoted" }
    },
    {
      id: 2,
      company: "Dell EMC",
      role: "Technical Sales Specialist",
      period: "2020 - 2022",
      location: "UK",
      type: "Sales & Technical",
      icon: Briefcase,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/30",
      challenge: "To translate highly technical enterprise solutions (storage, servers, cloud infrastructure) into clear, valuable propositions for clients.",
      solution: "I delivered technical product demonstrations and used Salesforce to manage customer accounts and sales opportunities. My primary role was to understand a client's technical needs and propose a tailored Dell EMC solution that met them.",
      outcome: "This position was pivotal in merging my technical background with business development, honing my ability to communicate complex ideas and build strong client relationships.",
      technologies: ["Salesforce", "Enterprise Storage", "Cloud Infrastructure", "Technical Demos"],
      metrics: { focus: "Client Relations", skills: "Technical Sales", impact: "Business Dev" }
    },
    {
      id: 3,
      company: "AEGarden",
      role: "Marketing & Sales Consultant",
      period: "2022 - 2023",
      location: "Remote",
      type: "Marketing",
      icon: TrendingUp,
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-500/10 to-amber-600/10",
      borderColor: "border-amber-500/30",
      challenge: "As a marketing student, the goal was to apply academic models to a real-world business to identify opportunities and craft effective strategies.",
      solution: "I conducted market and trend analysis to inform strategy. I developed buyer personas and applied strategic models like SWOT and STP to create targeted marketing campaigns. For execution, I used Canva for content creation and Hootsuite for social media management.",
      outcome: "This was a fantastic opportunity to put my marketing studies into practice, directly linking market analysis to the execution of digital campaigns.",
      technologies: ["Canva", "Hootsuite", "SWOT Analysis", "STP Model"],
      metrics: { approach: "Academic", execution: "Digital", analysis: "Strategic" }
    },
    {
      id: 4,
      company: "GB Arena",
      role: "Junior Web Developer",
      period: "2016 - 2018",
      location: "UK",
      type: "Development",
      icon: Code2,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-500/30",
      challenge: "To build and maintain responsive, user-friendly websites that functioned seamlessly across all devices.",
      solution: "I developed websites using HTML, CSS, and JavaScript for the front-end, while integrating back-end functionality with PHP and MySQL. I also gained experience building dynamic single-page applications with Angular and managing code with Git.",
      outcome: "This role provided the foundational hands-on experience in full-stack development that my technical career is built upon.",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL", "Angular", "Git"],
      metrics: { foundation: "Full-stack", experience: "Hands-on", skills: "Core Dev" }
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

  const experienceVariants = {
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400">Studies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world challenges I've tackled, the solutions I've implemented, 
            and the measurable outcomes I've delivered for organizations.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            
            return (
              <motion.div
                key={exp.id}
                variants={experienceVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setSelectedExperience(exp)}
                className="group cursor-pointer"
                style={{
                  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
                }}
              >
                <div 
                  className="relative p-6 rounded-2xl transition-all duration-300 h-full group-hover:shadow-2xl group-hover:shadow-black/25 hover:border-white/40"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.gradient} shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold text-${exp.color}-400 bg-white/10`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Company Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>
                    <p className={`text-${exp.color}-400 font-semibold mb-1`}>
                      {exp.company}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{exp.period}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Challenge Preview */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Target className={`w-4 h-4 mr-2 text-${exp.color}-400`} />
                      The Challenge
                    </h4>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {exp.challenge}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(exp.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className={`text-lg font-bold text-${exp.color}-400`}>{value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>Read full case study</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-${exp.color}-400 group-hover:translate-x-1 transition-transform`} />
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute -inset-px bg-gradient-to-r ${exp.gradient} rounded-2xl blur-sm -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal for detailed case study */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedExperience.role}
                  </h3>
                  <p className={`text-xl text-${selectedExperience.color}-400 font-semibold`}>
                    {selectedExperience.company} • {selectedExperience.period}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-white hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Full Case Study */}
              <div className="space-y-8">
                {/* Challenge */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Target className={`w-6 h-6 mr-3 text-${selectedExperience.color}-400`} />
                    Challenge
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    <strong>Challenge:</strong> {selectedExperience.challenge}
                  </p>
                </div>

                {/* My Contribution */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Brain className={`w-6 h-6 mr-3 text-${selectedExperience.color}-400`} />
                    My Contribution
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    <strong>My Contribution:</strong> {selectedExperience.solution}
                  </p>
                </div>

                {/* Key Takeaway */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Award className={`w-6 h-6 mr-3 text-${selectedExperience.color}-400`} />
                    Key Takeaway
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    <strong>Key Takeaway:</strong> {selectedExperience.outcome}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies & Methods</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedExperience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${selectedExperience.gradient} text-white text-sm font-semibold`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Key Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(selectedExperience.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <div className={`text-2xl font-bold text-${selectedExperience.color}-400 mb-2`}>{value}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkExperience;