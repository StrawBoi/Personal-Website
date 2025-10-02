import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Play, Award, 
  Users, Code, TrendingUp, 
  Calendar, MapPin, Star
} from 'lucide-react';
import { mockData } from '../data/mock';
import LazyVideo from './LazyVideo';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2 });

  const filters = [
    { id: 'all', label: 'All Projects', icon: Star },
    { id: 'customer', label: 'Customer Success', icon: Users },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'business', label: 'Business Strategy', icon: TrendingUp }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? mockData.projects 
    : mockData.projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      customer: {
        gradient: 'from-emerald-500 to-teal-600',
        bg: 'from-emerald-500/10 to-teal-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
      },
      development: {
        gradient: 'from-amber-500 to-orange-600',
        bg: 'from-amber-500/10 to-orange-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
      },
      business: {
        gradient: 'from-blue-500 to-indigo-600',
        bg: 'from-blue-500/10 to-indigo-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
      }
    };
    return colors[category] || colors.development;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
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
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of projects spanning customer success initiatives, technical solutions, 
            and business strategy implementations.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const IconComponent = filter.icon;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-transparent'
                    : 'bg-slate-800/50 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                } backdrop-blur-sm`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{filter.label}</span>
                </div>
                {!isActive && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredProjects.map((project, index) => {
              const categoryColors = getCategoryColor(project.category);
              
              return (
                <motion.div
                  key={project.id}
                  variants={projectVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div 
                    className="relative p-6 rounded-2xl transition-all duration-300 hover:border-white/40"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Project video/image with lazy loading */}
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                      {/* Lazy-loaded ambient video for select projects */}
                      {index % 3 === 0 ? (
                        <LazyVideo
                          videoSrc="https://customer-assets.emergentagent.com/job_cinema-folio/artifacts/m92381dt_A_closeup_macro_202510012232_k40bb.mp4"
                          posterSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
                          className="h-48"
                          style={{ borderRadius: '12px' }}
                        />
                      ) : (
                        <div className={`h-48 bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center relative`}>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="text-white"
                          >
                            {project.category === 'customer' && <Users className="w-16 h-16" />}
                            {project.category === 'development' && <Code className="w-16 h-16" />}
                            {project.category === 'business' && <TrendingUp className="w-16 h-16" />}
                          </motion.div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl"
                      >
                        <div className="flex space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <Play className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>

                    {/* Project info */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${categoryColors.text} bg-white/10`}>
                          {project.category.toUpperCase()}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm ml-1">{project.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-md">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className={`w-4 h-4 mr-1 ${categoryColors.text}`} />
                          <span>{project.impact}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute -inset-px bg-gradient-to-r ${categoryColors.gradient} rounded-2xl blur-sm -z-10`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-amber-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;