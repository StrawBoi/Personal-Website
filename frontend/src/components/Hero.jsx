import React, { useState, useEffect } from 'react';
import { ChevronDown, Code, Users, TrendingUp, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const careerPhases = [
    {
      title: "Customer Experience Expert",
      period: "2011-2015",
      description: "Building relationships, solving problems, driving retention",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Software Developer",
      period: "2015-2023",
      description: "Crafting code, building solutions, scaling systems",
      icon: Code,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Business Strategist",
      period: "2023-Present",
      description: "Solving complex business challenges through technology",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % careerPhases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('journey');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Your Name
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 font-light">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Problem Solver
            </span>
            {" • "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Developer
            </span>
            {" • "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Strategist
            </span>
          </div>
        </div>

        {/* Career phases carousel */}
        <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
          <div className={`${careerPhases[currentPhase].bgColor} backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500`}>
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-full bg-gradient-to-r ${careerPhases[currentPhase].color} animate-spin-slow`}>
                {React.createElement(careerPhases[currentPhase].icon, {
                  className: "w-8 h-8 text-white"
                })}
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {careerPhases[currentPhase].title}
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              {careerPhases[currentPhase].period}
            </p>
            <p className="text-lg text-gray-400">
              {careerPhases[currentPhase].description}
            </p>
          </div>

          {/* Phase indicators */}
          <div className="flex justify-center mt-8 space-x-4">
            {careerPhases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhase(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPhase
                    ? 'bg-white scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-6 animate-fade-in-up">
          <p className="text-xl text-gray-300 max-w-2xl">
            From customer-first thinking to code craftsmanship to business strategy —
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400 font-semibold">
              I solve complex problems with a unique perspective
            </span>
          </p>
          
          <button
            onClick={scrollToNext}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-amber-500 to-blue-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Explore My Journey</span>
            </span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="text-white/60 hover:text-white transition-colors animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;