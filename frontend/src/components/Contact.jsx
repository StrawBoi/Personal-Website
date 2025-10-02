import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, Phone, Linkedin, 
  MessageCircle, ArrowRight
} from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Ahmed.ha.mahmoud@outlook.com",
      href: "mailto:Ahmed.ha.mahmoud@outlook.com",
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-600/20",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+32 490 36 48 04",
      href: "tel:+32490364804",
      color: "text-blue-400",
      bg: "from-blue-500/20 to-blue-600/20",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Professional Network",
      href: "https://linkedin.com/in/ahmed-mahmoud",
      color: "text-amber-400",
      bg: "from-amber-500/20 to-amber-600/20",
      gradient: "from-amber-500 to-amber-600"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects - Different color scheme to separate from other sections */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/6 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-400">Great Together</span>
          </h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I am currently available for freelance opportunities and consulting roles. Feel free to reach out to discuss your project.
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group block p-8 rounded-3xl transition-all duration-300 text-center hover:border-white/40"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${info.gradient} shadow-lg mb-6`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {info.label}
                  </h3>
                  
                  {/* Value */}
                  <p className={`${info.color} font-semibold text-lg group-hover:text-white transition-colors`}>
                    {info.value}
                  </p>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    className="flex items-center justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>

                  {/* Hover glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute -inset-px bg-gradient-to-r ${info.gradient} rounded-3xl blur-sm -z-10`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Availability Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-6 rounded-full bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20 border border-green-500/30 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 bg-green-400 rounded-full mr-4"
              />
              <span className="text-green-400 font-semibold text-lg">
                Available for New Projects
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;