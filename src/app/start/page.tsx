"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const BureaucracyHero = () => {
  const [showStartButton, setShowStartButton] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [staticEffect, setStaticEffect] = useState(0);
  const [papers, setPapers] = useState([]);

    const router = useRouter()

  // Generate papers
  const generatePaper = () => ({
    id: Math.random(),
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.3 + 0.7,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    type: Math.random() > 0.5 ? "📄" : "📑",
  });

  useEffect(() => {
    setTimeout(() => setShowStartButton(true), 2000);
    
    // Create static effect
    const staticInterval = setInterval(() => {
      setStaticEffect(Math.random());
    }, 100);

    // Initialize papers
    setPapers(Array.from({ length: 20 }, generatePaper));

    // Continuously add new papers
    const paperInterval = setInterval(() => {
      setPapers(current => {
        // Remove papers that have been falling for too long
        const filtered = current.filter(paper => Date.now() - paper.startTime < paper.duration * 1000);
        // Add new papers to maintain density
        while (filtered.length < 20) {
          filtered.push({
            ...generatePaper(),
            startTime: Date.now()
          });
        }
        return filtered;
      });
    }, 2000);

    return () => {
      clearInterval(staticInterval);
      clearInterval(paperInterval);
    };
  }, []);

  // Generate static noise background
  const generateNoise = () => {
    const noise = [];
    for (let i = 0; i < 50; i++) {
      noise.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3
      });
    }
    return noise;
  };

  const levels = [
    { name: "The Elusive Button Chase", icon: "🎯" },
    { name: "Curse of the Multiplying Cursors", icon: "🖱️" },
    { name: "Evil Simon's Pattern Protocol", icon: "🎮" },
    { name: "The Bureaucratic Maze of Doom", icon: "🌀" },
    { name: "The Ancient CAPTCHA Trial", icon: "🤖" },
    { name: "[REDACTED]", icon: "❌" },
    { name: "The Infinite Terms & Conditions", icon: "📜" },
    { name: "The Final Form", icon: "✨" }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-mono">
      {/* Falling papers */}
      <AnimatePresence>
        {papers.map((paper) => (
          <motion.div
            key={paper.id}
            className="absolute text-4xl text-white/10 pointer-events-none select-none"
            style={{ left: `${paper.x}vw` }}
            initial={{ 
              y: -100, 
              rotate: paper.rotation,
              scale: paper.scale,
            }}
            animate={{ 
              y: '120vh',
              rotate: paper.rotation + (Math.random() > 0.5 ? 360 : -360),
              x: [
                `${paper.x}vw`,
                `${paper.x + (Math.random() * 20 - 10)}vw`,
                `${paper.x + (Math.random() * 20 - 10)}vw`,
                `${paper.x + (Math.random() * 20 - 10)}vw`
              ]
            }}
            transition={{
              duration: paper.duration,
              delay: paper.delay,
              ease: "linear",
              x: {
                duration: paper.duration,
                times: [0, 0.3, 0.6, 1],
                ease: "linear"
              }
            }}
            exit={{ opacity: 0 }}
          >
            {paper.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Static noise effect */}
      {generateNoise().map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-px w-px bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            scale: particle.scale
          }}
          animate={{
            opacity: [particle.opacity, 0, particle.opacity],
            scale: [particle.scale, particle.scale * 1.5, particle.scale],
          }}
          transition={{
            duration: 0.5 + Math.random(),
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      {/* Frustrated character */}
      <motion.div
        className="absolute bottom-10 right-10 text-9xl opacity-10"
        animate={{
          rotate: [-5, 5],
          y: [-10, 10],
          filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        😫
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="mb-4 text-sm font-bold tracking-widest text-white opacity-50"
            animate={{
              opacity: [0.5, 1, 0.5],
              letterSpacing: ["0.2em", "0.3em", "0.2em"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            INITIALIZING BUREAUCRACY SIMULATOR
          </motion.div>
          
          <motion.h1
            className="relative mb-4 text-7xl font-black text-white"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.7)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SIGN UP !
          </motion.h1>
          
          <motion.div
            className="text-xl font-bold text-red-500"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            The Quest to be the Bureaucracy Hero
          </motion.div>
        </motion.div>

        {/* Level selection */}
        <motion.div 
          className="mb-12 grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {levels.map((level, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer text-white"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + (index * 0.1) }}
              onHoverStart={() => setHoveredLevel(index)}
              onHoverEnd={() => setHoveredLevel(null)}
            >
              <motion.div
                className="relative overflow-hidden rounded border border-white/20 bg-white/5 p-4 backdrop-blur-sm"
                animate={{
                  borderColor: hoveredLevel === index ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                  backgroundColor: hoveredLevel === index ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
                }}
              >
                <motion.span
                  className="mr-2 text-2xl"
                  animate={{
                    scale: hoveredLevel === index ? [1, 1.2, 1] : 1,
                    rotate: hoveredLevel === index ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {level.icon}
                </motion.span>
                {level.name}
                
                {hoveredLevel === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Start button */}
        {showStartButton && (
          <motion.button
            onClick={() => router.push('/level/1')}
            className="group relative overflow-hidden rounded-lg border border-white/20 bg-white px-8 py-4 text-xl font-bold text-black transition-all hover:bg-white/90"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setGlitchEffect(true)}
            onMouseLeave={() => setGlitchEffect(false)}
          >
            <motion.span
              animate={{
                color: glitchEffect ? ["#000", "#ff0000", "#000"] : "#000"
              }}
              transition={{ duration: 0.2 }}
            >
              BEGIN PAPERWORK
            </motion.span>
            
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)"
                ],
                left: ["-100%", "200%"]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </motion.button>
        )}

        {/* Warning message */}
        <motion.div
          className="mt-8 text-center text-sm text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Warning: This game contains excessive paperwork and
          <br />
          mild administrative violence
        </motion.div>
      </div>

      {/* Error messages */}
      <AnimatePresence>
        {glitchEffect && (
          <motion.div
            className="absolute bottom-4 right-4 rounded border border-red-500/50 bg-black/50 p-2 text-sm text-red-500 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            System Error: Coffee Not Found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BureaucracyHero;