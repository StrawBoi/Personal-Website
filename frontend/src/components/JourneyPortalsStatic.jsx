import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = { blue: "#00BFFF", green: "#34d399", amber: "#f59e0b", teal: "#14b8a6" };

const ACTS = [
  {
    id: "communication",
    title: "Act I: Communication",
    color: COLORS.blue,
    lines: ["Communications", "Customer empathy"],
    details: {
      learned: [
        "Coaching frameworks and adult learning",
        "De‑escalation and retention playbooks",
        "Clear multi‑channel communication",
      ],
      achievements: [
        "Improved retention via targeted follow‑ups",
        "Resolved high‑impact escalations",
        "Upsell motions coordinated via Salesforce",
      ],
      responsibilities: [
        "Training and mentoring staff",
        "Handling complex tickets",
        "Customer feedback loops",
      ],
      jobs: [
        { role: "Subject Matter Expert", company: "Altice One", period: "2015–2016" },
        { role: "Tech Support & Sales", company: "Sirius XM", period: "2013–2015" },
        { role: "Customer Support Specialist", company: "Vodafone UK", period: "2011–2012" },
      ],
    },
  },
  {
    id: "software",
    title: "Act II: Software Development",
    color: COLORS.green,
    lines: ["From Hands-on Builder", "to Strategic Leader"],
    details: {
      subtitle: "Junior Web Developer to Full Stack to Department Head",
      skills: {
        technical: [
          "Team Leadership and Mentorship",
          "System-Level Thinking",
          "Project Management & Execution",
          "Strategic Planning",
          "Governance, Risk & Compliance (GRC)",
          "Budgeting and Cost Control"
        ],
        workingKit: [
          "Docker",
          "Object Oriented Programming",
          "SaaS",
          "MERN Stack",
          "LAMP Stack",
          "Python",
          "React Native",
          "React.js",
          "JavaScript",
          "TypeScript",
          "SQL",
          "Bash/Shell Scripting",
          "REST",
          "GraphQL"
        ]
      },
      achievements: [
        "Led a Critical Legacy System Modernisation",
        "A library of 40 responsive websites using advanced techniques and fully animated",
        "Maintaining of any project to keep it functional even with animated based websites",
        "Mentored a High-Performing Development Team",
        "Managed version control using Git, ensuring smooth collaboration with the development team and maintaining code integrity across projects",
        "Implemented and optimized IT service management processes using ServiceNow, reducing incident resolution time and improving overall user satisfaction"
      ],
      responsibilities: [
        "Develop and execute the long-term technology roadmap",
        "Govern high-level software architecture and technical standards",
        "Drive innovation by evaluating and implementing new technologies",
        "Lead, mentor, and manage the engineering team's performance",
        "Drive hiring, retention, and career development for technical staff",
        "Allocate engineering resources to align with business priorities"
      ],
      jobs: [
        { role: "IT Head Officer", company: "Ammosshipping", period: "2019–2023" },
        { role: "Junior Web Developer", company: "GB Arena", period: "2014–2016" },
      ],
    },
  },
  {
    id: "marketing",
    title: "Act III: Marketing & Business",
    color: COLORS.amber,
    lines: ["Brand & growth", "Client development"],
    details: {
      learned: ["Brand systems", "Performance content", "GTM"],
      achievements: ["Closed first client", "Organic visibility lift", "Shipped campaigns"],
      responsibilities: ["Creative direction", "Client development", "Content ops"],
      jobs: [
        { role: "Creative Director", company: "EcoNarrate", period: "2024–Present" },
        { role: "SEO & Sales Representative", company: "Wisdek", period: "2017" },
      ],
    },
  },
];

function DataStream({ pathD }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="dsGradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={COLORS.blue} />
          <stop offset="34%" stopColor={COLORS.blue} />
          <stop offset="50%" stopColor={COLORS.green} />
          <stop offset="66%" stopColor={COLORS.green} />
          <stop offset="100%" stopColor={COLORS.amber} />
        </linearGradient>
        <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path id="streamGlow" d={pathD} fill="none" stroke="url(#dsGradient)" strokeWidth="14" opacity="0.25" filter="url(#glowBlur)" />
      <path id="streamMain" d={pathD} fill="none" stroke="url(#dsGradient)" strokeWidth="3" opacity="0.88" />
      <path id="streamDash" d={pathD} fill="none" stroke="url(#dsGradient)" strokeWidth="4" strokeDasharray="16 26" opacity="0.85">
        <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="3s" repeatCount="indefinite" />
      </path>
      {[0, 0.33, 0.66].map((delay, idx) => (
        <circle key={`p-${idx}`} r="4" fill="#ffffff">
          <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" begin={`${delay}s`}>
            <mpath xlinkHref="#streamMain" />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

function Portal({ act, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="portal-btn relative rounded-[28px] border bg-[rgba(10,10,12,0.55)] overflow-hidden"
      style={{
        width: "clamp(260px, 28vw, 360px)",
        height: "clamp(380px, 56vh, 520px)",
        borderColor: `${act.color}`,
        boxShadow: `0 0 0 2px ${act.color}AA, 0 0 36px ${act.color}AA, 0 0 72px ${act.color}66, inset 0 0 32px ${act.color}33`,
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {act.id === "communication" && (
        <div className="absolute inset-0" style={{ backgroundImage: `url('/comm-bg.jpg')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.26, mixBlendMode: "screen", filter: "saturate(1.05) brightness(0.95)" }} />
      )}
      {act.id === "communication" && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))" }} />
      )}

      {act.id === "software" && (
        <div className="absolute inset-0" style={{ backgroundImage: `url('/software-bg.jpg')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.24, mixBlendMode: "screen", filter: "saturate(1.05) brightness(0.9)" }} />
      )}
      {act.id === "software" && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22), rgba(0,0,0,0.5))" }} />
      )}

      {act.id === "marketing" && (
        <div className="absolute inset-0" style={{ backgroundImage: `url('/marketing-bg.jpg')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.24, mixBlendMode: "screen", filter: "saturate(1.05) brightness(0.9)" }} />
      )}
      {act.id === "marketing" && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22), rgba(0,0,0,0.5))" }} />
      )}

      <motion.span className="pointer-events-none absolute inset-[2px] rounded-[26px] block" style={{ boxShadow: `0 -18px 48px ${act.color}, 0 14px 56px ${act.color}AA` }} />

      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
        <div>
          <div className="text-white text-[28px] font-semibold tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{act.title}</div>
          <div className="text-gray-200 text-sm mt-4 space-y-1">
            {act.lines.map((l, i) => (
              <div key={`l-${i}`}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 -bottom-[110px] h-[110px] rounded-[28px]" style={{ background: "rgba(10,10,12,0.7)", filter: `blur(18px) drop-shadow(0 0 32px ${act.color}BB)`, transform: "scaleY(-1)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }} />
    </motion.button>
  );
}

function CinematicModal({ open, onClose, act }) {
  if (!act) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/85" onClick={onClose} />
          <motion.div 
            className="relative w-[min(1100px,90vw)] max-h-[88vh] rounded-xl overflow-hidden text-white"
            initial={{ scale: 0.5, opacity: 0, width: "200px", height: "200px" }} 
            animate={{ 
              scale: [0.5, 1.15, 1], 
              opacity: [0, 1, 1],
              width: ["200px", "min(1100px,90vw)", "min(1100px,90vw)"],
              height: ["200px", "88vh", "88vh"]
            }} 
            exit={{ scale: 0.96, opacity: 0 }} 
            transition={{ 
              duration: 0.6,
              times: [0, 0.6, 1],
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              background: "#000000",
              border: "1px solid rgba(60,60,62,0.9)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* macOS window controls */}
            <div className="sticky top-0 z-20 flex items-center px-4 py-3 border-b border-gray-700/50" style={{ background: "#000000", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
              <div className="flex gap-2">
                <button onClick={onClose} className="w-3 h-3 rounded-full transition-colors" style={{ background: COLORS.teal }} aria-label="Close" />
                <button className="w-3 h-3 rounded-full transition-colors" style={{ background: COLORS.amber }} aria-label="Minimize" />
                <button className="w-3 h-3 rounded-full transition-colors" style={{ background: COLORS.green }} aria-label="Maximize" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium tracking-wide">
                {act.title}
              </div>
            </div>

            {/* scrollable content */}
            <div className="overflow-y-auto max-h-[calc(88vh-50px)] px-8 py-6">
              {act.id === "communication" ? (
                <div className="space-y-8">
                  {/* Top wide section */}
                  <motion.div 
                    className="text-center pb-6 border-b border-gray-700/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">The Journey of Communication</h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                      Honing the skills and crafting the key learnings that lead the rest of my journey.
                    </p>
                  </motion.div>

                  {/* Two columns: Key Skills & Technical Skills */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 border-b border-teal-500/40 pb-2">Key Skills Honed</h3>
                      <ul className="space-y-2 text-gray-300">
                        {["Mastering Soft Skills", "Communication", "Problem Solving", "Emotional Intelligence", "Time Management", "Product knowledge"].map((skill, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                          >
                            <span className="text-teal-400 mr-2">•</span>{skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 border-b border-teal-500/40 pb-2">Technical Skills</h3>
                      <ul className="space-y-2 text-gray-300">
                        {["Clear Communication of Technical Information", "Documentation and Attention to Detail", "Adaptability and Continuous Learning", "Adapting to Different CRM Software", "Understanding Different Ticketing Systems"].map((skill, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                          >
                            <span className="text-teal-400 mr-2">•</span>{skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-teal-500/40 pb-2">Key Achievements</h3>
                    <ul className="space-y-3 text-gray-300">
                      {[
                        "Average resolution rate of 8% across the 4 years experience",
                        "Average NPS 8.3",
                        "Improved the knowledge base with useful information on the usage of technical tools",
                        'Promoted to Subject Matter Expert "SME" and improved communication channels across teams'
                      ].map((achievement, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                        >
                          <span className="text-teal-400 mr-2">•</span>{achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Job Responsibilities - Two columns */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-teal-500/40 pb-2">Job Responsibilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-300">
                      {[
                        "Internal Communication",
                        "Frontline Customer Interaction & Case Management",
                        "Ticket Management",
                        "Prioritize Inquiries",
                        "Identify Knowledge Gaps",
                        "Maintain Detailed Records",
                        "Problem-Solving & Troubleshooting",
                        "Active Listening and Issue Diagnosis",
                        "Technical Troubleshooting",
                        "De-escalation"
                      ].map((resp, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.9 + i * 0.03 }}
                        >
                          <span className="text-teal-400 mr-2">•</span>{resp}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Job Experience Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-teal-500/40 pb-2">Professional Experience</h3>
                    <div className="space-y-4">
                      {act.details.jobs.map((job, idx) => (
                        <motion.div 
                          key={`job-${idx}`} 
                          className="border border-gray-700/50 rounded-lg p-4 bg-black/30 hover:bg-black/40 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white">{job.role}</h4>
                              <p className="text-gray-400 text-sm">{job.company}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-teal-400 text-sm font-medium">{job.period}</span>
                              <div className="w-12 h-12 mt-2 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-500 text-xs">Logo</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : act.id === "software" ? (
                <div className="space-y-8">
                  {/* Top wide section */}
                  <motion.div 
                    className="text-center pb-6 border-b border-gray-700/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">From a Hands-on Builder to a Strategic Leader</h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                      Junior Web Developer to Full Stack to Department Head
                    </p>
                  </motion.div>

                  {/* Technical Skills Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-green-500/40 pb-2">Technical and Problem-Solving Skills</h3>
                    <ul className="space-y-2 text-gray-300">
                      {act.details.skills.technical.map((skill, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                        >
                          <span className="text-green-400 mr-2">•</span>{skill}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Working Kit - 2 columns */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-green-500/40 pb-2">Working Kit</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-gray-300">
                      {act.details.skills.workingKit.map((tool, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
                        >
                          <span className="text-green-400 mr-2">•</span>{tool}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-green-500/40 pb-2">Key Achievements</h3>
                    <ul className="space-y-3 text-gray-300">
                      {act.details.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                        >
                          <span className="text-green-400 mr-2">•</span>{achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Responsibilities */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-green-500/40 pb-2">Responsibilities</h3>
                    <ul className="space-y-3 text-gray-300">
                      {act.details.responsibilities.map((resp, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 1.0 + i * 0.05 }}
                        >
                          <span className="text-green-400 mr-2">•</span>{resp}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Job Experience Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-green-500/40 pb-2">Professional Experience</h3>
                    <div className="space-y-4">
                      {act.details.jobs.map((job, idx) => (
                        <motion.div 
                          key={`job-${idx}`} 
                          className="border border-gray-700/50 rounded-lg p-4 bg-black/30 hover:bg-black/40 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white">{job.role}</h4>
                              <p className="text-gray-400 text-sm">{job.company}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-green-400 text-sm font-medium">{job.period}</span>
                              <div className="w-12 h-12 mt-2 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-500 text-xs">Logo</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Placeholder for Act III
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-gray-700/40">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{act.title}</h2>
                    <p className="text-gray-300 text-lg">Content coming soon...</p>
                  </div>
                  <div className="text-gray-400">
                    <p>This section is under development. Stay tuned for updates!</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypewriterPager() {
  const pages = [
    "My career began in customer-facing roles, where I developed a firsthand understanding of the user experience—the frustrations, the needs, and what defines a great product. It was this experience that sparked my passion for technology; I didn't just want to troubleshoot problems, I wanted to build the solutions.",
    "I pursued computer science and dove into full-stack development, growing from a junior developer to leading an entire IT department. My focus has always been on translating the user's needs into functional, high-performing software. This involved everything from building responsive websites to designing and implementing enterprise-level solutions and cloud infrastructure.",
    "Now, I'm focused on the final piece of the puzzle: ensuring those solutions make a real business impact. My work in sales, marketing, and as a creative director, combined with my current business studies, is about connecting technology to a larger strategy. It's about using data-driven insights to fuel growth and deliver value from the ground up.",
    "Looking ahead, my vision is to step into leadership roles where I can fully leverage this unique blend of skills. I am passionate about building and leading cross-functional teams to create products that are not only technologically innovative but also strategically marketed and deeply connected to the customer experience. Ultimately, my goal is to drive sustainable growth by ensuring every technical solution serves a clear business purpose.",
  ];

  const DOT_COLORS = [COLORS.blue, COLORS.green, COLORS.amber, COLORS.blue];

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTyped("");
    setTyping(true);
    const text = pages[index];
    const speed = 25; // 5x slower than previous 5ms
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setTyping(false); }
    }, speed);
    return () => clearInterval(id);
  }, [index]);

  const go = (n) => { if (n < 0 || n >= pages.length) return; setIndex(n); };

  return (
    <div className="relative max-w-5xl mx-auto mb-12" data-testid="journey-typewriter">
      {/* enhanced neon accent line under heading */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative">
          <div className="w-[3px] h-12" style={{ 
            background: `linear-gradient(to bottom, ${COLORS.teal}, ${COLORS.green})`, 
            boxShadow: `0 0 20px ${COLORS.teal}, 0 0 40px ${COLORS.teal}77, 0 0 60px ${COLORS.teal}44`,
            filter: 'brightness(1.2)'
          }} />
          <div className="absolute inset-0 animate-pulse" style={{
            background: `linear-gradient(to bottom, ${COLORS.teal}, ${COLORS.green})`,
            filter: 'blur(8px)',
            opacity: 0.6
          }} />
        </div>
      </div>

      <div className="min-h-[200px] relative">
        {/* Left arrow - Blue */}
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: COLORS.blue,
            boxShadow: `0 0 20px ${COLORS.blue}AA, 0 0 40px ${COLORS.blue}55`,
          }}
          aria-label="Previous paragraph"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${index}`}
            initial={{ opacity: 0, x: 130, clipPath: "inset(0 0 0 100%)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
            exit={{ opacity: 0, x: -260, clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.24, ease: [0.83, 0, 0.17, 1] }}
            className="text-white text-[19px] md:text-[22px] leading-relaxed font-[500]"
          >
            {typed}
            {typing && <span className="inline-block w-[10px] h-[20px] bg-white ml-1 align-[-3px] animate-pulse" />}
          </motion.div>
        </AnimatePresence>

        {/* Right arrow - Amber */}
        <button
          onClick={() => go(index + 1)}
          disabled={index === pages.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: COLORS.amber,
            boxShadow: `0 0 20px ${COLORS.amber}AA, 0 0 40px ${COLORS.amber}55`,
          }}
          aria-label="Next paragraph"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function JourneyPortalsStatic() {
  const [modal, setModal] = useState({ open: false, act: null });
  const sectionRef = useRef(null);
  const [pathD, setPathD] = useState("M 120 300 C 380 220 620 380 880 280");

  useEffect(() => {
    const compute = () => {
      const sec = sectionRef.current; if (!sec) return;
      const row = sec.querySelector('#portal-row'); if (!row) return;
      const portals = Array.from(row.querySelectorAll('.portal-btn')); if (portals.length < 3) return;
      const srect = sec.getBoundingClientRect();
      const pts = portals.map((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - srect.left;
        const cy = r.top + r.height * 0.75 - srect.top;
        return { x: cx, y: cy };
      });
      const sx = 1000 / srect.width; const sy = 420 / srect.height;
      const P = pts.map((p) => ({ x: p.x * sx, y: p.y * sy }));
      const p0 = P[0], p1 = P[1], p2 = P[2];
      const c1 = { x: p0.x + (p1.x - p0.x) / 3, y: p0.y - (p1.y - p0.y) * 0.25 };
      const c2 = { x: p0.x + (p1.x - p0.x) * 2 / 3, y: p0.y + (p1.y - p0.y) * 0.25 };
      const c3 = { x: p1.x + (p2.x - p1.x) / 3, y: p1.y - (p2.y - p1.y) * 0.25 };
      const d = `M ${p0.x.toFixed(1)},${p0.y.toFixed(1)} C ${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} S ${c3.x.toFixed(1)},${c3.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
      setPathD(d);
    };
    const id = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', compute); };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black" data-testid="journey-portals-static">
      <div className="absolute inset-0 -z-20" style={{ backgroundImage: `url('/atmos-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.34 }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

      <DataStream pathD={pathD} />

      <div className="container mx-auto px-6 py-20 relative">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">My Journey</h2>
        </div>

        <TypewriterPager />

        <div id="portal-row" className="relative w-full flex items-end justify-center gap-[6vw]">
          {ACTS.map((act) => (
            <Portal key={act.id} act={act} onClick={() => setModal({ open: true, act })} />
          ))}
        </div>
      </div>

      <CinematicModal open={modal.open} onClose={() => setModal({ open: false, act: null })} act={modal.act} />
    </section>
  );
}